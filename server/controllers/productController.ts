import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { mockProducts } from '../data/mockData.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

export const getProducts = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    if (isDBConnected()) {
      const products = await Product.find({ ...keyword, ...category });
      res.json(products);
    } else {
      let filtered = mockProducts;
      if (req.query.keyword) {
        const kw = (req.query.keyword as string).toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(kw));
      }
      if (req.query.category) {
        filtered = filtered.filter(p => p.category === req.query.category);
      }
      res.json(filtered);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    if (isDBConnected()) {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else {
      const product = mockProducts.find(p => p._id === req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (isDBConnected()) {
      const product = new Product({
        name: 'Sample name',
        price: 0,
        user: (req as any).user._id,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        sizes: ['M'],
      });
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } else {
      const newProduct = {
        _id: Math.random().toString(36).substr(2, 9),
        name: 'Sample name',
        price: 0,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        sizes: ['M'],
        rating: 0,
      };
      mockProducts.push(newProduct);
      res.status(201).json(newProduct);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, brand, category, countInStock, sizes } = req.body;

    if (isDBConnected()) {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.sizes = sizes;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else {
      const index = mockProducts.findIndex(p => p._id === req.params.id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], name, price, description, image, brand, category, countInStock, sizes };
        res.json(mockProducts[index]);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    if (isDBConnected()) {
      const product = await Product.findById(req.params.id);
      if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else {
      const index = mockProducts.findIndex(p => p._id === req.params.id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        res.json({ message: 'Product removed' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
