/* Input Area system */
function questionButton(buttonID, buttonText, newListener, newParam, newInstructions) {
  resetTextBox();
  instructions.style.display="block";
  inputs.style.display="block";
  let buttonID2 = document.createElement("button");
  buttonID2.innerHTML = buttonText;
  buttonID2.setAttribute("id","buttonID");
  buttonArea.appendChild(buttonID2);
  if (newParam != null) {
    buttonID.addEventListener("click", function () {
      newListener(newParam);
    }, false);
  } else {
    buttonID2.addEventListener("click", newListener);
    //buttonID2.addEventListener("click",removeButtons);
  }
  listeners.push(newListener);
  if (newInstructions != null) {
    instructions.innerHTML = newInstructions;
  }
}

function removeEventListeners(buttonID) {
  for (let i = 0; i < listeners.length; i++) {
    let listener = listeners[i];
    buttonID.removeEventListener("click", listener);
  }
}

function resetTextBox() {
  inputs.value = "";
}

function newDiv(divID, divParent, divContent) {
  let divID2 = document.createElement("div");
  divID2.setAttribute("id", "divID2");
  inputArea.insertBefore(divID2, instructions);
  divID2.innerHTML = divContent;
  let node = document.getElementById(divParent);
  node.appendChild(divID2);
  return divID2;
}

function newButton(buttonID, buttonText, newListener, newInstructions) {
  let buttonID2 = document.createElement("BUTTON");
  buttonID2.setAttribute("id", buttonID);
  let node = document.getElementById("button-area");
  node.appendChild(buttonID2);
  return buttonID2;
}

/* Alert System */
function makeAlertBox(message) {
  removeAlertBox();
  alertBox = document.createElement("dialog");
  alertBox.setAttribute("id", "alertBox");
  alertBox.style.display = "block";
  alertArea.append(alertBox);
  let alertMsg = document.createElement("p");
  alertMsg.innerHTML = message;
  alertBox.appendChild(alertMsg);
  makeAlertButton("OK",removeAlertBox);
}

function makeAlertButton(message,clickAction){
  alertBox = document.getElementById("alertBox");
  let alertButton = document.createElement("BUTTON");
  alertButton.setAttribute("class", "alertButton");
  alertBox.appendChild(alertButton);
  alertButton.innerHTML = message;
  alertButton.addEventListener("click", clickAction);
  alertButton.addEventListener("click", removeAlertBox);
}

function makeAlertObject(message){
  alertBox = document.getElementById("alertBox");
  let alertButton = document.createElement("BUTTON");
  alertButton.setAttribute("class", "alertButton");
  alertButton.innerHTML = message;
  alertButton.addEventListener("click", removeAlertBox);
  return alertButton;
}

function makeAlertBoxParam(message, newListener, newParam) {
  removeAlertBox();
  alertBox = document.createElement("dialog");
  alertBox.setAttribute("id", "alertBox");
  alertBox.style.display = "block";
  alertArea.append(alertBox);
  let alertMsg = document.createElement("p");
  alertMsg.innerHTML = message;
  alertBox.appendChild(alertMsg);
  let alertButton = makeAlertObject("OK",newListener);
  if (newParam != null) {
    alertButton.addEventListener("click", function () {
      newListener(newParam);
    }, false);
  } else {
    alertButton.addEventListener("click", newListener);
  }
  alertBox.appendChild(alertButton);
}


function removeAlertBox() {
  while(alertArea.hasChildNodes()){
    alertArea.removeChild(alertArea.childNodes[0]);
  }
}


function removeButtons() {
  while(buttonArea.hasChildNodes()){
    buttonArea.removeChild(buttonArea.childNodes[0]);
  }
}

/* This is where I need to remove a function */
function cleanKruft(){
  console.log("Clean up kruft!");
}

function saveText(array11, array22, array33, arrayName1, arrayName2) {
  var array1 = array11;
  var array2 = array22;
  var array3 = array33;
  var arrayNames = arrayName1+=arrayName2;
  alert("Clicking OK will save this array in downloads folder as " +arrayNames+ ".txt");
  var fileData = new Blob(["Help Requests: ", array1,"\n\nPersons: ", array2,"\n\nNeeds: ", array3], { type: "text/plain;" });
  saveAs(fileData, arrayNames+ ".txt");
};