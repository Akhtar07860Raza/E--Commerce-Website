import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import { mockOrders } from '../data/mockData.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

export const addOrderItems = async (req: Request, res: Response) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    if (isDBConnected()) {
      const order = new Order({
        orderItems,
        user: (req as any).user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } else {
      const newOrder = {
        _id: Math.random().toString(36).substr(2, 9),
        orderItems,
        user: (req as any).user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: false,
        isDelivered: false,
        createdAt: new Date().toISOString(),
      };
      mockOrders.push(newOrder as any);
      res.status(201).json(newOrder);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    if (isDBConnected()) {
      const orders = await Order.find({}).populate('user', 'id name');
      res.json(orders);
    } else {
      res.json(mockOrders);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
