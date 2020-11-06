var http = require('http');
var fs = require('fs');
var url = require('url');
var dic = {};
var check = [];
http.createServer(function (req, res) {
  //
  
  fs.readFile('details.txt','utf-8', function(err, data) {
    if (err) return;
    str = data.toString();
    p = str.slice(29,str.indexOf('\n'));
    key = p.substring(0, p.length - 1);
    if (!dic[key]) {
      dic[key] = str;
      check[key] = 1;
    }
  });
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
    
    var q = url.parse(req.url, true);
    
    var txt = String(q.search);
    
    if (txt != 'null') {
      
      arr = txt.split('');
      usr = arr.slice(arr.indexOf('=') + 1).join('');
      
      if (check[usr]) html += '<br><pre>' + dic[usr] + '</pre>';
      else {
        html += '<br><div>Open the second cmd, copy and execute this code: <h2>net user ' + usr + ' > desktop\\details.txt</h2> and try again</div>';
      }


      
    }
    
    res.write(html);
    return res.end();
  });
  
}).listen(8080);

function checkstart(str) {
  return str.indexOf('-------') >= 0
}

function checkend(str) {
  return str.indexOf('The command completed successfully') >=0;
}
