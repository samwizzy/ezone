import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import styled from 'styled-components';
import _ from 'lodash';
import * as AppSelectors from '../../../../../../App/selectors';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function PaperDropzone(props) {
  const [files, setFiles] = useState([]);
  const { handleImageUpload, name } = props;
  const [form, setForm] = useState({
    attachments: [],
  });

  const {
    open,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'video/*',
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );

      console.log(acceptedFiles, "video dropzone")
      handleImageUpload(name, acceptedFiles[0]);
    },
  });

  const { ref, ...rootProps } = getRootProps();

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
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

  console.log(thumbs, "thumbs vide check")

  return (
    <RootRef rootRef={ref}>
      <div {...rootProps}>
        <Container
          {...getRootProps({
            className: 'dropzone',
            isDragActive,
            isDragAccept,
            isDragReject,
          })}
        >
          <input {...getInputProps()} multiple={false} />
          <p>Drag 'n' drop some files here, or Upload a Thumbnail</p>
          <IconButton onClick={open}>
            <CloudUploadIcon fontSize="large" />
          </IconButton>
        </Container>

        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>
    </RootRef>
  );
}

PaperDropzone.propTypes = {
  currentUser: PropTypes.object,
  handleImageUpload: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(PaperDropzone);
