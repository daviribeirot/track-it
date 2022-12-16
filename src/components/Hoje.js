import styled from "styled-components";
import Topo from "./Topo";
import Footer from "./Footer";

export default function Hoje() {

    return (
        <>
            <Topo />
            <HojeContainer>
                <Title> Segunda, 17/05 </Title>
                <Subtitle>Nenhum hábito concluído ainda</Subtitle>

                <ul>
                    <List>
                        <div>
                            <h3>Titulo Habito</h3>
                            <span>Sequencia atual:</span>
                            <br></br>
                            <span>Sequencia atual:</span>
                        </div>

                        <DivIcon>
                            <ion-icon name="checkbox"></ion-icon>
                        </DivIcon>

                    </List>
                </ul>
            </HojeContainer>
            <Footer />
        </>
    )

}

const HojeContainer = styled.div`
    height: 90vh;
    width: 100%;
    background: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    margin-top: 100px;
    width: 172px;
    height: 29px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`
const Subtitle = styled.h2`
    width: 278px;
    height: 22px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
`

const List = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-around;

    margin-top: 10px;
    width: 340px;
    height: 94px;

    background: #FFFFFF;
    border-radius: 5px;

    h3 {
        width: 208px;
        height: 25px;
 
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;

        color: #666666;
    }

    span {
        width: 148px;
        height: 32px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;

        color: #666666;
    }
`

const DivIcon = styled.div`
    ion-icon{
    width: 69px;
    height: 69px;

    color: #EBEBEB;
    }

`