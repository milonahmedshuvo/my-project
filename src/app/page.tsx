'use client'
import Form from "@/components/molecules/form/Form"
import HomeHeader from "@/components/molecules/homeHeader/homeHeader"
import useWebsiteAnalyzer from "@/hooks/useWebsiteAnalyzer"
import { Card, CardHeader } from "@/store/Card"
import { useState } from "react"




export default function Home() {
      //  const [loading, setLoading] = useState(false)
       const [url, setUrl] = useState('')
       const { loading, error, websiteAnalyze, results } = useWebsiteAnalyzer()


       console.log({loading, error, results})


       const handleAnalytice = () => {
         console.log(url)
         websiteAnalyze(url)
       }
       


  return (
    <>  
      <HomeHeader headerTitle='Website Health Checker' subTitle='Comprehensive analysis of your websites performance, security, SEO, and compliance' titleVariant="homeHeaderTitle" subTitleVariant="homeHeaderSubTitle" />
      <Form url={url} setUrl={setUrl} loading={loading} error={error} onAnalytice={handleAnalytice} buttonText="Analytice" />


      <div>
         <Card>
             <CardHeader>
                 <p>Analysis Results for {results?.url}</p>
             </CardHeader>
         </Card>




      </div>
      
    </>
  )
}
