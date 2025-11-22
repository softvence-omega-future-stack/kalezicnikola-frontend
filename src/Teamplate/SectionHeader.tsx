interface SectionHeaderProps {
  badgeText: string;
  badgeIcon: string;
  heading: React.ReactNode;
  subText?: string;
  align?: 'left' | 'center';
  subAlign?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeIcon,
  heading,
  subText,
  align = 'center',
  subAlign = 'center',
}) => {
  const descStyle = {
    fontFamily: "Urbanist, sans-serif",
    color: "#171C35",
    fontSize: "16px",
  };

 
  const headingAlignClass =
    align === "left"
      ? "text-center sm:text-center md:text-left"
      : "text-center";

  
  const subTextClass =
    subAlign === "left"
      ? "text-center sm:text-center md:text-left"
      : subAlign === "right"
      ? "text-center sm:text-center md:text-right"
      : "text-center";

  return (
    <div className={`${headingAlignClass} mb-10`}>
      
      {/* Badge: Always center on mobile/sm */}
      <div className="relative  inline-flex items-center gap-2 backdrop-blur-lg pr-5 pl-2.5 py-2 border border-white bg-white/10 rounded-full mb-6 -mt-7 mx-auto md:mx-0">
        <img src={badgeIcon} alt="" className="w-5 h-5" />
        <span style={descStyle}>{badgeText}</span>
      </div>

      {/* Heading */}
      <h1 className="mb-4 text-[32px] sm:text-[42px] md:text-[52px] lg:text-[54px] xl:text-[64px] font-semibold text-[#171C35] leading-snug lg:leading-tight">
        {heading}
      </h1>

      {/* Subtext */}
      {subText && (
        <p
          style={descStyle}
          className={`max-w-xl mx-auto md:mx-0 leading-7 ${subTextClass}`}
        >
          {subText}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
