window.addEventListener("load", function () {
  getData("https://statsinsight-code-interview.herokuapp.com/get/Get_Balls_CI")
    .then((res) => {
      // console.log(res);
      jsonTableBuild(res);
    })
    .catch((res) => {
      console.log(res);
    });
});

function getData(url) {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status == 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject(new Error(req));
      }
    };
    req.send();
  });
}
var tableFragment = document.createDocumentFragment();
var theadFragment = document.createDocumentFragment();
var tbodyFragment = document.createDocumentFragment();
var container = document.getElementById("container");

function jsonTableBuild(obj) {
  var data = obj;
  var len = data.length;
  // console.log(data);
  var reduceArr = data.reduce(function (acc, cur) {
    var totalY = cur.APP_KZoneY;
    var totalZ = cur.APP_KZoneZ;
    // console.log(totalY, totalZ);
    return +totalY + +totalZ;
  });

  buildTable(data);

  function buildTable(data) {
    var table = document.querySelector("table");
    var thead = buildThead(data);
    var tbody = buildTbody(data);
    tableFragment.appendChild(thead);
    tableFragment.appendChild(tbody);
    return table.append(tableFragment);
  }

  function buildThead(keys) {
    var thead = document.createElement("thead");
    var th =
      "<tr>" +
      "<th>" +
      Object.keys(keys[0])[1] +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[11] +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[4] +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[5] +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[12] +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[13] +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[14] +
      "</th>" +
      "<th>" +
      "BABIP" +
      "</th>" +
      "<th>" +
      Object.keys(keys[0])[24] +
      "</th>" +
      "</tr>";
    thead.innerHTML = th;
    console.log(Object.keys(keys[0]));
    theadFragment.appendChild(thead);
    return this.theadFragment;
  }

  function buildTbody(values) {
    var tbody = document.createElement("tbody");
    for (var i = 0; i < values.length; i++) {
      var th =
        "<tr>" +
        "<td>" +
        values[i].Date +
        "</td>" +
        "<td>" +
        values[i].TaggedPitchType +
        "</td>" +
        "<td>" +
        values[i].Pitcher +
        "</td>" +
        "<td>" +
        values[i].Batter +
        "</td>" +
        "<td>" +
        values[i].APP_VeloRel +
        "</td>" +
        "<td>" +
        values[i].APP_KZoneY +
        "</td>" +
        "<td>" +
        values[i].APP_KZoneZ +
        "</td>" +
        "<td>" +
        reduceArr +
        // (+values[i].APP_KZoneZ + +values[i].APP_KZoneY)
        "</td>" +
        "<td>" +
        values[i].Stadium +
        "</td>" +
        "</tr>";
      tbody.innerHTML += th;
      tbodyFragment.appendChild(tbody);
    }
    return this.tbodyFragment;
  }
}
