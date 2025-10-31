import React from "react";

const RecentBotInteractions: React.FC = () => {
  // Types
  type InteractionOutcome = "Appointment Book" | "Escalated" | "Error" | "Other";
  type InteractionSentiment = "Positive" | "Negative" | "Neutral";

  interface BotInteraction {
    timestamp: string;
    doctorID: string;
    outcome: InteractionOutcome;
    duration: string;
    sentiment: InteractionSentiment;
  }

  // Sample Data
  const data: BotInteraction[] = [
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-001", outcome: "Appointment Book", duration: "02:40 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-002", outcome: "Escalated", duration: "01:20 Sec", sentiment: "Negative" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-003", outcome: "Appointment Book", duration: "01:20 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-004", outcome: "Appointment Book", duration: "05:40 Sec", sentiment: "Positive" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-005", outcome: "Error", duration: "00:40 Sec", sentiment: "Negative" },
    { timestamp: "01-09-2025 at 10:32:15", doctorID: "CUST-006", outcome: "Appointment Book", duration: "02:40 Sec", sentiment: "Positive" },
  ];

  // Helper function to get Tailwind classes based on Outcome
  const getOutcomeClasses = (outcome: InteractionOutcome): string => {
    switch (outcome) {
      case "Appointment Book":
        return "bg-[#0089331A] text-[#008080]";
      case "Escalated":
        return "bg-[#F0A2111A] text-[#F0A211]";
      case "Error":
        return "bg-[#FF2F2F1A] text-[#FF2F2F]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Helper function to get Tailwind classes based on Sentiment
  const getSentimentClasses = (sentiment: InteractionSentiment): string => {
    switch (sentiment) {
      case "Positive":
        return "bg-[#A052FF1A] text-[#A052FF]";
      case "Negative":
        return "bg-[#FF2F2F1A] text-[#FF2F2F]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 md:p-10 bg-white mt-4  rounded-2xl  overflow-hidden font-sans">
      <h2 className="text-2xl font-semibold mb-6 text[#171C35]">Recent Bot Interactions</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className=" text-left text-base font-semibold text-[#171C35]">
              <th className="py-3 pr-4 whitespace-nowrap">Timestamp</th>
              <th className="py-3 px-4">Doctor ID</th>
              <th className="py-3 px-4">Outcome</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 pl-4">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="text-sm border-b last:border-b-0 text-[#667085] font-medium  transition-colors"
              >
                <td className="py-3 pr-4 whitespace-nowrap text-sm">{item.timestamp}</td>
                <td className="py-3 px-4 whitespace-nowrap text-[#111A2D] ">{item.doctorID}</td>
              <td className="py-3 px-4">
                  <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 h-8 w-[175px] text-sm font-medium ${getOutcomeClasses(item.outcome)}`}>
                    <span
                      className="h-2 w-2 rounded-full mr-2 flex-shrink-0"
                      style={{
                        backgroundColor:
                          item.outcome === "Appointment Book"
                            ? "#008080"
                            : item.outcome === "Escalated"
                            ? "#F0A211"
                            : "#FF2F2F",
                      }}
                    ></span>
                    {item.outcome}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-[#111A2D] ">{item.duration}</td>
                <td className="py-3 pl-4">
                  <span className={`inline-flex rounded-3xl px-3 py-1 h-8 w-20 items-center justify-center  text-xs font-medium ${getSentimentClasses(item.sentiment)}`}>
                    {item.sentiment}
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
