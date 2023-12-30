// Downloaded from https://huggingface.co/datasets/Wabbina/moore_dataset_fr_translation_v1.0/blob/main/data/train-00000-of-00001-0252c1088531b372.parquet
var PARQUET_PATH = '/Users/mac/Downloads/train-00000-of-00001-0252c1088531b372.parquet';
const parquet = require('parquetjs');
const LIMIT_ROWS = 50;
var reader = await parquet.ParquetReader.openFile(PARQUET_PATH);
 
// create a new cursor
var cursor = reader.getCursor();
 
// read all records from the file and print them
var record = null;
var index = 0;

async function main () {

    while (record = await cursor.next()) {
        index += 1;

        console.log(record);


        if (index === LIMIT_ROWS)
            break;
    }
}
