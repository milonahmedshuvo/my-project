'use client'
import Form from "@/components/molecules/form/Form"
import HomeHeader from "@/components/molecules/homeHeader/homeHeader"
import { useState } from "react"




export default function Home() {
       const [loading, setLoading]= useState(false)
       

  return (
    <>  
      <HomeHeader headerTitle='Website Health Checker' subTitle='Comprehensive analysis of your websites performance, security, SEO, and compliance' titleVariant="homeHeaderTitle" subTitleVariant="homeHeaderSubTitle" />

      <Form/>

      
    </>
  )
}
