import React from 'react'
import style from '@/components/atoms/buttom/buttom.module.css'

type ButtomProps = {
    children: React.ReactNode;
    variant?: 'small'|'mediam'|'large';
    buttonWorking: () => void,
    loading?: boolean 
}


const Buttom = ({ children, variant='small', buttonWorking, loading }:ButtomProps) => {

  return (
    <button className={`${style[variant]}`} onClick={buttonWorking} disabled={loading} >{
      loading ? 'Analyzing...' : 'Analyzing'
      }</button>
  )
}

export default Buttom;
