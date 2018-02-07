

let initialState = {
    msnbc: {
        site: 'msnbc',
        mobileVis: false,
        wordCloud: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Thank-you-word-cloud.jpg/800px-Thank-you-word-cloud.jpg',
        headlines: [
            {headlineText: 'Text  ', url: 'www.msnbc.com'},
            {headlineText: 'Text  ', url: 'www.msnbc.com'},
            {headlineText: 'Text  ', url: 'www.msnbc.com'},
            {headlineText: 'Text  ', url: 'www.msnbc.com'},
            {headlineText: 'Text  ', url: 'www.msnbc.com'},
        ]
    },
    cnn: {
        site: 'cnn',
        mobileVis: true,
        wordCloud: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Thank-you-word-cloud.jpg/800px-Thank-you-word-cloud.jpg',
        headlines: [
            {headlineText: 'Text  ', url: 'www.Cnn.com'},
            {headlineText: 'Text  ', url: 'www.Cnn.com'},
            {headlineText: 'Text  ', url: 'www.Cnn.com'},
            {headlineText: 'Text  ', url: 'www.Cnn.com'},
            {headlineText: 'Text  ', url: 'www.Cnn.com'}
        ]
    },
    fox: {
        site: 'fox',
        mobileVis: false,
        wordCloud: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Thank-you-word-cloud.jpg/800px-Thank-you-word-cloud.jpg',
        headlines: [
            {headlineText: 'Text ', url: 'www.foxnews.com'},
            {headlineText: 'Text ', url: 'www.foxnews.com'},
            {headlineText: 'Text ', url: 'www.foxnews.com'},
            {headlineText: 'Text ', url: 'www.foxnews.com'},
            {headlineText: 'Text ', url: 'www.foxnews.com'},
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
        state = Object.assign({}, state, state[action.site].mobileVis = true, 
            state[siteArray[0]].mobileVis = false, state[siteArray[1]].mobileVis = false

        )

    }
return state;
}
