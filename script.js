document.addEventListener("DOMContentLoaded", () => {

    // THEME TOGGLE
    const themeToggleBtn = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme");

    // CHECK SAVED THEME
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // TOGGLE THEME
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // SAVE THEME
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // CART VARIABLES
    const cartContainer = document.getElementById("cart-container");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const grandTotalElement = document.getElementById("grand-total");

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    let shoppingCart = [];

    // UPDATE CART DISPLAY
    function updateCartDisplay() {

        // CLEAR OLD CART ITEMS
        cartContainer.innerHTML = "";

        // EMPTY CART MESSAGE
        if (shoppingCart.length === 0) {
            cartContainer.innerHTML =
                `<p class="empty-msg">Your cart is empty.</p>`;
        }

        // SHOW CART ITEMS
        shoppingCart.forEach((item, index) => {

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                </div>

                <button class="remove-btn" data-index="${index}">
                    Remove
                </button>
            `;

            cartContainer.appendChild(cartItem);
        });

        // CALCULATE SUBTOTAL
        let subtotal = 0;

        shoppingCart.forEach((item) => {
            subtotal += item.price;
        });

        // CALCULATE TAX
        const tax = subtotal * 0.10;

        // CALCULATE GRAND TOTAL
        const grandTotal = subtotal + tax;

        // UPDATE TOTALS
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;

        // REMOVE ITEM
        const removeButtons = document.querySelectorAll(".remove-btn");

        removeButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const index = button.dataset.index;

                shoppingCart.splice(index, 1);

                updateCartDisplay();
            });
        });
    }

    // ADD TO CART
    addToCartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const item = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: Number(button.dataset.price)
            };

            shoppingCart.push(item);

            updateCartDisplay();
        });
    });

    // INITIAL DISPLAY
    updateCartDisplay();

});