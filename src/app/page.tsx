import { HeaderInfoItem } from "@/components/molecules/HeaderInfoItem/HeaderInfoItem";
import SecurityReportPage from "@/app/pages/security-report"
import RouteInfoItem from "@/components/molecules/RouteInfoItem/RouteInfoItem";
import SensitiveRoutePage from "./pages/sensitive-route";


export default function Home() {

  return (
    <div>
      {/* <p>my app</p> */}
      {/* <HeaderInfoItem title="Strict transport security" value="Emtry" recommendation="recommendation" status='Missing'></HeaderInfoItem> */}
      <SecurityReportPage/>
      <SensitiveRoutePage/>

      {/* <RouteInfoItem title="/Admin" status="Not Avaiable" /> */}
    </div>
  )
}
