const initialState = {
  infos: [],
  errors: [],
};

// export const newInfoNotification = (info, time) => {
//   return async (dispatch) => {
//     await setTimeout(
//       () =>
//         dispatch({
//           type: "RESET_NOTIFICATIONS",
//         }),
//       time
//     );
//     dispatch({
//       type: "NEW_INFO",
//       info,
//     });
//   };
// };

export const newError = (content) => {
  return {
    type: "NEW_ERROR",
    content,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_INFO":
      return { ...state, infos: state.infos.concat(action.content) };
    case "NEW_ERROR":
      return { ...state, errors: state.errors.concat(action.content) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
