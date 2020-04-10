import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Backdrop, Button, Box, CircularProgress, Card, CardContent, CardActionArea, CardMedia, Grid, Menu, MenuItem, List, ListItem, ListSubheader, ListItemText, ListItemIcon, Collapse, Icon, IconButton, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Tooltip, Paper } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Description from '@material-ui/icons/Description'
import {AddFile} from './../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from './../../App/selectors';
import FileUploadDialog from './components/FileUploadDialog'
import ShareFileDialog from './components/ShareFileDialog'
import AddFileDialog from './components/AddFileDialog'
import AddFolderDialog from './components/AddFolderDialog'
import FilePreviewDialog from './components/FilePreviewDialog'
import AddSignature from './components/AddSignature'
import DocWidget from './components/DocWidget'
import NoFilesList from './components/NoFilesList'
import moment from 'moment' 
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';  
import FolderOpen from '@material-ui/icons/FolderOpen';  
import CropOriginal from '@material-ui/icons/CropOriginal';  
import Delete from '@material-ui/icons/Delete';  
import Share from '@material-ui/icons/Share';  
import CloudDownload from '@material-ui/icons/CloudDownload';  
import Visibility from '@material-ui/icons/Visibility';  
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';  
import StarOutlined from '@material-ui/icons/StarOutlined';
import FolderSideBar from './FolderSideBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  }, 
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    }
  },
  button: {
    '&.favorite': { color: orange[300]},
    '&.shared': { color: orange[500]},
  },
  iconButton: {
    '&.favorite': { color: orange[300]},
    '&.shared': { color: orange[500]},
    '&.delete': { color: theme.status.danger},
  },
  icon: {
    '&.favorite': { color: orange[300]},
    '&.shared': { color: orange[500]},
    '&.delete': { color: theme.status.danger},
  },
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const FilesList = props => {
  const classes = useStyles();
  const { loading, match, folders, nestedFolders, folder, files, file, user, getAllFoldersAndDocs, getNestedFoldersAndDocs, getFolderById, getUtilityFile, deleteDocument, favoriteDocument, getFavoriteDocuments, getSharedDocuments, openNewFolderDialog, openFileUploadDialog, openFilePreviewDialog, openShareFileDialog } = props
  const [prevIds, setPrevIds] = React.useState([]);
  const {params} = match

  const [isOpen, setOpen] = React.useState(true);

  React.useEffect(() => {
    getAllFolders(params.folderId)
  }, [])

  console.log(folders, "folders nexted")
  console.log(nestedFolders, "nestedfolders nexted")
  console.log(folder, "folder nexted")
  console.log(prevIds, "prevIds")

  const handleCollapseClick = () => {
    setOpen(!isOpen);
  };

  const downloadFile = (fileId) => {
    const doc = files && files.find(file => file.id == fileId)
    let a = document.createElement('a');
    a.href = doc.fileUrl;
    a.download = doc.name;
    a.click();
  }

  const handleView = (event, id) => {
    event.stopPropagation()
    openFilePreviewDialog(id)
  }

  const handleShare = (event, id) => {
    event.stopPropagation()
    openShareFileDialog(id)
  }

  const handleDownload = (event, id) => {
    event.stopPropagation()
    downloadFile(id)
  }

  const handleDelete = (id) => {
    const fd = nestedFolders && nestedFolders.find(f => f.id == id) // to retrieve fd.parentFolderId
    const file = []
    const payload = Object.assign({}, {id, type: fd.type})
    file.push(payload)
    const model = Object.assign({}, {folderId: params.folderId, data: {parentId: 1, file}})
    deleteDocument(model)
  }

  const handleFavorite = (event, id) => {
    event.stopPropagation()
    favoriteDocument(id)
  }

  const handleBack = () => {
    if(prevIds.length > 1){
      getNestedFoldersAndDocs({folderId: prevIds[prevIds.length - 2], type: 'FOLDER'})
      prevIds.splice(prevIds.length - 1, 1)
    }else{
      props.history.push('/dashboard/folders')
      prevIds.splice(prevIds.length - 1, 1)
    }
  }

  const getAllFolders = folderId => {
    const selectedfolder = folders && folders.find(f => f.id == folderId)
    getNestedFoldersAndDocs({folderId, type: 'FOLDER'})
    setPrevIds([...prevIds, folderId])
    console.log(selectedfolder, "selectedfolder")
    getFolderById(selectedfolder)
  }

  const handleRowClick = folderId => {
    const selectedDoc = nestedFolders && nestedFolders.find(folder => folder.id === folderId)
    !prevIds.includes(folderId)? setPrevIds([...prevIds, folderId]) : prevIds.splice(prevIds.length - 1, 1)
    
    selectedDoc.type == 'File'? getUtilityFile(folderId) : (
      getNestedFoldersAndDocs({folderId, type: 'FOLDER'}),
      props.history.push('/dashboard/folder/' + folderId)
    )
    getFolderById(selectedDoc)
  }

  console.log(folders, "Folders")
  console.log(nestedFolders, "nestedFolders")
  console.log(folder, "Folder single")

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
      name: 'type',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: type => {
          return  (
            <Typography variant="inherit" color="textSecondary">
              {type == 'File'?<CropOriginal />:<FolderOpen />}
            </Typography>
          )
        }
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: name => {
          if(!name) return ''
          return  (
            <Typography variant="inherit" color="textSecondary">
              {name}
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
            <IconButton onClick={event => handleFavorite(event, id)} className={classes.iconButton} aria-label="favorite" color="inherit" size="small">
              <Icon color="inherit" className={classNames(classes.icon, {'favorite': true})}>star_outlined</Icon>
            </IconButton>
          )
        }
      },
    },
    {
      name: 'dateCreated',
      label: 'Last Modified',
      options: {
        filter: true,
        sort: true,
        customBodyRender: dateCreated => {
          return (
            moment(dateCreated).format('lll')
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
            <IconButton onClick={(event) => handleShare(event, id)} className={classNames(classes.iconButton)} aria-label="share" color="inherit" size="small">
              <Icon color="primary">share</Icon>
            </IconButton>
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
            <IconButton onClick={(event) => handleView(event, id)} className={classNames(classes.iconButton)} aria-label="view" color="inherit" size="small">
              <Icon color="primary">visibility</Icon>
            </IconButton>
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
            <IconButton onClick={(event) => handleDownload(event, id)} className={classNames(classes.iconButton)} aria-label="download" color="inherit" size="small">
              <Icon color="primary">cloud_download</Icon>
            </IconButton>
          )
        }
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'multiple',
    print: false,
    pagination: false,
    download: true,
    viewColumns: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "Sorry, no matching documents found",
        toolTip: "Sort",
      },
      selectedRows: {
        text: "document(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Documents",
      },
    },
    customToolbar: () => <AddFile openFileDialog={openFileUploadDialog} openFolderDialog={openNewFolderDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => handleRowClick(rowData[0]),
    onRowsDelete: (rowsDeleted) => {
      console.log(rowsDeleted, "rowsDeleted")
      console.log(nestedFolders, "nestedFolders")
      rowsDeleted.data.map(obj => {
        console.log(nestedFolders[obj.index], "data.index")
        handleDelete(nestedFolders[obj.index].id)
      });
    },
    elevation: 0
  };
  
  return (
    <div className={classes.root}>
      <Grid container justify='space-between'>
        <Grid item xs={2} md={2}>
          <FolderSideBar />
        </Grid>
        <Grid item xs={10} md={7}>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {
            nestedFolders && nestedFolders.length === 0?
              <NoFilesList /> 
            :
            <MUIDataTable
              className={classes.datatable}
              title={
                <div style={{display: "flex", alignItems: "center"}}>
                  {prevIds.length > 0 &&
                    <Tooltip title="Back">
                      <IconButton
                        onClick={handleBack}
                      >
                        <ArrowBackIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  }
                  <Typography variant="h6" color="textSecondary">
                    {folder && Object.keys(folder).length > 0 && folder.type == 'Folder'? folder.name : "Document"}
                  </Typography>
                </div>
              }
              data={nestedFolders}
              columns={columns}
              options={options}
            />
          }
        </Grid>
        <Grid item md={3}>
          <Box p={2}>
          <Typography variant="subtitle2" color="textSecondary">Document Details</Typography>
          {file && Object.keys(file).length > 0 &&
          <div>
          <Card className={classes.cardRoot} elevation={0}>
            <CardMedia
              className={classes.media}
              image={file.fileUrl}
              title={file.name}
            />
          </Card>

          <TableContainer component="div">
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableBody>
                <TableRow key={file.docName}>
                  <TableCell component="th" scope="row">
                    Document Name
                  </TableCell>
                  <TableCell align="right">{file.docName}</TableCell>
                </TableRow>
                <TableRow key={file.format}>
                  <TableCell component="th" scope="row">
                    Format
                  </TableCell>
                  <TableCell align="right">{file.format}</TableCell>
                </TableRow>
                <TableRow key={file.size}>
                  <TableCell component="th" scope="row">
                    Size
                  </TableCell>
                  <TableCell align="right">{file.size}</TableCell>
                </TableRow>
                <TableRow key={file.createdBy}>
                  <TableCell component="th" scope="row">
                    Owner
                  </TableCell>
                  <TableCell align="right">{file.createdBy}</TableCell>
                </TableRow>
                <TableRow key={file.modifiedBy}>
                  <TableCell component="th" scope="row">
                    Modified By
                  </TableCell>
                  <TableCell align="right">{file.modifiedBy}</TableCell>
                </TableRow>
                <TableRow key={file.trash}>
                  <TableCell component="th" scope="row">
                    Trashed
                  </TableCell>
                  <TableCell align="right">{file.trash? <DeleteRounded className={classes.icon} /> : 'No'}</TableCell>
                </TableRow>
                <TableRow key={file.dateCreated}>
                  <TableCell component="th" scope="row">
                    Date Created
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="inherit" color="textSecondary">
                      {moment(file.dateCreated).format('lll')}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key="favorite">
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={event => handleFavorite(event, file.id)}  className={classNames(classes.button, {'favorite': false})} color='primary'>Favorite</Button>
                    <IconButton size="small" onClick={(event) => handleShare(event, file.id)} className={classNames(classes.iconButton, classes.icon)} color='secondary'><Icon>share</Icon></IconButton>
                    <IconButton size="small" onClick={(event) => handleDownload(event, file.id)} className={classNames(classes.iconButton, classes.icon)} color='secondary'><Icon>cloud_download</Icon></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(file.id)} className={classNames(classes.iconButton, {'delete': true}, classes.icon)} color='secondary'><Icon>delete</Icon></IconButton>
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
              <Box px={2}>
                <Typography variant="inherit" color="textSecondary">
                  {file.description? file.description : "This file has no description yet"}
                </Typography>
              </Box>
            </Collapse>
          </List>
          
          </div>
          }
          </Box>
        </Grid>
      </Grid>

      <FileUploadDialog />
      <ShareFileDialog />
      <AddFileDialog />
      <AddFolderDialog />
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
  folders: Selectors.makeSelectFolders(),
  nestedFolders: Selectors.makeSelectNestedFolders(),
  folder: Selectors.makeSelectFolder(),
  files: Selectors.makeSelectFiles(),
  file: Selectors.makeSelectFile(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    openShareFileDialog: ev => dispatch(Actions.openShareFileDialog(ev)),
    openNewFolderDialog: () => dispatch(Actions.openNewFolderDialog()),
    getAllFoldersAndDocs: (data) => dispatch(Actions.getAllFoldersAndDocs(data)),
    getNestedFoldersAndDocs: (data) => dispatch(Actions.getNestedFoldersAndDocs(data)),
    getFolderById: (data) => dispatch(Actions.getFolderById(data)),
    getUtilityFiles: () => dispatch(Actions.getUtilityFiles()),
    getUtilityFile: id => dispatch(Actions.getUtilityFile(id)),
    getFavoriteDocuments: (uuid) => dispatch(Actions.getFavoriteDocuments(uuid)),
    getSharedDocuments: (uuid) => dispatch(Actions.getSharedDocuments(uuid)),
    deleteDocument: docId => dispatch(Actions.deleteDocument(docId)),
    shareDocument: docId => dispatch(Actions.shareDocument(docId)),
    favoriteDocument: docId => dispatch(Actions.favoriteDocument(docId)),
    openFilePreviewDialog: (data) => dispatch(Actions.openFilePreviewDialog(data)),
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
)(FilesList);

