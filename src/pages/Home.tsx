import React, { useEffect, useRef } from 'react'
import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { PizzaBlock } from '../Components/PizzaBlock';
import qs from 'qs';
import PizzaSkeleton from '../Components/PizzaSkeleton';
import { Pagination } from '../Components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilter } from '../redux/slices/FilterSlice';

import { list } from '../Components/Sort'
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizza } from '../redux/slices/PizzaSlice';

export const Home: React.FC = () => {

    const {categoryId, sortType, currentPage, searchValue} = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num: number) => {
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
        getPizza()
    }, [categoryId, sortType, searchValue, currentPage])

    const getPizza = () => {
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        dispatch(
            // @ts-ignore
            fetchPizzas({
            order,
            sortBy,
            category,
            currentPage
        }));

        window.scrollTo(0, 0)
    }

    const skeletons = [...new Array(6)].map((_, index) => (<PizzaSkeleton key={index} />));
    const pizzas = items.filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false).map((item: any) => (
        <Link key={item.id} to={`/pizza/${item.id}`}>
            <PizzaBlock {...item} />
        </Link>
    ))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Всe пиццы</h2>
            {
                status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>Произошла ошибка 😕</h2>
                        <br />
                        <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                    </div>
                ) : (
                    <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
                )
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}
