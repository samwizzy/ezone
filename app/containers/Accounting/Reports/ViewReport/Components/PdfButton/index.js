import { useLocation } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import PdfIcon from './../../Assets/PdfSvg';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CreatePdf = ({
  height,
  width,
  pdflogo,
  tableRef,
  dateRangeRef,
  daterange,
  companyRef,
  head,
  body,
}) => {
  const Location = useLocation();

  const fileName = Location.pathname.split('/')[3];
  const printDocument = e => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const dateRangeRef = companyRef.current.lastElementChild;
    const nameRef = dateRangeRef.previousElementSibling;
    const dateRangeWidth = dateRangeRef.getBoundingClientRect().width;
    const nameWith = nameRef.getBoundingClientRect().width;
    const dateRangeWidthPosition =
      0.5 * pageWidth - dateRangeWidth * 0.2645833333 * 0.5;
    const nameWithPosition = 0.5 * pageWidth - nameWith * 0.2645833333 * 0.5;
    const ImageWidthPosition =
      0.5 * pageWidth -
      companyRef.current.firstElementChild.getBoundingClientRect().width *
        0.2645833333 *
        0.5;
    const base64Img = `data:image/png;base64,${pdflogo}`;
    doc.autoTable({
      didDrawPage: data => {
        if (data.pageNumber === 1) {
          if (base64Img) {
            doc.addImage(base64Img, 'JPEG', ImageWidthPosition, 15, 19, 19);
          }
          doc.text(`${fileName}`, nameWithPosition, 44);
          if (daterange) {
            doc.text(`${daterange}`, dateRangeWidthPosition, 50);
          }
        }
      },
      html: tableRef ? tableRef.current : '',
      body: body ? body : '',
      head: head ? head : '',
      headStyles: {
        fillColor: '#1a88e1',
        textColor: 'white',
        cellPadding: '5px',
        border: '1px solid rgba(224, 224, 224, 1)',
      },
      footStyles: {
        fillColor: 'black',
        textColor: 'white',
      },
      bodyStyles: {
        cellPadding: '5px',
        border: '1px solid rgba(224, 224, 224, 1)',
      },
      // theme: 'striped',
      startY: 60,
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <IconButton onClick={printDocument}>
      <PdfIcon height={height} width={width} />
    </IconButton>
  );
};

export default CreatePdf;
