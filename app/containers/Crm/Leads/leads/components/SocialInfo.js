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
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
}));

export const UtilityInfo = props => {
  const {
    handleChange,
    handleSelectContactSource,
    handleSelectContactGroup,
    closeNewContactDialog,
    handleNext,
    handlePrev,
    form,
    contactGroups
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { notes } = form;
    return notes !== null;
  };

  console.log(contactGroups, "contactGroups")

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Additional Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-contact-group"
              options={contactGroups ? contactGroups : []}
              getOptionLabel={option => option.groupName}
              // value={form.contactGroup ? form.contactGroup : ''}
              onChange={(evt, value) => handleSelectContactGroup(evt, value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Contact Group"
                  variant="outlined"
                  placeholder="Select Contact Group"
                  fullWidth
                  margin="normal"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-contactSource"
              options={[]}
              getOptionLabel={option => option.name}
              onChange={(evt, value) => handleSelectContactSource(evt, value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Contact Sources"
                  variant="outlined"
                  placeholder="Select Contact Sources"
                  fullWidth
                  margin="normal"
                  size="small"
                  name="contactSources"
                  value={form.contactSources}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Description"
              id="outlined-description"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              multiline
              row={2}
              value={form.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewContactDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canSubmitForm()}
          color="primary"
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};
