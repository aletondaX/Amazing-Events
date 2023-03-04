function renderCards(eventosFiltrados, inputText) {
    if (eventosFiltrados.length > 0) {
        let cards = [];
        let card;
        for (let evento of eventosFiltrados) {
            card = `<div class="col">
                    <div class="card">
                        <img src="${evento.image}" class="card-img-top" alt="${evento.name} Image">
                        <div class="card-body">
                            <h5 class="card-title">${evento.name}</h5>
                            <p class="card-text">${evento.description}</p>
                            <div class="d-flex justify-content-between">
                                <p>Price: $${evento.price}</p>
                                <a href="./details.html?id=${evento._id}">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            cards.push(card);
        }
        document.getElementById("insertar-cards").innerHTML = cards.join("");
    } else {
        document.getElementById("insertar-cards").innerHTML = `<div class="col">
        <div class="card">
            <img src="./img/notfound.jpg" class="card-img-top" alt="Event Not Found">
            <div class="card-body">
                <h5 class="card-title">"${inputText}"? Not Found!</h5>
                <p class="card-text">The event you are looking for was not found!</p>
            </div>
        </div>
    </div>`;
    }
}

//----------------------------------
// Funciones anteriores, sin uso ---
//----------------------------------
// function agregarCardsConInner() {
//     let cards = [];
//     let card;
//     for (let evento of data.events) {
//             card = `<div class="col">
//                     <div class="card">
//                         <img src="${evento.image}" class="card-img-top" alt="${evento.name} Image">
//                         <div class="card-body">
//                             <h5 class="card-title">${evento.name}</h5>
//                             <p class="card-text">${evento.description}</p>
//                             <div class="d-flex justify-content-between">
//                                 <p>Price: $${evento.price}</p>
//                                 <a href="./details.html?id=${evento._id}">see more...</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>`;
//             cards.push(card);
//     }
//     document.getElementById("insertar-cards").innerHTML = cards.join("");
// }
//
// function agregarCardsConAppend() {
//     for (let evento of data.events) {
//         let card = document.createElement("div");
//         card.setAttribute("class", "col");
//         card.innerHTML = `<div class="card">
//         <img src="${evento.image}" class="card-img-top" alt="${evento.name} Image">
//         <div class="card-body">
//         <h5 class="card-title">${evento.name}</h5>
//         <p class="card-text">${evento.description}</p>
//         <div class="d-flex justify-content-between">
//         <p>Price: $${evento.price}</p>
//         <a href="./details.html">View Details</a>
//         </div>
//         </div>
//         </div>`;
//         document.getElementById("insertar-cards").appendChild(card);
//     }
// }