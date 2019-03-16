import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Component } from "react";
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
  card: {

    marginLeft: 400,
    marginRight: 300,
    marginTop: 50,
    height: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    color: "#616161",
    marginLeft: 5
  },
  pos: {
    marginBottom: 12,
  },
  li: {
    display: 'inline-block',
  },
  IconButt: {
    color: "#212121"
  }
};

class NotesListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      colorValue: "#212121",
      pressCount: 0
    }
    this.onDelete = this.onDelete.bind(this);
    this.onColorClick = this.onColorClick.bind(this)
  }
  onDelete(e) {
    this.props.handleDelete(this.props.todo.id)
  }
  onColorClick() {
    if (this.state.pressCount === 0) {
      this.setState({
        pressCount: 1,
        colorValue: "secondary"
      })
    }
    else {
      this.setState({
        pressCount: 0,
        colorValue: "#212121"
      })
    }
  }

  render() {
    var sty = {
      listStyleType: 'none'
    }

    const { classes } = this.props;

    return (
      <li>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="subtitle2" gutterBottom>
              <li className={classes.li} style={sty}>{this.props.todo.value}</li>
            </Typography>
          </CardContent>
          <CardActions>

            <IconButton aria-label="Add to favorites">
              <FavoriteIcon color={this.state.colorValue} onClick={this.onColorClick} />
            </IconButton>

            <div className={classes.IconButt}>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="Delete" value={this.props.todo.id} >
                <DeleteIcon onClick={this.onDelete} />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </li>
    );
  }
}

NotesListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotesListComponent);