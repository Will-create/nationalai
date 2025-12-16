const fs = require('fs');
const DetectLanguage = require('detectlanguage');

// Initialize DetectLanguage with your API key from https://detectlanguage.com/private
const detectlanguage = new DetectLanguage('f13674ac30ff71299c1f2d9bd46a7de9');

// Read the JSON file
const inputFile = 'output/raamde-bf_draft.json';
const outputFile = 'output/raamde-bf_separated.json';

async function separateLanguages() {
  try {
    // Read and parse the JSON file
    let data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    // let reversed = data.reverse();

    // // keep only first 10 items for testing
    // data = reversed.slice(0, 10);
    
    console.log(`Processing ${data.length} documents...`);
    
    // Process each document
    const results = [];
    
    for (let i = 0; i < data.length; i++) {
      const doc = data[i];
      const text = doc.value;
      
      console.log(`\nProcessing document ${i + 1}/${data.length} (ID: ${doc.id})`);
      
      // Split text into sentences/paragraphs for better detection
      const segments = text.split(/\n\n+/).filter(s => s.trim().length > 0);
      
      const detectedSegments = [];
      
      // Process segments in batches to respect API limits
      const batchSize = 20;
      for (let j = 0; j < segments.length; j += batchSize) {
        const batch = segments.slice(j, j + batchSize);
        
        try {
          const detections = await detectlanguage.detectBatch(batch);
          
          for (let k = 0; k < batch.length; k++) {
            const segment = batch[k];
            const detection = detections[k];
            
            const isFrench = detection && 
                           detection.length > 0 && 
                           detection[0].language === 'fr' && 
                           detection[0].score > 0.5;
            
            detectedSegments.push({
              text: segment,
              language: isFrench ? 'fr' : 'mos',
              detectedLanguage: detection && detection.length > 0 ? detection[0].language : 'unknown',
              confidence: detection && detection.length > 0 ? detection[0].score : 0
            });
          }
          
          // Add delay to respect API rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error processing batch: ${error.message}`);
          // Treat errors as Moore (default language)
          batch.forEach(segment => {
            detectedSegments.push({
              text: segment,
              language: 'mos',
              detectedLanguage: 'error',
              confidence: 0
            });
          });
        }
      }
      
      // Separate by language
      const frenchText = detectedSegments
        .filter(s => s.language === 'fr')
        .map(s => s.text)
        .join('\n\n');
      
      const mooreText = detectedSegments
        .filter(s => s.language === 'mos')
        .map(s => s.text)
        .join('\n\n');
      
      const otherText = ''; // No longer needed since everything is either French or Moore
      
      results.push({
        id: doc.id,
        original: text,
        french: frenchText,
        moore: mooreText,
        segments: detectedSegments,
        stats: {
          total_segments: detectedSegments.length,
          french_segments: detectedSegments.filter(s => s.language === 'fr').length,
          moore_segments: detectedSegments.filter(s => s.language === 'mos').length
        }
      });
      
      console.log(`Stats: FR=${results[i].stats.french_segments}, Moore=${results[i].stats.moore_segments}`);
    }
    
    // Write results to output file
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    
    console.log(`\n✓ Processing complete! Results saved to ${outputFile}`);
    
    // Print summary
    const totalFrench = results.reduce((sum, r) => sum + r.stats.french_segments, 0);
    const totalMoore = results.reduce((sum, r) => sum + r.stats.moore_segments, 0);
    
    console.log('\n=== Summary ===');
    console.log(`Total documents: ${results.length}`);
    console.log(`French segments: ${totalFrench}`);
    console.log(`Moore segments: ${totalMoore}`);
    console.log(`\nNote: Classification based on French detection (confidence > 0.5), everything else is Moore.`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
separateLanguages();