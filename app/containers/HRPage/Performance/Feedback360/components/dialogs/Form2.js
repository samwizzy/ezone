import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Avatar, Box, Button, Checkbox, Divider, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Popover, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  dialog: {
    width: 400
  }
}));

const Ruler = withStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0)
  }
}))(Divider)

const questionTypes = [
  { label: 'Text', value: 'TEXT' },
  { label: 'Multiple choice', value: 'MUTIPLE CHOICE' },
  { label: 'Scale', value: 'SCALE' },
  { label: 'Rating', value: 'RATING' },
  { label: 'Selection boxes', value: 'SELECTION BOXES' },
]

function Form2(props) {
  const classes = useStyles();
  const {
    closeNewFeedbackDialog,
    dialog,
    form,
    addMore,
    handleNext,
    handleChange,
    handleQuestionChange,
  } = props;

  const canSubmitForm = () => {
    const { questions } = form
    return questions.length > 0
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add Review Cycle
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers classes={{ root: classes.dialog }}>
        <Grid container>
          {form.questions && form.questions.map((question, i) =>
            <Fragment key={i}>
              <Grid item xs={12}>
                <TextField
                  id="question-type"
                  name="questionType"
                  placeholder="Select Question type"
                  select
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Question type"
                  value={question.questionType}
                  onChange={handleQuestionChange(i)}
                >
                  {questionTypes.map((type, i) =>
                    <MenuItem key={i} value={type.value}>
                      {type.label}
                    </MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="questionaire"
                  name="question"
                  placeholder="Questionaire"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={1}
                  rowsMax={2}
                  size="small"
                  label="Questionaire"
                  value={question.question}
                  onChange={handleQuestionChange(i)}
                />
              </Grid>
              <Grid item xs={12}><Ruler /></Grid>
            </Fragment>
          )}
          <Grid item xs={12}>
            <Button size="small" color="primary" onClick={addMore}>Add more</Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewFeedbackDialog} color="primary">
          Cancel
          </Button>
        <Button onClick={handleNext} disabled={!canSubmitForm()} color="primary">
          Next
        </Button>
      </DialogActions>
    </div>
  );
}


Form2.propTypes = {
  closeNewFeedbackDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectFeedbackDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartments(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewFeedbackDialog: () => dispatch(Actions.closeNewFeedbackDialog()),
    createRecognition: (data) => dispatch(Actions.createRecognition(data)),
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
