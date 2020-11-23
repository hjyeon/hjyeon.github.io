let myPlot = document.getElementById('root'),
    d3 = Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/coffee-flavors.csv',
     function(err, rows){
    function unpack(rows, key) {
    return rows.map(function(row) {return row[key]})
    }
    var data = [{
            type: "sunburst",
            maxdepth: 2,
            ids: unpack(rows, 'ids'),
            labels: unpack(rows, 'labels'),
            parents: unpack(rows, 'parents'),
            textposition: 'inside',
            insidetextorientation: 'radial'
    }]

    var layout = {
        hovermode:'closest',
        title:'Click to see more'
    };
    Plotly.newPlot('root', data, layout, {showSendToCloud: true})
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
    



