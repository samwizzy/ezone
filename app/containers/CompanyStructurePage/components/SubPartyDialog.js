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
  Typography,
  MenuItem,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

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

const heads = [
  {
    label: 'Joel Johnson',
    value: 'joel johnson',
  },
  {
    label: 'Fela Brown',
    value: 'fela brown',
  },
  {
    label: 'Charles Brooks',
    value: 'charles brooks',
  },
  {
    label: 'Tom Cruise',
    value: 'tom cruise',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubPartyDialog = props => {
  const {
    partyGroupData,
    subPartyDialog,
    closeNewSubGroupDialog,
    // closeEditBranchDialogAction,
    AllUserData,
    dispatchCreateNewPartyAction,
  } = props;

  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const [values, setValues] = React.useState({
    partyGroupId: '',
    partyHead: { id: '' },
    assistantPartyHead: { id: '' },
    name: '',
    description: '',
  });

  console.log(AllUserData, 'AllUserData AllUserData');
  // console.log(subPartyDialog, 'subPartyDialog props ...');

  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: { id: event.target.value } });
  };

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const closeComposeDialog = () => {
    subPartyDialog.type === 'new' ? closeNewSubGroupDialog() : null;
  };

  return (
    <div>
      <Dialog
        {...subPartyDialog.props}
        onClose={closeNewSubGroupDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {subPartyDialog.type === 'new' ? 'New Party' : 'Edit Party'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {subPartyDialog.type === 'new' ? (
            <div>
              <TextField
                id="select-group"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                label="Select Group"
                value={values.partyGroupId}
                name="partyGroupId"
                onChange={handleChange('partyGroupId')}
              >
                {partyGroupData &&
                  partyGroupData.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>

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
          <Button
            onClick={() => {
              dispatchCreateNewPartyAction(values);
              closeComposeDialog();
            }}
            color="primary"
            variant="contained"
          >
            {subPartyDialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            onClick={() => closeNewSubGroupDialog()}
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

SubPartyDialog.propTypes = {
  closeNewSubGroupDialog: PropTypes.func,
  subPartyDialog: PropTypes.object,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  AllUserData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchCreateNewPartyAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  subPartyDialog: Selectors.makeSelectSubPartyDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewSubGroupDialog: () => dispatch(Actions.closeNewSubGroupDialog()),
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
)(SubPartyDialog);
