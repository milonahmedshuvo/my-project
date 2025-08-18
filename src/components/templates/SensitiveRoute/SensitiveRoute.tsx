import Text from '@/components/atoms/Text/Text'
import RouteItemList from '@/components/organisms/RouteItemList/RouteItemList'
import styles from '@/components/templates/SensitiveRoute/SensitiveRoute.module.css'
import React from 'react'

type SensitiveRouteProps = {
    sensitiveRoutes: {
        title: string,
        status: 'Avaiable' | 'Not Avaiable'
    }[]
}


const SensitiveRouteTamplates = ({sensitiveRoutes}:SensitiveRouteProps) => {

  return (
    <div className={`${styles.container}`}>
        <h2 className={styles.title}>Sensitive Routes</h2>
       <RouteItemList data={sensitiveRoutes} />
    </div>
  )
}

export default SensitiveRouteTamplates;
