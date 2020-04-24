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
import { Autocomplete } from '@material-ui/lab';

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

export const UtilityInfo = props => {
  const {
    handleChange,
    handleSelectContactSource,
    handleSelectContactGroup,
    closeNewContactDialog,
    handleNext,
    handlePrev,
    form,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { notes } = form;
    return notes !== null;
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Additional Information
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />

      <DialogContent>
        <form className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-contactGroup"
                options={[]}
                getOptionLabel={option => option.name}
                onChange={(evt, value) => handleSelectContactGroup(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Contact Group"
                    variant="outlined"
                    placeholder="Select Contact Group"
                    fullWidth
                    name="contactGroup"
                    size="small"
                    value={form.contactGroup}
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
                    size="small"
                    name="contactSources"
                    value={form.contactSources}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                id="outlined-description"
                fullWidth
                variant="outlined"
                size="small"
                multiline
                row={2}
                value={form.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
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
