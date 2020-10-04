import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PdfIcon from './PdfSvg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CreatePdf = ({
  height,
  width,
  className,
  componentRef,
  print,
  setPrint,
}) => {
  const Location = useLocation();

  const fileName = Location.pathname.split('/')[3];

  const printDocument = () => {
    const componentRefWidth = componentRef.current.offsetWidth * 0.264583;
    const componentRefHeight = Math.ceil(
      componentRef.current.offsetHeight * 0.264583,
    );
    html2canvas(componentRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        componentRefHeight,
      );
      pdf.save(`${fileName}.pdf`);
    });
  };

  print && printDocument();
  print && setPrint(false);

  return (
    <div onClick={printDocument}>
      <PdfIcon height={height} width={width} className={className} />
    </div>
  );
};
export default CreatePdf;
// pdf.autoTable({
//   html: componentRef.current,
//   didDrawPage: function(data) {
//     // Header
//     pdf.setFontSize(20);
//     pdf.setTextColor(40);
//     pdf.setFontStyle('normal');
//     if (base64Img) {
//       pdf.addImage(
//         base64Img,
//         'JPEG',
//         data.settings.margin.left,
//         15,
//         10,
//         10,
//       );
//     }
//     pdf.text(`As at ${date}`, data.settings.margin.left + 15, 22);
//   },
// });
// pdf.scaleFactor = 2;
// console.log(
//   'ImageeeeeeeeeeeeeeeeeeeeeeeeeO,',
//   componentRefWidth,
//   componentRefHeight,
//   pdf.internal.pageSize.getWidth(),
//   pdf.internal.pageSize.getHeight(),
// );
// const Print = ({ height, width, className, componentRef, print, setPrint }) => {
//   const Location = useLocation();

//   const fileName = Location.pathname.split('/')[3];

//   return (
//     <ReactToPdf
//       targetRef={componentRef}
//       filename={`${fileName}.pdf`}
//       // options={options}
//     >
//       {({ toPdf }) => {
//         print && toPdf();
//         print && setPrint(false);
//         return (
//           <div onClick={toPdf}>
//             <PdfIcon height={height} width={width} className={className} />
//           </div>
//         );
//       }}
//     </ReactToPdf>
//   );
// };

// export default Print;
