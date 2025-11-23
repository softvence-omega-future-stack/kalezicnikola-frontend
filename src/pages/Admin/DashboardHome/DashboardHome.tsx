// import VoicebotDashboard from "./AIVoiceBoot"
import CallvolumeChart from "./CallVolumeCart"
import CardSection from "./CardSection"
import Customer from "./Customer"
import RecentAddDoctors from "./RecentAddDoctors"
import RevenueChart from "./RevenueChart"
import TopSection from "./TopSection"

const DashboardHome = () => {
  return (
    <div className='max-[767px]:mt-6'>
      <TopSection />
      <CardSection />
      <div className="flex flex-col md:flex-row gap-5">
        <RevenueChart />
        <Customer />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <CallvolumeChart />
        <RecentAddDoctors />
      </div>

    </div>
  )
}

export default DashboardHome