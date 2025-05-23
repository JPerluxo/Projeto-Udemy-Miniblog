import React from "react";
import styles from "./index.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const search = useQuery().get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search}>
      <h2>Resultados</h2>
      {posts && posts.length === 0 && (<div className={styles.noposts}>
        <p>Não foram encontrados posts a partir da sua busca...</p>
        <Link to="/" className="btn btn-dark">Voltar</Link>
      </div>)}

      {posts && posts.map((post) => ( <PostDetail key={post.id} post={post}/> ))}
    </div>
  )
}

export default Search;