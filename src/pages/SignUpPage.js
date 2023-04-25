import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import env from "../env"
import { ThreeDots } from "react-loader-spinner"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [disabled, setDisabled] = useState(false)

  function submitSingUp(e) {
    e.preventDefault()
    if (password !== confPassword) {
      alert("'Senha' e 'Confirme A Senha' precisam ser idênticos.")
      return
    }
    setDisabled(true)
    const body = { name, email, password }
    axios.post(`${env.REACT_APP_API_URL}/cadastro`, body)
      .then(() => {
        alert("Usuário cadastrado com sucesso")
        navigate("/")
      })
      .catch(err => {
        alert(err.response.data)
      setDisabled(false)})
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
          required
          disabled={disabled} />
        <input placeholder="E-mail"
          type="email"
          data-test="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disabled} />
        <input placeholder="Senha"
          type="password"
          autocomplete="new-password"
          data-test="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={disabled} />
        <input placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          data-test="conf-password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required
          disabled={disabled} />
        <button data-test="sign-up-submit" type="submit">
          {disabled ?
            <ThreeDots type="ThreeDots" color="#FFF" height={20} width={20} /> : "Cadastrar"}
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
  button{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
