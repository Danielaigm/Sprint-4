
const urlPopular = " http://localhost:3000/productsPopular";



const divPopular = document.querySelector('.container-products_cardPopular')

export const getProductsPopular = async (url)=>{
    const respuesta = await fetch(url);
    const data = await respuesta.json()
    data.forEach(element =>{
        const {id, image, name, price, priceWeight,weight} =element;
        divPopular.innerHTML += `
        <article class="products_card">
                        <img id="imagen${id}"  src="${image}" alt="limon" class="products_card-img">
                        <p class="prducts_card-newPrice">$${price} </p>
                        <p class="prducts_card-description">${name}</p>
                        <span class="products_card-priceWeight">${weight} g ($${priceWeight} /gr)</span>
                        <button class="products_card-button">Agregar</button>
                    </article>
        `
    })
}
//getUser(url)
document.addEventListener('DOMContentLoaded', getProductsPopular(urlPopular))