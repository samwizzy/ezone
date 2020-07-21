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
import FoldersList from './FoldersList'

export function FoldersPage(props) {
  const { loading, getAllFoldersAndDocs, getEmployees, match } = props;
  const { params } = match

  console.log(params, "params")

  React.useEffect(() => {
    getAllFoldersAndDocs({ folderId: 0, type: 'ROOT' })
    getEmployees()
  }, []);

  return (
    <div>
      <Helmet>
        <title>Documents - Home</title>
        <meta name="description" content="Utility Documents Page" />
      </Helmet>

      <FoldersList />

    </div>
  );
};

FoldersPage.propTypes = {
  loading: PropTypes.bool,
  files: PropTypes.array,
  getUtilityFiles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  files: Selectors.makeSelectFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllFoldersAndDocs: (data) => dispatch(Actions.getAllFoldersAndDocs(data)),
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
)(FoldersPage);
