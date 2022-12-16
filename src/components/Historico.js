import styled from "styled-components";
import Topo from "./Topo";
import Footer from "./Footer";

export default function Historico(){
    return (
        <>
            <Topo/>
            <Corpo>
                <Texts>
                    <h1>Histórico</h1>
                    <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
                </Texts>
            </Corpo>
            <Footer/>
        </>
    )
}

const Corpo = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #F2F2F2;
`

const Texts = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    }

span{
    width: 338px;
    height: 74px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
    }
`
