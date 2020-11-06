import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { CSVReader } from 'react-papaparse';
import _ from 'lodash';
import { makeStyles, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const buttonRef = React.createRef();

const useStyles = makeStyles(theme => ({
  root: {},
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 0,
    '&.hide': {
      display: 'none',
    },
  },
  title: {
    '&.show': { display: 'block !important' },
    display: 'none',
    border: `1px solid ${theme.palette.divider}`,
    height: 33,
    padding: theme.spacing(0, 2),
    // flex: '1 auto'
  },
}));

const ImportControl = props => {
  const classes = useStyles(props);

  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = data => {
    console.log(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = data => {
    console.log(data);
  };

  const handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }) => (
        <aside className={classes.flex}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenDialog}
            startIcon={<GetAppIcon />}
            className={classes.button}
            disableElevation
          >
            Import
					</Button>
          <div className={classNames(classes.title, { 'show': Boolean(file) })}>
            {file && file.name}
          </div>
          <Button
            variant="contained"
            onClick={handleRemoveFile}
            className={classNames(classes.button, { 'hide': !Boolean(file) })}
            disableElevation
          >
            Remove
					</Button>
        </aside>
      )}
    </CSVReader>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(ImportControl);
