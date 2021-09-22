import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Slide,
  Typography,
  TextField,
  Toolbar,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
  description: '',
  party_id: '',
};

function PositionDialog(props) {
  const classes = useStyles();
  const {
    loading,
    closeNewPositionDialog,
    partyGroups,
    dialog,
    createPosition,
    updatePosition,
  } = props;
  const [form, setForm] = useState({ ...initialState });

  console.log(dialog, 'dialog checking');
  console.log(partyGroups, 'dialog partyGroups');

  useEffect(() => {
    dialog.type === 'edit' && dialog.data
      ? setForm({ ...dialog.data })
      : setForm({ ...initialState });
  }, [dialog]);

  const canSubmitForm = () => {
    const { name } = form;
    return name.length > 0;
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => setForm({ ...initialState });

  const handleSubmit = () => {
    dialog.type === 'edit' ? updatePosition(form) : createPosition(form);

    handleReset();
  };

  console.log(form, 'checking form role...');

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewPositionDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {dialog.type === 'edit' ? 'Update position' : 'Add position'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          {/* <TextField
            id="party-id"
            name="party_id"
            placeholder="Party group"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            size="small"
            label="Party group"
            value={form.party_id}
            onChange={handleChange}
          >
            <MenuItem value="">Select party group</MenuItem>
            {partyGroups &&
              partyGroups.map(partyGroup => (
                <MenuItem key={partyGroup.id} value={partyGroup.id}>
                  {partyGroup.name}
                </MenuItem>
              ))}
          </TextField> */}

          <TextField
            name="name"
            label="Name"
            id="outlined-title"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            name="description"
            label="Description"
            id="outlined-description"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.description}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeNewPositionDialog}
            variant="contained"
            disableElevation
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading ? loading : !canSubmitForm()}
            color="primary"
            startIcon={loading && <CircularProgress size={14} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PositionDialog.propTypes = {
  closeNewPositionDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectPositionDialog(),
  partyGroups: Selectors.makeSelectPartyGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewPositionDialog: () => dispatch(Actions.closeNewPositionDialog()),
    createPosition: data => dispatch(Actions.createPosition(data)),
    updatePosition: data => dispatch(Actions.updatePosition(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PositionDialog);
