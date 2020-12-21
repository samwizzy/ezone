import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Radio,
  Card,
  CardContent,
  CardActions,
  FormControl,
  Icon,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import PanoramaIcon from '@material-ui/icons/Panorama';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      paddingBottom: theme.spacing(4),
    },
  },
  divider: { margin: theme.spacing(2, 0) },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1),
  },
  table: {
    '& td': {
      borderBottom: 'none',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiChip-root': {
      marginRight: theme.spacing(1),
    },
  },
  list: {
    border: `1px solid ${theme.palette.divider}`,
  },
  ml: { marginLeft: theme.spacing(1) },
  toolbar: {
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
}));

const questionTypes = [
  { label: 'Short answer', value: 'SHORTANSWER' },
  { label: 'Multiple choice', value: 'MULTIPLECHOICE' },
  { label: 'True/False', value: 'TRUE/FALSE' },
  { label: 'Numerical answer', value: 'NUMERICALANSWER' },
  { label: 'Matching', value: 'MATCHING' },
  { label: 'Selection Boxes', value: 'SELECTIONBOXES' },
];

const multipleChoices = [
  { choiceOption: 'Strongly Disagree' },
  { choiceOption: 'Disagree' },
  { choiceOption: 'Neither agree nor Disagree' },
  { choiceOption: 'Agree' },
  { choiceOption: 'Strongly Agree' },
];

const selectedBoxes = [
  { choiceOption: 'Good' },
  { choiceOption: 'Rare' },
  { choiceOption: 'Big' },
  { choiceOption: 'Secure' },
  { choiceOption: 'Obey' },
];

const trueAndFalse = [{ choiceOption: 'True' }, { choiceOption: 'False' }];

const shortAnswer = [{ choiceOption: 'Good' }];

const questionInitState = {
  answer: '',
  question: '',
  questionOptions: [...shortAnswer],
  questionType: 'SHORT_ANSWER',
};

const questionState = {
  description: '',
  duration: '',
  file: {
    file: '',
    fileName: '',
    fileUrl: '',
    oldFile: '',
  },
  id: 0,
  orgId: '',
  questions: [{ ...questionInitState }],
  title: '',
};

const Questions = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [form, setForm] = React.useState({ ...questionState });

  React.useEffect(() => {}, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = i => ({ target }) => {
    const { questions } = form;
    questions[i][target.name] = target.value;
    setForm({ ...form, questions });
  };

  const handleAnswerChange = i => ({ target }) => {
    const { questions } = form;
    if (
      questions[i].answer === target.value ||
      questions[i].answer.split(',').includes(target.value)
    ) {
      if (questions[i].questionType === 'SELECTIONBOXES') {
        let answers = questions[i].answer
          .split(',')
          .filter(ans => ans !== target.value);
        questions[i].answer = [...answers, target.value].join(',');
      } else {
        questions[i].answer = '';
      }
    } else {
      if (questions[i].questionType === 'SELECTIONBOXES') {
        let answers = questions[i].answer.split(',');
        questions[i].answer = [...answers, target.value].join(',');
      } else {
        questions[i].answer = target.value;
      }
    }
    setForm({ ...form, questions });
  };

  const handleAnswerSelectChange = i => (event, answers) => {
    const { questions } = form;
    questions[i].answer = answers.map(ans => ans.choiceOption).join(',');

    setForm({ ...form, questions });
  };

  const handleOptionChange = (i, x) => ({ target }) => {
    const { questions } = form;
    questions[i].questionOptions[x].choiceOption = target.value;

    setForm({ ...form, questions });
  };

  const addQuestion = name => () => {
    let newQuestion = {
      ...questionInitState,
      questionType: name,
      questionOptions: [...multipleChoices],
    };
    if (name === 'MULTIPLECHOICE') {
      newQuestion = {
        ...questionInitState,
        questionType: name,
        questionOptions: [...multipleChoices],
      };
    } else if (name === 'TRUE/FALSE') {
      newQuestion = {
        ...questionInitState,
        questionType: name,
        questionOptions: [...trueAndFalse],
      };
    } else if (name === 'SELECTIONBOXES') {
      newQuestion = {
        ...questionInitState,
        questionType: name,
        questionOptions: [...selectedBoxes],
      };
    } else if (name === 'SHORTANSWER') {
      newQuestion = {
        ...questionInitState,
        questionType: name,
        questionOptions: [...shortAnswer],
      };
    }

    console.log(newQuestion, 'newQuestion');
    setForm({ ...form, questions: [...form.questions, newQuestion] });
    handleClose();
  };

  const removeQuestion = index => () => {
    setForm({
      ...form,
      questions: form.questions.filter((question, i) => i !== index),
    });
  };

  const addOption = i => () => {
    const newOption = { choiceOption: 'new option' };
    const { questions } = form;
    questions[i].questionOptions = [...questions[i].questionOptions, newOption];
    setForm({ ...form, questions });
    handleClose();
  };

  const removeOption = (i, x) => () => {
    const { questions } = form;
    questions[i].questionOptions = questions[i].questionOptions.filter(
      (question, index) => index !== x,
    );
    setForm({ ...form, questions });
  };

  const canSubmitForm = () => {
    const { questions } = form;
    return questions.length > 0;
  };

  const handleSubmit = () => {};

  console.log(form, 'form questions');

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => {}}
            >
              Save
            </Button>
            <Button
              className={classes.ml}
              size="small"
              variant="contained"
              disableElevation
              onClick={() => {}}
            >
              Preview
            </Button>
          </Toolbar>
        </Paper>
      </Grid>

      <Grid item xs={7}>
        <Card className={classes.card} square>
          <CardContent>
            <div className={classes.content}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Icon>add</Icon>
              </IconButton>

              {form.questions.map((row, i) => (
                <Fragment key={i}>
                  <Grid
                    container
                    className={classes.fle}
                    spacing={1}
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Chip label={i + 1} variant="outlined" />
                    </Grid>
                    <Grid item xs>
                      <div className={classes.flex}>
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
                        {i !== 0 && (
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={removeQuestion(i)}
                          >
                            <CloseIcon />
                          </IconButton>
                        )}
                      </div>

                      <List dense={true} className={classes.list}>
                        {row.questionOptions.map((option, x) => (
                          <Fragment key={x}>
                            {row.questionType !== 'SELECTIONBOXES' && (
                              <ListItem>
                                {row.questionType !== 'SHORTANSWER' && (
                                  <ListItemIcon>
                                    {row.questionType === 'SELECTIONBOXES' ? (
                                      <Checkbox
                                        name="answer"
                                        checked={
                                          row.answer === option.choiceOption
                                        }
                                        onChange={handleAnswerChange(i)}
                                        value={option.choiceOption}
                                      />
                                    ) : (
                                      <Radio
                                        name="answer"
                                        checked={
                                          row.answer === option.choiceOption
                                        }
                                        onChange={handleAnswerChange(i)}
                                        value={option.choiceOption}
                                      />
                                    )}
                                  </ListItemIcon>
                                )}

                                <ListItemText
                                  primary={
                                    <TextField
                                      name="option"
                                      size="small"
                                      fullWidth
                                      margin="dense"
                                      value={option.choiceOption}
                                      onChange={handleOptionChange(i, x)}
                                      InputProps={{
                                        disableUnderline: true,
                                        autoComplete: 'off',
                                        readOnly: option.disabled,
                                      }}
                                    />
                                  }
                                />

                                <ListItemSecondaryAction>
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={removeOption(i, x)}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Fragment>
                        ))}

                        {row.questionType === 'SELECTIONBOXES' && (
                          <ListItem>
                            <ListItemText
                              primary={
                                <Autocomplete
                                  multiple
                                  id="multple-choice-field"
                                  size="small"
                                  options={multipleChoices}
                                  getOptionLabel={option => option.choiceOption}
                                  value={
                                    row.answer
                                      ? row.answer
                                          .split(',')
                                          .map(w => ({ choiceOption: w }))
                                      : []
                                  }
                                  onChange={handleAnswerSelectChange(i)}
                                  renderInput={params => (
                                    <TextField
                                      {...params}
                                      label="Options"
                                      variant="outlined"
                                      placeholder="Select Options"
                                      fullWidth
                                    />
                                  )}
                                />
                              }
                            />
                          </ListItem>
                        )}

                        {row.questionType !== 'TRUE/FALSE' && (
                          <ListItem>
                            <ListItemText
                              primary={
                                <Button
                                  edge="end"
                                  aria-label="add"
                                  onClick={addOption(i)}
                                  endIcon={<AddIcon />}
                                >
                                  Add new option
                                </Button>
                              }
                            />
                          </ListItem>
                        )}
                      </List>
                    </Grid>
                  </Grid>
                </Fragment>
              ))}

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {questionTypes.map((type, i) => (
                  <MenuItem key={i} onClick={addQuestion(type.value)}>
                    {type.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </CardContent>

          <CardActions>
            <Button onClick={() => {}} color="primary" disableElevation>
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
            <Typography variant="h6" gutterBottom>
              Short Answers
            </Typography>
          </Box>

          <div className={classes.flex}>
            <Button
              disableElevation
              disabled
              disableRipple
              startIcon={<PanoramaIcon />}
            >
              {' '}
              Image
            </Button>
            <Button
              onClick={() => {}}
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
              <Typography variant="subtitle1" gutterBottom>
                Correct Answer
              </Typography>
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
                      onChange={() => {}}
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
                      onChange={() => {}}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Box my={1}>
            <Box my={1}>
              <Typography variant="subtitle1" gutterBottom>
                Wrong Answer
              </Typography>
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
                      onChange={() => {}}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Points</TableCell>
                  <TableCell>
                    <TextField
                      name="points"
                      label="Points"
                      id="outlined-points2"
                      fullWidth
                      margin="dense"
                      size="small"
                      variant="outlined"
                      value={''}
                      onChange={() => {}}
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
