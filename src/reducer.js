

let initialState = {
    loading: false,
    msnbc: {
        site: 'msnbc',
        mobileVis: false,
        mainWords: [],
        headlines: [],
    },
    cnn: {
        site: 'cnn',
        mobileVis: true,
        mainWords: [],
        headlines: [],

    },
    fox: {
        site: 'fox',
        mobileVis: false,
        mainWords: [],
        headlines: [],
    }
}

export const reducer =  (state = initialState, action) =>{
    if(action.type === 'CHANGE_VIS'){
        let siteArray = ['msnbc', 'cnn', 'fox']
        for(let i =0; i<siteArray.length; i++){
            if(siteArray[i] === action.site){
                siteArray.splice(i, 1)
            }
        }
       return Object.assign({}, state, state[action.site].mobileVis = true, 
            state[siteArray[0]].mobileVis = false, state[siteArray[1]].mobileVis = false
        )
    }

    if(action.type === 'POPULATE_STATE'){        
        return Object.assign({}, state, state[action.site].headlines = action.headlinesArray, 
            state[action.site].mainWords = action.mainWords)
    }

    if(action.type === 'UPDATE_OPINION'){
        let lowerCaseSite = (action.site).toLowerCase();
        let index = action.index
        // console.log(state[lowerCaseSite].headlines[index].opinion = action.opinion)
        return Object.assign({}, state, ...state[lowerCaseSite].headlines[index].opinion = action.opinion)
    }

    if(action.type === 'LOADING'){
        return Object.assign({}, state, state.loading = !state.loading)
    }
    if(action.type === 'EMPTY'){
        return Object.assign({}, state, state[action.site].headlines=[], state[action.site].mainWords = [])}
return state;
}
