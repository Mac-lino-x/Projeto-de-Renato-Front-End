import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Form from './components/Form'; // Usando o Form como página conforme estrutura

function App() {
  return (
    <BrowserRouter>
      {/* O Header fica fora do Routes para aparecer em todas as páginas */}
      <Header />
      
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Rota para a Listagem (Home) */}
          <Route path="/" element={<Home />} />
          
          {/* Rota para Criar Novo */}
          <Route path="/cadastro" element={<Form />} />
          
          {/* Rota para Editar (recebe o ID pela URL) */}
          <Route path="/editar/:id" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Projeto Finalizado!