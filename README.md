# Film Gallery

## Description

Duration: weekend project

This app displays a list of films. Users can use the SEARCH bar to find all films matching the search query. If there are no results the page displays "NO RESULTS." The BACK button brings the user to the main film list page. Users can click on a film's photo to focus on that specific film. From that focus page the user can click on BACK or EDIT. BACK simply brings the user back to the main list page. EDIT brings the user to an edit screen where they can update the film's information. The edit page has CANCEL, DELETE, and SAVE buttons. CANCEL brings the user back to the focus page. DELETE asks the user if they are sure they want to delete the selected film. If yes, the film is removed from the database and the user is brought back to the main film list page. SAVE updates the database with whatever changes had been made, then brings the user back to the focus page. On the home page users can click on ADD NEW FILMS AND GENRES. This brings the user to a page where they can add a new film, add a new genre, or set/add a film's genre. The BACK button brings the user to the main film list page.

To see the fully functional site, please visit: https://young-waters-19950.herokuapp.com/#/

## Technologies Used
- React
- Redux
- Redux-Saga
- Axios
- Node.js
- PostgreSQL
- Material-UI

## Installation
- Clone or download this repository
- Run 'npm install' from the command line
- Run 'npm install @material-ui/core @material-ui/icons' from the command line
- Set up the database, I recommend using Postico
- Use 'npm run server' and 'npm run client' to run the app

## Future Plans
- Making the delete confirmation look better
- Troubleshooting the not-quite-100% chance to update /edit page genre on add or remove
- Troubleshooting the rare case of not loading the selected film on the /details page

Thank you to the everyone at Prime Digital Academy for helping me learn a new skill and for being so supportive.

If you have questions or concerns, email me at awren.nuit@gmail.com
