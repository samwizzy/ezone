import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Button, Box, Card, CardContent, CardActionArea, CardMedia, Grid, Menu, MenuItem, List, ListItem, ListSubheader, ListItemText, ListItemIcon, Collapse, Icon, IconButton, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
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
import * as AppSelectors from './../../App/selectors';
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
    // '& .MuiTableRow-root:hover': {
    //   cursor: 'pointer'
    // }
  },
  sideMenu: {
    width: '100%',
    position: 'relative',
    overflowY: 'auto',
    maxHeight: 300,
    '& .MuiListItem-root:hover': {
      color: theme.palette.primary.main,
      '& .MuiListItemIcon-root:hover': {
        color: theme.palette.primary.main,
      }
    }
  },
  button: {
    '&.favorite': { color: orange[300]},
    '&.shared': { color: orange[500]},
  },
  iconButton: {
    width: 24,
    height: 24,
    padding: 0,
    '&.favorite': { color: orange[300]},
    '&.shared': { color: orange[500]},
    '&.delete': { color: theme.status.danger},
  },
  icon: {
    margin: theme.spacing(0, 1),
  },
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
}));

const FilesList = props => {
  const classes = useStyles();
  const { loading, files, file, user, getUtilityFile, deleteDocument, favoriteDocument, getFavoriteDocuments, getSharedDocuments, openFileUploadDialog, openFilePreviewDialog, openShareFileDialog } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fileId, setFileId] = React.useState(null);
  const [form, setForm] = React.useState({
    file: [
      {
        id: 0,
        type: "document"
      }
    ],
    parentId: 0
  });
  const open = Boolean(anchorEl);
  const [isOpen, setOpen] = React.useState(true);

  useEffect(() => {
  }, [file])

  const handleCollapseClick = () => {
    setOpen(!isOpen);
  };

  const downloadFile = (fileId) => {
    const doc = files && files.find(file => file.id == fileId)
    let a = document.createElement('a');
    a.href = doc.fileUrl;
    a.download = doc.docName;
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
  const handleDelete = (event, id) => {
    event.stopPropagation()
    deleteDocument(id)
  }
  const handleFavorite = (event, id) => {
    event.stopPropagation()
    favoriteDocument(id)
  }


  console.log(files, "Files")
  console.log(file, "File single")
  console.log(user, "User single")

  const handleClick = event => {
    event.stopPropagation()
    const data = event.currentTarget
    setFileId(data.dataset.id)
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
          if(!docName) return ''
          return  (
            <Typography variant="inherit" color="textSecondary">
              <InsertDriveFile /> &nbsp; {docName}
            </Typography>
          )
        }
      },
    },
    {
      name: 'documents',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: doc => {
          if(!doc) return ''
          return  (
            <Typography variant="inherit" color="textSecondary">
              <InsertDriveFile /> &nbsp; {doc[0].docName}
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
            <IconButton onClick={event => handleFavorite(event, id)} className={classes.iconButton} aria-label="favorite" color="inherit">
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
        sort: true,
        customBodyRender: id => {
          return  (
            <React.Fragment>
              <IconButton onClick={(event) => handleShare(event, id)} className={classNames(classes.iconButton, classes.icon)} aria-label="share" color="inherit">
                <Icon color="primary">share</Icon>
              </IconButton>
              <IconButton onClick={(event) => handleDelete(event, id)} className={classNames(classes.iconButton, classes.icon)} aria-label="delete" color="inherit">
                <Icon color="primary">delete</Icon>
              </IconButton>
              <IconButton onClick={(event) => handleView(event, id)} className={classNames(classes.iconButton, classes.icon)} aria-label="view" color="inherit">
                <Icon color="primary">pageview</Icon>
              </IconButton>
              <IconButton onClick={(event) => handleDownload(event, id)} className={classNames(classes.iconButton, classes.icon)} aria-label="download" color="inherit">
                <Icon color="primary">cloud_download</Icon>
              </IconButton>
            </React.Fragment>
          )
        }
      },
    },
    // {
    //   name: 'id',
    //   label: ' ',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: id => {
    //       return (
    //         <div>
    //           <IconButton
    //             className={classes.iconButton}
    //             data-id={id}
    //             aria-label="more"
    //             aria-controls="long-menu"
    //             aria-haspopup="true"
    //             onClick={handleClick}
    //           >
    //             <MoreVertRounded />
    //           </IconButton>
    //           <Menu
    //             id="long-menu"
    //             anchorEl={anchorEl}
    //             keepMounted
    //             open={open}
    //             onClose={handleClose}
    //           >
    //               <MenuItem key={0} dense onClick={handleView}>
    //                 <ListItemIcon>
    //                   <Visibility fontSize="small" />
    //                 </ListItemIcon>
    //                 <Typography variant="inherit" noWrap>
    //                   View
    //                 </Typography>
    //               </MenuItem>
    //               <MenuItem key={1} dense onClick={handleDownload}>
    //                 <ListItemIcon>
    //                   <CloudDownload fontSize="small" />
    //                 </ListItemIcon>
    //                 <Typography variant="inherit" noWrap>
    //                   Download
    //                 </Typography>
    //               </MenuItem>
    //               <MenuItem key={2} dense onClick={handleShare}>
    //                 <ListItemIcon>
    //                   <Share fontSize="small" />
    //                 </ListItemIcon>
    //                 <Typography variant="inherit" noWrap>
    //                   Share
    //                 </Typography>
    //               </MenuItem>
    //               <MenuItem key={3} dense onClick={handleDelete}>
    //                 <ListItemIcon>
    //                   <Delete fontSize="small" />
    //                 </ListItemIcon>
    //                 <Typography variant="inherit" noWrap>
    //                   Delete
    //                 </Typography>
    //               </MenuItem>
    //           </Menu>
    //         </div>
    //       )
    //     }
    //   },
    // }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    pagination: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddFile openFileDialog={openFileUploadDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
      getUtilityFile(rowData[0])
    },
    elevation: 0
  };

  if(files && files.length === 0){
    return <NoFilesList /> 
    // return <AddSignature /> 
    // return <DocWidget /> 
  }
  
  return (
    <div className={classes.root}>
      <Grid container justify='space-between'>
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
              <ListItem button onClick={() => getUtilityFiles()}>
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="All" />
              </ListItem>
              <ListItem button onClick={() => getFavoriteDocuments(user.uuId)}>
                <ListItemIcon>
                  <StarOutlined />
                </ListItemIcon>
                <ListItemText primary="Favorite" />
              </ListItem>
              <ListItem button onClick={() => getSharedDocuments(user.uuId)}>
                <ListItemIcon>
                  <Share />
                </ListItemIcon>
                <ListItemText primary="Shared" />
              </ListItem>
              <ListItem button onClick={() => getSharedDocuments(user.uuId)}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={10} md={7}>
          {loading?
            <List component={LoadingIndicator} />
          :
          (
            <MUIDataTable
              className={classes.datatable}
              title="Document List"
              data={files}
              columns={columns}
              options={options}
            />
          )}
        </Grid>
        <Grid item md={3}>
          <Typography variant="subtitle2" color="textSecondary">Document Details</Typography>
          {file && Object.keys(file).length > 0 &&
          <div>
          <Card className={classes.cardRoot} elevation={0}>
            <CardMedia
              className={classes.media}
              image={file.fileUrl}
              title={file.docName}
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
                <TableRow key={file.description}>
                  <TableCell component="th" scope="row">
                    Description
                  </TableCell>
                  <TableCell align="right">{file.description}</TableCell>
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
                    <Button className={classNames(classes.button, {'favorite': false})} color='primary'>Favorite</Button>
                    <IconButton className={classNames(classes.iconButton, classes.icon)} color='secondary'><Icon>share</Icon></IconButton>
                    <IconButton className={classNames(classes.iconButton, classes.icon)} color='secondary'><Icon>cloud_download</Icon></IconButton>
                    <IconButton className={classNames(classes.iconButton, {'delete': true}, classes.icon)} color='secondary'><Icon>delete</Icon></IconButton>
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
                {file.description? file.description : "There is no description yet"}
              </Typography>
              </Box>
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
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    openShareFileDialog: ev => dispatch(Actions.openShareFileDialog(ev)),
    openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
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

export default withRouter(
  compose(
    withConnect,
    memo,
  )(FilesList));

