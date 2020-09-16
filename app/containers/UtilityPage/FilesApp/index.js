import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from './actions';
import makeSelectUtilityFiles, * as Selectors from '../selectors';
import saga from './saga';
import reducer from './reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FoldersList from './folders'
import FolderList from './folder'
// import FilesList from './FoldersList'
// import FileList from './FolderList'
import ModuleLayout from '../components/ModuleLayout'
import FileUploadDialog from './components/FileUploadDialog'
import ShareFileDialog from './components/ShareFileDialog'
import AddFileDialog from './components/AddFileDialog'
import AddFolderDialog from './components/AddFolderDialog'
import FilePreviewDialog from './components/FilePreviewDialog'

const key = "utilityFiles"

export function FilesApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { loading, getAllFoldersAndDocs, getEmployees, match } = props;
  const { params, path, url } = match

  console.log(params, "params")

  React.useEffect(() => {
    getAllFoldersAndDocs({ folderId: 0, type: 'ROOT' })
    getEmployees()
  }, []);

  return (
    <div>
      <Helmet>
        <title>Documents - Index</title>
        <meta name="description" content="Utility Documents Page" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={FoldersList} />
        <Route path={`${path}/:id`} component={FolderList} />

      </ModuleLayout>

      <FileUploadDialog />
      <ShareFileDialog />
      <AddFileDialog />
      <AddFolderDialog />
      <FilePreviewDialog />
    </div>
  );
};

FilesApp.propTypes = {
  loading: PropTypes.bool,
  files: PropTypes.array,
  getUtilityFiles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  utilityFiles: makeSelectUtilityFiles(),
  loading: Selectors.makeSelectLoading(),
  files: Selectors.makeSelectFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    openShareFileDialog: ev => dispatch(Actions.openShareFileDialog(ev)),
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
)(FilesApp);
