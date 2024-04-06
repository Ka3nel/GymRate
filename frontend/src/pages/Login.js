import { useState} from 'react'

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(emailOrUsername, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email or username:</label>
            <input
                type='emailOrUsername'
                onChange={(e) => setEmailOrUsername(e.target.value)}
                value={emailOrUsername}
            />

            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button>Log in</button>
        </form>
    )
}

export default Login