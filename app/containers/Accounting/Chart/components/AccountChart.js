import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CSVReader } from 'react-papaparse';
import _ from 'lodash';
import { makeStyles, IconButton, Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import NewAccountDialog from './NewAccountDialog';
import ConfirmDeleteAccountDialog from './ConfirmDeleteAccountDialog';
import swal from 'sweetalert';

const buttonRef = React.createRef()

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(2, 0),
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  button: {
    borderRadius: 0,
    height: 28,
    padding: theme.spacing(0, 2),
  },
  title: {
    border: `1px solid ${theme.palette.divider}`,
    height: 28,
    padding: theme.spacing(0, 2),
    flex: '1 auto'
  }
}));

const AccountChart = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const {
    loading,
    history,
    openNewAccountDialog,
    openDeleteAccountDialog,
    editOpenAccountDialog,
    chartOfAccounts,
  } = props;

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    const account = chartOfAccounts.find(account => account.id === id)
    setSelectedAccount(account)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  console.log(chartOfAccounts, "chartOfAccounts")

  const fileInput = useRef();

  const columns = [
    {
      name: 'accountCode',
      label: 'Account Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountName',
      label: 'Account Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Account Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'openingBalance',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'financialstatement',
      label: 'Financial Statement',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'debitcredit',
      label: 'Debit/Credit',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: '',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <IconButton onClick={event => handleClick(event, value)}><MoreVertIcon /></IconButton>
            // <Button
            //   aria-controls="simple-menu"
            //   aria-haspopup="true"
            //   onClick={event => handleClick(event, value)}
            // >
            //   Options
            // </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Tooltip title="Import and Create">

        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={openNewAccountDialog}
        >
          New Account
        </Button>
      </Tooltip>
    ),
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside className={classes.flex}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleOpenDialog}
              startIcon={<GetAppIcon />}
              className={classes.button}
            >
              Import
            </Button>
            <div className={classes.title}>
              {file && file.name}
            </div>
            <Button
              variant="contained"
              size="small"
              onClick={handleRemoveFile}
              className={classes.button}
            >
              Remove
            </Button>
          </aside>
        )}
      </CSVReader>


      <MUIDataTable
        className={classes.datatable}
        title="Chart of Accounts"
        data={chartOfAccounts}
        columns={columns}
        options={options}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => editOpenAccountDialog(selectedAccount)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => history.push({ pathname: '/account/charts/details' })}>
          View Details
        </MenuItem>
        <MenuItem>
          Mark as Active
        </MenuItem>
        <MenuItem onClick={() => openDeleteAccountDialog(selectedAccount)}>
          Delete
        </MenuItem>
      </Menu>

      <NewAccountDialog />
      <ConfirmDeleteAccountDialog />
    </div>
  );
};

AccountChart.propTypes = {
  loading: PropTypes.bool,
  openNewAccountDialog: PropTypes.func,
  editOpenAccountDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newAccountDialog: Selectors.makeSelectNewAccountDialog(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialog: () => dispatch(Actions.openNewAccountDialog()),
    openDeleteAccountDialog: data => dispatch(Actions.openDeleteAccountDialog(data)),
    editOpenAccountDialog: data => dispatch(Actions.editOpenAccountDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AccountChart);
