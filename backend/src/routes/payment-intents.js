// C:\Users\hanos\nextall\backend\src\routes\payment-intents.js

const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment-intents");
router.post("/payment-intents", paymentController.payment_intents);

module.exports = router;
