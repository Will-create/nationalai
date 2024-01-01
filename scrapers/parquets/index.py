import pandas as pd

parquet_path = '/Users/mac/Downloads/train-00000-of-00001-0252c1088531b372.parquet'

def parquet_to_json(input_path, output_path):
    try:
        # Lire le fichier parquet
        df = pd.read_parquet(input_path)
        
        # Boucler sur les lignes (on imprime juste pour l'instant)
        for index, row in df.iterrows():
            print(f"Traitement de la ligne: {index}")  # Affiche l'index de la ligne
            obj = {}
            
            print(f"Traitement de la ligne: {row.language}")# Affiche l'index de la ligne
        
        # Sauvegarde le dataframe en fichier JSON
        df.to_json(output_path, orient='records', lines=True)
        
        print(f"Sauvegardé en JSON à {output_path} 🎉")
    except Exception as e:
        print(f"Oups! Une erreur est survenue: {e} 😟")

# Usage exemple
output_json_path = 'output.json'  # Remplace par ton chemin souhaité

# Exécuter la fonction
parquet_to_json(parquet_path, output_json_path)
