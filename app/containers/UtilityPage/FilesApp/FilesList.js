import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Menu, MenuItem, List, ListItem, ListItemText, FormControlLabel, Icon, IconButton, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import MoreVertRounded from '@material-ui/icons/MoreVertRounded'
import tasksIcon from '../../../images/tasksIcon.svg'
import {AddTask, AddFile} from './../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from './../selectors';
import FileUploadDialog from './components/FileUploadDialog'
import ShareFileDialog from './components/ShareFileDialog'
import AddFileDialog from './components/AddFileDialog'
import AddSignature from './components/AddSignature'
import DocWidget from './components/DocWidget'
import NoFilesList from './components/NoFilesList'

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  sideMenu: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  }

}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const FilesList = props => {
  const classes = useStyles();
  const { loading, files, getUtilityFiles, openFileUploadDialog, openShareFileDialog, openNewTaskDialog } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  console.log(files, "Files")

  // React.useEffect(() => {
  //   getUtilityFiles()
  // }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
      },
    },
    {
      name: 'format',
      label: 'Format',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'size',
      label: 'Size',
      options: {
        filter: true,
        sort: false
      },
    },
    {
      name: 'owner',
      label: 'Owner',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'modified_by',
      label: 'Modified By',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date_uploaded',
      label: 'Date Uploaded',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: id => {
          const options = ['View', 'Signature', 'Download', 'Share', 'Add Task', 'Delete']
          return (
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertRounded />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {options.map(option => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={openNewTaskDialog}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )
        }
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => <AddFile openFileDialog={openFileUploadDialog} />
  };

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if(files && files.length === 0){
    return <NoFilesList /> 
    // return <AddSignature /> 
    // return <DocWidget /> 
  }

  return (
    <React.Fragment>
      <Grid container justify='center'>
        <Grid item xs={2} md={2}>
          <div className={classes.sideMenu}>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="All" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Favorite" />
              </ListItem>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Shared" />
              </ListItemLink>
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={10} md={10}>
          <MUIDataTable
            title="Files List"
            data={files}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

      <FileUploadDialog />
      <ShareFileDialog />
      <AddFileDialog />

    </React.Fragment>
  );
};

FilesList.propTypes = {
  loading: PropTypes.bool,
  openFileUploadDialog: PropTypes.func,
  openShareFileDialog: PropTypes.func,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  files: Selectors.makeSelectFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    openShareFileDialog: ev => dispatch(Actions.openShareFileDialog(ev)),
    openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
    getUtilityFiles: ev => dispatch(Actions.getUtilityFiles(ev)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FilesList);
