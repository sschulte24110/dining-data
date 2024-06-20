const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
      };
    case 'TOGGLE_ADMIN_SUCCESS':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userID
            ? { ...user, isAdmin: action.payload.isAdmin }
            : user
        ),
      };
    case 'TOGGLE_ADMIN_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
