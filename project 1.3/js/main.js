const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        userSearch: '',
        imgCatalog: 'https://placehold.it/200x150',
        productsBasket: [],
        imgBasket: 'https://placehold.it/50x100',
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(el) {
            let find = this.productsBasket.find(product => product.id_product === el.id_product);
            if (find) {
                find.quantity++;
            } else {
                let newProduct = Object.assign({quantity: 1}, el);
                this.productsBasket.push(newProduct);
            }
        },
        delProduct(el) {
            let find = this.productsBasket.find(product => product.id_product === el.id_product);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.productsBasket.splice(this.productsBasket.indexOf(find), 1);
            }
        },

        filter() {
        let regexp = new RegExp(this.userSearch, 'i');
        this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    }
});

// let getRequest = url => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> xhr = new ActiveXObject()
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4) {
//                 if (xhr.status !== 200){
//                     reject('error')
//                 } else {
//                     resolve(xhr.responseText)
//                 }
//             }
//         };
//         xhr.send()
//     })
// };
// getRequest(url).then(data => console.log(data));

// class Products {
//     constructor(basket, url='/catalogData.json', container='.products') {
//         this.basket = basket;
//         this.url = url;
//         this.container = container;
//         this.data = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//         this.getJson()
//           .then(data => this.processingData(data));
//     }
//
//     /**
//      * Получает данные с сервера
//      * @param url адрес, куда будет отправлен запрос
//      * @returns {Promise<any | void>} возвращает данные в формате json
//      */
//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//           .then(result => result.json())
//           .catch(error => console.log(error));
//     }
//
//     /**
//      * Преобразует полученные данные в новый массив
//      * @param data массив данных, которые получили с сервера
//      */
//     processingData(data) {
//         this.data = [...data];
//         this._render();
//     }
//
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//
//     /**
//      * Отрисовывает страницу каталога с товарами
//      * @private
//      */
//     _render() {
//         const block = document.querySelector(this.container);
//         for (let el of this.data) {
//             const product = new ProductItem(el);
//             this.allProducts.push(product);
//             block.insertAdjacentHTML('beforeend', product.render());
//         }
//     }
//
//     /**
//      * Назначает обработчик событий на кнопки галереи
//      * @private
//      */
//     _init() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('buy-btn')) {
//                 const {dataset} = e.target;
//                 const id = +dataset['id'];
//                 this.basket.addProduct(this.allProducts.find(el => el.id_product === id))
//             }
//         });
//         document.querySelector(`.search-form`).addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector(`.search-field`).value);
//         })
//     }
// }

// class ProductItem {
//     constructor(product, img="https://placehold.it/200x150") {
//         this.id_product = product.id_product;
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = img;
//     }
//
//     /**
//      * Отрисовывает блок одного товара
//      * @returns {string} HTML-элемент товара
//      */
//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                     <img src="${this.img}" alt="${this.product_name}">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price}</p>
//                     <button class="buy-btn" data-id="${this.id_product}">Купить</button>
//                 </div>`
//     }
// }
//
// class Basket {
//     constructor(url='/getBasket.json', container='.basket-list') {
//         this.url = url;
//         this.container = container;
//         this.data = [];
//         this.allProducts = [];
//         this._init();
//         this.getJson()
//           .then(data => this.processingData(data.contents));
//     }
//
//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//           .then(result => result.json())
//           .catch(error => console.log(error));
//     }
//
//     processingData(data) {
//         this.data = [...data];
//         this._render();
//     }
//
//     /**
//      * Считает общую стоимость товаров, добавленных в корзину
//      * @returns {number} сумма товаров в корзине
//      */
//     sumProductsInBasket() {
//         for (let el of this.allProducts) {
//             this.cost += el.price;
//         }
//         return this.cost;
//     }
//
//     /**
//      * Добавляет продукт в корзину
//      * @param product объект продукта, который хотим добавить в корзину
//      */
//     addProduct(product) {
//         // выполняем запрос на сервер
//         this.getJson(`${API}/addToBasket.json`)
//           .then(data => {
//               // проверяем полученный результат от сервера
//               if (data.result) {
//                   // ищем товар, id которого будет совпадать с id продукта, который хотим добавить в корзину
//                   let find = this.allProducts.find(el => el.id_product === product.id_product);
//                   // если такой товар уже есть в корзине
//                   if (find) {
//                       // то меняем только его количество
//                       find.quantity++;
//                       // и обновляем корзину
//                       this._updateBasket(find);
//                   } else {
//                       // создаем новый объект, который имеет все свойства объекта product + новое свойство quantity
//                       let newProduct = Object.assign({quantity: 1}, product);
//                       // переопределяем значение this.data
//                       this.data = [newProduct];
//                       // отображаем пользователю новый добавленный продукт
//                       this._render();
//                   }
//               } else {
//                   console.log('error!');
//               }
//           })
//     }
//
//     /**
//      * Удаляет продукт из корзины
//      * @param product объект продукта, который хотим удалить из корзины
//      */
//     deleteProduct(product) {
//         // выполняем запрос на сервер
//         this.getJson(`${API}/deleteFromBasket.json`)
//           .then(data => {
//               // проверяем полученный результат от сервера
//               if (data.result) {
//                   // получаем id товара из элемента, переданного на удаление
//                   const id = +product.dataset['id'];
//                   // ищем в корзине товар, id которого будет совпадать с id продукта, который хотим удалить из корзины
//                   let find = this.allProducts.find(el => el.id_product === id);
//                   // если количество этотого товара больше 1
//                   if (find.quantity > 1) {
//                       // то уменьшаем его количество на 1
//                       find.quantity--;
//                       // и обновляем корзину
//                       this._updateBasket(find);
//                   } else {
//                       // удаляем товар из массива, где лежат все товары корзины
//                       this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                       // удаляем элемент со страницы
//                       document.querySelector(`.product-in-basket[data-id="${id}"]`).remove();
//                   }
//               } else {
//                   console.log('error!!');
//               }
//           })
//     }
//
//     /**
//      * Обновляет количество и стоимость товара в корзине
//      * @param product товар, знчения которого необходимо изменить
//      * @private
//      */
//     _updateBasket(product) {
//         // ищем интересующий нас элемент
//         let element = document.querySelector(`.product-in-basket[data-id="${product.id_product}"]`);
//         // внутри элемента записываем новое значение количества товаров
//         element.querySelector(`.quantity`).textContent = `Quantity: ${product.quantity}`;
//         // и новое значение стоимости этого товара
//         element.querySelector(`.sum-products`).textContent = `$${product.quantity * product.price}`;
//     }
//
//     _render() {
//         const block = document.querySelector(this.container);
//         for (let el of this.data) {
//             const product = new BasketItem(el);
//             this.allProducts.push(product);
//             block.insertAdjacentHTML('beforeend', product.render());
//         }
//     }
//
//     _init() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 console.log(e.target);
//                 this.deleteProduct(e.target);
//             }
//         });
//         document.querySelector(`.btn-cart`).addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         })
//     }
// }
//
// class BasketItem {
//     constructor(product, img="https://placehold.it/50x100") {
//         this.id_product = product.id_product;
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = img;
//         this.quantity = product.quantity;
//     }
//
//     render() {
//         return `<div class="product-in-basket" data-id="${this.id_product}">
//                     <img src="${this.img}" alt="${this.product_name}">
//                     <div class="block-name">
//                         <p>${this.product_name}</p>
//                         <p class="quantity">Quantity: ${this.quantity}</p>
//                         <p class="single-price">$${this.price}</p>
//                     </div>
//                     <div class="block-price-btn">
//                         <p class="sum-products">$${this.quantity * this.price}</p>
//                         <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                     </div>
//                 </div>`
//     }
// }
//
//
// const basket = new Basket();
// const products = new Products(basket);
//
// products.getJson(`getProducts.json`)
//   .then(data => products.processingData(data));