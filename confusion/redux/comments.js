import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
      // QUI BISOGNA AGGIORNARE IL DB LATO SERVER > FORSE CHIAMANDO UN SERVIZIO REST 
      // GUARDA https://facebook.github.io/react-native/docs/network
      return {...state, errMess: null, comments: state.comments.concat(action.payload)};

    default:
      return state;
  }
};