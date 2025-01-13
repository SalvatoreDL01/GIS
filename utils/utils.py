import pandas as pd
import geopandas
import folium
from folium.plugins import HeatMapWithTime
from folium.plugins import DualMap

def normalize(group, colonna):
        min_val = group[colonna].min()
        max_val = group[colonna].max()
        group[colonna] = (group[colonna] - min_val) / (max_val - min_val)
        return group

class mappaggio:

    @staticmethod
    def get_data_HeatMap(path, colonna_valore, colonna_data, latitudine, longitudine):
        data = pd.read_csv(path)

        data = data[[colonna_valore, colonna_data, latitudine, longitudine]]

        normalized_data = normalize(data, colonna_valore)
        normalized_data[colonna_data] = pd.to_datetime(normalized_data[colonna_data])
        gruped_data = normalized_data.groupby(colonna_data)

        heat_data = [
        group[[latitudine, longitudine, colonna_valore]].values.tolist()
        for _, group in gruped_data
        ]
        time_index = [date.strftime('%Y-%m-%d') for date, _ in normalized_data.groupby(colonna_data)]

        return heat_data, time_index
    
    @staticmethod
    def dual_Map():
        # Creazione della mappa divisa
        dual_map = DualMap(location=[41.9028, 12.4964], zoom_start=6)

        # Aggiunta della prima mappa (sinistra)
        folium.Marker(
            location=[41.9028, 12.4964],
            popup="Roma"
        ).add_to(dual_map.m1)

        # Aggiunta della seconda mappa (destra)
        folium.Marker(
            location=[45.4642, 9.1900],
            popup="Milano"
        ).add_to(dual_map.m2)

    @staticmethod
    def add_shp_to_map(path,map):

        fg = folium.FeatureGroup(name="Puglia", control = False).add_to(map)

        province = geopandas.read_file(path)
        layer_province = folium.GeoJson(
        province,
        style_function=lambda feature: {
            "color": "#00BFFF",  # Colore iniziale del bordo
            "fillColor": "#00BFFF",  # Colore iniziale di riempimento
            "weight": 1,
            "fillOpacity": 0.2,
        }
        ).add_to(fg)

        map.fit_bounds(layer_province.get_bounds())