import styled from "styled-components";
import Topo from "./Topo";
import Footer from "./Footer";
import { LoginContext, useLoginProvider } from "../contexts/LoginContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";

export default function Hoje() {
    const { token } = useLoginProvider();
    const {value, setValue} = useContext(LoginContext);

    const [todayHabits, setTodayHabits] = useState([]);
    const config = { headers: { Authorization: `Bearer ${token}` } }
    require('dayjs/locale/pt-br')
    const dia = dayjs().locale('pt-br').format("dddd, DD/MM");

    function handlePercentage(habits){
        const doneHabits = habits.filter((h) => h.done).length;
        let percentage;
   
    if(habits.length === 0){
        percentage = 0;
    } else {
        percentage = Math.round(doneHabits*100/(habits.length))
    }

    setValue(percentage);
    }

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const promise = axios.get(URL, config)
        promise.then(habits => {
            setTodayHabits([...habits.data]);
            handlePercentage(habits.data);
        })
        promise.catch((err) => console.log(err.response.data))
    }, [setTodayHabits, setValue])


    function handleCheck(habit) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${habit.done ? "uncheck" : "check"}`, { id: habit.id }, config)
        promise.then(() => setTodayHabits([...todayHabits.map(h => habit.id === h.id ? h.done = !habit.done : "")]))
        promise.catch((err => console.log(err.response.data)));
    }

    return (
        <>
            <Topo />
            <DivContainer>
                <Container>
                    <Title data-test="today">{dia}</Title>
                    <p color={value === 0} data-test="today-counter">{value && value === 0
                        ?
                        "Nenhum hábito concluído ainda"
                        :
                        `${value}% dos hábitos concluídos`}
                    </p>
                </Container>
                {!todayHabits ? (
                    <ThreeDots color="white" />
                ) : todayHabits.length === 0 ? (
                    <span>Não há hábitos para trackear hoje</span>
                ) : (
                    todayHabits.map((habit) => (
                        <HabitContainer
                            data-test="today-habit-container"
                            key={habit.id}
                            done={habit.done}
                        >
                            <div>
                                <HabitName data-test="today-habit-name">{habit.name}</HabitName>
                                <HabitSequence data-test="today-habit-sequence">{`Sequência atual: ${habit.currentSequence} dia(s)`}</HabitSequence>
                                <HabitSequence data-test="today-habit-record">{`Seu recorde: ${habit.highestSequence} dia(s)`}</HabitSequence>
                            </div>
                            <button onClick={() => handleCheck(habit)} data-test="today-habit-check-btn">
                                <ion-icon name="checkbox"></ion-icon>
                            </button>
                        </HabitContainer>
                    ))
                )}
            </DivContainer>
            <Footer />
        </>
    )

}
const DivContainer = styled.div`
    font-family: 'Lexend Deca';    
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    width: 100%;
    overflow: scroll;
    background-color: #F2F2F2;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    p{
        color: ${({color}) => color ? "BABABA" : "#8FC549"};
    }
`;

const Title = styled.h1`
    margin-top: 80px;
    height: 29px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
;
`
const HabitContainer = styled.div`
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 18px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    width: 69px;
    height: 69px;
    border: none;
    border-radius: 5px;
    background: none;
  }
  ion-icon {
    font-size: 69px;
    color: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
  }
`;

const HabitName = styled.p`
    margin-bottom: 5px;
    overflow: hidden;
`
const HabitSequence = styled.p`
    display: flex;
    font-size: 13px;
    gap: 5px;
    line-height: 16px;
`