import arrow from '../../../assets/svgIcon/arrowRight.svg';

// CommonSpace Component
const CommonSpace = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`w-full py-6 ${className}`}>
      {children}
    </div>
  );
};

const statsCards = [
  {
    title: "Total Events (24h)",
    value: "1,24",
    lastMonth: "All logged actions",
    bgColor: "#E1DCF4",
  },
  {
    title: "2FA Enabled",
    value: "10",
    lastMonth: "All Users",
    bgColor: "#D0E1F5",
  },
  {
    title: "GDPR Requests",
    value: "5",
    lastMonth: "All processed",
    bgColor: "#FADACA",
  },
  {
    title: "Failed Logins",
    value: "2",
    lastMonth: "Last 24 hours",
    bgColor: "#CACDFA",
  },
];

// FIXED cutout dimensions - won't change with screen size
const cutoutWidth = 42;
const cutoutHeight = 46;
const curveRadius = 20;
const smallCurveRadius = 20;

const StatsCard = ({ card }: { card: (typeof statsCards)[0] }) => {
  return (
    <div className="relative w-full" style={{ height: '150px' }}>
      {/* Background with fixed cutout using CSS */}
      <div 
        className="absolute inset-0 rounded-[16px]"
        style={{ backgroundColor: card.bgColor }}
      >
        {/* Fixed size cutout container - positioned from BOTTOM-RIGHT */}
        <div 
          className="absolute bottom-0 right-0"
          style={{
            width: cutoutWidth + curveRadius,
            height: cutoutHeight + curveRadius,
          }}
        >
          {/* Main cutout */}
          <div 
            className="absolute bottom-0 right-0 bg-[#F3F6F6]"
            style={{
              width: cutoutWidth,
              height: cutoutHeight,
              borderTopLeftRadius: curveRadius,
            }}
          />
          
          {/* Top curve connector */}
          <div 
            className="absolute right-0 bg-[#F3F6F6]"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              bottom: cutoutHeight,
            }}
          />
          <div 
            className="absolute right-0"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              bottom: cutoutHeight,
              backgroundColor: card.bgColor,
              borderBottomRightRadius: smallCurveRadius,
            }}
          />
          
          {/* Left curve connector */}
          <div 
            className="absolute bottom-0 bg-[#F3F6F6]"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              right: cutoutWidth,
            }}
          />
          <div 
            className="absolute bottom-0"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              right: cutoutWidth,
              backgroundColor: card.bgColor,
              borderBottomRightRadius: smallCurveRadius,
            }}
          />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative w-full h-full p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#171C35] mb-1">{card.title}</h3>
        </div>

        <div className="mb-2">
          <span className="text-3xl font-medium text-[#171C35]">{card.value}</span>
        </div>
        
        <div>
          <p className="text-sm text-[#111A2D] opacity-70">{card.lastMonth}</p>
        </div>

        {/* FIXED position arrow button */}
        <div
          className="absolute"
          style={{
            bottom: 5,
            right: 5,
          }}
        >
          <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center">
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityCard = () => {
  return (
    <CommonSpace className="">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {statsCards.map((card, index) => (
            <StatsCard key={index} card={card} />
          ))}
        </div>
      </div>
    </CommonSpace>
  );
};

export default SecurityCard;