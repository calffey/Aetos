import * as actions from '../src/actions/index';
import * as types from '../src/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';



describe('actions', () => {
    it('should create an action to change the email', () => {
        const text = 'test@email.com'
        const expectedAction = {
            type: types.EMAIL_CHANGED,
            payload: text
        }
        expect(actions.emailChanged(text)).toEqual(expectedAction)
    })

    it('should create an action to change the password', () => {
        const text = 'password'
        const expectedAction = {
            type: types.PASSWORD_CHANGED,
            payload: text
        }
        expect(actions.passwordChanged(text)).toEqual(expectedAction)
    })
})

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates ')

})


// export const signupUser = ({ email, password }) => {
//     return dispatch => {
//       dispatch({ type: SIGNUP_USER });
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then(user => signinUserSuccess(dispatch, user))
//         .catch(() => signupUserFail(dispatch));
//     };
//   };