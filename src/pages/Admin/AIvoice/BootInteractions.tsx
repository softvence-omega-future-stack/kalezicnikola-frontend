import React from "react";
import { useTranslation } from "react-i18next";

const RecentBotInteractions: React.FC = () => {
  const { t } = useTranslation();

  type InteractionOutcome = "Appointment Book" | "Escalated" | "Error" | "Other";
  type InteractionSentiment = "Positive" | "Negative" | "Neutral";

  interface BotInteraction {
    timestamp: string;
    doctorID: string;
    outcome: InteractionOutcome;
    duration: string;
    sentiment: InteractionSentiment;
  }

  const data: BotInteraction[] = [
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-001", outcome: "Appointment Book", duration: "02:40 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-002", outcome: "Escalated", duration: "01:20 Sec", sentiment: "Negative" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-003", outcome: "Appointment Book", duration: "01:20 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-004", outcome: "Appointment Book", duration: "05:40 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-005", outcome: "Error", duration: "00:40 Sec", sentiment: "Negative" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-006", outcome: "Appointment Book", duration: "02:40 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 11:00:00", doctorID: "CUST-007", outcome: "Other", duration: "03:10 Sec", sentiment: "Neutral" } // Added "Other" outcome
  ];

  /**
   * Returns the Tailwind CSS classes for the outcome badge.
   * Note: The "Other" outcome falls into the default case.
   */
  const getOutcomeClasses = (outcome: InteractionOutcome): string => {
    switch (outcome) {
      case "Appointment Book":
        return "bg-[#0089331A] text-[#008080]";
      case "Escalated":
        return "bg-[#F0A2111A] text-[#F0A211]";
      case "Error":
        return "bg-[#FF2F2F1A] text-[#FF2F2F]";
      default: // Handles "Other"
        return "bg-gray-100 text-gray-700";
    }
  };
  
  /**
   * Returns the color code for the status dot inside the outcome badge.
   */
  const getOutcomeColor = (outcome: InteractionOutcome): string => {
    switch (outcome) {
      case "Appointment Book":
        return "#008080";
      case "Escalated":
        return "#F0A211";
      case "Error":
        return "#FF2F2F";
      default: // Handles "Other"
        return "#667085"; // A neutral gray color
    }
  };

  /**
   * Returns the Tailwind CSS classes for the sentiment badge.
   */
  const getSentimentClasses = (sentiment: InteractionSentiment): string => {
    switch (sentiment) {
      case "Positive":
        return "bg-[#A052FF1A] text-[#A052FF]";
      case "Negative":
        return "bg-[#FF2F2F1A] text-[#FF2F2F]";
      default: // Handles "Neutral"
        return "bg-gray-100 text-gray-700";
    }
  };

  /**
   * Generates a lowercase, space-removed key for i18n lookup (e.g., "Appointment Book" -> "appointmentbook").
   */
  const getOutcomeKey = (outcome: InteractionOutcome): string =>
    outcome.replace(/ /g, "").toLowerCase();

  /**
   * Generates a lowercase key for i18n lookup (e.g., "Positive" -> "positive").
   */
  const getSentimentKey = (sentiment: InteractionSentiment): string =>
    sentiment.toLowerCase();

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-3xl mt-4">
      <h1 className="text-xl md:text-2xl font-semibold text-headingBlack pb-3">
        {t("adminDashboard.routes.aiVoice.recentBotInteractions.title")}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-sm md:text-base font-semibold text-headingBlack">
              <th className="py-3 pr-2 md:pr-4 whitespace-nowrap text-xs md:text-sm">
                {t("adminDashboard.routes.aiVoice.recentBotInteractions.tableHeaders.timestamp")}
              </th>
              <th className="py-3 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm">
                {t("adminDashboard.routes.aiVoice.recentBotInteractions.tableHeaders.doctorID")}
              </th>
              <th className="py-3 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm">
                {t("adminDashboard.routes.aiVoice.recentBotInteractions.tableHeaders.outcome")}
              </th>
              <th className="py-3 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm">
                {t("adminDashboard.routes.aiVoice.recentBotInteractions.tableHeaders.duration")}
              </th>
              <th className="py-3 pl-2 md:pl-4 whitespace-nowrap text-xs md:text-sm">
                {t("adminDashboard.routes.aiVoice.recentBotInteractions.tableHeaders.sentiment")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-sm border-b last:border-b-0 text-[#667085] font-medium transition-colors">
                <td className="py-3 pr-2 md:pr-4 whitespace-nowrap text-xs md:text-sm">
                  <span className="block max-w-[120px] md:max-w-none truncate">
                    {item.timestamp}
                  </span>
                </td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm text-subHeadingBlack">
                  {item.doctorID}
                </td>
                <td className="py-3 px-2 md:px-4">
                  <span className={`inline-flex items-center justify-center rounded-full px-2 py-1 h-7 md:h-8 w-[140px] md:w-[175px] text-xs md:text-sm font-medium ${getOutcomeClasses(item.outcome)}`}>
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full mr-1.5 md:mr-2 shrink-0"
                      style={{
                        backgroundColor: getOutcomeColor(item.outcome) // Simplified using new helper function
                      }}
                    ></span>
                    {t(`adminDashboard.routes.aiVoice.recentBotInteractions.outcomes.${getOutcomeKey(item.outcome)}`)}
                  </span>
                </td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm text-subHeadingBlack">
                  {item.duration}
                </td>
                <td className="py-3 pl-2 md:pl-4">
                  <span className={`inline-flex rounded-3xl px-2 py-1 h-7 md:h-8 w-16 md:w-20 items-center justify-center text-xs font-medium ${getSentimentClasses(item.sentiment)}`}>
                    {t(`adminDashboard.routes.aiVoice.recentBotInteractions.sentiments.${getSentimentKey(item.sentiment)}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBotInteractions;







// import React from "react";

// const RecentBotInteractions: React.FC = () => {
//   // Types
//   type InteractionOutcome = "Appointment Book" | "Escalated" | "Error" | "Other";
//   type InteractionSentiment = "Positive" | "Negative" | "Neutral";

//   interface BotInteraction {
//     timestamp: string;
//     doctorID: string;
//     outcome: InteractionOutcome;
//     duration: string;
//     sentiment: InteractionSentiment;
//   }

//   // Sample Data
//   const data: BotInteraction[] = [
//     { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-001", outcome: "Appointment Book", duration: "02:40 Sec", sentiment: "Positive" },
//     { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-002", outcome: "Escalated", duration: "01:20 Sec", sentiment: "Negative" },
//     { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-003", outcome: "Appointment Book", duration: "01:20 Sec", sentiment: "Positive" },
//     { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-004", outcome: "Appointment Book", duration: "05:40 Sec", sentiment: "Positive" },
//     { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-005", outcome: "Error", duration: "00:40 Sec", sentiment: "Negative" },
//     { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-006", outcome: "Appointment Book", duration: "02:40 Sec", sentiment: "Positive" },
//   ];

//   // Helper function to get Tailwind classes based on Outcome
//   const getOutcomeClasses = (outcome: InteractionOutcome): string => {
//     switch (outcome) {
//       case "Appointment Book":
//         return "bg-[#0089331A] text-[#008080]";
//       case "Escalated":
//         return "bg-[#F0A2111A] text-[#F0A211]";
//       case "Error":
//         return "bg-[#FF2F2F1A] text-[#FF2F2F]";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // Helper function to get Tailwind classes based on Sentiment
//   const getSentimentClasses = (sentiment: InteractionSentiment): string => {
//     switch (sentiment) {
//       case "Positive":
//         return "bg-[#A052FF1A] text-[#A052FF]";
//       case "Negative":
//         return "bg-[#FF2F2F1A] text-[#FF2F2F]";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="bg-white p-4 md:p-6 rounded-xl  md:rounded-3xl mt-4">
//       <h1 className="text-xl md:text-2xl font-semibold text-headingBlack pb-3">
//         Recent Bot Interactions
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className=" text-left text-base font-semibold text-headingBlack">
//               <th className="py-3 pr-4 whitespace-nowrap">Timestamp</th>
//               <th className="py-3 px-4">Doctor ID</th>
//               <th className="py-3 px-4">Outcome</th>
//               <th className="py-3 px-4">Duration</th>
//               <th className="py-3 pl-4">Sentiment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr
//                 key={index}
//                 className="text-sm border-b last:border-b-0 text-[#667085] font-medium  transition-colors"
//               >
//                 <td className="py-3 pr-4 whitespace-nowrap text-sm">{item.timestamp}</td>
//                 <td className="py-3 px-4 whitespace-nowrap text-subHeadingBlack ">{item.doctorID}</td>
//                 <td className="py-3 px-4">
//                   <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 h-8 w-[175px] text-sm font-medium ${getOutcomeClasses(item.outcome)}`}>
//                     <span
//                       className="h-2 w-2 rounded-full mr-2 shrink-0"
//                       style={{
//                         backgroundColor:
//                           item.outcome === "Appointment Book"
//                             ? "#008080"
//                             : item.outcome === "Escalated"
//                               ? "#F0A211"
//                               : "#FF2F2F",
//                       }}
//                     ></span>
//                     {item.outcome}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4 whitespace-nowrap text-subHeadingBlack ">{item.duration}</td>
//                 <td className="py-3 pl-4">
//                   <span className={`inline-flex rounded-3xl px-3 py-1 h-8 w-20 items-center justify-center  text-xs font-medium ${getSentimentClasses(item.sentiment)}`}>
//                     {item.sentiment}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RecentBotInteractions;
