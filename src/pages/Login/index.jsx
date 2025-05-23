import { React, useState, useEffect } from "react";
import styles from "./index.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("");

    const user = { email, password };

    await login(user);
  };

  useEffect(() => {
    if(authError) setError(authError);
  }, [authError]);


  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input type="email" name="email" required placeholder="E-mail do usuário" value={email} onChange={(event) => setEmail(event.target.value)}/>
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder="Insira sua senha" value={password} onChange={(event) => setPassword(event.target.value)}/>
        </label>
        {!loading && <button type="submit" className="btn">Entrar</button>}
        {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login;
