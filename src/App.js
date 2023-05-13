import React, { createContext, useState } from 'react';
import './scss/app.scss';
import { Header } from './Components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Card } from './pages/Card';

export const SearchContext = createContext('');

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Card />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
