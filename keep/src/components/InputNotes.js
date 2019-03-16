import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';



const styles = theme => ({
  container: {
    marginLeft: 300,
    marginRight: 100,
    marginTop: 150,
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
    margin: theme.spacing.unit,
    marginLeft: 450,
    color: "#ffffff"

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    margin: 16,
  },
  menu: {
    width: 200,
  },
});
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});



class InputNotes extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  handleOnChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleAdd() {

    this.props.handleForTodoApp(this.state.value)
    this.state.value = ""
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <MuiThemeProvider theme={theme}>
            <TextField
              onChange={this.handleOnChange}
              id="outlined-full-width"
              label="Label"
              value={this.state.value}
              style={{ margin: 8 }}
              placeholder="Take a note..."
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleAdd}>
              <AddIcon />
            </Fab>
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

InputNotes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputNotes);