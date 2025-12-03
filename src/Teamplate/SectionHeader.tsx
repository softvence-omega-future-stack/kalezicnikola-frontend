import React from "react";
import { useTranslation } from "react-i18next";

interface SectionHeaderProps {
  badgeText: string;
  badgeIcon: string;
  heading: string | string[] | React.ReactNode;
  subText?: string | string[] | React.ReactNode;
  layout?: "vertical" | "horizontal";
  align?: "left" | "center";
  subAlign?: "left" | "center" | "right";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeIcon,
  heading,
  subText,
  layout = "vertical",
  align = "center",
  subAlign = "center",
}) => {
  const { t } = useTranslation();

  // Function to render text with responsive line breaks
  const renderText = (text: string | string[] | React.ReactNode, isHeading: boolean = true) => {
    // If text is array (multi-line)
    if (Array.isArray(text)) {
      return text.map((line, index) => (
        <React.Fragment key={index}>
          <span className={isHeading ? "block md:inline" : "inline-block"}>
            {typeof line === "string" ? t(line) : line}
          </span>
          {index < text.length - 1 && (
            <br className={isHeading ? "hidden md:inline" : "hidden lg:inline"} />
          )}
        </React.Fragment>
      ));
    }
    
    // If text is string (with ||| break marker)
    if (typeof text === "string") {
      const translated = t(text);
      if (translated.includes('|||')) {
        const parts = translated.split('|||');
        return (
          <>
            <span className={isHeading ? "inline-block" : "inline"}>
              {parts[0].trim()}
            </span>
            <br className={isHeading ? "hidden md:inline" : "hidden lg:inline"} />
            <span className={isHeading ? "inline-block" : "inline"}>
              {parts[1].trim()}
            </span>
          </>
        );
      }
      return translated;
    }
    
    // If text is React node
    return text;
  };

  // Simple alignment classes
  const getTextAlignClass = (alignment: "left" | "center" | "right") => {
    switch (alignment) {
      case "left": return "text-left";
      case "right": return "text-right";
      default: return "text-center";
    }
  };

  const textAlignClass = getTextAlignClass(align);
  const subTextAlignClass = getTextAlignClass(subAlign);

  return (
    <div className={`w-full mb-10 ${textAlignClass}`}>
      {/* Badge */}
      <div
        style={{
          boxShadow: `-6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                1.2px 1.2px 0 -0.4px #FFF inset, 
                -1.2px -1.2px 0 -0.5px #FFF inset`,
          padding: "10px 20px",
          backdropFilter: "blur(5px)",
        }}
        className={`relative inline-flex items-center gap-2 backdrop-blur-lg sm:pr-5 sm:pl-2.5 py-2 bg-gray-200/20 rounded-full mb-3 md:mb-6 ${align === "center" ? "mx-auto" : ""}`}
      >
        <img src={badgeIcon} alt="" className="w-5 h-5" />
        <span className="font-medium text-gray-800">
          {t(badgeText)}
        </span>
      </div>

      {/* Layout Container */}
      {layout === "horizontal" ? (
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8">
          {/* Heading */}
          <div className="md:w-1/2">
            <h1 className="mb-4 md:mb-0 leading-[120%] text-[32px] sm:text-[42px] md:text-5xl font-semibold text-headingBlack">
              {renderText(heading, true)}
            </h1>
          </div>
          
          {/* Subtext */}
          {subText && (
            <div className="md:w-1/2">
              <p className={`max-w-lg leading-[140%] text-base sm:text-base md:text-lg font-normal text-gray-600 ${subTextAlignClass}`}>
                {renderText(subText, false)}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Vertical Layout */
        <div>
          <h1 className="mb-4 md:mb-[30px] leading-[120%] text-[32px] sm:text-[42px] md:text-5xl font-semibold text-headingBlack">
            {renderText(heading, true)}
          </h1>
          {subText && (
            <p className={`max-w-lg leading-[140%] text-base sm:text-base md:text-lg font-normal text-gray-600  ${subTextAlignClass}`}>
              {renderText(subText, false)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;



// import { useTranslation } from "react-i18next";

// interface SectionHeaderProps {
//   badgeText: string;
//   badgeIcon: string;
//   heading: React.ReactNode;
//   subText?: string;
//     layout?: "vertical" | "horizontal"; 
//   align?: "left" | "center";
//   subAlign?: "left" | "center" | "right";
// }

// const SectionHeader: React.FC<SectionHeaderProps> = ({
//   badgeText,
//   badgeIcon,
//   heading,
//   subText,
  
//   align = "center",
//   subAlign = "center",
// }) => {
//   const descStyle = {
//     fontFamily: "Urbanist, sans-serif",
//     color: "#171C35",
//   };

//   const headingAlignClass =
//     align === "left"
//       ? "text-center sm:text-center md:text-left"
//       : "text-center";

// const subTextClass =
//   subAlign === "left"
//     ? "text-center md:text-left md:mx-0"
//     : subAlign === "right"
//     ? "text-center md:text-left md:ml-auto md:mr-0 max-w-lg"
//     : "text-center";


//       const {t} = useTranslation()

//   return (
//     <div className={`${headingAlignClass} mb-10`}>
//       {/* Badge: Always center on mobile/sm */}
//       <div
//         style={{
//           boxShadow: `-6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
//                 1.2px 1.2px 0 -0.4px #FFF inset, 
//                 -1.2px -1.2px 0 -0.5px #FFF inset`,
//           padding: "10px 20px 10px 20px",
//           backdropFilter: "blur(5px)",
//         }}
//         className="relative inline-flex items-center gap-2 backdrop-blur-lg sm:pr-5 sm:pl-2.5 py-2 bg-gray-200/20  rounded-full mb-3 md:mb-6 mx-auto md:mx-0"
//       >
//         <img src={badgeIcon} alt="" className="w-5 h-5" />
//         <span style={descStyle}>{t(badgeText)}</span>
//       </div>

//       {/* Heading */}
//       <h1 className="mb-4 md:mb-[30px] leading-[120%] text-[32px] sm:text-[42px] md:text-5xl font-semibold text-headingBlack">
//           {typeof heading === "string" ? t(heading) : heading}
//       </h1>

//       {/* Subtext */}
//       {subText && (
//         <p
//           style={descStyle}
//           className={`max-w-lg   leading-[140%] text-base sm:text-base md:text-lg font-normal mb-10 ${subTextClass}`}
//         >
//           {typeof subText === "string" ? t(subText) : subText}
//         </p>
//       )}
//     </div>
//   );
// };

// export default SectionHeader;
