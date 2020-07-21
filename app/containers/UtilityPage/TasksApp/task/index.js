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
import TaskList from './TaskList'

export function TaskPage(props) {

  const { match, getUtilityTask } = props;
  const { params } = match

  React.useEffect(() => {
    getUtilityTask(params.id)
  }, [])

  return (
    <div>
      <Helmet>
        <title>Task - Home</title>
        <meta name="description" content="Description of Task" />
      </Helmet>

      <TaskList />

    </div>
  );
};

TaskPage.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUtilityTask: (id) => dispatch(Actions.getUtilityTask(id)),
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
)(TaskPage);
