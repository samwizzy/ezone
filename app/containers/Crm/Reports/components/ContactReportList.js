/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: "auto",
  },
  datatable: {
    whiteSpace: "nowrap",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ContactReportList = props => {
  const classes = useStyles();

  const {
    loading,
    getCampaigns,
    campaigns,
    openNewCampaignDialog,
    openEditCampaignDialog,
    openCampaignDetailsDialog,
  } = props;

  useEffect(() => {
    getCampaigns();
  }, []);

  const columns = [
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <FormControlLabel
              label={tableMeta.rowIndex + 1}
              control={<Icon />}
            />
          );
        },
      },
    },
    {
      name: 'source',
      label: 'Contact Source',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'opportunity',
      label: 'Opportunity',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lead',
      label: 'Lead',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'customer',
      label: 'Customer',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    elevation: 0
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MUIDataTable
        className={classes.datatable}
        title="Contact Reports"
        data={campaigns}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

ContactReportList.propTypes = {
  loading: PropTypes.bool,
  getCampaigns: PropTypes.func,
  openNewCampaignDialog: PropTypes.func,
  openEditCampaignDialog: PropTypes.func,
  openCampaignDetailsDialog: PropTypes.func,
  campaigns: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  campaigns: Selectors.makeSelectCampaigns(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewCampaignDialog: () => dispatch(Actions.openNewCampaignDialog()),
    openEditCampaignDialog: evt => dispatch(Actions.openEditCampaignDialog(evt)),
    openCampaignDetailsDialog: evt => dispatch(Actions.openCampaignDetailsDialog(evt)),
    getCampaigns: () => dispatch(Actions.getCampaigns()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactReportList);
