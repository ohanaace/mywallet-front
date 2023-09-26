import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../context/logInContext"
import axios from "axios"
import env from "../env"
import { ThreeDots } from "react-loader-spinner"

export default function TransactionsPage() {
  const [valueInput, setValueInput] = useState("")
  const [description, setDescription] = useState("")
  const [disabled, setDisabled] = useState(false)
  const { tipo } = useParams()
  const navigate = useNavigate()
  const { onlineUser } = useContext(UserContext)
  const config = { headers: { Authorization: `Bearer ${onlineUser.token}` } }
  function registerEntry(e) {
    let sentValue;
    e.preventDefault()
    setDisabled(true)
    if (valueInput.includes(",")) {
      const fixedValue = valueInput.replace(",", ".")
      sentValue = parseFloat(fixedValue).toFixed(2)
    }
    const newValue = valueInput.includes(",") ? sentValue : valueInput
    const body = { value: newValue, description }
    axios.post(`${env.REACT_APP_API_URL}/nova-transacao/${tipo}`, body, config)
      .then(res => {
        alert("Operação adicionada com sucesso")
        navigate("/home")
      })
      .catch(err => {
        if (err.statusCode === 401) {
          alert("Faça login")
          navigate("/")
        }
        alert(err.response.data)
        setDisabled(false)
      })
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={registerEntry}>
        <input
          placeholder="Valor"
          type="text"
          data-test="registry-amount-input"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          required
          disabled={disabled}
        />
        <input
          placeholder="Descrição"
          type="text"
          data-test="registry-name-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={disabled}
        />
        <button data-test="registry-save" type={"submit"} disabled={disabled}>{disabled ?
          <ThreeDots type="ThreeDots" color="#FFF" height={20} width={20} /> : `Salvar ${tipo}`}
        </button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  button{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
