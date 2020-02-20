import React, { memo } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1.5, 0),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PartyGroupDialog = props => {
  const {
    dispatchCreateNewPartyGroupAction,
    loading,
    newPartyGroupDialog,
    dispatchCloseNewPartyPartyDialog,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    description: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const canBeSubmitted = () => {
    const { name, description } = values;
    return name !== '' && description !== '';
  };

  return (
    <div>
      <Dialog
        {...newPartyGroupDialog.props}
        TransitionComponent={Transition}
        onClose={dispatchCloseNewPartyPartyDialog}
        keepMounted
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {newPartyGroupDialog.type === 'new' ? 'New Party' : 'Edit Party'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {newPartyGroupDialog.type === 'new' ? (
            <div>
              <TextField
                id="party-group"
                label="Party Group"
                className={classes.textField}
                value={values.name}
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
                value={values.description}
                variant="outlined"
                onChange={handleChange('description')}
                margin="normal"
                fullWidth
                multiline
                rows="3"
              />
              {/* <TextField
                id="select-head"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                label="Select Head"
                value={currency}
                onChange={handleSelectChange}
              >
                {heads.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-state"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                label="Select Assistant"
                value={currency}
                onChange={handleSelectChange}
              >
                {heads.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchCreateNewPartyGroupAction(values);
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {newPartyGroupDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          )}
          <Button
            onClick={() => dispatchCloseNewPartyPartyDialog()}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PartyGroupDialog.propTypes = {
  dispatchCloseNewPartyPartyDialog: PropTypes.func,
  newPartyGroupDialog: PropTypes.object,
  loading: PropTypes.bool,
  dispatchCreateNewPartyGroupAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newPartyGroupDialog: Selectors.makeSelectNewPartyGroupDialog(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseNewPartyPartyDialog: () => dispatch(Actions.closeNewPartyGroupDialog()),
    dispatchCreateNewPartyGroupAction: evt =>
      dispatch(Actions.createNewPartyGroupAction(evt)),
    dispatch,
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
