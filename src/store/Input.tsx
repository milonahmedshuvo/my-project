import React from 'react'
import styles from '@/store/Store.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label? : string
}


const Input = ({label, ...props}:InputProps) => {
    
  return (
    <div>
       <input {...props} className={`${styles.inputStyle}`} />
    </div>
  )
}

export default Input;
