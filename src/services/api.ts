import axios from 'axios';

// Cria uma conexão padrão com o backend na porta 3000
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;