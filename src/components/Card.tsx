import { Link } from 'react-router-dom';
import type { Filme } from '../types';

interface CardProps {
  data: Filme;
  onDelete: (id: string) => void;
}

function Card({ data, onDelete }: CardProps) {
  return (
    <div className="card">
      <img src={data.imagem} alt={data.titulo} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{data.titulo}</h3>
        <p className="card-info">{data.genero} • {data.ano}</p>
        
        <div className="card-actions">
          <Link to={`/editar/${data.id}`} className="btn-action btn-edit">
            Editar
          </Link>
          <button onClick={() => onDelete(data.id)} className="btn-action btn-delete">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;