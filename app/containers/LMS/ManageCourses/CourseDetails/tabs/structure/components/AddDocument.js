import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, IconButton, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Menu, MenuItem, Grid, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MUIRichTextEditor from "mui-rte";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html';
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../../actions';
import * as Selectors from '../../../../selectors';
import * as AppSelectors from '../../../../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  list: {
    "& .MuiListItemAvatar-root": {
      minWidth: "30px !important"
    },
  },
  ml: { marginLeft: theme.spacing(1) },
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  title: { flexGrow: 1 },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
}));

const content = { editorState: EditorState.createEmpty() };

const AddDocument = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [form, setForm] = React.useState({
    title: '',
    editorState: EditorState.createEmpty(),
    rawContent: '',
    html: '',
    text: '',
  });

  React.useEffect(() => { }, [])

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
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

    setForm({ ...form, rawContent, html, text })

    if (!state.getCurrentContent().hasText()) {
      console.log("empty")
    }
  }

  const focus = () => {
    console.log('Focus on MUIRichTextEditor');
  }

  const blur = () => {
    console.log('Blur, focus lost on MUIRichTextEditor');
  }

  const save = data => {
    console.log(JSON.parse(data))
  };

  console.log(form, "form")

  return (
    <Grid
      container
      justify='space-between'
    >
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Toolbar variant="dense">
            <IconButton onClick={() => { }}><ArrowBackIcon /></IconButton>
            <Typography className={classes.title}>Beginner’s guide to Statistics</Typography>
            <Button size="small" color="primary" variant="contained" disableElevation onClick={() => { }}>Save</Button>
            <Button className={classes.ml} size="small" variant="contained" disableElevation onClick={() => { }}>Preview</Button>
          </Toolbar>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2}>
            <List
              dense={true}
              subheader={
                <ListSubheader>Chapters</ListSubheader>
              }
            >
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">Introduction</Typography>}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">Chapter 1</Typography>}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">Chapter 2</Typography>}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={10}>
            <Grid container justify="center">
              <Grid item xs={6}>
                <div className={classes.content}>
                  <TextField
                    name="title"
                    label="Add title"
                    id="outlined-title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={''}
                    onChange={handleChange}
                  />

                  <Toolbar variant="dense" className={classes.toolbar}>
                    <IconButton className={classes.iconButton} onClick={addMore}><AddIcon /></IconButton>
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
                  </Toolbar>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AddDocument.propTypes = {
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
)(AddDocument);
