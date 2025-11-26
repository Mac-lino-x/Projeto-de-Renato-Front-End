import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function Form() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se existir (modo edição)

  // Estados para cada campo do formulário
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [imagem, setImagem] = useState('');

  // Verifica se estamos no modo EDIÇÃO ao carregar a página
  useEffect(() => {
    if (id) {
      // Se tem ID, busca os dados do filme para preencher os campos
      api.get(`/filmes/${id}`)
        .then((response) => {
          const filme = response.data;
          setTitulo(filme.titulo);
          setGenero(filme.genero);
          setAno(filme.ano);
          setImagem(filme.imagem);
        })
        .catch((erro) => {
          console.error("Erro ao carregar dados:", erro);
          alert("Erro ao carregar o filme.");
          navigate('/'); // Volta para home se der erro
        });
    }
  }, [id, navigate]);

  // Função que envia o formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Evita que a página recarregue

    const dadosFilme = {
      titulo,
      genero,
      ano: Number(ano), // Garante que o ano seja número
      imagem
    };

    try {
      if (id) {
        // Se tem ID, é uma ATUALIZAÇÃO (PUT)
        await api.put(`/filmes/${id}`, dadosFilme);
        alert("Filme atualizado com sucesso!");
      } else {
        // Se não tem ID, é um CADASTRO (POST)
        await api.post('/filmes', dadosFilme);
        alert("Filme cadastrado com sucesso!");
      }
      
      // Depois de salvar, volta para a lista (Home)
      navigate('/'); 

    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      alert("Erro ao salvar os dados.");
    }
  }

// ... (código anterior igual)

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ marginBottom: '20px' }}>{id ? 'Editar Filme' : 'Novo Filme'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              className="form-input"
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Gênero</label>
            <input 
              type="text" 
              className="form-input"
              value={genero} 
              onChange={(e) => setGenero(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Ano</label>
            <input 
              type="number" 
              className="form-input"
              value={ano} 
              onChange={(e) => setAno(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>URL da Imagem</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="https://..."
              value={imagem} 
              onChange={(e) => setImagem(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-save">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;