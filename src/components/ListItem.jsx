import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import ListIcon from 'material-ui/svg-icons/content/remove'
import RemoveIcon from 'material-ui/svg-icons/action/delete-forever'
import DoneIcon from 'material-ui/svg-icons/action/done'
import red500 from 'material-ui/styles/colors'
import { isUndefined } from 'util';

const ListItemCustom = (({ lista, onTouchTap, onSetComplete}) =>

    <div>
        {
            lista.map((item, i) => {

                let icon = ''
                
                if(item.completado)
                    icon = <DoneIcon style={styles.doneIcon} />
                else
                    icon = <ListIcon />
                
                return (
                    
                    <span key={uuidv4()}>
                       
                        <ListItem 
                            style={styles.item} 
                            value={i}
                            index={i}
                            onDoubleClick={ () => onSetComplete(item._id)  }
                            leftIcon={ icon }
                            rightIcon={ <RemoveIcon onClick={() => onTouchTap(item._id)} hoverColor='red'/> } 
                            >
                            { item.texto } 
                            {
                                item.cantidad != 'null' ?
                                ' x '+item.cantidad
                                :
                                ''
                            }
                        </ListItem>
                        
                        <Divider />
                    </span>)
            }).reverse()
        }
    </div>
 
)


export default ListItemCustom


const styles = {
    item: {
        cursor: "pointer",
        userSelect: "none",
        textAlign: "left"
    },
    doneIcon: {
        fill: 'green'
    }
}