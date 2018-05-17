var player_url = "https://939b5fzk1j.execute-api.eu-west-1.amazonaws.com/Testing/players";
var schedule_url = "https://939b5fzk1j.execute-api.eu-west-1.amazonaws.com/Testing/schedule";
var players;

function callPlayersApi(element, url)
{
    var apiXMLReq = new XMLHttpRequest();
    apiXMLReq.onreadystatechange = function() {
        if (this.readyState == 4)
        {
            allplayers = JSON.parse(apiXMLReq.responseText);
            var i = 1;
            var row='<div class="container"> <div class="row"> <div class="col-12 table-header"> Players  </div></div>' ;
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
    apiXMLReq.open("GET", player_url + url , true );
    apiXMLReq.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    apiXMLReq.send(null);

}

function callRest()
{

        callPlayersApi('players','/all');
        showSchedule();
}

function showSchedule()
{
    var apiXMLReq = new XMLHttpRequest();
    apiXMLReq.onreadystatechange = function() {
        if (this.readyState == 4)
        {
            plan = JSON.parse(apiXMLReq.responseText);
            ts = plan['timestamp']*1000;
            var date = new Date(ts).toLocaleString("da-DK");
            var i = 1;
            var row=`<div class="container"> <div class="row"> <div class="col-6 table-header"> Schedule prepared at </div> <div class="col-6 table-header"> ${date}</div> </div>` ;
            for ( var s in plan['plan'])
            {
                var curcourt = plan['plan'][s]['court'];
                var curplayers = plan['plan'][s]['players'];
                row = row + `<div class="row newcourt">  <div class="col-12"> Court ${curcourt} </div> </div> `;
                row = row + `<div class="row playerincourt">`;
                for (var curplayer in curplayers)
                {
                    row = row + `<div class="col-6">  ${plan['plan'][s]['players'][curplayer]} </div>`;
                }
                row = row + `</div>`;
            }
            row = row + `</div>`;
            document.getElementById('schedule').innerHTML = row;

        }
      };
    apiXMLReq.open("GET", schedule_url , true );
    apiXMLReq.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    apiXMLReq.send(null);

}
function makeSchedule(type)
{
    var body = `{ "type":\"${type}\" }`;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", schedule_url+'/create', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    //xhr.setRequestHeader('Content-Length',body.length);
    xhr.send(body);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        //alert(users);
        if (xhr.readyState == 4 && xhr.status == "200") {
                alert('Ok');
        } else {
                alert('Error in making schedule');
        }
    }
}

function checkoutAll()
{
    var apiXMLReq = new XMLHttpRequest();
    apiXMLReq.open("GET", player_url + '/clearall' , true );
    apiXMLReq.setRequestHeader("x-api-key","s8Acz0z7Ix2z8t20xyPZu5pQ4WAa2EQ13yFRpUBu");
    apiXMLReq.send(null);
    apiXMLReq.onload = function () {
        if (apiXMLReq.readyState == 4 && apiXMLReq.status == "200") {
           // alert('All players checkedout');
        } else {
            alert('Error in checkout All');
        }
    }
    setTimeout(function(){
        makeSchedule('doubles');
    }, 2500);
}

function checkin(id,name)
{
    var body = `{ "id": ${id}, "name":\"${name}\"}`;
//    alert(body);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", player_url+'/checkin', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    //xhr.setRequestHeader('Content-Length',body.length);
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
    }, 1500);
}



function checkout(id,name)
{
    var body = `{ "id": ${id}, "name":\"${name}\"}`;
//    alert(body);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", player_url+'/checkout', true);
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
    }, 1500);
}
