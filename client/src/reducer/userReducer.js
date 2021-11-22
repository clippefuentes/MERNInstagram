export const initialState = null

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'USER':
            console.log('ASDASD')
            return action.payload;
        case 'CLEAR':
            return null;
        case 'UPDATE':
            return {
                ...state,
                followers: action.payload.followers,
                following: action.payload.following
            };
        default:
            return state;
    }
}