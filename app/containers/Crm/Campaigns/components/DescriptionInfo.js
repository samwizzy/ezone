import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  Button,
  Grid,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
}));

export const DescriptionInfo = props => {
  const classes = useStyles();

  const {
    handleChange,
    closeNewCampaignDialog,
    handleNext,
    handlePrev,
    handleSubmit,
    form,
  } = props;

  const canSubmitForm = () => {
    const { fax, website, address1, mobileNo } = form;
    return fax !== '' && website !== '' && address1 !== '' && mobileNo !== '';
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            Description Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              id="outlined-description"
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={2}
              rowsMax={4}
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewCampaignDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmitForm()}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};
