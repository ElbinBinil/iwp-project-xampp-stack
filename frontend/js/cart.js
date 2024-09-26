<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Store - Cart</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="cart.html" class="active">Cart</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="signup.html">Sign Up</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Your Shopping Cart</h1>
        <section id="cart-items">
            <!-- Cart items will be dynamically loaded here -->
        </section>
        <div id="cart-total">
            <p>Total: $<span id="total-amount">0.00</span></p>
            <a href="checkout.html" class="btn">Proceed to Checkout</a>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 E-commerce Store. All rights reserved.</p>
    </footer>

    <script src="js/cart.js"></script>
</body>
</html>