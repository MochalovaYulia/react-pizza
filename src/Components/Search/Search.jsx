import React, { useContext } from 'react'
import styles from './Search.module.scss'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { SearchContext } from '../../App'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import debounce from 'lodash.debounce'

export const Search = () => {
  const [value, setValue] = useState('');
  const {setSearchValue} = useContext(SearchContext);

  const onClickClear = () => {
    setSearchValue('')
    setValue('')
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 500),
    []
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (  
    <div className={styles.root}>
      <BsSearch className={styles.icon} />
      <input 
        autoFocus
        value={value} 
        onChange={onChangeInput} 
        className={styles.input} 
        placeholder='Поиск пиццы...' 
      />
      {
        value && <AiOutlineClose onClick={onClickClear} className={styles.clearIcon} />
      }
    </div>
  )
}
