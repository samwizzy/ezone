import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import clsx from 'clsx';
import {
  Button,
  Card, CardContent, CardActions,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
}));

export const Pricing = props => {
  const {
    form,
    options,
    handleOptionsChange,
    handleChange,
    handleTabChange,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center">
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={options.free} onChange={handleOptionsChange} name="free" />}
              label="Check if this is a free course"
            />

            {!options.free &&
              <Fragment>
                <TextField
                  name="price"
                  label="Course Price"
                  id='outlined-price'
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.price}
                  onChange={handleChange}
                />

                <FormControlLabel
                  control={<Checkbox checked={options.discount} onChange={handleOptionsChange} name="discount" />}
                  label="Enable course discount"
                />
                {options.discount &&
                  <TextField
                    name="discount"
                    label="Discounted Price"
                    id='outlined-discount'
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.discount}
                    onChange={handleChange}
                  />
                }
              </Fragment>
            }

          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={event => handleTabChange(event, 'what-you-learn')}
          color="primary"
          variant="contained"
          endIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          onClick={event => { }}
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Finish
        </Button>
      </CardActions>
    </Card>
  );
};
