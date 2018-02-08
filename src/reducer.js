

let initialState = {
    searchTerm: null,
    msnbc: {
        site: 'msnbc',
        mobileVis: false,
        mainWords: [{text: 'Test', value: 1000}, {text: 'Test', value: 1000}, {text: 'Test', value: 1000}],
        headlines: [
        ]
    },
    cnn: {
        site: 'cnn',
        mobileVis: true,
        mainWords: [{text: 'Test', value: 1000}, {text: 'Test', value: 1000}, {text: 'Test', value: 1000}],
        headlines: [
        ]
    },
    fox: {
        site: 'fox',
        mobileVis: false,
        mainWords: [{text: 'Test', value: 1000}, {text: 'Test', value: 1000}, {text: 'Test', value: 1000}],
        headlines: [
          
        ]
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
        console.log(`${state[action.site].headlines}`)
        return Object.assign({}, state, state[action.site].headlines = action.headlinesArray, state[action.site].mainWords = action.mainWords)
    }
return state;
}
