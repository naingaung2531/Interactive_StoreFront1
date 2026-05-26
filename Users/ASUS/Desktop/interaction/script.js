$(document).ready(function () {


    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {
        $("body").addClass("dark-mode");
    }


    $("#theme-toggle").click(function () {

        $("body").toggleClass("dark-mode");

      
        if ($("body").hasClass("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });



    let shoppingCart = [];



    function updateCartDisplay() {

        $("#cart-container").html("");

        if (shoppingCart.length === 0) {

            $("#cart-container").html(
                `<p class="empty-msg">Your cart is empty.</p>`
            );

        }


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

   

        let subtotal = 0;

        $.each(shoppingCart, function (index, item) {
            subtotal += item.price;
        });

        const tax = subtotal * 0.10;
        const grandTotal = subtotal + tax;

 
        $("#subtotal").text(`$${subtotal.toFixed(2)}`);

        $("#tax").text(`$${tax.toFixed(2)}`);

        $("#grand-total").text(`$${grandTotal.toFixed(2)}`);

    }


    $(".add-to-cart-btn").click(function () {

        const item = {

            id: $(this).data("id"),

            name: $(this).data("name"),

            price: Number($(this).data("price"))

        };

        shoppingCart.push(item);

        updateCartDisplay();

    });

 

    $(document).on("click", ".remove-btn", function () {

        const index = $(this).data("index");

        shoppingCart.splice(index, 1);

        updateCartDisplay();

    });



    updateCartDisplay();

});