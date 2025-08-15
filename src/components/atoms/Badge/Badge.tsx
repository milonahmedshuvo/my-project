import React from 'react'
import style from '@/components/atoms/Badge/Badge.module.css'


type BadgeProps = {
    label: string,
    variant: 'success' | 'warning' | 'error'
}


const Badge = ({label, variant}:BadgeProps) => {

  return (
    <span className={`${style.badge} ${style[variant]}`}>
       {label}
    </span>
  )
}

export default Badge;
