import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleChange(files) {
    this.setState({
      files,
    });
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    console.log(files, "Files upload")
    this.setState({
      files: files,
      open: false
    });
  }

  render() {
    console.log(this.state.files, "this.state.files")

    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)} 
        open={this.state.open}
        onSave={this.handleSave}
        // acceptedFiles={["image/png"]}
        showPreviews={true}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        onClose={this.handleClose.bind(this)}
        showFileNamesInPreview={true}
      />
    );
  }
}

export default DropzoneAreaExample;
