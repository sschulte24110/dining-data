const beersReducer = (state= [], action) => {
  if (action.type === 'SET_BEERS') {
    return action.payload;
  }
  return state;
}

export default beersReducer;