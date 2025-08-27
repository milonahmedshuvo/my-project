import React from 'react'
import style from '@/components/atoms/buttom/buttom.module.css'

type ButtomProps = {
    children: React.ReactNode;
    variant?: 'small'|'mediam'|'large';
    buttonWorking: () => void 
}

const Buttom = ({ children, variant='small', buttonWorking }:ButtomProps) => {

  return (
    <button className={`${style[variant]}`} onClick={buttonWorking} >{children}</button>
  )
}

export default Buttom;
