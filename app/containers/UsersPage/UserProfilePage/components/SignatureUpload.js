import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, Button, Paper, DialogContent, DialogActions } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  }
}));

const SignatureUpload = props => {
  const classes = useStyles();
  const { closeSignatureDialog } = props

  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    description: '',
    fileName: '',
    fileUrl: '',
    format: '',
    size: '',
    file: '',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      setForm(_.set(form, 'fileName', acceptedFiles[0].name));
      setForm(_.set(form, 'format', acceptedFiles[0].type));
      setForm(_.set(form, 'size', acceptedFiles[0].size));
      getBase64(acceptedFiles[0], result =>
        setForm(_.set(form, 'file', result)),
      );
    },
  });

  const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => cb(reader.result.split(',')[1]);
    reader.onerror = error => {
      console.log('Error: ', error);
    };
  };

  const thumbs = files.map(file => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  console.log(form, 'formform');
  return (
    <React.Fragment>
      <DialogContent dividers>
        <section>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some file here, or click to select file</p>
          </div>
          <aside className={classes.thumbsContainer}>{thumbs}</aside>
        </section>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          // onClick={() => save()}
        >
          Save
        </Button>
        <Button
          onClick={() => closeSignatureDialog()}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

SignatureUpload.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewBranchDialogAction: () => dispatch(Actions.openNewEmployeeDialog()),
    closeSignatureDialog: () => dispatch(Actions.closeSignatureDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignatureUpload);
