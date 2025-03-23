import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Estado para a data selecionada
  const [country, setCountry] = useState("brazil"); // Estado para o país
  const [error, setError] = useState(null);

  // Função para buscar dados de COVID-19
  const fetchData = async (date) => {
    try {
      const formattedDate = `${date}T00:00:00Z`;
      const response = await fetch(`https://covid19api.com/dayone/country/${country}/status/confirmed/live?date=${formattedDate}`);
      const result = await response.json();
      
      if (result && result.length > 0) {
        setData(result);
        setError(null);
      } else {
        setData([]);
        setError("Nenhum dado encontrado para a data selecionada.");
      }
    } catch (err) {
      setError('Erro ao buscar dados, tente novamente mais tarde.');
      setData([]);
    }
  };

  // Função chamada quando o usuário seleciona uma data
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    if (selected) {
      fetchData(selected); // Busca dados quando a data for selecionada
    }
  };

  // Função chamada quando o usuário seleciona um país
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    fetchData(selectedDate); // Recarrega os dados para o país selecionado
  };

  return (
    <div className="App">
      <h1>COVID-19 Tracker</h1>
      
      {/* Seletor de País */}
      <div>
        <label htmlFor="country">Escolha um país:</label>
        <select value={country} onChange={handleCountryChange}>
          <option value="brazil">Brasil</option>
          <option value="usa">Estados Unidos</option>
          <option value="india">Índia</option>
          {/* Adicione mais países conforme necessário */}
        </select>
      </div>

      {/* Seletor de Data */}
      <div>
        <label htmlFor="date">Escolha uma data:</label>
        <input 
          type="date" 
          id="date"
          value={selectedDate}
          onChange={handleDateChange} 
        />
      </div>
      
      {error && <p className="error">{error}</p>}
      
      <div>
        <h2>Dados para {country}</h2>
        {data.length > 0 ? (
          <div>
            <p>Data selecionada: {selectedDate}</p>
            <ul>
              {data.map((entry, index) => (
                <li key={index}>
                  Casos Confirmados: {entry.Cases} | Data: {entry.Date}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{error ? error : 'Carregando dados...'}</p>
        )}
      </div>
    </div>
  );
}

export default App;
