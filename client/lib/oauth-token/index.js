/**
 * External dependencies
 */
import cookie from 'cookie';

/**
 * Module variables
 */
const TOKEN_NAME = 'wpcom_token';
const MAX_AGE = 365 * 24 * 60 * 60 * 1000;   // How long to store the OAuth cookie

export function getToken() {
	console.log('getToken');
	//let cookies = cookie.parse( document.cookie );

	//if ( typeof cookies[TOKEN_NAME] !== 'undefined' ) {
	//	return cookies[TOKEN_NAME];
	//}
	console.log(localStorage.getItem('userToken'));
	return localStorage.getItem('userToken');

	//return false;
}

export function setToken( token ) {
	// TODO: Support secure cookies if this is ever used outside of the desktop app
	document.cookie = cookie.serialize( TOKEN_NAME, token, { maxAge: MAX_AGE } );
}

export function clearToken() {
	let cookies = cookie.parse( document.cookie );

	if ( typeof cookies[TOKEN_NAME] !== 'undefined' ) {
		document.cookie = cookie.serialize( TOKEN_NAME, false, { maxAge: -1 } );
	}
}
