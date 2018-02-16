import React, { Component } from 'react'
import _ from 'lodash'
import { List, makeSelectable } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import ListCustom from '../components/ListItem'
import GridList from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import { Modal } from '../components/Modal'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { config } from '../config'
import * as ListContainerActions from '../redux/actions/ListContainerActions'
import swal from 'sweetalert2'



class ListContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            texto: '',
            cantidad: null,
            modificado: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNuevoItem = this.handleNuevoItem.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.setComplete = this.setComplete.bind(this)
    }

    componentWillMount() {
        this.props.actions.fetchItems()
    }

    handleNuevoItem(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    async handleSubmit() {

        let objeto = {
            texto: this.state.texto,
            cantidad: this.state.cantidad,
            completado: this.state.completado
        }

        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');


        if (_.size(objeto.texto) > 0) {

            const responseD = await fetch(config.API + 'nuevo', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
                }),
                body: searchParams
            })

            let response = await responseD.json()

            this.props.actions.addItem(response.item)

            this.setState({ modalOpen: false })

        } else {

            this.props.actions.setError(true)

        }
    }

    async handleDelete(id, index) {

        const res_swal = await swal({
            title: 'Está seguro?',
            type: 'warning',
            showCancelButton: false,
            showConfirmButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínalo',
            showLoaderOnConfirm: true
        })


        if (res_swal.value) {
            const responseD = await fetch(config.API + 'delete/' + id, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
                })
            })

            let response = await responseD.json()

            if (response.res === config.STATUS_OK) {

                let index_array = _.findIndex(this.props.lista, { _id: id })
                this.props.actions.deleteItem(index_array)

                swal(
                    'Eliminado!',
                    '',
                    'success'
                )
            }
        }
    }

    async setComplete(id) {

        let index_array = _.findIndex(this.props.lista, { _id: id })

        const responseD = await fetch(config.API + 'setCompleted/' + id, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "completado=" + !this.props.lista[index_array].completado
        })

        const response = await responseD.json()

        this.props.lista[index_array].completado = !this.props.lista[index_array].completado

        this.props.actions.setCompleteItem(this.props.lista[index_array])
    }

    render() {
        return (
            <div style={styles.root}>

                <Paper style={styles.paper} zDepth={5}>
                    <ListCustom onSetComplete={this.setComplete} onTouchTap={this.handleDelete} lista={this.props.lista} />
                </Paper>

                <Modal isOpen={this.state.modalOpen} hasError={this.props.error} onClose={this.handleClose} onChange={this.handleNuevoItem} onSubmit={this.handleSubmit} />

                <FloatingActionButton style={styles.floatButton} onClick={this.handleModal}>
                    <ContentAdd />
                </FloatingActionButton>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        error: state.app.error,
        lista: state.app.lista,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ListContainerActions, dispatch)
    }
}


ListContainer.defaultProps = {
    lista: [],
    error: false
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    paper: {
        marginTop: 75,
        width: 450,
        height: 700,
        padding: 0,
        overflowY: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    floatButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }
}

