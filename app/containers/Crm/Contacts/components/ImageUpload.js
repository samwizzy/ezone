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
import PaperDropzone from '../../components/PaperDropzone';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
  appBar: {
    position: 'relative',
  },
}));

export const ImageUpload = props => {
  const {
    setForm,
    uploadFileAction,
    closeNewContactDialog,
    handlePrev,
    form,
    createNewContactAction,
    updateContactAction,
    contactDialog,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Image Upload
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />

      <DialogContent>
        <form className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <PaperDropzone uploadFileAction={uploadFileAction} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        {contactDialog.type === 'new' ? (
          <div>
            <Button onClick={() => closeNewContactDialog()} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePrev} color="primary">
              Prev
            </Button>
            <Button
              onClick={() => {
                createNewContactAction(form);
                setForm('');
              }}
              color="primary"
            >
              Save
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => closeNewContactDialog()} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePrev} color="primary">
              Prev
            </Button>
            <Button
              onClick={() => {
                updateContactAction(form);
                setForm('');
              }}
              color="primary"
            >
              Update
            </Button>
          </div>
        )}
      </DialogActions>
    </div>
  );
};
