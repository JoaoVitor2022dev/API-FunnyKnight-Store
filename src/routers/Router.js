const express = require("express"); 
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/products", require("./ProductRoutes"));
router.use("/api/admin", require("./AdminUserRouters"));
router.use("/api/address", require("./AddressRoutes"));


router.get("/", (req, res) => {
   res.json({ "hellow": "wolrd" }); 
})

module.exports = router;
