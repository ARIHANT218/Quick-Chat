const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../lib/utils');
const cloundary = require('../lib/cloudinary');

exports.signup = async (req, res) => {

  
  try{
    const { fullName, email, password } = req.body;
     if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user= await User.findOne({email});
    if(user){
      return res.status(400).json({message: 'User already exists'});
    }
    
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({fullName:fullName, email, password: hashPassword});
      // jwt token generation
      
      await newUser.save();
      token = generateToken(newUser._id, res); // ✅ Will work now

      res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      token,
    });
       
  } 
  catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ _id : newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profile: newUser.profile,
     });
  }
}     

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(!user) {
    return res.status(400).json({ message: 'User not found' });
  }     
  const ispresent = await bcrypt.compare(password, user.password);

  if(!ispresent) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  generateToken(user._id, res);
  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profile: user.profile,
  });
}

exports.logout = (req, res) => {
  res.cookie('token', '', {maxAge:0});
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.updateUserProfile = async (req, res) => {
  const {profilePic} = req.body;
  console.log(req.body);
  const userId = req.user._id;


  if(!profilePic){
    return res.status(400).json({message: 'Please provide a profile picture URL'});
  }
  try{
    // const user = await User.findById(userId);
    // user.profilePic = profilePic;
    // await user.save();
    const userUploaded = await cloundary.uploader.upload(profilePic);
    const userUpdated = await User.findByIdAndUpdate(userId, {
      profilePic: userUploaded.secure_url,
    }, { new: true });
    res.json(userUpdated);

  }
  catch {
    console.error('Error during profile update:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
exports.checkUser = (req, res) => {
  
  res.status(200).json(req.user);
}