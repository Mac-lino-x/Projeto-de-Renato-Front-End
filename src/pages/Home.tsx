import { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../services/api';
import type { Filme } from '../types';

function Home() {
  // 1. Estado para guardar os filmes que vêm da API
  const [filmes, setFilmes] = useState<Filme[]>([]);
  
  // 2. Estado para controlar o carregamento (opcional, mas boa prática)
  const [loading, setLoading] = useState(true);

  // 3. Função que busca os dados
  async function carregarFilmes() {
    try {
      // Faz um GET ao http://localhost:3000/filmes
      const resposta = await api.get('/filmes');
      setFilmes(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar filmes:", erro);
      alert("Erro ao carregar os filmes. Verifique se o servidor está rodando!");
    } finally {
      setLoading(false);
    }
  }

  // 4. useEffect: Executa 'carregarFilmes' assim que o componente é montado
  useEffect(() => {
    carregarFilmes();
  }, []);

  // 5. Função de Exclusão (Passamos ela para o Card depois)
  async function excluirFilme(id: string) {
    // Pergunta de confirmação básica
    if (!confirm("Tem certeza que deseja excluir este filme?")) return;

    try {
      await api.delete(`/filmes/${id}`);
      // Atualiza a lista visualmente removendo o item apagado
      setFilmes(filmes.filter(filme => filme.id !== id));
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      alert("Ocorreu um erro ao excluir.");
    }
  }

// ... (código anterior igual)

  return (
    <div className="container">
      <h2>Catálogo Filmes/Séries</h2>

      {loading && <p>Carregando...</p>}

      {!loading && filmes.length === 0 && (
        <p>Parece que está vazio aqui, Bora adicionar algo!</p>
      )}

      <div className="movie-grid">
        {filmes.map((filme) => (
          <Card 
            key={filme.id} 
            data={filme} 
            onDelete={excluirFilme} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;