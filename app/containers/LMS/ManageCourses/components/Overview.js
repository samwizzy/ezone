import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  Button,
  Card, CardContent, CardActions,
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';
import PaperDropzone from './PaperDropzone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
}));

const levels = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "PROFESSIONAL", label: "Professional" },
]

const Overview = props => {
  const { categories, form, handleChange, handleSelectChange, handleTabChange, handleImageUpload } = props;
  const classes = useStyles();

  console.log(categories, "categories overview")

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center">
          <Grid item xs={6}>
            <PaperDropzone handleImageUpload={handleImageUpload} name="thumbNail" />

            <TextField
              name="title"
              label="Course title"
              id="outlined-title"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.title}
              onChange={handleChange}
            />

            <TextField
              id="short-description"
              name="shortDescription"
              placeholder="Short Description"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
              size="small"
              label="Short Description"
              value={form.shortDescription}
              onChange={handleChange}
            />

            <TextField
              id="full-description"
              name="fullDescription"
              placeholder="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
              size="small"
              label="Description"
              value={form.fullDescription}
              onChange={handleChange}
            />

            <Autocomplete
              id="combo-box-category"
              name="categoryId"
              size="small"
              options={categories ? categories : []}
              getOptionLabel={option => option.name}
              onChange={handleSelectChange('categoryId')}
              value={form.categoryId ? _.find(categories, { id: form.categoryId }) : null}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                  placeholder="Search"
                  margin="normal"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              id="combo-box-level"
              name="level"
              size="small"
              options={levels}
              getOptionLabel={option => option.label}
              onChange={handleSelectChange('level')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Level"
                  variant="outlined"
                  placeholder="Search"
                  margin="normal"
                  fullWidth
                />
              )}
            />

            <PaperDropzone handleImageUpload={handleImageUpload} name="coursePreview" />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={event => handleTabChange(event, 'requirement')}
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};


const mapStateToProps = createStructuredSelector({
  categories: Selectors.makeSelectGetCategories(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Overview);