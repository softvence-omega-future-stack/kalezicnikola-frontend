
import CommonSpace from "@/common/space/CommonSpace";

import unredview1 from '../../../assets/svgIcon/unredviewcard1.svg';
import unredview2 from '../../../assets/svgIcon/unredviewcard2.svg';
import unredview3 from '../../../assets/svgIcon/unredviewcard3.svg';
import arrowRight from '../../../assets/svgIcon/arrowRight.svg';

const categories = [
  {
    title: "Unreviewed calls",
    description: "Lorem Ipsum is simply dummy text of the printing",
    bgColor: "#E5DFF5",
    avatars: [unredview1, unredview2, unredview3],
    extraCount: "6+",
  },
  {
    title: "Task",
    bgColor: "#D0E1F5",
    mainNumber: 12,
  },
  {
    title: "Requires a call back",
    bgColor: "#FADACA",
    mainNumber: 7,
  },
];

const Card = ({ category, maskId }: { category: (typeof categories)[0]; maskId: string }) => {
  const width = 380;
  const height = 180;

  return (
    <div className="relative w-full h-[180px]">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            <rect width={width} height={height} rx="24" fill="white" />
            <path d={`M${width} ${height} C${width} ${height - 20} ${width - 20} ${height - 20} ${width - 20} ${height} Z`} fill="black" />
            <path d={`M${width} ${height - 64}H${width - 34}C${width - 50.5685} ${height - 64} ${width - 64} ${height - 50.569} ${width - 64} ${height - 34}V${height}H${width}V${height - 90}C${width} ${height - 75.641} ${width - 11.6405} ${height - 64} ${width - 26} ${height - 64}H${width}Z`} fill="black"/>
            <path d={`M${width - 63} ${height}V${height - 26}C${width - 63} ${height - 11.641} ${width - 74.6405} ${height} ${width - 89} ${height}H${width - 63}Z`} fill="black"/>
          </mask>
        </defs>
        <rect width={width} height={height} rx="24" fill={category.bgColor} mask={`url(#${maskId})`} />
      </svg>

      <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-medium mb-4 text-[#171C35]">{category.title}</h3>

          {category.avatars ? (
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 items-center flex-shrink-0">
                {category.avatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    src={avatar}
                    alt=""
                  />
                ))}
                {category.extraCount && (
                  <div className="h-10 w-10 bg-gray-900 text-white rounded-full border-2 border-white flex items-center justify-center text-sm font-medium">
                    {category.extraCount}
                  </div>
                )}
              </div>

              <p className="text-[#171C35] text-sm font-medium leading-snug">
                {category.description}
              </p>
            </div>
          ) : (
            <div className="mt-2">
              {category.mainNumber && (
                <span className="text-5xl font-medium text-[#171C35]">
                  {category.mainNumber}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="absolute bottom-2 -right-1">
          <div className="h-12 w-12 bg-gray-900 rounded-full flex items-center justify-center">
            <img src={arrowRight} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SubHeaderCard = () => {
  return (
    <CommonSpace>
      <div className="-mt-18 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category, index) => (
            <Card key={index} category={category} maskId={`cutoutMask${index}`} />
          ))}
        </div>
      </div>
    </CommonSpace>
  );
};

export default SubHeaderCard;
