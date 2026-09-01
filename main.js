x = undefined;
kaartjes = document.getElementById("Kaartjes");
window.addEventListener("popstate", router);
laadData();

function router() {
  console.log("in router");
  if (location.search.includes("?")) {
    parameters = new URLSearchParams(window.location.search);
    history.replaceState({}, "", parameters.get("pad"));
  }
  pad = location.pathname; //pad = tripNummer/dagNummer/
  indexen = pad.split("/").slice(1);
  if (indexen[0] != "" && indexen[0] != undefined) {
    laadDagen(indexen[0]);
  } //Als trip geselecteerd, laad dagen van die trip. Geen trip? Laad trips en eindig functie
  else {
    laadTrips();
    return 0;
  }
  if (indexen[1] != "" && indexen[1] != undefined) {
    laadMomenten(indexen[0], indexen[1]);
  } //Als dag geselecteerd, laad momenten van die dag. Geen dag? Laad dagen van trip en eindig functie
  else {
    laadDagen(indexen[0]);
    return 0;
  }
}

async function laadData() {
  const response = await fetch("data.json");
  x = await response.json();
  router();
}

function openFullscreen(afbeelding) {
  document.getElementById("modalImage").src = afbeelding.src;
  bootstrap.Modal.getOrCreateInstance("#imageModal").show();
}

function laadTrips() {
  console.log("trips aan het laden");
  kaartjes.innerHTML = "";
  tripNummer = 0;
  x.trips.forEach((trip) => {
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
    kaartjes.append(tripKaart);
    tripNummer += 1;
  });
}

function laadDagen(tripNummer) {
  console.log("dagen laden van trip ${tripNummer}");
  kaartjes.innerHTML = "";
  dagNummer = 0;
  x.trips[tripNummer].days.forEach((dag) => {
    const dagKaart = document.createElement("div");
    dagKaart.className = "card mt-2";
    carouselAfbeeldingen = "";
    dag.images.forEach((afbeelding, index) => {
      carouselAfbeeldingen += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${afbeelding}" class="d-block w-100" onclick="openFullscreen(this)" alt="Sorry! iets mis met deze foto, stuur mij!!!!">
        </div>`; //eerste moet op actief gezet worden, anders allebij hidden
    });

    dagKaart.innerHTML = `
            <div id="carouselControls${dagNummer}" class="carousel slide" data-bs-interval="false">
              <div class="carousel-inner">
                ${carouselAfbeeldingen}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${dagNummer}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${dagNummer}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
          </div>
            <div class="card-body">
                <h5 class="card-title">Dag ${dagNummer + 1}</h5>
                <p class="card-text">${dag.description}</p>
                <hr class="border border-secondary opacity-25">
                <div class="d-flex justify-content-between">
                    <p class="card-text mb-0">
                        ${dag.date}
                    </p>
                    <button class="btn btn-primary" id="kijkKnop" onclick="history.pushState({}, '', '/${tripNummer}/${dagNummer}'); router()">👀</button>
                </div>
            </div>
    `;
    kaartjes.append(dagKaart);
    dagNummer += 1;
  });
}

function laadMomenten(tripNummer, dagNummer) {
  console.log("momenten laden van trip ${tripNummer} dag ${dagNummer}");
  kaartjes.innerHTML = "";
  momentNummer = 0;
  x.trips[tripNummer].days[dagNummer].moments.forEach((moment) => {
    const momentkaart = document.createElement("div");
    momentkaart.className = "card mt-2";
    carouselAfbeeldingen = "";
    moment.images.forEach((afbeelding, index) => {
      carouselAfbeeldingen += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${afbeelding}" class="d-block w-100" onclick="openFullscreen(this)" alt="Sorry! iets mis met deze foto, stuur mij!!!!">
        </div>`; //eerste moet op actief gezet worden, anders allebij hidden
    });

    momentkaart.innerHTML = `
            <div id="carouselControls${momentNummer}" class="carousel slide" data-bs-interval="false">
              <div class="carousel-inner">
                ${carouselAfbeeldingen}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${momentNummer}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${momentNummer}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
          </div>
            <div class="card-body">
                <p class="card-text">${moment.description}</p>
            </div>
    `;
    kaartjes.append(momentkaart);

    momentNummer += 1;
  });
}
