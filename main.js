// import { renderProducts } from "./components/renderProducts";
// import { renderProductsPopular} from "./components/renderProductsPopular";

const url = "http://localhost:3000/productsSale";
const urlPopular = " http://localhost:3000/productsPopular";

const divSale = document.querySelector(".container-products_cardSale");
const divPopular = document.querySelector(".container-products_cardPopular");

const getProductsSale = async () => {
  const respuesta = await fetch(url);
  const data = await respuesta.json();
  data.forEach((element) => {
    const { id, image, name, newPrice, oldPrice, sale } = element;
    divSale.innerHTML += `
        <article class="products_card">
                        <div class="products_card-sale">
                            <span>
                            ${sale}% dto.
                            </span>
                        </div>
                        <img id="imagen${id}" src="${image}" alt="limon" class="products_card-img">
                        <p class="prducts_card-newPrice">$${newPrice}/kg 
                        <p class="prducts_card-price">$${oldPrice}/kg </p> </p>
                        <p class="prducts_card-description">${name}</p>
                        <button class="addToCar products_card-button">Agregar</button>
                    </article>
        `;
  });
  //agregar al carrito
  const addToShoppingCardButtons = document.querySelectorAll(".addToCar");
  //console.log(addToShoppingCardButtons);

  addToShoppingCardButtons.forEach((addToCardButton) => {
    addToCardButton.addEventListener("click", addToCardClicked);
  });

  const container = document.querySelector(".modal-carShop_products");

  function addToCardClicked(event) {
    const button = event.target;
    const item = button.closest(".products_card");

    const itemName = item.querySelector(
      ".prducts_card-description"
    ).textContent;
    const itemPrice = item.querySelector(".prducts_card-newPrice").textContent;
    const itemImage = item.querySelector(".products_card-img").src;

    addItemToShoppingCar(itemName, itemPrice, itemImage);
  }

  function addItemToShoppingCar(itemName, itemPrice, itemImage) {
    container.innerHTML += `
        <article class="modal-carShop_product">
                            
        <div class="info_product">
            <div class="info_product__container">
                <img src="${itemImage}" alt="" class="img-product">
            </div>
            <div class="info_product__container">
                <h4 class="info_product__container-title"> ${itemName}</h4>
                <span class="info_product__container-price">${itemPrice}</span>
            </div>
        </div>

        <div class="cant-products">
            <i class="fa-solid fa-minus"></i>
            <span class="cant-product"> 1</span>
            <i class="fa-solid fa-plus"></i>

        </div>
    </article>
        
        `;
    updateShoppingCarTotal();
  }
  function updateShoppingCarTotal() {
    let total = 0;
    const shoppingCarTotal = document.querySelector(".total-pay");
    const shoppingCarItems = document.querySelectorAll(
      ".modal-carShop_product"
    );

    shoppingCarItems.forEach((shoppingCarItem) => {
      const cardElemetPrice = shoppingCarItem.querySelector(
        ".info_product__container-price"
      );
      const cardItemPrice = Number(
        cardElemetPrice.textContent.replace("$", "").replace("/kg", "")
      );

      const cardElemntCant = shoppingCarItem.querySelector(".cant-product");
      const cardItemCant = Number(cardElemntCant.textContent);

      total = total + cardItemPrice * cardItemCant;
    });
    shoppingCarTotal.innerHTML = `$${total.toFixed(2)}`;
  }
};

const getProductsPopular = async () => {
  const respuesta = await fetch(urlPopular);
  const data = await respuesta.json();
  data.forEach((element) => {
    const { id, image, name, price, priceWeight, weight } = element;
    divPopular.innerHTML += `
        <article class="products_card">
                        <img id="imagen${id}"  src="${image}" alt="limon" class="products_card-img">
                        <p class="prducts_card-newPrice">$${price} </p>
                        <p class="prducts_card-description">${name}</p>
                        <span class="products_card-priceWeight">${weight} g ($${priceWeight} /gr)</span>
                        <button class=" addToCar products_card-button">Agregar</button>
                    </article>
        `;
  });
  //agregar al carrito
  const addToShoppingCardButtons = document.querySelectorAll(".addToCar");

  const clearCard = document.querySelector(".modal-carShop_products-clear");
  //console.log(addToShoppingCardButtons);

  addToShoppingCardButtons.forEach((addToCardButton) => {
    addToCardButton.addEventListener("click", addToCardClicked);
    clearCard.classList.toggle(".modal-carShopclose");
  });

  const container = document.querySelector(".modal-carShop_products");

  function addToCardClicked(event) {
    const button = event.target;
    const item = button.closest(".products_card");

    const itemName = item.querySelector(
      ".prducts_card-description"
    ).textContent;
    const itemPrice = item.querySelector(".prducts_card-newPrice").textContent;
    const itemImage = item.querySelector(".products_card-img").src;

    addItemToShoppingCar(itemName, itemPrice, itemImage);
  }

  function addItemToShoppingCar(itemName, itemPrice, itemImage) {
    container.innerHTML += `
          <article class="modal-carShop_product">
                              
          <div class="info_product">
              <div class="info_product__container">
                  <img src="${itemImage}" alt="" class="img-product">
              </div>
              <div class="info_product__container">
                  <h4 class="info_product__container-title"> ${itemName}</h4>
                  <span class="info_product__container-price">${itemPrice}</span>
              </div>
          </div>
  
          <div class="cant-products">
              <i class="fa-solid fa-minus"></i>
              <span class="cant-product"> 1</span>
              <i class="fa-solid fa-plus"></i>
  
          </div>
      </article>
          
          `;
    updateShoppingCarTotal();
  }
  function updateShoppingCarTotal() {
    let total = 0;
    const shoppingCarTotal = document.querySelector(".total-pay");
    const shoppingCarItems = document.querySelectorAll(
      ".modal-carShop_product"
    );

    shoppingCarItems.forEach((shoppingCarItem) => {
      const cardElemetPrice = shoppingCarItem.querySelector(
        ".info_product__container-price"
      );
      const cardItemPrice = Number(
        cardElemetPrice.textContent.replace("$", "").replace("/kg", "")
      );

      const cardElemntCant = shoppingCarItem.querySelector(".cant-product");
      const cardItemCant = Number(cardElemntCant.textContent);

      total = total + cardItemPrice * cardItemCant;
    });
    shoppingCarTotal.innerHTML = `$${total.toFixed(2)}`;
  }
};

//getUser(url)
document.addEventListener(
  "DOMContentLoaded",
  getProductsSale(),
  getProductsPopular()
);

// MODAL LOCATION

const btnOpenModalLocation = document.querySelector(".location-style");
const btnCloseModalLocation = document.querySelector(".modal-location__close");
const btnListo = document.querySelector("#listo");

const modalLocation = document.querySelector(".modal-location");

btnOpenModalLocation.addEventListener("click", (e) => {
  e.preventDefault();
  modalLocation.classList.add("modal--show");
});

btnCloseModalLocation.addEventListener("click", (e) => {
  e.preventDefault();
  modalLocation.classList.remove("modal--show");
});

//LOCATION FORM

const select = document.querySelector("#select");
const optiones = document.querySelector("#options");
const contenidoSelect = document.querySelector("#select .contenido-select");
const hiddenInput = document.querySelector("#inputSelect");
const btnForm = document.querySelector(".products_card-button");

document.querySelectorAll("#options > .option").forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    contenidoSelect.innerHTML = e.currentTarget.innerHTML;
    //console.log(e.currentTarget.innerHTML);
    select.classList.toggle("active");
    optiones.classList.toggle("show");
    hiddenInput.value =
      e.currentTarget.querySelector(".option_title").innerText;
    //console.log(e.currentTarget.querySelector('.option_title').innerText);
  });
});

select.addEventListener("click", (e) => {
  e.preventDefault();
  select.classList.toggle("active");
  optiones.classList.toggle("show");
});

//MODAL CAR-SHOP
const btnOpenCar = document.querySelector(".cart-shopping");
const btnCloseCar = document.querySelector(".modal-carShop__close");
const modalCarShop = document.querySelector(".modal-carShop");

btnOpenCar.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  modalCarShop.classList.add("modalCar--show");
});

btnCloseCar.addEventListener("click", (e) => {
  e.preventDefault();
  modalCarShop.classList.remove("modalCar--show");
});

//CAR SHOPPING
