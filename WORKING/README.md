ProudCity Calypso
=================

### Getting started

1. Checkout the `feb2016` branch of https://github.com/proudcity/wp-calypso, `npm install`.

2. Edit `./node_modules/wpcom-proxy-request/index.js` and `./node_modules/wpcom-xhr-request/index.js`, changing
  ```
  https://public-api.wordpress.com
  ```
  to
  ```
  http://localhost:4000
  ```

3. Clone https://github.com/proudcity/proudcity-api, copy files from `Dropbox/Albatross Digital/Projects/ProudCity/dev/proudcity-api`, install and run:
  ```
  npm install
  forever -w ./bin/www
  ```


### Essential modifications

* `./node_modules/wpcom-xhr-request/index.js`: change `
* `./client/lib/oauth-token/index.js`: change `getToken()` to return `localStorage.getItem('userToken');`
* `./client/auth/login.jsx`: Add auth0 SSO code to `getInitialState()`


Other changes noted (from diff)
* /home/jeff/labspace/wp-calypso/client/my-sites/plugins/access-control.js:  function hasErrorCondition
* client/my-sites/menus/main.jsx
* /home/jeff/labspace/wp-calypso/client/my-sites/plugins/main.jsx: render()
* client/my-sites/sidebar/sidebar.jsx: themes defn


https://proudcity.auth0.com/authorize/?response_type=code&client_id=y4bZCQsSaTebQRwIhZOJsWN6worUUGn6&redirect_uri=https://example.proudcity.com/index.php?auth0=1?states={redirect_to:}


https://proudcity.auth0.com/authorize?client_id=LJyMRCUoZGdkNRZhx3bCXnsqlGZu5S2R&response_type=code&redirect_uri=http://localhost:8080/index.php?auth0=1&state={"redirect_to":"wp-admin/"}


### Read

https://public-api.wordpress.com/rest/v1.3/read/following?http_envelope=1&orderBy=date&number=40&before=2016-03-03T00%3A30%3A40.741Z&after=2016-03-02T17%3A00%3A02%2B00%3A00



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