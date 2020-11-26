const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./app/models");
var corsOptions = {
    origin: "http://localhost:8081"
};

const {
    bindCurrentNamespace,
    setCurrentTenantId
} = require('./app/lib/storage')

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bindCurrentNamespace);
app.use((req, res, next) => {
    console.log(req.body);
    // Get current user from session or token
    // const user = req.user
    const id = req.body.tenantId
    console.log(id);

    // Get current tenant from user here
    // Make sure its a string
    const tenantId = id

    setCurrentTenantId(id, tenantId);
    next();
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to bezkoder application."
    });
});

// require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});