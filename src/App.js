import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import { Header } from './Components/Header';
import { Categories } from './Components/Categories';
import { Sort } from './Components/Sort';
import { PizzaBlock } from './Components/PizzaBlock';
import PizzaSkeleton from './Components/PizzaSkeleton';


function App() {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoadig] = useState(true);

  useEffect(() => {
    fetch('https://645105d5a322196911587838.mockapi.io/items')
      .then(res => res.json())
      .then(res => {
        setItems(res)
        setIsLoadig(false)
      })

  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Всe пиццы</h2>
          <div className="content__items">
            {
              isLoading
                ? [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index} />))
                : items.map(item => (<PizzaBlock key={item.id} {...item} />))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
