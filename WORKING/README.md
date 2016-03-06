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

The followins is a list of the bare-bones changes that need to be made to Automattic/wp-calypso to make it work with proudcity/proudcity-api and Auth0:
* `./node_modules/wpcom-xhr-request/index.js`: change `
* `./client/lib/oauth-token/index.js`: change `getToken()` to return `localStorage.getItem('userToken');`
* `./client/auth/login.jsx`: Add auth0 SSO code to `getInitialState()`
* `./client/components/signup-form/index.jsx`: Replace the signup form with Auth0

### ProudCity apps

The ProudCity Apps repo on GitHub is our Open Source method for managing our apps (plugins), distributions, and related assets.  To browse the repo: https://github.com/proudcity/proudcity-api/. To call the api: `https://proudcity.github.io/proudcity-api/*`.  This is defined as `PLUGIN_REPO` in `proudcity-api`'s `.env` file.



### Signup flows
Calypso has a nice configurable "flows" idea.  The flows are defined in `./client/signup/config/flows.js`.  There is more info in `./client/signup/README.md`. Once you've added the flow to `flows.js`, it'll be available for users at `/start/flow-name` where `flow-name` is the key of your flow in `flows`.  We have created a number of flows, the primary one being `/start/proudcity`.

The available themes (ProudCity Distributions) are defined in `./client/signup/steps/theme-selection/index.json`.  Assets for these themes are in stored in the proudcity-appstore repo: `https://proudcity.github.io/proudcity-appstore/distributions/screenshots/*`.


### Theme changes

ProudCity theme overrides are contained in `./assets/stylesheets/proudcity/*`. Colors are overwritten in `./assets/stylesheets/shared/_colors.scss`.

---
### OLD NOTES
(ignore these)

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

db.sites.update({"url":"http://localhost:8080"}, {"$set":{"url":"https://beta.proudcity.com"}});


```

