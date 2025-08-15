import React from 'react';
import styles from '@/components/organisms/HeaderInfoList/HeaderInfoList.module.css'
import  {HeaderInfoItem}  from '@/components/molecules/HeaderInfoItem/HeaderInfoItem';

type HeaderData = {
  title: string;
  value: string;
  recommendation: string;
  status: 'Missing' | 'Present';
};

type HeaderInfoListProps = {
  data: HeaderData[];
};


const HeaderInfoList = ({data}:HeaderInfoListProps) => {

  return (
    <div className={`${styles.list}`}>
      {
         data?.map((item, index) => <HeaderInfoItem key={index} title={item.title} value={item.value} recommendation={item.recommendation} status={item.status}/>)
      }
    </div>
  )
}

export default HeaderInfoList

