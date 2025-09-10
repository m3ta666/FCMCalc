// Button-Logik
document.querySelectorAll(".row").forEach(row => {
  row.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      // alte Auswahl zurücksetzen
      row.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      // neue Auswahl markieren
      btn.classList.add("active");

      // Wert in Ausgabe schreiben
      let field = row.dataset.field;
      let value = btn.textContent;
      document.getElementById("out" + field).textContent = field + ": " + value + " mm";
    });
  });
});
