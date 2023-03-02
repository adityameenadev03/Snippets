import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"
import './Signup.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isLoading, error } = useSignup()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const done = await signup(email, password)
        if (done) {
            navigate('/')
        }
    }

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <h3>Signup</h3>
                <input
                    type="name"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
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
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>



    )
}

export default Signup