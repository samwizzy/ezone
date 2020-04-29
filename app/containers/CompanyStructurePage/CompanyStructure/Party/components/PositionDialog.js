import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  AppBar, Toolbar,
  Backdrop,
  CircularProgress,
  Divider,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  MenuItem,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PositionDialog = props => {
  const {
    updatePositionAction,
    loading,
    partyGroupData,
    newPositionDialog,
    dispatchCloseNewPositionDialog,
    // closeEditBranchDialogAction,
    AllUserData,
    dispatchCreateNewPositionAction,
    params,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    description: '',
    party_id: params.partyId,
  });

  useEffect(() => {
    setValues({ ...newPositionDialog.data });
  }, [newPositionDialog.data]);

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const canBeSubmitted = () => {
    const { name, description } = values;
    return name !== '' && description !== '';
  };

  return (
    <div>
      <Dialog
        {...newPositionDialog.props}
        onClose={dispatchCloseNewPositionDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {newPositionDialog.type === 'new' ? 'New Position' : 'Edit Position'}
            </Typography>
          </Toolbar>
        </AppBar>

        <Divider />

        <DialogContent>
          <div>
            <TextField
              id="subgroup-name"
              label="Name"
              className={classes.textField}
              value={values.name ? values.name : ''}
              variant="outlined"
              onChange={handleChange('name')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="description"
              label="Description"
              className={classes.textField}
              value={values.description ? values.description : ''}
              onChange={handleChange('description')}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows="3"
            />
          </div>
        </DialogContent>

        <DialogActions>
          {newPositionDialog.type === 'new' ? (
            <Button
              onClick={() => {
                dispatchCreateNewPositionAction(values);
                setValues('');
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {newPositionDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          ) : (
            <Button
              onClick={() => {
                updatePositionAction(values);
                setValues('');
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {newPositionDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          )}
          <Button
            onClick={() => dispatchCloseNewPositionDialog()}
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

PositionDialog.propTypes = {
  updatePositionAction: PropTypes.func,
  params: PropTypes.object,
  dispatchCloseNewPositionDialog: PropTypes.func,
  newPositionDialog: PropTypes.object,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  AllUserData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchCreateNewPositionAction: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newPositionDialog: Selectors.makeSelectNewPositionDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseNewPositionDialog: () =>
      dispatch(Actions.closeNewPositionDialog()),
    dispatchCreateNewPositionAction: evt =>
      dispatch(Actions.createNewPosition(evt)),
      updatePositionAction: evt =>
      dispatch(Actions.updatePosition(evt)),
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
)(PositionDialog);
