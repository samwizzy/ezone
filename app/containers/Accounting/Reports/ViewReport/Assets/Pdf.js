import React from 'react';
import ReactToPdf from 'react-to-pdf';
import { useLocation } from 'react-router-dom';
import PdfIcon from './PdfSvg';

const Print = ({ height, width, className, componentRef, print, setPrint }) => {
  const Location = useLocation();

  const fileName = Location.pathname.split('/')[3];

  return (
    <ReactToPdf targetRef={componentRef} filename={`${fileName}.pdf`}>
      {({ toPdf }) => {
        print && toPdf();
        print && setPrint(false);
        return (
          <div onClick={toPdf}>
            <PdfIcon height={height} width={width} className={className} />
          </div>
        );
      }}
    </ReactToPdf>
  );
};

export default Print;
