import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  TextField,
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Gesture from '@material-ui/icons/Gesture';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import PDFIcon from '../../../../images/pdfIcon.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(4, 6),
  },
  card: {
    flexGrow: 1,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& span': {
      fontSize: '20px',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: grey[300],
    margin: theme.spacing(0, 1),
  },
}));

function AddSignature() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [form, setForm] = React.useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = () => {};

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Gesture />
          </Avatar>
        }
        title="Signature"
        className={classes.cardHeader}
      />

      <CardContent>
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <List className={classes.list}>
                <ListItem
                  alignItems="flex-start"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ListItemAvatar>
                    <img
                      alt="Company logo"
                      src={PDFIcon}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="default">
                        Document name.pdf
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Description
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.root}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Add recipients</Typography>
            </Grid>
            <Grid item>
              <Button>
                <Add />
                Add
              </Button>
            </Grid>
          </Grid>

          <Grid container justify="space-between">
            <Grid item xs={6} md={5}>
              <TextField
                label="Enter email address"
                id="outlined-size-small"
                fullWidth
                defaultValue="Small"
                variant="outlined"
                size="small"
                value={form.email}
              />
            </Grid>
            <Grid item xs={6} md={5}>
              <TextField
                label="Enter name"
                id="outlined-size-small"
                fullWidth
                defaultValue="Small"
                variant="outlined"
                size="small"
                value={form.email}
              />
            </Grid>
            <Grid item xs={3} md={1}>
              <Button color="primary">
                <Delete />
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box my={3}>
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            fullWidth
            rows="4"
            rowsMax="4"
            value={form.comment}
            onChange={handleChange}
            defaultValue="Default Value"
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined" onClick={''} color="primary">
          Cancel
        </Button>
        <Button variant="outlined" onClick={''} color="primary">
          Continue
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

AddSignature.propTypes = {
  openEditColorDialog: PropTypes.func,
  openEditCompanyDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditCompanyDialog: evt => dispatch(Actions.openEditCompanyDialog(evt)),
    openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(AddSignature),
);
