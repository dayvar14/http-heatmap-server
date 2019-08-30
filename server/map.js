
function createDivGrid(width, height, scale)
{
    var container = document.getElementById('heatmap-container');
    var heatmap = document.createElement('div');
    heatmap.style = `width:${width*scale}px;height:${height*scale};`;
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            let cell = document.createElement('div');
            cell.id = i + 'x' + j;
            console.log('width')
            cell.style = `width:${scale}px;height:${scale}px;float:left;`;
            container.appendChild(cell);
        }
    }
}

function displayHeatmap(csv)
{
   let coordinate_data = csv.split(/\r?\n|\r/);
   for( var i = 0; i < coordinate_data.length; i++)
   {
       let user = coordinate_data[i].split(',');
       let usery = user[1];
       let userx = user[0];
       let count = parseInt(user[2],10);
       console.log(userx+'x'+usery);
       try
       {
            let div = document.getElementById(userx+'x'+usery);
            if( count < 3 && count >= 0)
            {
                div.style.backgroundColor = "green";
            }
            if( count < 6 && count >= 3)
            {
                div.style.backgroundColor = "yellow";
            }
            if(count >= 6)
            {
                div.style.backgroundColor = "red";
            }
       
       }
       catch(ex)
       {
           console.log(ex.message)
       }
       
   }
}

function loadHeatmap()
{
    //Clears Heatmap
    var div = document.getElementById('heatmap-container');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    //Creates empty heatmap grid
    createDivGrid(100,100,10);
    //loads file from url
    let coordinate_data = fetch('map_content.csv')
    .then(response => response.text())
    .then((data) => {
        displayHeatmap(data);
    })
}