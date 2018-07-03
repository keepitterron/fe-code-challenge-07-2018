import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const UploadFile = ({ onFileUpload }) => (
  <div>
    <label htmlFor="file-upload" style={{position: 'absolute', bottom: '1rem', right: '1rem'}}>
      <Button variant="fab" component="span" color="primary">
        <AddIcon />
      </Button>
    </label>

      <input type='file' id="file-upload" style={{display: 'none'}} onChange={onFileUpload} />
  </div>
);

export default UploadFile;
