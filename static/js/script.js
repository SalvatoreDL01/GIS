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
            leftCaption: "Il gas O3 è un gas di origine naturale non prodotto dall'uomo, si forma solo in presenza di radiazione solare e " +
                "inquinanti primari come gli ossidi di azoto (NO2) e i composti organici volatili. " +
                "Gli inquinanti PM10 e PM2.5 sono delle micropolveri sospese nell'aria, che possono essere di origine naturale o antropica.",

            rightCaption: "Il gas O3 è un gas di origine naturale non prodotto dall'uomo, si forma solo in presenza di radiazione solare e " +
                "inquinanti primari come gli ossidi di azoto (NO2) e i composti organici volatili. " +
                "Gli inquinanti PM10 e PM2.5 sono delle micropolveri sospese nell'aria, che possono essere di origine naturale o antropica."
            // Per questo ci aspettiamo che vengano superati i limiti di legge in zone industriali o molto abitate.
        },
        "sup_limiti_generale": {
            left: "static/images/puglia/sup_limiti_generale.png",
            right: "static/images/lombardia/sup_limiti_generale.png",
            leftCaption: "",
            rightCaption: ""
        },
        "corr_meteo_gas": {
            left: "static/images/puglia/correlazione_meteo_gas.png",
            right: "static/images/lombardia/correlazione_meteo_gas.png",
            leftCaption: "Il gas O3 ha una correlazione positiva (0.4) con la temperatura e la radiazione solare. " +
                "Invece, gli altri inquinanti e parametri meteo non hanno una correlazione significativa. ",
            rightCaption: "Il gas O3 ha una forte correlazione positiva (0.75) con la temperatura e la radiazione solare. " +
                "È presente una correlazione negativa tra la temperatura e NO2, PM10 e PM2.5. " +
                "I restanti inquinanti e parametri meteo non hanno una correlazione significativa."
        },
        "eventi_estremi": {
            left: "static/images/puglia/eventi_estremi.png",
            right: "static/images/lombardia/eventi_estremi.png",
            leftCaption: "Avendo l'O3 una correlazione positiva con la temperatura, ci aspettiamo che venga prodotto " +
                "in maniera elevata anche in condizioni normali in regioni più calde e umide come la Puglia, rispetto " +
                "ad una regione più fredda come la Lombardia.",
            rightCaption: ""
        },
        "media_gas": {
            left: "static/images/puglia/media_valori_inquinanti.png",
            right: "static/images/lombardia/media_valori_inquinanti.png",
            leftCaption: "",
            rightCaption: ""
        },
        "ndvi_medio": {
            left: "static/images/puglia/tempo/NDVI_medio_puglia.png",
            right: "static/images/lombardia/tempo/NDVI_medio_lombardia.png",
            leftCaption: "",
            rightCaption: ""
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

    if ((type === "collage") || (type === "distanza") || (type === "ndvi_gas") || (type === "andamento_gas")) {
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
    } else if (type === "analisi_meteo_gas") {
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
    if ((currentSelectionType === "collage") || (currentSelectionType === "distanza")
        || (currentSelectionType === "ndvi_gas") || (currentSelectionType === "andamento_gas")) {
        // Selezione solo del gas
        showPopupWithImages(gas, null);
    } else if (currentSelectionType === "analisi_meteo_gas") {
        // Selezione di gas e meteo
        showPopupWithImages(gas, meteo);
    }
}

function showPopupWithImages(gas, meteo) {
    console.log('Showing popup with gas:', gas, 'and meteo:', meteo);

    const images = {
        "collage": {
            NO2: {
                left: "static/images/puglia/collage_relazioni_meteo_NO2.png",
                right: "static/images/lombardia/collage_relazioni_meteo_NO2.png",
                leftCaption: '',
                rightCaption: ''
            },
            O3: {
                left: "static/images/puglia/collage_relazioni_meteo_O3.png",
                right: "static/images/lombardia/collage_relazioni_meteo_O3.png",
                leftCaption: 'Troviamo corrispondenza con la correlazione meteo-gas, dove l\'O3 ha una correlazione ' +
                    'positiva con la temperatura.',
                rightCaption: 'Troviamo corrispondenza con la correlazione meteo-gas, dove l\'O3 ha una correlazione ' +
                    'positiva con la temperatura.'
            },
            PM10: {
                left: "static/images/puglia/collage_relazioni_meteo_PM10.png",
                right: "static/images/lombardia/collage_relazioni_meteo_PM10.png",
                leftCaption: '',
                rightCaption: 'Troviamo corrispondenza con la correlazione meteo-gas, dove il PM10 ha una correlazione ' +
                    'negativa con la temperatura.'
            },
            PM25: {
                left: "static/images/puglia/collage_relazioni_meteo_PM2.5.png",
                right: "static/images/lombardia/collage_relazioni_meteo_PM2.5.png",
                leftCaption: '',
                rightCaption: 'Troviamo corrispondenza con la correlazione meteo-gas, dove il PM2.5 ha una correlazione ' +
                    'negativa con la temperatura.'
            }
        },
        "analisi_meteo_gas": {
            NO2: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/NO2_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/NO2_temperatura.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/NO2_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/NO2_precipitazione.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                vvento: {
                    left: "static/images/puglia/rel meteo gas/NO2_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/NO2_vvento.png",
                    leftCaption: '',
                    rightCaption: ''
                }
            },
            O3: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/O3_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/O3_temperatura.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/O3_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/O3_precipitazione.png",
                    leftCaption: '',
                    rightCaption: ''},
                vvento: {
                    left: "static/images/puglia/rel meteo gas/O3_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/O3_vvento.png",
                    leftCaption: '',
                    rightCaption: ''
                }
            },
            PM10: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/PM10_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/PM10_temperatura.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/PM10_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/PM10_precipitazione.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                vvento: {
                    left: "static/images/puglia/rel meteo gas/PM10_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/PM10_vvento.png",
                    leftCaption: '',
                    rightCaption: ''
                }
            },
            PM25: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/PM2.5_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/PM2.5_temperatura.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/PM2.5_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/PM2.5_precipitazione.png",
                    leftCaption: '',
                    rightCaption: ''
                },
                vvento: {
                    left: "static/images/puglia/rel meteo gas/PM2.5_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/PM2.5_vvento.png",
                    leftCaption: '',
                    rightCaption: ''
                }
            }
        },
        "distanza": {
            NO2: {
                left: "static/images/puglia/distanza_meteo_NO2.png",
                right: "static/images/lombardia/distanza_meteo_NO2.png",
                leftCaption: 'La distanza tra le stazioni meteo e le stazioni di monitoraggio degli inquinanti non influisce ' +
                    'sui valori che sono molto simili nonostante la distanza.',
                rightCaption: ''
            },
            O3: {
                left: "static/images/puglia/distanza_meteo_O3.png",
                right: "static/images/lombardia/distanza_meteo_O3.png",
                leftCaption: 'La distanza tra le stazioni meteo e le stazioni di monitoraggio degli inquinanti non influisce ' +
                    'sui valori che sono molto simili nonostante la distanza.',
                rightCaption: ''
            },
            PM10: {
                left: "static/images/puglia/distanza_meteo_PM10.png",
                right: "static/images/lombardia/distanza_meteo_PM10.png",
                leftCaption: 'La distanza tra le stazioni meteo e le stazioni di monitoraggio degli inquinanti non influisce ' +
                    'sui valori che sono molto simili nonostante la distanza.',
                rightCaption: ''
            },
            PM25: {
                left: "static/images/puglia/distanza_meteo_PM2.5.png",
                right: "static/images/lombardia/distanza_meteo_PM2.5.png",
                leftCaption: 'La distanza tra le stazioni meteo e le stazioni di monitoraggio degli inquinanti non influisce ' +
                    'sui valori che sono molto simili nonostante la distanza.',
                rightCaption: ''
            }
        },
        'ndvi_gas': {
            NO2: {
                left: "static/images/puglia/ndvi/NO2_mean.png",
                right: "static/images/lombardia/ndvi/NO2_mean.png",
                leftCaption: '',
                rightCaption: ''
            },
            O3: {
                left: "static/images/puglia/ndvi/O3_mean.png",
                right: "static/images/lombardia/ndvi/O3_mean.png",
                leftCaption: '',
                rightCaption: ''
            },
            PM10: {
                left: "static/images/puglia/ndvi/PM10_mean.png",
                right: "static/images/lombardia/ndvi/PM10_mean.png",
                leftCaption: '',
                rightCaption: ''
            },
            PM25: {
                left: "static/images/puglia/ndvi/PM2.5_mean.png",
                right: "static/images/lombardia/ndvi/PM2.5_mean.png",
                leftCaption: '',
                rightCaption: ''
            }
        },
        'andamento_gas': {
            NO2: {
                left: "static/images/puglia/tempo/NO2_puglia.png",
                right: "static/images/lombardia/tempo/NO2_lombardia.png",
                leftCaption: '',
                rightCaption: ''
            },
            O3: {
                left: "static/images/puglia/tempo/O3_puglia.png",
                right: "static/images/lombardia/tempo/O3_lombardia.png",
                leftCaption: '',
                rightCaption: ''
            },
            PM10: {
                left: "static/images/puglia/tempo/PM10_puglia.png",
                right: "static/images/lombardia/tempo/PM10_lombardia.png",
                leftCaption: '',
                rightCaption: ''
            },
            PM25: {
                left: "static/images/puglia/tempo/PM2.5_puglia.png",
                right: "static/images/lombardia/tempo/PM2.5_lombardia.png",
                leftCaption: '',
                rightCaption: ''
            }
        }
    };

    const selectedImages = meteo
    ? images["analisi_meteo_gas"][gas][meteo]
    : (currentSelectionType === "distanza"
        ? images["distanza"][gas]
        : (currentSelectionType === "ndvi_gas" || currentSelectionType === "andamento_gas")
            ? images[currentSelectionType][gas]
            : images["collage"][gas]);

    if (selectedImages) {
        document.getElementById("popup-img-left").src = selectedImages.left;
        // document.getElementById("popup-caption-left").textContent = `Puglia: ${gas} ${meteo || ''}`;
        document.getElementById("popup-caption-left").textContent = selectedImages.leftCaption;
        document.getElementById("popup-img-right").src = selectedImages.right;
        // document.getElementById("popup-caption-right").textContent = `Lombardia: ${gas} ${meteo || ''}`;
        document.getElementById("popup-caption-right").textContent = selectedImages.rightCaption;
        document.getElementById("popup").style.display = "block";
    }
}