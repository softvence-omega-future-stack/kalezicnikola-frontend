import { CheckCircle2 } from 'lucide-react'


const CurrentPaln = () => {
  return (
    <div>
         <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
              <span className="px-4 py-1.5 text-sm text-blue-600 border border-blue-600 rounded-full bg-blue-50">
                Professional
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-900">Payment method</span>
              {/* <svg className="h-6" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fill="#635BFF" fontSize="20" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif">stripe</text>
              </svg> */}
              <button className='text-blue-600 font-extrabold border boder-gray-100 px-2'>Stripe</button>
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-900">Started From</span>
              <span className="text-4xl font-semibold text-gray-900">899€</span>
              <span className="text-sm text-gray-600">/Per Month</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-900">Average of 2-5 easy to follow trade alerts</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-900">Average of 2-5 easy to follow trade</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-900">Average of 2-5 easy to follow trade alerts per week</span>
            </div>
          </div>

          {/* Credits Card */}
 <div className="bg-gray-50 rounded-xl p-6 mb-6">
  {/* Upper Line: Active + Subscription Date */}
  <div className="flex justify-between items-center mb-6">
    <span className="px-4 py-1.5 text-sm text-green-700 bg-green-100 rounded-full font-medium">
      Active
    </span>
    <div className="text-right flex items-center gap-2">
      <p className="text-sm text-gray-900 mb-1">Subscription end date:</p>
      <p className="text-sm font-medium text-purple-400 bg-purple-100 px-4 py-2 rounded-xl">12 Mar 2026</p>
    </div>
  </div>

  {/* Lower Line: Progress + Credits + Cost */}
  <div className="flex justify-between items-center">
    {/* Progress + Credits */}
    <div className="flex items-center gap-6">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#4F46E5"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(80 / 100) * (2 * Math.PI * 36)} ${2 * Math.PI * 36}`}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-1">80 credits left</h3>
        <p className="text-sm text-gray-600">20/100 credits used</p>
      </div>
    </div>

    {/* Cost */}
    <div className="text-3xl font-semibold text-gray-900">
      0.00€
    </div>
  </div>
</div>



          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="w-full px-6 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none cursor-pointer transition-colors">
              Cancel Current Plan
            </button>
            <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none  transition-colors cursor-pointer">
              Upgrade Plan
            </button>
          </div>
        </div>
    </div>
  )
}

export default CurrentPaln