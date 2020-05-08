import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import {AppBar, Box, Button, Checkbox, Container, Divider, FormControlLabel, FormControl, IconButton, MenuItem, Table, TableBody, TableRow, TableCell, TextField, Toolbar, Typography, RadioGroup, Radio, Paper } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
  table: {
    display: 'flex',
    "& td": {
      padding: theme.spacing(1, 2),
    },
    "& tr:last-child": {
      "& td": {
        border: "0 !important",
      }
    }
  },
  box: {
    display: 'inline-block',
    backgroundColor: theme.palette.grey[100],
    minWidth: 300
  }
}));

export const BasicInfoForm = props => {
    const {handleChange, handleSubmit, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const { jobDescription, bio } = form
        return jobDescription.length > 0 && bio.length > 0
    }

    return (
      <Paper className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6">Basic Information</Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <Box p={3}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box p={2} className={classes.box}>Name</Box>
                  </TableCell>
                  <TableCell align='right'>
                    <FormControlLabel
                      control={<Checkbox checked={form.bio} onChange={handleChange} name="required" color="primary" />}
                      label="Required"
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
                        <FormControlLabel value="file" control={<Radio color="primary" />} label="File" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell align='right'><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box p={2} className={classes.box}>Email</Box>
                  </TableCell>
                  <TableCell align='right'>
                    <FormControlLabel
                      control={<Checkbox checked={form.bio} onChange={handleChange} name="required" color="primary" />}
                      label="Required"
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
                        <FormControlLabel value="file" control={<Radio color="primary" />} label="File" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell align='right'><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box p={2} className={classes.box}>Upload CV</Box>
                  </TableCell>
                  <TableCell align='right'>
                    <FormControlLabel
                      control={<Checkbox checked={form.bio} onChange={handleChange} name="required" color="primary" />}
                      label="Required"
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
                        <FormControlLabel value="file" control={<Radio color="primary" />} label="File" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell align='right'><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box p={2} className={classes.box}>Cover Letter</Box>
                  </TableCell>
                  <TableCell align='right'>
                    <FormControlLabel
                      control={<Checkbox checked={form.bio} onChange={handleChange} name="required" color="primary" />}
                      label="Required"
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
                        <FormControlLabel value="file" control={<Radio color="primary" />} label="File" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell align='right'><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box p={2} className={classes.box}>Mobile</Box>
                  </TableCell>
                  <TableCell align='right'>
                    <FormControlLabel
                      control={<Checkbox checked={form.bio} onChange={handleChange} name="required" color="primary" />}
                      label="Required"
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
                        <FormControlLabel value="file" control={<Radio color="primary" />} label="File" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell align='right'><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box p={2} className={classes.box}>Gender</Box>
                  </TableCell>
                  <TableCell align='right'>
                    <FormControlLabel
                      control={<Checkbox checked={form.bio} onChange={handleChange} name="required" color="primary" />}
                      label="Required"
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
                        <FormControlLabel value="file" control={<Radio color="primary" />} label="File" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell align='right'><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button variant='contained' color='primary' startIcon={<AddIcon />}>
                      Add field
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Paper>
    )
}