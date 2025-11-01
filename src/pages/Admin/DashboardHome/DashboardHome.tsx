// import VoicebotDashboard from "./AIVoiceBoot"
import CallvolumeChart from "./CallVolumeCart"
import CardHeader from "./CardSection"
import Customer from "./Customer"
import RecentAddDoctors from "./RecentAddDoctors"
import RevenueChart from "./RevenueChart"
import TopSection from "./TopSection"

const DashboardHome = () => {
  return (
    <div className="">
      <TopSection/>
      <CardHeader/>
    <div className="flex gap-5">
        <RevenueChart/>
      <Customer/>
    </div>
    <div className="flex gap-5">
        <CallvolumeChart/>
      <RecentAddDoctors/>
    </div>
    
    </div>
  )
}

export default DashboardHome