import React, { useState } from 'react'

export const Categories = ({ categoryID, onClickCategory }) => {

    const categories = [
        'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                        <li key={index} onClick={() => onClickCategory(index)} className={categoryID === index ? 'active' : ''}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}
