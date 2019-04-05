var input = document.getElementById('input');
var btn = document.getElementById('button');
var dd = document.getElementById('dropdown');
var btn1 = document.getElementById('button1');
var div = document.getElementById('div');
var btn2 = document.getElementById('button3');
var STATUS_OK = 200;
var value;


btn2.addEventListener("click" , function(event)
{
  value=dd.value;
  console.log(value);
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
{

});
  request.open('POST', '/'+value);
  request.send(JSON.stringify( input.value ));
})

btn.addEventListener("click" , function(event)
{
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
  {
    if (request.status === STATUS_OK)
    {
      var tasks = JSON.parse(request.responseText);
      var string = tasks;
      console.log(tasks);
      div.innerHTML=tasks;
    }
  });
  request.open('GET', '/1');
  request.send();
});


btn1.addEventListener("click" , function(event)
{
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
  {
    if (request.status === STATUS_OK)
    {
      var tasks = JSON.parse(request.responseText);
      var string = tasks;
      console.log(tasks);
      div.innerHTML=tasks;
    }
  });
  request.open('GET', '/2');
  request.send();
});
