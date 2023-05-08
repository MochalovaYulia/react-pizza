import React, { useState } from 'react';
import './scss/app.scss';
import { Header } from './Components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Card } from './pages/Card';

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">

        <Routes>
            <Route path='/' element={<Home searchValue={searchValue}/>} />
          <Route path='/cart' element={<Card />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
