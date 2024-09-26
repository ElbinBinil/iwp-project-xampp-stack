const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Database connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce_db",
};

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Start transaction
    await connection.beginTransaction();

    // Create order
    const [orderResult] = await connection.execute(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, totalAmount]
    );
    const orderId = orderResult.insertId;

    // Create order items
    for (const item of items) {
      await connection.execute(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price]
      );

      // Update product stock
      await connection.execute(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.productId]
      );
    }

    // Commit transaction
    await connection.commit();
    await connection.end();

    res.status(201).json({ orderId, message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
});

// Get user's orders
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [userId]
    );
    await connection.end();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Get a single order
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await mysql.createConnection(dbConfig);
    const [orderRows] = await connection.execute(
      "SELECT * FROM orders WHERE id = ?",
      [id]
    );

    if (orderRows.length === 0) {
      await connection.end();
      return res.status(404).json({ message: "Order not found" });
    }

    const [itemRows] = await connection.execute(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id]
    );
    await connection.end();

    const order = orderRows[0];
    order.items = itemRows;

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
});

// Update order status (admin only)
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    await connection.end();

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
});

module.exports = router;
