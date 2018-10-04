export const initialState = {
    servers:[]
}

export const Constants={
    SERVER_ADDED:"NewServerAdded",

}

export default function (state = initialState, action) {
    const {type, payload}=action

    switch(type){
        case Constants.SERVER_ADDED:
        console.log('type', type)
        
        
        return [...state,...payload]
        
        default:
            return state
    }

}