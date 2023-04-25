import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import env from "../env"
import { UserContext } from "../context/logInContext"
import { ThreeDots } from "react-loader-spinner"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(false)
  const { setOnlineUser } = useContext(UserContext)
  function submitData(e) {
    e.preventDefault()
    setDisabled(true)
    const body = { email, password }
    axios.post(`${env.REACT_APP_API_URL}/`, body)
      .then(res => {
        const { token, name } = res.data
        localStorage.setItem("user", JSON.stringify({ name, token }))
        setOnlineUser({ token, name })
        navigate("/home")
      })
      .catch(err => {
        alert(err.response.data)
        setDisabled(false)
      })
  }
  return (
    <SingInContainer>
      <form onSubmit={submitData}>
        <MyWalletLogo />
        <input placeholder="E-mail"
          type="email"
          data-test="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disabled}
        />
        <input placeholder="Senha"
          type="password"
          autocomplete="new-password"
          data-test="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={disabled}
        />
        <button data-test="sign-in-submit" type="submit" disabled={disabled}>
          {disabled ?
            <ThreeDots type="ThreeDots" color="#FFF" height={20} width={20} /> : "Entrar"}
        </button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
