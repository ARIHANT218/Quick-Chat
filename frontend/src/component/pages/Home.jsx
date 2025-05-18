import { useChatStore } from "../../store/useChatStore";
import Sidebar from "../SideBar";
import NoChatSelected from "../NoChatSelected";
import ChatContainer from "../ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="vh-100 bg-light">
      <div className="d-flex justify-content-center align-items-start pt-5 px-3">
        <div
          className="bg-white rounded shadow w-100"
          style={{
            maxWidth: "1200px", // equivalent to max-w-6xl
            height: "calc(100vh - 8rem)", // same as h-[calc(100vh-8rem)]
          }}
        >
          <div className="d-flex h-100 rounded overflow-hidden">
            <Sidebar/>

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
