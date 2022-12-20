import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { LoginContext, useLoginProvider } from "../contexts/LoginContext";
import { useContext } from "react";

export default function Footer() {
    const {value} = useContext(LoginContext);

    return (
        <FooterContainer>
            <Link to='/habitos'>Hábitos</Link>
            <Link to="/hoje">
                <ContainerCircle>
                    <CircularProgressbar
                        value={value ? value : 0}
                        text={"Hoje"}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </ContainerCircle>
            </Link>
            <Link to='/historico'>Histórico</Link>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0px;
    bottom: 0px;
    background: #FFFFFF;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;

    display: flex;
    justify-content: space-around;
    align-items: center;

    a{
    text-decoration: none;
    color: #52B6FF;
    }

`
const ContainerCircle = styled.div`
    margin-bottom: 15px;
    width: 80px;

`