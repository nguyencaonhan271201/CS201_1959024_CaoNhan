//FakeStoreAPI end point: https://fakestoreapi.com/products
//Variables
let products = []
let current_first = 0;
let prev_btn = document.querySelector('#prev-product');
let next_btn = document.querySelector('#next-product');

//Event listeners
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

prev_btn.addEventListener('click', function() {
    current_first = current_first - 4;
    if (current_first < 0) {
        current_first = products.length + current_first;
    }
    showProducts(current_first);
})

next_btn.addEventListener('click', function() {
    current_first = current_first + 4;
    if (current_first > (products.length - 1)) {
        current_first = 0;
    }
    showProducts(current_first);
})

//Helper functions
function fetchProducts() {
    let xhr = new XMLHttpRequest();
    xhr.open(
        'GET',
        'https://fakestoreapi.com/products',
        true
    )
    xhr.onload = function() {
        if (this.status == 200 && this.readyState == 4) {
            let result = JSON.parse(this.responseText);
            products = result;
            showProducts(0);
        } else {
            products = staticCatalog;
            showProducts(0);
        }
    }
    xhr.send();
}

function showProducts(first) {
    let product = document.querySelector('.product');
    let last = first + 3;
    if (last > (product.length - 1)) {
        last -= (products.length);
    }
    let showingProducts = []
    if (first < last) {
        for (let i = first; i <= last; i++) {
            showingProducts.push(products[i])
        }
    } else {
        for (let i = 0; i <= last; i++) {
            showingProducts.push(products[i])
        }
    }
    let html = '';
    for (let i = 0; i < showingProducts.length; i++) {
        let class_content = "text-blue";
        if (showingProducts[i].category == 'women clothing' || showingProducts[i].category == 'jewelery')
        {
            class_content = "text-pink"
        }
        html += `
            <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                <div class="product-item d-flex flex-column align-items-center justify-content-center">
                    <img src="${showingProducts[i].image}">
                    <p class="mt-2 text-center">${showingProducts[i].title}</p>
                    <h5 class="${class_content} text-center">$${showingProducts[i].price}</h5>
                </div>
            </div>
        `
    }
    product.innerHTML = html;
}
