
function showslist(list){
  document.getElementById(list).style.display !== "block" ? document.getElementById(list).style.display = "block" : document.getElementById(list).style.display = "none";
}

function generateKey() {
  return new Date().getTime();
}
const data = {
  todo: [
    {
      key: generateKey(),
      addedText: "Apples",
      addedQuantity: "6",
    }, 
    {
      key: generateKey() + 1,
      addedText: "Oranges",
      addedQuantity: "8",
    }, 
    {
      key: generateKey() + 2,
      addedText: "Water-melon",
      addedQuantity: "1",
    },    
    {
      key: generateKey() + 3,
      addedText: "Milk",
      addedQuantity: "2",
    },
  ],
  done: []
}

const hardCoded = function () {
  const todos = data.todo;
  todos.forEach(element => {
    renderItem(element.key, element.addedText, element.addedQuantity)
  });
}
hardCoded();

document.getElementById('add-item-btn').addEventListener('click', function () {
  const form = document.forms['input-form'];
  const addedText = document.getElementById('item').value;
  const quantity = document.getElementById('quantity').value;
  const key = generateKey();
  if (form.checkValidity() && addedText && quantity){
    const itemObject = {
      key : key,
      addedText: addedText,
      quantity: quantity
    }
    data.todo.push(itemObject);
    
    renderItem(key, addedText, quantity);
  } 
});

function doneItem (event) {
  const item = event.target.parentNode;
  const itemId = item.id;
  const parent = item.parentNode;
  const id = parent.id;
  const itemChild = event.target.parentNode.childNodes[0];
  let todos = data.todo;
  let dones = data.done;

  const target = (id !== 'added-items') ?
    document.getElementById('added-items') : document.getElementById('done-items');
  

  if (id === 'added-items') {
    itemChild.innerHTML = "&#9100;";
    itemChild.className = ('undo-item-btn');
    for(let i = 0; i < todos.length; i += 1) {
      if(todos[i].key == itemId) {
        let myObject = todos.find(function(obj){
          return obj.key == itemId;
        });
      dones.push(myObject);
      todos.splice(i, 1);
    }
    }
 
  } else if (id === 'done-items') {
    itemChild.innerHTML = "&#10004;";
    itemChild.className = ('done-item-btn');
    for(let i = 0; i < dones.length; i += 1) {
      if(dones[i].key == itemId) {
        let myObject1 = dones.find(function(obj){
          return obj.key == itemId;
        });
    todos.push(myObject1);
    dones.splice(i, 1);
    }
  }
  }
  console.log(todos);
  console.log(dones);

  document.getElementById('done-list').style.display = "block";

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}


function deleteItem(event) {
  const item = event.target.parentNode;
  const itemId = item.id;
  const parent = item.parentNode;
  const id = item.id;
  const todos = data.todo;
  const dones = data.done;
  

  if (parent.id === "added-items") {
    for(let i = 0; i < todos.length; i += 1) {
      if(todos[i].key == itemId) {
      todos.splice(i, 1);
    }
    }
    } else if (parent.id === "done-items"){
      for(let i = 0; i < dones.length; i += 1) {
        if(dones[i].key == itemId) {
        dones.splice(i, 1);
      }
      }
    }
  console.log(todos);
  console.log(dones);

  parent.removeChild(item);
}


function renderItem(uniqueKey, addedText, quantity){

  const addedItemList = document.getElementById('added-items-list');

  const addedItems = document.getElementById('added-items');

  const addedItem = document.createElement('li');
  addedItem.className = 'added-item';
  addedItem.id = uniqueKey;
  

    const doneButton = document.createElement('div');
    doneButton.addEventListener('click', doneItem);
    doneButton.className = 'done-item-btn';
    doneButton.innerHTML= "&#10004;";
    
    const addedItemText = document.createElement('div');
    addedItemText.className = 'added-item-text';
    addedItemText.innerHTML = '<p ondblclick="this.contentEditable=true;this.className=\'inEdit\';" onblur="this.contentEditable=false;this.className=\'\';" contenteditable="false" class="">' + addedText + '</p>';

    const addedQuantity = document.createElement('div');
    addedQuantity.className = 'added-quantity';
    addedQuantity.innerText = quantity;

    const deleteButton = document.createElement('div');
    deleteButton.addEventListener('click', deleteItem);
    deleteButton.className = 'delete-item-btn';
    deleteButton.innerHTML= "&#10006;";


  
  addedItem.appendChild(doneButton);
  addedItem.appendChild(addedItemText);
  addedItem.appendChild(addedQuantity);
  addedItem.appendChild(deleteButton);

  addedItems.appendChild(addedItem);


  // reset values
  document.getElementById('item').value = '';
  document.getElementById('quantity').value = '';

}
