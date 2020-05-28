import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  AppBar,
  Toolbar,
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
  root: {
    flexGrow: 1
  },
  title: { flexGrow: 1 },
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
    updatePosition,
    loading,
    partyGroupData,
    positionDialog,
    closeNewPositionDialog,
    AllUserData,
    createNewPosition,
    params,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    description: '',
    party_id: '',
  });

  useEffect(() => {
    setValues({ ...positionDialog.data });
  }, [positionDialog.data]);

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
      party_id: params.partyId,
    });
  };

  const handleSubmit = () => {
    positionDialog.type === 'new' ? createNewPosition(values) : updatePosition(values);
    setValues('')
  }

  const canBeSubmitted = () => {
    const { name, description } = values;
    return name !== '' && description !== '';
  };

  return (
    <div>
      <Dialog
        {...positionDialog.props}
        onClose={closeNewPositionDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {positionDialog.type === 'new'
                ? 'New Position'
                : 'Edit Position'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <div>
            <TextField
              id="subgroup-name"
              label="Name"
              value={values.name ? values.name : ''}
              variant="outlined"
              onChange={handleChange('name')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="description"
              label="Description"
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
          <Button
            onClick={() => handleSubmit(values)}
            color="primary"
            variant="contained"
            disabled={!canBeSubmitted()}
          >
            {positionDialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            onClick={() => closeNewPositionDialog()}
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
  updatePosition: PropTypes.func,
  params: PropTypes.object,
  closeNewPositionDialog: PropTypes.func,
  positionDialog: PropTypes.object,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  AllUserData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  createNewPosition: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  positionDialog: Selectors.makeSelectPositionDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewPositionDialog: () => dispatch(Actions.closeNewPositionDialog()),
    createNewPosition: evt => dispatch(Actions.createNewPosition(evt)),
    updatePosition: evt => dispatch(Actions.updatePosition(evt)),
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
