let initialState = {
  loading: false,
  sourceOne: {
    site: 'msnbc',
    mobileVis: false,
    mainWords: [],
    headlines: []
  },
  sourceTwo: {
    site: 'cnn',
    mobileVis: true,
    mainWords: [],
    headlines: []

  },
  sourceThree: {
    site: 'fox',
    mobileVis: false,
    mainWords: [],
    headlines: []
  }
}

export const reducer = (state = initialState , action) => {
  if (action.type === 'CHANGE_VIS') {
    let siteArray = ['msnbc', 'cnn', 'fox']
    for (let i = 0; i < siteArray.length; i++) {
      if (siteArray[i] === action.site) {
        siteArray.splice(i, 1)
      }
    }
    return Object.assign({}, state, state[action.site].mobileVis = true,
      state[siteArray[0]].mobileVis = false, state[siteArray[1]].mobileVis = false
    )
  }

  if (action.type === 'POPULATE_STATE') {
    console.log(action)
    return Object.assign({}, state,
      state[action.sourceNum].site = action.siteSource,
      state[action.sourceNum].headlines = action.headlinesArray,
      state[action.sourceNum].mainWords = action.mainWords)
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
