import SensitiveRouteTamplates from '@/components/templates/SensitiveRoute/SensitiveRoute';
import React from 'react'

const SensitiveRoutePage = () => {


    const sensitiveRoutes = [
        {
             title: "/Admin",
             status: "Avaiable" as const 
        },
        {
             title: "/Login",
             status: "Avaiable" as const 
        },
        {
             title: "/.env",
             status: "Avaiable" as const 
        },
        {
             title: "/Private",
             status: "Avaiable" as const 
        },
        {
             title: "/Student",
             status: "Avaiable" as const 
        }
    ]


  return (
    <div>
       <SensitiveRouteTamplates sensitiveRoutes={sensitiveRoutes}/>
    </div>
  )
}

export default SensitiveRoutePage;
