import { useTranslation } from "react-i18next";

const TopSection = () => {
      const {t} = useTranslation()
  return (
    <div className="max-[767px]:mt-6">
      <div className=" flex items-center gap-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-headingBlack">
                         {t("adminDashboard.routes.aiVoice.topSection.title")}
          </h1>
          <p className='text-sm sm:text-base text-subHeadingBlack'>
             {t("adminDashboard.routes.aiVoice.topSection.desc")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TopSection;
