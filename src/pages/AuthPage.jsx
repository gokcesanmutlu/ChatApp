import { getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                localStorage.setItem("TOKEN", res.user.refreshToken);
                setIsAuth(true)
            })
            .catch((err) => console.log(err));
    };
    // bu bir asyn fonk'dur. başarılı(then) veya başarısız(cactch) olabilir,
    // herhangi bir sebepten dolayı kullanıcı kaydedilemeyebilir

    return (
        <div className="container">
            <div className="auth">
                <h1>Chat Room</h1>
                <p>Login to continue</p>
                <button onClick={handleClick}>
                    {/* publicteki bir resim için import ihtiyacı olmaz, zira publicteki dosyalar url 
                    üzerinden doğrudan yayınlanır import { signInWithPopup } from 'firebase/auth';
localhost/g-logo.pnd dediğimizde resme doğrudan ulimport { auth } from './../firebase/config';
aşabilirdik */}
                    <img src="/g-logo.png" alt="" />
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
