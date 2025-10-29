// import VoicebotDashboard from "./AIVoiceBoot"
import CardHeader from "./CardSection"
import Customer from "./Customer"
import RevenueChart from "./RevenueChart"
import TopSection from "./TopSection"

const DashboardHome = () => {
  return (
    <div>
      <TopSection/>
      <CardHeader/>
    <div className="flex gap-5">
        <RevenueChart/>
      <Customer/>
    </div>
    <div className="mt-4">
      {/* <VoicebotDashboard/> */}
    </div>
    </div>
  )
}

export default DashboardHome