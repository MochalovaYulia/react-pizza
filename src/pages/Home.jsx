import React, { useContext, useEffect, useState } from 'react'
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { PizzaBlock } from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaSkeleton';
import { Pagination } from '../Components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/FilterSlice';
import axios from 'axios';

export const Home = () => {

    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort)
    const dispatch = useDispatch();

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoadig] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    useEffect(() => {
        setIsLoadig(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        axios.get(`https://645105d5a322196911587838.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => {
                setItems(res.data)
                setIsLoadig(false)
            })
        window.scrollTo(0, 0);

    }, [categoryId, sortType, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index} />));
    const pizzas = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false).map(item => (<PizzaBlock key={item.id} {...item} />))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
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
