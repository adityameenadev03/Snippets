import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import './Login.css'
import auth from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
       const done = await login(email,password)
       console.log(done)
    }

    return (
        <div className="login">
            {!isLoading && <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    value={password}
                />
                 <button disabled={isLoading} >Log in</button>
                {error && <div className="error">{error}</div>}
            </form>}
            
            {isLoading && <Loader/>}

        </div>



    )
}

export default Login