import React from 'react';
import Search from '../Search';
import SingleDate from '../SingleDateSearch';
import { useHistory } from 'react-router-dom';

import ExportAs from '../PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';
import {
  makeStyles,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: { flexGrow: 1 },
  iconPaper: {
    boxShadow: theme.shadows[1],
  },
}));

const index = ({
  componentRef,
  print,
  setPrint,
  handleFetch,
  tableData,
  searchField,
  singleDate = '',
  tableRef,
  daterange,
  pdflogo,
  companyRef,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const handleBack = () => history.goBack();
  return (
    <div className="flex-b md">
      <div className="flex-b">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        {singleDate && <SingleDate handleFetch={handleFetch} />}
        {!singleDate && <Search handleFetch={handleFetch} />}
        {!singleDate && searchField && <Search searchField={searchField} />}
      </div>
      <div className="flex-r">
        <PdfIcon
          componentRef={componentRef}
          height="20px"
          width="20px"
          className="bell"
          print={print}
          setPrint={setPrint}
          tableRef={tableRef}
          pdflogo={pdflogo}
          daterange={daterange}
          companyRef={companyRef}
        />

        <PrintIcon
          height="20px"
          width="20px"
          printRef={componentRef}
          className="bell"
        />
        <ExportAs data={tableData} setPrint={setPrint} />
      </div>
    </div>
  );
};

export default index;
/**
 *    {singleDate && <SingleDate handleFetch={handleFetch} />}
        {!singleDate && <Search handleFetch={handleFetch} />}
        {!singleDate && searchField && <Search searchField={searchField} />}
 */
