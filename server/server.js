var http = require('http');
var url = require('url');
var fs = require('fs');

function readTasks2(callback)
{
  fs.readFile('2.txt', function(error, contents)
  {
    if (error)
	{
      throw error;
    }

    var tasks;
    if (contents.length === 0)
	{
      tasks = [];
    }
	else
	{
      tasks = JSON.parse(contents);
    }
    callback(tasks);
  });
}


function readTasks(callback)
{
  fs.readFile('1.txt', function(error, contents)
  {
    if (error)
	{
      throw error;
    }

    var tasks;
    if (contents.length === 0)
	{
      tasks = [];
    }
	else
	{
      tasks = JSON.parse(contents);
    }
    callback(tasks);
  });
}

function readAndServe(path, contentType, response)
{
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }
    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

function readJSONBody(request, callback)
{
  var body = '';
  request.on('data', function(chunk)
     {
					 body += chunk;
			});

  request.on('end', function() {
					var data = JSON.parse(body);
					callback(data);
		   });
}

function readfromfile(file,callback)
{
  fs.readFile(file, function(error, contents)
  {
    if (error)
    {
      throw error;
    }
    var string;
    if (contents.length === 0)
  {
      string = "hetesh";
    }
  else
  {
      string = JSON.parse(contents);
    }
    callback(string);
  });
}

function writeTasks(file,tasks,callback)
{
  readfromfile(file,function(string)
  {
  string = string+tasks;
  var tasksJSON = JSON.stringify(string);
  fs.writeFile(file, tasksJSON, function(error)
  {
  if (error)
  {
    throw error;
  }
  });
      callback();
});
}


http.createServer(function(request, response)
{
  var pathname = url.parse(request.url).pathname;
  if (request.method === "GET")
  {
    if (pathname === "/")
    {
      readAndServe('nodejs.html' , 'text/html' , response);
    }
    else if(pathname === "/page.js")
    {
      readAndServe('page.js' , 'text/javascript',response);
    }
    else if (pathname === "/1")
    {
      readTasks(function(tasks)
      {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
      });
    }
    else if(pathname === "/2")
  {
    readTasks2(function(tasks)
    {
      response.writeHead(200, {'Content-type': 'application/json'});
      response.write(JSON.stringify(tasks));
      response.end();
    });
  }
}
else if (request.method === "POST")
 {
  if (pathname === "/1")
  {
    readJSONBody(request, function(task)
    {
      writeTasks("1.txt",task, function()
      {
        response.end();
      });
    });
  }
  if(pathname === "/2")
  {
    readJSONBody(request, function(task)
    {
        writeTasks("2.txt",task,function()
        {
        response.end();
        });
    });
  }
 }
}).listen(8000, '127.0.0.1');

console.log("Running 127.0.0.1");
