const wines = (state = [], action) => {
  if (action.type === 'SET_WINES') {
    return action.payload;
  } else if (action.type === 'ADD_WINE') {
    return [...state, action.payload]
  } else if (action.type === 'SET_VARIETAL_WINE') {
    return action.payload;
  }
  return state;
}

export default wines;