import pandas as pd

json_path = 'input.json'  # Remplace avec ton chemin du fichier JSON
parquet_path = 'output.parquet'  # Remplace avec ton chemin de sortie souhaité

def json_to_parquet(input_path, output_path):
    try:
        # Charger les données JSON
        df = pd.read_json(input_path, lines=True)
        
        # Sauvegarde en format Parquet
        df.to_parquet(output_path)
        
        print("C'est fait, check ton fichier Parquet! 🚀")
    except Exception as e:
        print(f"Oops, petit souci: {e} 😬")

# Exécution de la fonction
json_to_parquet(json_path, parquet_path)
