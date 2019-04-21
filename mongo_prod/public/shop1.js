var subbtn = document.getElementById('button');
var gbtn = document.getElementById('gbtn');
var ipt = document.getElementById('input');
var list = document.getElementById('list');
var div = document.getElementById('prdctlist');
var products=[]
subbtn.addEventListener("click" , function(abc)
{
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load" , function()
{

});
  xhttp.open("POST", "/addProduct");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({'item':ipt.value}));
})

gbtn.addEventListener("click" , function(abc)
{
  list.innerHTML="";
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load" , function()
{
  console.log(xhttp.responseText);
  products = JSON.parse(xhttp.responseText);
  var length = products.length;
  var i=0;
  var lid=0;
  while(i<length)
  {
    console.log(i , length);
    var item  = products[i].productName;
    var li = document.createElement('li');
    li.innerHTML = item+" ";
    var dbtn = document.createElement("button");
    dbtn.innerHTML = "DELETE";
    dbtn.setAttribute("id" , lid);
    lid++;
    li.appendChild(dbtn);
    list.appendChild(li);
    div.appendChild(list);
    insertBlankLine(list);
    i++;
    dbtn.addEventListener("click" , function(abc)
  {
    xhttp.open("POST", "/deleteProduct");
    xhttp.setRequestHeader("Content-Type" , "application/json");
    var index = abc.target.id;
    console.log(index);
    console.log(products[index]);
    xhttp.send(JSON.stringify({'productName' : products[index].productName}));
    abc.target.parentNode.parentNode.removeChild(abc.target.parentNode);
  });
  }
});
  xhttp.open("GET", "/products");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
})

function insertBlankLine(targetElement)
{
  var newline = document.createElement('br');
  targetElement.appendChild(newline);
}
