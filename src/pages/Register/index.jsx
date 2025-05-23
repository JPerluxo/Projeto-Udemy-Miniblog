import { React, useState, useEffect } from "react";
import styles from "./index.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("");

    const user = { displayName, email, password };

    if(password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    await createUser(user);
  };

  useEffect(() => {
    if(authError) setError(authError);
  }, [authError]);

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" name="displayName" required placeholder="Nome do usuário" value={displayName} onChange={(event) => setDisplayName(event.target.value)}/>
          </label>
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" required placeholder="E-mail do usuário" value={email} onChange={(event) => setEmail(event.target.value)}/>
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name="password" required placeholder="Insira sua senha" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </label>
          <label>
            <span>Confirmação de Senha:</span>
            <input type="password" name="confirmPassword" required placeholder="Confirme a sua senha" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
          </label>
          {!loading && <button type="submit" className="btn">Cadastrar</button>}
          {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register;
