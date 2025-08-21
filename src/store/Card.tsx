'use client'
import styles from '@/store/Store.module.css'
type CardProps = {
    children: React.ReactNode
}

export function Card ({children}:CardProps) {
    return <div className={`${styles.cardContainer}`}>{children}</div>
}

export function CardHeader ({children}:CardProps) {
    return <div className={`${styles.cardHeader}`}>{children}</div>
}

export function Cardbody ({children}:CardProps) {
    return <div>{children}</div>
}

export function CardFooter ({children}:CardProps) {
    return <div> {children}</div>
}


