## Overview

This is a mobile ecommerce application complete with store catalogue and cart.  It was created as a demonstration of capabilities to the NYC startup, Good Uncle.

By utilizing the React Native cross-platform framework, it runs on both iPhone and Andriod devices.  Much of the code-base can be shared with a web-app cousin, minus the navigation UI layer.  The redux state management layer is completely portable.

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
 1. Authorization User Interface Screen Components:
   - WelcomeScreen.js, SignInScreen.js, SignUpScreen.js: self-explanatory
 
 2. Application User Interface Menu Screens Components:
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
 5) If the data server is not responding when user first accesses the app, then the storefront should probably not accessed.
    -- would probably be good to have a loading screen that waits until data is successfully fetched, or times out, before
     navigating user to the storefront.
    -- in case of time-out user can be led to a descriptive error/oops page.

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
