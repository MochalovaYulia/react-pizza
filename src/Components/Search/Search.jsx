import React from 'react'
import styles from './Search.module.scss'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'

export const Search = ({searchValue, setSearchValue}) => {
  return (
    <div className={styles.root}>
      <BsSearch className={styles.icon} />
      <input 
        value={searchValue} 
        onChange={event => setSearchValue(event.target.value)} 
        className={styles.input} 
        placeholder='Поиск пиццы...' 
      />
      {
        searchValue && <AiOutlineClose onClick={() => setSearchValue('')} className={styles.clearIcon} />
      }
    </div>
  )
}
