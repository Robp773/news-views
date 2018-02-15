export const changeVis = (site) =>({
    type: 'CHANGE_VIS',
    site: site
});

export const populateState = (site, headlinesArray, mainWords)=>({
    type: "POPULATE_STATE",
    site: site,
    headlinesArray: headlinesArray,
    mainWords: mainWords,
});

export const updateOpinion = (index, opinion, site)=>({
    type: 'UPDATE_OPINION',
    index: index,
    opinion: opinion,
    site: site
})

export const loading = () =>({
    type: 'LOADING'
})

export const emptyColumn = (site) =>({
    type: 'EMPTY',
    site: site
})
