import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://your-backend-url/bfhl', { data: JSON.parse(jsonInput) });
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting JSON', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFilter(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {
      numbers: filter.includes('Numbers') ? response.numbers : [],
      alphabets: filter.includes('Alphabets') ? response.alphabets : [],
      highest_lowercase_alphabet: filter.includes('Highest lowercase alphabet') ? response.highest_lowercase_alphabet : [],
    };

    return (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <select multiple onChange={handleFilterChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
