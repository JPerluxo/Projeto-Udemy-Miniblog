import { React, useState } from "react";
import styles from "./index.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, isLoading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(query) return navigate(`/search?q=${query}`);
  };

  return (
    <div className={styles.home}>
      <h1>Veja as postagens mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder="Ou busque por tags..." onChange={(event) => setQuery(event.target.value)} value={query}/>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {isLoading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post}/> )}
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>Não foram encontradas postagens</p>
            <Link to="/posts/create" className="btn">Criar primeira postagem</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;