import React, { memo } from 'react';
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
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';

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

const BudgetingList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');

  const {
    loading,
    history,
		openNewBankAccountDialogAction,
		editOpenBankAccountDialogAction,
    bankAccountData,
  } = props;

  const handleClick = (event, id) => {
    console.log("id value -> ", id);
    setAnchorEl(event.currentTarget);
    const selectedAccount = bankAccountData && bankAccountData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const columns = [
    {
      name: 'budgetName',
      label: 'Budget Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'year',
      label: 'Financial Year',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'budgetPeriod',
      label: 'Budget Period',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdOn',
      label: 'Created On',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
			name: 'lastUpdated',
			label: 'Last Updated',
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
                  editOpenBankAccountDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => {
                  history.push({
                    pathname: '/account/budgeting/add',
                    accountDetailsData: account,
                  });
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
          onClick={() => history.push('/account/budgeting/add')}
        >
          New Budget
        </Button>
      </Tooltip>
    ),
    onRowClick: (rowData, rowState) => {
      props.history.push('/account/budgeting/' + rowData[0])
    },
    elevation: 0
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              title="Budgeting"
              data={bankAccountData}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

BudgetingList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  budgetDialog: Selectors.makeSelectBudgetingDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewBudgetingDialog: () => dispatch(Actions.openNewBudgetingDialog()),
    editOpenBudgetingDialog: () => dispatch(Actions.editOpenBudgetingDialog()),
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
)(BudgetingList);
