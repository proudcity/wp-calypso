/**
 * External dependencies.
 */
var boot = require( 'boot' ),
	http = require( 'http' ),
	https = require( 'https' ),
	chalk = require( 'chalk' ),
	fs = require('fs');

/**
 * Internal dependencies
 */
var pkg = require( './package.json' ),
	config = require( 'config' );

var start = Date.now(),
	port = process.env.PORT || 3000,
	host = process.env.HOST || config( 'hostname' ),
	app = boot(),
	server,
	httpsServer,
	hotReloader;

/**
 * Create HTTPS server.
 */

if(process.env.HTTPS) {

  var httpsPort = process.env.HTTPS_PORT || '443';
  
  console.log( chalk.yellow( '%s booted in %dms - https://%s:%s' ), pkg.name, ( Date.now() ) - start, host, httpsPort );
  console.info( chalk.cyan( '\nGetting bundles ready, hold on...' ) );

  app.set('port', httpsPort);

  var credentials = {
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt')
  };
  httpsServer = https.createServer(credentials, app);
  httpsServer.listen(httpsPort);

  server = http.createServer( function (req, res) {
    console.log("https://" + host + ':' + httpsPort + req.url);
    res.writeHead(301, { "Location": "https://" + host + ':' + httpsPort + req.url });
    res.end();
  } );
}
else {
  console.log( chalk.yellow( '%s booted in %dms - http://%s:%s' ), pkg.name, ( Date.now() ) - start, host, port );
  console.info( chalk.cyan( '\nGetting bundles ready, hold on...' ) );

  server = http.createServer( app );
}

// The desktop app runs Calypso in a fork.
if ( process.env.CALYPSO_IS_FORK ) {
	// We need to run it with an explicit hostname to avoid firewall warnings.
	server.listen( { port, host }, function() {
		// Tell the parent process that Calypso has booted.
		process.send( { boot: 'ready' } );
	} );
} else {
	// Let non-forks listen on any host.
	server.listen( port );
}



// Enable hot reloader in development
if ( config( 'env' ) === 'development' ) {
	hotReloader = require( 'bundler/hot-reloader' );
	if(process.env.HTTPS) {
		hotReloader.listen( httpsServer, app.get( 'compiler' ) );
	}
	else {
		hotReloader.listen( server, app.get( 'compiler' ) );
	}
}
