import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Divider,
  TextField,
  makeStyles,
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

const PartyDialog = props => {
  const {
    selectedPartyGroupData,
    loading,
    partyGroupData,
    newPartyDialog,
    dispatchCloseNewPartyDialog,
    AllUserData,
    dispatchCreateNewPartyAction,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    partyGroupId: '',
    partyHead: { id: '' },
    assistantPartyHead: { id: '' },
    name: '',
    description: '',
  });

  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: { id: event.target.value } });
  };

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const canBeSubmitted = () => {
    const { partyHead, assistantPartyHead, name, description } = values;
    return (
      partyHead !== null &&
      assistantPartyHead !== null &&
      name !== '' &&
      description !== ''
    );
  };

  return (
    <div>
      <Dialog
        {...newPartyDialog.props}
        onClose={dispatchCloseNewPartyDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {newPartyDialog.type === 'new' ? 'New Party' : 'Edit Party'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {newPartyDialog.type === 'new' ? (
            <div>
              <TextField
                id="subgroup-name"
                label="Name"
                className={classes.textField}
                value={values.name}
                variant="outlined"
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="description"
                label="Description"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rows="3"
              />

              <TextField
                id="select-head"
                select
                fullWidth
                variant="outlined"
                label="Select Head"
                className={classes.textField}
                value={values.partyHead.id}
                onChange={handleSelectChange('partyHead')}
              >
                {AllUserData &&
                  AllUserData.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.emailAddress} {option.lastName}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                id="select-assistant"
                select
                fullWidth
                variant="outlined"
                className={classes.textField}
                label="Select Assistant"
                value={values.assistantPartyHead.id}
                onChange={handleSelectChange('assistantPartyHead')}
              >
                {AllUserData &&
                  AllUserData.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.emailAddress} {option.lastName}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchCreateNewPartyAction(values)
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {newPartyDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          )}
          <Button
            onClick={() => dispatchCloseNewPartyDialog()}
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

PartyDialog.propTypes = {
  dispatchCloseNewPartyDialog: PropTypes.func,
  newPartyDialog: PropTypes.object,
  partyGroupData: PropTypes.array,
  AllUserData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchCreateNewPartyAction: PropTypes.func,
  loading: PropTypes.bool,
  selectedPartyGroupData: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newPartyDialog: Selectors.makeSelectNewPartyDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseNewPartyDialog: () => dispatch(Actions.closeNewPartyDialog()),
    dispatchCreateNewPartyAction: evt => dispatch(Actions.createNewParty(evt)),
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
)(PartyDialog);
