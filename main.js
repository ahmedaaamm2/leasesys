
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
        price:price.value,
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
        // price.style.backgroundColor = getComputedStyle(root).getPropertyValue('--button-color-2'); 
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
    price.value = '';
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
                <td class='colorText'>${dataPro[i].stats}</td>
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



function addUnit(){
    const fields = document.getElementById("inpusId");
    const buttonFld = document.getElementById("addUnit");
    if(fields.style.display == "none"){
        fields.style.display = "block";
        buttonFld.innerHTML = "Hide Fields"
        
    }else{
        fields.style.display = "none";
        buttonFld.innerHTML = "Add Unit"
    }
    
}

function changeRowColor(tableId) {
    // Get the table element by its ID
    const table = document.getElementById(tableId);
    
    // Loop through all rows in the table
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const CellValue = row.cells[7].innerText;

        // Change the row color based on the context (value in the first cell)
        if (CellValue === 'Booked') {
            row.style.backgroundColor = '#faf9d9';
        } else if (CellValue === 'Contract') {
            row.style.backgroundColor = '#fae6d9';
        } else if (CellValue === 'Leased') {
            row.style.backgroundColor = '#f7d9fd'; 
        } else if (CellValue === 'Deposit') {
            row.style.backgroundColor = '#e2d9fd';         
        } else if (CellValue === 'Onhold') {
            row.style.backgroundColor = '#b7e5fa';      
        } else {
            row.style.backgroundColor = '#e3fad9'; // Default color
        }
    }
}



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
                    <td>${dataPro[i].stats}</td>
                    <td><button onclick= "updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                        `;
            } 
        }        
    }
 
    document.getElementById('tbody').innerHTML = table;
    changeRowColor("table")
}   
    
      
        

        
// function for filter div located under head div

function createButtons(names) {
    const container = document.getElementById('filterDiv');
    container.innerHTML = ''; // Clear previous buttons

    names.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.className = "btnId";
        button.id = generateRandomId();
        button.onclick = () => alert(`${name + " " +  button.className + " " + button.id } clicked!`);
        container.appendChild(button);
    });
}

// Example array of names
const namesArray = ['Button 1', 'Button 2', 'Button 3', 'Button 1', 'Button 2', 'Button 3', 'Button 1', 'Button 2', 'Button 3'];
createButtons(namesArray);



// function to generate a random id
function generateRandomId() {
    return 'btn-' + Math.random().toString(36).substr(2, 9);
}



// clean data
















