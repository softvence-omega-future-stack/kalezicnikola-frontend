import icon from '../assets/svgIcon/herologo.svg';
import tricjcircle from '../assets/svgIcon/tickcircle.svg';
import tricjcirclewhite from '../assets/svgIcon/tick-circle-white.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradPlan = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const navigate = useNavigate()

  return (
  
    <div 
        className='relative mt-44 xl:mx-20 px-4 md:px-8 rounded-[40px] overflow-hidden ' 
        style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)' }} 
    > 
      
     
      <div
        style={{
          width: '680px', 
          height: '400px', 
          borderRadius: '50%',
          background: 'rgba(43, 142, 255, 0.30)',
          filter: 'blur(200px)',
          transform: 'rotate(11deg)',
        }}
        className="absolute -top-32 -left-64 z-0 opacity-70"
      ></div>

      {/* Right shape */}
      <div
        style={{
          width: '654px', 
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(71, 43, 255, 0.20)',
          filter: 'blur(200px)',
          transform: 'rotate(-80deg)',
        }}
        className="absolute top-32 right-[-80px] z-0 opacity-50"
      ></div>

      {/* Main Content (z-10) */}
      <div 
        style={{ fontFamily: 'Urbanist, sans-serif' }} 
      
        className='relative z-10 p-4 md:p-8 xl:p-12 pb-16' 
      >
        <div className=''>
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6 bg-white"> 
              <img src={icon} alt="Docline logo" />
              <span className="text-[#171C35] text-sm font-medium">Transparent pricing</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
              Choose the right plan
              <br /> for your practice
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 text-sm font-normal rounded-full transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-[#526FFF] text-white font-medium shadow-md'
                    : 'text-[#171c35] hover:bg-gray-50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-6 py-2.5 text-sm font-normal rounded-full transition-colors ${
                  billingCycle === 'annually'
                    ? 'bg-[#526FFF] text-white font-medium shadow-md'
                    : 'text-[#171c35] hover:bg-gray-50'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard Plan */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-[#526FFF] mb-8">Standard</h2>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-medium text-[#526FFF]">399€</span>
                  <span className="text-sm text-[#526FFF]">/month</span>
                  <p className="text-sm text-[#171c35] mt-1 ml-auto">Full Price</p> 
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {['AI Voicebot setup & configuration','24/7 availability & call handling','Intelligent triage & task creation','2000 call minutes / month included','€0.35 per extra minute','Email Support'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={tricjcircle} alt="" />
                    <span className="text-sm text-[#171c35]">{text}</span>
                  </div>
                ))}
              </div>
              <button  onClick={()=>navigate('/signup')}   className="w-full mt-8 px-6 py-3 text-base font-medium text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full  transition-colors">
                GET STARTED
              </button>
            </div>

            {/* Premium Plan (Highlighted) */}
            <div className="bg-[#171C35] rounded-3xl p-8 shadow-xl border border-[#3C4263]">
              <h2 className="text-xl font-semibold text-white mb-8">Premium</h2>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-medium text-white">899€</span>
                  <span className="text-sm text-gray-300">/month</span> 
                  <p className="text-sm text-gray-300 mt-1 ml-auto">Full Price</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {['AI Voicebot setup & configuration','24/7 availability & call handling','Intelligent triage & task creation','4000 call minutes / month included','€0.30 per extra minute','Multilingual (25+ languages)','Prioritized email and live chat support'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={tricjcirclewhite} alt="" />
                    <span className="text-sm text-white">{text}</span>
                  </div>
                ))}
              </div>
              <button  onClick={()=>navigate('/signup')}  className="w-full px-6 py-3 text-base font-medium text-white bg-[#526FFF] rounded-full transition-colors shadow-lg">
                GET STARTED
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-[#526FFF] mb-8">Enterprise</h2>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-medium text-blue-500">1299€</span>
                  <span className="text-sm text-gray-600">/month</span>
                  <p className="text-sm text-[#171c35] mt-1 ml-auto">Full Price</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {['AI Voicebot setup & configuration','24/7 availability & call handling','Intelligent triage & task creation','4000 call minutes / month included','€0.30 per overtime minute','Multilingual (25+ languages)','24/7 Premium Support'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={tricjcircle} alt="" />
                    <span className="text-sm text-[#171c35]">{text}</span>
                  </div>
                ))}
              </div>
              <button  onClick={()=>navigate('/signup')}  className="w-full px-6 py-3 text-base font-medium text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full transition-colors">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradPlan;



