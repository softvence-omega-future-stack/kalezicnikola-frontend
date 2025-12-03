import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import icon from "../assets/svgIcon/herologo.svg";
import "./buttom.css";
import SectionHeader from "./SectionHeader";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "What is Docline?",
      answer:
        "Docline is a modern, cloud-based practice software. Its core feature is the AI Voicebot...",
    },
    {
      question: "How exactly does Docline work?",
      answer:
        "Docline uses advanced AI technology to process calls in real time...",
    },
    {
      question: "Does Docline train with my patient data?",
      answer:
        "No, Docline does not train with your patient data. All data is processed in compliance...",
    },
    {
      question: 'What is an "AI Agent"?',
      answer:
        "An AI Agent is intelligent software capable of performing tasks autonomously...",
    },
    {
      question: "Is my data safe with Docline?",
      answer:
        "Yes, your data is completely secure with us. We use end-to-end encryption...",
    },
    {
      question: "Do I need new hardware for Docline?",
      answer:
        "No, you do not need any new hardware. Docline is a cloud-based solution...",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="mt-12 md:mt-[120px]"
    >
      <div className="relative px-2 overflow-hidden">
        {/* Header Section */}
        <div className="relative text-center mb-12">
              <SectionHeader
  badgeIcon={icon}
  badgeText="FAQ" // i18n key
  heading={<>    Frequently Asked Questions</>}

  align="center"
/>
          {/* <div
            style={{
                boxShadow: `-6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                1.2px 1.2px 0 -0.4px #FFF inset, 
                -1.2px -1.2px 0 -0.5px #FFF inset`,
     padding: "10px 20px 10px 20px",
              backdropFilter: "blur(5px)",
            }}
            className="relative inline-flex items-center gap-2 pr-5 pl-2.5 py-2  bg-white/10 rounded-full mb-4 mx-auto"
          >
            <img src={icon} alt="Docline logo" />
            <span className="text-headingBlack text-sm font-medium">FAQ</span>
          </div>

          <h2 className="text-[32px] sm:text-[42px] md:text-5xl font-semibold text-[#171C35] leading-[120%]">
            Frequently Asked Questions
          </h2> */}

          <div
            style={{
              width: "90%",
              maxWidth: "600px",
              height: "500px",
              borderRadius: "40px",
              background: "rgba(197, 23, 255, 0.10)",
              filter: "blur(50px)",
            }}
            className="mx-auto"
          ></div>
        </div>

        {/* FAQ Accordion Wrapper */}
        <div className="-mt-[560px] max-w-7xl mx-auto space-y-4 overflow-hidden">
          <div className="relative z-10 space-y-1">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7 flex items-center justify-between cursor-pointer text-left group"
                >
                  <span className="text-base md:text-2xl font-medium text-headingBlack pr-4 leading-[34px]">
                    {faq.question}
                  </span>

                  {/* Icon Rotate Smooth */}
                  <div
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </button>

                {/* Smooth Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-[800px]" : "max-h-0"
                  }`}
                >
                  <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-7 pt-0">
                    <p className="text-sm sm:text-base md:text-lg font-normal tracking-[0.3px] text-subHeadingBlack leading-[25px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
