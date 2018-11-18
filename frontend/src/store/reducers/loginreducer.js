// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// const LOGIN_ERROR = 'LOGIN_ERROR';

// function setLoginSuccess(isLoginSuccess) {
//   return {
//     type: LOGIN_SUCCESS,
//     isLoginSuccess
//   };
// }

// function setLoginError(loginError) {
//   return {
//     type: LOGIN_ERROR,
//     loginError
//   };
// }

// export default function reducer(state = {
//   isLoginSuccess:false,
//   loginError: null
// }, action){
//   switch (action.type){
//     case LOGIN_SUCCESS:
//     return{
//       ...state, isLoginSuccess:action.isLoginSuccess
//     };
//     case LOGIN_ERROR:
//     return{
//       ...state, loginError:action.loginError
//     };
//     default:
//     return state;
//   }
// }

// export function authenticateLoginRequest(email, password){
//   return dispatch => {
//     dispatch(setLoginSuccess(false));
//     dispatch(setLoginError(null));

//     sendRequest(email, password)
//     .then(success =>{
//       dispatch(setLoginSuccess(true));
//     })
//     .catch(err => {
//       dispatch(setLoginError(err));
//     });
//   };
// }

// function sendRequest(email, password){

//   return new Promise((resolve, reject)=>{
//     if(email === 'test@gmail.com' && password ==='pass'){
//       console.log(email,password);
//       return resolve(true);
//     }else{
//       console.log(email,password);
//       return reject(new Error('Invalid Credentials'));
//     }
//   });
// }