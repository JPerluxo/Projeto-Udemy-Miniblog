import { React, useState } from "react";
import styles from "./index.module.css";

import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const user = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    let imageUrl;
    try {
      imageUrl = new URL(image);
    } catch(error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if(!title || !image || !tags || !body) setFormError("Preencha todos os campos!");

    insertDocument({
      title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName
    });

    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name="title" required placeholder="Pense num bom título..." onChange={(event) => setTitle(event.target.value)} value={title}/>
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input type="text" name="image" required placeholder="Insira uma imagem que represente o seu post" onChange={(event) => setImage(event.target.value)} value={image}/>
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea type="body" required placeholder="Insira o conteúdo do seu post" onChange={(event) => setBody(event.target.value)} value={body}></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" name="tags" required placeholder="Insira as tags separadas por vírgula" onChange={(event) => setTags(event.target.value)} value={tags}/>
        </label>
        {!response.loading && <button type="submit" className="btn">Criar Post</button>}
        {response.loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;
