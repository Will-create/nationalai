import pandas as pd

json_path1 = 'output/webonary.json'  # Remplace avec ton chemin du fichier JSON
json_path2 = 'output/lexique.json'  # Remplace avec ton chemin du fichier JSON
json_path3 = 'output/translation.json'  # Remplace avec ton chemin du fichier JSON
parquet_path = 'output/dataset.parquet'  # Remplace avec ton chemin de sortie souhaité

def json_to_parquet():
    try:
        # Charger les données JSON
        df = pd.read_json(json_path1, lines=False)
        df2 = pd.read_json(json_path2, lines=False)
        df3 = pd.read_json(json_path3, lines=False)

        # combine the 
        df_combined = pd.concat([df, df2, df3])

        # View it
        print(df_combined)

        # Sauvegarde en format Parquet
        df_combined.to_parquet(parquet_path)
        
        print("C'est fait, check ton fichier Parquet! 🚀")
    except Exception as e:
        print(f"Oops, petit souci: {e} 😬")

# Exécution de la fonction
json_to_parquet()
