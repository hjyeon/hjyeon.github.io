let myPlot = document.getElementById('root'),
    d3 = Plotly.d3.csv('Musical Instruments2.csv',
    function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row) {return row[key]})
    }
    var data = [{
            type: "treemap",
            maxdepth: 2,
            ids: unpack(rows, 'id'),
            labels: unpack(rows, 'name'),
            parents: unpack(rows, 'parent'),
            textposition: 'inside',
            insidetextorientation: 'radial'
    }]
   

    var layout = {
        hovermode:'closest',
        title:'Click to see more'
    };
    Plotly.newPlot('root', data, layout, {showSendToCloud: false})
    myPlot.on('plotly_click', function(data){
        console.log(data.points[0].label);
        if(data.points[0].label == "Fruity") {            
            if(confirm('Would you like to see more detailed data on this category?')){
            var x = [];
            for (var i = 0; i < 500; i ++) {
                x[i] = Math.random();
            }

            var trace = {
                x: x,
                type: 'histogram',
            };
            var data = [trace];
            Plotly.newPlot('detail', data);
            };    }
    });
});
    



