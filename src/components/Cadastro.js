import styled from "styled-components";
import logo from "../assets/images/logotrackit.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Cadastro(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function sendData(e) {
        e.preventDefault();
        setLoading(true)
        axios
            .post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form)
            .then((res) => {
                setLoading(false)
                navigate("/");
            })
            .catch((err) => {
                setLoading(false)
                alert(err.response.data.message);
            });
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <CadastroContainer>
            <img src={logo} alt="logo track it" />
            <Form>
                <form onSubmit={sendData}>
                    <div>
                        <input 
                        data-test="email-input"
                        name="email" 
                        type="email" 
                        placeholder="email" 
                        onChange={handleForm} 
                        disabled={loading}
                        value={form.email} />

                        <input 
                        data-test="password-input"
                        name="password" 
                        type="password" 
                        placeholder="senha" 
                        onChange={handleForm} 
                        disabled={loading}
                        value={form.password} />

                        <input 
                        data-test="user-name-input"
                        name="name" 
                        type="text" 
                        placeholder="nome" 
                        onChange={handleForm} 
                        value={form.name} />

                        <input 
                        data-test="user-image-input"
                        name="image" 
                        type="url" 
                        placeholder="url foto" 
                        onChange={handleForm} 
                        value={form.image} />
                    </div>
                    <button type="submit" data-test="signup-btn">{
                        loading
                            ? <ThreeDots
                            height = "50"
                            width = "50"
                            radius = "9"
                            color = "white"
                            ariaLabel = 'three-dots-loading'     
                          />
                            : "Cadastrar"
                    }</button>
                </form>
            </Form>
            <Link to='/' data-test="login-link">Já tem uma conta? Faça login!</Link>
        </CadastroContainer>

    )
};

const CadastroContainer = styled.div`
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
}
`

