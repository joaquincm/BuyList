import React,{Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {Row,Col,Container} from 'react-grid-system'



export class Modal extends Component{

    constructor(){
        super()
        this.state = { value: null }

        this.getContent = this.getContent.bind(this);
    }

    handleChange = (event, index, value) => this.setState({value});

    getContent(){
       

        if(!this.props.hasError){
            return  <Container>
                    <Row>
                        <Col md={4}>
                            <TextField hintText="Nombre" name="texto" id="item_name" onChange={this.props.onChange} />
                        </Col>
                        <Col md={2}>
                            <TextField hintText="Cantidad" name="cantidad" type="number" id="cantidad" onChange={this.props.onChange} />
                        </Col>
                        <Col md={3}>
                            <SelectField
                            hintText="Unidad"
                            value={this.state.value}
                            onChange={this.handleChange}
                            >
                            <MenuItem value='gr' primaryText="gramos" />
                            <MenuItem value='l' primaryText="litros" />
                            <MenuItem value='u' primaryText="unidades" />
                            </SelectField>
                        </Col>
                    </Row>
                    </Container>
        }else{
            return <Container>
                    <Row>
                        <Col md={4}>
                            <TextField errorText="Escribe algo para añadir a la lista!" name="texto" id="item_name" onChange={this.props.onChange} />
                        </Col>
                        <Col md={2}>
                            <TextField hintText="Cantidad" type="number" id="cantidad" name="cantidad" onChange={this.props.onChange} />
                        </Col>
                        <Col md={3}>
                            <SelectField
                            hintText="Unidad"
                            value={this.state.value}
                            onChange={this.handleChange}
                            >
                            <MenuItem value='gr' primaryText="gramos" />
                            <MenuItem value='l' primaryText="litros" />
                            <MenuItem value='u' primaryText="unidades" />
                            </SelectField>
                        </Col>
                    </Row>
                    </Container>
        }
    }

    render() {
         
        const actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.props.onClose}
            />,
            <RaisedButton
                type="submit"
                label="Añadir"
                className="button-submit"
                onClick={this.props.onSubmit}
                primary={true} />,
        ]
        return (
            <div>
                <Dialog
                    title="Añadir item"
                    actions={actions}
                    modal={this.props.isOpen}
                    open={this.props.isOpen}
                    onRequestClose={this.props.onClose}
                >
                { this.getContent() }
                    
                </Dialog>
            </div>
        )
    }


}
