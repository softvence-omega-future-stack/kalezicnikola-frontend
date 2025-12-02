import icon from "../assets/svgIcon/herologo.svg";
import img1 from "../assets/svgIcon/Interface1.svg";
import img2 from "../assets/svgIcon/functionscard.svg";
import img6 from "../assets/svgIcon/interface6.svg";
import "./buttom.css";
import SectionHeader from "./SectionHeader";

const Functions = () => {
  return (
    <section
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="mt-12 md:mt-[120px]"
    >
      <div className="">
        <div className="md:mb-5">
          <SectionHeader
            badgeIcon={icon}
            badgeText=" Our Core Functions"
            heading={
              <>
                Everything you need to ease <br /> the burden on your practice
              </>
            }
            align="left"
          />
        </div>

        {/* Desktop Layout (lg and above) - 3 columns */}
        <div className="hidden lg:grid grid-cols-3 gap-[21px]">
          {/* Feature 1 - Reduzierte Telefonlast */}
          <div
            className="relative p-[30px] rounded-[30px]"
            style={{
              border: "1px solid #FFF",
              background: `
                radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%),
                radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.50) 0%, rgba(43, 142, 255, 0.00) 100%),
                rgba(255, 255, 255, 0.50)`,
              backdropFilter: "blur(50px)",
              fontFamily: "Urbanist, sans-serif",
              overflow: "hidden",
              height: "538px"
            }}
          >
            <h3 className="text-[32px] leading-8 font-semibold text-[#171C35] mb-5">
              Reduzierte Telefonlast
            </h3>
            <p className="text-base text-[#171c35] mb-6 leading-[140%] font-normal">
              Befreien Sie Ihr Personal von Routineanfragen. Unser KI-Voicebot
              übernimmt Terminbuchungen, Rezept- und Routinefragen 24/7, damit
              Ihr Team auf die Patienten konzentrieren kann.
            </p>

            <div
              className="absolute"
              style={{
                left: "0",
                bottom: "0",
                right: "0",
                borderRadius: "inherit",
                overflow: "hidden",
              }}
            >
              <img src={img1} alt="" className="block w-full h-auto" />
            </div>
          </div>

          {/* Feature 2 - Menschliche KI-Kommunikation */}
          <div
            className="relative rounded-[30px] p-[30px]"
            style={{
              border: "1px solid #FFF",
              background: "#FFF",
              backdropFilter: "blur(50px)",
              fontFamily: "Urbanist, sans-serif",
              overflow: "hidden",
              height: "538px",
            }}
          >
            <div className="relative z-10">
              <h3 className="text-[32px] leading-8 font-semibold text-[#171C35] mb-5">
                Menschliche KI-Kommunikation
              </h3>
              <p className="text-base text-[#171c35] mb-20 leading-[140%] font-normal">
                Docline ist die nächste Generation in der Patientenkommunikation.
                Er versteht Kontext, Sprachen und Dringlichkeit und verarbeitet
                Anliegen mit menschlicher Präzision.
              </p>
            </div>

            <img
              src={img2}
              alt=""
              className="absolute w-full h-auto"
              style={{
                width: "auto",
                minWidth: "100%",
              }}
            />
          </div>

          {/* Feature 3 & 4 Container for Desktop */}
          <div className="flex flex-col gap-5">
            {/* Feature 3 - Multilingual */}
            <div
              className="relative flex flex-col justify-between w-full h-[259px] p-[30px] rounded-[30px]"
              style={{
                border: "1px solid #FFF",
                background: "#FFF",
                backdropFilter: "blur(50px)",
                fontFamily: "Urbanist, sans-serif",
                overflow: "hidden",
              }}
            >
              <div>
                <h3 className="text-[32px] leading-8 font-semibold text-[#171C35] mb-2.5">
                  Multilingual
                </h3>
                <p className="text-base text-[#171c35] leading-[140%] font-normal pb-[143px]">
                  Unser Voicebot kommuniziert fließend in über 25 Fremdsprachen.
                </p>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  className="flex justify-center items-center font-normal mt-[143px] relative"
                  style={{
                    width: "208px",
                    height: "70px",
                    borderRadius: "30px",
                    border: "1px solid #FFF",
                    background: `
                      radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%),
                      radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.50) 0%, rgba(43, 142, 255, 0.00) 100%),
                      rgba(255, 255, 255, 0.50)
                    `,
                    backdropFilter: "blur(50px)",
                    fontFamily: "Urbanist, sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      background: "linear-gradient(90deg, #3B5CFF 0%, #8B5CFF 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      fontSize: "24px",
                    }}
                  >
                    25+ Sprachen
                  </span>
                </button>
              </div>
            </div>

            {/* Feature 4 - DSGVO */}
            <div
              className="relative flex flex-col justify-between w-full h-[259px] p-[30px] rounded-[30px]"
              style={{
                border: "1px solid #FFF",
                background: "#FFF",
                backdropFilter: "blur(50px)",
                fontFamily: "Urbanist, sans-serif",
                overflow: "hidden",
              }}
            >
              <div>
                <h3 className="text-[32px] leading-8 font-semibold text-[#171C35] mb-2.5">
                  DSGVO-konform
                </h3>
                <p className="text-base text-[#171c35] leading-[140%] font-normal">
                  Ihre Sicherheit hat höchste Priorität.
                </p>
              </div>

              <div className="absolute bottom-0 right-0">
                <img src={img6} alt="" className="w-auto h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile Layout (lg below) */}
        <div className="lg:hidden">
          {/* First two cards on tablet/mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 - Reduzierte Telefonlast */}
            <div
              className="relative p-4 sm:p-[30px] rounded-2xl sm:rounded-[30px]"
              style={{
                border: "1px solid #FFF",
                background: `
                  radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%),
                  radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.50) 0%, rgba(43, 142, 255, 0.00) 100%),
                  rgba(255, 255, 255, 0.50)`,
                backdropFilter: "blur(50px)",
                fontFamily: "Urbanist, sans-serif",
                overflow: "hidden",
                height: "538px"
              }}
            >
              <h3 className="text-2xl sm:text-[32px] leading-8 font-semibold text-[#171C35] mb-5">
                Reduzierte Telefonlast
              </h3>
              <p className="text-sm sm:text-base text-[#171c35] mb-6 leading-[140%] font-normal">
                Befreien Sie Ihr Personal von Routineanfragen. Unser KI-Voicebot
                übernimmt Terminbuchungen, Rezept- und Routinefragen 24/7, damit
                Ihr Team auf die Patienten konzentrieren kann.
              </p>

              <div
                className="absolute"
                style={{
                  left: "0",
                  bottom: "0",
                  right: "0",
                  borderRadius: "inherit",
                  overflow: "hidden",
                }}
              >
                <img src={img1} alt="" className="block w-full h-auto sm:h-[500px] md:h-[400px]" />
              </div>
            </div>

            {/* Feature 2 - Menschliche KI-Kommunikation */}
            <div
              className="relative rounded-2xl sm:rounded-[30px] p-4 sm:p-[30px]"
              style={{
                border: "1px solid #FFF",
                background: "#FFF",
                backdropFilter: "blur(50px)",
                fontFamily: "Urbanist, sans-serif",
                overflow: "hidden",
                height: "538px",
              }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-[32px] leading-8 font-semibold text-[#171C35] mb-5">
                  Menschliche KI-Kommunikation
                </h3>
                <p className="text-sm sm:text-base text-[#171c35] mb-12 sm:mb-20 leading-[140%] font-normal">
                  Docline ist die nächste Generation in der Patientenkommunikation.
                  Er versteht Kontext, Sprachen und Dringlichkeit und verarbeitet
                  Anliegen mit menschlicher Präzision.
                </p>
              </div>

              <img
                src={img2}
                alt=""
                className="absolute w-full h-auto"
                style={{
                  width: "auto",
                  minWidth: "100%",
                }}
              />
            </div>
          </div>

          {/* Feature 3 & 4 for tablet/mobile (shown below first two cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Feature 3 - Multilingual */}
            <div
              className="relative flex flex-col justify-between h-[259px] p-4 sm:p-[30px] rounded-2xl sm:rounded-[30px]"
              style={{
                border: "1px solid #FFF",
                background: "#FFF",
                backdropFilter: "blur(50px)",
                fontFamily: "Urbanist, sans-serif",
                overflow: "hidden",
              }}
            >
              <div>
                <h3 className="text-2xl sm:text-[32px] leading-8 font-semibold text-[#171C35] mb-2.5">
                  Multilingual
                </h3>
                <p className="text-sm sm:text-base text-[#171c35] leading-[140%] font-normal pb-[143px]">
                  Unser Voicebot kommuniziert fließend in über 25 Fremdsprachen.
                </p>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  className="flex justify-center items-center font-normal mt-[143px] relative"
                  style={{
                    width: "208px",
                    height: "70px",
                    borderRadius: "30px",
                    border: "1px solid #FFF",
                    background: `
                      radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%),
                      radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.50) 0%, rgba(43, 142, 255, 0.00) 100%),
                      rgba(255, 255, 255, 0.50)
                    `,
                    backdropFilter: "blur(50px)",
                    fontFamily: "Urbanist, sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      background: "linear-gradient(90deg, #3B5CFF 0%, #8B5CFF 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      fontSize: "24px",
                    }}
                  >
                    25+ Sprachen
                  </span>
                </button>
              </div>
            </div>

            {/* Feature 4 - DSGVO */}
            <div
              className="relative flex flex-col justify-between h-[259px] p-4 sm:p-[30px] rounded-2xl sm:rounded-[30px]"
              style={{
                border: "1px solid #FFF",
                background: "#FFF",
                backdropFilter: "blur(50px)",
                fontFamily: "Urbanist, sans-serif",
                overflow: "hidden",
              }}
            >
              <div>
                <h3 className="text-2xl sm:text-[32px] leading-8 font-semibold text-[#171C35] mb-2.5">
                  DSGVO-konform
                </h3>
                <p className="text-sm sm:text-base text-[#171c35] leading-[140%] font-normal">
                  Ihre Sicherheit hat höchste Priorität.
                </p>
              </div>

              <div className="absolute bottom-0 right-0">
                <img src={img6} alt="" className="w-auto h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Functions;