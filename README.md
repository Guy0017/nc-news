# NC News App (Frontend)

NC News Today! is a frontend project built on Node v18.3.0.

It has the following functionality:

- Change logged in user from list of all users. This list is in alphabetical order. A user is assigned by default when app is first loaded
- Articles can be filtered by topic and sorted by category in ascending or descending order
- Add comment to an article under the logged in username
- Add new article and new topic under the logged in username
- Delete comments or articles that are posted by the logged in user
- Upvote or downvote an article or comment
- Pagination of comments and articles (limit 10 default)

This frontend project is hosted on Netlify: https://ncnews-guy.netlify.app/

The backend project is hosted on ElephantSQL(database) and Cyclic(API):

https://ncnews-guy.cyclic.app/api

## Clone

The repository for the frontend can be found on: https://github.com/Guy0017/nc-news

Enter the following terminal command to clone the respository locally:

```bash
$ git clone https://github.com/Guy0017/nc-news.git
```

Enter the following command to install all dependencies in the package.json:

```bash
$ npm install
```

Enter the following command to start the application:

```bash
$ npm start
```

The repository for the backend can be found on: https://github.com/Guy0017/ncnews

Follow the instruction in the readme if you wish to clone the backend.