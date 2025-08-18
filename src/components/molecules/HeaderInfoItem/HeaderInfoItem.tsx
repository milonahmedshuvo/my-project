import React from 'react';
import  styles  from '@/components/molecules/HeaderInfoItem/HeaderInfoItem.module.css'
import  Text  from '@/components/atoms/Text/Text';
import Badge from '@/components/atoms/Badge/Badge';

type HeaderInfoItemProps = {
  title: string;
  value: string;
  recommendation: string;
  status: 'Missing' | 'Present';
};


export const HeaderInfoItem: React.FC<HeaderInfoItemProps> = ({
  title,
  value,
  recommendation,
  status
}) => {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <Text variant="title">{title}</Text>
        <Badge label={status} variant={status === 'Missing' ? 'error' : 'success'} />
      </div>

      <div className={styles.header}>
         <Text variant="small">Value:</Text>
         <Text variant="small">{ value || 'Empty'}</Text>
      </div>
      

      <div className={`${styles.header}`}>
        <Text variant="small"> Recommendation </Text>
        <Text variant="small" className={styles.italic}> {recommendation} </Text>
      </div>

      
    </div>
  );
};
