const vendors = (state = [], action) => {
  if (action.type === 'SET_VENDORS') {
    return action.payload;
  } else if (action.type === 'ADD_VENDOR') {
    return [...state, action.payload]
  }
  return state;
}

export default vendors;