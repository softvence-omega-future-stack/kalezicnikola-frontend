import React from "react";

import img1 from "../assets/svgIcon/featureImg1.svg";
import img2 from "../assets/svgIcon/featureImg2.svg";
import img3 from "../assets/img/important.png";
import icon from "../assets/svgIcon/herologo.svg";
import "./buttom.css";
import SectionHeader from "./SectionHeader";

// Common styles
const titleStyle = {
  fontWeight: 500,
  color: "#171C35",
};

// --- 1. ReliefCard ---
const ReliefCard: React.FC = () => (
  <div className="p-4 md:p-8 xl:p-[30px] bg-headingBlack  rounded-2xl sm:rounded-[30px] flex flex-col justify-between text-white">
    <div>
      <p className="text-2xl sm:text-3xl md:text-6xl xl:text-[96px] mb-8 md:mb-14 font-extralight font-urbanist text-[96px]  leading-none  text-white">
        75%
      </p>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium leading-7">
        Relief
      </h3>

      <p className="mt-3 mb-2 text-sm sm:text-base text-white">
        The AI assistant handles an average of 75% of routine calls completely
        independently.
      </p>
      <span className="">
        Your team gains this time back for <br /> more patient care.
      </span>
    </div>
  </div>
);

// --- 2. ConversationCard ---
const ConversationCard: React.FC = () => (
  <div
    className="relative p-4 md:p-8 lg:pt-[30px] lg:px-[30px] h-full rounded-2xl sm:rounded-[30px] flex flex-col lg:flex-row justify-between overflow-hidden"
    style={{
      border: "1px solid #FFF",
      fontFamily: "Urbanist, sans-serif",
      background: `
        radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
    }}
  >
    <div className="">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-headingBlack leading-5 md:leading-7">
        Docline manages 20 calls at once
      </h3>
      <p className="mt-3 mb-2 text-sm sm:text-base text-subHeadingBlack">
        Never busy tones or waiting lines again <br /> The AI handles all
        incoming calls in parallel so every patient is answered immediately.
      </p>
    </div>
    <div className="flex items-end justify-center lg:justify-end mt-10 sm:mt-auto">
      <img src={img1} alt="feature visual" className="max-w-full h-auto" />
    </div>
  </div>
);

// --- 3. TriadeCard ---
const TriadeCard: React.FC = () => (
  <div
    className="relative pt-6 px-6 pb-0 md:pt-[30px] md:pl-[30px] h-full rounded-2xl sm:rounded-[30px] flex flex-col justify-between overflow-hidden"
    style={{
      border: "1px solid #FFF",
      fontFamily: "Urbanist, sans-serif",
      background: `
        linear-gradient(0deg, #FFF 0%, #FFF 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
    }}
  >
    <div className="mb-4 md:mb-6">
      <h3 className="text-lg sm:text-xl lg:text-2xl">
        Smart Triage & Call Forwarding
      </h3>
      <p className="mt-3 mb-2 text-sm sm:text-base text-subHeadingBlack">
        The AI detects emergencies. Complex inquiries{" "}
        <br className="hidden lg:block" /> are prioritized and routed directly
        to the responsible staff.
      </p>
    </div>
    <div className="flex items-end justify-start ">
      <img src={img2} alt="triage feature" className="max-w-full " />
    </div>
  </div>
);

// --- 4. AvailabilityCard ---
const AvailabilityCard: React.FC = () => (
  <div
    className="p-4 md:p-[30px] h-full rounded-2xl sm:rounded-[30px] flex flex-col justify-between"
    style={{
      border: "1px solid #FFF",
      background: "#526FFF",
      fontFamily: "Urbanist, sans-serif",
      backdropFilter: "blur(50px)",
    }}
  >
    <p className="text-3xl md:text-6xl xl:text-[96px] mb-8 md:mb-14 font-extralight text-white">
      24/7
    </p>

    <div>
      <h3
        className="text-lg sm:text-xl lg:text-2xl leading-7 mb-3"
        style={{ ...titleStyle, color: "white", marginBottom: "12px" }}
      >
        Availability
      </h3>
      <p className="mt-3 mb-2 text-sm sm:text-base text-white">
        Your practice is reachable 365 days a year. The AI answers all calls —
        regardless of holidays, illness,
        <br className="hidden lg:block" /> or staff shortage.
      </p>
    </div>
  </div>
);

// --- 5. IntegrationCard ---
const IntegrationCard: React.FC = () => (
  <div
    className="p-4 md:p-[30px] h-full rounded-2xl sm:rounded-[30px] flex flex-col justify-start"
    style={{
      border: "1px solid #FFF",
      background: `
        linear-gradient(0deg, #FFF 0%, #FFF 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
    }}
  >
    <h3 className="text-lg sm:text-xl lg:text-2xl leading-7 mb-4">
      Easy connection to your <br className="hidden lg:block" /> phone system
    </h3>
    <p className="mt-3 mb-2 text-sm sm:text-base text-subHeadingBlack">
      No system change or IT stress. <br className="hidden lg:block" />
      The integration with your existing <br className="hidden lg:block" />{" "}
      phone setup is quick and easy by our onboarding{" "}
      <br className="hidden lg:block" />
      team.
    </p>
  </div>
);

// --- 6. SoftwareCard ---
const SoftwareCard: React.FC = () => (
  <div
    className="p-4 md:p-[30px] h-full rounded-2xl sm:rounded-[30px] flex flex-col justify-start"
    style={{
      border: "1px solid #FFF",
      background: `
        linear-gradient(0deg, #FFF 0%, #FFF 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
      fontFamily: "Urbanist, sans-serif",
    }}
  >
    <div>
      <h3 className="text-lg sm:text-xl lg:text-2xl leading-7 font-semibold mb-3">
        No extra software or <br className="hidden lg:block" /> hardware
        required
      </h3>
      <p className="mt-3 mb-2 text-sm sm:text-base text-subHeadingBlack">
        Docline runs fully in the cloud. <br className="hidden lg:block" /> You
        save on physical devices, maintenance,{" "}
        <br className="hidden lg:block" /> and gain flexibility in your
        workflow.
      </p>
    </div>
  </div>
);

// --- 7. CustomizationCard ---
const CustomizationCard: React.FC = () => (
  <div
    className="relative w-full p-4 lg:p-8 rounded-2xl sm:rounded-[30px] h-full flex flex-col lg:flex-row justify-between overflow-hidden"
    style={{
      border: "1px solid #FFF",
      background: `
        radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%),
        radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.20) 0%, rgba(43, 142, 255, 0.00) 100%),
        #FFF
      `,
      backdropFilter: "blur(50px)",
      fontFamily: "Urbanist, sans-serif",
    }}
  >
    <div className="">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
        Tailored to your practice
      </h3>
      <div className="flex flxe-col md:flex-row">
        <p className="mt-3 text-sm sm:text-base text-subHeadingBlack">
          The AI's tone, wording, and rules are customized exactly to your
          practice style. Patients often don't even notice they're speaking to
          an AI.
        </p>
        <div
          className="flex flex-col items-end w-[328px] h-full justify-center lg:justify-end"
          style={{
            filter: "drop-shadow(0 9.756px 95.122px rgba(99, 120, 225, 0.31))",
          }}
        >
          <img src={img3} alt="customization feature" className="" />
        </div>
      </div>
    </div>
  </div>
);

// --- Main Grid ---
const FeatureSection: React.FC = () => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="pt-0 pb-0 sm:pt-8 md:-mt-19">
            <SectionHeader
              badgeIcon={icon}
              badgeText="Peace on the phone"
              heading={
                <>
                  The Relief <span className="block">Your Team Deserves</span>
                </>
              }
              align="center"
            />
            <p className="text-center -mt-4 mb-10 md:mb-[60px] text-sm md:text-xl">
              The Docline AI assistant solves the biggest challenges in daily
              practice
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1: 2 cards - Relief (1 col) + Conversation (2 cols on lg) */}
              <div className="md:col-span-1 lg:col-span-1">
                <ReliefCard />
              </div>
              <div className="md:col-span-1 lg:col-span-2">
                <ConversationCard />
              </div>

              {/* Row 2: 3 cards - each 1 col */}
              <div className="md:col-span-1 lg:col-span-1">
                <TriadeCard />
              </div>
              <div className="md:col-span-1 lg:col-span-1">
                <AvailabilityCard />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <IntegrationCard />
              </div>

              {/* Row 3: 2 cards - Software (1 col) + Customization (2 cols on lg) */}
              <div className="md:col-span-1 lg:col-span-1">
                <SoftwareCard />
              </div>
              <div className="md:col-span-1 lg:col-span-2">
                <CustomizationCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
