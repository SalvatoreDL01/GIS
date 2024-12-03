from flask import Flask

import folium
from utils import get_mappaggio


mappaggio = get_mappaggio()

app = Flask(__name__)

@app.route('/')
def index():
    # Crea la mappa
    map = folium.Map(location=[43.0, 12.0], zoom_start=6)

    # Aggiungi lo shapefile alla mappa
    map = mappaggio.add_shp_to_map('data/province/Province.geojson', map)

    # Codice JavaScript personalizzato
    custom_js = """
    <script>
        // Accedi alla mappa
        document.addEventListener('DOMContentLoaded', function() {
            var map = document.querySelector('.folium-map');

            // Personalizza i layer
            var layers = document.querySelectorAll('path'); // Seleziona i layer (ad esempio i confini delle province)
            layers.forEach(function(layer) {
                layer.addEventListener('click', function() {
                    if(this.style.fill == 'green'){
                        this.style.stroke = '';  // Ripristina il colore del bordo
                        this.style.strokeWidth = '';
                        this.style.fill = ''; // Ripristina il colore di riempimento
                    }else{
                        this.style.stroke = 'green';  // Cambia colore al bordo
                        this.style.fill = 'green';
                        this.style.strokeWidth = '3px';
                    }
                });
            });
        });
    </script>
    """
    
    # Inserisci il JavaScript nella mappa
    map.get_root().html.add_child(folium.Element(custom_js))
    
    # Ritorna la mappa come HTML
    return map._repr_html_()

if __name__ == '__main__':
    app.run(debug=True)