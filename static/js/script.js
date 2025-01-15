function switchMap() {
    var selected = document.getElementById("gas-map").value;
    var containers = document.querySelectorAll(".container");
    containers.forEach(function(container) {
        container.classList.remove("visible");
    });
    document.getElementById(selected).classList.add("visible");
}

function showPopup(analysis) {
    const images = {
        "sup_limiti_per_gas": {
            left: "static/images/puglia/sup_limiti_per_gas.png",
            right: "static/images/lombardia/sup_limiti_per_gas.png",
            leftCaption: "descrizione grafico puglia",
            rightCaption: "descrizione grafico lombardia"
        },
        "sup_limiti_generale": {
            left: "static/images/puglia/sup_limiti_generale.png",
            right: "static/images/lombardia/sup_limiti_generale.png",
            leftCaption: "testo puglia",
            rightCaption: "testo lombardia"
        },
        "corr_meteo_gas": {
            left: "static/images/puglia/correlazione_meteo_gas.png",
            right: "static/images/lombardia/correlazione_meteo_gas.png",
            leftCaption: "testo puglia",
            rightCaption: "testo lombardia"
        },
        "eventi_estremi": {
            left: "static/images/puglia/eventi_estremi.png",
            right: "static/images/lombardia/eventi_estremi.png",
            leftCaption: "testo puglia",
            rightCaption: "testo lombardia"
        },
        "media_gas": {
            left: "static/images/puglia/media_valori_inquinanti.png",
            right: "static/images/lombardia/media_valori_inquinanti.png",
            leftCaption: "testo puglia",
            rightCaption: "testo lombardia"
        }
    };

    const selectedAnalysis = images[analysis];
    if (selectedAnalysis) {
        document.getElementById("popup-img-left").src = selectedAnalysis.left;
        document.getElementById("popup-caption-left").textContent = selectedAnalysis.leftCaption;
        document.getElementById("popup-img-right").src = selectedAnalysis.right;
        document.getElementById("popup-caption-right").textContent = selectedAnalysis.rightCaption;
        document.getElementById("popup").style.display = "block";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.querySelectorAll(".popup-left img, .popup-right img").forEach(img => {
    img.addEventListener("click", function () {
        showImagePopup(this.src);
    });
});

function showImagePopup(src) {
    const largeImage = document.getElementById("large-image");
    largeImage.src = src;
    document.getElementById("image-popup").style.display = "flex";
}

function closeImagePopup() {
    document.getElementById("image-popup").style.display = "none";
}

let currentSelectionType = null;

function showSelectionPopup(type) {
    currentSelectionType = type;

    const container = document.getElementById("selection-container");
    container.innerHTML = ""; // Resetta il contenuto precedente

    if (type === "collage") {
        console.log("Popup configurato per correlazione meteo-gas");
        container.innerHTML = `
            <div id="controls">
                <label for="gas-select">Seleziona il gas:</label>
                <select id="gas-select">
                    <option value="NO2">NO2</option>
                    <option value="O3">O3</option>
                    <option value="PM10">PM10</option>
                    <option value="PM25">PM2.5</option>
                </select>
            </div>
        `;
    } else if (type === "analisi-meteo-gas") {
        console.log("Popup configurato per analisi meteo-gas");
        container.innerHTML = `
            <div id="controls">
                <label for="gas-select">Seleziona il gas:</label>
                <select id="gas-select">
                    <option value="NO2">NO2</option>
                    <option value="O3">O3</option>
                    <option value="PM10">PM10</option>
                    <option value="PM25">PM2.5</option>
                </select>
                <label for="meteo-select">Seleziona la variabile meteo:</label>
                <select id="meteo-select">
                    <option value="temperatura">Temperatura</option>
                    <option value="precipitazione">Precipitazione</option>
                    <option value="vvento">Velocità Vento</option>
                </select>
            </div>
        `;
    } else if (type === 'distanza') {
        console.log("Popup configurato per analisi distanza");
        container.innerHTML = `
            <div id="controls">
                <label for="gas-select">Seleziona il gas:</label>
                <select id="gas-select">
                    <option value="NO2">NO2</option>
                    <option value="O3">O3</option>
                    <option value="PM10">PM10</option>
                    <option value="PM25">PM2.5</option>
                </select>
            </div>
        `;
    }

    document.getElementById("selection-popup").style.display = "flex";
}

function closeSelectionPopup() {
    document.getElementById("selection-popup").style.display = "none";
}

function confirmSelection() {
    // Recupera i menu a tendina dal DOM
    const gasSelect = document.getElementById("gas-select");
    const meteoSelect = document.getElementById("meteo-select");

    // Ottieni i valori selezionati
    const gas = gasSelect?.value || null;
    const meteo = meteoSelect?.value || null;

    // Debugging: Controlla i valori recuperati
    console.log("Gas selezionato:", gas);
    console.log("Meteo selezionato:", meteo);

    // Elenco dei valori validi
    const validGases = ["NO2", "O3", "PM10", "PM25"];
    const validMeteo = ["temperatura", "precipitazione", "vvento"];

    // Controllo sui valori selezionati
    if (!validGases.includes(gas)) {
        console.error("Gas non valido selezionato:", gas);
        alert("Per favore, seleziona un gas valido.");
        return;
    }

    if (meteo && !validMeteo.includes(meteo)) {
        console.error("Meteo non valido selezionato:", meteo);
        alert("Per favore, seleziona una variabile meteo valida.");
        return;
    }

    // Chiudi il popup
    closeSelectionPopup();

    // Debugging: Logga la scelta
    console.log("Mostra il popup con le immagini per:");
    console.log("Gas:", gas);
    console.log("Meteo:", meteo);

    // In base al tipo di selezione, esegui l'azione
    if (currentSelectionType === "collage") {
        // Selezione solo del gas
        showPopupWithImages(gas, null);
    } else if (currentSelectionType === "analisi-meteo-gas") {
        // Selezione di gas e meteo
        showPopupWithImages(gas, meteo);
    } else if (currentSelectionType === "distanza") {
        // Selezione solo del gas
        showPopupWithImages(gas, null);
    }
}

function showPopupWithImages(gas, meteo) {
    console.log('Showing popup with gas:', gas, 'and meteo:', meteo);

    const images = {
        "collage": {
            NO2: { left: "static/images/puglia/collage_relazioni_meteo_NO2.png", right: "static/images/lombardia/collage_relazioni_meteo_NO2.png" },
            O3: { left: "static/images/puglia/collage_relazioni_meteo_O3.png", right: "static/images/lombardia/collage_relazioni_meteo_O3.png" },
            PM10: { left: "static/images/puglia/collage_relazioni_meteo_PM10.png", right: "static/images/lombardia/collage_relazioni_meteo_PM10.png" },
            PM25: { left: "static/images/puglia/collage_relazioni_meteo_PM2.5.png", right: "static/images/lombardia/collage_relazioni_meteo_PM2.5.png" }
        },
        "analisi-meteo-gas": {
            NO2: {
                temperatura: { left: "static/images/puglia/rel meteo gas/NO2_temperatura.png", right: "static/images/lombardia/rel meteo gas/NO2_temperatura.png" },
                precipitazione: { left: "static/images/puglia/rel meteo gas/NO2_precipitazione.png", right: "static/images/lombardia/rel meteo gas/NO2_precipitazione.png" },
                vvento: { left: "static/images/puglia/rel meteo gas/NO2_vvento.png", right: "static/images/lombardia/rel meteo gas/NO2_vvento.png" }
            },
            O3: {
                temperatura: { left: "static/images/puglia/rel meteo gas/O3_temperatura.png", right: "static/images/lombardia/rel meteo gas/O3_temperatura.png" },
                precipitazione: { left: "static/images/puglia/rel meteo gas/O3_precipitazione.png", right: "static/images/lombardia/rel meteo gas/O3_precipitazione.png" },
                vvento: { left: "static/images/puglia/rel meteo gas/O3_vvento.png", right: "static/images/lombardia/rel meteo gas/O3_vvento.png" }
            },
            PM10: {
                temperatura: { left: "static/images/puglia/rel meteo gas/PM10_temperatura.png", right: "static/images/lombardia/rel meteo gas/PM10_temperatura.png" },
                precipitazione: { left: "static/images/puglia/rel meteo gas/PM10_precipitazione.png", right: "static/images/lombardia/rel meteo gas/PM10_precipitazione.png" },
                vvento: { left: "static/images/puglia/rel meteo gas/PM10_vvento.png", right: "static/images/lombardia/rel meteo gas/PM10_vvento.png" }
            },
            PM25: {
                temperatura: { left: "static/images/puglia/rel meteo gas/PM2.5_temperatura.png", right: "static/images/lombardia/rel meteo gas/PM2.5_temperatura.png" },
                precipitazione: { left: "static/images/puglia/rel meteo gas/PM2.5_precipitazione.png", right: "static/images/lombardia/rel meteo gas/PM2.5_precipitazione.png" },
                vvento: { left: "static/images/puglia/rel meteo gas/PM2.5_vvento.png", right: "static/images/lombardia/rel meteo gas/PM2.5_vvento.png" }
            }
        },
        "distanza": {
            NO2: { left: "static/images/puglia/distanza_meteo_NO2.png", right: "static/images/lombardia/distanza_meteo_NO2.png" },
            O3: { left: "static/images/puglia/distanza_meteo_O3.png", right: "static/images/lombardia/distanza_meteo_O3.png" },
            PM10: { left: "static/images/puglia/distanza_meteo_PM10.png", right: "static/images/lombardia/distanza_meteo_PM10.png" },
            PM25: { left: "static/images/puglia/distanza_meteo_PM2.5.png", right: "static/images/lombardia/distanza_meteo_PM2.5.png" }
        }
    };

    const selectedImages = meteo
    ? images["analisi-meteo-gas"][gas][meteo]
    : (currentSelectionType === "distanza"
        ? images["distanza"][gas]
        : images["collage"][gas]);

    if (selectedImages) {
        document.getElementById("popup-img-left").src = selectedImages.left;
        document.getElementById("popup-caption-left").textContent = `Puglia: ${gas} ${meteo || ''}`;
        document.getElementById("popup-img-right").src = selectedImages.right;
        document.getElementById("popup-caption-right").textContent = `Lombardia: ${gas} ${meteo || ''}`;
        document.getElementById("popup").style.display = "block";
    }
}