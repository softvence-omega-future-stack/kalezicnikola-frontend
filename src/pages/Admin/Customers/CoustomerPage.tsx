
import TopSection from './TopSection'
import CustomerCard from './CustomerCard'
import DoctorDatabaseTable from './DoctorDatabase'

const CoustomerPage = () => {
  return (
    <div className='max-[767px]:mt-6'>
       <TopSection/>
       <CustomerCard/>
       <DoctorDatabaseTable/>
    </div>
  )
}

export default CoustomerPage
