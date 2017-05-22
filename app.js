// Scan bridge available
function scan()
{
  document.getElementById('scan_card')
      .style.display = 'block'
  
  var view = document.getElementById("scan_content")
  view.innerHTML = "Searching..."
  
  var ok = function(body) 
  {
    localStorage.setItem("bridge_url", root + i + endpoint);
    view.innerHTML = "Hue HUB found. Now, you must press button on the Hue <br/><button class=\"ui basic button\" onclick=\"saveUser()\">Continue</button>";
  };
  
  var fail = function()
  {
    if(i > 254)
    {
      view.innerHTML = "No bridge found!";
      return;
    }
    i++;
    view.innerHTML = "<div class=\"ui indicating progress\" data-value=\"" + i + "\" data-total=\"254\"><div class=\"bar\"></div></div>";
    query(root + i + endpoint, "POST", { devicetype: APP_ID }, fail, ok);
  };
  
  query(root + i + endpoint, "POST", { devicetype: APP_ID }, fail, ok);
}

function showError(msg)
{
    var car_list = document.getElementById('card_list')
    for(var card of car_list.children)
    {
        card.style.display = 'none'
    }
    
    var error_card = document.getElementById('error_card')
    error_card.style.display = 'block'
    
    var view = document.getElementById('error_message')
    view.innerHTML = msg
}

// Save user
function saveUser()
{
    document.getElementById('scan_card')
      .style.display = 'none'
    document.getElementById('save_card')
      .style.display = 'block'
    
  function ok(rsp)
  {
    if(rsp[0].error)
    {
        showError(rsp[0].error.description);
        return;
    }
    user = rsp[0].success.username;
    localStorage.setItem("user", user);
    showRoom();
  };
  
  function fail(msg = "Failed authorization.")
  {
    showError(msg);
  };
    
  query(root + i + endpoint, "POST", { devicetype: APP_ID }, fail, ok);
}

// Show all the room
function showRoom()
{
  get('/groups', function() 
  {
    alert('Fail retrieve ligths');
  }, function(rsp)
  {
    var card_list = document.getElementById('card_list');
    var s = "<ul>";
    for(var gid in rsp)
    {
        if(rsp[gid].lights.length == 0)
            continue;
        
        var tpl = document.getElementById('card_$gid')
        var card = document.createElement("div")
        card.id = 'card_' + gid
        card.classList.add('card')
        card.classList.add('light_card')
        card.innerHTML = tpl.innerHTML
            .replace(/\$gid/g, gid)
            .replace(/\$room_name/g, rsp[gid].name)
            .replace(/\$light_count/g, rsp[gid].lights.length)
        card_list.appendChild(card);
    }
  });
}

function selectRoom(gid)
{
  var view_room = document.getElementById('view');
  var tpl_room = document.getElementById('tpl_room');
  view_room.innerHTML = tpl_room.innerHTML.replace(/\$gid/g, gid);
}

function changeColor(index, gid, action)
{
  // Update card / button
  var card = document.getElementById("card_" + gid);
  var i = 0;
  for(var btn of card.getElementsByTagName("button"))
  { 
      if(i == index)
        btn.classList.remove("basic");
      else
        btn.classList.add("basic");
      
      i++;
  }
  
  // Execute query
  action = '{' + action.replace(/_/g, '"') + '}';
  action = JSON.parse(action)
  // /api/<username>/groups/<id>/action
  var url = bridge_url + '/' + user + '/groups/' + gid + '/action';
  query(url, 'PUT', action, function()
  {
    alert("Fail to execute");
  }, function(rsp)
  {
    console.log('Change apply: ' + action)
  });
}

function search()
{
    var q = document.getElementById('q').value
    if(q.length < 3)
    {
        for(var card of getLightCard())
        {
            card.style.display = 'block'
        }
    }
    
    var regex = new RegExp(q, 'i')
   
    var match_list = []
    for(var card of getLightCard())
    {       
        var header = card.querySelector('.header')
        if(header == null)
            continue
         
        if(regex.test(header.innerHTML))
        {
            match_list.push(card)
        }
    }
    
    enable_filter = true
    if(match_list.length == 0)
        enable_filter = false
        
    for(var card of getLightCard())
    {
        if(enable_filter)
            if(!match_list.includes(card))
                card.style.display = 'none'
        else
            card.style.display = 'block'
    }
}

function getLightCard()
{
     var card_list = document.getElementById('card_list')
    
    var list = []
    for(var card of card_list.children)
    {
        if(card.classList.contains('light_card'))
            list.push(card)
    }
    return list
}

function closeErrorCard()
{
    document.getElementById("error_card")
        .style.display = 'none'
}

function reset()
{
    console.info("Reset user and bridge_url")
    localStorage.removeItem("bridge_url")
    localStorage.removeItem("user")
    
    reboot()
}

function reboot()
{
    window.location.reload();
}

var APP_ID = "shue mac"
// Read configuration
var bridge_url = null
var user = null

// Constant
var root = 'http://192.168.1.'
var endpoint = '/api'

// Revert to 0
var i = 1; // Port number

(function()
{
  bridge_url = localStorage.getItem("bridge_url")
  user = localStorage.getItem("user")
  
  if(bridge_url == null)
  {
    console.log("Scanning for HUB...")
    scan()
  }
  else if(user == null)
  {
    console.log("Save user")
    saveUser()
  }
  else 
  {
    console.log("Show room")
    showRoom()
  }
})();