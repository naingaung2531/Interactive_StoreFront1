$(document).ready(function () {

    // =========================
    // THEME TOGGLE
    // =========================

    const savedTheme = localStorage.getItem("theme");

    // LOAD SAVED THEME
    if (savedTheme === "dark") {
        $("body").addClass("dark-mode");
    }

    // TOGGLE THEME
    $("#theme-toggle").click(function () {

        $("body").toggleClass("dark-mode");

        // SAVE THEME
        if ($("body").hasClass("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });

    // =========================
    // CART VARIABLES
    // =========================

    let shoppingCart = [];

    // =========================
    // UPDATE CART DISPLAY
    // =========================

    function updateCartDisplay() {

        $("#cart-container").html("");

        // EMPTY CART
        if (shoppingCart.length === 0) {

            $("#cart-container").html(
                `<p class="empty-msg">Your cart is empty.</p>`
            );

        }

        // SHOW CART ITEMS
        $.each(shoppingCart, function (index, item) {

            $("#cart-container").append(`

                <div class="cart-item">

                    <div class="cart-item-details">

                        <span class="cart-item-title">
                            ${item.name}
                        </span>

                        <span>
                            $${item.price.toFixed(2)}
                        </span>

                    </div>

                    <button
                        class="remove-btn"
                        data-index="${index}">

                        Remove

                    </button>

                </div>

            `);

        });

        // =========================
        // CALCULATE TOTALS
        // =========================

        let subtotal = 0;

        $.each(shoppingCart, function (index, item) {
            subtotal += item.price;
        });

        const tax = subtotal * 0.10;
        const grandTotal = subtotal + tax;

        // UPDATE UI
        $("#subtotal").text(`$${subtotal.toFixed(2)}`);

        $("#tax").text(`$${tax.toFixed(2)}`);

        $("#grand-total").text(`$${grandTotal.toFixed(2)}`);

    }

    // =========================
    // ADD TO CART
    // =========================

    $(".add-to-cart-btn").click(function () {

        const item = {

            id: $(this).data("id"),

            name: $(this).data("name"),

            price: Number($(this).data("price"))

        };

        shoppingCart.push(item);

        updateCartDisplay();

    });

    // =========================
    // REMOVE ITEM
    // =========================

    $(document).on("click", ".remove-btn", function () {

        const index = $(this).data("index");

        shoppingCart.splice(index, 1);

        updateCartDisplay();

    });

    // =========================
    // INITIAL LOAD
    // =========================

    updateCartDisplay();

});