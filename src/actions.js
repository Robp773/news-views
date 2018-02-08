export const changeVis = (site) =>({
    type: 'CHANGE_VIS',
    site: site
});

export const populateState = (site, headlinesArray, mainWords)=>({
    type: "POPULATE_STATE",
    site: site,
    headlinesArray: headlinesArray,
    mainWords: mainWords
});