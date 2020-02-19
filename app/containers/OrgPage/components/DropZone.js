import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

const ColorDropZone = props => {

  console.log(props, 'props');

  const { handleChange, logo} = props;
  const [files, setFiles] = useState([]);

  // const handleChange = data => {
  //   console.log(data, 'data');
  //   setFiles(data);
  // };

  return (
    <DropzoneArea
      // onSave={evt => handleChange(evt)}
      // onSave={evt => console.log(evt, 'pppp')}
      // onSave={evt => handleChange.evt}
      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
      onChange={evt => console.log(evt, 'evnt')}
      showFileNames
    />
  );
};

export default ColorDropZone;
