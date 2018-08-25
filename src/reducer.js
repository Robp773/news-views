let initialState = {
  ui: {
    loading: false,
    editOpen: false
  },
  sourceOne: {
    site: 'cnn',
    mobileVis: false,
    mainWords: [],
    headlines: []
  },
  sourceTwo: {
    site: 'msnbc',
    mobileVis: true,
    mainWords: [],
    headlines: []

  },
  sourceThree: {
    site: 'fox-news',
    mobileVis: false,
    mainWords: [],
    headlines: []
  }
}

export const reducer = (state = initialState , action) => {

  if (action.type === 'POPULATE_STATE') {
    return Object.assign({}, state,
      state[action.sourceNum].site = action.siteSource,
      state[action.sourceNum].headlines = action.headlinesArray,
      state[action.sourceNum].mainWords = action.mainWords)
  }
  if (action.type === 'EDIT_OPEN') {
    return Object.assign({}, state,
      state.ui.editOpen = !state.ui.editOpen)
  }

  if (action.type === 'UPDATE_OPINION') {
    let index = action.index
    return Object.assign({}, state, ...state[action.sourceNum].headlines[index].opinion = action.opinion)
  }

  if (action.type === 'LOADING') {
    return Object.assign({}, state, state.loading = !state.loading)
  }
  if (action.type === 'EMPTY') {
    return Object.assign({}, state, state[action.site].headlines = [], state[action.site].mainWords = [])}
  return state
}
