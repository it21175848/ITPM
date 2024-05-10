const router = require("express").Router();
const {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const Parking = require("../Modals/Parking");

// POST a new parking booking
router.post("/", authenticateTokenAdmin, async (req, res) => {
        const newParking = new Parking(req.body);
        newParking.save()
        .then((parking) => {
            return res.status(200).json({
                parking,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: err,
            });
          });
      });

// GET all parkings
router.get('/', async (req, res) => {
    try {
        const parkings = await Parking.find();
        res.status(200).json(parkings);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET a specific parking slot by ID
router.get("/:id", async (req, res) => {
    try {
      const parking = await Parking.findById(req.params.id);
      if (!parking) {
        return res.status(404).json({ error: "Parking slot not found" });
      }
      res.status(200).json(parking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // UPDATE a parking slot by ID
  router.put("/:id", authenticateTokenAdmin, async (req, res) => {
    try {
      const updatedParking = await Parking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedParking) {
        return res.status(404).json({ error: "Parking slot not found" });
      }
      res.status(200).json(updatedParking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE a parking slot by ID
  router.delete("/:id", authenticateTokenAdmin, async (req, res) => {
    try {
      const deletedParking = await Parking.findByIdAndDelete(req.params.id);
      if (!deletedParking) {
        return res.status(404).json({ error: "Parking slot not found" });
      }
      res.status(200).json({ message: "Parking slot deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
