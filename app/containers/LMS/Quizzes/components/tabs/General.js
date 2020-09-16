import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardContent, CardActions, FormControl, IconButton, Grid, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import PaperDropzone from './PaperDropzone'

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
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
}));

const General = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    course: '',
    duration: '',
    file: ''
  });

  React.useEffect(() => { }, [])

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const canSubmitForm = () => {
    const { title, description, course, duration } = form;
    return title !== '' && description !== '';
  };

  const handleSubmit = () => {
  };

  return (
    <Grid
      container
      justify='center'
    >

      <Grid item xs={10}>
        <Card className={classes.card} square>
          <CardContent>
            <div className={classes.content}>
              <TextField
                name="title"
                label="Add title"
                id="outlined-title"
                fullWidth
                margin="normal"
                size="small"
                variant="outlined"
                value={form.title}
                onChange={handleChange}
              />

              <TextField
                name="description"
                label="Description"
                id="outlined-description"
                fullWidth
                margin="normal"
                size="small"
                variant="outlined"
                rows={3}
                rowsMax={5}
                value={form.description}
                onChange={handleChange}
              />

              <TextField
                name="course"
                label="Course"
                id="outlined-course"
                fullWidth
                margin="normal"
                size="small"
                variant="outlined"
                value={form.course}
                onChange={handleChange}
              />

              <TextField
                name="duration"
                label="Duration"
                id="outlined-duration"
                fullWidth
                margin="normal"
                size="small"
                variant="outlined"
                value={form.duration}
                onChange={handleChange}
              />

              <FormControl margin="normal" fullWidth>
                <PaperDropzone />
              </FormControl>
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

    </Grid>
  );
};

General.propTypes = {
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
)(General);
