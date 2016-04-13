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

4. Ensure that [proudpack](), auth0 and wp-jwt-auth Wordpress plugins are enabled and properly configured. @todo: more info here.


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

Icons are overwritten with their FontAwesome equivalents in `./client/components/gridicon/index.jsx`. Copy the `d` attribute in `<path>` from the FontAwesome repo (ex: https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/white/svg/bell.svg).


### Specific pages/sections
* Config
  * config/development.json : Main config file : Enable/disable sections, customize settings
  * client/sections.js : Main sections router : Define Checklist page
* Reader
  * client/reader/sidebar/index.jsx : Reader sidebar : Change sidebar items
  * client/reader/sidebar/reader-sidebar-lists/index.jsx : List sidebar section : Change Lists to Channels
  * client/lib/safe-image-url/index.js : Clean urls : Allow all image urls for social feed items
* Stats
  * client/my-sites/stats/site.jsx : Day/Wk/Mo page : Change blocks on Days page
  * client/my-sites/stats/controller.js : Add Google Analytics link, change star to heart, comments to submissions
  * client/my-sites/stats/insights/index.jsx : Insights page : Altered boxes
  * client/my-sites/stats/stats-site-overview/index.jsx : Overview box : Change star to heart, comments to submissions
  * client/my-sites/stats/stats-chart-tabs/index.jsx : Tabs below charts : Change star to heart, comments to submissions
* Plugins
  * client/my-sites/plugins/plugin-meta/index.jsx : Main plugin wrapper: Hide version, update info
  * client/my-sites/plugins/plugin-information/index.jsx : Plugin details : Hide ratings
  * client/my-sites/plugins/plugin-sections/index.jsx : Plugin tabs : Hide tabs, add configuration tab
  * client/my-sites/plugins/main.jsx : Plugin list : Hide extra plugin tabs (Updates)
  * client/my-sites/plugins/plugin-item/plugin-item.jsx : List item : Remove autopdates, Set plugin meta to return Plugin name
  * client/lib/plugins/utils.js : Allow array for plugin configuration section
* Menus
  * client/my-sites/menus/main.jsx : Menu wrapper : Hide menu location selector
  * client/my-sites/menus/menu-item-types.js : Actions for new menu item : Limit list
  * client/my-sites/menus/menu-editable-item.jsx : JSX for actions : Add New Action
* Users
  * client/components/signup-form/index.jsx : Signup form : Add Auth0 lock
  * client/signup/steps/theme-selection/index.jsx : List of available themes : Customize themes for ProudCity distros
* Sidebar
  * client/my-sites/sidebar/sidebar.jsx : Sidebar menu : Hide menu items, add checklist item 
  * client/my-sites/sidebar/publish-menu.jsx : Publish sidebar menu : Make Publish menu collapsed by default
* Branding
  * client/lib/screen-title/utils.js : Screen title : Change <title> to My ProudCity
  * client/components/site-selector/index.jsx : Site selector : Change "Create new Wordpress" to "Create new site"
  * client/layout/masterbar/logged-in.jsx : Topnav : Change Reader to MyCity Feed
  * client/components/gridicon/index.jsx : Gridicons svg defn : updating icons

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

