const users = (state = [], action) => {
  if (action.type === 'SET_USERS') {
    return action.payload;
  }
  return state;
}

export default users;