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
import { Autocomplete } from '@material-ui/lab';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PartiesDialog = props => {
  const {
    allTags,
    updatePartiesAction,
    loading,
    newPartiesDialog,
    dispatchCloseNewPartiesDialog,
    AllUserData,
    dispatchCreateNewPartiesAction,
    params,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    partyId: params.partyId,
    partyHead: null,
    assistantPartyHead: null,
    positions: null,
    parties: null,
    name: '',
    description: '',
    tag: null,
  });

  useEffect(() => {
    setValues({ ...newPartiesDialog.data });
  }, [newPartiesDialog.data]);

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
      partyId: params.partyId,
    });
  };

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
      partyId: params.partyId,
    });
  };

  const canBeSubmitted = () => {
    const { partyHead, assistantPartyHead, name, description } = values;
    return (
      // partyHead !== '' &&
      // assistantPartyHead !== '' &&
      name !== '' && description !== ''
    );
  };

  const handleTagChange = (event, value) => {
    if (newPartiesDialog.type === 'edit') {
      setValues({ ...values, tag: { id: value.id }, partyId: params.partyId });
    }
    if (newPartiesDialog.type === 'new') {
      setValues({ ...values, tagId: value.id, partyId: params.partyId });
    }
  };

  return (
    <div>
      <Dialog
        {...newPartiesDialog.props}
        onClose={dispatchCloseNewPartiesDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {newPartiesDialog.type === 'new' ? 'New Parties' : 'Edit Parties'}
            </Typography>
          </Toolbar>
        </AppBar>

        <Divider />

        <DialogContent>
          <div>
            <TextField
              id="name"
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
              id="combo-ass-partyHead"
              options={AllUserData}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              onChange={(evt, ve) => handlePartyHeadChange(evt, ve)}
              renderInput={param => (
                <TextField
                  {...param}
                  margin="normal"
                  label="Search Head"
                  variant="outlined"
                  placeholder="Search Head"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              id="combo-ass-partyHead-assistant"
              options={AllUserData}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              onChange={(evt, ve) => handlePartyAssHeadChange(evt, ve)}
              renderInput={param => (
                <TextField
                  {...param}
                  margin="normal"
                  label="Search Head Assistant"
                  variant="outlined"
                  placeholder="Search Head Assistant"
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
          {newPartiesDialog.type === 'new' ? (
            <Button
              onClick={() => {
                dispatchCreateNewPartiesAction(values);
                setValues('');
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {newPartiesDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          ) : (
            <Button
              onClick={() => {
                updatePartiesAction(values);
                setValues('');
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {newPartiesDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          )}
          <Button
            onClick={() => dispatchCloseNewPartiesDialog()}
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

PartiesDialog.propTypes = {
  params: PropTypes.object,
  dispatchCloseNewPartiesDialog: PropTypes.func,
  newPartiesDialog: PropTypes.object,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  AllUserData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchCreateNewPartiesAction: PropTypes.func,
  loading: PropTypes.bool,
  updatePartiesAction: PropTypes.func,
  allTags: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newPartiesDialog: Selectors.makeSelectNewPartiesDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
  allTags: Selectors.makeSelectGetAllTags(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseNewPartiesDialog: () =>
      dispatch(Actions.closeNewPartiesDialog()),
    dispatchCreateNewPartiesAction: evt =>
      dispatch(Actions.createNewParties(evt)),
    updatePartiesAction: evt => dispatch(Actions.updateParties(evt)),
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
)(PartiesDialog);
