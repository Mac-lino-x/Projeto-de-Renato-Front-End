import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">CineMario 🎬</div>
      <nav>
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/cadastro" className="nav-link btn-new">+ Adicionar</Link>
      </nav>
    </header>
  );
}

export default Header;