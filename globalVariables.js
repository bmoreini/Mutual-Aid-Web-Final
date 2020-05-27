/* full scope variables */
// Current User = ID, First, Last
var currentUser = [null, null, null];
var pID = null;
// Requests include personID, need, quantity, priority, date entered, date met, helperID
var personArray = [];
var helpRequest = [null, null, null, null, null, null, null];
var needs = ["Shopping", "Grocery delivery", "Medical supplies", "Meal delivery", "Meal making", "Child care/aid", "Wellness checks", "Mental health support", "Financial support"];
//var helpRequests = [];
var menuItems = ["Load Data", "Log In", "Add Person", "View Needs", "Add Need", "Request Help", "Offer Help", "View Met Requests", "Log Out", "Save Data", "Quit"];

// for testing
var persons = [["1-0008675309", "Bob", "Walter", "bob@yahoo.com", "0008675309", "Burlington"],["2-8357502412", "Napoleon", "Dynamite", "therose@yahoo.com", "8357502412", "Williston"]];
var helpRequests = [["1-0008675309", "Toilet Paper", "5", "1", "3/2/20", null, null], ["2-8357502412", "Steaks", "3", "2", "3/2/20", null, null]];

