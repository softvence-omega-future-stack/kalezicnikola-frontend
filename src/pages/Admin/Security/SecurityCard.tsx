import arrow from '../../../assets/svgIcon/arrowRight.svg';
import { useTranslation } from 'react-i18next';

// CommonSpace Component
const CommonSpace = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`w-full py-6 ${className}`}>{children}</div>;
};

const statsCards = [
  { value: "1,24", bgColor: "#E1DCF4" },
  { value: "10", bgColor: "#D0E1F5" },
  { value: "5", bgColor: "#FADACA" },
  { value: "2", bgColor: "#CACDFA" },
];

const cutoutWidth = 42;
const cutoutHeight = 46;
const curveRadius = 20;
const smallCurveRadius = 20;

const StatsCard = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full" style={{ height: '150px' }}>
      <div className="absolute inset-0 rounded-[16px]" style={{ backgroundColor: statsCards[index].bgColor }}>
        <div
          className="absolute bottom-0 right-0"
          style={{ width: cutoutWidth + curveRadius, height: cutoutHeight + curveRadius }}
        >
          <div
            className="absolute bottom-0 right-0 bg-[#F3F6F6]"
            style={{ width: cutoutWidth, height: cutoutHeight, borderTopLeftRadius: curveRadius }}
          />
          <div className="absolute right-0 bg-[#F3F6F6]" style={{ width: smallCurveRadius, height: smallCurveRadius, bottom: cutoutHeight }} />
          <div
            className="absolute right-0"
            style={{ width: smallCurveRadius, height: smallCurveRadius, bottom: cutoutHeight, backgroundColor: statsCards[index].bgColor, borderBottomRightRadius: smallCurveRadius }}
          />
          <div className="absolute bottom-0 bg-[#F3F6F6]" style={{ width: smallCurveRadius, height: smallCurveRadius, right: cutoutWidth }} />
          <div
            className="absolute bottom-0"
            style={{ width: smallCurveRadius, height: smallCurveRadius, right: cutoutWidth, backgroundColor: statsCards[index].bgColor, borderBottomRightRadius: smallCurveRadius }}
          />
        </div>
      </div>

      <div className="relative w-full h-full p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#171C35] mb-1">{t(`adminDashboard.routes.securityAudit.securityCard.statsCards.${index}.title`)}</h3>
        </div>

        <div>
          <span className="text-3xl font-medium text-[#171C35]">{statsCards[index].value}</span>
          <p className="text-sm text-[#111A2D] opacity-70">{t(`adminDashboard.routes.securityAudit.securityCard.statsCards.${index}.lastMonth`)}</p>
        </div>

        <div className="absolute bottom-2 right-1">
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
    <CommonSpace>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {statsCards.map((_, index) => (
          <StatsCard key={index} index={index} />
        ))}
      </div>
    </CommonSpace>
  );
};

export default SecurityCard;
