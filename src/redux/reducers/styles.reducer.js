const styles = (state = [], action) => {
  if (action.type === 'SET_STYLES') {
    return action.payload;
  }
  return state;
}

export default styles;