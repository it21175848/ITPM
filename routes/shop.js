const router = require("express").Router();
const {
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const Shop = require("../Modals/Shop");

// Create Shop
// POST /api/shops
router.post("/", authenticateTokenAdmin, async (req, res) => {
  const newShop = new Shop(req.body);
  newShop
    .save()
    .then((shop) => {
      return res.status(200).json({
        shop,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Update a shop
// PUT /api/shops/:id
router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Shop.findByIdAndUpdate(id, req.body, { new: true })
    .then((shop) => {
      if (!shop) {
        return res.status(404).json({
          error: "Shop not found",
        });
      }
      return res.status(200).json({
        shop,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Delete a shop
// DELETE /api/shops/:id
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Shop.findByIdAndDelete(id)
    .then((shop) => {
      if (!shop) {
        return res.status(404).json({
          error: "Shop not found",
        });
      }
      return res.status(200).json({
        Message: "Shop deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Get a shop
// GET /api/shops/find/:id
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  Shop.findById(id)
    .then((shop) => {
      if (!shop) {
        return res.status(404).json({
          error: "Shop not found",
        });
      }
      return res.status(200).json({
        shop,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get all shops
// GET /api/shops
router.get("/find/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  if (qNew) {
    Shop.find()
      .sort({ _id: -1 })
      .limit(5)
      .then((shops) => {
        if (!shops) {
          return res.status(404).json({
            error: "No shops found",
          });
        }
        return res.status(200).json({
          shops,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
  if (qCategory) {
    Shop.find({
      category: qCategory,
    })
      .then((shops) => {
        if (!shops) {
          return res.status(404).json({
            error: "No shops found",
          });
        }
        return res.status(200).json({
          shops,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  } else {
    Shop.find()
      .then((shops) => {
        if (!shops) {
          return res.status(404).json({
            error: "No shops found",
          });
        }
        return res.status(200).json({
          shops,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
});

module.exports = router;
