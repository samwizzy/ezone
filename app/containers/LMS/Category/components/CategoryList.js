/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  makeStyles,
  Button,
  Icon,
  IconButton,
  Card, CardActionArea, CardHeader, CardMedia, CardContent,
  Grid,
  ListItemText, ListItemIcon,
  Menu, MenuItem,
  Paper,
  Table, TableBody, TableRow, TableCell,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import CategoryImage from '../../../../images/categoryImage.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
    marginBottom: theme.spacing(1),
    boxShadow: theme.shadows[1]
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  card: {
    borderRadius: 0,
    "& .MuiCardContent-root": {
      padding: theme.spacing(0)
    },
    "& .MuiCardMedia-root": {
      width: '100%',
      height: 180,
      backgroundSize: "contain"
    }
  },
  toolbar: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const list = [
  { title: 'Mobile app design' },
  { title: 'Prototyping' },
  { title: 'Wireframing' },
  { title: 'Wireframing' },
]

const CategoryList = props => {
  const classes = useStyles();
  const { loading, openNewCategoryDialog, openEditCategoryDialog, deleteCategory, categories } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [form, setForm] = React.useState({ search: '' })

  const handleClick = category => (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleEditCourse = () => {
    openEditCategoryDialog(selectedCategory)
    handleClose()
  }

  const handleDeleteCourse = () => {
    deleteCategory(selectedCategory.id)
    handleClose()
  }

  console.log(categories, "categories")

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar variant="dense"><Typography variant="h6">Course category</Typography></Toolbar>
      </AppBar>
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <TextField
            name="search"
            label="Search"
            id="outlined-search"
            variant="outlined"
            margin="normal"
            style={{ width: 300, margin: 4 }}
            size="small"
            value={form.search}
            onChange={handleChange}
          />
          <Button size="small" variant="contained" color="primary" onClick={openNewCategoryDialog} disableElevation>
            Add Category
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        {categories && categories.map((row, i) =>
          <Grid key={i} item xs={4}>
            <Card className={classes.card}>
              <CardActionArea component="fieldset">
                <CardMedia
                  image={row.imageUrl ? row.imageUrl : CategoryImage}
                  title={row.name}
                />

                <CardHeader
                  title={row.name}
                  subheader="5 sub categories"
                  action={
                    <IconButton aria-label="settings" onClick={handleClick(row)}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />

                <CardContent>
                  <Table>
                    <TableBody>
                      {list.map((cell, i) =>
                        <TableRow key={i}>
                          <TableCell>
                            <Typography variant="body1">{cell.title}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditCourse}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleDeleteCourse}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

CategoryList.propTypes = {
  loading: PropTypes.bool,
  deleteCategory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  categories: Selectors.makeSelectCourseCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewCategoryDialog: () => dispatch(Actions.openNewCategoryDialog()),
    openEditCategoryDialog: (data) => dispatch(Actions.openEditCategoryDialog(data)),
    deleteCategory: (id) => dispatch(Actions.deleteCategory(id))
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
)(CategoryList);
