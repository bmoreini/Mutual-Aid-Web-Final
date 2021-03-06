/* Globals */


/* STUBS */
function quit() {
  alert("You quit!");
}

function logOut() {
  alert("You logged out!");
}

function saveData() {
  saveText(JSON.stringify(helpRequests), JSON.stringify(persons), JSON.stringify(needs), "helpRequests", "persons");
}

/* FUNCTIONS */

function displayWebMenu() {
  for (let item = 0; item < webMenuItems.length; item++) {
    let newButton = document.createElement("button");
    newButton.innerHTML = webMenuItems[item][0]
    newButton.addEventListener("click", webMenuItems[item][1]);
    navbar.appendChild(newButton);
  }
}
function loadDataPersons1() {
  questionButton(playButton, "Load Persons", loadPersons2, null, null);
  instructions.innerHTML = "Paste the full dataset of the array you would like to load and then click the Load Persons";
}
function loadPersons2() {
  removeButtons();
  var recordsAdded = 1;
  var arrayData = inputs.value;
  arrayData = JSON.parse(arrayData);
  recordsAdded = validatePersonsData(arrayData);
  if (recordsAdded > 0) {
    makeAlertBox("Persons array was added");
    questionButton(playButton, "Load Needs", loadNeeds, null, null);
    instructions.innerHTML = "Paste the full dataset of the array you would like to load and then click the Load Needs";
  }
  else {
    makeAlertButton("There is a problem with your code. Please try again.", loadData);
  }
}
function loadNeeds() {
  removeButtons();
  var recordsAdded = 1;
  var needsData = inputs.value;
  needsData = JSON.parse(needsData);
  recordsAdded = validateNeedsData(needsData);
  if (recordsAdded > 0) {
    makeAlertBox("Needs array was added");
    questionButton(playButton, "Load Help Requests", loadHelpRequests, null, null);
    instructions.innerHTML = "Paste the full dataset of the array you would like to load and then click the Load Help Requests";
  }
  else {
    makeAlertButton("There is a problem with your code. Please try again.", loadData);
  }
}

function loadHelpRequests(){
  removeButtons();
  var recordsAdded = 1;
  var helpRequestsData = inputs.value;
  helpRequestsData = JSON.parse(helpRequestsData);
  recordsAdded = validateHelpRequestsData(helpRequestsData);
  if (recordsAdded > 0) {
    makeAlertBox("Help Requests array was added");
    resetTextBox();
    instructions.innerHTML = "";
    makeAlertBox("All data has been loaded");
  }
  else {
    makeAlertButton("There is a problem with your code. Please try again.", loadData);
  }
}

function validateHelpRequestsData(helpRequestsData){
  for (let i = 0; i < helpRequestsData; i++) {
    if (validatePerson(helpRequestsData[i]) != true) {
      alert("Bad data in helpRequest " + i);
      return 0;
    }
  }
  helpRequests = helpRequestsData;
  return helpRequestsData.length;
}

function validateHelpRequest(helpRequestsData){
  // check if array length is 6
  alert("checking " + helpRequest);
  if (personArray.length != 7) {
    alert("Bad array length of " + helpRequest.length + " for: " + helpRequest);
    return false;
  }
  // check if phone number is 10 digits
  else if (needs.includes(helpRequest[1]) == false) {
    alert("need is not in the needs list");
    return false;
  }
  else if (validateUniquePersonID(helpRequest[0]) == false) {
    for (i = 0; i < persons.length; i++){
    let match = 0;
    if (persons[i][0] == helpRequest[0]) match++;
  }
  if (match = 0){
    alert(personArray[0] + " is not a unique ID!");
    return false;
  }
  }
  // check if email contains @
  else {
    return true;
  }
}
function validateNeedsData(needsData) {
  if (needsData[8] == "Financial support" && needsData[0] == "Shopping") {
    makeAlertBox("Needs were added");
    console.log(needs)
    needs = needsData;
    return needs.length;
  }
  else {
    makeAlertBox("Some of the needs have been moved. Please try again");
  }
}
function validatePersonsData(arrayData) {
  console.log(arrayData);
  for (let i = 0; i < arrayData.length; i++) {
    if (validatePerson(arrayData[i]) != true) {
      alert("Bad data in person " + i);
      return 0;
    }
  }
  persons = arrayData;
  return arrayData.length;
}
/* Tests if a PersonID is unique in the Persons Array */
function validateUniquePersonID(pID) {
  for (i = 0; i < persons.length; i++) {
    if (persons[i][0] == pID) {
      //alert("Duplicate IDs: record" + [i]);
      return 0;
    }
    return false;
  }
  return true;
}

function resetinputs() {
  inputs.value = "";
}

/* function logIn accepts a PID from the current user and checks whether
  * it is in the system.  If it isn't, prompts to add new person.  If it is, 
  * populates current user array with first and last name and starts a new
  * help request. 
  * @param none
  * @return none
  */
function logInSetup() {
  removeButtons();
  inputArea.style.display = "block";
  questionButton(playButton, "logIn", logIn, null, "Enter your ID in format #-10digitphone.");
  inputs.style.display = "block";
  validpID = false;
}

function logIn() {
  pID = inputs.value;
  removeButtons()
  if (validateUniquePersonID(pID) == false) {
    instructions.innerHTML = "Welcome back, " + persons[i][1] + "!!";
    currentUser[0] = persons[i][0];
    currentUser[1] = persons[i][1];
    currentUser[2] = persons[i][2];
    helpRequest[0] = currentUser[0];
    makeAlertBox("User " + pID + " has logged in.");
  }
  else {
    makeAlertBox("This ID is not in the system. Choose Add Person from the menu or try again");
  }
}

/* Add Person
* Option to enter your PersonID if you are already in the system
* If you are new, add info and a new PersonID is generated
* @param: none
* @return: none
*/

/*This is what happens if someone is new*/
function addPersonConfirm() {
  makeAlertBox("Please add yourself to the database if you are new.  Are you new?");
  makeAlertButton("Yes", addPersonSetup);
  makeAlertButton("No", logInSetup);
}

/* Add Person Setup */
function addPersonSetup() {
  questionButton(playButton, "Submit Data", addPerson, null, "Please input your info separated by commas:<br>First Name,Last Name,email,phone \(just numbers together\),town.");
}

function addPerson() {
  person = inputs.value;
  person = removeCommaSpaces(person);
  person = persons.length + 1 + "," + person;
  personArray = person.split(",");
  personArray[0] += "-" + personArray[4];
  if (validatePerson(personArray)) {
    removeButtons();
    persons.push(personArray);
    instructions.innerHTML = "";
    currentUser = personArray.slice(0, 3);
    helpRequest[0] = personArray[0];
    makeAlertBox("You've been added! Use your user ID " + personArray[0] + " to log in next time.");
  }
  else {
    questionButton(playButton, "OK", addPersonConfirm, null, null);
    instructions.innerHTML = "Invalid Entry. Please enter your information again.";
  }
}

/* validatePerson looks at a person array to see if it is well formed.
* @param array personArray
* @return boolean
*/
function validatePerson(personArray) {
  // check if array length is 6
  alert("checking " + personArray);
  if (personArray.length != 6) {
    alert("Bad array length of " + personArray.length + " for: " + personArray);
    return false;
  }
  // check if phone number is 10 digits
  else if (personArray[4].length != 10) {
    alert("Phone number is not 10 digits");
    return false;
  }
  else if (validateUniquePersonID(personArray[0]) == false) {
    alert(personArray[0] + " is not a unique ID!");
    return false;
  }
  // check if email contains @
  else {
    for (var letter = 0; letter < personArray[3].length; letter++) {
      if (personArray[3][letter] == "@") {
        return true;
      }
    }
    alert("Incorrect email address - no @ sign.");
    return false;
  }
}

/* removeCommaSpaces looks for spaces after commas in a string and removes them 
* @param string
* @return string
*/
function removeCommaSpaces(string) {
  for (i = 0; i < string.length; i++) {
    if (string[i] == ",") {
      if (string[i + 1] == " ") {
        string = string.replace(', ', ',');
      }
    }
  }
  return string;
}

/* View list of Needs. Receive a choice. 
  * @param none
  * @return none
  */

function viewNeeds() {
  inputArea.style.display = "none";
  var needsMenu = "<h3>Current Needs</h3>";
  needsMenu += "<table id=\"results\">";
  col = 0;
  for (var i = 0; i < needs.length; i += 2) {
    col++;
    needsMenu += "<tr>";
    if (i + 1 < needs.length) {
      needsMenu += "<td><button type=\"submit\" onclick=\"viewNeedsChoice(" + i + ")\">" + needs[i] + "</button></td>";
      needsMenu += "<td><button type=\"submit\" onclick=\"viewNeedsChoice(" + (i + 1) + ")\">" + needs[i + 1] + "</button></td>";
    }
    else {
      needsMenu += "<td colspan=2><button type=\"submit\" onclick=\"viewNeedsChoice(" + i + ")\">" + needs[i] + "</button></td>";
    }
    needsMenu += "</tr>";
  }
  needsMenu += "</table>";
  needsMenu += "<p>Click on a need, or click \"Add New Need\" if your need is not on the menu.</p>";
  newDiv("results-table", "button-area", needsMenu);
  questionButton("noButton", "Add New Need", addNeedSetUp, null);
}


/* View Needs Choice */
function viewNeedsChoice(needID) {
  removeButtons();
  inputArea.style.display = "block";
  helpRequest[1] = needs[needID];
  helpRequests.push(helpRequest);
  inputs.style.display = "none";
  instructions.innerHTML = "We added " + needs[needID] + " to your help request. Press \"Request Help \" above to finish your help request.";
}

/* Add Needs Setup
  * Gives user an opportunity to add a new need to the needs array. 
  * @param none
  * @return none
  */
function addNeedSetUp() {
  inputArea.style.display = "block";
  removeButtons();
  questionButton(playButton, "Submit Need", addNeedValidate, null, "Enter your need, in as few words as possible. Example: not \"A donut\" but \"Donuts\"");
}

/* Add Needs Validate */
function addNeedValidate() {
  removeButtons();
  let need = inputs.value;
  questionButton(playButton, "OK", addNeedValidate, null, null);
  if (validateNeedUnique(need) == true) {
    removeButtons();
    needs.push(need);
    makeAlertBox("Your need, " + need + " was added with ID " + needs.length + "! You can select it from the menu now.");
    makeAlertButton("View Needs", viewNeeds);
  }
  else {
    removeButtons();
    makeAlertBox("Invalid or duplicate entry. Try again. Enter the name of your need.");
    makeAlertButton("Add Need", addNeedSetup);
  }
}

/* Validate that a new entered need is unique. 
  @param need String
  @return boolean
  */
function validateNeedUnique(need) {
  for (let i = 0; i < needs.length; i++) {
    if (need == needs[i]) {
      return false;
    }
    return true;
  }
}

/* Request Help adds a help request to helpRequests array.
* @param none
* @return none
*/
function requestHelpQuantity() {
  inputs.style.display = "block";
  if (currentUser[0] != null) {
    if (helpRequest[1] != null) {
      questionButton(playButton, "OK", requestHelpPriority, null, "Please enter your quantity (#)");
    }
    else {
      makeAlertBox("Please choose a need first");
      makeAlertButton("View Needs", viewNeeds);
    }
  }
  else {
    makeAlertBox("Log in or create new person", removeAlertBox);
  }
}

/* Request Help Priority */
function requestHelpPriority() {
  removeButtons();
  helpRequest[2] = inputs.value;
  //alert("You want "+helpRequest[2] + " of  "+helpRequest[1]);
  questionButton(playButton, "OK", requestHelpFinish, null, "Enter priority (1-3)");
}

/* Request Help Finish */
function requestHelpFinish() {
  removeButtons();
  helpRequest[3] = inputs.value;
  var today = new Date();
  helpRequest[4] = today;
  makeAlertBox("Your request has been added");
}

/* View Help Requests
  * Displays current help requests and Gives
  * Current User a chance to claim one.
  * @param: none;
  * @return: none;
  */
function viewHelpRequests() {
  inputArea.style.display = "none";
  removeAlertBox();
  var helpRequestsMenu = "<h3>Current Help We Can Meet</h3>";
  helpRequestsMenu += "<table id=\"results\"><tr><th>Name</th><th>Town</th><th>Priority</th><th>Quantity</th><th>Need</th><th>Date</th></tr>";
  for (var i = 1; i <= helpRequests.length; i++) {
    if (helpRequests[i - 1][5] == null) {
      helpRequestsMenu += "<tr>";
      helpRequestsMenu += "<td><button type=\"submit\" onclick=\"offerHelpConfirm(" + i + ")\">Pick</button>";
      helpRequestsMenu += findName(helpRequests[i - 1][0]) + "</td>";
      helpRequestsMenu += "<td>" + findTown(helpRequests[i - 1][0]) + "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][3] + "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][2] + "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][1] +
        "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][4] +
        "</td>";
      helpRequestsMenu += "</tr>";
    }
  }
  helpRequestsMenu += "</table>";
  helpRequestsMenu += "<p>Click the name of the person to whom you would like to offer help</p>";
  newDiv("results-table", "button-area", helpRequestsMenu);
  //questionButton(playButton, "Offer Help", offerHelpConfirm, null, null);
  //instructions.style.display = "none";
}

/* Offer Help Confirm */
function offerHelpConfirm(helpID) {
  removeAlertBox();
  removeButtons();
  inputs.style.display = "none";
  if (isNaN(helpID)) {
    makeAlertBox("Invalid request.");
  }
  else {
    helpID = parseInt(helpID);
    if (helpID > 0 && helpID <= helpRequests.length) {
      helpID--;
      if (currentUser[0] != null) {
        makeAlertBoxParam("You would like to help " + findName(helpRequests[helpID][0]) + " who placed a help request for " + helpRequests[helpID][1] + "?", completeHelpRequest, helpID);
        makeAlertButton("Cancel", removeAlertBox);
      }
      else {
        makeAlertBox("You need to log in before meeting a help request");
        makeAlertButton("Log In", logInSetup);
      }
    }
    else {
      makeAlertBox("Choice out of range. Try again!");
      makeAlertButton("View help requests", viewHelpRequests);
    }
  }
}

/* Complete Help Request */
function completeHelpRequest(helpID) {
  helpRequests[helpID][6] = currentUser[0];
  helpRequests[helpID][5] = new Date();
  makeAlertBox("You can contact " + findName(helpRequests[helpID][0]) + " with their Email " + findEmail(helpRequests[helpID][0]));
  makeAlertBox("Current Help Request: " + helpRequests[helpID]);
  helpRequests.push(helpID);;
}

/* View list of Met Help Requests.  Then return to main menu.
  * @param none
  * @return none
  * UPDATE-MBM
  */
function viewMetRequests() {
  inputArea.style.display = "none";
  var helpRequestsMenu = "<h3>Met Help Requests</h3>";
  helpRequestsMenu += "<table id=\"results\"><tr><th>Name</th><th>Town</th><th>Priority</th><th>Quantity</th><th>Need</th><th>Date</th><th>Date Met</th><th>Met By</th></tr>";
  for (var i = 1; i <= helpRequests.length; i++) {
    if (helpRequests[i - 1][5] != null) {
      helpRequestsMenu += "<tr>";
      helpRequestsMenu += "<td>" + findName(helpRequests[i - 1][0]) + "</td>";
      helpRequestsMenu += "<td>" + findTown(helpRequests[i - 1][0]) + "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][3] + "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][2] + "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][1] +
        "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][4] +
        "</td>";
      helpRequestsMenu += "<td>" + helpRequests[i - 1][5] +
        "</td>";
      helpRequestsMenu += "<td>" + findName(helpRequests[i - 1][6]) +
        "</td>";
      helpRequestsMenu += "</tr>";
    }
  }
  helpRequestsMenu += "</table>";
  newDiv("results-table", "button-area", helpRequestsMenu);
}

/* This function finds the name of a person using their ID 
*@param pID string
*@return person name string
*/
function findName(pID) {
  for (i = 0; i < persons.length; i++) {
    if (persons[i][0] == pID) {
      return persons[i][1] + " " + persons[i][2];
    }
  }
  return "Bad pID";
}
/* Finds the email of a person using their ID*/
function findEmail(pID) {
  for (i = 0; i < persons.length; i++) {
    if (persons[i][0] == pID) {
      return persons[i][3];
    }
  }
  return "Bad pID";
}

/*This function finds the town of the person who is *making the request using their ID
*@param pID string
*@return person town string */
function findTown(pID) {
  for (i = 0; i < persons.length; i++) {
    if (persons[i][0] == pID) {
      return persons[i][5];
    }
  }
  return "Bad pID";
}
/* function Log Out clears the current user and help request
  * then returns to the main menu 
  *@param none
  *@return none;
  */
function logOut() {
  makeAlertBox(currentUser[1] + " " + currentUser[2] + " is logged out.");
  currentUser = [null, null, null];
  var helpRequest = [null, null, null, null, null, null, null];
}
