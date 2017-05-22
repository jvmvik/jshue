// Get resource
function get(res, fail, ok)
{
  query(bridge_url + '/' + user + res, 'GET', null, fail, ok);
}

// Query
function query(url, type, body, fail, ok)
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    { 
        if (http.readyState == XMLHttpRequest.DONE)
        {
          if(http.status == 200)
          {
            rsp = JSON.parse(http.responseText);
            ok(rsp);
          }
          else
          {
            fail();
          }  
        } 
    }
    
    http.timeout = 100;
    http.open(type, url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    
    if(body)
      if(!(body instanceof String))
        body = JSON.stringify(body);
    
    http.send(body); 
}