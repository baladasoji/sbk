var api_url = "https://939b5fzk1j.execute-api.eu-west-1.amazonaws.com/Testing/players";
var players;
function callApi(element, url)
{
    var apiXMLReq = new XMLHttpRequest();
    apiXMLReq.onreadystatechange = function() {
        if (this.readyState == 4)
        {
            players = JSON.parse(apiXMLReq.responseText);
            
            var i = 1;
            for (i=1; i<=16;i++)
            {
                id = "player"+i;
                document.getElementById(id).innerHTML = "Vacant";
            }
            i=1;
            for ( var s in players)
            {
                id = "player"+i;
                //alert(id);
                //alert(players[s]);
                document.getElementById(id).innerHTML = players[s];
                i++;
                // Do something
            }

        }
      };
    apiXMLReq.open("GET", api_url + url , true );
    apiXMLReq.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    apiXMLReq.send(null);

}

function callPlayersApi(element, url)
{
    var apiXMLReq = new XMLHttpRequest();
    apiXMLReq.onreadystatechange = function() {
        if (this.readyState == 4)
        {
            allplayers = JSON.parse(apiXMLReq.responseText);
            var i = 1;
            var row='<div class="container"> <h2 class="display-5">Player information</h2>' ;
            for ( var s in allplayers)
            {
                var id = allplayers[s].id;
                var name = allplayers[s].name;
                var checkedin = allplayers[s].CheckedIn;
                if (checkedin == 'True')
                {
                    row = row + `<div class="row"> <div class="col-6 checkedin-player-name" id=${name}> ${name} </div> <div class="col-6"><p><a class="btn btn-secondary btn-checkout" href="#unknown" onClick=checkout(${id},"${allplayers[s].name}") role="button">Checkout &raquo;</a></p></div> </div>`;
                }
                else
                {
                    row = row + `<div class="row"> <div class="col-6 checkedout-player-name" id=${name}> ${name} </div> <div class="col-6"><p><a class="btn btn-secondary btn-checkin" href="#unknown" onClick=checkin(${id},"${allplayers[s].name}") role="button">Checkin &raquo;</a></p></div></div>`;
                }
                i++;
                // Do something
            }
            document.getElementById(element).innerHTML = row;

        }
      };
    apiXMLReq.open("GET", api_url + url , true );
    apiXMLReq.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    apiXMLReq.send(null);

}
function callRest()
{

        callApi('#mylist','/rooster');
        callPlayersApi('players','/all');
}

function checkoutAll()
{
    var apiXMLReq = new XMLHttpRequest();
    apiXMLReq.open("GET", api_url + '/clearall' , true );
    apiXMLReq.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    apiXMLReq.send(null);
    setTimeout(function(){
        callRest();
    }, 1000);
}

function checkin(id,name)
{
    var body = `{ "id": ${id}, "name":\"${name}\"}`;
//    alert(body);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", api_url+'/checkin', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Length',body.length);
    xhr.send(body);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        //alert(users);
        if (xhr.readyState == 4 && xhr.status == "200") {
          //      alert('ok');
        } else {
            //    alert('not ok');
        }
    }
    setTimeout(function(){
        callRest();
    }, 1000);
}



function checkout(id,name)
{
    var body = `{ "id": ${id}, "name":\"${name}\"}`;
//    alert(body);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", api_url+'/checkout', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Length',body.length);
    xhr.send(body);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        //alert(users);
        if (xhr.readyState == 4 && xhr.status == "200") {
          //      alert('ok');
        } else {
            //    alert('not ok');
        }
    }
    setTimeout(function(){
        callRest();
    }, 1000);
}
