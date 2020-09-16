import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Button, Checkbox, Chip, Divider, Radio, Card, CardContent, CardActions, FormControl, Icon, IconButton, Grid, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Menu, MenuItem, Paper, Table, TableBody, TableRow, TableCell, TextField, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import PanoramaIcon from '@material-ui/icons/Panorama';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    "& .MuiCardActions-root": {
      justifyContent: 'center',
      paddingBottom: theme.spacing(4)
    },
  },
  divider: { margin: theme.spacing(2, 0) },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  table: {
    "& td": {
      borderBottom: "none"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    "& .MuiChip-root": {
      marginRight: theme.spacing(1)
    }
  },
  ml: { marginLeft: theme.spacing(1) },
  toolbar: {
    justifyContent: "flex-end",
    padding: theme.spacing(1),
  }
}));

const questionTypes = [
  { label: 'Short answer', value: 'SHORTANSWER' },
  { label: 'Multiple choice', value: 'MULTIPLECHOICE' },
  { label: 'True/False', value: 'TRUE/FALSE' },
  { label: 'Numerical answer', value: 'NUMERICALANSWER' },
  { label: 'Matching', value: 'MATCHING' },
  { label: 'Selection Boxes', value: 'SELECTIONBOXES' },
]

const multipleChoices = [
  { label: 'Strongly Disagree', value: 'Strongly Disagree', disabled: true },
  { label: 'Disagree', value: 'Disagree', disabled: true },
  { label: 'Neither agree nor Disagree', value: 'Neither agree nor Disagree', disabled: true },
  { label: 'Agree', value: 'Agree', disabled: true },
  { label: 'Strongly Agree', value: 'Strongly Agree', disabled: true }
]

const selectedBoxes = [
  { label: 'Good', value: 'Good' },
  { label: 'Rare', value: 'Rare' },
  { label: 'Big', value: 'Big' },
  { label: 'Secure', value: 'Secure' },
  { label: 'Obey', value: 'Obey' }
]

const trueAndFalse = [
  { label: 'True', value: 'true' },
  { label: 'False', value: 'false' },
]

const shortAnswer = [
  { label: 'Good', value: 'Good' },
]

const questionInitState = {
  questionType: 'MULTIPLECHOICE',
  question: '',
  choices: [...multipleChoices],
  answers: []
}

const Questions = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [form, setForm] = React.useState({
    questions: [{ ...questionInitState }],
  });

  React.useEffect(() => { }, [])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = i => ({ target }) => {
    const { questions } = form
    questions[i][target.name] = target.value
    setForm({ ...form, questions });
  };

  const handleAnswerChange = i => ({ target }) => {
    const { questions } = form
    console.log(target, "target")
    if (questions[i].answers.includes(target.value)) {
      if (questions[i].questionType === 'SELECTIONBOXES') {
        questions[i].answers = questions[i].answers.filter((answer) => answer !== target.value)
      }
    } else {
      if (questions[i].questionType === 'MULTIPLECHOICE') {
        questions[i].answers = [target.value]
      } else if (questions[i].questionType === 'SELECTIONBOXES') {
        questions[i].answers = [...questions[i].answers, target.value]
      } else if (questions[i].questionType === 'TRUE/FALSE') {
        questions[i].answers = [target.value]
      }
    }
    setForm({ ...form, questions });
  };

  const handleOptionChange = (i, x) => ({ target }) => {
    const { questions } = form
    questions[i].choices[x].value = target.value
    questions[i].choices[x].label = target.value

    setForm({ ...form, questions });
  };

  const addQuestion = name => () => {
    let newQuestion = { ...questionInitState, questionType: name, choices: [...multipleChoices] }
    if (name === 'MULTIPLECHOICE') {
      newQuestion = { ...questionInitState, questionType: name, choices: [...multipleChoices] }
    } else if (name === 'TRUE/FALSE') {
      newQuestion = { ...questionInitState, questionType: name, choices: [...trueAndFalse] }
    } else if (name === 'SELECTIONBOXES') {
      newQuestion = { ...questionInitState, questionType: name, choices: [...selectedBoxes] }
    } else if (name === 'SHORTANSWER') {
      newQuestion = { ...questionInitState, questionType: name, choices: [...shortAnswer] }
    }


    console.log(newQuestion, "newQuestion")
    setForm({ ...form, questions: [...form.questions, newQuestion] });
    handleClose()
  };

  const removeQuestion = index => () => {
    setForm({ ...form, questions: form.questions.filter((question, i) => i !== index) });
  };

  const addOption = i => () => {
    const newOption = { label: 'new option', value: 'new option', disabled: false }
    const { questions } = form
    questions[i].choices = [...questions[i].choices, newOption]
    setForm({ ...form, questions });
    handleClose()
  };

  const removeOption = (i, x) => () => {
    const { questions } = form
    questions[i].choices = questions[i].choices.filter((question, index) => index !== x)
    setForm({ ...form, questions });
  };

  const canSubmitForm = () => {
    const { questions } = form;
    return questions.length > 0;
  };

  const handleSubmit = () => {
  };

  console.log(form, "form questions")

  return (
    <Grid
      container
      justify='center'
    >
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Button size="small" color="primary" variant="contained" disableElevation onClick={() => { }}>Save</Button>
            <Button className={classes.ml} size="small" variant="contained" disableElevation onClick={() => { }}>Preview</Button>
          </Toolbar>
        </Paper>
      </Grid>

      <Grid item xs={7}>
        <Card className={classes.card} square>
          <CardContent>
            <div className={classes.content}>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Icon>add</Icon>
              </IconButton>

              {form.questions.map((row, i) =>
                <Fragment key={i}>
                  <div className={classes.flex}>
                    <Chip label={i + 1} variant="outlined" />

                    <TextField
                      name="question"
                      label="Type your question"
                      id="outlined-question"
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={row.question}
                      onChange={handleChange(i)}
                    />
                    {i !== 0 &&
                      <IconButton edge="end" aria-label="delete" onClick={removeQuestion(i)}>
                        <CloseIcon />
                      </IconButton>
                    }
                  </div>

                  <List dense={true}>
                    {row.choices.map((choice, x) =>
                      <ListItem key={x}>
                        {row.questionType !== 'SHORTANSWER' &&
                          <ListItemAvatar>
                            {row.questionType === 'SELECTIONBOXES'
                              ? <Checkbox name="answers" checked={row.answers.includes(choice.value)} onChange={handleAnswerChange(i)} value={choice.value} />
                              : <Radio name="answers" checked={row.answers.includes(choice.value)} onChange={handleAnswerChange(i)} value={choice.value} />
                            }
                          </ListItemAvatar>
                        }
                        <ListItemText
                          primary={
                            <TextField
                              name="choice"
                              size="small"
                              fullWidth
                              value={choice.label}
                              onChange={handleOptionChange(i, x)}
                              InputProps={{
                                disableUnderline: true,
                                autoComplete: 'off',
                                readOnly: choice.disabled,
                              }}
                            />
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={removeOption(i, x)}>
                            <CloseIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}

                    {row.questionType !== 'TRUE/FALSE' &&
                      <ListItem>
                        <ListItemText
                          primary={
                            <Button edge="end" aria-label="add" onClick={addOption(i)} endIcon={<AddIcon />}>
                              Add new option
                          </Button>
                          }
                        />
                      </ListItem>
                    }
                  </List>
                </Fragment>
              )}

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {questionTypes.map((type, i) =>
                  <MenuItem key={i} onClick={addQuestion(type.value)}>{type.label}</MenuItem>
                )}
              </Menu>

            </div>
          </CardContent>

          <CardActions>
            <Button onClick={() => { }} color="primary" disableElevation>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmitForm()}
              color="primary"
              variant="contained"
              disableElevation
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <div className={classes.content}>
          <Box my={1}>
            <Typography variant="h6" gutterBottom>Short Answers</Typography>
          </Box>

          <div className={classes.flex}>
            <Button disableElevation disabled disableRipple startIcon={<PanoramaIcon />}> Image</Button>
            <Button
              onClick={() => { }}
              color="primary"
              variant="contained"
              disableElevation
            >
              Add
            </Button>
          </div>

          <Divider className={classes.divider} />

          <Box my={1}>
            <Box my={1}>
              <Typography variant="subtitle1" gutterBottom>Correct Answer</Typography>
            </Box>
            <Table size="small" className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>Feedback</TableCell>
                  <TableCell>
                    <TextField
                      name="feedback"
                      label="Feedback"
                      id="outlined-feedback-2"
                      fullWidth
                      margin="dense"
                      size="small"
                      variant="outlined"
                      value={''}
                      onChange={() => { }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Points</TableCell>
                  <TableCell>
                    <TextField
                      name="points"
                      label="Points"
                      id="outlined-points"
                      fullWidth
                      margin="dense"
                      size="small"
                      variant="outlined"
                      value={''}
                      onChange={() => { }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Box my={1}>
            <Box my={1}>
              <Typography variant="subtitle1" gutterBottom>Wrong Answer</Typography>
            </Box>
            <Table size="small" className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>Feedback</TableCell>
                  <TableCell>
                    <TextField
                      name="feedback"
                      label="Feedback"
                      id="outlined-feedback-1"
                      fullWidth
                      margin="dense"
                      size="small"
                      variant="outlined"
                      value={''}
                      onChange={() => { }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Points</TableCell>
                  <TableCell>
                    <TextField
                      name="points"
                      label="Points"
                      id="outlined-points"
                      fullWidth
                      margin="dense"
                      size="small"
                      variant="outlined"
                      value={''}
                      onChange={() => { }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </div>
      </Grid>

    </Grid>
  );
};

Questions.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Questions);
