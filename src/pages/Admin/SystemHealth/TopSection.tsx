

const TopSection = () => {
  return (
    <div className="max-[767px]:mt-6">
      {/* Header */}
      <div className=" flex items-center gap-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-headingBlack">
            System Health
          </h1>
          <p className='text-sm sm:text-base text-subHeadingBlack'>
            Monitor infrastructure and service status
          </p>
        </div>
      </div>
    </div>
  )
}

export default TopSection
