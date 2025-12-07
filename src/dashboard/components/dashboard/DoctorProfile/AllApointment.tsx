import { useTranslation } from 'react-i18next';

const AllApointment = () => {
  const { t } = useTranslation();

  const appointments = [
    { id: 1, type: 'checkup', date: '27-09-2050', time: '09:00 AM', status: 'upcoming' },
    { id: 2, type: 'followup', date: '27-09-2050', time: '09:00 AM', status: 'complete' },
    { id: 3, type: 'checkup', date: '27-09-2050', time: '09:00 AM', status: 'complete' },
    { id: 4, type: 'checkup', date: '27-09-2050', time: '09:00 AM', status: 'complete' },
    { id: 5, type: 'checkup', date: '27-09-2050', time: '09:00 AM', status: 'complete' }
  ];

  return (
    <div className="">
      <h3 className="text-2xl font-semibold text-[#171C35] mb-4">
        {t('dashboard.doctorProfile.tabs.allAppointment.title')}
      </h3>
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-[#FAFAFA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-base font-semibold text-[#171c35]">
                  {t(`dashboard.doctorProfile.tabs.allAppointment.types.${apt.type}`)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className='h-3 w-3' alt="" />
                  <span className="text-[#111A2D] text-sm">{apt.date}</span>
                  <span className="text-[#111A2D] text-sm flex items-center gap-2">
                    <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" alt="" />
                    {apt.time}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                apt.status === 'upcoming'
                  ? 'bg-[#0040FF1A] text-[#0040FF]'
                  : 'bg-[#0080801A] text-[#008080]'
              }`}
            >
              {t(`dashboard.doctorProfile.tabs.allAppointment.status.${apt.status}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointment;
