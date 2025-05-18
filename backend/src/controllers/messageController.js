const messagesModel = require('../models/messageModel.js');
const User = require('../models/user.model.js');
const cloudinary = require('../lib/cloudinary.js');
const { getReceiverSocketId, io } = require('../lib/socket.js'); // Import 'io' as well


exports.getUsersForSidebar = async (req, res) => {
  try {
    const currentUser = req.user._id; // Changed 'CurrentUser' to 'currentUser'
    const userFilter = await User.find({ _id: { $ne: currentUser } }).select("-password");
    res.status(200).json({ userFilter });
  } catch (error) {
    console.error('Error fetching users for sidebar:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await messagesModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    });
    res.status(200).json(messages);
  } catch (error) { // Changed 'catch' to 'catch (error)' to catch the error
    console.error('Error fetching messages:', error);
    return res.status(500).json({ message: 'Failed to fetch messages' }); // More specific message
  }
};

exports.sendMessage = async (req, res) => {
  const { id : receiverId } = req.params;
  const { text, image } = req.body;
  const senderId = req.user._id; 
  let imageUrl = null; // Declare imageUrl outside the if block

  try {
    if (image) {
      try{
        const uploadedImage = await cloudinary.uploader.upload(image);
        imageUrl = uploadedImage.secure_url;
      }catch(error){
        console.error("Cloudinary error",error);
        return res.status(500).json({message: "Failed to upload image"})
      }

    }

    const newMessage = new messagesModel({
      senderId,
      receiverId,
      text,
      image: imageUrl // Use the imageUrl variable
    });
    await newMessage.save();

    // Real-time communication
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessages", newMessage); // Corrected event name to "newMessages" and sending newMessage
    }
    console.log("server end pr messages",newMessage)
    res.status(200).json(newMessage); // Send the newly created message
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message }); // Include the error message for more details
  }
};
