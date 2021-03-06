/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Backdrop,
  CircularProgress,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Slide,
  AppBar,
  Toolbar,
  FormLabel,
  Typography,
  FormControl,
  Grid,
} from '@material-ui/core';
import PaperDropzone from './PaperDropzone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Close } from '@material-ui/icons';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:last-child': {
      '& .MuiTableCell-root': {
        verticalAlign: 'text-top',
      },
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CertificateDialog = props => {
  const classes = useStyles();
  const {
    loading,
    dialog,
    closeNewCategoryDialog,
    createCategory,
    params,
  } = props;

  const [form, setForm] = React.useState({
    title: '',
    parentCategory: null,
    id: '',
  });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSelectChange = name => (evt, obj) => {
    setForm({ ...form, [name]: obj });
  };

  const canSubmitForm = () => {
    const { title, parentCategory } = form;
    return title.length > 0 && parentCategory;
  };

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewCategoryDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">New Certificate</Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Assignment Title"
                id="outlined-title"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-parent-category"
                size="small"
                options={[]}
                getOptionLabel={option => option.name}
                getOptionSelected={option =>
                  option.name === form.parentCategory
                }
                value={form.parentCategory}
                onChange={handleSelectChange('parentCategory')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Parent Category"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                id="outlined-description"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth component="fieldset">
                <FormLabel component="legend">Category Thumbnail</FormLabel>
                <PaperDropzone />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewCategoryDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => createCategory(form)}
            disabled={!canSubmitForm()}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CertificateDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewCategoryDialog: PropTypes.func,
  createCategory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectCategoryDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewCategoryDialog: () => dispatch(Actions.closeNewCategoryDialog()),
    createCategory: data => dispatch(Actions.createCategory(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CertificateDialog);
