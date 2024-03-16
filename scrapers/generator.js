require('total5');


F.load('resources,config,controller', function() {

    function generateDates(year) {
        const dates = [];
        for (let month = 0; month < 12; month++) {
            for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
                var d = new Date(year, month, day);
                var text = d.format('dddd', 'mos') + ' daare, ' + d.format('MMMM', 'mos') + (parseInt(d.format('dd'))  < 2 ? ' raar a ' : ' rasm ' )  + d.format('dd', 'mos') + ' soaba ' + 'yuum ' + d.format('yyyy', 'mos'); 
                dates.push({ fr: d.format('dddd dd MMMM yyyy', 'fr'), mos: text });
            }
        }
    
        console.log(PATH.root());
        return dates;
    }
    
    
    const year = 2024; // Change this to the desired year
    const datesOfYear = generateDates(year);
    console.log(datesOfYear);
});