import { Router } from 'express';
import { createOrder, updateOrderStatus } from '../controllers/order.controller';
import { authenticateJWT, isAuthorized } from '../../libs/verification-token';
import { UserRole } from '../../utils/enum/user-role.enum';
import { body, param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_list
 *               - order_date
 *               - seller_id
 *             properties:
 *               product_list:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sku:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               order_date:
 *                 type: string
 *                 format: date
 *               seller_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/orders',
    authenticateJWT,
    isAuthorized([UserRole.SELLER]),
    [
        body('product_list').isArray().withMessage('Product list must be an array'),
        body('product_list.*.sku').isString().withMessage('SKU must be a string'),
        body('product_list.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
        body('order_date').isISO8601().withMessage('Order date must be a valid date'),
        body('seller_id').isInt().withMessage('Seller ID must be an integer')
    ],
    createOrder
);

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, In Process, In Delivery, Received]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.patch('/orders/:orderId/status',
    authenticateJWT,
    isAuthorized([UserRole.SELLER, UserRole.MANAGER]),
    [
        param('orderId').isInt().withMessage('Order ID must be an integer'),
        body('status').isIn(['Pending', 'In Process', 'In Delivery', 'Received']).withMessage('Invalid status')
    ],
    updateOrderStatus
);

export default router;