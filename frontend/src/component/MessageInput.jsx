import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

 const handleSendMessage = async (e) => {
  e.preventDefault();

  // Prevent sending empty text and empty image
  if (!text.trim() && !imagePreview) return;

  try {
    await sendMessages({
      text: text.trim(),
      image: imagePreview,
    });

    // Reset input fields
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    
  } catch (error) {
    console.error("Failed to send message:", error);
    toast.error("Failed to send message. Please try again.");
  }
};


  return (
    <div className="p-3 w-100 bg-light border-top">
      {imagePreview && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <div className="position-relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="border rounded object-cover"
              style={{ width: "80px", height: "80px" }}
            />
            <button
              type="button"
              onClick={removeImage}
              className="btn btn-sm btn-light p-0 rounded-circle position-absolute"
              style={{
                top: "-8px",
                right: "-8px",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
        <div className="d-flex flex-grow-1 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="d-none"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-outline-secondary d-none d-sm-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <Image size={18} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
