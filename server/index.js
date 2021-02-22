const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require("./routes");
const middleware = require("./middleware");

//Express Middleware
app.use(middleware.corsHandler)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Get Routes from express Router
app.use(routes)

const port = 1369;
app.listen(port, () => {
   console.log(`Listening at port: ${port}`); 
})
