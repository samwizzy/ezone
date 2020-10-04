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
import _ from 'lodash';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  const [selectedBudget, setSelectedBudget] = React.useState(null);

  const {
    loading,
    history,
    openNewBankAccountDialogAction,
    editOpenBankAccountDialogAction,
    budgets,
  } = props;

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedBudget(_.find(budgets, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    const { id } = selectedBudget
    history.push('/account/budgeting/view/' + id)
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
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => handleClick(event, value)}
            >
              Options
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    customToolbar: () => (
      <Tooltip title="Create new budget">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push('/account/budgeting/new')}
        >
          New Budget
        </Button>
      </Tooltip>
    ),
    onRowClick: (rowData, rowState) => {
      props.history.push('/account/budgeting/view/' + rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Budgeting"
        data={budgets}
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
        <MenuItem onClick={() => editOpenBankAccountDialogAction(selectedBudget)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => { }}>
          View details
        </MenuItem>
      </Menu>
    </div>
  );
};

BudgetingList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  budgetDialog: Selectors.makeSelectBudgetingDialog(),
  budgets: Selectors.makeSelectBudgetsData(),
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
