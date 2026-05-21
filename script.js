

const themeToggleBtn = document.getElementById('themeToggleBtn');

const cartItemsContainer = document.getElementById('cartItemsContainer');

const subtotalElement = document.getElementById('subtotal');

const taxElement = document.getElementById('tax');

const totalElement = document.getElementById('total');

const addToCartButtons = document.querySelectorAll('.add-to-cart');

let shoppingCart = [];



const savedTheme = localStorage.getItem('theme');

if(savedTheme === 'dark'){
    document.body.classList.add('dark-mode');
}



themeToggleBtn.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    }

});



function updateCartDisplay(){

 
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;



    shoppingCart.forEach((item, index) => {

        subtotal += item.price;

        const cartItem = document.createElement('div');

        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>

            <button class="remove-btn" data-index="${index}">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);

    });



    const tax = subtotal * 0.10;

    const grandTotal = subtotal + tax;

 

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

    taxElement.textContent = `$${tax.toFixed(2)}`;

    totalElement.textContent = `$${grandTotal.toFixed(2)}`;



    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(button => {

        button.addEventListener('click', () => {

            const itemIndex = button.dataset.index;

            shoppingCart.splice(itemIndex, 1);

            updateCartDisplay();

        });

    });

}



addToCartButtons.forEach(button => {

    button.addEventListener('click', () => {

        const id = button.dataset.id;

        const name = button.dataset.name;

        const price = parseFloat(button.dataset.price);

        const item = {
            id,
            name,
            price
        };

        shoppingCart.push(item);

        updateCartDisplay();

    });

});