
import trickcircle from '../../../assets/svgIcon/tickcircle.svg'
import trickcirclewhite from '../../../assets/svgIcon/tick-circle-white.svg'

const SubscriptionPlan = () => {
  return (
    <div className='bg-white rounded-xl  md:rounded-3xl px-4 md:px-6 py-4'>
        <h1 className='text-xl md:text-2xl font-semibold text-headingBlack pb-5 pt-2'>Subscription Plans</h1>
      {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-[#F5F6FF] rounded-[20px] p-4 md:p-8">
            <h2 className="text-2xl font-bold text-[#526FFF] mb-8">Basic Plan</h2>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1 flex-wrap ">
                <span className="text-[48px] font-medium text-[#526FFF]">$147</span>
                <span className="text-sm text-[#526FFF]">/month</span>
                    <p className="text-base text-headingBlack text-right ml-20">Billed annually</p>
              </div>
          
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm  text-subHeadingBlack">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm  text-subHeadingBlack">Average of 2-5 easy to follow trade alerts per week</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm  text-subHeadingBlack">Average of 2-5 easy to follow</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm  text-subHeadingBlack">Average of 2-5 easy to follow trade alerts</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 text-base mt-17 uppercase font-semibold text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full focus:outline-none transition-colors cursor-pointer">
              Active user 89
            </button>
          </div>

          {/* Professional Plan (Active) */}
          <div className="bg-gray-900 rounded-[20px] p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-8">Professional</h2>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                <span className="text-[48px] font-medium text-white">$899</span>
                <span className="text-sm text-gray-400">/month</span>
                       <p className="text-sm text-gray-300 text-right  ml-20">Full Price</p>
              </div>
       
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <img src={trickcirclewhite} alt="" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcirclewhite} alt="" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcirclewhite} alt="" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade alerts per week</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcirclewhite} alt="" />
                <span className="text-sm text-white">Average of 2-5 easy to follow</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcirclewhite} alt="" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade alerts </span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcirclewhite} alt="" />
                <span className="text-sm text-white">Average of 2-5 easy to follow</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 text-base font-semibold uppercase text-white bg-[#526FFF] rounded-full focus:outline-none  transition-colors cursor-pointer">
              Active user 102
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#F5F6FF] rounded-[20px] p-8 ">
            <h2 className="text-2xl font-bold text-headingBlack mb-8">Enterprise</h2>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                <span className="text-[48px] font-medium text-blue-500">$1299</span>
                <span className="text-sm text-gray-600">/month</span>
                  <p className="text-sm text-headingBlack text-right ml-20">Full Price</p>
              </div>
            
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm text-headingBlack">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={trickcircle} alt="" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts per week</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 text-base font-semibold uppercase text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full focus:outline-none transition-colors cursor-pointer">
             Active user 89
            </button>
          </div>
        </div>
    </div>
  )
}

export default SubscriptionPlan
