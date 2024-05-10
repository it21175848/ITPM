const router = require("express").Router();
const {
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const ShopOwner = require("../Modals/Owner");

// Create Shop Owner
// POST /api/owners
router.post("/", authenticateTokenAdmin, async (req, res) => {
  const newOwner = new ShopOwner(req.body);
  newOwner
    .save()
    .then((owner) => {
      return res.status(200).json({
        owner,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Update a shop owner
// PUT /api/owners/:id
router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  ShopOwner.findByIdAndUpdate(id, req.body, { new: true })
    .then((owner) => {
      if (!owner) {
        return res.status(404).json({
          error: "Shop owner not found",
        });
      }
      return res.status(200).json({
        owner,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Delete a shop owner
// DELETE /api/owners/:id
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  ShopOwner.findByIdAndDelete(id)
    .then((owner) => {
      if (!owner) {
        return res.status(404).json({
          error: "Shop owner not found",
        });
      }
      return res.status(200).json({
        message: "Shop owner deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Get a shop owner
// GET /api/owners/find/:id
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  ShopOwner.findById(id)
    .then((owner) => {
      if (!owner) {
        return res.status(404).json({
          error: "Shop owner not found",
        });
      }
      return res.status(200).json({
        owner,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Get all shop owners
// GET /api/owners
router.get("/find/", async (req, res) => {
  ShopOwner.find()
    .then((owners) => {
      if (!owners) {
        return res.status(404).json({
          error: "No shop owners found",
        });
      }
      return res.status(200).json({
        owners,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
