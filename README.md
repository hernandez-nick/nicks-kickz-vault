# Nick's Kickz Vault

![Nick's Kickz Vault screenshot](https://ibb.co/B9Nr2Gr)

## Description

**Nick's Kickz Vault** is a full-stack CRUD app for sneaker collectors.
Users can sign up, sign in, and manage their own personal shoe vault.
Each pair includes details like brand, model, colorway, size, retail price,
deadstock status, image URL, and a short description.

## Pseudocode

App Setup:

- Connect Express server to MongoDB.
- Configure middleware for sessions, method override, and parsing form data.
- Add authentication routes and protected shoe routes.

User Auth:

- User can sign up with username and password.
- Validate unique username and matching passwords.
- Hash password before saving user.
- User can sign in and sign out.

Create Shoe:

- User opens new shoe form.
- User submits shoe details.
- Save shoe with current user as owner.

Read Shoes:

- Show only the logged-in user's shoes on the index page.
- User can open a show page to view one shoe in detail.

Update Shoe:

- User opens edit form for a selected shoe.
- User updates fields and submits form.
- Save changes and redirect to show page.

Delete Shoe:

- User opens confirm delete page.
- If confirmed, remove shoe from database.
- Redirect back to index page.

Error Handling:

- If routes fail or data is missing, render error page with message.

## Getting Started

[Trello](https://trello.com/b/UVC3uBCo/nicks-kickz-vault)

[GitHub](https://github.com/hernandez-nick/nicks-kickz-vault)

[Deployed project link]()

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- express-session
- bcrypt
- method-override
- DotENV

## Attributions

[MDN](https://developer.mozilla.org/en-US/)

[W3Schools](https://www.w3schools.com/)

## Next Steps

- Add search and filter options (brand, size, deadstock).
- Add image upload support instead of URL-only images.
- Add sort options (recently added, price, brand).
- Add pagination for larger collections.
- Improve form validation and error feedback.
- Add a total for the financial value of entire collection.
