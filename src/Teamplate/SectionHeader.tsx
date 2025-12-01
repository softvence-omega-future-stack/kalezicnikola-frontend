interface SectionHeaderProps {
  badgeText: string;
  badgeIcon: string;
  heading: React.ReactNode;
  subText?: string;
  align?: "left" | "center";
  subAlign?: "left" | "center" | "right";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeIcon,
  heading,
  subText,
  align = "center",
  subAlign = "center",
}) => {
  const descStyle = {
    fontFamily: "Urbanist, sans-serif",
    color: "#171C35",
  };

  const headingAlignClass =
    align === "left"
      ? "text-center sm:text-center md:text-left"
      : "text-center";

  const subTextClass =
    subAlign === "left"
      ? "text-center sm:text-center md:text-left "
      : subAlign === "right"
      ? "text-center sm:text-center md:text-right xl:text-right"
      : "text-center";

  return (
    <div className={`${headingAlignClass} mb-10`}>
      {/* Badge: Always center on mobile/sm */}
      <div
        style={{
          boxShadow: `-6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                1.2px 1.2px 0 -0.4px #FFF inset, 
                -1.2px -1.2px 0 -0.5px #FFF inset`,
          padding: "10px 20px 10px 20px",
          backdropFilter: "blur(5px)",
        }}
        className="relative inline-flex items-center gap-2 backdrop-blur-lg sm:pr-5 sm:pl-2.5 py-2 bg-gray-200/20  rounded-full mb-3 md:mb-6 mx-auto md:mx-0"
      >
        <img src={badgeIcon} alt="" className="w-5 h-5" />
        <span style={descStyle}>{badgeText}</span>
      </div>

      {/* Heading */}
      <h1 className="mb-4 md:mb-[30px] md:leading-[120%] text-2xl sm:text-[32px] md:text-5xl font-semibold text-headingBlack">
        {heading}
      </h1>

      {/* Subtext */}
      {subText && (
        <p
          style={descStyle}
          className={`max-w-lg   leading-7 text-sm md:text-base xl:text-xl ${subTextClass}`}
        >
          {subText}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
