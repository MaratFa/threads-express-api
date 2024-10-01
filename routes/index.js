const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/user-controller");
const { authenticateToken } = require("../middleware/auth");

const uploadDestination = "uploads";

// Показываем, где хранить загруженные файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/user/:id", authenticateToken, UserController.getUserById);
router.put("/user/:id", authenticateToken, UserController.updateUser);

module.exports = router;
