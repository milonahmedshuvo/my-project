import React from 'react'
import style from '@/components/atoms/Text/Text.module.css'

type TextProps = {
    children: React.ReactNode;
    variant?: 'title' | 'body' | 'small' | 'homeHeaderTitle' | 'homeHeaderSubTitle' | 'inputTitle';
    className?: string
}


const Text = ({children, variant='body', className=''}:TextProps) => {


  return (
    <p className={`${style[variant]} ${className}`}>
      {children}
    </p>
  )
}

export default Text;
 