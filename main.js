// test .js file linked or not
// alert("ahmed")

    /* all buttons = #e28743   this is for css  */
    /* cruds background = #76b5c5     this is for css  */

// call items 
let id = document.getElementById('id');
let area = document.getElementById('area');
let bedrooms = document.getElementById('bedrooms');
let furniture = document.getElementById('furniture');
let utilities = document.getElementById('utilities');
let sqm = document.getElementById('sqm');
let price = document.getElementById('price');
let count = document.getElementById('count');
let stats = document.getElementById('stats');
let submit = document.getElementById('submit');
let crud = document.getElementsByClassName("crud")[0];

let root = document.querySelector(':root');

let mood = 'create';
let tmp;

// console.log(id,area,bedrooms,furniture,utilities,sqm,price,count,stats,submit)


// get price




// create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        area:area.value.toLowerCase(),
        bedrooms:bedrooms.value,
        furniture:furniture.value,
        utilities:utilities.value,
        sqm:sqm.value,
        price:price.innerHTML,
        count:count.value,
        stats: stats.value.toLowerCase(),
    }

    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }

    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
        price.style.backgroundColor = getComputedStyle(root).getPropertyValue('--button-color-2'); 
    }

    
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(newPro)

    clearData()
    showData()
    changeRowColor("table")
    
}

// save local storge
// clear inputs

function clearData(){
    area.value = '';
    bedrooms.value = '';
    furniture.value = '';
    utilities.value = '';
    sqm.value = '';
    price.innerHTML = 'price';
    count.value = '';
    stats.value = '';
}

// read

function showData()
{
    
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        
        table += `
            <tr>
                <td class='colorText'>${i}</td>
                <td class='colorText'>${dataPro[i].area}</td>
                <td class='colorText'>${dataPro[i].bedrooms}</td>
                <td class='colorText'>${dataPro[i].furniture}</td>
                <td class='colorText'>${dataPro[i].utilities}</td>
                <td class='colorText'>${dataPro[i].sqm}</td>
                <td class='colorText'>${dataPro[i].price}</td>
                <td id='qqq' class='colorText'>${dataPro[i].stats}</td>
                <td class='colorText'><button onclick= "updateData(${i})" id="update">update</button></td>
                <td class='colorText'><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }

    
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }

}

showData()
changeRowColor("table")




function changeRowColor(tableId) {
    // Get the table element by its ID
    const table = document.getElementById(tableId);
    
    // Loop through all rows in the table
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const CellValue = row.cells[7].innerText;

        // Change the row color based on the context (value in the first cell)
        if (CellValue === 'A') {
            row.style.backgroundColor = '#7F9F80';
        } else if (CellValue === 'B') {
            row.style.backgroundColor = '#F9E897';
        } else if (CellValue === 'C') {
            row.style.backgroundColor = '#FFC374';
        } else if (CellValue === 'D') {
            row.style.backgroundColor = '#D5ED9F';    
        } else if (CellValue === 'E') {
            row.style.backgroundColor = '#b7e5fa';      
        } else {
            row.style.backgroundColor = 'white'; // Default color
        }
    }
}



// function btnClick() {
//     for(let i = 0; i < dataPro.length; i++){
//         var x = document.getElementById("table").getElementsByTagName("td");
        
//     }              
//     }
// count
// delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
    changeRowColor("table")
    
}

// delet all

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
    changeRowColor("table")
}


// update

function updateData(i){
    area.value = dataPro[i].area;
    bedrooms.value = dataPro[i].bedrooms;
    furniture.value = dataPro[i].furniture;
    utilities.value = dataPro[i].utilities;
    sqm.value = dataPro[i].sqm;
    count.style.display = "none";
    stats.value = dataPro[i].stats;
    submit.innerHTML = 'Update';
    submit.style.backgroundColor = 'green'; 
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}



// search
let searchMood = 'area';

function getSearchMood(id)
{
    console.log(id);
    let search = document.getElementById('search');
    if(id == 'searcharea'){
        searchMood = 'area';
           
    }else{
        searchMood = 'stats';
    }
search.focus()
search.placeholder = 'Search By ' + searchMood;
search.value = '';
showData();
changeRowColor("table")

}


function searchData(value)
{
    let table = '';
    for(let i = 0; i < dataPro.length; i++){    
        if(searchMood == 'area'){
            if(dataPro[i].area.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].area}</td>
                    <td>${dataPro[i].bedrooms}</td>
                    <td>${dataPro[i].furniture}</td>
                    <td>${dataPro[i].utilities}</td>
                    <td>${dataPro[i].sqm}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].stats}</td>
                    <td><button onclick= "updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                        `;
            }        
        }else{
            if(dataPro[i].stats.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].area}</td>
                    <td>${dataPro[i].bedrooms}</td>
                    <td>${dataPro[i].furniture}</td>
                    <td>${dataPro[i].utilities}</td>
                    <td>${dataPro[i].sqm}</td>
                    <td>${dataPro[i].price}</td>
                    <td id="myTd" class="ww">${dataPro[i].stats}</td>
                    <td><button onclick= "updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                        `;
            } 
        }        
    }
 
    document.getElementById('tbody').innerHTML = table;
}   
    
      
        

        
      


// clean data


















// for(let i = 0; i < dataPro.length; i++){
//     if(dataPro[i].stats.includes('A')){
//         console.log('has a');
        // var x = document.getElementById("table");
        // var x = document.getElementById("table").getElementsByTagName("td");
        
    //     x.style.backgroundColor = 'red';

    // }else{
    //     console.log('no');
    // }
    // console.log(i);
    // i.style.backgroundColor =  'red';
    // ssss = document.getElementById("table");
    // ssss.rows[0].cells[9].style.backgroundColor = 'red';
// }