
const url = "http://localhost:3000/productsSale";

const divSale = document.querySelector('.container-products_cardSale')


export  const getProductsSale = async (url)=>{
    const respuesta = await fetch(url);
    const data = await respuesta.json()
    data.forEach(element =>{
        const {id, image, name, newPrice, oldPrice,sale} =element;
        divSale.innerHTML += `
        <article class="products_card">
                        <div class="products_card-sale">
                            <span>
                            ${sale}% dto.
                            </span>
                        </div>
                        <img id="imagen${id}" src="${image}" alt="limon" class="products_card-img">
                        <p class="prducts_card-newPrice">$${newPrice}/kg <span class="prducts_card-price">$${oldPrice}/kg </span> </p>
                        <p class="prducts_card-description">${name}</p>
                        <button class="products_card-button">Agregar</button>
                    </article>
        `
    })
}
document.addEventListener('DOMContentLoaded', getProductsSale(url))