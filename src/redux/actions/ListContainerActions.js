import axios from 'axios'

export function setError(error) {
  return (dispatch) => {
    dispatch({ type: 'SET_ERROR', error })
  }
}

export function fetchItems() {
  return (dispatch) => {
    axios.get('http://localhost:8080/api/all')
  .then(function(result){ 
    dispatch({type: 'GET_ITEMS',lista: result.data})
  })
  }
}

export function addItem(item){
  return (dispatch) => {
    dispatch({type: 'ADD_ITEM', item}),
    dispatch({type: 'SET_ERROR', error:false})
  }
}

export function refreshList(lista){
  return (dispatch) => {
    dispatch({type: 'REFRESH_LIST',lista})
  }
}

export function setCompleteItem(item){
  return (dispatch) => {
    dispatch({type: 'ITEM_COMPLETED',item})
  }
}

export function deleteItem(index){
  return (dispatch) => {
    dispatch({type: 'DELETE_ITEM', index})
  }
}


