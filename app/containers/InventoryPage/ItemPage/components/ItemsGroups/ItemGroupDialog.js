/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  CircularProgress,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ItemGroupDialog = props => {
  const {
    loading,
    items,
    dialog,
    closeNewItemGroupDialog,
    createItemGroup,
    updateItemsGroup
  } = props;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data)
      setValues({ ...dialog.data });
  }, [dialog.data]);

  const [values, setValues] = React.useState({
    groupDescription: "",
    groupName: "",
    items: [],
  });

  const canBeSubmitted = () => {
    const { groupName, groupDescription } = values;
    return groupName.length > 0 && groupDescription.length > 0
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createItemGroup(values) : updateItemsGroup(values)
  }

  const handleSelectChange = name => (event, value) => {
    setValues({ ...values, [name]: value });
  };

  console.log(values, "values")
  console.log(dialog, "dialog")

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewItemGroupDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {dialog.type === 'new' ? 'New Item Group' : 'Edit Item Group'}
        </DialogTitle>

        <DialogContent dividers>
          <div>
            <TextField
              id="standard-group-name"
              size="small"
              name="groupName"
              label="Group Name"
              variant="outlined"
              value={values.groupName}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />

            <TextField
              id="standard-group-description"
              size="small"
              name="groupDescription"
              label="Item Group Description"
              variant="outlined"
              value={values.groupDescription}
              onChange={handleChange}
              margin="normal"
              fullWidth
              rows={2}
              multiline
            />

            <Autocomplete
              multiple
              id="combo-items"
              size="small"
              options={items}
              getOptionLabel={option => option.itemName}
              onChange={handleSelectChange('items')}
              value={values.items}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Select Items"
                  variant="outlined"
                  margin="normal"
                  placeholder="Items"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading ? loading : !canBeSubmitted()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? "Save" : "Update"}
          </Button>

          <Button
            onClick={closeNewItemGroupDialog}
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

ItemGroupDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewItemGroupDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectItemGroupDialog(),
  items: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    createItemGroup: data => dispatch(Actions.createItemGroup(data)),
    closeNewItemGroupDialog: () => dispatch(Actions.closeNewItemGroupDialog()),
    updateItemsGroup: data => dispatch(Actions.updateItemsGroup(data)),
    closeEditItemGroupDialog: () => dispatch(Actions.closeEditItemGroupDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ItemGroupDialog);
