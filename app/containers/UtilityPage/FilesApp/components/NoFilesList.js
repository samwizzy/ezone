import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import MoreVertRounded from '@material-ui/icons/MoreVertRounded'
import tasksIcon from '../../../../images/tasksIcon.svg'
import * as Actions from '../../actions';
import * as Selectors from './../../selectors';
import AddFileDialog from './AddFileDialog'
import FileUploadDialog from './FileUploadDialog'

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  }

}));

const NoFilesList = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' className={classes.root}>
        <Grid item>
          <Box my={4}>
            <img src={tasksIcon} />
          </Box>
          <Box>
            <Typography variant='h6'>No file yet</Typography>

            <Button onClick={props.openFileUploadDialog} variant="contained" color="primary" className={classes.button} disableElevation>
              Upload a file
            </Button>
          </Box>
        </Grid>
      </Grid>
      <FileUploadDialog />
    </React.Fragment>
  )
}

NoFilesList.propTypes = {
  loading: PropTypes.bool,
  openFileUploadDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  files: Selectors.makeSelectFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NoFilesList);
