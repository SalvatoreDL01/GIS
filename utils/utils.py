import pandas as pd
import geopandas
import folium

class mappaggio:
    @staticmethod
    def add_shp_to_map(path,map):

        province = geopandas.read_file(path)
        layer_province = folium.GeoJson(
        province,
        style_function=lambda feature: {
            "color": "#00BFFF",  # Colore iniziale del bordo
            "fillColor": "#00BFFF",  # Colore iniziale di riempimento
            "weight": 1,
            "fillOpacity": 0.2,
        },
        highlight_function=lambda feature: {
            "fillColor": (
                "red"
            ),
            "color" : "red",
            "weight" : 2,
            "bringToFront": True
        },
        tooltip=folium.features.GeoJsonTooltip(
            fields=["NOME_PRO"],  # Sostituisci "nome" con il campo del GeoJSON contenente i nomi delle province
            aliases=["Provincia:"],  # Alias per il campo (opzionale)
            sticky=True  # Tooltip sempre visibile
        ),
        ).add_to(map)

        map.fit_bounds(layer_province.get_bounds())

        return map

