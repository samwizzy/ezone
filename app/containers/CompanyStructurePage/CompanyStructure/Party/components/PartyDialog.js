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
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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

const initialState = {
  partyGroupId: '',
  partyHead: null,
  assistantPartyHead: null,
  name: '',
  description: '',
  tagId: '',
}

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
  const [values, setValues] = React.useState({ ...initialState });

  useEffect(() => {
    newPartyDialog.type === 'new' ?
      setValues({
        ...initialState,
        partyGroupId: newPartyDialog.data && newPartyDialog.data.partyGroupId
      }) :
      setValues({ ...newPartyDialog.data })
  }, [newPartyDialog.data]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = values => {
    newPartyDialog.type === 'new' ?
      dispatchCreateNewPartyAction(values) : updatePartyAction(values);
    setValues('');
  }

  const handleSelectChange = name => (event, value) => {
    setValues({ ...values, [name]: value });
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
      partyHead && assistantPartyHead && name.length > 0 && description.length > 0
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
              name="name"
              size="small"
              label="Name"
              value={values.name}
              variant="outlined"
              onChange={handleChange('name')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="description"
              name="description"
              size="small"
              label="Description"
              value={values.description}
              onChange={handleChange('description')}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows="3"
            />

            <Autocomplete
              id="combo-partyHead"
              size="small"
              options={AllUserData ? AllUserData : []}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              value={values.partyHead ? values.partyHead : null}
              onChange={handleSelectChange('partyHead')}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Party Head"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              id="combo-ass-partyHead"
              size="small"
              options={AllUserData}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              onChange={handleSelectChange('assistantPartyHead')}
              value={values.assistantPartyHead ? values.assistantPartyHead : null}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Assistant Party Head"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              id="combo-tag"
              size="small"
              options={allTags}
              getOptionLabel={option => option.name}
              onChange={(evt, ve) => handleTagChange(evt, ve)}
              value={values.tagId ? _.find(allTags, { id: values.tagId }) : null}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Select Tag"
                  variant="outlined"
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
