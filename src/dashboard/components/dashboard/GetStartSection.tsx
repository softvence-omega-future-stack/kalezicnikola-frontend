// import { useState } from "react";
// import DashboardCard from "@/dashboard/common/DashboardCard";
// import DashboardCommonSpace from "@/dashboard/common/DashboardCommonSpace";
// import SecondHeader from "@/dashboard/common/SecondHeader";
// import { FiEdit, FiPlus } from "react-icons/fi";
// import { FaRegFileImage } from "react-icons/fa";
// import { MdManageSearch } from "react-icons/md";



// const gettingStartedCards = [
//   {
//     icon: FiPlus,
//     title: "Start From Scratch",
//     description: "Get Started with a blank Template",
//     link: "/dashboard/scratch-page",
//   },
//   {
//     icon: FiEdit,
//     title: "Describe a Topic",
//     description: "Enter a text Prompt about your Template",
//     onClick: () => {}, // will override later
//   },
//   {
//     icon: FaRegFileImage,
//     title: "Convert Image/Document to Template",
//     description: "Convert the text within your media files into a template",
//     onClick: () => {}, // will override later
//   },
//   {
//     icon: MdManageSearch,
//     title: "Find pre-made Template",
//     description: "Get an idea what Template looks like",
//     link: "/dashboard/premade",
//   },
// ];

// const GetStartSection = () => {


//   return (
//     <DashboardCommonSpace>
//       <SecondHeader>Getting started with Us</SecondHeader>

//       <DashboardCard
//         cards={gettingStartedCards.map((card) => {
//           if (card.title === "Convert Image/Document to Template") {
//             return { ...card, onClick: handleConvertClick };
//           } else if (card.title === "Describe a Topic") {
//             return { ...card, onClick: handleDescribeClick };
//           } else {
//             return card;
//           }
//         })}
//       />

      
//     </DashboardCommonSpace>
//   );
// };

// export default GetStartSection;

const GetStartSection = () => {
  return (
    <div>GetStartSection</div>
  )
}

export default GetStartSection