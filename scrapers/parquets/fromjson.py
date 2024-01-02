import pandas as pd

json_path1 = 'output/translation2.json'  # Remplace avec ton chemin du fichier JSON
json_path2 = 'output/translation3.json'  # Remplace avec ton chemin du fichier JSON
json_path3 = 'output/translation4.json'  # Remplace avec ton chemin du fichier JSON
json_path4 = 'output/translation5.json'  # Remplace avec ton chemin du fichier JSON
json_path5 = 'output/translation6.json'  # Remplace avec ton chemin du fichier JSON
parquet_path = 'output/dataset.parquet'  # Remplace avec ton chemin de sortie souhaité

def json_to_parquet():
    try:
        # Charger les données JSON
        df = pd.read_json(json_path1, lines=False)
        df2 = pd.read_json(json_path2, lines=False)
        df3 = pd.read_json(json_path3, lines=False)
        df4 = pd.read_json(json_path4, lines=False)
        df5 = pd.read_json(json_path5, lines=False)

        # combine the 
        df_combined = pd.concat([df, df2, df3, df4, df5])

        # View it
        print(df_combined)

        # Sauvegarde en format Parquet
        df_combined.to_parquet(parquet_path)
        
        print("C'est fait, check ton fichier Parquet! 🚀")
    except Exception as e:
        print(f"Oops, petit souci: {e} 😬")

# Exécution de la fonction
json_to_parquet()
