let categoryName = 'Toys & Games';
let chartType = "treemap";
let myPlot = document.getElementById('root');
function makeplot() {
    Plotly.d3.csv(categoryName+'.csv', function(err, data){ processData(err, data) } );
};
function processData(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) {return row[key]})
    }
    var data = [{
            type: chartType,
            maxdepth: 3,
            ids: unpack(rows, 'id'),
            branchvalues: "remainder",
            labels: unpack(rows, 'name'),
            parents: unpack(rows, 'parent'),
            values: unpack(rows,'subtreeProductCount'),
            //marker: {line: {color: 'rgba(0,0,0,0)'}},
            textposition: 'top center',
            insidetextorientation: 'radial',
            hoverinfo: 'label+current path+percent parent',
    }]
   

    var layout = {
        hovermode:'closest',
        title:'Click to Explore Subcategories',
    };

    Plotly.newPlot('root', data, layout, {showSendToCloud: false})

    myPlot.on('plotly_click', function(data){
        console.log(data.points[0].label);
        if(data.points[0].label) {            
            
            if(confirm('Would you like to see more detailed data on '+data.points[0].label+'?')){
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
}
makeplot();

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var textByLine = ['All Beauty', 
'All Credit Cards',
'All Electronics',
'Alternative Rock',
'Amazon Coins',
'Amazon Fashion',
'Amazon Fire TV',
'Amazon Instant Video',
'Appliances',
'Apps for Android',
'Appstore for Android',
'Arts, Crafts & Sewing',
'Automotive',
'Baby',
'Baby Products',
'Beauty',
'Blues',
'Books',
'Broadway & Vocalists',
'Buy a Kindle',
'Camera & Photo',
'Car Electronics',
'CDs & Vinyl',
'Celebrate your Birthday with Nickelodeon',
'Cell Phones & Accessories',
'Children\'s Music',
'Christian',
'Classic Rock',
'Classical',
'Clothing, Shoes & Jewelry',
'Collectible Coins',
'Collectibles & Fine Art',
'Computers',
'Country',
'Dance & Electronic',
'Davis',
'Digital Music',
'Electronics',
'Entertainment',
'Folk',
'Furniture & D&#233;cor',
'Gift Cards',
'Gift Cards Store',
'Gospel',
'GPS & Navigation',
'Grocery & Gourmet Food',
'Hard Rock & Metal',
'Health & Personal Care',
'Home & Kitchen',
'Home Improvement',
'Industrial & Scientific',
'International',
'Jazz',
'Kindle Store',
'Kitchen & Dining',
'Latin Music',
'Learning & Education',
'Luxury Beauty',
'Magazine Subscriptions',
'Microsoft',
'Miscellaneous',
'Movies & TV',
'MP3 Players & Accessories',
'Musical Instruments',
'New Age',
'Nickelodeon',
'Office & School Supplies',
'Office Products',
'Patio, Lawn & Garden',
'Pet Supplies',
'Pop',
'Publishers',
'Purchase Circles',
'R&B',
'Rap & Hip-Hop',
'Rock',
'Software',
'Sports & Outdoors',
'Sports Collectibles',
'Tools & Home Improvement',
'Toys & Games',
'Everything Else',
'Video Games',
'Wine',
'#508510']
for(i =0 ; i < textByLine.length; i++) {
    let node = document.createElement("a");
    node.appendChild(document.createTextNode(textByLine[i]));
    node.onclick = function(){
        console.log(node.textContent);
        if(node.textContent=='Musical Instruments'||node.textContent=='Toys & Games'){
            categoryName = node.textContent;
            Plotly.d3.csv(categoryName+".csv", function(err, rows){function unpack(rows, key) {
                return rows.map(function(row) {return row[key]})
                }
                var data = [{
                        type: "treemap",
                        maxdepth: 3,
                        ids: unpack(rows, 'id'),
                        branchvalues: "remainder",
                        labels: unpack(rows, 'name'),
                        parents: unpack(rows, 'parent'),
                        values: unpack(rows,'subtreeProductCount'),
                        //marker: {line: {color: 'rgba(0,0,0,0)'}},
                        textposition: 'top center',
                        insidetextorientation: 'radial',
                        hoverinfo: 'label+current path+percent parent',
                }]
               
            
                var layout = {
                    hovermode:'closest',
                    title:'Click to see more',
                };
            
                Plotly.newPlot('root', data, layout, {showSendToCloud: false})
            
                myPlot.on('plotly_click', function(data){
                    console.log(data.points[0].label);
                    if(data.points[0].label) {            
                        
                        if(confirm('Would you like to see more detailed data on '+data.points[0].label+'?')){
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
        
        }
        
    }
    document.getElementById("myDropdown").appendChild(node);
}

function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }    
  }

  function handleRadioClick(radio) {
    let id = radio.id;
    chartType = id;
    if (id == "sunburst") id = 'treemap'; else id = 'sunburst';
    document.getElementById(id).checked = false;
    makeplot();

}
