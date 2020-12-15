let myPlot = document.getElementById('root'); // Main pane
let mainMessage = document.getElementById('message');
// Main Category Info
let numCategories = 85;
// Information about the current page
let categoryName = 'main';
let numSubCategory = 0;
let averagePriceOfCategory = 0;
let numTotalProducts = 0;
let chartType = "treemap"; //default map is treemap
/* This is for the dropdown menu*/
let textByLine = ["Books","Movies & TV","Clothing, Shoes & Jewelry","Sports & Outdoors",
"Toys & Games","CDs & Vinyl","Musical Instruments","Tools & Home Improvement","Software",
"Home & Kitchen","Health & Personal Care","Video Games","Office Products","Cell Phones & Accessories",
"Electronics","Office & School Supplies","Baby","Beauty","Automotive","Arts, Crafts & Sewing","Computers",
"All Electronics","Pet Supplies","Grocery & Gourmet Food","Kitchen & Dining","Industrial & Scientific",
"Appliances","All Beauty","Camera & Photo","Patio, Lawn & Garden","Home Improvement","Kindle Store",
"Baby Products","Amazon Fashion","Digital Music","Collectibles & Fine Art","MP3 Players & Accessories",
"Car Electronics","Gift Cards","Purchase Circles","GPS & Navigation","Luxury Beauty","Magazine Subscriptions",
"Furniture & Decor","Gift Cards Store","Buy a Kindle","Amazon Instant Video","Sports Collectibles",
"Classical","Miscellaneous","Rock","Folk","International","Jazz","Alternative Rock","Blues","Dance & Electronic",
"Pop","Christian","Latin Music","Country","Children's Music","R&B","Broadway & Vocalists","Rap & Hip-Hop",
"Classic Rock","Gospel","Hard Rock & Metal","New Age","Wine","Davis","Publishers","Apps for Android",
"Appstore for Android","Learning & Education","Microsoft","All Credit Cards","Collectible Coins",
"Celebrate your Birthday with Nickelodeon","Nickelodeon","Entertainment","Amazon Coins","Amazon Fire TV","#508510", "Everything Else"]
textByLine.sort();

/*
 * This is for the main pie chart. 
 */
function mainPie() {
    Plotly.d3.csv('mainCategories.csv', function(err, data){ processMainData(err, data) } );
}
function processMainData(err,rows) {
    function unpack(rows, key) {
        return rows.map(function(row) {return row[key]})
    }
    
    var data = [{
        type: "pie",
        values: unpack(rows,'subtreeProductCount'),
        labels: unpack(rows, 'name'),
        ids: unpack(rows,'averagePrice'),
        textposition: 'inside',
        hole: 0.4,
        insidetextorientation: 'radial',
        text: unpack(rows,'fee'),
        hovertemplate: '<b>%{label}</b><br>Number of Products: %{value}<br>Percent Share: %{percent: .2%}<extra>Fee:%{text}<br>Average Price: $%{id}</extra>',
        textinfo: 'percent',
        automargin: true
    }]
    let layout = {
        hovermode:'closest',
        title:'Here are 85 Main Categories of Amazon!',
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
          },
    };
    let config = {
        displaylogo: false,
        modeBarButtonsToRemove: ['hoverClosestPie', 'showSendToCloud'],
    };    
    Plotly.newPlot('root', data, layout, config);
    mainMessage.innerHTML = "<b> &nbsp;&nbsp;Welcome to the Amazon Seller's Category Discovery Tool!</b> Amazon has over 20,000 categories, but your product can only go to <b>one</b> of these (and its parent categories). This tool can help pick the right category for your product by providing comparisons between the categories. \
    Amazon currently requires sellers to pick one category per product. Historically, un-categorized items were under \"Everything Else,\" but this is disabled as of 2018. Navigate to <b>&#9776; Menu > Useful Links</b> for more detailed information about this, category fees and more!  <br> \
    &nbsp;&nbsp;The most important thing is to get the <b> main category </b> right. Often, a product fits multiple categories equally well. As a former seller, I suggest asking this question: \"Which category would my targeted buyers most likely go to?\" Use <b>Explore 85 Main Categories</b> above to see more details about each category. <br><br> \
    🖱️ Click the sector to see the price information. 🖱️ Click the category name in the legend to select/deselect the category. 🖱️🖱️ If you double click something in the legend, it will select only that. 📷 Click the Camera button shown as you mouse over to the chart to download the chart. 📑 You can navigate to <b>&#9776; Menu > About the Data</b> for the table view." 

    myPlot.on('plotly_click', function(data){
        console.log(data.points[0].label);
        let xs = ['Under $10','Under $25','Under $50','Under $100','Over $100','No price information'];
        let size = rows.length;
        let avgPrice = 0;
        let ys = [];
        for(i = 0 ; i < size ; i++) {
            if (rows[i].name == data.points[0].label) {
                avgPrice = rows[i].averagePrice;
                //console.log(rows[i]);
                ys.push(rows[i].numUnder10);
                ys.push(rows[i].numUnder25);
                ys.push(rows[i].numUnder50);
                ys.push(rows[i].numUnder100);
                ys.push(rows[i].numOver100);
                ys.push(rows[i].noPrice);
                break;
            }
        };

        var trace = {
            x: xs,
            y: ys,
            marker:{
                color: ['rgba(115,115,115,1)', 'rgba(115,115,115,1)', 'rgba(115,115,115,1)', 'rgba(115,115,115,1)', 'rgba(115,115,115,1)','rgba(115,115,115,.5)']
              },
            text: ['products', 'products', 'products', 'products', 'products', 'products'],
            name: 'Number of Products',
            type: 'bar',
        };
        let layout = {
            title: 'Average Price of Products in'+'<br>'+  data.points[0].label +" is $" + avgPrice,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
              },
        }
        let config = {
            displaylogo: false,
            scrollZoom: true,
            modeBarButtonsToRemove: ['select2d','lasso2d', 'zoom2d'],
        }
        var data = [trace];
        Plotly.newPlot('detail', data, layout, config);
        })        
}
mainPie();

/*
 * Function to make either sunburst or treemap plot for sub-categories
 */
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
            text: unpack(rows,'averagePrice'),
            //marker: {line: {color: 'rgba(0,0,0,0)'}},
            textposition: 'top center',
            insidetextorientation: 'radial',
            percentParent: 'percent parent',
            texttemplate:'<b>%{label}</b><br>Number of Products:<br>%{value}',
            hovertemplate: '%{currentPath}<b>%{label}</b><br>Number of Products: %{value}<br>Percentage of...<br> %{root}: %{percentRoot: .2%}<br> %{parent}: %{percentParent: .2%}<extra>Average Price: <br>$ %{text}</extra>',
    }]   
    let layout = {
        hovermode:'closest',
        title:'Click to Explore Subcategories of ' + categoryName,
        margin: {
            l: 20,
            r: 20,
            b: 50,
            t: 50,
            pad: 4
          },
    };
    let config = {
        displaylogo: false,
        modeBarButtonsToRemove: ['showSendToCloud','toggleHover'],        
    }
    Plotly.newPlot('root', data, layout, config);   
    /*
     * Event Handler for clicking Treemap or Sunburst Chart
     */
    myPlot.on('plotly_click', function(data){
        console.log(data.points[0].id);         
        let xs = ['Under $10','Under $25','Under $50','Under $100','Over $100','No price information'];
        let size = rows.length;
        let avgPrice = 0;
        let ys = [];
        for(i = 0 ; i < size ; i++) {
            if (rows[i].id == data.points[0].id) {
                avgPrice = rows[i].averagePrice;
                ys.push(rows[i].numUnder10);
                ys.push(rows[i].numUnder25);
                ys.push(rows[i].numUnder50);
                ys.push(rows[i].numUnder100);
                ys.push(rows[i].numOver100);
                ys.push(rows[i].noPrice);
                break;
            }
        };

        var trace = {
            x: xs,
            y: ys,
            marker:{
                color: ['rgba(115,115,115,1)', 'rgba(115,115,115,1)', 'rgba(115,115,115,1)', 'rgba(115,115,115,1)', 'rgba(115,115,115,1)','rgba(115,115,115,.5)']
              },
            name: 'Number of Products',
            text: ['products', 'products', 'products', 'products', 'products', 'products'],
            type: 'bar',
            };
        let layout = {
            title: 'Average Price of Products in'+'<br>'+  data.points[0].label +" is $" + avgPrice,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
              },
        }
        let config = {
            displaylogo: false,
            scrollZoom: true,
            modeBarButtonsToRemove: ['select2d','lasso2d', 'zoom2d'],
        }
        var data = [trace];
        Plotly.newPlot('detail', data, layout, config);
    });
}

// Make dropdown Menu for 85 categories
for(i =0 ; i < textByLine.length; i++) {
    let node = document.createElement("a");
    node.appendChild(document.createTextNode(textByLine[i]));
    let nameShown = "";
    node.onclick = function(){
        console.log(node.textContent);
        if (node.textContent=="#508510") {
            categoryName = "508510";
            nameShown = "#508510";
        }
        else {
            categoryName = node.textContent;
            nameShown = categoryName;
        }
        makeplot();
        // Update the main message
        for (i = 0 ; i < mainCategoriesCSV.length; i ++) {
            if (mainCategoriesCSV[i][0]==categoryName) {
                mainMessage.innerHTML= "This is " + nameShown.bold() +" which contains <b>"+ mainCategoriesCSV[i][2] +"</b> products with "+"<b>" + mainCategoriesCSV[i][3] + "</b>" +" main subcategories."+"\n"+
                "The average known price of the products in this category is <b>$" +mainCategoriesCSV[i][4] + "</b>. 🖱️ Click a category for more price information.\n"+
                "The chart below shows " + "subcategories of "+ nameShown.bold()+". The relative size of boxes/sectors reflects the number of products in that subcategory."+"\n"+
                "The white space reflects the number of products that are not further categorized. "+
                "We recommend that you pick a subcategory if possible. <br> Otherwise, your product will no longer show up once the buyer enters a subcategory of their interest."+"\n"
            }
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

/*
 * Use Radio Button to choose display Type
 */
function handleRadioClick(radio) {
    let id = radio.id;
    chartType = id;
    if (id == "sunburst") id = 'treemap'; else id = 'sunburst';
    document.getElementById(id).checked = false;
    makeplot();
}





// Too lazy to read csv file... so here is the csv file as an array of arrays. 
let mainCategoriesCSV = [
["Books",1940253,2370585,32,17.63],
["Clothing, Shoes & Jewelry",0,1503384,225,46.29],
["Sports & Outdoors",13539,532197,17,50.18],
["Electronics",0,498196,13,61.41],
["CDs & Vinyl",3764,492799,27,19.58],
["Home & Kitchen",10592,436988,11,57.75],
["Kindle Store",0,434702,9,4.45],
["Cell Phones & Accessories",523,346793,4,13.48],
["Toys & Games",18743,336072,18,30.63],
["Automotive",5331,331090,13,73.8],
["Digital Music",270356,279899,17,4.47],
["Tools & Home Improvement",0,269120,10,60.78],
["Health & Personal Care",13365,263032,9,28.61],
["Beauty",0,259204,6,24.88],
["Movies & TV",1251,208321,2,23.49],
["Everything Else",194914,194914,0,26.09],
["Grocery & Gourmet Food",160346,171760,9,24.17],
["Office Products",0,134838,3,44.88],
["Arts, Crafts & Sewing",6555,117429,19,16.6],
["Pet Supplies",4113,110707,34,29.83],
["Patio, Lawn & Garden",2479,109094,65,62.04],
["Musical Instruments",1210,84901,13,94.66],
["Baby",71317,71317,0,46.57],
["Apps for Android",0,61551,29,3.36],
["Video Games",416,50953,16,40.88],
["Industrial & Scientific",1828,47279,21,45.04],
["Amazon Instant Video",30648,30648,0,18.18],
["Amazon Fashion",24145,24145,0,33.63],
["Software",141,18469,16,74.52],
["Appliances",164,11656,16,87.96],
["Baby Products",0,10147,13,37.75],
["Christian",5179,7641,11,2.93],
["All Electronics",7571,7571,0,54.02],
["All Beauty",6580,6580,0,27.61],
["Collectibles & Fine Art",0,6116,12,55.17],
["Pop",18,5690,13,3.19],
["International",0,5648,13,3.03],
["Miscellaneous",0,5359,6,3.97],
["Dance & Electronic",287,4847,12,3.39],
["Rock",5,4498,14,4.08],
["Computers",4450,4450,0,40.4],
["Home Improvement",3944,3944,0,54.5],
["Alternative Rock",1,3866,10,3.77],
["Kitchen & Dining",3751,3751,0,28.59],
["Office & School Supplies",3316,3316,0,27.76],
["Jazz",0,2939,16,3.68],
["Folk",0,2393,6,3.89],
["Classical",0,2347,5,3.71],
["R&B",0,2281,10,2.31],
["Luxury Beauty",1926,1926,0,35.03],
["Buy a Kindle",1895,1895,0,7.3],
["Country",0,1695,10,3.59],
["MP3 Players & Accessories",1672,1672,0,32.05],
["Gospel",1526,1647,4,2.66],
["Magazine Subscriptions",13,1478,36,82.87],
["New Age",0,1307,3,3.02],
["Wine",1237,1237,0,33.82],
["Hard Rock & Metal",0,1068,8,5.77],
["Blues",0,906,11,3.83],
["Rap & Hip-Hop",0,794,10,3.24],
["Latin Music",0,633,28,2.82],
["Gift Cards",0,484,1,108.61],
["Camera & Photo",462,462,0,46.66],
["Car Electronics",408,408,0,91.32],
["GPS & Navigation",361,361,0,83.69],
["Classic Rock",5,346,7,3.51],
["Children's Music",0,313,4,4.51],
["Broadway & Vocalists",0,294,3,4.09],
["Appstore for Android",152,152,0,0],
["Furniture & Decor",108,108,0,199.36],
["Davis",59,59,0,3.11],
["Purchase Circles",0,33,1,45.8],
["Sports Collectibles",27,27,0,14.97],
["All Credit Cards",21,21,0,0],
["Entertainment",6,6,0,0],
["Gift Cards Store",5,5,0,133.33],
["Microsoft",4,4,0,4.99],
["Amazon Coins",4,4,0,46.25],
["Amazon Fire TV",3,3,0,0],
["Publishers",0,2,1,0],
["Celebrate your Birthday with Nickelodeon",2,2,0,1.14],
["Nickelodeon",2,2,0,1.14],
["Learning & Education",0,1,1,0.99],
["Collectible Coins",1,1,0,0],
["508510",0,1,1,30.5]]