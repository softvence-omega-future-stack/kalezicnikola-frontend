import React from "react";
import { useTranslation } from 'react-i18next';

const impressumData = {
  title: {
    en: "Legal Notice",
    de: "Impressum"
  },
  subtitle: {
    en: "Information obligation according to § 5 E-Commerce Act, § 14 Commercial Code, § 63 Trade Regulation and disclosure obligation according to § 25 Media Act.",
    de: "Informationspflicht laut § 5 E-Commerce Gesetz, § 14 Unternehmensgesetzbuch, § 63 Gewerbeordnung und Offenlegungspflicht laut § 25 Mediengesetz."
  },
  companyInfo: {
    berufsbezeichnung: {
      label: {
        en: "Professional Designation:",
        de: "Berufsbezeichnung:"
      },
      value: {
        en: "Services in automatic data processing and information technology",
        de: "Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik"
      }
    },
    uid: {
      label: {
        en: "UID Number:",
        de: "UID-Nummer:"
      },
      value: {
        en: "Will be submitted",
        de: "Wird nachgereicht"
      }
    },
    firmensitz: {
      label: {
        en: "Company Headquarters:",
        de: "Firmensitz:"
      },
      value: "6460 Imst"
    },
    mail: {
      label: {
        en: "Email:",
        de: "Mail:"
      },
      value: "info@docline.ai"
    },
    web: {
      label: "Web:",
      value: "www.docline.ai"
    },
    mitglied: {
      label: {
        en: "Member of:",
        de: "Mitglied bei:"
      },
      value: "WKO Tirol"
    },
    berufsrecht: {
      label: {
        en: "Professional Law:",
        de: "Berufsrecht:"
      },
      value: {
        en: "Trade Regulation (www.ris.bka.gv.at)",
        de: "Gewerbeordnung (www.ris.bka.gv.at)"
      }
    },
    aufsicht: {
      label: {
        en: "Supervisory Authority:",
        de: "Aufsichtsbehörde:"
      },
      value: "Bezirkshauptmannschaft Imst"
    },
    unternehmens: {
      label: {
        en: "Business Purpose:",
        de: "Unternehmensgegenstand:"
      },
      value: {
        en: "Operation of a cloud-based software solution (SaaS) for the medical sector.",
        de: "Betrieb einer cloudbasierten Softwarelösung (SaaS) für den medizinischen Bereich."
      }
    },
    verleihung: {
      label: {
        en: "Country of Award:",
        de: "Verleihungsstaat:"
      },
      value: {
        en: "Austria",
        de: "Österreich"
      }
    }
  },
  euDispute: {
    title: {
      en: "EU Dispute Resolution",
      de: "EU-Streitschlichtung"
    },
    para1: {
      en: "In accordance with the Regulation on Online Dispute Resolution in Consumer Matters (ODR Regulation), we would like to inform you about the Online Dispute Resolution Platform (OS Platform).",
      de: "Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren."
    },
    para2: {
      en: "Consumers have the opportunity to submit complaints to the Online Dispute Resolution platform of the European Commission at",
      de: "Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter"
    },
    para2End: {
      en: "to address. The necessary contact details can be found above in our legal notice. However, we would like to point out that we are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
      de: "zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum. Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
    }
  },
  liability: {
    title: {
      en: "Liability for Content of this Website",
      de: "Haftung für Inhalte dieser Website"
    },
    para1: {
      en: "We are constantly developing the content of this website and strive to provide correct and up-to-date information. Unfortunately, we cannot accept liability for the correctness of all content, especially for content provided by third parties.",
      de: "Wir entwickeln die Inhalte dieser Website ständig weiter und bemühen uns, korrekte und aktuelle Informationen bereitzustellen. Leider können wir keine Haftung für die Korrektheit aller Inhalte übernehmen, speziell für jene, die seitens Dritter bereitgestellt wurden."
    },
    para2: {
      en: "Our obligations to remove or block information under general laws remain unaffected even in the event of lack of responsibility.",
      de: "Unsere Verpflichtungen zur Entfernung oder Sperrung von Informationen nach den allgemeinen Gesetzen bleiben auch im Falle fehlender Verantwortlichkeit unberührt."
    },
    para3: {
      en: "If you notice problematic or illegal content, please contact us immediately.",
      de: "Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, kontaktieren Sie uns bitte umgehend."
    }
  },
  copyright: {
    title: {
      en: "Copyright Notice",
      de: "Urheberrechtshinweis"
    },
    para1: {
      en: "All content on this website (images, photos, texts, videos) is subject to copyright. Please ask us before distributing or reusing this content.",
      de: "Alle Inhalte dieser Website (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht. Bitte fragen Sie uns, bevor Sie diese Inhalte verbreiten oder weiterverwenden."
    },
    para2: {
      en: "If you find content that violates copyright, please inform us.",
      de: "Sollten Sie Inhalte finden, die das Urheberrecht verletzen, bitten wir Sie, uns zu informieren."
    }
  },
  imageCredits: {
    title: {
      en: "Image Credits",
      de: "Bildnachweis"
    },
    para1: {
      en: "The photos, images and graphics on this website are protected by copyright.",
      de: "Die Fotos, Bilder und Grafiken auf dieser Website sind urheberrechtlich geschützt."
    },
    para2: {
      en: "The image rights belong to the following photographers and companies:",
      de: "Die Bildrechte liegen bei den folgenden Fotografen und Unternehmen:"
    },
    para3: {
      en: "All texts are protected by copyright.",
      de: "Alle Texte sind urheberrechtlich geschützt."
    }
  }
};

const Impressum: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'de';

  return (
    <div className="container w-[93%] mx-auto mt-24 p-4 sm:p-6 lg:p-10 font-sans text-gray-800 leading-relaxed">

      {/* --------------------------- IMPRESSUM --------------------------- */}
      <section>
        <h1 className="text-3xl sm:text-4xl md:text-[64px] text-headingBlack font-semibold mb-5 text-center">
          {impressumData.title[lang]}
        </h1>

        <p className="text-base sm:text-lg md:text-2xl max-w-[900px] mx-auto font-normal text-subHeadingBlack leading-[140%] text-center mb-6">
          {impressumData.subtitle[lang]}
        </p>
      

        {/* Company Information */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] leading-[120%] font-semibold text-headingBlack mb-3">Docline</h2>

          <p className="text-lg sm:text-xl font-normal leading-7">Pfarrgasse 7/12</p>
          <p className="text-lg sm:text-xl font-normal leading-7">6460 Imst</p>
          <p className="mb-4 text-lg sm:text-xl font-normal leading-7">
            {lang === 'de' ? 'Österreich' : 'Austria'}
          </p>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.berufsbezeichnung.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.berufsbezeichnung.value[lang]}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.uid.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.uid.value[lang]}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.firmensitz.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.firmensitz.value}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.mail.label[lang]}
              </span>
              <a 
                href={`mailto:${impressumData.companyInfo.mail.value}`}
                className="text-base sm:text-lg md:text-xl font-normal text-blue-600 underline hover:text-blue-800 leading-[120%]"
              >
                {impressumData.companyInfo.mail.value}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.web.label}
              </span>
              <a 
                href={`https://${impressumData.companyInfo.web.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg md:text-xl font-normal text-blue-600 underline hover:text-blue-800 leading-[120%]"
              >
                {impressumData.companyInfo.web.value}
              </a>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.mitglied.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.mitglied.value}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.berufsrecht.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.berufsrecht.value[lang]}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.aufsicht.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.aufsicht.value}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.unternehmens.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.unternehmens.value[lang]}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="font-semibold text-headingBlack text-lg sm:text-xl md:text-2xl leading-7 sm:w-60 md:w-80 shrink-0">
                {impressumData.companyInfo.verleihung.label[lang]}
              </span>
              <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[120%]">
                {impressumData.companyInfo.verleihung.value[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------- EU DISPUTE RESOLUTION --------------------------- */}
        <section className="mt-10 mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] leading-[140%] text-subHeadingBlack font-semibold mb-6">
            {impressumData.euDispute.title[lang]}
          </h2>

          <p className="mb-6 text-base sm:text-lg md:text-xl text-subHeadingBlack font-normal leading-[140%]">
            {impressumData.euDispute.para1[lang]}
          </p>

          <p className="text-base sm:text-lg md:text-xl text-subHeadingBlack font-normal leading-[140%]">
            {impressumData.euDispute.para2[lang]}
            <a
              href="http://ec.europa.eu/odr/?tid=121890425"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 ml-1"
            >
              http://ec.europa.eu/odr/
            </a>
            {' '}{impressumData.euDispute.para2End[lang]}
          </p>
        </section>
      </section>

      {/* --------------------------- LIABILITY FOR CONTENT --------------------------- */}
      <section className="my-12">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-subHeadingBlack leading-[140%] mb-6">
          {impressumData.liability.title[lang]}
        </h2>

        <p className="mb-6 text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[140%]">
          {impressumData.liability.para1[lang]}
        </p>

        <p className="mb-6 text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[140%]">
          {impressumData.liability.para2[lang]}
        </p>

        <p className="text-base sm:text-lg md:text-xl font-normal text-subHeadingBlack leading-[140%]">
          {impressumData.liability.para3[lang]}
        </p>
      </section>

      {/* --------------------------- COPYRIGHT NOTICE --------------------------- */}
      <section className="my-12">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-headingBlack leading-[140%] mb-6">
          {impressumData.copyright.title[lang]}
        </h2>

        <p className="mb-6 text-base sm:text-lg md:text-xl text-subHeadingBlack font-normal leading-[140%]">
          {impressumData.copyright.para1[lang]}
        </p>

        <p className="mb-6 text-base sm:text-lg md:text-xl text-subHeadingBlack font-normal leading-[140%]">
          {impressumData.copyright.para2[lang]}
        </p>
      </section>

      {/* --------------------------- IMAGE CREDITS --------------------------- */}
      <section className="my-12">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-headingBlack leading-[140%] mb-6">
          {impressumData.imageCredits.title[lang]}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-subHeadingBlack font-normal leading-[140%]">
          {impressumData.imageCredits.para1[lang]}
        </p>
        <p className="text-base sm:text-lg md:text-xl text-subHeadingBlack font-normal leading-[140%] mb-6">
          {impressumData.imageCredits.para2[lang]}
        </p>

        <ul className="list-disc pl-5 text-xl space-y-2 mb-4">
          <li className="text-base sm:text-lg md:text-xl font-semibold leading-[140%] text-subHeadingBlack">Docline</li>
          <li className="text-base sm:text-lg md:text-xl font-semibold leading-[140%] text-subHeadingBlack">
            <a
              href="https://unsplash.com/de/@betoframe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              @betoframe (Unsplash)
            </a>
          </li>
          <li className="text-base sm:text-lg md:text-xl font-semibold leading-[140%] text-subHeadingBlack">
            <a
              href="https://unsplash.com/de/@laurentyasiel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              @laurentyasiel (Unsplash)
            </a>
          </li>
          <li className="text-base sm:text-lg md:text-xl font-semibold leading-[140%] text-subHeadingBlack">
            <a
              href="https://unsplash.com/de/@styligrande"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              @styligrande (Unsplash)
            </a>
          </li>
        </ul>

        <p className="text-base sm:text-lg md:text-xl font-normal leading-[140%] text-subHeadingBlack">
          {impressumData.imageCredits.para3[lang]}
        </p>
      </section>
    </div>
  );
};

export default Impressum;