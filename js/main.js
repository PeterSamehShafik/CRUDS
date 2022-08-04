var prodName= document.getElementById("prodName");
var prodPrice= document.getElementById("prodPrice");
var prodCat= document.getElementById("prodCat");
var prodDesc= document.getElementById("prodDesc");
var tableRow = document.getElementById("row");
var addButton =document.getElementById("addButton");
var updateButton =document.getElementById("updateButton");
var deleteItem=document.getElementsByClassName("deleteItem");
var prodList;

//checking localStorage
(function(){
    if (localStorage.getItem("data") == null) {
        prodList = [];
        } else {
        prodList = JSON.parse(localStorage.getItem("data"));
        display();
        }
})();

function add(isUpdate,updateNumber){
    var prodObj={
        name:prodName.value,
        price:prodPrice.value,
        catergory:prodCat.value,
        description:prodDesc.value,
    }

    if(isUpdate==true){
        prodList[updateNumber]=prodObj;
    } else{
        prodList.push(prodObj);
    }

    localStorage.setItem("data",JSON.stringify(prodList));
    
    display();
    clear();
}

function display(){
    var box =``;

    for(var i=0; i<prodList.length; i++){
        box+=`
        <tr>
            <td>${i+1}</td>
            <td>${prodList[i].name}</td>
            <td>${prodList[i].price}</td>
            <td>${prodList[i].catergory}</td>
            <td>${prodList[i].description}</td>
            
            <td><button class="btn btn-danger deleteItem" onclick="deleteObj(${i})">Delete</button></td>
            <td><button class="btn btn-info" onclick="editObj(${i})">Edit</button></td>
        </tr>
        `;
    }
    tableRow.innerHTML=box;
}

function clear(){
    prodName.value="";
    prodPrice.value="";
    prodCat.value="";
    prodDesc.value="";
}

function deleteObj(index){
    prodList.splice(index,1);
    localStorage.setItem("data",JSON.stringify(prodList));
    display();
}

function editObj(index){
    //disaple of the buttons
    addButton.disabled =true;
    for(var i=0; i<deleteItem.length; i++){
        deleteItem[i].disabled=true;
    }
    updateButton.disabled =false;

    prodName.value= prodList[index].name;
    prodPrice.value= prodList[index].price;
    prodCat.value= prodList[index].catergory;
    prodDesc.value= prodList[index].description;
    updateNumber=index;
}

function updateObJ(){
    add(true, updateNumber);

    //disaple of the buttons
    addButton.disabled =false;
    for(var i=0; i<deleteItem.length; i++){
        deleteItem[i].disabled=false;
    }
    updateButton.disabled =true;
}

function deleteAll(){
    if(confirm("Are you sure?")){
        prodList=[]
        localStorage.clear()
        display();
    }
}