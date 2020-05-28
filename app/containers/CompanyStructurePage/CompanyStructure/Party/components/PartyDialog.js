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
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Slide,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
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
  title: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PartyDialog = props => {
  const {
    updatePartyAction,
    selectedPartyGroupData,
    loading,
    partyGroupData,
    newPartyDialog,
    dispatchCloseNewPartyDialog,
    AllUserData,
    dispatchCreateNewPartyAction,
    allTags,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    partyGroupId: '',
    partyHead: null,
    assistantPartyHead: null,
    name: '',
    description: '',
    tagId: '',
  });

  useEffect(() => {
    setValues({ ...newPartyDialog.data });
  }, [newPartyDialog.data]);

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const handleSubmit = values => {
    newPartyDialog.type === 'new' ? 
    dispatchCreateNewPartyAction(values) : updatePartyAction(values);
    setValues('');
  }

  const handlePartyHeadChange = (event, value) => {
    setValues({
      ...values,
      partyHead: { id: value.id },
    });
  };

  const handlePartyAssHeadChange = (event, value) => {
    setValues({
      ...values,
      assistantPartyHead: { id: value.id },
    });
  };

  const handleTagChange = (event, value) => {
    if (newPartyDialog.type === 'new') {
      setValues({ ...values, tagId: value.id });
    }
    if (newPartyDialog.type === 'edit') {
      setValues({ ...values, tag: { id: value.id } });
    }
  };

  const canBeSubmitted = () => {
    const { partyHead, assistantPartyHead, name, description } = values;
    return (
      // partyHead !== '' &&
      // assistantPartyHead !== '' &&
      name !== '' && description !== ''
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {newPartyDialog.type === 'new' ? 'New Party' : 'Edit Party'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
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

            <Autocomplete
              id="combo-partyHead"
              options={AllUserData}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              onChange={(evt, ve) => handlePartyHeadChange(evt, ve)}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Search Employee"
                  variant="outlined"
                  placeholder="Search Employee"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              id="combo-ass-partyHead"
              options={AllUserData}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              onChange={(evt, ve) => handlePartyAssHeadChange(evt, ve)}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Search Employee"
                  variant="outlined"
                  placeholder="Search Employee"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              id="combo-tag"
              options={allTags}
              getOptionLabel={option => `${option.name}`}
              onChange={(evt, ve) => handleTagChange(evt, ve)}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Select Tag"
                  variant="outlined"
                  placeholder="Select Tag"
                  fullWidth
                />
              )}
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
            {newPartyDialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            onClick={() => dispatchCloseNewPartyDialog()}
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

PartyDialog.propTypes = {
  updatePartyAction: PropTypes.func,
  dispatchCloseNewPartyDialog: PropTypes.func,
  newPartyDialog: PropTypes.object,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  AllUserData: PropTypes.array,
  dispatchCreateNewPartyAction: PropTypes.func,
  loading: PropTypes.bool,
  selectedPartyGroupData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  allTags: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newPartyDialog: Selectors.makeSelectNewPartyDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
  allTags: Selectors.makeSelectGetAllTags(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseNewPartyDialog: () => dispatch(Actions.closeNewPartyDialog()),
    dispatchCreateNewPartyAction: evt => dispatch(Actions.createNewParty(evt)),
    updatePartyAction: evt => dispatch(Actions.updateParty(evt)),
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
