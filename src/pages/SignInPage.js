import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import env from "../env"
import { UserContext } from "../context/logInContext"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { onlineUser, setOnlineUser } = useContext(UserContext)
  function submitData(e) {
    e.preventDefault()
    const body = { email, password }
    axios.post(`${env.REACT_APP_API_URL}/`, body)
      .then(res => {
        const { token, name } = res.data
        localStorage.setItem("user", JSON.stringify({ name, token }))
        setOnlineUser({ token, name })
        navigate("/home")
      })
      .catch(err => alert(err.response.data))
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
          required />
        <input placeholder="Senha"
          type="password"
          autocomplete="new-password"
          data-test="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button data-test="sign-in-submit" type="submit">Entrar</button>
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
`
