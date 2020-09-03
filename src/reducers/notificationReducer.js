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

const getId = () => Math.floor(Math.random() * 100000);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_INFO":
      return {
        ...state,
        infos: state.infos.concat({
          content: action.content,
          id: `info-${getId()}`,
        }),
      };
    case "NEW_ERROR":
      console.log(action.con);
      return {
        ...state,
        errors: state.errors.concat({
          content: action.content,
          id: `error-${getId()}`,
        }),
      };
    case "REMOVE_INFO":
      return {
        ...state,
        info: state.info.filter(
          (notification) => notification.id !== action.id
        ),
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        errors: state.errors.filter(
          (notification) => notification.id !== action.id
        ),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
