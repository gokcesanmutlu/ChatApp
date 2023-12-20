import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from './pages/ChatPage';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"));
  const [room, setRoom] = useState(null);

  //yetkisi yoksa > enter page
  if (!isAuth) {
    return (
      <>
        <AuthPage setIsAuth={setIsAuth} />
      </>
    );
  }

  // if the person is authorized > chatroom page
  return (
    <div className="container">
      {room ? (
        // if room is selected
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        //if room is not selected
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
