import React from 'react'

export const Categories = ({ categoryId, onChangeCategory }) => {

    const categories = [
        'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                        <li key={index} onClick={() => onChangeCategory(index)} className={categoryId === index ? 'active' : ''}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}
