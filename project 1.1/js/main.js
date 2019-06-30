class Products {
    constructor(container='.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.cost = 0;
        this.init();
    }
    _fetchGoods() {
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Keyboard', price: 70},
            {id: 3, title: 'Mouse', price: 46},
            {id: 4, title: 'Gamepad', price: 68},
            {id: 5, title: 'Chair', price: 168},
        ];
    }
    _render() {
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    init() {
        this._fetchGoods();
        this._render();
        this._getProductsCost();
    }
    _getProductsCost() {
        for (let el of this.allProducts) {
            this.cost += el.price;
        }
        console.log(`Общая стоимость товаров: ${this.cost}`);
        // return this.cost;
    }
}

class ProductItem {
    constructor(product, img="https://placehold.it/200x150") {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.title}"> 
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

const products = new Products();


class Basket extends Products {
    constructor(container) {
        super(container='.product-list');  // в в контейнере другой список товаров
        this.quantity = 0;
    }
    _fetchGoods() {
        // получаем только те товары, что  добавил пользователь
    }
    _getProductsCost() {
        return `Итого: ${super._getProductsCost()}`
    }
    _getProductsQuantity() {
        // возвращает число выбранных товаров
    }
    _render() {
        // вернет по-другому отрисованную страницу с заказами
    }
    init() {
        this._fetchGoods();
        this._render();
    }
}

class BasketItem extends ProductItem {
    constructor(product, img) {
        super(product, img="https://placehold.it/200x150");     // наследует свойства класса ProductItem
    }
    render() {
        // return ...   вернет по-другому отрисованный элемент заказа
    }
    addProduct() {}         // позволяет увеличить количество выбранного товара
    reduceProduct() {}     // позволяет уменьшить количество выбранного товара
    deleteProduct() {}     // удаляет товар из корзины
}
