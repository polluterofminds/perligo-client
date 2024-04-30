import { GROUPS_LOADED } from '../actions/types';

const initialState = {
  groups: []
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GROUPS_LOADED: 
      return {
        ...initialState, 
        groups: JSON.parse(payload)
      }
    default: 
      return initialState;
  }
}
