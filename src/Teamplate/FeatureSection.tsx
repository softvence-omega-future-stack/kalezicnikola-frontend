import React from 'react';

import img1 from '../assets/svgIcon/featureImg1.svg';
import img2 from '../assets/svgIcon/featureImg2.svg';
import img3 from '../assets/svgIcon/featureImg3.svg';
import icon from '../assets/svgIcon/herologo.svg';

// Common styles
const titleStyle = {
  fontFamily: 'Urbanist, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  color: '#171C35',
};

const descStyle = {
  fontFamily: 'Urbanist, sans-serif',
  fontSize: '16px',
  color: '#111A2D',
  lineHeight: '1.6',
};

// --- 1. ReliefCard ---
const ReliefCard: React.FC = () => (
  <div className="p-6 md:p-8 xl:p-[30px] bg-[#171C35] rounded-3xl shadow-sm h-full flex flex-col justify-between text-white">
    <div style={{ fontFamily: 'Urbanist, sans-serif' }}>
      <p className="text-5xl md:text-6xl xl:text-[99px]  mb-14 text-white">75%</p>
      <h3 style={{ ...titleStyle, color: 'white' }} className='text-2xl font-medium mb-3'>Relief</h3>
      <p style={{ ...descStyle, color: 'white' }} className="mt-3 text-sm ">
        The AI assistant handles an average of 75% of routine calls completely independently. 
        Your team gains this time back for more patient care.
      </p>
    </div>
  </div>
);

// --- 2. ConversationCard ---
const ConversationCard: React.FC = () => (
  <div
    className="relative p-6 md:p-8 h-full flex flex-col justify-between"
    style={{
      borderRadius: "30px",
      border: "1px solid #FFF",
      background: `
        radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
    }}
  >
    <div>
      <h3 style={titleStyle}>Docline manages 20 calls at once</h3>
      <p style={descStyle} className="mt-3 mb-6">
        Never busy tones or waiting lines again. The AI handles all incoming <br /> calls in parallel so every patient is answered immediately.
      </p>
    </div>
    <div className="flex items-center justify-end">
      <img src={img1} alt="feature visual" />
    </div>
  </div>
);


// --- 3. TriadeCard ---
const TriadeCard: React.FC = () => (
  <div
    className="relative p-6 md:p-8 h-full flex flex-col justify-between"
    style={{
      borderRadius: "30px",
      border: "1px solid #FFF",
      background: `
        linear-gradient(0deg, #FFF 0%, #FFF 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
    }}
  >
    <div>
      <h3 style={titleStyle}>Smart Triage & Call Forwarding</h3>
      <p style={descStyle} className="mt-3 mb-6">
        The AI detects emergencies. Complex inquiries are prioritized and routed directly to the responsible staff.
      </p>
    </div>
    <div className="flex items-center justify-center">
      <img src={img2} alt="triage feature" />
    </div>
  </div>
);


// --- 4. AvailabilityCard ---
const AvailabilityCard: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "30px 58px 30px 30px", // top right bottom left
      gap: "83px", // spacing between children
      borderRadius: "30px",
      border: "1px solid #FFF",
      background: "#526FFF",
      backdropFilter: "blur(50px)",
    }}
  >
    {/* 24/7 Section */}
    <p className="text-5xl md:text-6xl text-white font-bold mb-0">24/7</p>

    {/* Availability Section */}
    <div>
      <h3 style={{ ...titleStyle, color: "white", marginBottom: "0" }}>Availability</h3>
      <p style={{ ...descStyle, color: "#E0E7FF" }}>
        Your practice is reachable 365 days a year. The AI answers all calls — regardless of holidays, illness, or staff shortage.
      </p>
    </div>
  </div>
);



// --- 5. IntegrationCard ---
const IntegrationCard: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "30px 18.5px 92px 30px", // top right bottom left
      borderRadius: "30px",
      border: "1px solid #FFF",
      background: `
        linear-gradient(0deg, #FFF 0%, #FFF 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
      height: "100%",
    }}
  >
    <h3   style={{
    color: "var(--Secondary-color, #171C35)",
    fontFamily: "Urbanist, sans-serif",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "120%", // 26.4px
  }} className=' pb-[16px] ' >Easy connection to your phone system</h3>
   <p style={{ fontSize: "16px", lineHeight: "24px", margin: 0, color: "#333" }}>
  No system change or IT stress. The integration <br />with your existing phone setup is quick and easy by <br /> our onboarding team.
</p>

  </div>
);



// --- 6. SoftwareCard ---
const SoftwareCard: React.FC = () => (
  <div
    className="p-6 md:p-8 h-full flex flex-col justify-between"
    style={{
      borderRadius: "30px",
      border: "1px solid #FFF",
      background: `
        linear-gradient(0deg, #FFF 0%, #FFF 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
      fontFamily: "Urbanist, sans-serif", // <-- applies Urbanist to all text inside
    }}
  >
    <div>
      <h3 style={{ ...titleStyle, fontFamily: "Urbanist, sans-serif" }}>No extra software or hardware required</h3>
      <p style={{ ...descStyle, fontFamily: "Urbanist, sans-serif" }} className="mt-3">
        Docline runs fully in the cloud. You save on physical devices, maintenance, and gain flexibility in your workflow.
      </p>
    </div>
  </div>
);


// --- 7. CustomizationCard ---
const CustomizationCard: React.FC = () => (
  <div
    className="relative p-6 md:p-8 h-full flex flex-col justify-between"
    style={{
      borderRadius: "30px",
      border: "1px solid #FFF",
      background: `
        radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
      fontFamily: "Urbanist, sans-serif", // Ensures all text uses Urbanist
    }}
  >
    <div>
      <h3 style={{ ...titleStyle, fontFamily: "Urbanist, sans-serif" }}>Tailored to your practice</h3>
      <p style={{ ...descStyle, fontFamily: "Urbanist, sans-serif", marginTop: "12px", marginBottom: "24px" }}>
        The AI’s tone, wording, and rules are customized exactly to your practice style. <br /> Patients often don’t even notice they’re speaking to an AI.
      </p>
    </div>
    <div className="flex items-center justify-end">
      <img src={img3} alt="customization feature" />
    </div>
  </div>
);


// --- Main Grid ---
const FeatureCardsGrid: React.FC = () => {
  return (
    <div className="py-8 px-4 mx-15 ">
      <div className="text-center mb-16">
        <div style={{}} className="inline-flex items-center gap-2 px-3 py-2 border border-white bg-[rgba(255, 255, 255, 0.10);] rounded-full mb-6 -mt-7">
          <img src={icon} alt="" />
          <span style={descStyle}>Peace on the phone</span>
        </div>

        <h2
          style={{
            fontFamily: 'Urbanist, sans-serif',
            fontSize: '40px',
            fontWeight: 600,
            color: '#171C35',
          }}
          className="mb-4"
        >
          The Relief <span className="block">Your Team Deserves</span>
        </h2>

        <p style={descStyle} className="max-w-2xl mx-auto">
          The Docline AI assistant solves the biggest challenges in daily practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div className="lg:col-span-1">
          <ReliefCard />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <ConversationCard />
        </div>

        {/* Row 2 */}
        <TriadeCard />
        <AvailabilityCard />
        <IntegrationCard />

        {/* Row 3 */}
        <div className="lg:col-span-1">
          <SoftwareCard />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <CustomizationCard />
        </div>
      </div>
    </div>
  );
};

export default FeatureCardsGrid;
