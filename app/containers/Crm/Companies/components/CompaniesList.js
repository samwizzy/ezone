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
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import CompaniesDialog from './CompaniesDialog';
import CompanyDetailsDialog from './CompanyDetailsDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
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
  view: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CompaniesList = props => {
  const classes = useStyles();

  const {
    loading,
    getAllCompaniesAction,
    getAllCompanies,
    openNewCompanyDialogAction,
    openEditCompanyDialogAction,
    openCompanyDetailsDialogAction,
  } = props;

  useEffect(() => {
    getAllCompaniesAction();
  }, []);

  console.log(getAllCompanies, 'getAllCompanies');
  const columns = [
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          if (value === '') {
            return '';
          }
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
      name: 'firstName',
      label: 'Company Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'emailAddress',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lifeStage',
      label: 'Life Stage',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'ownerName',
      label: 'Owner',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'dateCreated',
      label: 'Created At',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const contac = getAllCompanies.find(company => value === company.id);
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Button
                variant="outlined" size="small" color="primary" className={classes.margin}
                onClick={() => openEditCompanyDialogAction(contac)}
              >
                Edit
              </Button>
              <FormControlLabel
                className={classes.view}
                control={<Visibility />}
                onClick={() => openCompanyDetailsDialogAction(contac)}
              >
                Edit
              </FormControlLabel>
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
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Add />}
        onClick={() => openNewCompanyDialogAction()}
      >
        New
      </Button>
    ),
  };

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MUIDataTable
        className={classes.datatable}
        title="All Companies"
        data={getAllCompanies}
        columns={columns}
        options={options}
      />
      <CompaniesDialog />
      <CompanyDetailsDialog />
    </React.Fragment>
  );
};

CompaniesList.propTypes = {
  loading: PropTypes.bool,
  getAllCompaniesAction: PropTypes.func,
  openNewCompanyDialogAction: PropTypes.func,
  openEditCompanyDialogAction: PropTypes.func,
  openCompanyDetailsDialogAction: PropTypes.func,
  getAllCompanies: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllCompanies: Selectors.makeSelectGetAllCompanies(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewCompanyDialogAction: () =>
      dispatch(Actions.openNewCompanyDialog()),
    openEditCompanyDialogAction: evt =>
      dispatch(Actions.openEditCompanyDialog(evt)),
    openCompanyDetailsDialogAction: evt =>
      dispatch(Actions.openCompanyDetailsDialog(evt)),
    getAllCompaniesAction: () =>
      dispatch(Actions.getAllCompanies()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompaniesList);
