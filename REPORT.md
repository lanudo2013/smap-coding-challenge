# SMAP Energy Tech challenge 

This is the coding challenge for my SMAP Energy Tech application. Below, there are details of the implementation, problems and technical decisions.

## Technical features

The app was developed in VueJS version 2.5 with other complementary tools:

* **Vuex**. Tool to manage state changes and fire them in presentational components. A vuex store is located under subfolder store where it is defined actions and mutations of state changes.
* **Axios**. Library to handle requests to the backend API. It is also used to define request mocks for a development environment.
* **Jest + Vue test Utils**. These tools are used to create automated tests for the components and for the store.
* **Eslint with vue plugin**. Tool to aim good code quality for vue and js files.
* **Sass/Scss**. CSS pre-processor to write clearer and more mantainable stylesheet files. @media queries are used to handle web responsiveness which is suitable to display the components in both desktop and mobile devices.
