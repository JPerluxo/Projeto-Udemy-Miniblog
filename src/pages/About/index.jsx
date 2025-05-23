import React from "react";
import styles from "./index.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto consiste em um blog feito com React no front-end e Firebase para um <a id={styles.udemyLink} href="https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/" target="_blank" rel="noreferrer">curso da Udemy</a>.</p>
      <Link to="/posts/create" className="btn">Criar Post</Link>
    </div>
  )
}

export default About;