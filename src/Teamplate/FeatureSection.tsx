import React from 'react';
import { Phone, MessageSquare, Settings, Wrench } from 'lucide-react';
import icon from '../assets/svgIcon/herologo.svg';

const DoclineFeaturesSection: React.FC = () => {
  return (
    <section className="w-full -mt-10 px-4 sm:px-6 lg:px-30">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
          <img src={icon} alt="" />
          <span className="text-[#171C35] text-sm font-medium">Peace on the phone</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
          The Relief <span className="block">Your Team Deserves</span>
        </h2>

        <p className="text-lg text-[#111A2D] max-w-2xl mx-auto">
          The Docline AI assistant solves the biggest <br /> challenges in daily practice
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">

        {/* Row 1 */}
        <div className="lg:col-span-2">
          <div className="bg-[#171C35] text-white rounded-4xl p-8 flex flex-col justify-between shadow-xl h-full">
            <h3 className="text-[99px] font-extralight mb-6">75%</h3>
            <h4 className="text-2xl font-medium mb-4">Relief</h4>
            <p className="text-[#FFFFFF] text-sm leading-relaxed">
              The AI assistant handles 75% of routine calls completely. This gives your team the time they deserve for more meaningful work.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 h-full">
            <h4 className="text-2xl font-semibold text-[#171c35] mb-3">Docline handles 20 calls simultaneously</h4>
            <p className="text-[#111A2D] text-base mb-6">
              No more waiting. No wasted time. Patients <br /> get their appointments, each patient can <br /> be served immediately.
            </p>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-gray-300 rounded-full"></div>)}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {[1,2].map(i => <div key={i} className="w-10 h-10 bg-gray-300 rounded-full"></div>)}
                </div>
              </div>
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="15%" y1="25%" x2="45%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="15%" y1="50%" x2="45%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="15%" y1="75%" x2="45%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="55%" y1="50%" x2="85%" y2="30%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="55%" y1="50%" x2="85%" y2="70%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 h-full">
            <h4 className="text-xl font-semibold text-[#171c35] mb-3">Intelligent Triage & Call Routing</h4>
            <p className="text-gray-600 text-sm mb-6">
              The AI recognizes urgent cases. Complex inquiries are prioritized and forwarded directly to the relevant contact person.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                <p className="text-xs text-gray-600 font-medium">Patient</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-400 rounded-full mx-auto mb-2"></div>
                <p className="text-xs text-gray-600 font-medium">MFA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#526FFF] text-white rounded-4xl p-8 h-full flex flex-col justify-between shadow-xl">
            <h3 className="text-[96px] font-extralight  mb-6">24/7</h3>
            <h4 className="text-2xl font-medium mb-4">Availability</h4>
            <p className=" text-sm leading-relaxed">
              Your practice is 24/7. Always accessible. Wherever the calls arrive, every request is answered and forwarded to the right contact in the cloud.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 h-full">
            <h4 className="text-xl font-semibold text-[#171C35] mb-3">Easy Connection to Your Phone System</h4>
            <p className="text-[#111A2D] text-base">
              No change. No IT stress. Our connection works seamlessly with your existing phone infrastructure and is quickly set up by our onboarding team.
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 h-full">
            <h4 className="text-xl font-semibold text-[#171c35] mb-3">No Additional Software or Hardware Required</h4>
            <p className="text-[#667085] text-base">
              Docline runs completely in the cloud. You can manage everything from your existing devices. IT support and flexible access can be provided without physical devices.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 h-full">
            <h4 className="text-xl font-semibold text-[#171c35] mb-3">Individually Tailored to Your Practice</h4>
            <p className="text-gray-600 text-sm mb-6">
              Voice, language, and rules of the AI are adapted to the style of your practice. Patients notice seamlessly that AI speaks with them.
            </p>
            <div className="flex items-center justify-around mt-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600"/>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600"/>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-pink-600"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoclineFeaturesSection;
