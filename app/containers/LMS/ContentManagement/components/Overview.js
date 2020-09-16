import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  Button,
  Card, CardContent, CardActions,
  Grid,
  MenuItem,
  TextField,
  Divider,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PaperDropzone from './PaperDropzone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
}));

export const Overview = props => {
  const { form, handleChange, handleSelectChange, handleTabChange } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center">
          <Grid item xs={6}>
            <PaperDropzone />

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
              id="description"
              name="description"
              placeholder="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
              size="small"
              label="Description"
              value={form.description}
              onChange={handleChange}
            />

            <Autocomplete
              id="combo-box-category"
              name="category"
              size="small"
              options={[]}
              getOptionLabel={option => option.name}
              onChange={handleSelectChange('category')}
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
              options={[]}
              getOptionLabel={option => option.name}
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

            <PaperDropzone />
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
