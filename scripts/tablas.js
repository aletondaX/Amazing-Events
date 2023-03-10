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

    // A cada evento le agrego el atributo GANANCIA
    for (let evento of arrayEventos) {
        evento.ganancia = evento.estimate * evento.price;
    }
    // console.log(arrayEventos);

    let rows = [];
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

        // Guardo cada fila en el array
        let row = `<tr>
                    <td>${category}</td>
                    <td>$${ganancia}</td>
                    <td>${porcentAssist}%</td>
                    </tr>`;
        rows.push(row);
        }

    // Imprimo el array de filas
    document.getElementById("tabla2").innerHTML += rows.join("");
}

async function printTabla3() {
    // Similar a printTabla2(), pero
    // Trae los eventos PASADOS
    // Calcula la ganancia y asistencia en base a ASSISTANCE en vez de ESTIMATE
    // Imprime en la tabla 3
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

    let rows = [];
    for (let category of categories) {

        let ganancia = 0;
        let assist_total = 0;
        let cap_total = 0;

        eventosFiltradosCategoria = arrayEventos.filter(evento => evento.category === category)

        eventosFiltradosCategoria.forEach(evento => {
            ganancia += evento.ganancia;
            assist_total += evento.assistance;
            cap_total += evento.capacity;
        })
        
        let porcentAssist = assist_total / cap_total * 100;
        porcentAssist = porcentAssist.toFixed(2);

        let row = `<tr>
                    <td>${category}</td>
                    <td>$${ganancia}</td>
                    <td>${porcentAssist}%</td>
                    </tr>`;
        rows.push(row);
    }
    document.getElementById("tabla3").innerHTML += rows.join("");
}

printTabla1();
printTabla2();
printTabla3();


