import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import icon from '../assets/svgIcon/herologo.svg';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqData: FAQItem[] = [
    {
      question: 'What is Docline?',
      answer:
        'Docline is a modern, cloud-based practice software. Its core feature is the AI Voicebot, which automatically handles incoming patient calls and performs routine tasks such as scheduling appointments and managing prescriptions.'
    },
    {
      question: 'How exactly does Docline work?',
      answer:
        'Docline uses advanced AI technology to process calls in real time. The voicebot understands natural language, identifies patient requests, and performs corresponding actions — from booking appointments to handling prescription requests. It integrates seamlessly with your existing systems.'
    },
    {
      question: 'Does Docline train with my patient data?',
      answer:
        'No, Docline does not train with your patient data. All data is processed in compliance with GDPR and used solely for providing our services. Your patient data remains protected and is never used for AI training.'
    },
    {
      question: 'What is an "AI Agent"?',
      answer:
        'An AI Agent is intelligent software capable of performing tasks autonomously. In the case of Docline, it is a specialized voicebot that manages patient calls, schedules appointments, and responds to routine inquiries — available 24/7.'
    },
    {
      question: 'Is my data safe with Docline?',
      answer:
        'Yes, your data is completely secure with us. We use end-to-end encryption, store all data exclusively on EU servers, and fully comply with GDPR. Regular security audits and certifications ensure the highest security standards.'
    },
    {
      question: 'Do I need new hardware for Docline?',
      answer:
        'No, you do not need any new hardware. Docline is a cloud-based solution that works with your existing IT infrastructure. You only need an internet connection and can use Docline through any modern web browser.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen  px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="xl:px-30">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
            <img src={icon} alt="Docline logo" />
            <span className="text-[#171C35] text-sm font-medium">FAQ</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-1">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7 flex items-center justify-between text-left group"
              >
                <span className="text-2xl font-medium text-[#171C35] pr-4 leading-relaxed">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-300 cursor-pointer" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-300 cursor-pointer" />
                  )}
                </div>
              </button>

              {/* Answer - Expandable */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-7 pt-0">
                  <p className="text-sm sm:text-base md:text-lg text-[#111A2D] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default FAQSection;
