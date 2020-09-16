import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Avatar, Box, Button, Card, CardHeader, CardContent, CardActions, Divider, IconButton, FormControl, FormControlLabel, FormLabel, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Menu, MenuItem, Grid, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MUIRichTextEditor from "mui-rte";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html';
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PaperDropzone from './PaperDropzone'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    boxShadow: theme.shadows[1],
    borderRadius: 0,
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  ml: { marginLeft: theme.spacing(1) },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3)
  },
  title: { flexGrow: 1 },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  }
}));

const content = { title: '' };

const AddStudent = props => {
  const classes = useStyles();
  const { loading, history, createStudent } = props;
  const [form, setForm] = React.useState({
    about: "",
    address: "",
    dob: moment().format("YYYY-MM-DDTHH:mm:ss"),
    phoneNumber: "",
    studentImage: null,
    email: '',
    firstName: '',
    lastName: '',
    password: '',

    // editorState: EditorState.createEmpty(),
    // rawContent: '',
    // html: '',
    // text: '',
    // socials: []
  });

  React.useEffect(() => { }, [])

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format("YYYY-MM-DDTHH:mm:ss") });
  };

  const addSocial = event => {
    setForm({ ...form, socials: [...form.socials, content] });
  };
  const removeSocial = index => event => {
    setForm({ ...form, socials: form.socials.filter((social, i) => index !== i) });
  };

  const HtmlToRaw = (html) => {
    const contentHTML = convertFromHTML(html)
    const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
    const content = JSON.stringify(convertToRaw(state))
    return content
  }

  const change = (state) => {
    const rawContent = JSON.stringify(convertToRaw(state.getCurrentContent()))
    const html = stateToHTML(state.getCurrentContent())
    const text = state.getCurrentContent().getPlainText()

    setForm({ ...form, about: html })

    if (!state.getCurrentContent().hasText()) {
      console.log("empty")
    }
  }

  const canSubmitForm = () => {
    const { firstName, lastName } = form;
    return firstName.length > 0 && lastName.length > 0;
  };

  const handleImageUpload = image => {
    console.log(image, "image")
    setForm({ ...form, studentImage: image });
  };

  const focus = () => {
    console.log('Focus on MUIRichTextEditor');
  }

  const blur = () => {
    console.log('Blur, focus lost on MUIRichTextEditor');
  }

  const save = data => {
    console.log(JSON.parse(data))
  };

  const handleSubmit = () => {
    createStudent(form)
  };

  console.log(form, "form")

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper} square elevation={1}>
          <Toolbar variant="dense">
            <Typography className={classes.title} variant="h6">New Student</Typography>
          </Toolbar>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={7}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.content}>
                  <FormControl margin="normal" fullWidth>
                    <PaperDropzone handleImageUpload={handleImageUpload} />
                  </FormControl>

                  <TextField
                    name="firstName"
                    label="Firstname"
                    id="outlined-firstname"
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={form.firstName}
                    onChange={handleChange}
                  />

                  <TextField
                    name="lastName"
                    label="Lastname"
                    id="outlined-lastname"
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={form.lastName}
                    onChange={handleChange}
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableFuture
                      variant="inline"
                      inputVariant="outlined"
                      margin="normal"
                      label="Date of Birth"
                      size="small"
                      format="dd/MM/yyyy"
                      value={form.dob}
                      InputAdornmentProps={{ position: 'end' }}
                      onChange={handleDateChange('dob')}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>

                  <TextField
                    name="phoneNumber"
                    label="Phone Number"
                    id="outlined-phone-number"
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />

                  <TextField
                    name="address"
                    label="Address"
                    id="outlined-address"
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={form.address}
                    onChange={handleChange}
                  />

                  <Box mb={4} mt={1}>
                    <FormControl variant="outlined" fullWidth margin="normal" component="fieldset">
                      <FormLabel component="legend">Biography</FormLabel>
                      <MUIRichTextEditor
                        label="Type something here..."
                        editorState={form.editorState}
                        onSave={save}
                        onChange={change}
                        onFocus={focus}
                        onBlur={blur}
                        inlineToolbar={true}
                        controls={["title", "media", "link", "bulletList", "my-style", "clear"]}
                      />
                    </FormControl>
                  </Box>

                  <Divider />

                  <FormControl variant="outlined" component="fieldset" margin="normal" fullWidth>
                    <FormLabel component="legend">Login Credentials</FormLabel>

                    <TextField
                      name="email"
                      label="Email"
                      id="outlined-email"
                      fullWidth
                      margin="normal"
                      size="small"
                      variant="outlined"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <TextField
                      name="password"
                      label="Password"
                      id="outlined-password"
                      fullWidth
                      margin="normal"
                      size="small"
                      variant="outlined"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl variant="outlined" component="fieldset" margin="normal" fullWidth>
                    <FormLabel component="legend">Social Information</FormLabel>

                    <Button onClick={addSocial} color="primary" startIcon={<AddIcon />}>Add Social</Button>

                    {[].map((social, i) =>
                      <Toolbar key={i} className={classes.toolbar}>
                        <TextField
                          name="socials"
                          label="Socials"
                          id={`outlined-social-${i}`}
                          fullWidth
                          size="small"
                          variant="outlined"
                          value={social.title}
                          onChange={handleChange}
                        />
                        <IconButton onClick={addSocial}><AddIcon /></IconButton>
                        <IconButton onClick={removeSocial(i)}><CloseIcon /></IconButton>
                      </Toolbar>
                    )}
                  </FormControl>
                </div>
              </CardContent>
              <CardActions>
                <Button onClick={() => { }} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmitForm()}
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AddStudent.propTypes = {
  loading: PropTypes.bool,
  createStudent: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    createStudent: data => dispatch(Actions.createStudent(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AddStudent);
