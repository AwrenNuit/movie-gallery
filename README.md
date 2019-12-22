# Movie Gallery

## Description
This app displays a list of films. Users can use the SEARCH bar to find all movies matching the search query. If there are no results the page displays "NO RESULTS." Users can click on a film's photo to focus on that specific film. From that focus page the user can click on BACK or EDIT. BACK simply brings the user back to the main list page. EDIT brings the user to an edit screen where they can update the film's information. The edit page has CANCEL, SAVE, and DELETE buttons. CANCEL brings the user back to the focus page. SAVE updates the database with whatever changes had been made, then brings the user back to the focus page. DELETE asks the user if they are sure they want to delete the selected film. If yes, the film is removed from the database and the user is brought back to the main film list page.

## Technologies Used
- React
- Redux
- Saga
- Axios
- Node.js
- PostgreSQL

## Installation
- Clone or download this repository
- Run 'npm install' from the command line
- Set up the database, I recommend using Postico
- Use 'npm run server' and 'npm run client' to run the app

## Future Plans
- Allowing /edit page to persist upon page refresh
- Allow genre to be edited
- Allow genre to be added
- Allow user to add film (and genre)

Thank you to everyone at Prime Digital Academy for helping me learn a new skill.

If you have questions or concerns, email me at awren.nuit@gmail.com