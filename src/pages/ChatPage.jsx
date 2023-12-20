import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  //console.log(auth)

  // koleksiyon'un referansını alma
  const messagesCol = collection(db, "messages");

  //filter setting
  const queryOptions = query(
    messagesCol,
    where("room", "==", room),
    orderBy("createdAt", "asc")
  );

  // Adding message to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    // veritabanına yeni döküman ekler(veritabanına eklemek zaman alabilir dolayısıyla async await)
    // 1: ekleme yapacağımız koleksiyonun referansı
    // 2: oluşturacağımız döküman verileri
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      //new date sorun çıkarır özellikle biri abd biri tr de ise vs biz burda firebase'daki bir metot ile direkt
      //veritabanının zamanını alabiliyoruz
      createdAt: serverTimestamp(),
    });

    // birden fazla input varsa güzel bir çözüm e target reset.(tek tek boş stringe de çekilebilirdi)
    e.target.reset()
  };

  // verilere abone olma(koşulsuz şartsız koleksiyondaki tüm verileri getiriyo, ne tarihe bakıyo ne odaya vs.)
  // verileri getirirken en eskiden en yeniye vs şeklinde koşulları da belirtmemiz şart yoksa oda, sıra gözetmez
  useEffect(() => {
    // anlık olarak koleksiyondaki değişimleri izler
    // koleksiyon her değiştiğinde verilen fonksiyonu çalıştırır

    //query opt yazmadan önce doğrudan messagesCol yani referansı yazıyorduk. ama şimdi bu referansa üye ol ama belirlediğim parametreler ile ol diyoruz
    const unsub = onSnapshot(queryOptions, (snapshot) => {
      // geçici olarak mesajları tuttuğumuz dizi
      const tempMsg = [];

      //docs tamamını döndük ve verilerini erişip geçici bir diziye aktardık
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      // geçici dizideki verileri alıp state'e aktardık
      setMessages(tempMsg);
    });

    // kullanıcı bileşenden ayrılınca aboneliği sonlandır. bunun için comp.will unmounth kullanılır
    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        {/* firebase bu kullanıcı adını alma konusunda işimizi kolaylaştırıyo, kullanıcı giriş yaptığı anda 
        bizim bir auth referansımız vardı config.js'de. Bilgileri oraya kaydediliyo onu yukarıda 
        import edip console'a yazarsan içinde bir yerde kullanıcıyı görürsün.Firebase özelliği bu*/}
        {/* ? koyduk çünkü get app calışacak ve değeri auth'a aktaracak config.js'de bunlar hep zaman */}
        <p>{auth?.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Change Room</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Write your message..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
