import { Request, Response } from "express";
import Product from "../models/Product-model";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ msg: "Producto Agregado", data: product });
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]],
      // limit:4
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

const getProductID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    // const product =  await Product.findOne({where:{id}})
    if (!product) return res.status(404).json({ msg: "Product Not Found" });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const updateProductID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: "Product Not Found" });
    //!primera forma
    // const { name , price , availability } = req.body
    // product.name =  name,
    // product.price=price,
    // product.availability=availability
    // const updateProduct = await product.save()
    // ! Segunda Forma
    const updateProduct = await product.update(req.body);

    res.status(200).json({ msg: "Producto Actualizado", data: updateProduct });
  } catch (error) {
    console.log(error);
  }
};

const updateAvailability = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product) return res.status(404).json({msg:'Product not found'})

    product.availability = !product.dataValues.availability
    await product.save()
    res.status(201).json({data:product})    
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product) return res.status(404).json({msg:'Product not found'})
    await product.destroy()
    res.status(201).json({msg:'delete product'})
      
  } catch (error) {
    console.log(error)
  }
}


export { createProduct, getProducts, getProductID, updateProductID , updateAvailability , deleteProduct }
