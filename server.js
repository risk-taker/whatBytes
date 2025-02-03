import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.send("Hello world!!!!!!");
})

// routes
import routes from "./routes/index.js";
app.use(routes);


app.use(errorHandler);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
