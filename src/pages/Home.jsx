import React, { useContext, useEffect, useState } from 'react'
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { PizzaBlock } from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaSkeleton';
import { Pagination } from '../Components/Pagination/Pagination';
import { SearchContext } from '../App';

export const Home = () => {

    const {searchValue} = useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoadig] = useState(true);
    const [categoryID, setCategoryID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoadig(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryID > 0 ? `category=${categoryID}` : ''

        fetch(`https://645105d5a322196911587838.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoadig(false)
            })
        window.scrollTo(0, 0);

    }, [categoryID, sortType, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index} />));
    const pizzas = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false).map(item => (<PizzaBlock key={item.id} {...item} />))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryID={categoryID} onClickCategory={(index) => setCategoryID(index)} />
                <Sort sortType={sortType} onClickSort={(index) => setSortType(index)} />
            </div>
            <h2 className="content__title">Всe пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
            <Pagination onChangePage={num => setCurrentPage(num)} />
        </div>
    )
}
