/*
 * HRPage Employee
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './../actions';
import makeSelectHRPage from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import ModuleLayout from './ModuleLayout'
import EmployeeList from './EmployeeList';

const key = 'hrPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function EmployeePage(props) {
  const { getEmployees } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

<<<<<<< HEAD
  const columns = [
    {
      name: 'uuId',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => (
          <Avatar aria-label="avatar" className={classes.avatar}>
            A
          </Avatar>
        ),
      },
    },
    {
      name: 'id',
      label: 'Employee Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = employees && employees.find(e => e.id == id);
          return (
            <span>{`${toTitleCase(emp.firstName)} ${toTitleCase(
              emp.lastName,
            )}`}</span>
          );
        },
      },
    },
    {
      name: 'employeeId',
      label: 'Employee ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department',
      label: 'Department ',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'enabled',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: enabled => (
          <span>{enabled ? 'Active' : 'Inactive'}</span>
        ),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none', // single, multiple
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddEmployee openDialog={openNewEmployeeDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      
      //getEmployee(rowData[0]);
    },
    elevation: 0,
  };
=======
  React.useEffect(() => {
    getEmployees();
  }, []);
>>>>>>> 6071e0663911bb51f055bdbfcc2c7e0c722723ff

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Page</title>
        <meta name="description" content="ezone application employee page" />
      </Helmet>

      <ModuleLayout>
        <EmployeeList />
      </ModuleLayout>
    </React.Fragment>
  );
}

EmployeePage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeePage);
