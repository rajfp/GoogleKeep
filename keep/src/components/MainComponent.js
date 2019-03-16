import { Component } from "react";
import KeepDrawer from "./KeepDrawer";
import React from 'react';
import InputNotes from "./InputNotes";
import ListElement from "./ListElement";
import { withStyles } from '@material-ui/core/styles';
import HomeComponent from "./HomeComponent";
import SaveData from './routers/SaveData'
import SaveNotes from './routers/SaveNotes'
import funct from './routers/ValidUser'
import fetchUserFunction from './routers/FetchUserNotes'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = {
    card: {
        marginLeft: 300,
        marginRight: 300,
        marginTop: 200,
        height: '500',
        width: '500',


    },
    cardstyle: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    }
};
class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            user: '',
            password: '',
            loginStatus: 1,
            open: false,
            text: "",
            heading: ""
        }
        this.handleForTodoApp = this.handleForTodoApp.bind(this)
        this.handleDeleteElement = this.handleDeleteElement.bind(this)
        this.handleUserDetails = this.handleUserDetails.bind(this)
        this.handleUserSignInDetails = this.handleUserSignInDetails.bind(this)
        this.handleUserLogOut = this.handleUserLogOut.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }
    handleForTodoApp(task) {
        const newState = [{
            id: Math.random() * 3402938,
            value: task
        }]
        this.setState((currState) => ({
            tasks: currState.tasks.concat(newState)

        }))
        SaveNotes(this.state.user, this.state.password, this.state.tasks)
        console.log("tasksList=>", this.state.tasks)
    }
    handleUserDetails(username, password) {
        if (username === "" || password === "") {
            this.setState({
                heading: "Something is missing...",
                text: "Please complete your details for signup"
            })
            this.handleClickOpen()
        }
        else {
            SaveData(username, password)
            this.setState({
                heading: "Welcome...",
                text: "User registered successfully."
            })
            this.handleClickOpen()
        }
    }
    async handleUserSignInDetails(username, password) {
        console.log("Username Sign in" + username);
        let info = {}
        let userData = {}
        console.log('Started');
        if (username === "" || password === "") {
            this.setState({
                heading: "Something is missing...",
                text: "Please complete your details for login"
            })
            this.handleClickOpen()
        }
        else {
            info = await funct(username)
            userData = await fetchUserFunction(username)
            console.log(userData);
            if (info.pass === password) {
                this.setState({
                    loginStatus: 0,
                    user: username,
                    password: info.pass,
                    tasks: userData.notes
                })
            }
            else {
                this.setState({
                    heading: "Oops!",
                    text: "Either the user is not registered or has entered incorrect password.Please signup or enter correct password"
                })
                this.handleClickOpen()

            }
        }
    }
    handleDeleteElement(id) {

        console.log("Deleted id=>", id);
        this.setState((currState) => ({
            tasks: currState.tasks.filter(task => task.id !== id)

        }))
        console.log(this.state.tasks)
        SaveNotes(this.state.user, this.state.password, this.state.tasks)
    }
    handleUserLogOut() {
        this.setState({
            loginStatus: 1,
        })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        var sty = {
            display: 'inline-block',
            listStyleType: 'none',
        }

        if (this.state.loginStatus == 0) {
            return (<div>
                <div class="style">
                    <InputNotes handleForTodoApp={this.handleForTodoApp} />
                    <ListElement todos={this.state.tasks} deleteEl={this.handleDeleteElement} style={sty} />
                </div>
                <KeepDrawer handleUserLogOut={this.handleUserLogOut} />
            </div>)
        }
        else {
            return (<div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{this.state.heading}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
            </Button>
                    </DialogActions>
                </Dialog>
                <HomeComponent handleUserDetails={this.handleUserDetails} handleUserSignInDetails={this.handleUserSignInDetails} />
            </div>)
        }
    }
}
export default withStyles(styles)(MainComponent);
