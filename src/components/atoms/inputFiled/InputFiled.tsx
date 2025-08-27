'use client'
import React from 'react'
import styles from '@/components/atoms/inputFiled/inputFiled.module.css'

type InputProps = {
    url: string;
    loading: boolean;
    onChangeUrl: (url: string) => void
}


const InputFiled = ({url, loading, onChangeUrl}:InputProps) => {

  return (
      <input 
      type='text' 
      placeholder='https://example.com' 
      value={url}
      onChange={(e) => onChangeUrl(e.target.value)}
      disabled={false}
      className={styles.inputFiled}
      />
  )
}

export default InputFiled
