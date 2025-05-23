import React from "react";
import styles from "./index.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse!</h3>
      <p>
        Mini Blog &copy; 2025 <br/>
        Desenvolvido por <a href="https://github.com/JPerluxo" target="_blank" rel="noreferrer">Jefferson Perluxo Clemente</a>
      </p>
    </footer>
  )
}

export default Footer;