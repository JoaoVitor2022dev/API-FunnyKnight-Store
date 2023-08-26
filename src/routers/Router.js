const express = require("express"); 
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/product", require("./ProductRoutes"));

module.exports = router;