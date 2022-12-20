import styled from "styled-components";
import Topo from "./Topo";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoginProvider } from "../contexts/LoginContext";
import { ThreeDots } from "react-loader-spinner";

export default function Habitos() {
    const { token } = useLoginProvider();

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [form, setForm] = useState("");
    const [days, setDays] = useState([]);
    const [getHabits, setgetHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addHabits, setAddHabits] = useState(false);


    function selectDays(d, i) {
        setDays([...days, i])
        if (!days.includes(i)) {
            setDays([...days, i])
        } else {
            const newArr = days.filter(d => d !== i)
            setDays(newArr);
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const body = {
            name: form,
            days: days,
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        await axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
            .then(res => {
                setLoading(false)
                setAddHabits(false);
                console.log(res.data);
            })
            .catch(err => alert(err.response.data))
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then(res => {
            setgetHabits(res.data)

        })
        promise.catch(err => console.log(err.response.data))
    }, [])

    function handleDelete(d) {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${d}`
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        if (window.confirm("Quer mesmo deletar este hábito?") === true) {
            const promise = axios.delete(URL, config)
            promise.then(res =>
                setgetHabits([...getHabits.filter((h) => h.id !== d)])
            )
            promise.catch(err => alert(err.response.data))
        }
    }

    function ListaHabito() {
        return (
            (getHabits.map((h, id) =>
                <Habits
                    key={id}
                >
                    <HabitContainer>
                        <h1>{h.name}</h1>
                        <Week>
                            {weekdays.map((d, id) =>
                                <ButtonWeek
                                    color={h.days.includes(id) ? "#DBDBDB" : "#FFFFFF"}
                                    font={h.days.includes(id) ? "#FFFFFF" : "#DBDBDB"}
                                    key={id}
                                >
                                    {d}
                                </ButtonWeek>
                            )}
                        </Week>
                    </HabitContainer>
                    <Trash
                        onClick={() => handleDelete(h.id)}
                    >
                        <ion-icon name="trash-outline"></ion-icon>
                    </Trash>
                </Habits>
            )
            )
        )
    }

    return (
        <>
            <Topo />
            <Container>
                <MyHabits>
                    <span>Meus Hábitos</span>
                    <button
                        onClick={() => {
                            setAddHabits(true)
                            setForm("")
                            setDays([])
                        }}
                    >
                        +
                    </button>
                </MyHabits>
                {addHabits ?
                    <AddHabit>
                        <input
                            type="text"
                            placeholder="nome hábito"
                            value={form}
                            onChange={(e) => setForm(e.target.value)}
                        />
                        <Form>
                            {weekdays.map((d, id) =>
                                <ButtonWeek
                                    color={days.includes(id) ? '#DBDBDB' : '#FFFFFF'}
                                    font={days.includes(id) ? '#FFFFFF' : '#DBDBDB'}
                                    key={id}
                                    onClick={() => selectDays(d, id)}>
                                    {d}
                                </ButtonWeek>
                            )}

                        </Form>
                        <ButtonDiv>
                            <ButtonCancel
                                onClick={() => setAddHabits(false)}
                            >
                                Cancelar
                            </ButtonCancel>

                            {loading ?
                                <SaveButton>
                                    <ThreeDots
                                        height="50"
                                        width="50"
                                        radius="9"
                                        color="white"
                                    />
                                </SaveButton>
                                :
                                <SaveButton
                                    onClick={handleSubmit}
                                >
                                    Salvar
                                </SaveButton>
                            }
                        </ButtonDiv>
                    </AddHabit>
                    : <></>}

                <Text>
                    {getHabits.length === 0 ?
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        :
                        <ListaHabito />
                    }
                </Text>
            </Container>
            <Footer />
        </>
    )
}
const Container = styled.div`
width: 375px;
height: calc(100vh - 120px);
margin-top: 80px;
margin-bottom: 100px;
background-color: #F2F2F2;
`
const Week = styled.div`
margin-top: 5px;
display: flex;
`
const Trash = styled.div`
width: 20px;
height: 20px;
display: flex;
`
const HabitContainer = styled.div`
display: flex;
flex-direction: column;
`
const Habits = styled.div`
width: 340px;
height: 91px;
margin: 0 auto;
background: #FFFFFF;
border-radius: 5px;
margin-bottom: 10px;
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: space-between;
padding: 15px;
& h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
}
`
const ButtonWeek = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.font};
width: 30px;
height: 30px;
border: 1px solid #D5D5D5 ;
background: ${props => props.color};
border-radius: 5px;
margin-right: 5px;
`
const ButtonCancel = styled.button`
width: 84px;
height: 35px;
color: #52B6FF;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
border-radius: 5px;
background-color: #FFFFFF;
border: none;
`
const SaveButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
width: 84px;
height: 35px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
border-radius: 5px;
background: #52B6FF;
color: #FFFFFF;
border: none;
`
const ButtonDiv = styled.div`
height: 60px;
display: flex;
justify-content: end;
align-items: end;
`
const Form = styled.div`
margin-top: 8px;
display: flex;
`
const AddHabit = styled.div`
width: 340px;
height: 180px;
background: #FFFFFF;
border-radius: 5px;
margin: 0 auto;
padding: 18px;
& input{
    width: 303px;
    height: 45px;
    color: #DBDBDB;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
}
`
const Text = styled.div`
margin: 28px 17px 28px 17px;
font-weight: 400;
font-size: 18px;
line-height: 22px;
color: #666666;
`
const MyHabits = styled.div`
margin: 28px 17px 28px 17px;
display: flex;
align-items: center;
justify-content: space-between;
color: #126BA5;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 23px;
& button{
    width: 40px;
    height: 35px;
    font-weight: 400;
    text-align: center;
    font-size: 27px;
    line-height: 34px;
    color: #FFFFFF;
    border: none;
    background-color: #52B6FF;
    border-radius: 4px;
}
`