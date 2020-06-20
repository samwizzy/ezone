import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Divider,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
  description: '',
}

const PartyGroupDialog = props => {
  const {
    createNewPartyGroupAction,
    loading,
    newPartyGroupDialog,
    closeNewPartyGroupDialog,
    updatePartyGroupAction,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({ ...initialState });

  useEffect(() => {
    console.log("i am triggered in componentdidmount")
    newPartyGroupDialog.type === 'new' ?
      setValues({ ...initialState }) :
      setValues({ ...newPartyGroupDialog.data })
  }, [newPartyGroupDialog.type]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleReset = () => setValues({ ...initialState })

  const handleSubmit = () => {
    // newPartyGroupDialog.type === 'new' ?
    //   createNewPartyGroupAction(values) : updatePartyGroupAction(values)
    handleReset()
  };

  console.log(newPartyGroupDialog, "newPartyGroupDialog")
  console.log(values, "values")

  const canBeSubmitted = () => {
    const { name, description } = values;
    return name !== '' && description !== '';
  };

  return (
    <div>
      <Dialog
        {...newPartyGroupDialog.props}
        TransitionComponent={Transition}
        onClose={closeNewPartyGroupDialog}
        keepMounted
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {newPartyGroupDialog.type === 'new'
                ? 'New Party Group'
                : 'Edit Party Group'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <div>
            <TextField
              id="party-group"
              label="Party Group"
              className={classes.textField}
              value={values.name ? values.name : ''}
              onChange={handleChange('name')}
              margin="normal"
              variant="outlined"
              size="small"
              fullWidth
            />

            <TextField
              id="description"
              label="Description"
              className={classes.textField}
              value={values.description ? values.description : ''}
              variant="outlined"
              onChange={handleChange('description')}
              margin="normal"
              fullWidth
              multiline
              rows="3"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!canBeSubmitted()}
          >
            {newPartyGroupDialog.type === 'new' ? 'Save' : 'Update'}
          </Button>

          <Button
            onClick={() => { closeNewPartyGroupDialog(); handleReset(); }}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PartyGroupDialog.propTypes = {
  updatePartyGroupAction: PropTypes.func,
  closeNewPartyGroupDialog: PropTypes.func,
  newPartyGroupDialog: PropTypes.object,
  loading: PropTypes.bool,
  createNewPartyGroupAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newPartyGroupDialog: Selectors.makeSelectNewPartyGroupDialog(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewPartyGroupDialog: () => dispatch(Actions.closeNewPartyGroupDialog()),
    createNewPartyGroupAction: evt => dispatch(Actions.createNewPartyGroupAction(evt)),
    updatePartyGroupAction: evt => dispatch(Actions.updatePartyGroupAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PartyGroupDialog);
