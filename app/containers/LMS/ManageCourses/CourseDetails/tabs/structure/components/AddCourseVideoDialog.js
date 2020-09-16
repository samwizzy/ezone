/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import * as Selectors from '../../../../selectors';
import * as Actions from '../../../../actions';
import PaperDropzone from './PaperDropzone'
import VideosDropzone from './VideosDropzone'
import VideoDropzone from './VideoDropzone'

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
  courseId: '',
  title: '',
  description: '',
  duration: '',
  lectureType: 'VIDEO',
  media: '',
}

const AddCourseVideoDialog = props => {
  const classes = useStyles();
  const { loading, dialog, closeNewCourseVideoDialog, addCourseVideo } = props;

  const [form, setForm] = React.useState({ ...initialState });

  useEffect(() => {
    if (dialog.type === 'new' && dialog.data) {
      const { id } = dialog.data
      setForm({ ...form, courseId: id });
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

  const handleImageUpload = (name, image) => {
    const duration = image.size
    setForm({ ...form, [name]: image, duration });
  };

  const handleImageChange = (event) => {
    const duration = event.target.files[0].size
    const selectedFile = event.target.files[0]

    setForm({ ...form, media: selectedFile, duration });
  };

  const handleSubmit = () => {
    const { courseId, title, description, duration, lectureType, media } = form
    const formData = new FormData();

    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("lectureType", lectureType);
    formData.append("media", media);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }
    addCourseVideo(formData)
  }

  console.log(form, "form course video")

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewCourseVideoDialog}
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
              {dialog.type === 'new' ? 'Add Course Video' : 'Add Course Video'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Lecture type</FormLabel>
                <RadioGroup aria-label="lecture-type" name="lectureType" value={form.lectureType} onChange={handleChange} row>
                  <FormControlLabel value="VIDEO" control={<Radio />} label="Video" />
                  <FormControlLabel value="AUDIO" control={<Radio />} label="Audio" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                id="video-outlined-title"
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
                id="video-outlined-description"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.description}
                onChange={handleChange}
                rows={3}
                rowsMax={5}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl} margin="normal">
                <TextField
                  id="outlined-attachments"
                  name="attachments"
                  type="file"
                  label="Attachment"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  onChange={handleImageChange}
                  variant="outlined"
                  multiple
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <VideosDropzone handleImageUpload={handleImageUpload} name="media" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <VideoDropzone />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewCourseVideoDialog} color="primary">
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

AddCourseVideoDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewCourseVideoDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectCourseVideoDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewCourseVideoDialog: () => dispatch(Actions.closeNewCourseVideoDialog()),
    addCourseVideo: (data) => dispatch(Actions.addCourseVideo(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddCourseVideoDialog);
