from flask import Flask, render_template

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

    # Renderizza il template HTML separato
    return render_template("index.html",
                           map_left1=map_left1._repr_html_(),
                           map_left2=map_left2._repr_html_(),
                           map_left3=map_left3._repr_html_(),
                           map_left4=map_left4._repr_html_(),
                           map_right1=map_right1._repr_html_(),
                           map_right2=map_right2._repr_html_(),
                           map_right3=map_right3._repr_html_(),
                           map_right4=map_right4._repr_html_())


if __name__ == '__main__':
    app.run(debug=True)