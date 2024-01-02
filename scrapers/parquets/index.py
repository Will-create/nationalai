import pandas as pd
import json
parquet_path = '/Users/mac/Downloads/train-00000-of-00001-0252c1088531b372.parquet'

def parquet_to_json(input_path, output_path):
    try:
        # Lire le fichier parquet
        df = pd.read_parquet(input_path)
        
        arr = []
        # Boucler sur les lignes (on imprime juste pour l'instant)
        df = df[['transcription', 'translation']]  # Exemple de colonnes
        df['audio'] = '-'
        df['hasaudio'] = False
        df['type'] = 'mos-fr'

        df = df[(df['transcription'] != '') & (df['translation'] != '')]
        df = df.rename(columns={'transcription': 'name', 'translation': 'value'})


        # Convertir en JSON
        df.to_json('output/translation.json', orient='records', lines=False, force_ascii=False)
        
        print(f"Sauvegardé en JSON à {output_path} 🎉")
    except Exception as e:
        print(f"Oups! Une erreur est survenue: {e} 😟")

# Usage exemple
output_json_path = 'output.json'  # Remplace par ton chemin souhaité

# Exécuter la fonction
parquet_to_json(parquet_path, output_json_path)
