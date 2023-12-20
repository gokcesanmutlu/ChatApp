
const RoomPage = ({ setIsAuth, setRoom }) => {

  const logout = () => {
    // Update state
    setIsAuth(false)
    // Remove from locale
    localStorage.removeItem("TOKEN")
  };

  //enter room
  const handleSubmit = (e) => {
    e.preventDefault();

    const roomName = e.target[0].value;

    //Update state
    setRoom(roomName)
  }

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Which room will you enter?</p>
      <input type="text" />
      <button type="submit">Enter the Room</button>
      <button type="button" onClick={logout}>Log Out!</button>
    </form>
  )
}

export default RoomPage