from flask import Flask

import folium
from folium.plugins import HeatMapWithTime
from utils import get_mappaggio


mappaggio = get_mappaggio()

app = Flask(__name__)

@app.route('/')
def index():
    # Crea la mappa
    map_left1 = folium.Map(tiles=None, location=[43.0, 12.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_left1)
    map_left2 = folium.Map(tiles=None, location=[43.0, 12.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_left2)
    map_left3 = folium.Map(tiles=None, location=[43.0, 12.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_left3)
    map_left4 = folium.Map(tiles=None, location=[43.0, 12.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_left4)

    map_right1 = folium.Map(location=[42.0, 9.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_right1)
    map_right2 = folium.Map(location=[42.0, 9.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_right2)
    map_right3 = folium.Map(location=[42.0, 9.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_right3)
    map_right4 = folium.Map(location=[42.0, 9.0], zoom_start=6)
    folium.TileLayer("OpenStreetMap").add_to(map_right4)
    
    #folium.LayerControl().add_to(map_left)
   
    # Aggiungi lo shapefile alla mappa
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left1)
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left2)
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left3)
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left4)

    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right1)
    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right2)
    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right3)
    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right4)

    #Heatmap Puglia
    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/NO2.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data,index=time_index).add_to(map_left1)

    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/O3.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data,index=time_index).add_to(map_left2)

    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/PM10.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data,index=time_index).add_to(map_left3)

    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/PM2.5.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data,index=time_index).add_to(map_left4)
    
    #Heatmap Lombardia
    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/NO2.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data,index=time_index).add_to(map_right1)

    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/O3.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data,index=time_index).add_to(map_right2)

    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/PM10.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data,index=time_index).add_to(map_right3)

    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/PM25.csv', 'valore_inquinante_misurato', 'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data,index=time_index).add_to(map_right4)


    #folium.LayerControl().add_to(map_left)

    map_left_NO2_html = map_left1._repr_html_()
    map_left_O3_html = map_left2._repr_html_()
    map_left_PM10_html = map_left3._repr_html_()
    map_left_PM25_html = map_left4._repr_html_()

    map_right_NO2_html = map_right1._repr_html_()
    map_right_O3_html = map_right2._repr_html_()
    map_right_PM10_html = map_right3._repr_html_()
    map_right_PM25_html = map_right4._repr_html_()

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Analisi gas in Puglia e Lombardia</title>
        <style>
            .testo {{
                font-family: Arial, Helvetica, sans-serif;
            }}
            #map-container {{
                display: flex;
            }}
            .map {{
                width: 50%;
                height: 600px;
            }}
            .container {{
                width: 100%;
            }}
            #map-container-o3 {{
                display: flex;
            }}
            #map-container-no2, #map-container-pm10, #map-container-pm25 {{
                display: none;
            }}
        </style>
    </head>
    <body>
        <h2 class="testo">Analisi gas in Puglia e Lombardia</h2>
        <label for="cars" class="testo">Gas da analizzare: </label>
        <select name="cars" id="mySelect" class="testo" onchange="myFunction()">
            <option value="map-container-no2">NO2</option>
            <option value="map-container-o3">O3</option>
            <option value="map-container-pm10">PM10</option>
            <option value="map-container-pm25">PM2.5</option>
        </select>
        <br>
        <div id="map-container">
            <div class="container" id="map-container-no2">
                <div class="map">{map_left_NO2_html}</div>
                <div class="map">{map_right_NO2_html}</div>
            </div>

            <div class="container" id="map-container-o3">
                <div class="map">{map_left_O3_html}</div>
                <div class="map">{map_right_O3_html}</div>
            </div>

            <div class="container" id="map-container-pm10">
                <div class="map">{map_left_PM10_html}</div>
                <div class="map">{map_right_PM10_html}</div>
            </div>

            <div class="container" id="map-container-pm25">
                <div class="map">{map_left_PM25_html}</div>
                <div class="map">{map_right_PM25_html}</div>
            </div>
            
        </div>

        <script>
        function myFunction() {{
        // Recupera il valore selezionato
            var selectedValue = document.getElementById("mySelect").value;

            // Nasconde tutti i contenitori di mappe
            var containers = document.querySelectorAll(".container");
            containers.forEach(function(container) {{
                container.style.display = "none";
            }});

            // Mostra il contenitore corrispondente al valore selezionato
            document.getElementById(selectedValue).style.display = "flex";
        }}
    </script>
    </body>
    </html>
    """
    #html.save("dual_map_different_centers.html")
    return html

if __name__ == '__main__':
    app.run(debug=True)