import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  Grid,
  TextField,
} from '@material-ui/core';
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const types = [
  { label: 'Fixed amount', value: 'Fixed amount' },
  { label: 'Amount', value: 'Amount' },
  { label: 'Percentage', value: 'Percentage' },
]

const Form2 = props => {
  const classes = useStyles(props);
  const { loading, dialog, form, handleChange, handleSelectChange, closeNewStepDialog } = props;

  const canSubmitForm = () => {
    const { name, value, inputType } = form;
    return (
      name.length > 0 &&
      inputType &&
      value.length > 0
    );
  };

  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <TextField
        id="message-from"
        name="from"
        label="From"
        variant="outlined"
        value={form.from}
        onChange={handleChange}
        margin="normal"
        size="small"
        fullWidth
      />

      <Autocomplete
        multiple
        id="message-to"
        size="small"
        options={[]}
        getOptionLabel={option => option.label}
        onChange={handleSelectChange('to')}
        value={form.to}
        renderInput={params => (
          <TextField
            {...params}
            InputLabelProps={{
              shrink: false,
            }}
            label="To"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />

      <TextField
        id="message-cc"
        name="cc"
        label="CC"
        variant="outlined"
        value={form.cc}
        onChange={handleChange}
        margin="normal"
        size="small"
        fullWidth
      />

      <TextField
        id="message-subject"
        name="subject"
        label="Subject"
        variant="outlined"
        value={form.subject}
        onChange={handleChange}
        margin="normal"
        size="small"
        fullWidth
      />

      <TextField
        id="message-message"
        name="message"
        label="Message"
        variant="outlined"
        value={form.message}
        onChange={handleChange}
        margin="normal"
        size="small"
        fullWidth
        multiline
        rows={6}
        rowsMax={7}
      />
    </div>
  );
};

Form2.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewStepDialog: () => dispatch(Actions.closeNewStepDialog()),
    createAllowance: data => dispatch(Actions.createAllowance(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Form2);
