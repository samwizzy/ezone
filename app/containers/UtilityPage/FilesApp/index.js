import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import saga from './../saga';
import reducer from './../reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FilesList from './FilesList'
import FileList from './FileList'
import DashboardLayout from '../components/DashboardLayout' 

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const FilesApp = props => {
    useInjectReducer({ key: 'utilityPage', reducer });
    useInjectSaga({ key: 'utilityPage', saga });

    const classes = useStyles();
    const { loading, getUtilityFiles, getEmployees, match } = props;
    const { params } = match

    console.log(params, "params")

    React.useEffect(() => {
        getUtilityFiles()
        getEmployees()
    }, []);

    return (
        <DashboardLayout>
            { params.id? 
                <FileList /> : <FilesList />
            }
        </DashboardLayout>
    );
};

FilesApp.propTypes = {
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
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    openShareFileDialog: ev => dispatch(Actions.openShareFileDialog(ev)),
    // openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
    getUtilityFiles: ev => dispatch(Actions.getUtilityFiles(ev)),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
)(FilesApp));
