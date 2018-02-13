import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {Row,Col,Container} from 'react-grid-system'



const Modal = ({ isOpen, hasError, onClose, onSubmit, onChange }) => {

    const actions = [
        <FlatButton
            label="Cancelar"
            onClick={onClose}
        />,
        <RaisedButton
            type="submit"
            label="Añadir"
            className="button-submit"
            onClick={onSubmit}
            primary={true} />,
    ]

function getContent(){
    
    if(!hasError){
        return  <Container>
                <Row>
                    <Col md={5}>
                        <TextField hintText="Nombre" name="texto" id="item_name" onChange={onChange} />
                    </Col>
                    <Col md={2}>
                        <TextField hintText="Cantidad" name="cantidad" type="number" id="cantidad" onChange={onChange} />
                    </Col>
                </Row>
                </Container>
    }else{
        return <Container>
                <Row>
                    <Col md={5}>
                        <TextField errorText="Escribe algo para añadir a la lista!" name="texto" id="item_name" onChange={onChange} />
                    </Col>
                    <Col md={2}>
                        <TextField hintText="Cantidad" type="number" id="cantidad" name="cantidad" onChange={onChange} />
                    </Col>
                </Row>
                </Container>
    }
}

    return (
        <div>
            <Dialog
                title="Añadir item"
                actions={actions}
                modal={isOpen}
                open={isOpen}
                onRequestClose={onClose}
            >
            { getContent() }
                {/* {
                    !hasError ?
                        <TextField onChange={onChange} />
                        :
                        <TextField errorText="Introduce algo para añadir a la Lista!" onChange={onChange} />
                        
                } */}
            </Dialog>
        </div>
    )
}
export default Modal