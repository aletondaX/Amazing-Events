function filtrar() {
    let inputText = document.getElementById("search-input").value.trim();
    let checks = Array.from(document.querySelectorAll(".categoria:checked")).map(check => check.value);
    console.log(document.querySelectorAll(".categoria:checked"));
    // console.log(Array.from(document.querySelectorAll(".categoria:checked")));
    // console.log(Array.from(document.querySelectorAll(".categoria:checked")).map(check => check.value));

    let eventosFiltrados = data.events.filter(evento => {
        return (evento.name.toLowerCase().includes(inputText.toLowerCase()) && (checks.length === 0 || checks.includes(evento.category)))
    })

    renderCards(eventosFiltrados, inputText);
}

filtrar();