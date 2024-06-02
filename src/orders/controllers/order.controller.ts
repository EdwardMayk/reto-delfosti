
import { Request, Response } from 'express';
import { Order, OrderStatus } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { UserRepository } from '../../users/repository/user.repository';
import { ProductRepository } from '../../products/repository/product.repository';
import { UserRole } from '../../utils/enum/user-role.enum';
import { OrderRepository } from '../repository/order.repository';
import { OrderProduct } from '../../orders-products/entities/order-product.entity';
import { OrderProductRepository } from '../../orders-products/repository/order-product.repository';


export const createOrder = async (req: Request, res: Response) => {
    const { product_list, order_date, seller_id } = req.body;

    // Validate that products exist and get their details
    const products = await ProductRepository.findBy(
        product_list.map((p: { sku: string }) => p.sku)
    )

    if (products.length !== product_list.length) {
        return res.status(400).json({ message: 'Invalid product list' });
    }

    // Validate seller
    const seller = await UserRepository.findOne(seller_id);
    if (!seller || seller.role !== UserRole.SELLER) {
        return res.status(400).json({ message: 'Invalid seller' });
    }

    //Create order
    const newOrder = new Order();
    newOrder.order_date = order_date;
    newOrder.seller = seller;

    await OrderRepository.save(newOrder);

    //Create Order Product
    for (let i = 0; i < product_list.length; i++) {
        const orderProduct = new OrderProduct();
        orderProduct.order = newOrder;
        orderProduct.product = products[i];
        orderProduct.quantity = product_list[i].quantity;

        await OrderProductRepository.save(orderProduct);
    }

    return res.status(201).json({ order_number: newOrder.order_number, message: 'Order created successfully', order_date });

};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { order_number } = req.params;
    const { status } = req.body;

    const order = await OrderRepository.findOne({
        where: { order_number } as any,
        relations: ['seller', 'delivery_person', 'products']
    });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if(!Object.values(OrderStatus).includes(status)){
        return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    switch (status) {
        case OrderStatus.IN_PROCESS:
            order.reception_date = new Date().toISOString().split('T')[0];
            break;
        case OrderStatus.IN_DELIVERY:
            order.dispatch_date = new Date().toISOString().split('T')[0];
            break;
        case OrderStatus.RECEIVED:
            order.delivery_date = new Date().toISOString().split('T')[0];
            break;
    }


    await OrderRepository.save(order);

    return res.status(200).json({ message: 'Order status updated successfully' });
  
    
};
