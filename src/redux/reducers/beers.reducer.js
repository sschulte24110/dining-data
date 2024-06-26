

const beers = (state = [], action) => {
  if (action.type === 'SET_BEERS') {
    return action.payload;
  } else if (action.type === 'ADD_BEER') {
    return [...state, action.payload]
  } else if (action.type === 'SET_STYLE_BEER') {
    return action.payload;
  } else if (action.type === 'TOGGLE_ADMIN_SUCCESS') {
    return [...state, beers.map((beer) => beer.id === action.payload.beerID ? { ...beer, out_of_stock: action.payload.out_of_stock} : beer)]
  } else if (action.type === 'TOGGLE_ADMIN_FAILURE') {
    return { ...state, error: action.error}
  }
  return state;
}

export default beers;