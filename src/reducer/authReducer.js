export const initialState = {
    user: '',
    token: '',
    logged: false
}

export const authReducer = (initialState, action) => {

    const { payload, type } = action;


    switch (type) {
        case 'LOG_IN':
            return {
                user: payload.usuario,
                token: payload.token,
                logged: true
            };


        case 'LOG_OUT':
            return {
                user: '',
                token: '',
                logged: false
            };

        default:
            return initialState;
    }
}