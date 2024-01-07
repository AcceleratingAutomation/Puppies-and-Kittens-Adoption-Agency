- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Node.js LTS version which can be found [here](https://nodejs.org/en/download/). The course is upto date using this version at all times.
This course uses v4.0.0 of Material-UI library

### - What is the React version need for this course ?
********************
We are using `react` >=16.8.0 and `react-dom` >= 16.8.0 at all times. 

`npm install`

`npm start`

### - How do I run the Client application in browser?
To run the app in the development mode,
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
We are using Chrome Developer console in this course.

### Where is the Node server running?
Your server is will run at port 5000 and the URL for server APIs is [http://localhost:5000](http://localhost:5000).

### Is it mandatory to use Material-UI library for Styling?
No, feel free to use simple CSS for styling or any other styling library you like. The focus of this course is to 
understand the use of JSON Web Token to secure the backend APIs and the front end styling is just an 
extra beautification layer.  

### How to test the backend APIs using CLI and Postman?
Install  [Postman](https://www.postman.com/) on your machine and start creating the collections where you 
can keep track of the API end points currently under testing. They have extensive documentation on how to use the tool.
in case your are interested. 

### What user credentials are used in the Bookie App?
Below are the credentials you may want to use when logging to the app as member or admin.

**Member** 
```bash
deeksha30
kdje89#$%
```

**Admin**
```bash
zenmade23
728193kfej**(
``` 

### How do I start the server?
Go inside the `server/` directory and run teh command below.
```bash
node server.js
```
**Note:** Make sure you restart your server each time you checkout a new branch for every module and for 
every code change in the server side code.  

Below are the contents of `variables.env` file.
```
SECRET=")x2f-l-opsnd)w!!z2m7ykvony99pt@6@6m+=q2uk3%w8*7$ow"
ALGORITHM="HS256"
ISSUER="BOOKIE_ORG"
EXPIRY="1h"
```
