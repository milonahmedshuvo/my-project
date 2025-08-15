import React from 'react'
import styles from '@/components/organisms/HeaderInfoList/HeaderInfoList.module.css'
import HeaderInfoList from '@/components/organisms/HeaderInfoList/HeaderInfoList';

type SecurityReportDataProps = {
    securityReport : {
    title: string;
    value: string;
    recommendation: string;
    status: 'Missing' | 'Present';
    }[]
}


const SecurityReportTamplate = ({securityReport}:SecurityReportDataProps) => {

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Header Information</h1>
        <HeaderInfoList data={securityReport} />
    </div>
  )
}

export default SecurityReportTamplate;
