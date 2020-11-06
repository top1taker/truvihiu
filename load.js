var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (req, res) {
  //Open a file on the server and return its content:
  fs.readFile('alluser.txt','utf-8', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    str = data.toString();    
    arr = str.split('\n'); 
    start = arr.findIndex(checkstart);
    end = arr.findIndex(checkend);
    userarr = arr.slice(start + 1, end);
    html = "<form action='server'><select name='username'>"
    for(let i = 0; i < userarr.length; i++) {
      currentline = userarr[i].split("");
      while(currentline.length > 0){
      currentuser = currentline.splice(0, 25).join("");
      value = currentuser.slice(0, currentuser.indexOf(' '));
         if (value.length > 0) {	
         html += "<option value='"+ value +"'>"+ currentuser+"</option>";
         } 
      }
      
    }
    html += "</select><input type='submit' value='Choose'></form>";
    res.write(html);
    var q = url.parse(req.url, true).query;
  var txt = q.username;
  if (txt != null) console.log("You choose: " + txt + "\nPress 'Ctrl + C' and Type 'net user " + txt + "'");
    return res.end();
  });
  
}).listen(8080);

function checkstart(str) {
  return str.indexOf('-------') >= 0
}

function checkend(str) {
  return str.indexOf('The command completed successfully') >=0;
}
