import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
// import PaperDropzone from '../../components/PaperDropzone';
import PaperDropzone from './PaperDropzone';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
  appBar: {
    position: 'static',
  },
}));

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

export const ImageUpload = props => {
  const classes = useStyles();

  const {
    uploadFileAction,
    closeNewContactDialog,
    handlePrev,
    handleSubmit,
    dialog,
    form
  } = props;

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Image Upload
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PaperDropzone uploadFileAction={uploadFileAction} />

            {/* <div style={thumbInner}>
              <img src={form.imageUrl} alt={form.imageName} style={img} />
            </div> */}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => closeNewContactDialog()} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
        >
          {dialog.type === 'new' ? 'Save' : 'Update'}
        </Button>
      </DialogActions>
    </div>
  );
};
