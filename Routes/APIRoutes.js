const express = require('express');
const router = express.Router();
// const personsController = require('../controllers/personsController')
// const signupController = require('../controllers/signupController')
const itemController = require("../controllers/itemController")
const purchaseController = require('../controllers/PurchaseController')
// router.get('/get_all_persons', personsController.getPersons)
// router.post('/signup', signupController.signupEmployee)
router.post('/create-item', itemController.createItem)
router.get('/get-all-items', itemController.getAllItems)

router.post('/create-purchase-bill', purchaseController.createPurchaseBill)
router.delete('/delete-purchase-bill/:billId', purchaseController.deletePurchaseBill);
router.post('/update-purchase-bill', purchaseController.updatePurchaseBill);
router.get('/get-all-purchase-bills', purchaseController.getAllPurchaseBills)
module.exports = router;