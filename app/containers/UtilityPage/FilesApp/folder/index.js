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
import FolderList from './FolderList'

export function FolderPage(props) {
  const { loading, getAllFolders, getEmployees, match } = props;
  const { params } = match

  console.log(params, "params")

  React.useEffect(() => {
    getAllFolders(params.id)
    getEmployees()
  }, []);

  return (
    <div>
      <Helmet>
        <title>Documents - Home</title>
        <meta name="description" content="Utility Documents Page" />
      </Helmet>

      <FolderList />

    </div>
  );
};

FolderPage.propTypes = {
  loading: PropTypes.bool,
  file: PropTypes.array,
  getAllFolders: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  folder: Selectors.makeSelectFolder(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllFolders: (data) => dispatch(Actions.getAllFolders(data)),
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(FolderPage);
