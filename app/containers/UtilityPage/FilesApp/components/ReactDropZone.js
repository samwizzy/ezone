import React, { useMemo, useRef, useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import styled from 'styled-components';
import _ from 'lodash'
 
const getColor = (props) => {
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
}

const dropzone = {
  backgroundColor: '#000 !important'
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
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
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
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
  transition: border .24s ease-in-out;
`;

function PaperDropzone(props) {
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    description: "",
    docName: "",
    fileUrl: "",
    format: "",
    size: "",
    file: ""
  });

  const {
    open,
    acceptedFiles, 
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    rootRef,
    inputRef
  } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      
      setForm(_.set(form, "docName", acceptedFiles[0].name))
      setForm(_.set(form, "format", acceptedFiles[0].type))
      setForm(_.set(form, "size", acceptedFiles[0].size))
      getBase64(acceptedFiles[0], (result) => setForm(_.set(form, "file", result)))
    },
  });

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        return cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  const {ref, ...rootProps} = getRootProps();

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  console.log(acceptedFiles, "References library")
  // console.log(inputRef, "inputRef library")
  console.log(files[0], "files state library")
  console.log(form, "form state form")
  
  
  return (
    <RootRef rootRef={ref}>
      <div {...rootProps}>
        <Container {...getRootProps({ className: 'dropzone', isDragActive, isDragAccept, isDragReject})}>
          <input {...getInputProps()} multiple={false} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
        </Container>

        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </div>
    </RootRef>
  )
}

export default PaperDropzone;
