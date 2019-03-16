import React, { Component } from 'react';
import NotesListComponent from './NotesListComponent';

class ListElement extends Component {
    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(id) {
        this.props.deleteEl(id)
    }
    render() {

        var sty = {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            listStyleType: 'none'

        }
        return (<div style={sty}><ul style={sty}>{this.props.todos.map(todo => <NotesListComponent key={todo.id} todo={todo} handleDelete={this.handleDelete} />)}</ul></div>);
    }

}
export default ListElement