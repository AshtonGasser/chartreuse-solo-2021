# Chartreuse

## Description 

Duration: 2 Week Sprint

This application contains 4 parts: Ingredient Customization and storage, cocktail Creation with charts, all cocktails page, and a dashboard that displays all of the cocktails created.

On the Ingredient page the user is greeted with over 100 ingredients in their table to play around with to make drinks, the user can fill out the inputs to add more ingredients to their table. the user can also sort the table by columns or filter by whatever they want. the user can select multiple ingredients at a time to delete. If ingredients need to be deleted, a delete button is also shown with an alert to verify this action is correct. users do not have the ability to edit or delete admin ingredients.  lastly the user can edit inline if the want to make a change. 

The app has an admin login so i can keep adding popular ingredients and cocktails so they are available for all users.

The Create Cocktail page lets the user input multiple ingredients into the search bar this renders them onto the card with an input for the measurements .
the user can adjust the measurements as much as they want before they post .  while the user starts inputting the measurements a chart will render showing a breakdown of what is in their drinks. Once the user is satisfied with their cocktail, they can click post and the cocktail will post to their dashboard.

On the user dashboard the user will find cards with their cocktail info on them , the front of the card will have the drink name, description, date created, edit/ delete button and an arrow button . When the user clicks the arrow button the card will flip over displaying the cocktail ingredients, and the steps to make the drink, clicking the ingredients will show all of the cocktails containing those ingredients . If a cocktail needs to be deleted, a delete button is also shown with an alert to verify this action is correct.

Lastly the user can go to the All page they will find all cocktails made by the admin and other users there. Users cannot delete other users cocktails. 



## Application GIF
#### Dashboard OverView / Landing Page

 
 ![](dash.gif)

 #### Ingredient Table Overview

![](ingredient.gif)
#### Cocktail Creation Page Overview


![](cocktail.gif)
 ### Prerequisites 

- [Node.js](https://nodejs.org/en/)
- [Postico](https://eggerapps.at/postico/)
- PostgreSQL
 ## Installation 

1. Fork and clone project
2. Open with the editor of your choice
3. Create a database through Postico called `prime_app`
4. Data to setup table found in `database.sql` file
5. Open terminal and run `brew services start postgresql`
6. Run `npm install` to get dependencies for `package.json`
7. Split terminal window
8. `npm run server`
9. `npm run client`
10. Browser will load and direct to `http://localhost:3000`
11. When finished in each terminal window press `control + C` to stop server and client
12. Stop postgresql in terminal with `brew services stop postgresql`
 ## Built With :
- React
- Redux
- Redux-Saga
- Moment.js
- Chart.js
- Particle.React
- Express.js
- PostgreSQL
- Passport
- Javascript
- Material-UI
- HTML
- CSS
 ## Acknowledgment 

Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.
 ## Support  

If you have suggestions or issues, please email me at ashtongasser@gmail.com
