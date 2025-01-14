from flask import Flask

import folium
from folium.plugins import HeatMapWithTime
from utils import get_mappaggio

mappaggio = get_mappaggio()

app = Flask(__name__)


@app.route('/')
def index():
    zoom_start_value = 7
    # Crea la mappa
    map_left1 = folium.Map(tiles=None, location=[41.0, 16.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_left1)
    map_left2 = folium.Map(tiles=None, location=[41.0, 16.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_left2)
    map_left3 = folium.Map(tiles=None, location=[41.0, 16.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_left3)
    map_left4 = folium.Map(tiles=None, location=[41.0, 16.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_left4)

    map_right1 = folium.Map(location=[45.5, 9.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_right1)
    map_right2 = folium.Map(location=[45.5, 9.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_right2)
    map_right3 = folium.Map(location=[45.5, 9.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_right3)
    map_right4 = folium.Map(location=[45.5, 9.0], zoom_start=zoom_start_value)
    folium.TileLayer("OpenStreetMap").add_to(map_right4)

    # Aggiungi lo shapefile alla mappa
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left1)
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left2)
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left3)
    mappaggio.add_shp_to_map('data/confini/puglia/puglia.geojson', map_left4)

    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right1)
    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right2)
    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right3)
    mappaggio.add_shp_to_map('data/confini/lombardia/lombardia.geojson', map_right4)

    # Heatmap Puglia
    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/NO2.csv', 'valore_inquinante_misurato',
                                                         'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data, index=time_index).add_to(map_left1)

    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/O3.csv', 'valore_inquinante_misurato',
                                                         'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data, index=time_index).add_to(map_left2)

    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/PM10.csv', 'valore_inquinante_misurato',
                                                         'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data, index=time_index).add_to(map_left3)

    puglia_data, time_index = mappaggio.get_data_HeatMap('data/gas/puglia/PM2.5.csv', 'valore_inquinante_misurato',
                                                         'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(puglia_data, index=time_index).add_to(map_left4)

    # Heatmap Lombardia
    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/NO2.csv', 'valore_inquinante_misurato',
                                                            'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data, index=time_index).add_to(map_right1)

    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/O3.csv', 'valore_inquinante_misurato',
                                                            'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data, index=time_index).add_to(map_right2)

    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/PM10.csv', 'valore_inquinante_misurato',
                                                            'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data, index=time_index).add_to(map_right3)

    lombardia_data, time_index = mappaggio.get_data_HeatMap('data/gas/lombardia/PM25.csv', 'valore_inquinante_misurato',
                                                            'data_di_misurazione', 'Latitude', 'Longitude')
    HeatMapWithTime(lombardia_data, index=time_index).add_to(map_right4)

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
            body {{
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f9fc;
                color: #333;
            }}

            h2 {{
                text-align: center;
                color: #2c3e50;
                margin-top: 20px;
            }}

            #controls {{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px 0;
            }}

            #controls select {{
                padding: 10px;
                font-size: 16px;
                margin-left: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #fff;
                color: #2c3e50;
                box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
            }}

            #map-container {{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }}

            .container {{
                display: none;
                width: 90%;
                max-width: 1200px;
            }}

            .map-group {{
                display: flex;
                gap: 20px;
                justify-content: space-between;
            }}

            .map {{
                flex: 1;
                min-height: 1px;
            }}

            .map iframe {{
                height: 800px;
                width: 100%;
                border-radius: 15px;
                border: 1px solid #ddd;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}

            .visible {{
                display: block !important;
            }}

            #controls label {{
                font-size: 18px;
                color: #2c3e50;
            }}

            select:focus {{
                outline: none;
                border: 1px solid #2c3e50;
            }}
        </style>
    </head>
    <body>
        <h2>Analisi Gas in Puglia e Lombardia</h2>
        <div id="controls">
            <label for="gas-select">Seleziona il gas da analizzare:</label>
            <select id="gas-select" onchange="switchMap()">
                <option value="map-container-no2">NO2</option>
                <option value="map-container-o3">O3</option>
                <option value="map-container-pm10">PM10</option>
                <option value="map-container-pm25">PM2.5</option>
            </select>
        </div>
        <div id="map-container">
            <div class="container visible" id="map-container-no2">
                <div class="map-group">
                    <div class="map">{map_left1._repr_html_()}</div>
                    <div class="map">{map_right1._repr_html_()}</div>
                </div>
            </div>
            <div class="container" id="map-container-o3">
                <div class="map-group">
                    <div class="map">{map_left2._repr_html_()}</div>
                    <div class="map">{map_right2._repr_html_()}</div>
                </div>
            </div>
            <div class="container" id="map-container-pm10">
                <div class="map-group">
                    <div class="map">{map_left3._repr_html_()}</div>
                    <div class="map">{map_right3._repr_html_()}</div>
                </div>
            </div>
            <div class="container" id="map-container-pm25">
                <div class="map-group">
                    <div class="map">{map_left4._repr_html_()}</div>
                    <div class="map">{map_right4._repr_html_()}</div>
                </div>
            </div>
        </div>
        <script>
            function switchMap() {{
                var selected = document.getElementById("gas-select").value;
                var containers = document.querySelectorAll(".container");
                containers.forEach(function(container) {{
                    container.classList.remove("visible");
                }});
                document.getElementById(selected).classList.add("visible");
            }}
        </script>
    </body>
    </html>
    """
    return html


if __name__ == '__main__':
    app.run(debug=True)
