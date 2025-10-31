
import AIVoiceCall from './AIVoiceCall'
import AIVoiceCard from './AIVoiceCard'
import RecentBotInteractions from './BootInteractions'
import TopSection from './TopSection'

const AIVoicePage = () => {
  return (
    <div>
      <TopSection/>
      <AIVoiceCard/>
      <AIVoiceCall/>
      <RecentBotInteractions/>
    </div>
  )
}

export default AIVoicePage
