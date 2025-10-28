import  { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";


export default function ManageSubscription() {
 
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="">
   


        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-2.5 text-sm font-normal rounded-full transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-[#526FFF] text-white'
                  : 'text-[#171c35] hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-8 py-2.5 text-sm font-normal rounded-[31px] transition-colors ${
                billingCycle === 'annually'
                  ? 'bg-[#526FFF] text-white'
                  : 'text-[#171c35] hover:bg-gray-50'
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#526FFF] mb-8">Basic Plan</h2>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[36px] font-medium text-[#526FFF]">399€</span>
                <span className="text-sm text-[#526FFF]">/month</span>
                    <p className="text-sm text-[#171c35] text-right ml-7">Full Price</p>
              </div>
          
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm  text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle  className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm  text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm  text-[#171c35]">Average of 2-5 easy to follow</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm  text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 text-xs font-semibold text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full hover:bg-blue-50 focus:outline-none  transition-colors">
              Upgrade Plan
            </button>
          </div>

          {/* Professional Plan (Active) */}
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-8">Professional</h2>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[36px] font-medium text-white">899€</span>
                <span className="text-sm text-gray-400">/month</span>
                       <p className="text-sm text-gray-300 text-right ml-6">Full Price</p>
              </div>
       
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white">Average of 2-5 easy to follow trade alerts per week</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white">Average of 2-5 easy to follow</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 text-sm font-medium text-white bg-[#526FFF] rounded-full focus:outline-none  transition-colors">
              Active Plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#526FFF] mb-8">Enterprise</h2>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[36px] font-medium text-blue-500">1299€</span>
                <span className="text-sm text-gray-600">/month</span>
                  <p className="text-sm text-[#171c35] text-right ml-2">Full Price</p>
              </div>
            
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#171c35] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#171c35]">Average of 2-5 easy to follow trade alerts</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 text-xs font-medium text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full focus:outline-none  transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}