x = undefined
kaartjes = document.getElementById("Kaartjes")
window.addEventListener("popstate", router);
laadData()
console.log("in js")

function router(){
    console.log("in router")
    pad = ""
    if(location.search.includes("?")){
        parameters = new URLSearchParams(window.location.search);
        pad = params.get('path');
    }else{pad = location.pathname}//pad = tripNummer/dagNummer/
    indexen = pad.split("/").slice(1)
    console.log(indexen)
    if(indexen[0] != "" && indexen[0] != undefined){laadDagen(indexen[0])} //Als trip geselecteerd, laad dagen van die trip. Geen trip? Laad trips en eindig functie
    else{laadTrips(); return 0;}
    if(indexen[1] != "" && indexen[1] != undefined){laadMomenten(indexen[0], indexen[1])} //Als dag geselecteerd, laad momenten van die dag. Geen dag? Laad dagen van trip en eindig functie
    else{laadDagen(indexen[0]); return 0;}
}

async function laadData(){
    const response = await fetch("data.json");
    x = await response.json()
    router()
}

function laadTrips(){
    console.log("in laadTrips")
    kaartjes.innerHTML = ''
    tripNummer = 0
    x.trips.forEach(trip => {
        const tripKaart = document.createElement("div");
        tripKaart.className = "card mt-2";

        tripKaart.innerHTML = `
            <img src="${trip.image}" class="card-img-top" alt="${trip.name}">
            <div class="card-body">
                <h5 class="card-title">${trip.name}</h5>
                <p class="card-text">${trip.description}</p>
                <hr class="border border-secondary opacity-25">
                <div class="d-flex justify-content-between">
                    <p class="card-text mb-0">
                        ${trip.startDate} - ${trip.endDate}<br>
                        ${trip.people}
                    </p>
                    <button class="btn btn-primary" id="kijkKnop" onclick="history.pushState({}, '', '/${tripNummer}'); router()">👀</button>
                </div>
            </div>
    `;
        kaartjes.append(tripKaart)
        tripNummer += 1
    });
}



function laadDagen(tripNummer){
    console.log("dagen laden van trip ${tripNummer}")
    kaartjes.innerHTML = ''
}

function laadMomenten(tripNummer, dagNummer){
    console.log("momenten laden van trip ${tripNummer} dag ${dagNummer}")
    kaartjes.innerHTML = ''
}