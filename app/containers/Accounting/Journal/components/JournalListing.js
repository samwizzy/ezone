import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
  Grid,
  Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
// import AddBankAccountDialog from './AddBankAccountDialog';
// import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  }, 
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
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
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const JournalListing = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');

  const {
    history,
    journalListData,
  } = props;

  console.log('journalListData -> ', journalListData);


  const handleClick = (event, id) => {
		console.log("id value -> ", id);
    setAnchorEl(event.currentTarget);
    const selectedAccount = journalListData && journalListData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      name: 'transactionDate',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'reference',
      label: 'Reference number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
			name: 'note',
			label: 'Note',
			options: {
				filter: true,
				sort: false,
			},
		},
    {
      name: 'id',
      label: '.',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, value)}
              >
                Options
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  // editOpenBankAccountDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => {
                  // history.push(AccountDetails);
                }}>
                  View Details
                </MenuItem>
              </Menu>
            </div>
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
      <Tooltip title="Create New Chart">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => history.push('/account/journal/add')}
        >
          New Journal
        </Button>
      </Tooltip>
    ),
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              title="Journal"
              data={journalListData}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

JournalListing.propTypes = {
//   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  journalListData: Selectors.makeSelectJournalListData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
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
)(JournalListing);