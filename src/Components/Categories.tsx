import React from 'react'

type CategoriesProps = {
    categoryId: number;
    onChangeCategory: (index: number) => void;
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {

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
})
