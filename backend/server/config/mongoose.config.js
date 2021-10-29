const mongoose = require("mongoose")
require("dotenv").config()

mongoose
    .connect(
        "mongodb://mongodb:27017/portfolio",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
    )
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.log(err));



