import AuthenticationSector from "./AuthenticationSector"
import InterActions from "./InterActions"
import SecurityCard from "./SecurityCard"
import TopSection from "./TopSection"
import UserManagement from "./UserManagment"


const SecurityPage = () => {
  return (
    <div>
      <TopSection/>
      <SecurityCard/>
      <UserManagement/>
      <AuthenticationSector/>
      <InterActions/>
    </div>
  )
}

export default SecurityPage
