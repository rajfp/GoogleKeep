import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: 25,
    marginLeft: 50,
    marginRight: 50,
  },
  button: {
    marginLeft: 180,
    marginRight: 180,
    marginTop: 20,
    height: 55,
    color: "#ffffff"


  },
  card: {
    marginLeft: 300,
    marginRight: 300,
    marginTop: 200
  },
  cardstyle: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
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

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      Password: '',

    };
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleOnSignUpClick = this.handleOnSignUpClick.bind(this)
    this.handleOnSignInClick = this.handleOnSignInClick.bind(this)

  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  };

  handlePasswordChange(e) {
    this.setState({
      Password: e.target.value,
    });
  };
  handleOnSignUpClick(e) {
    this.props.handleUserDetails(this.state.name, this.state.Password)
    this.state.name = ""
    this.state.Password = ""
  }
  handleOnSignInClick(e) {
    this.props.handleUserSignInDetails(this.state.name, this.state.Password)
    this.state.name = ""
    this.state.Password = ""
  }
  render() {
    const { classes } = this.props;

    return (
      <div >
        <Card className={classes.card}>
          <CardContent className={classes.cardstyle}>
            <MuiThemeProvider theme={theme}>
              <TextField

                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"

              />
              <TextField
                type="password"
                label="Password"
                defaultValue=""
                color="primary"
                onChange={this.handlePasswordChange}
                value={this.state.Password}
                className={classes.textField}
                margin="normal"

              />
              <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOnSignInClick}>
                Login
      </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOnSignUpClick}>
                Sign Up
      </Button></MuiThemeProvider>
          </CardContent>
        </Card></div>

    );
  }
}

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeComponent);