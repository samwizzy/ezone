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
    console.log(files, "Files upload")
    // this.setState({
    //   files,
    // });
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
  }

  render() {
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)} 
        open={this.state.open}
        onSave={this.handleSave.bind(this)}
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
