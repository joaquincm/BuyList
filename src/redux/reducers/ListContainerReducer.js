import initialState from '../initialstate'


export default function reducer(state = initialState.app, action) {

  switch (action.type) {
    case 'GET_ITEMS':
      let newLista = Object.assign(action.lista, state.lista)
      return{ ...state, lista : newLista }
      break;
    case 'SET_ERROR':
      return { ...state, error: action.error };
      break;
    case 'DELETE_ITEM':
      return { ...state, lista: [...state.lista.slice(0, action.index), ...state.lista.slice(action.index + 1)] }
      break;
    case 'ADD_ITEM':
      return { ...state, lista: [ ...state.lista, action.item] } 
      break;
    case 'REFRESH_LIST':
    let newLista_re = Object.assign(action.lista, state.lista)
    return { ...state, lista: newLista_re } 
    break;
    case 'ITEM_COMPLETED':
    return {
        ...state,
        lista: state.lista.map(item => item._id === action.item._id ?
            { ...item, completado: action.item.completado } : 
            item
        ) 
    }
    break;
      default:   
      return state
      break;
  }
}
