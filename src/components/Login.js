import styled from "styled-components";
import logo from "../assets/images/logotrackit.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginProvider } from "../contexts/LoginContext";
import { ThreeDots } from 'react-loader-spinner'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const { handleLogin } = useLoginProvider();

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        await handleLogin(email, password);
        setLoading(false)
        navigate("/hoje")
    };

    return (

        <LoginContainer>
            <img src={logo} alt="logo track it" />
            <Form>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            data-test="email-input"
                            type="email"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required />
                    </div>
                    <div>
                        <input
                            data-test="password-input"
                            type="password"
                            placeholder="senha"
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required />
                    </div>

                    <button 
                    data-test="login-btn"
                    type="submit" 
                    disabled={loading}> 
                    {
                        loading
                            ? <ThreeDots
                            height = "50"
                            width = "50"
                            radius = "9"
                            color = 'white'
                            ariaLabel = 'three-dots-loading'     
                          />
                            : "Entrar"
                    }
                    </button>
                </form>
            </Form>
            <Link 
            data-test="signup-link" 
            to='/cadastro'
            >
            Não tem uma conta? Cadastre-se</Link>
        </LoginContainer>

    )
}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
img{
    margin: 50px auto;
}
a{
    text-decoration-line: underline;
    color: #52B6FF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
    font-family: 'Lexend Deca';
}
`

const Form = styled.div`
input{
    display: flex;
    margin:  6px auto;
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    padding: 8px;
    
}
input::placeholder{
    color:#DBDBDB;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;

}

input:focus{
    padding: 8px;
}

button{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:  auto;
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    background-color: #52B6FF;
    color: #FFFFFF;
    font-size: 20.976px;
    line-height: 26px;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
}
`
