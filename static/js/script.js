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
            leftCaption: " L'NDVI della puglia è più alto nei mesi autunnali e invernali rispetto a quelli primaverili" +
                " ed estivi. Questo fenomeno probabilmente legato alla natura generalmente secca del territorio.",
            rightCaption: "L'andamento dell'NDVI lombardo mostra come la vegetazione aumenti durante i mesi primaverili" +
                " e diminuisca in quelli autunnali come ci si aspetta."
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
                    leftCaption: 'Esiste una correlazione debole con la temperatura (circa -0,155).' +
                        ' Questo livello di correlazione non è sufficiente per rappresentare una vera e propria' +
                        ' correlazione tra  i due elementi. In generale si può dire che la temperatura è collegabile' +
                        ' all\'andamento stagionale del NO2 legato all\'inquinamento degli impianti di riscaldamento.',
                    rightCaption: 'Il coefficiente di Pearson dimostra una discreta correlazione negativa con la' +
                        ' temperatura (-0.538). Cosa che coincide con la maggiore produzione di NO2 legata ai ' +
                        'riscaldamenti e alla minore attività delle linee dei trasporti pubblici nei mesi estivi.'
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/NO2_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/NO2_precipitazione.png",
                    leftCaption: 'Non vi sono evidenti correlazioni con il verificarsi di precipitazioni e la' +
                        ' concentrazione del NO2nonostante questo gas sia collegabile al fenomeno delle piogge acide.',
                    rightCaption: 'Esiste una lieve correlazione con le precipitazioni in Lombardia (-0.111). ' +
                        'Non esistono sostanziali differenze rispetto a quello detto per la Puglia.'
                },
                vvento: {
                    left: "static/images/puglia/rel meteo gas/NO2_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/NO2_vvento.png",
                    leftCaption: 'Non esiste un\'evidente correlazione tra la velocità del vento e la concentrazione di' +
                        ' NO2 (circa 0,002). Questo può essere dovuto alla carenza di una grossa variabilità di' +
                        ' velocità del vento e concentrazione di NO2 misurata ma anche alla relativa pesantezza del NO2.',
                    rightCaption: 'Anche in questo caso non esiste una forte correlazione negativa tra NO2 e velocità' +
                        ' del vento (-0.076). In Lombardia la correlazione è più forte di quella pugliese ma è comunque' +
                        ' troppo vicina allo 0 suggerendo l\'assenza di correlazione.'
                }
            },
            O3: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/O3_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/O3_temperatura.png",
                    leftCaption: 'Vi è una discreta correlazione con la temperatura e la concentrazione di O3 (0,4).',
                    rightCaption: 'Vi è una forte correlazione con la temperatura in Lombardia (0.748). Queste' +
                        ' correlazioni evidenziano come le alte temperature influenzano la presenza di O3 e come questa' +
                        ' sia più incisiva in Lombardia in quanto la vegetazione è più attiva nelle stagioni calde al contrario della Puglia.'
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/O3_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/O3_precipitazione.png",
                    leftCaption: 'Vi è una leggera correlazione negativa con le precipitazioni (-0,14). L\'O3 però non è' +
                        ' un gas che viene atterrato dalla pioggia per cui è probabile che la correlazione sia' +
                        ' semplicemente dovuta alla stagionalità delle grosse precipitazioni.',
                    rightCaption: 'Qui la correlazione è ancora più bassa (-0.019) dimostrando come i due fenomeni non siano direttamente correlati.'},
                vvento: {
                    left: "static/images/puglia/rel meteo gas/O3_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/O3_vvento.png",
                    leftCaption: 'Non vi sono correlazioni con la velocità del vento (-0,004).',
                    rightCaption: 'Anche se il coefficente di Pearson è più alto non vi sono correlazioni' +
                        ' con la velocità del vento (-0.0999).'
                }
            },
            PM10: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/PM10_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/PM10_temperatura.png",
                    leftCaption: 'Il PM10 è meno influenzabile dalla temperatura (0,086) in quanto la produzione è' +
                        ' più legata al traffico urbano che a fenomeni legati alle temperature alte come nel caso dell\'O3.',
                    rightCaption: 'Vi è una Bassa correlazione negativa in Lombardia(-0.326). Questo valore è' +
                        ' probabilmente legato alla più alta attività vegetale nei periodi in cui le temperature sono ' +
                        'più alte. Come anche dimostrato dalla relazione con NDVI locale.'
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/PM10_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/PM10_precipitazione.png",
                    leftCaption: 'Esiste una lieve correlazione negativa legata alle precipitazioni (-0,13).' +
                        ' La concentrazione di PM10 è però riducibile dalla piaggio che è in grado di abbattere queste particelle al suolo.',
                    rightCaption: 'Anche qui vi è una lieve correlazione negativa (-0.178).'
                },
                vvento: {
                    left: "static/images/puglia/rel meteo gas/PM10_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/PM10_vvento.png",
                    leftCaption: 'Non esiste una sostanziale correlazione tra PM10 e velocità del vento (0,011).',
                    rightCaption: 'Non è presente una correlazione tra PM10 e velocità del vento (0.016).'
                }
            },
            PM25: {
                temperatura: {
                    left: "static/images/puglia/rel meteo gas/PM2.5_temperatura.png",
                    right: "static/images/lombardia/rel meteo gas/PM25_temperatura.png",
                    leftCaption: 'Non vi è una correlazione con il PM2,5 e la temperatura in Puglia (-0,0016).',
                    rightCaption: 'Vi è una consistente correlazione tra temperatura e PM2,5 (-0.430).' +
                        ' La correlazione è probabilmente dovuta alla relazione tra NDVI e temperatura.'
                },
                precipitazione: {
                    left: "static/images/puglia/rel meteo gas/PM2.5_precipitazione.png",
                    right: "static/images/lombardia/rel meteo gas/PM25_precipitazione.png",
                    leftCaption: 'Esiste una lieve correlazione negativa legata alle precipitazioni (-0.14).' +
                        ' La concentrazione di PM2,5 è però riducibile dalla piaggio che è in grado di abbattere' +
                        ' queste particelle al suolo.',
                    rightCaption: 'Anche qui vi è una lieve correlazione negativa (-0.152).'
                },
                vvento: {
                    left: "static/images/puglia/rel meteo gas/PM2.5_vvento.png",
                    right: "static/images/lombardia/rel meteo gas/PM25_vvento.png",
                    leftCaption: 'Non sono presenti correlazioni tra PM2,5 e la velocità del vento (0.01).',
                    rightCaption: 'È presente una lieve correlazione negativa (-0.106). Il PM2,5 è tecnicamente' +
                        ' suscettibile alle condizioni atmosferiche come pioggia e vento ma questo livello di' +
                        ' correlazione è comunque troppo basso per definire una correlazione effettiva.'
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
                leftCaption: 'Esiste una correlazione negativa debole (circa -0,229) tra la concentrazione di NO2' +
                    ' e il valore NDVI misurato. Analizzata la natura del gas è probabile che la correlazione sia ' +
                    'dovuta alla naturale capacità della vegetazione di assorbire azoto durante la fase di crescita' +
                    ' e non agli andamenti stagionali della vegetazione. Questo perché, come mostrato dai grafi di' +
                    ' andamento mensile dell\'NDVI, questo è più alto nei mesi autunnali e invernali rispetto a' +
                    ' quelli primaverili e estivi.',
                rightCaption: 'Esiste una consistente correlazione negativa tra NO2 e NDVI in Lombardia (-0.515).' +
                    ' Questo valore è probabilmente dovuto alla coincidente stagionalità dell\'attività vegetale come' +
                    ' è possibile vedere dagli andamenti temporali. Un\'ulteriore spiegazione è associabile alla' +
                    ' capacità della vegetazione di assorbire azoto durante le fasi di crescita.'
            },
            O3: {
                left: "static/images/puglia/ndvi/O3_mean.png",
                right: "static/images/lombardia/ndvi/O3_mean.png",
                leftCaption: 'La lieve correlazione negativa tra la presenza di O3 e il valore medio dell\'NDVI (-0,136)' +
                    ' è probabilmente dovuto alla naturale inversione dei trend temporali dell\'NDVI in puglia. Siccome' +
                    ' l\'NDVI non considera il livello di vegetazione acquatico in quanto assorbe l\'infrarosso.',
                rightCaption: 'È presente una sostanziale correlazione tra NDVI e O3 (0.546). L\'O3 è un gas che si' +
                    ' forma per ionizzazione dell\'O2,a partire da composti organici volatili (COV)' +
                    '  e ossidi di azoto (NOx) da parte delle radiazioni ultraviolette. È quindi naturale' +
                    ' che con l\'aumento della vegetazione e delle temperature vi sia un aumento dell\'O3.'
            },
            PM10: {
                left: "static/images/puglia/ndvi/PM10_mean.png",
                right: "static/images/lombardia/ndvi/PM10_mean.png",
                leftCaption: 'La vegetazione è in grado di assorbire, a gradi variabili di efficacia, le particelle di PM10.' +
                    ' Questo è dimostrato dal valore negativo modularmente alto del coefficiente di Person (-0,566).',
                rightCaption: 'Anche in questo caso il valore di correlazione (-0.437) indica che la vegetazione è ' +
                    'legata ad una minore quantità di PM10. Cosa possibilmente dovuta alla minore presenza' +
                    ' di PM10 in aree meno densamente trafficate, che quindi possono avere più vegetazione,' +
                    ' che alla capacità di essa di assorbire queste particelle. '
            },
            PM25: {
                left: "static/images/puglia/ndvi/PM2.5_mean.png",
                right: "static/images/lombardia/ndvi/PM25_mean.png",
                leftCaption: 'Per quanto riguarda la Puglia non sono presenti correlazioni evidenti tra NDVI e la concentrazione del PM2,5 (0,078).',
                rightCaption: 'La Lombardia presenta una discreta correlazione negativa tra NDVI e PM2,5 (-0.421). ' +
                    'Questo perché la vegetazione è in grado di assorbire, con diversi livelli di efficacia, il PM2,5 proprio come il PM10.'
            }
        },
        'andamento_gas': {
            NO2: {
                left: "static/images/puglia/tempo/NO2_puglia.png",
                right: "static/images/lombardia/tempo/NO2_lombardia.png",
                leftCaption: 'Come mostrato dai grafi di andamento temporale medio del NO2, la concentrazione di' +
                    ' NO2 cresce durante i mesi autunnali per raggiungere il suo massimo tra dicembre e febbraio ' +
                    'e diminuire tra marzo e aprile e rimanendo relativamente basso nei periodo estivo.' +
                    ' Questo fenomeno è legato all\'utilizzo dei riscaldamenti che rappresentano uno dei principali' +
                    ' produttori di NO2 assieme alla combustione degli idrocarburi legata ai mezzi di trasporto.',
                rightCaption: 'L\'NO2 Cresce nel periodo tra settembre e febbraio, dove incomincia a decrescere per' +
                    ' raggiungere il suo minimo nel mese di agosto. Questo trend è opposto a quello dell\'andamento' +
                    ' del NDVI che cresce durante i mesi di maggio-lugio per poi incominciare a decrescere tra settembre' +
                    ' e dicembre. Siccome esiste una  correlazione con la temperatura è probabile che questa correlazione' +
                    ' sia dovuta alla coincidenza di perdita di vegetazione nei mesi invernali con l\'utilizzo dei riscaldamenti.'
            },
            O3: {
                left: "static/images/puglia/tempo/O3_puglia.png",
                right: "static/images/lombardia/tempo/O3_lombardia.png",
                leftCaption: 'L\'O3 della Puglia e della Lombardia sono praticamente simili nella loro distribuzione' +
                    ' temporale. Questo perché nei mesi estivi le zone dell\'emisfero boreale sono' +
                    ' più soggette ai raggi ultraviolette per cui vi è una maggiore produzione' +
                    ' di O3. Inoltre nei mesi estivi vi è una maggiore attività vegetale.',
                rightCaption: ''
            },
            PM10: {
                left: "static/images/puglia/tempo/PM10_puglia.png",
                right: "static/images/lombardia/tempo/PM10_lombardia.png",
                leftCaption: 'Il PM10 in Puglia mostra un\'andamento temporale abbastanza irregolare mostrando dei ' +
                    'minimi locali tra marzo e maggio e settembre e novembre e dei picchi di massimo locali tra giugno, febbraio e dicembre.',
                rightCaption: 'Per quanto riguarda l\'andamento temporale del PM10 in Lombardia, qui l\'andamento è più ' +
                    'regolare, avendo dei valori più alti tra ottobre e marzo. Che è anche il periodo di tempo in cui il NDVI lombardo è più basso.'
            },
            PM25: {
                left: "static/images/puglia/tempo/PM25_puglia.png",
                right: "static/images/lombardia/tempo/PM25_lombardia.png",
                leftCaption: 'Il PM2,5 in Puglia mostra un\'andamento temporale abbastanza irregolare mostrando dei ' +
                    'minimi locali tra aprile e maggio e settembre e novembre e dei picchi di massimo locali tra luglio,' +
                    ' febbraio e dicembre.',
                rightCaption: 'Per quanto riguarda l\'andamento temporale del PM2,5 in Lombardia, qui l\'andamento è più' +
                    ' regolare, avendo dei valori più alti tra ottobre e marzo. Che è anche il periodo di tempo in cui il NDVI lombardo è più basso.'
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