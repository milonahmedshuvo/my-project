import Badge from '@/components/atoms/Badge/Badge'
import Text from '@/components/atoms/Text/Text'
import React from 'react'
import styles from '@/components/molecules/RouteInfoItem/RouteInfoItem.module.css'

type RouteInfoItemProps = {
     title: string,
     status: "Avaiable" | "Not Avaiable"
}

const RouteInfoItem = ({title, status}:RouteInfoItemProps) => {


  return (
    <div className={styles.card}>
       <Text variant='body'> {title} </Text>
       <Badge label={status} variant={status == "Not Avaiable"? "error" : "success" } />
    </div>
  )
}

export default RouteInfoItem
