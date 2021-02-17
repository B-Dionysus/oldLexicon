const router = require("express").Router();
const eventRoute = require("./event")
const authRoute = require("./auth")
// const characterRoute = require("./character");
// const questionsRoute = require("./questions");
// const shipRoute = require("./ship");
// const locationRoute=require("./location");
// const messageRoute=require("./message");

console.log("Hello?");
// generic routes
router.use("/events", eventRoute);
router.use("/auth", authRoute);
// router.use("/questions", questionsRoute);
// router.use("/ship", shipRoute);
// router.use("/location", locationRoute);
// router.use("/message", messageRoute);


module.exports = router;
