document.body.onload = agregarCards;

function agregarCards() {
    // console.log(data.events.length);

    let card = document.createElement("div");
    card.setAttribute("class", "row g-0 card-detail");
    card.innerHTML = `<div class="col-md-4">
                        <img src="${data.events[0].image}" class="img-fluid rounded-start img-detail" alt="${data.events[0].name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.events[0].name}</h5>
                            <p class="card-text"><small class="text-muted">${data.events[0].date}</small></p>
                            <p class="card-text">${data.events[0].description}</p>
                            <p class="card-text">Price: $${data.events[0].price}</p>
                            <div class="d-flex justify-content-around">
                                <p class="card-text"><small class="text-muted">Category: ${data.events[0].category}</small></p>
                                <p class="card-text"><small class="text-muted">Place: ${data.events[0].place}</small></p>
                                <p class="card-text"><small class="text-muted">Capacity: ${data.events[0].capacity}</small></p>
                                <p class="card-text"><small class="text-muted">Assistance: ${data.events[0].assistance}</small></p>
                            </div>
                        </div>
                    </div>`;
    document.getElementById("insertar-detail").appendChild(card);
}