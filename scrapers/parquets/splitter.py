import pandas as pd

# Chemin vers ton fichier Parquet
parquet_path = 'output/dataset.parquet'
en_parquet_path = 'output/dataset_en.parquet'
fr_parquet_path = 'output/dataset_fr.parquet'

def split_save_parquet(input_path):
    try:
        # Lire le fichier Parquet
        df = pd.read_parquet(input_path)
        
        # Splitter les données
        df_fr = df[df['type'] == 'mos-fr']
        df_en = df[df['type'] == 'mos-en']
        
        # Sauvegarder en Parquet
        df_fr.to_parquet(fr_parquet_path)
        df_en.to_parquet(en_parquet_path)
        
        print("Fini! Check 'dataset_fr.parquet' et 'dataset_en.parquet'. 🚀")
    except Exception as e:
        print(f"Oups! Erreur: {e} 😬")

# Exécuter la fonction
split_save_parquet(parquet_path)
