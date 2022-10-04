const totalProducts = document.getElementById('totalProducts');
const botonCarrito = document.querySelectorAll('.botonCarrito');
const cart = document.getElementById('cart');
const totalItems = document.getElementById('totalItems');
const navbar = document.querySelectorAll('.navbar');

let ultimoScrollTop;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop ;
    if (scrollTop > ultimoScrollTop) {
        navbar.style.top = '-200px';
    } else {
        navbar.style.top = '20px';
    }

    ultimoScrollTop = scrollTop;
});


let products = [];

const setCount = () => {
    let totalCount = 0;
    
    for(let item in products){
        totalCount += Number(products[item].count);
    }

    totalItems.innerText = totalCount;
    return totalCount;
};

const totalPrice = () => {
    let totalCart = 0;
    for( let item in products){
        totalCart += Number(products[item].price * products[item].count);
    }
    totalProducts.innerText = totalCart;
    return totalCart;
};



const handleAddProduct = (e) => {
    e.preventDefault();

    if (!e.target.classList.contains('botonCarrito') ||
    e.target.classList.contains('disabled')
    ) {
        return;
    }

     for ( let item in products){
        if(products[item].name === e.target.dataset.name) {
            products[item].count++ ;
            setCount();
            products[item].price * products[item].count;
            totalPrice();
            productList();
            return;
        }
     }

    const newProduct = {
        img: e.target.dataset.img,
        name: e.target.dataset.name,
        price: e.target.dataset.price,
        count: e.target.dataset.count,
    };

    products.push(newProduct);
    console.log(newProduct);

    setCount();

    // totalPrice();
    productList();

};

const productList = () => {
    cart.innerHTML = products.map((product) => {
        return `
        <div class="cart__item">
            <div class="cart__item--content">
            <img 
                src="${product.img}"
                alt="pinguino"
                class="item-img"
            />
            <span>x${product.count}</span>
            <span>(c/u $ ${product.price})</span>
            <p class="cart__title">${product.name}</p>
            <span class="cart__price">${product.price * product.count}</span>
            </div>
        </div>
        `;
    }).join('');
};



botonCarrito.forEach((item) => {
    item.addEventListener ('click' , handleAddProduct);
}) ;


