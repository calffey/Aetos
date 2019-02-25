import authReducer from '../src/reducers/AuthReducer'
import * as types from '../src/actions/actionTypes'


describe('Auth Reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            email: "",
            password: "",
            user: null,
            error: "",
            signupError: "",
            loading: false,
            cpuUsage: null,
            memUsage: null,
            networkTraffic: null,
            saturation: null,
            isLoading: true
        }
    })
    
    describe('default state', () =>{
        it('should return a default state when given an undefined input', () => {    
            expect(authReducer(undefined, {})).toEqual(state)
        });
    })

    describe('unrecognized action types', () =>{
        it('should return the original without any duplication', () => {
            const action = { type: 'asdsalhjk' };
            expect(authReducer(state, action)).toBe(state);
        })
    })

    describe('EMAIL_CHANGED', () => {
        const emailAction = {
            type: types.EMAIL_CHANGED,
            payload: 'test@email.com'
        }

        it('should add inputted email as value on the email property in state', () => {
            const { email } = authReducer(state, emailAction)
            expect(email).toBe(emailAction.payload)
        })

    })

    describe('PASSWORD_CHANGED', () => {
        const passwordAction = {
            type: types.PASSWORD_CHANGED,
            payload: 'password'
        }

        it('should add inputted password as value on the password property in state', () => {
            const { password } = authReducer(state, passwordAction)
            expect(password).toBe(passwordAction.payload)
        })
    })

})


//     case SIGNUP_USER_SUCCESS:
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//         email: "",
//         password: ""
//       };

//     case SIGNUP_USER:
//       return {
//         ...state,
//         loading: true,
//         error: ""
//       };
//     case SIGNUP_USER_FAIL:
//       return {
//         ...state,
//         signupError: "password must be at least 6 characters",
//         loading: false
//       };
//     case LOGIN_USER_SUCCESS:
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//         email: "",
//         password: ""
//       };
//     case LOGIN_USER_FAIL:
//       return { ...state, error: "Authentication Failed.", loading: false };
//     case LOGIN_USER:
//       return {
//         ...state,
//         loading: true,
//         error: ""
//       };

//     case FETCH_METRICS_FAIL:
//       return { ...state, isLoading: true };

//     case FETCH_METRICS:
//       return {
//         ...state,
//         isLoading: true
//       };

//     case FETCH_METRICS_SUCCESS:
//       return {
//         ...state,
//         cpuUsage: action.payload[0],
//         memUsage: action.payload[1],
//         networkTraffic: action.payload[2],
//         saturation: action.payload[3],
//         isLoading: false
//       };
