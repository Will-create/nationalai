import pandas as pd

lexique_path = 'output/lexique.json'  # Remplace avec ton chemin du fichier JSON
webonary_path = 'output/webonary.json'  # Remplace avec ton chemin du fichier JSON
translate_path = 'output/translation.json'  # Remplace avec ton chemin du fichier JSON
json_path1 = 'output/translation2.json'  # Remplace avec ton chemin du fichier JSON
json_path2 = 'output/translation3.json'  # Remplace avec ton chemin du fichier JSON
json_path3 = 'output/translation4.json'  # Remplace avec ton chemin du fichier JSON
json_path4 = 'output/translation5.json'  # Remplace avec ton chemin du fichier JSON
json_path5 = 'output/translation6.json'  # Remplace avec ton chemin du fichier JSON
parquet_path = 'output/dataset.parquet'  # Remplace avec ton chemin de sortie souhaité

def json_to_parquet():
    try:
        # Charger les données JSON
        df_1 = pd.read_json(lexique_path, lines=False)
        df_2 = pd.read_json(webonary_path, lines=False)
        df_3 = pd.read_json(translate_path, lines=False)
        df = pd.read_json(json_path1, lines=False)
        df2 = pd.read_json(json_path2, lines=False)
        df3 = pd.read_json(json_path3, lines=False)
        df4 = pd.read_json(json_path4, lines=False)
        df5 = pd.read_json(json_path5, lines=False)

        # combine the 
        df_combined = pd.concat([df_1, df_2, df_3, df, df2, df3, df4, df5])

        # View it
        print(df_combined)

        # Sauvegarde en format Parquet
        df_combined.to_parquet(parquet_path)
        
        print("C'est fait, check ton fichier Parquet! 🚀")
    except Exception as e:
        print(f"Oops, petit souci: {e} 😬")

# Exécution de la fonction
json_to_parquet()
