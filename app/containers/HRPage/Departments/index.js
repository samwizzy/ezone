/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
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
import DepartmentList from './DepartmentList';

const key = 'hrPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function DepartmentPage(props) {
  const { getEmployees } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

<<<<<<< HEAD
  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none', // single, multiple
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddDepartment openDialog={openNewDepartmentDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
      getDepartment(rowData[0])
    },
    elevation: 0
  };
=======
  React.useEffect(() => {
    getEmployees();
  }, []);
>>>>>>> 6071e0663911bb51f055bdbfcc2c7e0c722723ff

  return (
    <React.Fragment>
      <Helmet>
        <title>Department Page</title>
        <meta name="description" content="ezone application department page" />
      </Helmet>

      <ModuleLayout>
        <DepartmentList />
      </ModuleLayout>
    </React.Fragment>
  );
}

DepartmentPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
<<<<<<< HEAD
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
    openNewDepartmentDialog: () => dispatch(Actions.openNewDepartmentDialog()),
    getBranches: () => dispatch(Actions.getBranches()),
    getDepartment: (id) => dispatch(Actions.getDepartment(id)),
=======
>>>>>>> 6071e0663911bb51f055bdbfcc2c7e0c722723ff
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DepartmentPage);
