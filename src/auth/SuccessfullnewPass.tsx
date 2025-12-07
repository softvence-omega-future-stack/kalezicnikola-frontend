import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logiImg from '../assets/svgIcon/authImg.svg'
import icon from '../assets/svgIcon/logo.svg'
import logo from '../assets/svgIcon/textLogo.svg'

export default function SuccessfullNewPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex relative bg-[#F3F6F6]">
      {/* Left Side */}
      <div className="hidden lg:block rounded-[16px] p-[10px] lg:w-1/2 relative">
        <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover" />
        <div style={{
          boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset, 1px 1px 0 -0.4px #FFF inset, -1px -1px 0 -0.5px #FFF inset`,
          padding: "10px 10px 10px 30px",
          backdropFilter: "blur(5px)"
        }} className="fixed top-8 left-0 right-0 z-20 w-[95%] bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <img src={icon} alt="Logo"/>
            <img src={logo} alt=""/>
          </div>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            {t('auth.successfullNewPasswordPage.login')}
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              {t('auth.successfullNewPasswordPage.login')}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#171C35] mb-2">
                {t('auth.successfullNewPasswordPage.title')}
              </h1>
              <p className="text-[#111A2D] text-base">
                {t('auth.successfullNewPasswordPage.subtitle')}
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors"
            >
              {t('auth.successfullNewPasswordPage.backToLoginButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
