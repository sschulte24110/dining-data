const beers = (state= [], action) => {
  if (action.type === 'SET_BEERS') {
    return action.payload;
  } else if (action.type === 'ADD_BEER') {
    return [...state, action.payload]
  } else if (action.type === 'SET_STYLE_BEER') {
    return action.payload;
  // } else if (action.type === 'UPDATE_BEER') {
  //   return action.payload;
  }
  return state;
}

export default beers;