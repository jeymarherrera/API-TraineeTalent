
const { Router } = require("express");
const { pay, success } = require("../controllers/paypal");
const router = Router();

router.post('/pay', pay);
router.get('/success', success)


module.exports = router;
