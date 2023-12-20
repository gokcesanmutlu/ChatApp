import { auth } from "../firebase/config"

const Message = ({ data }) => {
  console.log(data)

  // bu console bize oturumu açık olan kişilerin bilgisini verir
  console.log(auth.currentUser.uid)

  // eğer oturumu açık olan kişinin id'si mesajı atan kişinin id sine eşit ise ekrana bunu basıcak
  if (auth.currentUser.uid === data.author.uid) {
    return <p className="msg-user">{data.text}</p>
  }
 
  // değilse bunu basıcak
  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data.author.photo} />
        <span>{data.author.name}</span>
      </p>

      <p>{data.text} </p>
    </div>
  )
}

export default Message