import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
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
    updatePartyGroupAction,
  } = props;

  useEffect(() => {
    setValues({ ...newPartyGroupDialog.data });
  }, [newPartyGroupDialog.data]);
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
          {newPartyGroupDialog.type === 'new'
            ? 'New Party Group'
            : 'Edit Party Group'}
        </DialogTitle>

        <Divider />

        <DialogContent>
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
          {newPartyGroupDialog.type === 'new' ? (
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
          ) : (
            <Button
              onClick={() => {
                updatePartyGroupAction(values);
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
  updatePartyGroupAction: PropTypes.func,
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
    dispatchCloseNewPartyPartyDialog: () =>
      dispatch(Actions.closeNewPartyGroupDialog()),
    dispatchCreateNewPartyGroupAction: evt =>
      dispatch(Actions.createNewPartyGroupAction(evt)),
    updatePartyGroupAction: evt =>
      dispatch(Actions.updatePartyGroupAction(evt)),
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
