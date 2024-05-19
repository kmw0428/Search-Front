import React from 'react';
import SearchForm from './componets/SearchForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Site Search</h1>
      </header>
      <SearchForm />
    </div>
  );
};

export default App;
