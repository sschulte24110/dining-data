const beersReducer = (state= [], action) => {
  if (action.type === 'SET_BEERS') {
    return action.payload;
  } else if (action.type === 'ADD_BEER') {
    return [...state, action.payload]
  }
  return state;
}

export default beersReducer;