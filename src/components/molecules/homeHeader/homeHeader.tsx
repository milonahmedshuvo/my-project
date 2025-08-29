import Text from '@/components/atoms/Text/Text'
import React from 'react'

type HeaderCardProps = {
    headerTitle: string,
    subTitle: string,
    titleVariant: "small" | "title" | "body" | "homeHeaderTitle" | "homeHeaderSubTitle"| "inputTitle",
    subTitleVariant: "small" | "title" | "body" | "homeHeaderTitle" | "homeHeaderSubTitle"
}


const HomeHeader = ({headerTitle, subTitle, titleVariant, subTitleVariant}: HeaderCardProps) => {

  return (
    <div>
      <Text variant={titleVariant} >{headerTitle}</Text>
      <Text variant={subTitleVariant} >{subTitle}</Text>
    </div>
  )
}

export default HomeHeader;
