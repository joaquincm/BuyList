import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


export class FloatButton extends Component {

    render() {
        return (
            <FloatingActionButton style={style}>
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

const style = {  
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  };