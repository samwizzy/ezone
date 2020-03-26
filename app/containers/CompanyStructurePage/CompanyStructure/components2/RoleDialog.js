import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles' 
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Slide
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

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

const RoleDialog = props => {
  const { roleDialog, closeNewRoleDialog } = props;

  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const [values, setValues] = React.useState({
    roleName: '',
    description: ''
  });

  console.log(roleDialog, "Pary dialog...")

  const handleSelectChange = event => {
    setCurrency(event.target.value);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const closeComposeDialog = () => {
    roleDialog.type === 'new'
      ? closeNewRoleDialog()
      : null;
  };

  return (
    <div>
      <Dialog
        {...roleDialog.props}
        TransitionComponent={Transition}
        onClose={closeNewRoleDialog}
        keepMounted
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {roleDialog.type === 'new' ? 'New Role' : 'Edit Role'}
        </DialogTitle>

        <DialogContent>
          {roleDialog.type === 'new' ? (
            <div>
              <TextField
                id="role-name"
                label="Role Name"
                className={classes.textField}
                value={values.roleName}
                onChange={handleChange('roleName')}
                margin="normal"
                variant="outlined"
                size="small"
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
                size="small"
                fullWidth
                multiline
                rows="3"
              />
            </div>
          ) : (
            <div>
              <TextField
                id="role-name"
                label="Role Name"
                className={classes.textField}
                value={values.roleName}
                onChange={handleChange('roleName')}
                margin="normal"
                variant="outlined"
                size="small"
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
                size="small"
                fullWidth
                multiline
                rows="3"
              />
            </div>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button
            onClick={() => {
              closeComposeDialog();
            }}
            color="primary"
            variant="contained"
          >
            {roleDialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            onClick={() => closeNewRoleDialog()}
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

RoleDialog.propTypes = {
  closeNewRoleDialog: PropTypes.func,
  roleDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  roleDialog: Selectors.makeSelectRoleDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewRoleDialog: () => dispatch(Actions.closeNewRoleDialog()),
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
)(RoleDialog);
