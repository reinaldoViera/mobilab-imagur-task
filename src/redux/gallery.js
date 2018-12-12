export const constants = {
    CHANGE_SECTION: 'Change section',
    SWITCH_VIRAL: 'Switch viral',
    CHANGE_SORT: 'Change sort',
    CHANGE_WINDOW: 'Change window',
    ADD_GALLERIES: 'Add galleries',
    FETCH_ERROR: 'Error fetching galleries',
    FETCHING: 'Fetching galleries'
};

/**Reducer */

const initialState = {
  section: 'hot',
  viral: true,
  window: 'day',
  sort: 'viral',
  loading: false,
  error: false,
  nextPage: 0,
  list: [],
  galleries: {}
}


export default (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case constants.ADD_GALLERIES:
            if (payload.replace)
                return {
                    ...state,
                    loading: false,
                    galleries: payload.galleries,
                    list: payload.list,
                    nextPage: 0
                };
            return {
                ...state,
                galleries: { ...state.galleries,
                    ...payload.galleries
                },
                list: [...state.list, ...payload.list],
                loading: false,
                nextPage: state.nextPage + 1
            }
        case constants.FETCHING:
            return {
                ...state,
                error: false,
                loading: payload.loading
            }
        case constants.FETCH_ERROR:
            return {
                ...state,
                error: payload.error,
                loading: false
            }
        case constants.SWITCH_VIRAL:
            return {
              ...state,
              viral: !state.viral
            }
        case constants.CHANGE_SECTION:
            return {
              ...state,
              //Avoiding 'rising' sort if is not section 'user'
              sort: payload.section !== 'user' ? state.sort === 'rising' ? 'viral' : state.sort : state.sort,
              section: payload.section
            }
        case constants.CHANGE_SORT:
            return {
              ...state,
              sort: payload.sort
            }
        case constants.CHANGE_WINDOW:
            return {
              ...state,
              window: payload.window
            }
        default:
            return state
    }
}