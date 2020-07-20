/*
 * HRPage
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
import makeSelectHRPage, * as Selectors from './../selectors';
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
  const { getEmployees, dialog } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  console.log(dialog, "dialog department index")

  React.useEffect(() => {
    getEmployees();
  }, []);

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
  dialog: Selectors.makeSelectDeptDialog(),
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
)(DepartmentPage);
