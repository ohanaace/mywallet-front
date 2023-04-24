import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import env from "../env"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")

  function submitSingUp(e) {
    e.preventDefault()
    if(password !== confPassword){
      alert("'Senha' e 'Confirme A Senha' precisam ser idênticos.")
      return
    }
    const body = {name, email, password}
    const REACT_APP_API_URL = env.REACT_APP_API_URL
   axios.post(`${REACT_APP_API_URL}/cadastro`, body)
    .then((res) => {
      console.log(res.data)
     // navigate("/")
    })
    .catch(err => {
      console.log(err.message)
      alert(err.response.data)
    })
  }
  return (
    <SingUpContainer>
      <form onSubmit={submitSingUp}>
        <MyWalletLogo />
        <input placeholder="Nome"
          type="text"
          data-test="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
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
        <input placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          data-test="conf-password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required />
        <button data-test="sign-up-submit" type="submit">
          Cadastrar
        </button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
