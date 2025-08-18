import RouteInfoItem from '@/components/molecules/RouteInfoItem/RouteInfoItem'
import styles from '@/components/organisms/RouteItemList/RouteItemList.module.css'
import React from 'react'

type RouteItemData = {
    title: string,
    status: "Avaiable" | "Not Avaiable"
}

type RouteItemProps = {
    data : RouteItemData[]
}

const RouteItemList = ({data}:RouteItemProps) => {

  return (
    <div className={styles.list}>
       {
         data?.map((item,index)=> <RouteInfoItem key={index} title={item.title} status={item.status}/>)
       }
    </div>
  )
}

export default RouteItemList
