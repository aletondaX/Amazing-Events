const queryString = location.search;
// console.log(queryString);
const params = new URLSearchParams(queryString);
// console.log(params);
const id = params.get("id") - 1;
const evento = data.events[id];

function agregarCards() {
    let card = `<div class="row g-0 card-detail">
                    <div class="col-md-4">
                        <img src="${evento.image}" class="img-fluid rounded-start img-detail" alt="${evento.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${evento.name}</h5>
                            <p class="card-text"><small class="text-muted">${evento.date}</small></p>
                            <p class="card-text">${evento.description}</p>
                            <p class="card-text">Price: $${evento.price}</p>
                            <div class="d-flex justify-content-around">
                                <p class="card-text"><small class="text-muted">Category: ${evento.category}</small></p>
                                <p class="card-text"><small class="text-muted">Place: ${evento.place}</small></p>
                                <p class="card-text"><small class="text-muted">Capacity: ${evento.capacity}</small></p>
                                <p class="card-text"><small class="text-muted">Assistance: ${evento.assistance}</small></p>
                            </div>
                        </div>
                    </div>
                </div>`;
    document.getElementById("insertar-detail").innerHTML = card;
}

agregarCards();