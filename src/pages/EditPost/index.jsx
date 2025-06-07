import { React, useEffect, useState } from "react";
import styles from "./index.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const user = useAuthValue();

  useEffect(() => {

    if(post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tagsArray.join(", "));
    }

  }, [post])

  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch(error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if(!title || !image || !tags || !body) setFormError("Preencha todos os campos!");

    updateDocument(id, {
      title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName
    });

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (<>
      <h2>Editando Post: {post.title}</h2>
      <p>Altere os dados do post como desejar</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name="title" required placeholder="Pense num bom título..." onChange={(event) => setTitle(event.target.value)} value={title}/>
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input type="text" name="image" required placeholder="Insira uma imagem que represente o seu post" onChange={(event) => setImage(event.target.value)} value={image}/>
        </label>
        <p className={styles.previewText}>Preview da imagem atual:</p>
        <img className={styles.previewImage} src={post.image} alt={post.title}/>
        <label>
          <span>Conteúdo:</span>
          <textarea type="body" required placeholder="Insira o conteúdo do seu post" onChange={(event) => setBody(event.target.value)} value={body}></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" name="tags" required placeholder="Insira as tags separadas por vírgula" onChange={(event) => setTags(event.target.value)} value={tags}/>
        </label>
        {!response.loading && <button type="submit" className="btn">Editar Post</button>}
        {response.loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
      </>)}
    </div>
  )
}

export default EditPost;
