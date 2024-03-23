const Item = require("../models/ItemModel");
// Controller function for creating a person
exports.createItem = (req, res) => {
    // Save the image path or unique name to the database
    // let id = req.body.id;
    // console.log("id=",id);
    const item = new Item({
        label: req.body.itemName,
        batchNo: req.body.batchNo,
        expDate: req.body.expDate,
        discountApplicable: req.body.discount,
        purchasePrice: req.body.pr,
        MRP: req.body.mrp,
        GST: req.body.gst,
        status: req.body.status,
        currentStock: 0
      });
    
      item.save()
        .then((savedItem) => {
          res.json({ id: savedItem._id, status: true, message: "Item Added Successfully" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error in Adding Item');
        });
    // res.status(200).send('Item Creation');
  };

// Controller function for fetching all items
exports.getAllItems = (req, res) => {
  // Use the Item model to find all items in the database
  Item.find()
      .then((items) => {
          // Send the array of items as the response
          res.json({ status: true, items });
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error in Fetching Items');
      });
};

exports.incrementQuantity = (item) => {
  console.log(item.id)
  // console.log("current stock",item.currentStock)
  console.log("add stock",item.quantity)
  Item.findByIdAndUpdate(
    item.id,
    { $inc: { currentStock: item.quantity } },
    { new: true } // Return the updated document
)
    .then((updatedItem) => {
        if (!updatedItem) {
            console.log("items added")
        }
        else{
          console.log("error")
        }
    })
    .catch((err) => {
        console.error(err);
        // res.status(500).send('Error in updating employee details');
    });
}

exports.decrementQuantity = (item) => {
  console.log(item.id);
  console.log("subtract stock", item.quantity);

  Item.findByIdAndUpdate(
      item.id,
      { $inc: { currentStock: -item.quantity } }, // Use negative value to decrement
      { new: true } // Return the updated document
  )
      .then((updatedItem) => {
          if (!updatedItem) {
              console.log("Error: Item not found");
          } else {
              console.log("Quantity decremented successfully");
          }
      })
      .catch((err) => {
          console.error(err);
          // Handle the error as needed, e.g., res.status(500).send('Error in updating item details');
      });
};
