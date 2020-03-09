import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Button, Box, Grid, Menu, MenuItem, List, ListItem, ListSubheader, ListItemText, ListItemIcon, Collapse, Icon, IconButton, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import MoreVertRounded from '@material-ui/icons/MoreVertRounded'
import Description from '@material-ui/icons/Description'
import {AddFile} from './../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from './../selectors';
import FileUploadDialog from './components/FileUploadDialog'
import ShareFileDialog from './components/ShareFileDialog'
import AddFileDialog from './components/AddFileDialog'
import FilePreviewDialog from './components/FilePreviewDialog'
import AddSignature from './components/AddSignature'
import DocWidget from './components/DocWidget'
import NoFilesList from './components/NoFilesList'
import moment from 'moment' 
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';  
import Delete from '@material-ui/icons/Delete';  
import Share from '@material-ui/icons/Share';  
import CloudDownload from '@material-ui/icons/CloudDownload';  
import Visibility from '@material-ui/icons/Visibility';  
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';  
import StarOutlined from '@material-ui/icons/StarOutlined';  

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
  },
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 2,
    },
  },
  sideMenu: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
  iconButton: {
    width: 24,
    height: 24,
    padding: 0,
    '&.favorite': { color: orange[300]},
    '&.shared': { color: orange[500]},
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const FilesList = props => {
  const classes = useStyles();
  const { loading, files, file, getUtilityFile, favoriteDocument, getCreatedByUUID, openFileUploadDialog, openFilePreviewDialog, openShareFileDialog, openNewTaskDialog } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isOpen, setOpen] = React.useState(true);

  useEffect(() => {
    const { createdBy } = file.data
    getCreatedByUUID(createdBy)
  }, [file.data])

  const handleCollapseClick = () => {
    setOpen(!isOpen);
  };

  console.log(files, "Files")
  console.log(file, "File single")

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null);
  };

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'docName',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: docName => {
          return  (
            <Typography variant="inherit" color="textSecondary">
              <InsertDriveFile /> &nbsp; {docName}
            </Typography>
          )
        }
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          return  (
            <IconButton onClick={() => favoriteDocument(id)} className={classes.iconButton} aria-label="favorite" color="inherit">
              <StarOutlined className={classNames(classes.iconButton, {'favorite': true})} />
            </IconButton>
          )
        }
      },
    },
    {
      name: 'id',
      label: 'Last Modified',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const selectedFile = files && files.find(file => file.id === id)
          return (
            selectedFile.dateUpdated? 
            moment(selectedFile.dateUpdated).format('lll') : moment(selectedFile.dateCreated).format('lll')
          )
        }
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: id => {
          const options = ['View', 'Download', 'Share', 'Delete']
          
          return (
            <div>
              <IconButton
                className={classes.iconButton}
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
              >
                  <MenuItem key={0} onClick={() => console.log(id)}>
                    <ListItemIcon>
                      <Visibility fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                      View
                    </Typography>
                  </MenuItem>
                  <MenuItem key={1} onClick={() => openFilePreviewDialog(id)}>
                    <ListItemIcon>
                      <CloudDownload fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                      Download
                    </Typography>
                  </MenuItem>
                  <MenuItem key={2} onClick={() => openFilePreviewDialog(id)}>
                    <ListItemIcon>
                      <Share fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                      Share
                    </Typography>
                  </MenuItem>
                  <MenuItem key={3} onClick={() => openFilePreviewDialog(id)}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                      Delete
                    </Typography>
                  </MenuItem>
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
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddFile openFileDialog={openFileUploadDialog} />,
    rowsPerPage: 25,
    rowsPerPageOptions: [25,50,100],
    onRowClick: (rowData, rowState) => {
      getUtilityFile(rowData[0])
    },
    elevation: 0
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
    <div className={classes.root}>
      <Grid container justify='space-evenly' spacing={2}>
        <Grid item xs={2} md={2}>
          <div className={classes.sideMenu}>
            <List 
              component="nav" 
              aria-label="secondary mailbox folders"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Status
                </ListSubheader>
              }
            >
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
        <Grid item xs={10} md={7}>
          <MUIDataTable
            title="Document List"
            data={files}
            columns={columns}
            options={options}
          />
        </Grid>
        <Grid item md={3}>
          <Typography variant="subtitle2" color="textSecondary">Document Details</Typography>
          {file.data && Object.keys(file.data).length > 0 &&
          <div>
          <TableContainer component="div">
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableBody>
                <TableRow key={file.data.docName}>
                  <TableCell component="th" scope="row">
                    Document Name
                  </TableCell>
                  <TableCell align="right">{file.data.docName}</TableCell>
                </TableRow>
                <TableRow key={file.data.description}>
                  <TableCell component="th" scope="row">
                    Description
                  </TableCell>
                  <TableCell align="right">{file.data.description}</TableCell>
                </TableRow>
                <TableRow key={file.data.format}>
                  <TableCell component="th" scope="row">
                    Format
                  </TableCell>
                  <TableCell align="right">{file.data.format}</TableCell>
                </TableRow>
                <TableRow key={file.data.size}>
                  <TableCell component="th" scope="row">
                    Size
                  </TableCell>
                  <TableCell align="right">{file.data.size}</TableCell>
                </TableRow>
                <TableRow key={file.data.createdBy}>
                  <TableCell component="th" scope="row">
                    Owner
                  </TableCell>
                  <TableCell align="right">{file.createdBy.emailAddress}</TableCell>
                </TableRow>
                <TableRow key={file.data.modifiedBy}>
                  <TableCell component="th" scope="row">
                    Modified By
                  </TableCell>
                  <TableCell align="right">{file.data.modifiedBy}</TableCell>
                </TableRow>
                <TableRow key={file.data.trash}>
                  <TableCell component="th" scope="row">
                    Trashed
                  </TableCell>
                  <TableCell align="right">{file.data.trash? <DeleteRounded className={classes.icon} /> : 'No'}</TableCell>
                </TableRow>
                <TableRow key={file.data.dateCreated}>
                  <TableCell component="th" scope="row">
                    Date Created
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="inherit" color="textSecondary">
                      {moment(file.data.dateCreated).format('lll')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <List>
            <ListItem button onClick={handleCollapseClick}>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Description" />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Typography variant="inherit" color="textSecondary">
                {file.data.description? file.data.description : "There is no description yet"}
              </Typography>
            </Collapse>
          </List>
          
          </div>
          }
        </Grid>
      </Grid>

      <FileUploadDialog />
      <ShareFileDialog />
      <AddFileDialog />
      <FilePreviewDialog />

    </div>
  );
};

FilesList.propTypes = {
  loading: PropTypes.bool,
  openFileUploadDialog: PropTypes.func,
  openShareFileDialog: PropTypes.func,
  openFilePreviewDialog: PropTypes.func,
  favoriteDocument: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  files: Selectors.makeSelectFiles(),
  file: Selectors.makeSelectFile(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    openShareFileDialog: ev => dispatch(Actions.openShareFileDialog(ev)),
    openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
    getUtilityFiles: () => dispatch(Actions.getUtilityFiles()),
    getUtilityFile: id => dispatch(Actions.getUtilityFile(id)),
    favoriteDocument: docId => dispatch(Actions.favoriteDocument(docId)),
    getCreatedByUUID: id => dispatch(Actions.getCreatedByUUID(id)),
    openFilePreviewDialog: (data) => dispatch(Actions.openFilePreviewDialog(data)),
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
  )(FilesList));

