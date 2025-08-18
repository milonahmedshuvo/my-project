import SecurityReportTamplate from '@/components/templates/SecurityReport/SecurityReportTamplate';
import React from 'react'


const SecurityReportPage = () => {

    const securityReportData = [
    {
      title: 'Strict transport security',
      value: '',
      recommendation: 'Enforce HTTPS',
      status: 'Missing' as const
    },
    {
      title: 'Content security policy',
      value: '',
      recommendation: 'Recommended for XSS protection',
      status: 'Missing' as const
    },
    {
      title: 'X-Frame-Options',
      value: '',
      recommendation: 'Prevents clickjacking attacks',
      status: 'Missing' as const
    }
  ];


  return (
    <div>
       <SecurityReportTamplate securityReport={securityReportData} />
    </div>
  )
}

export default SecurityReportPage;