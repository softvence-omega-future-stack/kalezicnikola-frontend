import RecentIncidents from "./RecentIncidents"
import ServiceStatus from "./ServiceStates"
import SystemHelthCard from "./SystemHelthCard"
import TopSection from "./TopSection"


const SystemHelthpage = () => {
  return (
    <div>
      <TopSection/>
      <SystemHelthCard/>
      <ServiceStatus/>
      <RecentIncidents/>
    </div>
  )
}

export default SystemHelthpage
