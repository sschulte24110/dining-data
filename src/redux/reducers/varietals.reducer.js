const varietals = (state = [], action) => {
  if (action.type === 'SET_VARIETALS') {
    return action.payload;
  }
  return state;
}

export default varietals;