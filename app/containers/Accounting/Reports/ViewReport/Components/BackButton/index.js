import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import TopMenu from '../TopMenu';
import ExportAs from '../PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import Search from '../Search';
import InputDate from '../InputDate';

import {
  makeStyles,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { toDate } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  title: { flexGrow: 1 },
  iconPaper: {
    boxShadow: theme.shadows[1],
  },
}));

const ControlledButtons = ({
  componentRef,
  print,
  setPrint,
  tableData,
  handleFetch,
  printCsc,
  pdflogo,
  tableRef,
  companyRef,
  daterange,
  dateValue,
  head,
  singleDate,
  body,
  fromDay,
  toDay,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Toolbar className={classes.iconPaper} variant="dense">
        <div className="flex-btn">
          <div className="flex-bc">
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            {singleDate ? (
              <InputDate dateValue={dateValue} day={toDay} />
            ) : (
              <React.Fragment>
                <InputDate dateValue={dateValue} day={fromDay} />
                <InputDate dateValue={dateValue} day={toDay} />
              </React.Fragment>
            )}
          </div>
          <div className="flex-bc">
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
              head={head}
              body={body}
            />

            <PrintIcon
              height="20px"
              width="20px"
              printRef={componentRef}
              className="bell"
            />
            <ExportAs data={tableData || printCsc} setPrint={setPrint} />
          </div>
        </div>
      </Toolbar>
    </div>
  );
};

export default ControlledButtons;
