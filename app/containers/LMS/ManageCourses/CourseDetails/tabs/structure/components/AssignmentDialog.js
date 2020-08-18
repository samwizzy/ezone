/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MUIRichTextEditor from "mui-rte";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html';
import moment from 'moment';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Slide,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import * as Selectors from '../../../../selectors';
import * as Actions from '../../../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  title: '',
  description: '',
  instructions: '',
  dueDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  marks: '',
  editorState: EditorState.createEmpty()
}

const AssignmentDialog = props => {
  const classes = useStyles();
  const { loading, dialog, closeNewAssignmentDialog } = props;

  const [form, setForm] = React.useState({ ...initialState });

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      const { contacts, ...rest } = dialog.data
      setForm({ ...rest, contactIds: contacts });
    }
  }, [dialog]);

  const canSubmitForm = () => {
    const { title, description } = form;
    return title !== '' && description !== '';
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const change = (state) => {
    const rawContent = JSON.stringify(convertToRaw(state.getCurrentContent()))
    const html = stateToHTML(state.getCurrentContent())
    const text = state.getCurrentContent().getPlainText()

    setForm({ ...form, editorState: state })

    if (!state.getCurrentContent().hasText()) {
      console.log("empty")
    }
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleSubmit = () => {
  }

  const save = data => {
    console.log(JSON.parse(data))
  };

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewAssignmentDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {dialog.type === 'new' ? 'New Assignment' : 'Edit Assignment'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Assignment Title"
                id="assignment-title"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                id="assignment-description"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="instructions"
                label="Instructions"
                id="assignment-instructions"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.instructions}
                onChange={handleChange}
                rows={3}
                rowsMax={5}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="assignment-picker-date"
                  label="Date"
                  size="small"
                  format="MM/dd/yyyy"
                  name="date"
                  value={form.date}
                  onChange={handleDateChange('date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="due-time"
                  name="time"
                  label="Time"
                  size="small"
                  value={form.time}
                  onChange={handleDateChange('time')}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<ScheduleIcon />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="marks"
                label="Marks"
                id="assignment-marks"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.marks}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MUIRichTextEditor
                label="Type something here..."
                editorState={form.editorState}
                onSave={save}
                onChange={change}
                inlineToolbar={true}
                controls={["title", "media", "link", "my-style", "clear"]}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAssignmentDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AssignmentDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewAssignmentDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAssignmentDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAssignmentDialog: () => dispatch(Actions.closeNewAssignmentDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignmentDialog);
