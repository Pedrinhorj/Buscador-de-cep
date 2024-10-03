import { FiSearch } from "react-icons/fi";
import "./style.css";
import { useState } from "react";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch() {
    // /01001000/json/

    if (input === "") {
      alert("Preencha algum cep");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops Erro ao buscar cep");
      setInput("");
    }
  }
  return (
    <div className="conteiner">
      <h1 className="title">Buscador CEP</h1>
      <div className="conteinerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="black" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2> CEP: {cep.cep}</h2>

          <span>logradouro: {cep.logradouro}</span>
          <span>complemento: {cep.complemento}</span>
          <span>bairro:{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
          <span>estado: {cep.estado}</span>
          <span>região {cep.regiao}</span>
          <span>ibge: {cep.ibge}</span>
          <span>ddd: {cep.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
