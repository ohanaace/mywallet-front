import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  function submitData(e){
    e.preventDefault()
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
