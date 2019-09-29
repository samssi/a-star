const initialState = {
    table: [[0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 8, 0, 0, 0],
           [0, 1, 1, 1, 1, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 9, 0],
           [0, 0, 0, 0, 0, 0]]
}
            
const store = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export default store;