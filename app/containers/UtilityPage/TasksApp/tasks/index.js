import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import TasksList from './TasksList'

export function TasksPage(props) {

  const { match, getUtilityTasks } = props;
  const { params } = match

  React.useEffect(() => {
    getUtilityTasks()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Tasks - Home</title>
        <meta name="description" content="Description of Tasks" />
      </Helmet>

      <TasksList />

    </div>
  );
};

TasksPage.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
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
)(TasksPage);
