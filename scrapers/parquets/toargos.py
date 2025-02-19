import pandas as pd

# Chemin vers ton fichier Parquet
parquet_path = 'output/dataset_en.parquet'

# parquet_path = 'output/dataset_fr.parquet'
model = 'mos_en'
# model = 'mos_fr'

def split_save_text(input_path):
    try:
        # Lire le fichier Parquet
        df = pd.read_parquet(input_path)
        
        # Extraire les colonnes
        names = df['name'].tolist()
        values = df['value'].tolist()
        
        # Convertir en string avec des retours à la ligne
        source_text = '\n'.join(names)
        target_text = '\n'.join(values)
        
        # Sauvegarder dans des fichiers texte
        with open('output/argos/' + model + '/v1/source', 'w', encoding='utf-8') as f_source:
            f_source.write(source_text)
            
        with open('output/argos/' + model + '/v1/target', 'w', encoding='utf-8') as f_target:
            f_target.write(target_text)
        
        print("C'est bon! Tu as 'source.txt' et 'target'. 📘➡📗")
    except Exception as e:
        print(f"Oups! Une erreur est survenue: {e} 😅")

# Exécuter la fonction
split_save_text(parquet_path)
