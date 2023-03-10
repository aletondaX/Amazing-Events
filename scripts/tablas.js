async function printTabla1() {
    // Traigo con la API los eventos PASADOS
    let urlApi = "https://api-amazingevents.onrender.com/api/amazing-events?time=past";
    let fetchResponse = await fetch(urlApi);
    let response = await fetchResponse.json();
    let arrayEventos = response.events;

    // Ordeno el array por ASISTENCIA e imprimo en la tabla
    arrayEventos = arrayEventos.sort((e1, e2) => e1.assistance - e2.assistance)
    document.getElementById("maxAtt").innerHTML = arrayEventos[arrayEventos.length-1].name;
    document.getElementById("maxAttValue").innerHTML = arrayEventos[arrayEventos.length-1].assistance;
    document.getElementById("minAtt").innerHTML = arrayEventos[0].name;
    document.getElementById("minAttValue").innerHTML = arrayEventos[0].assistance;
    
    // Ordeno el array por CAPACIDAD e imprimo en la tabla
    arrayEventos = arrayEventos.sort((e1, e2) => e1.capacity - e2.capacity)
    document.getElementById("maxCap").innerHTML = arrayEventos[arrayEventos.length-1].name;
    document.getElementById("maxCapValue").innerHTML = arrayEventos[arrayEventos.length-1].capacity;
}

async function printTabla2() {
    // Traigo con la API los eventos FUTUROS
    let urlApi = "https://api-amazingevents.onrender.com/api/amazing-events?time=upcoming";
    let fetchResponse = await fetch(urlApi);
    let response = await fetchResponse.json();
    let arrayEventos = response.events;
    
    // Construyo el array de categorías
    let categories = [];
    for (let evento of arrayEventos) {
        if (!categories.includes(evento.category)) {
            categories.push(evento.category);
        }
    }

// ###########################################################################################################
    // Traté de imprimir rows(filas) con innerHTML pero me resultó imposible.
    // Si bien la parte de JS es perfecta, al crear un div o span en medio de la tabla,
    // obviamente poniendole un ID para ser capturado, el navegador renderiza ese div/span fuera de la tabla.
    // Así que decidí hacerlo con Append.

    // let rows = [];
    // let row;
    // for (const category of categories) {
    //         row =
    //         `<tr>
    //         <td>${category}</td>
    //         <td></td>
    //         <td></td>
    // </tr>`;
    // console.log(row);
    // rows.push(row);
    // }
    // console.log(rows.join("\n"));
    // document.getElementById("insertabla2").innerHTML = rows.join("\n");
// ###########################################################################################################

    // A cada evento le agrego el atributo GANANCIA
    for (let evento of arrayEventos) {
        evento.ganancia = evento.estimate * evento.price;
    }
    // console.log(arrayEventos);

    // Por cada categoría debo realizar una serie de operaciones:
    for (let category of categories) {

        // Acumuladores
        let ganancia = 0;
        let assist_total = 0;
        let cap_total = 0;

        // Filtro el array de Ev.Futuros por cada categoría
        eventosFiltradosCategoria = arrayEventos.filter(evento => evento.category === category)
        // console.log(eventosFiltradosCategoria);

        // Por cada evento de una determinada categoría, acumulo las ganancias, asistencias y capacidades
        eventosFiltradosCategoria.forEach(evento => {
            ganancia += evento.ganancia;
            assist_total += evento.estimate;
            cap_total += evento.capacity;
        })
        // console.log(category + " => Ganancia:" + ganancia + ", Asistencia:" + assist_total + ", Capacidad:" + cap_total);
        
        // Saco el porcentaje de asistencia
        let porcentAssist = assist_total / cap_total * 100;
        porcentAssist = porcentAssist.toFixed(2);

        // Imprimo una fila por categoría, con appendChild()
        let row = document.createElement("tr");
        row.innerHTML = `<td>${category}</td>
                        <td>$${ganancia}</td>
                        <td>${porcentAssist}%</td>`;
        document.querySelector("table").appendChild(row);
    }
}

async function printTabla3() {
    let urlApi = "https://api-amazingevents.onrender.com/api/amazing-events?time=past";
    let fetchResponse = await fetch(urlApi);
    let response = await fetchResponse.json();
    let arrayEventos = response.events;

    let categories = [];
    for (let evento of arrayEventos) {
        if (!categories.includes(evento.category)) {
            categories.push(evento.category);
        }
    }

    for (let evento of arrayEventos) {
        evento.ganancia = evento.assistance * evento.price;
    }
    console.log(arrayEventos);

    let row = document.createElement("tr");
    row.innerHTML = `<th class="th-head" colspan="3">Past Event Statistics by Category</th>`;
    document.querySelector("table").appendChild(row);
    let row2 = document.createElement("tr");
    row2.innerHTML = `<th>Category</th>
                    <th>Revenue</th>
                    <th>Percentage of Attendance</th>`;
    document.querySelector("table").appendChild(row2);

    for (let category of categories) {

        let ganancia = 0;
        let assist_total = 0;
        let cap_total = 0;

        eventosFiltradosCategoria = arrayEventos.filter(evento => evento.category === category)
        // console.log(eventosFiltradosCategoria);

        eventosFiltradosCategoria.forEach(evento => {
            ganancia += evento.ganancia;
            assist_total += evento.assistance;
            cap_total += evento.capacity;
        })
        
        let porcentAssist = assist_total / cap_total * 100;
        porcentAssist = porcentAssist.toFixed(2);

        let row = document.createElement("tr");
        row.innerHTML = `<td>${category}</td>
                        <td>$${ganancia}</td>
                        <td>${porcentAssist}%</td>`;
        document.querySelector("table").appendChild(row);
    }
}

printTabla1();
printTabla2();
printTabla3();


