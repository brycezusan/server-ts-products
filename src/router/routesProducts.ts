import express from "express";
import { body, param } from "express-validator";
import { handleInputError } from "../middlewares";
import {
  createProduct,
  getProducts,
  getProductID,
  updateProductID,
  updateAvailability,
  deleteProduct
} from "../handlers/product";

const router = express.Router();

router.post(
  "/",
  // Validacion
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price is Number")
    .custom((value) => value > 0)
    .withMessage("Price not valid"),
  handleInputError,
  createProduct
);

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputError,
  getProductID
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  body("name").notEmpty().withMessage("Name is required"),
  body("price").notEmpty().withMessage("Price is required"),
  handleInputError,
  updateProductID
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputError,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputError,
  deleteProduct
);

export default router;
