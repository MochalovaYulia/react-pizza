import React, { useContext } from 'react'
import styles from './Search.module.scss'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { SearchContext } from '../../App'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import debounce from 'lodash.debounce'

export const Search = () => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);

  const onClickClear = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus();
  }

  // сохранили ссылку на функцию и сделали ее отложенной, вызываем каждый раз когда меняется input
  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value)
    }, 1000),
    []
  )

  const onChangeInput = event => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }


  return (
    <div className={styles.root}>
      <BsSearch className={styles.icon} />
      <input
        ref={inputRef}
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
