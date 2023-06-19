import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const FullPizza = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>(); // тут содержится только определнный тип данных в <> это объект с (imageUrl, title, price)
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://645105d5a322196911587838.mockapi.io/items/' + id)
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if(!pizza) {
        return <>Загрузка...</>
    }

    return (
        <div className='container'>
            <img
                className="pizza-block__image"
                src={pizza.imageUrl}
            />
            <h2 className="pizza-block__title">{pizza.title}</h2>
            <h4 className="pizza-block__price">{pizza.price} ₽</h4>
        </div>
    )
}
