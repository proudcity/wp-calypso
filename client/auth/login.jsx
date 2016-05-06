/**
 * External dependencies
 */
import ReactDom from 'react-dom';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

/**
 * Internal dependencies
 */
import config from 'config';
import Main from 'components/main';
import FormTextInput from 'components/forms/form-text-input';
import FormPasswordInput from 'components/forms/form-password-input';
import FormFieldset from 'components/forms/form-fieldset';
import FormButton from 'components/forms/form-button';
import FormButtonsBar from 'components/forms/form-buttons-bar';
import Notice from 'components/notice';
import AuthStore from 'lib/oauth-store';
import * as AuthActions from 'lib/oauth-store/actions';
import eventRecorder from 'me/event-recorder';
import Gridicon from 'components/gridicon';
import WordPressLogo from 'components/wordpress-logo';
import AuthCodeButton from './auth-code-button';
import Auth0Lock from 'auth0-lock';

const LostPassword = React.createClass( {
  render: function() {
    return (
      <p className="auth__lost-password">
        <a href="https://wordpress.com/wp-login.php?action=lostpassword" target="_blank">
          { this.translate( 'Lost your password?' ) }
        </a>
      </p>
    );
  }
} );

const SelfHostedInstructions = React.createClass( {

  render: function() {
    return (
      <div className="auth__self-hosted-instructions">
        <a href="#" onClick={ this.props.onClickClose } className="auth__self-hosted-instructions-close"><Gridicon icon="cross" size={ 24 } /></a>

        <h2>{ this.translate( 'Add self-hosted site' ) }</h2>
        <p>{ this.translate( 'By default when you sign into the WordPress.com app, you can edit blogs and sites hosted at WordPress.com' ) }</p>
        <p>{ this.translate( 'If you\'d like to edit your self-hosted WordPress blog or site, you can do that by following these instructions:' ) }</p>

        <ol>
          <li><strong>{ this.translate( 'Install the Jetpack plugin.' ) }</strong><br /><a href="http://jetpack.me/install/">{ this.translate( 'Please follow these instructions to install Jetpack' ) }</a>.</li>
          <li>{ this.translate( 'Connect Jetpack to WordPress.com.' ) }</li>
          <li>{ this.translate( 'Now you can sign in to the app using the WordPress.com account Jetpack is connected to, and you can find your self-hosted site under the "My Sites" section.' ) }</li>
        </ol>
      </div>
    );
  }
} );

module.exports = React.createClass( {
  displayName: 'Auth',

  mixins: [ LinkedStateMixin, eventRecorder ],

  componentDidMount: function() {

    //--------------start auth0 sso-------------------

    // instantiate Lock
    var lock = new Auth0Lock('LJyMRCUoZGdkNRZhx3bCXnsqlGZu5S2R', 'proudcity.auth0.com');

    // sso requires redirect mode, hence we need to parse
    // the response from Auth0 that comes on location hash
    var hash = lock.parseHash(window.location.hash);
    if (hash && hash.id_token) {
      console.log('HASH');
      console.log(hash);
      // the user came back from the login (either SSO or regular login),
      // save the token
      localStorage.setItem('userToken', hash.id_token);

      /*var data = { 'body': { 'access_token': hash.id_token } };
      Dispatcher.handleServerAction( {
        type: actions.RECEIVE_AUTH_LOGIN,
        data,
        null
      } );*/


      // redirect to "targetUrl" if any
      // This would go to a different route like
      // window.location.href = hash.state || '#home';
      // But in this case, we just hide and show things
      //goToHomepage(hash.state, hash.id_token);
      location.reload(); // @todo: hella janky
      return;
    }

    // Get the user token if we've saved it in localStorage before
    var idToken = localStorage.getItem('userToken');
    if (idToken) {
      console.log('LOCALSTORAGE');
      console.log(idToken);
      // This would go to a different route like
      // window.location.href = '#home';
      // But in this case, we just hide and show things
      //goToHomepage(getQueryParameter('targetUrl'), idToken);
      /*Dispatcher.handleServerAction( {
        type: actions.RECEIVE_AUTH_LOGIN,
        {},
        {}
      } );*/
      return;
    }

    // user is not logged, check whether there is an SSO session or not
    lock.$auth0.getSSOData(function(err, data) {
      console.log('SSO');
      console.log(data);
      if (!err && data.sso) {
        // there is! redirect to Auth0 for SSO
        lock.$auth0.signin({
          // If the user wanted to go to some other URL, you can track it with `state`
          //state: '',//getQueryParameter('targetUrl'),
          callbackOnLocationHash: true,
        });
      } else {
        lock.showSignin({
          container: 'auth0'
        });
      }
    });


    //--------------end auth0-------------------



    AuthStore.on( 'change', this.refreshData );
  },

  componentWillUnmount: function() {
    AuthStore.off( 'change', this.refreshData );
  },

  refreshData: function() {
    this.setState( AuthStore.get() );
  },

  componentDidUpdate() {
    if ( this.state.requires2fa && this.state.inProgress === false ) {
      ReactDom.findDOMNode( this.refs.auth_code ).focus();
    }
  },

  getInitialState: function() {
    return Object.assign( {
      login: '',
      password: '',
      auth_code: ''
    }, AuthStore.get() );
  },

  submitForm: function( event ) {
    event.preventDefault();
    event.stopPropagation();

    AuthActions.login( this.state.login, this.state.password, this.state.auth_code );
  },

  hasLoginDetails: function() {
    if ( this.state.login === '' || this.state.password === '' ) {
      return false;
    }

    return true;
  },

  canSubmitForm: function() {
    // No submission until the ajax has finished
    if ( this.state.inProgress ) {
      return false;
    }

    // If we have 2fa set then don't allow submission until a code is entered
    if ( this.state.requires2fa ) {
      return parseInt( this.state.auth_code, 10 ) > 0;
    }

    // Don't allow submission until username+password is entered
    return this.hasLoginDetails();
  },

  toggleSelfHostedInstructions: function () {
      var isShowing = !this.state.showInstructions;
      this.setState( { showInstructions: isShowing } );
  },

  render: function() {
    const { requires2fa, inProgress, errorMessage, errorLevel, showInstructions } = this.state;
    return (
      <Main className="auth">
        <h1 className="module-header-title proudcity-login-header">Welcome to <br/>Your ProudCity.</h1>
        <div id="auth0"></div>
      </Main>
    );
    // end
    return (
      <Main className="auth">
        <WordPressLogo />
        <form className="auth__form" onSubmit={ this.submitForm }>
          <FormFieldset>
            <div className="auth__input-wrapper">
              <Gridicon icon="user"/>
              <FormTextInput
                name="login"
                ref="login"
                disabled={ requires2fa || inProgress }
                placeholder={ this.translate( 'Username or email address' ) }
                onFocus={ this.recordFocusEvent( 'Username or email address' ) }
                valueLink={ this.linkState( 'login' ) } />
            </div>
            <div className="auth__input-wrapper">
              <Gridicon icon="lock" />
              <FormPasswordInput
                name="password"
                ref="password"
                disabled={ requires2fa || inProgress }
                placeholder={ this.translate( 'Password' ) }
                onFocus={ this.recordFocusEvent( 'Password' ) }
                hideToggle={ requires2fa }
                submitting={ inProgress }
                valueLink={ this.linkState( 'password' ) } />
            </div>
            { requires2fa &&
              <FormFieldset>
                <FormTextInput
                  name="auth_code"
                  type="number"
                  ref="auth_code"
                  disabled={ inProgress }
                  placeholder={ this.translate( 'Verification code' ) }
                  onFocus={ this.recordFocusEvent( 'Verification code' ) }
                  valueLink={ this.linkState( 'auth_code' ) } />
              </FormFieldset>
            }
          </FormFieldset>
          <FormButtonsBar>
            <FormButton disabled={ ! this.canSubmitForm() } onClick={ this.recordClickEvent( 'Sign in' ) } >
              { requires2fa ? this.translate( 'Verify' ) : this.translate( 'Sign in' ) }
            </FormButton>
          </FormButtonsBar>
          { ! requires2fa && <LostPassword /> }
          { errorMessage && <Notice text={ errorMessage } status={ errorLevel } showDismiss={ false } /> }
          { requires2fa && <AuthCodeButton username={ this.state.login } password={ this.state.password } /> }
        </form>
        <a className="auth__help" target="_blank" title={ this.translate( 'Visit the WordPress.com support site for help' ) } href="https://en.support.wordpress.com/">
          <Gridicon icon="help" />
        </a>
        <div className="auth__links">
          <a href="#" onClick={ this.toggleSelfHostedInstructions }>{ this.translate( 'Add self-hosted site' ) }</a>
          <a href={ config( 'signup_url' ) }>{ this.translate( 'Create account' ) }</a>
        </div>
        { showInstructions && <SelfHostedInstructions onClickClose={ this.toggleSelfHostedInstructions } /> }
      </Main>
    );
  }
} );