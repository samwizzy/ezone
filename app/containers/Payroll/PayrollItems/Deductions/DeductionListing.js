import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  makeStyles,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green, red, grey, yellow } from '@material-ui/core/colors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& td': { padding: theme.spacing(1, 2) },
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  status: {
    '&.pending': { color: green[500] },
    '&.rejected': { color: red[500] },
    '&.submitted': { color: yellow[500] },
    '&.drafted': { color: grey[500] },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const DeductionListing = props => {
  const classes = useStyles();
  const {
    loading,
    history,
    match,
    payrollSetupData,
    deductions,
    getDeductionById,
    openNewDeductionDialog,
    openEditDeductionDialog,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDeduction, setSelectedDeduction] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedDeduction(_.find(deductions, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    const { id } = selectedDeduction;
    openEditDeductionDialog(selectedDeduction);
    history.push(`${match.url}/edit/${id}`);
  };

  const handleViewClick = () => {
    const { id } = selectedDeduction;
    getDeductionById(id);
    history.push(`${match.url}/view/${id}`);
  };

  const orderedDeductions = _.orderBy(deductions, 'dateCreated', 'desc');

  if (loading) {
    return <CircleLoader />;
  }

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'inputType',
      label: 'Input type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'value',
      label: 'Value',
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
        customBodyRender: value => (
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={event => handleClick(event, value)}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    filter: false,
    viewColumns: false,
    textLabels: {
      body: {
        noMatch: 'Sorry, no deductions found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New deduction">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNewDeductionDialog}
        >
          New deduction
        </Button>
      </Tooltip>
    ),
    elevation: 0,
  };

  return (
    <React.Fragment>
      <MUIDataTable
        className={classes.datatable}
        title="Deductions"
        data={[]}
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
        <MenuItem onClick={handleViewClick}>View</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

DeductionListing.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  deductions: Selectors.makeSelectDeductions(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDeductionById: data => dispatch(Actions.getDeductionById(data)),
    openNewDeductionDialog: () => dispatch(Actions.openNewDeductionDialog()),
    openEditDeductionDialog: data =>
      dispatch(Actions.openEditDeductionDialog(data)),
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
)(DeductionListing);
