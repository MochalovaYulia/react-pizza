import React, { useContext, useEffect, useRef, useState } from 'react'
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { PizzaBlock } from '../Components/PizzaBlock';
import qs from 'qs';
import PizzaSkeleton from '../Components/PizzaSkeleton';
import { Pagination } from '../Components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilter } from '../redux/slices/FilterSlice';
import axios from 'axios';
import { list } from '../Components/Sort'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort)
    const currentPage = useSelector(state => state.filter.currentPage)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoadig] = useState(true);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    // Если изменили URL-параметры и был первый рендер 
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    //  Если был первый рендер, то проверяем URL-параметры и сохраняем  в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilter({
                ...params,
                sort
            }))

            isSearch.current = true;
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            setIsLoadig(true)

            const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
            const sortBy = sortType.sortProperty.replace('-', '')
            const category = categoryId > 0 ? `category=${categoryId}` : ''

            axios.get(`https://645105d5a322196911587838.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
                .then(res => {
                    setItems(res.data)
                    setIsLoadig(false)
                })
        }
        isSearch.current = false
        window.scrollTo(0, 0);

    }, [categoryId, sortType, searchValue, currentPage])

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
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}
