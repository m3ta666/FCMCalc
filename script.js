const selection = { A: null, B: null, C: null };

document.querySelectorAll(".row").forEach(row => {
  row.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      row.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      let field = row.dataset.field;
      let value = parseInt(btn.textContent);
      selection[field] = value;

      document.getElementById("out" + field).textContent = field + ": " + value + " cm";

      if (selection.A && selection.B && selection.C) {
        generateMaterialList();
      }
    });
  });
});

function addMaterial(material, artNr, link, menge) {
  const tableBody = document.querySelector("#materialTable tbody");

  const row = document.createElement("tr");

  const tdMaterial = document.createElement("td");
  tdMaterial.textContent = material;
  row.appendChild(tdMaterial);

  const tdLink = document.createElement("td");
  const a = document.createElement("a");
  a.href = link;
  a.textContent = artNr;
  a.target = "_blank";
  a.className = "w3-button w3-small w3-round m3ta-theme";
  a.style.fontWeight = "bold";
  a.style.width = "100%";
  tdLink.appendChild(a);
  row.appendChild(tdLink);

  const tdMenge = document.createElement("td");
  tdMenge.textContent = menge;
  row.appendChild(tdMenge);

  tableBody.appendChild(row);
}

function generateMaterialList() {
  const tableBody = document.querySelector("#materialTable tbody");
  tableBody.innerHTML = ""; // reset

  const A = selection.A * 10; // Länge
  const B = selection.B * 10; // Höhe
  const C = selection.C * 10; // Breite

  // Sperrholz (Plattenfläche)
  const area_mm2 = 2 * (A * B + A * C + B * C);
  const area_m2 = (area_mm2 / 1_000_000).toFixed(2);

  // Profile: alle Außenkanten (Korpus + Deckel)
  const profile_mm = 4 * (A + B + C);
  const profile_m = (profile_mm / 1000).toFixed(1);
  const sprofile_mm = 4 * (A + C);
  const sprofile_m = (sprofile_mm / 1000).toFixed(1);
  
  // Hardware-Teile
  const kugelEcken = 8;
  const butterflys = A > 1600 ? 3 : 2; // große Cases → 3, sonst 2
  const scharniere = A > 1600 ? 3 : 2; // große Cases → 3, sonst 2
  const griffe = A > 1000 ? 8 : 4; // große Cases → 8, sonst 4
  const lecke = 4;
  const swinkel = 4;
  const wheels = 1;

  // Tabelle füllen
  addMaterial("Sperrholz 9mm", "Holz1", "https://de.wikipedia.org/wiki/Holz", area_m2 + " m²");
  addMaterial("Kantenschutz 30 mm", "6105", "https://www.aweo.de/Adam-Hall-6105-Aluminium-Kantenschutz-30x30-mm", profile_m + " m");
  addMaterial("Schließprofil Uni", "6304", "https://www.aweo.de/Adam-Hall-6304-Aluminium-Hybrid-Schliessprofil-fuer-95-mm-Material", sprofile_m + " m");
  addMaterial("Kugelecken", "41076", "https://www.aweo.de/Adam-Hall-41076-Kugelecke-gross-gekroepft-fuer-30-mm-Kantenprofile", kugelEcken + "x");
  addMaterial("Butterfly-Verschlüsse", "172511", "https://www.aweo.de/Adam-Hall-172511-V3-Automatik-Butterfly-Verschluss-gross-gekroepft-14-mm-tief", butterflys + "x");
  addMaterial("Scharniere", "270755", "https://www.aweo.de/Adam-Hall-270755-Deckelfeststeller-gekroepft-mit-Scharnier-Klick-Stop-Funktion-und-Nietschutz", scharniere + "x");
  addMaterial("Klappgriffe", "34087", "https://www.aweo.de/Adam-Hall-34087-Klappgriff-gross-gefedert-in-Einbauschale-95-mm-tief-mit-Nietschutz", griffe + "x");
  addMaterial("L-Ecke", "4054", "https://www.aweo.de/Adam-Hall-4054-L-Ecke-47-x-52-mm-gekroepft", lecke + "x");
  addMaterial("Schliesswinkel", "40407", "https://www.aweo.de/Adam-Hall-40407-L-Ecke-30-x-24-mm-verzinkt", swinkel + "x");
  addMaterial("Wheelset", "wheels", "https://www.aweo.de/4er-set-lenkrollen-80mm-blue-wheel-2-gebremst", wheels + " Set");
} 