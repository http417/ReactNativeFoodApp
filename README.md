## Installation Instructions (using the mobile Expo App)

This application is most easily viewed by running it on an Android or iPhone device with the Expo mobile client app connected to the same wireless network as your computer.

#### Installation Prerequisites:
- Node 

On your Computer:
1) In a terminal 'cd' into your desired directory where you wish to install the project folder 'ReactNativeFoodApp'
2) Clone the github repository with the command: "git clone git@github.com:christophercheng/ReactNativeFoodApp.git"
3) 'cd' into the newly created project folder, 'ReactNativeFoodApp'
4) Initiate the automated installs of the required packages with the command 'npm install'
5) Run the app on your computer with the command 'npm start'
6) Wait for a minute or so, and look out for a QR code image to be displayed.  You will capture this QR code with your mobile Expo App to launch the app on your phone.

On your Phone:
1) Download the Expo client in the Apple or Android app store.
2) Once installed, open the Expo Client and click on the 'Scan QR Code' section
3) The phone's camera should be activated with a augmented targeting square.
4) Aim the phone at the computer's displayed QR code such that it is within the augmented targeting square.
5) If done properly, the Expo app should automatically run the ReactNativeFoodApp

#### Unit Testing Instructions:
In the root director of the cloned repository, simply enter into the command line: 'npm test' or 'yarn test'

React Native comes preinstalled with jest testing framework.

### Installation Instructions (using the mobile Expo App)

In order to run and develop the application on Android Studio or Apple Xcode, you must 'eject' the app.

Detailed instructions are provided here:
 
https://facebook.github.io/react-native/docs/getting-started.html


##  Assumptions About the Business Requirements 

1.  (Authentication)  I'm assuming that for the purposes of this project, it's ok to create a mock-up of a user authentication and sign-up system.  This app simply stores user phone numbers and (unencrypted) passwords in the devices local storage via React Native's AsyncStorage component.  For a real project, a sophisticated authentication system would be built or a 3rd party tool would be integrated with.  For a phone number username system, a 3rd party provider like Twilio could be useful.

2.  (Authentication) This app allows multiple phone number / password combinations to log in, but in reality, there should only be one account per device.  This app also only has one user shopping cart, which is shared amongst all of the test users.  Obviously that doesn't make much sense.


3. (Fresh Data Upkeep) Since the test data (via AWS) is supposedly refreshed every 10 minutes, I built a system that pulled the test data at least once every 10 minutes, but only if the user navigates to a different page.  (Screen changes trigger a check on data refresh timing).

4. (Data Changes).  The test data might change in a way that negatively affects the user's experience.  For example, a user could be viewing an item page that is no longer available after a data refresh (every 10 minutes).  Worse, the items in a user's cart might have changed -- the price might have changed or perhaps the item in the cart is no longer available.  My test app will update the cart after a data fetch - it will update prices and remove discontinued items.

4.  (Data Cleansing) There were a lot of category data that didn't have sensible names, so I filtered them out.  In a production application, it might make sense to have a large universe of data since there might be other use cases which requires that data.

5. (Cart Logistics) A lot of typical cart features were ommitted in this test app.  For example, there are no tax calculations, delivery charges.


## Overview of App Structure

|-App.js

|-AppScreenRouter.js

|--src/

|-----/components/

|----------------/ AppOrAuthSwitcher.js

|----------------/ (UI App Components) CategoryListScreen,CategoryScreen ItemScreen, CartScreen

|----------------/ (UI Authorization Components) Welcome Screen, SignInScreen, SignUpScreen, LoadingScreen

|----------------/ (UI Account Settings Componenents) AccountScreen

|----------------/widgets/

|------------------------/ (UI App Widgets) CartWidget,CartListItem,CartTitleWidget,EmptyCartWidget, LogoHeader

|------------------------/ (UI Authorization Widgets) CredentialsWidge, PhoneInput, PasswordInput,SignOutButton

|------------------------/ (Data Fetching & Processing Widget) AutoRefreshServerDataWidget.js

|-----/store/

|-----------/actions.js, configureStore.js

|-----------/reducers/

|--------------------/reducerFoodStore.js, reducerUserStore.js


|-----/tools/

|-----------/fetchAndProcessServerData, priceConversion, constants


### App Structure, Detailed Descriptions
 
#### Root Folder: (./)
 1. App.js: HOC's wrap the root AppScreenRouter compoment with a redux Provider (w/store prop) 
   - and a persistance component 
 2. AppScreenRouter: Main App UI navigation contains the various tab and stack navigators 
   - and their associated UI screen components
   
#### Component Folder: (./src/components/)
 1. Main Navigational Comopnent (AppOrAuthSwitcher.js)
   - Switches between the stack of user authorization UI screens or the signed-in app UI screens
 
 2. Authorization User Interface Screen Components:
   - WelcomeScreen.js, SignInScreen.js, SignUpScreen.js: self-explanatory
 
 3. Application User Interface Menu Screens Components:
   - CategoryListScreen.js, Category.js, Item.js, CartScreen.js
   
#### Component Widgets Folder: (./src/components/widgets/)
 1. CartWidget.js displays dynamically updated cart totals (displayed on right of top header)
 
 2. Cart Screen Widgets: help to compose the Cart Screen page's user interface
   - CartListItemWidget.js, CartTitleWidget.js, EmptyCartWidget.js
   
 3. Authorization Screen Widgets: help to compose the signIn/signUp screens
   - credentialsWidget.js, phoneInput.js, passwordInput.js,
   
 4. SignOut Widget: handles sign-out from Account Screen
 
 5.  Data Fetching and Processing Widget: AutoRefreshServerDataWidget.js
   - This is an invisible widget that continually downloads updated server data at least once every 10 minutes
   - This is placed on the welcome screen, initial application screen router, and the cart widgets
     - so essentially whenever the user navigates across the app, the server will pull new data occassionally
     
#### Redux Store Folder (./store/)
 1. configureStore.js: creates the store object from createStore call and combines the composite reducers into the call
 
 2. reducers (./store/reducers/)
   - reducerUser.js: composite reducer that handles the user's data e.g authorization token, cart data
   - reducerStore.js composite reducer that handles the food menu data
  
 3. actions.js functions that dispatch relevant actions to the store e.g. REFRESH_MENU, ADD_ITEM_TO_CART, etc.
 
## Key Design Decisions w/Pros & Cons

 1. redux store's cart data only includes item id's and per item quantity; 
    - excluded are item price, total price, total quanity, total item count
    
    Cons: this made it slightly more difficult to update the cart widget's information displayed on the header.
          it would have been easier to pass the store's cart total price and quantity to the cart widget 
          
    Pros: tried to apply single source of truth principle. didn't want to include data derived from rest of store
          - (cart totals data were derived from item quantityes; prices derived from store menu's prices)
          If price information changes, or the menu changes, then the hope is that this decision will help keep 
          the cart price and total information always up-to-date.
          
### Implementation Details:
     - the cart widget updates its total information each time cart is updated.  Does this through a passed in
        prop { totalItems, totalCost } that is initialized in and passed from the react redux connect HOC.
     
  2. Authorization Hack:
     A professional app would authorize against an authorization service on the cloud, so this is a hack for demo purposes.
     - user's phone number is used as a faux authorization token stored in the redux store,
       - a user is sign'd in if the store containers this faux auth token
     - user's account is uniquely identified by their phone number
     - phone numeer and password credentials pair information is stored using AsyncStorage
  
  3. Food Menu Data Structure Decisions:
     After AWS server data is fetched, it is placed in three main object structures:
     - categoryDetails: basically the raw category data fetched from server, stripped of categories with 0 associated mains 
     - menuItemDetails: basically the raw mains item data fetched from server, with just the price, description and name data
     - categoryToMainsHash: this data structure contains derived data
         - it is used by the category page to easily find all mains associated with category
         
  4.  Initial Data Population and Refreshing of Data
     - The redux store captures the last time the menu data was updated
     - a decorator widget (AutoRefreshServerDataWidget) wraps certain app's UI components (e.g. WelcomeScreen)
        - it adds functionality to continually checks the aforementioned lastRefreshDate flag in the redux store.
          and kick off a refresh of data if that data is stale.
     - if lastRefreshDate is more than 10 minutes past, data fetch & refresh process is kicked off and lastRefreshDate updated

  5.  React Redux Separation of Container and Presentational Components
      - Initially I separated all containers (from  associated presentational components) into a separate folder
      - Decided to combine container components with their associated presentational components in same file.
      - the initial separated structure provided little actual value; plus the container components are generally tiny.
      - the combined file structure makes it easier to check what redux store props 
         are being passed in to presentation component
         
         
## Issues:

### Funtionality Issues
 
 1) user's last viewed screen isn't stored.  when they leave app and return, they always go through front door.
 2) authentication of user's credentials are mocked using local device AsynchStorage
    -- ideally, authentication is done with a legit server authentication process
    -- a mock authentication token is stored in the redux store
    -- password is stored in asynchStorage and is not encrypted
    -- multiple people can log into this test app, but there is one cart in redux store that is shared
       -- i'm ok with this because i don't think this app is meant to be used by multiple users anyway
 3) updated server data may cause unhandled issues
    -- if the structure of the redux store doesn't match the server's data, then we could be in for a big surprise
 4) if data is stale, the checkout process needs a workflow to update the cart and proactively notify user


### Unhandled Warning Message:

I'm not sure how to resolve this issue at the moment. Still investigating...

  -  Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or 
  -  forceUpdate on an unmounted component. This is a no-op.

  - Please check the code for the CartScreen component.

There are a zillion yellow warnings on my console that I ( and it seems the rest of the react native universe ) cannot seem 
to figure out how to remove:
e.g.: 9:13:10 PM: Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.

Please update the following components: Connect(ItemScreen)


### Code Maintenance Issues:
 1) need to implement complete set of unit tests.  Currently I just have basic unit tests on the reducers.
 2) PropType Checking: for my store data structures e.g. categoryDetails, I use dynamic string keys, and I'm not
    sure yet how to validate these. 
 3) I"m not sure how the redux-persist library works yet.  TBD

### Clean Code Standards
 1) styling is littered throughout - very messy
    -- consider using styled components to help bring order to chaos

## ================= Create React Native App Documentation =================
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Table of Contents

* [Updating to New Releases](#updating-to-new-releases)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm run ios](#npm-run-ios)
  * [npm run android](#npm-run-android)
  * [npm run eject](#npm-run-eject)
* [Writing and Running Tests](#writing-and-running-tests)
* [Environment Variables](#environment-variables)
  * [Configuring Packager IP Address](#configuring-packager-ip-address)
* [Adding Flow](#adding-flow)
* [Customizing App Display Name and Icon](#customizing-app-display-name-and-icon)
* [Sharing and Deployment](#sharing-and-deployment)
  * [Publishing to Expo's React Native Community](#publishing-to-expos-react-native-community)
  * [Building an Expo "standalone" app](#building-an-expo-standalone-app)
  * [Ejecting from Create React Native App](#ejecting-from-create-react-native-app)
    * [Build Dependencies (Xcode & Android Studio)](#build-dependencies-xcode-android-studio)
    * [Should I Use ExpoKit?](#should-i-use-expokit)
* [Troubleshooting](#troubleshooting)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [QR Code does not scan](#qr-code-does-not-scan)

## Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

## Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/en/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## Environment Variables

You can configure some of Create React Native App's behavior using environment variables.

### Configuring Packager IP Address

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:
```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.

## Adding Flow

Flow is a static type checker that helps you write code with fewer bugs. Check out this [introduction to using static types in JavaScript](https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb) if you are new to this concept.

React Native works with [Flow](http://flowtype.org/) out of the box, as long as your Flow version matches the one used in the version of React Native.

To add a local dependency to the correct Flow version to a Create React Native App project, follow these steps:

1. Find the Flow `[version]` at the bottom of the included [.flowconfig](.flowconfig)
2. Run `npm install --save-dev flow-bin@x.y.z` (or `yarn add --dev flow-bin@x.y.z`), where `x.y.z` is the .flowconfig version number.
3. Add `"flow": "flow"` to the `scripts` section of your `package.json`.
4. Add `// @flow` to any files you want to type check (for example, to `App.js`).

Now you can run `npm run flow` (or `yarn flow`) to check the files for type errors.
You can optionally use a [plugin for your IDE or editor](https://flow.org/en/docs/editors/) for a better integrated experience.

To learn more about Flow, check out [its documentation](https://flow.org/).

## Sharing and Deployment

Create React Native App does a lot of work to make app setup and development simple and straightforward, but it's very difficult to do the same for deploying to Apple's App Store or Google's Play Store without relying on a hosted service.

### Publishing to Expo's React Native Community

Expo provides free hosting for the JS-only apps created by CRNA, allowing you to share your app through the Expo client app. This requires registration for an Expo account.

Install the `exp` command-line tool, and run the publish command:

```
$ npm i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use a service like [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) if you want to get an IPA/APK for distribution without having to build the native code yourself.

### Ejecting from Create React Native App

If you want to build and deploy your app yourself, you'll need to eject from CRNA and use Xcode and Android Studio.

This is usually as simple as running `npm run eject` in your project, which will walk you through the process. Make sure to install `react-native-cli` and follow the [native code getting started guide for React Native](https://facebook.github.io/react-native/docs/getting-started.html).

#### Should I Use ExpoKit?

If you have made use of Expo APIs while working on your project, then those API calls will stop working if you eject to a regular React Native project. If you want to continue using those APIs, you can eject to "React Native + ExpoKit" which will still allow you to build your own native code and continue using the Expo APIs. See the [ejecting guide](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md) for more details about this option.

## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.
