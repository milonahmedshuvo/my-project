import { HeaderInfoItem } from "@/components/molecules/HeaderInfoItem/HeaderInfoItem";
import SecurityReportPage from "@/app/pages/security-report"


export default function Home() {

  return (
    <div>
      {/* <p>my app</p> */}
      {/* <HeaderInfoItem title="Strict transport security" value="Emtry" recommendation="recommendation" status='Missing'></HeaderInfoItem> */}
      <SecurityReportPage/>
    </div>
  )
}
