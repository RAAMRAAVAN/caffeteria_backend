const Purchase = require("../models/PurchaseModel");
const Item = require("../models/ItemModel");
const { incrementQuantity, decrementQuantity } = require("./itemController");
// const {sendBirthdayMessage} = require("../helpers/twilioHelper")
// Controller function for creating a person
exports.createPurchaseBill = (req, res) => {
    // console.log(res)
    const { Cash, Card, Upi, Credit, IUKD, billno, partyno, partyName, date, items, PaidAmount, CreditAmount, ModeOfPayment, BankName, TID, remark, ReferenceNo, TotalValue, TotalGST, TotalBillValue } = req.body;
    // console.log(billno, partyno, partyName, date, items, TotalValue, TotalGST, TotalBillValue)
    const purchaseBill = new Purchase({
        billno: billno,
        partyno: partyno,
        partyName: partyName,
        date: date,
        items: items,
        PaidAmount: PaidAmount,
        Cash: Cash,
        Card: Card,
        Upi: Upi,
        Credit: Credit,
        IUKD, IUKD,
        CreditAmount: CreditAmount,
        ModeOfPayment: ModeOfPayment,
        BankName: BankName,
        TID: TID,
        remark: remark,
        ReferenceNo: ReferenceNo,
        TotalValue: TotalValue,
        TotalGST: TotalGST,
        TotalBillValue: TotalBillValue
    });
    // console.log(purchaseBill);
    purchaseBill.save()
        .then((savedBill) => {
            items.map((item) => {
                incrementQuantity(item)
            })
            res.json({ id: savedBill._id, status: true, message: "Bill Saved Successfully" });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ status: false, error: 'Internal Server Error' });
        });
};

// POST request to update purchase details
// router.post('/updatePurchaseBill', (req, res) => {
exports.updatePurchaseBill = async (req, res) => {
    const { Cash, Card, Upi, Credit, IUKD, billno, partyno, partyName, date, items, PaidAmount, CreditAmount, ModeOfPayment, BankName, TID, remark, ReferenceNo, TotalValue, TotalGST, TotalBillValue } = req.body;

    try {
        // Find the existing purchase details
        const existingPurchase = await Purchase.findOne({ billno: billno });

        if (!existingPurchase) {
            return res.status(404).json({ status: false, error: 'Purchase details not found' });
        }

        // Decrement the quantity of previous items
        existingPurchase.items.forEach((item) => {
            decrementQuantity(item);
        });

        // Update the purchase details
        const updatedPurchaseDetails = {
            // billno: billno,
            partyno: partyno,
            partyName: partyName,
            date: date,
            items: items,
            PaidAmount: PaidAmount,
            Cash: Cash,
            Card: Card,
            Upi: Upi,
            Credit: Credit,
            IUKD, IUKD,
            CreditAmount: CreditAmount,
            ModeOfPayment: ModeOfPayment,
            BankName: BankName,
            TID: TID,
            remark: remark,
            ReferenceNo: ReferenceNo,
            TotalValue: TotalValue,
            TotalGST: TotalGST,
            TotalBillValue: TotalBillValue
        };

        const updatedBill = await Purchase.findOneAndUpdate({ billno: billno }, updatedPurchaseDetails, { new: true });

        // If needed, you can also update the quantity of items here by calling incrementQuantity function
        items.forEach((item) => {
            incrementQuantity(item);
        });

        res.json({ status: true, message: 'Purchase details updated successfully', data: updatedBill });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
};
// Modified delete endpoint to fetch items before deleting the bill
exports.deletePurchaseBill = (req, res) => {
    const { billId } = req.params;

    // Validate if billId is provided
    if (!billId) {
        return res.status(400).json({ status: false, error: 'Bill ID is required' });
    }

    // Find the bill and fetch the items field
    Purchase.findById(billId)
        .then((bill) => {
            if (!bill) {
                return res.status(404).json({ status: false, error: 'Bill not found' });
            }

            const items = bill.items;

            // Delete the bill
            Purchase.findByIdAndDelete(billId)
                .then(() => {
                    // Perform decrementQuantity or other actions using the fetched items
                    items.map((item) => {
                        decrementQuantity(item);
                    });

                    res.json({ status: true, message: 'Bill deleted successfully' });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ status: false, error: 'Internal Server Error' });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ status: false, error: 'Internal Server Error' });
        });
};

exports.getAllPurchaseBills = (req, res) => {
    // Use the Item model to find all items in the database
    Purchase.find()
        .then((items) => {
            // Send the array of items as the response
            res.json({ status: true, items });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error in Fetching Items');
        });
};