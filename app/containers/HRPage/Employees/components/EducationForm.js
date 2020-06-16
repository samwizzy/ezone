import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import { AppBar, Button, IconButton, MenuItem, Table, TableBody, TableRow, TableCell, TextField, Typography, DialogTitle, DialogContent, DialogActions, Toolbar } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    "& td": {
      padding: theme.spacing(0, 2)
    },
    "& tr:last-child": {
      "& td": {
        border: "0 !important",
        padding: theme.spacing(2)
      },
    },
  }
}));

export const EducationForm = props => {
  const { handleChange, handleAddRow, handleRemoveRow, closeNewEmployeeDialog, handleSubmit, handlePrev, form } = props
  const classes = useStyles()

  const canSubmitForm = () => {
    const { jobDesc, about } = form
    return jobDesc.length > 0 && about.length > 0
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Education Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Table className={classes.table}>
          <TableBody>
            {form.education && form.education.map((input, i) => (
              <TableRow>
                <TableCell>
                  <TextField
                    id="outlined-degree"
                    name="degree"
                    label="Degree"
                    fullWidth
                    margin="normal"
                    size="small"
                    value={input.degree}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="outlined-field-of-study"
                    name="fieldOfStudy"
                    label="Field Of Study"
                    fullWidth
                    margin="normal"
                    size="small"
                    value={input.fieldOfStudy}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveRow(i)}><DeleteOutlinedIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Button color="primary" disableElevation startIcon={<AddIcon />} onClick={handleAddRow}>Add</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewEmployeeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  )
}