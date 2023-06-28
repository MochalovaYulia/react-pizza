import React from 'react'
import styles from './Search.module.scss'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/FilterSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  // сохранили ссылку на функцию и сделали ее отложенной, вызываем каждый раз когда меняется input
  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value))
    }, 1000),
    []
  )

  const onChangeInput = (event: any) => {
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
