import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ExportAs from '../PrintSelect';
import PrintIcon from '../Print';
import PdfIcon from '../PdfButton';
import { makeStyles, AppBar, IconButton, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DatePicker from './../DatePicker';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flexGrow: { flexGrow: 1 },
}));

const ControlledButtons = ({
  printCsc,
  pdflogo,
  daterange,
  tableRef,
  dateValue,
  singleDate,
  head,
  body,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      color="inherit"
      className={classes.root}
    >
      <Toolbar variant="dense">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>

        <div className={classes.flexGrow}>
          <React.Fragment>
            <DatePicker />
          </React.Fragment>
        </div>

        <PdfIcon
          height="20px"
          pdflogo={pdflogo}
          daterange={daterange}
          tableRef={tableRef}
          head={head}
          body={body}
        />

        <PrintIcon height="20px" />
        <ExportAs data={printCsc} />
      </Toolbar>
    </AppBar>
  );
};

export default ControlledButtons;
