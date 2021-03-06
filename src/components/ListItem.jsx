import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import ListIcon from 'material-ui/svg-icons/content/remove'
import RemoveIcon from 'material-ui/svg-icons/action/delete-forever'
import DoneIcon from 'material-ui/svg-icons/action/done'


const ListCustom = (({ lista, onTouchTap, onSetComplete }) =>

    <div>
        {
            lista.map((item, i) => {

                let icon = ''
                let texto = ''

                let cantidad = item.cantidad != 'null' ? ' x ' + item.cantidad : ''

                if (item.completado) {
                    icon = <DoneIcon style={styles.doneElementIcon} />
                    texto = <span style={styles.doneText}> {item.texto} </span>
                    cantidad = <span style={styles.doneText}>{cantidad}</span>
                }
                else {
                    icon = <ListIcon />
                    texto = <span> {item.texto} </span>
                }

                return (
                    <div style={item.completado ? styles.doneElement : styles.normalElement}>
                    <span key={uuidv4()}>

                        <ListItem
                            style={styles.item}
                            value={i}
                            index={i}
                            onDoubleClick={() => onSetComplete(item._id)}
                            leftIcon={icon}
                            rightIcon={<RemoveIcon onClick={() => onTouchTap(item._id)} hoverColor='red' style={item.completado ? styles.doneElementIcon : {}} />}
                        >
                            {texto}
                            {cantidad}
                        </ListItem>

                        <Divider />
                    </span>
                    </div>
                    )
            }).reverse()
        }
    </div>

)


export default ListCustom


const styles = {
    item: {
        cursor: "pointer",
        userSelect: "none",
        textAlign: "left"
    },
    doneIcon: {
        fill: 'green'
    },
    editField: {
        margin: 0,
        padding: 0
    },
    doneText: {
        textDecoration: 'line-through',
        color: 'white'
    },
    doneElement: {
        // rgb(63, 81, 181)
        backgroundColor: 'rgb(63, 81, 181)'
    },
    doneElementIcon: {
        fill: 'white'
    },
    normalElement: {
        backgroundColor: 'white'
    }

}