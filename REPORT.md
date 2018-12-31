# SMAP Energy Tech challenge 

This is the frontend coding challenge for my SMAP Energy Tech application. Below, there are details of the implementation, problems and technical decisions made throughout the development process.

## Directory structure

A `dev` folder was added under `frontend/app` folder where there are all the source files needed for the app. The `static` folder holds all the generated resources.

## Technical features

It was used NPM (Node Package Manager) as the dependency management tool. The app was developed in VueJS version 2.5 with other complementary tools:

* **Vuex**. Tool to manage state changes and fire them in the components. A vuex store is located under subfolder store where it is defined actions and mutations to handle state changes.
* **Axios**. Library to handle requests to the backend API. It is also used to define request mocks for a development environment.
* **Jest + Vue test Utils**. These tools are used to create automated tests for the components and for the store.
* **Eslint with vue plugin**. Tool to aim good code quality for vue and js files.
* **Bootstrap**. CSS framework used across the app. This allows to have web responsive functionality using @media queries and special classes.
* **Sass/Scss**. CSS pre-processor to write clearer and more mantainable stylesheet files. 
* **D3**. Data visualization tool used to render statistics data in the statistics component.
* **Webpack 4**. Module bundler and packetization tool. There are two important files for webpack: webpack.dev.js which defines the configuration for development environment; and webpack.prod.js, which defines the configuration for the production environment. Both files import a common configuration of webpack.common.js. The production environment allows to generate all the required resources. These resources are placed under the static folder and are referenced by the base.html file.

The app was developed in `Chrome` browser.

## Instructions to build and run the app

### To build the app:

1- Install latest version of Node Package Manager.  
2- Open a terminal and point to the `dev` folder: `cd <root_smap_coding_challenge>/frontend/app/dev`.    
3- Download project dependencies with command: `npm install`.  
4- Execute command: `npm run build`.  
5- Check if the resources were generated in `static` folder.  

### To run the app:

1- Install latest version of Node Package Manager.  
2- Open a terminal and point to the `dev` folder: `cd <root_of_smap_coding_challenge>/frontend/app/dev`.   
3- Download project dependencies with command: `npm install`.  
4- Execute command: `npm run start`.  
5- Open a browser and enter the url: http://localhost:8088. You will see a welcome page.


## Decisions made

1-	In both components, consumer Ids are displayed to make the difference between two consumers created with the same name and consumer type.  
2-	In consumers component, frontend pagination was added to display pages of records.  
3-	I18n was added to enable internationalization capability across the app.

## Cross browser compatibility

The app was tested in the following browsers: Internet Explorer 11, Firefox 64 and Chrome 71.

## Testing

Tests are placed under the `__tests__` folder. There is one test for each component and an extra test for the vuex store. Test files: `Statistics.test.js`, `Consumers.test.js` and `Store.test.js`;

To run the tests, check the following steps:

1- Install latest version of Node Package Manager.
2- Open a terminal and point to the `dev` folder: `cd <root_of_smap_coding_challenge>/frontend/app/dev`.  
3- Download project dependencies with command: `npm install`.
4- Execute command: `npm run test`.

## Future work

As future work, I would setup a service worker to allow the client to access the site even though the server backend would not be running.

