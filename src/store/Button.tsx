"use client"
import React from 'react'
import styles from '@/store/Store.module.css'

type ButtonProps = {
  children: React.ReactNode,
  variant: 'success' | 'error',
  workFunc: () => void
}

const Button = ({children, variant, workFunc}:ButtonProps) => {

  return (
      <div>
         <button onClick={workFunc} className={`${styles[variant]}`} >{children}</button>
      </div>
  )
}

export default Button;
