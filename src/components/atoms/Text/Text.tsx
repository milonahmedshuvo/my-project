import React from 'react'
import style from '@/components/atoms/Text/Text.module.css'

type TextProps = {
    children: React.ReactNode;
    variant?: 'title' | 'body' | 'small';
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
 