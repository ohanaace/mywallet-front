import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/logInContext"
import axios from "axios"
import env from "../env"
import ItemContainer from "../components/ListItemContainer"
import { useNavigate } from "react-router-dom"


export default function HomePage() {
  const [registers, setRegisters] = useState([])
  const [amount, setAmount] = useState(0)
  const { onlineUser } = useContext(UserContext)
  const navigate = useNavigate()
  console.log(onlineUser)
  const config = { headers: { Authorization: `Bearer ${onlineUser.token}` } }
  useEffect(() => {
    axios.get(`${env.REACT_APP_API_URL}/home`, config)
      .then(res => {
        const { transactions, total } = res.data
        console.log(res.data)
        setRegisters(transactions)
        setAmount(total)
      })
      .catch(err => {
        if (err.statusCode === 401) {
          alert("Faça login.")
          navigate("/")
        }
        alert(err.response.data)
      })
  }, [])

  function logout(){
    axios.delete(`${env.REACT_APP_API_URL}/logout`, config)
    .then(res => {
      localStorage.removeItem("user")
      alert(res.data)
      navigate("/")
    })
    .catch(err => console.log(err.response.data))
  }
  return (
    <HomeContainer>
      <Header data-test="user-name">
        <h1>Olá, {onlineUser.name}</h1>
        <BiExit data-test="logout" onClick={logout} />
      </Header>

      <TransactionsContainer>
        <List>
          {registers.map((cash) => <ItemContainer
            key={cash._id}
            date={cash.date}
            description={cash.description}
            value={cash.value}
            type={cash.type} />)}
        </List>

        <TotalArticle>
          <strong>Saldo</strong>
          <Value color={amount} data-test="total-amount" >{amount}</Value>
        </TotalArticle>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`
const List = styled.ul`
    height: 350px;
    overflow: auto;
    ::-webkit-scrollbar{
      width: 0px;
      background-color: transparent;
    }
`
const TotalArticle = styled.article`
background-color: white;
height: 50px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 390px;
  strong {
    font-weight: 700;
    text-transform: uppercase;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color >= 0? "green" : "red")};
`