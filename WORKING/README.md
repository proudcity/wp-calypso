ProudCity Calypso
=================

### Essential modifications

* `./node_modules/wpcom-xhr-request/index.js`: change `
* `./client/lib/oauth-token/index.js`: change `getToken()` to return `localStorage.getItem('userToken');`
* `./client/auth/login.jsx`: Add auth0 SSO code to `getInitialState()`


https://proudcity.auth0.com/authorize/?response_type=code&client_id=y4bZCQsSaTebQRwIhZOJsWN6worUUGn6&redirect_uri=https://example.proudcity.com/index.php?auth0=1?states={redirect_to:}


https://proudcity.auth0.com/authorize?client_id=LJyMRCUoZGdkNRZhx3bCXnsqlGZu5S2R&response_type=code&redirect_uri=http://localhost:8080/index.php?auth0=1&state={"redirect_to":"wp-admin/"}



###@todo endpoints
x http://localhost:4000/rest/v1.1/sites/56c2c0d774a20fbf145a0aa9/roles
x http://localhost:4000/rest/v1.1/me/settings/profile-links
https://public-api.wordpress.com/rest/v1.1/notifications/?fields=id%2Ctype%2Cunread%2Cbody%2Csubject%2Ctimestamp%2Cmeta%2Cnote_hash&number=10


### Mongo commands
```
mongo ds029595.mongolab.com:29595/proudcity_api -u proudcity-api -p loaBEk5vdVtNR34b
db.users.find();

db.users.update(
  { email: "info@proudcity.com" },
  { 
    $push: {
      sites: {
        "roles": ["editor"]
      }
    }
  }
);

```


/sites/[]/updates
jp_version: "3.9.1"
plugins: 12
themes: 2
total: 14
translations: 0
wordpress: 0
wp_version: "4.4.2"


headers":[{"name":"Content-Type","value":"application\/json"}],"body":{"profile_links":[]}}