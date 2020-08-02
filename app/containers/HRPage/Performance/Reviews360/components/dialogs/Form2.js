import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Avatar, Box, Button, Icon, IconButton, Checkbox, Divider, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Popover, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Ruler = withStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0)
  }
}))(Divider)

const questionTypes = [
  { label: 'Text', value: 'TEXT' },
  { label: 'Multiple choice', value: 'MULTIPLECHOICE' },
  { label: 'Scale', value: 'SCALE' },
  { label: 'Rating', value: 'RATING' },
  { label: 'Selection boxes', value: 'SELECTIONBOXES' },
]

const optionTypes = ['MULTIPLECHOICE', 'SELECTIONBOXES', 'SCALE']

const marks = [
  { value: 0, label: 'Poor' },
  { value: 100, label: 'Excellent' },
];

function valuetext(value) {
  return `${value}%`;
}

function Form2(props) {
  const classes = useStyles();
  const {
    closeNewReviewDialog,
    dialog,
    form,
    addMore,
    removeQuestion,
    addMoreOption,
    removeOption,
    handleNext,
    handlePrev,
    handleChange,
    handleQuestionChange,
    handleOptionChange,
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

      <DialogContent dividers>
        <Grid container>
          {form.questions && form.questions.map((question, i) =>
            <Fragment key={i}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Question {i + 1}
                </Typography>
                <div className={classes.flex}>
                  <TextField
                    id={`question-type-${i}`}
                    name="questionType"
                    placeholder="Select Question type"
                    select
                    margin="dense"
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
                  {i !== 0 && <IconButton onClick={removeQuestion(i)}><Icon>close</Icon></IconButton>}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id={`questionaire-${i}`}
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
              {optionTypes.includes(question.questionType) &&
                <Grid item xs={12}>
                  {question.options.map((option, x) =>
                    <div key={x} className={classes.flex}>
                      <TextField
                        id={`option-${x}`}
                        name="option"
                        placeholder="Option"
                        variant="outlined"
                        size="small"
                        label={`Option ${x + 1}`}
                        value={option.option}
                        onChange={handleOptionChange(i, x)}
                      />
                      <IconButton onClick={() => { }}><Icon>edit</Icon></IconButton>
                      <IconButton onClick={removeOption(i, x)}><Icon>close</Icon></IconButton>
                    </div>
                  )}
                  <Button color="primary" size="small" onClick={addMoreOption(i)} startIcon={<AddIcon />}>
                    Add more option
                  </Button>
                </Grid>
              }
              <Grid item xs={12}><Ruler /></Grid>
            </Fragment>
          )}
          <Grid item xs={12}>
            <Button size="small" color="primary" onClick={addMore}>Add more</Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewReviewDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button onClick={handleNext} disabled={!canSubmitForm()} color="primary">
          Next
        </Button>
      </DialogActions>
    </div>
  );
}


Form2.propTypes = {
  closeNewReviewDialog: PropTypes.func,
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
    closeNewReviewDialog: () => dispatch(Actions.closeNewReviewDialog()),
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
