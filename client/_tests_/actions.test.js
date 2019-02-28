import * as actions from '../src/actions/index';
import * as types from '../src/actions/actionTypes';
// import configureMockStore from 'redux-mock-store';
// import fetchMock from 'fetch-mock';



describe('actions', () => {
    it('should create an action to change the email', () => {
        const text = 'test@email.com'
        const expectedAction = {
            type: types.EMAIL_CHANGED,
            payload: text
        }
        expect(actions.emailChanged(text)).toEqual(expectedAction);
    })

    it('should create an action to change the password', () => {
        const text = 'password'
        const expectedAction = {
            type: types.PASSWORD_CHANGED,
            payload: text
        }
        expect(actions.passwordChanged(text)).toEqual(expectedAction);
    })

    
})


// Using Dependency Injection to test async cloud functions (i.e. Firebase Login)

// describe('async actions', () => {
//     afterEach(() => {
//         fetchMock.restore()
//     })

//     it('creates ')

// })
