export const changeVis = (site) => ({
  type: 'CHANGE_VIS',
  site: site
})

export const populateState = (sourceNum, siteSource, headlinesArray, mainWords) => ({
  type: 'POPULATE_STATE',
  sourceNum: sourceNum,
  siteSource: siteSource,
  headlinesArray: headlinesArray,
  mainWords: mainWords
})

export const updateOpinion = (index, opinion, sourceNum) => ({
  type: 'UPDATE_OPINION',
  index: index,
  opinion: opinion,
  sourceNum: sourceNum
})

export const loading = () => ({
  type: 'LOADING'
})

export const emptyColumn = (site) => ({
  type: 'EMPTY',
  site: site
})

export const editOpen = () => ({
    type: 'EDIT_OPEN'
  })
  
