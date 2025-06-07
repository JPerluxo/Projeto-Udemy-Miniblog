import React from "react";
import styles from "./index.module.css";

import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const uid = useAuthValue().uid;
  const { documents: posts, isLoading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  if(isLoading) return <p>Carregando...</p>

  return (<div className={styles.dashboard}>
    <h2>Dashboard</h2>
    <p>Gerencie os seus posts</p>
    {posts && posts.length === 0 ? (
      <div className={styles.noPosts}>
        <p>Não foram encontrados posts</p>
        <Link to="/posts/create" className="btn">Criar primeiro post</Link>
      </div>
    ) : (
      <>
        <div className={styles.postHeader}>
          <span>Título</span>
          <span>Ações</span>
        </div>
        {posts && posts.map((post) => <div key={post.id} className={styles.postRow}>
          <p>{post.title}</p>
          <div>
            <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
            <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
          </div>
        </div>)}
      </>
    )}
  </div>)
}

export default Dashboard;
