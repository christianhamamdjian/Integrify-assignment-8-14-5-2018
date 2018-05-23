
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

function refuseDuplicates() {
// get "addedText" and "find" in todo and done if there is the same value already there.
// get "addedQuantity" and replace the old one with the new one.
}

document.querySelector('.text-edit').addEventListener('keypress', function(evt) {
  if (evt.which === 13) {
      evt.preventDefault();
  }
});

document.querySelector('.quantity-edit').addEventListener('keypress', function(evt) {
  if (evt.which === 13) {
      evt.preventDefault();
  }
});

function editItem() {
    const item = event.target.parentNode;
    const textEdit = item.querySelector('.text-edit');
    const quantityEdit = item.querySelector('.quantity-edit');
    if (event.target.className === 'added-item-edit') {
      event.target.innerText = "Save";
      event.target.className ='added-item-editing';
      textEdit.setAttribute('contenteditable', true);
      textEdit.setAttribute('style', "background-color: rgba(255,255,255, .4);");
      quantityEdit.setAttribute('contenteditable', true);
      quantityEdit.setAttribute('style', "background-color: rgba(255,255,255, .4);");
      textEdit.focus();
      } else {
        event.target.innerText = "Edit";
        event.target.className ='added-item-edit';
        textEdit.setAttribute('contenteditable', false);
        quantityEdit.setAttribute('contenteditable', false);
        textEdit.setAttribute('style', "background-color: rgba(255,255,255, .0);");
        quantityEdit.setAttribute('style', "background-color: rgba(255,255,255, .0);");
        quantityEdit.blur();
        textEdit.blur();

        saveEdited(event);

        }
}

function saveEdited(event) {
      const item = event.target.parentNode;
      const itemId = item.id;
      const parent = item.parentNode;
      const id = parent.id;
      let todos = data.todo;
      let dones = data.done;
      const textEdit = item.querySelector('.text-edit');
      const quantityEdit = item.querySelector('.quantity-edit');



      if (id === 'added-items') {
        for(let i = 0; i < todos.length; i += 1) {
          if(todos[i].key == itemId) {
            let myObject = todos.find(function(obj){
              return obj.key == itemId;
            });
            let myNewObject = todos.find(function(obj){
              return obj.key == itemId;
            });

            myNewObject.addedText = textEdit.innerText;
            myNewObject.addedQuantity = quantityEdit.innerText;

            console.log(textEdit, quantityEdit);

            todos.splice(i, 1);
            todos.push(myObject);
        }
        }
      } 
      // else if (id === 'done-items') {
      //   for(let i = 0; i < dones.length; i += 1) {
      //     if(dones[i].key == itemId) {
      //       let myNewObject1 = dones.find(function(obj){
      //         return obj.key == itemId;
      //       });

      //       myNewObject1.addedText = textEdit.innerText;
      //       myNewObject1.addedQuantity = quantityEdit.innerText;

      //       console.log(myObject1);
            
      //       dones.splice(i, 1);
      //       dones.push(myObject1);
      //   }
      //  }
      // }

      console.log(todos);
      console.log(dones);


}



function doneItem(event) {
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
    addedItemText.innerHTML = '<p contentEditable="false" class="text-edit">' + addedText + '</p>';
    // addedItemText.innerHTML = `<input class="text-edit" value = "${addedText}" readonly />`;

    const addedItemEdit = document.createElement('div');
    addedItemEdit.addEventListener('click', editItem);
    addedItemEdit.className = 'added-item-edit';
    addedItemEdit.innerText = 'Edit';

    const addedQuantity = document.createElement('div');
    addedQuantity.className = 'added-quantity';
    addedQuantity.innerHTML = '<p contentEditable="false" class="quantity-edit">' + quantity + '</p>';
    // addedItemText.innerHTML = `<input class="quantity-edit" value = "${quantity}" readonly />`;

    const deleteButton = document.createElement('div');
    deleteButton.addEventListener('click', deleteItem);
    deleteButton.className = 'delete-item-btn';
    deleteButton.innerHTML= "&#10006;";


  
  addedItem.appendChild(doneButton);
  addedItem.appendChild(addedItemText);
  addedItem.appendChild(addedItemEdit);
  addedItem.appendChild(addedQuantity);
  addedItem.appendChild(deleteButton);

  addedItems.appendChild(addedItem);


  // reset values
  document.getElementById('item').value = '';
  document.getElementById('quantity').value = '';

}
