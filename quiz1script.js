// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);


for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
//

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue  = {
    "value" : "",
    "time": ""
    };
  inputValue.value = document.getElementById("myInput1").value;
  inputValue.time = document.getElementById("myInput2").value;
  var v = document.createTextNode(inputValue.value);
  var t = document.createTextNode(inputValue.time);
  li.appendChild(v,t);
  if (inputValue.value === '' || inputValue.time === '' ) {
    alert("You must write something!");
  } else {
        document.getElementById("myUL").appendChild(li);
        //localStorage.setItem("server", inputValue); 
        db.transaction(function (tx) {   
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id INTEGER PRIMARY KEY, Val, Time)'); 
            tx.executeSql('INSERT INTO LOGS (Val, Time) VALUES (?,?)', [inputValue.value,inputValue.time]); 
         });
    }
  document.getElementById("myInput").value = "";
  localStorage.saveServer
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  //check min time for set timeout
 /* function check() {
    var delay = 0;
    db.transaction(function (tx) { 
        tx.executeSql('SELECT distinct Min(Time) FROM LOGS', function (tx,result){
            const now = new Date();
            const current = now.getHours() + ':' + now.getMinutes();
                delay = result.getTime() - current.getTime();  
        });
        tx.executeSql('SELECT Val,Time FROM LOGS WHERE DATENAME(HOUR,MINUTE,Time) == DATENAME(HOUR,MINUTE,SYSDATETIME())');
    });
  }; */
}