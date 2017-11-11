cscope = 0;
cscopeList = new Array();
drag = null;

function Scope(id, timer, objects) {
  this.id = id;
  this.size = {"x": 100, "y": 100};
  this.nodes = objects;
}

function Node(id, label, x, y) {
  this.id = id;
  this.vid = -1;
  this.props = {"label": label, "prop2": "hallo"};
  this.x = x;
  this.y = y;

  this.tags = [["INC", "123", "Hello INC", 1],["INC", "2", "Hello INC 2", 3]];
  this.logic = "";
}

function GetLogicFunc(nid, handle = "") {
  // Return runnable part of logic (code)
  n = GetNode(nid);
  code = n.logic;
  code = code.replace("<div>", "");
  code = code.replace(new Array("</div>", "<br>", "<br/>"), "\n");
  
  if(handle == "") {
   	// Get the global scope 
  }
  else {
    console.log(code);
  }
}

function Prop(id, value) {

}

function Tag(id, typ, desc, priority) {
  // Tags for: defects, incidents, dependencies, etc
}

function GetNode(id) {
  for(i = 0; i < cscope.nodes.length; i++)
    if(cscope.nodes[i].id == id || cscope.nodes[i].vid == id)
      return cscope.nodes[i];
  return null;
}

function AddNode() {
  max = 0;
  for(i = 0; i < cscope.nodes.length; i++)
    max = Math.max(parseInt(cscope.nodes[i].id), max);
  cscope.nodes.push(new Node(max+1, "New node", 100, 100));
}

function createTestScope() {
  cscope = new Scope("Test.1", 0, [
    new Node("1", "Test node", 100, 100),
    new Node("2", "Test node2", 200, 100),
    new Node("3", "Test node3", 200, 100)]);
  //scope.size.x = 10;
  //scope.size.y = 10;
}

function GetNodeFromLoc(x, y, c = 0) {
  xmin = x - (x * c);
  xmax = x + (x * c);
  ymin = y - (y * c);
  ymax = y + (y * c);
  console.log(xmin + " " + xmax + " " + ymin + " " + ymax);
  for(i = 0; i < cscope.nodes.length; i++) {
    if(xmin <= cscope.nodes[i].x && cscope.nodes[i].x <= xmax && ymin <= cscope.nodes[i].y && cscope.nodes[i].y <= ymax)
      return cscope.nodes[i];
  }
  
  return null;
}

function Draw() {
    //paper = new Raphael(document.getElementById("canvas"), 800, 600);
    $("#canvas").empty();
    $("#popups").empty();
       //c.drag(move, start, up);
       //c.sizer = s;
       //s.drag(rmove, rstart);
       //s.big = c;

    for(i = 0; i < cscope.nodes.length; i++) {
      n = cscope.nodes[i];
      cscope.nodes[i].vid = "n_" + n.id;
      label = (n.props && "label" in n.props? n.props["label"] : "");
      
      tags = "&nbsp;";
      tags = "<ul>";
      if(n.tags) {
        for(j = 0; j < n.tags.length; j++) {
          tags += "<li>" + n.tags[j][2] + "</li>";
        }
      }
      tags += "</ul>";
      
      d = $("<div id=\"n_" + n.id + "\" class=\"node\"><span id=\"n_" + n.id + "_label\">" + label + "</span><div class=\"tags\">" + tags + "</div></div>");

      $(d).draggable({ grid: [ 10, 10 ] });
      $(d).click(function(ev) {
        ShowPopup(this.id);
      });
      $("#canvas").append(d);

      // Adding popups pr node
      p = $("<div id=\"p_" + n.id + "\" class=\"popup\"><div class=\"bar\"><span class=\"title\">&nbsp;</span><a href=\"javascript:void($('#p_" + n.id + "').hide());\">X</a></div><div class=\"container props\">&nbsp;</div><div class=\"bar logic\">Logic</div><div class=\"container logic\">&nbsp;</div></div>");
      $(p).hide();
      //$(p).draggable();

      $("#popups").append(p);
      //var re = paper.rect( n.x, n.y, 50, 50 );
      //re.attr("nid", n.id);
      //n.svgid = re.id;
      //re.attr("fill", "#ff0000");
      //ft = paper.freeTransform(re, { distance: 1, rotate: false });
      //ft.hideHandles();
      $(d).offset({top: n.y - (n.y % 10), left: n.x - (n.x % 10)});
    }

    /*bb1 = circle.getBBox();
	  bb2 = re.getBBox();
	  var newPath = paper.path('M'+bb1.cx+','+bb1.cy+'L'+bb2.cx+','+bb2.cy);
	  newPath.attr({ stroke: 'blue'})*/

}

function ShowPopup(nid) {
  n = GetNode(nid);
  //$("#p_" + n.id).text(n.label);

  $("#p_" + n.id + " .container.base").empty();
  //$("#p_" + n.id + " .container.base").append("<div class=\"label\">Id</div><div class=\"value\"><a href=\"?sid=" + QueryString.sid + "." + n.id + "\">" + n.id + "</a></div>");
  //AddPopupElements(n.id, "#p_" + n.id + " .container.base", {"id": n.id, "label": n.label});

  $("#p_" + n.id + " .container.props").empty();
  if(n.props) {
    AddPopupElements(n.id, "#p_" + n.id + " .container.props", n.props);
  }

  $("#p_" + n.id + " .container.logic").empty();
  //if(n.logic) {
  $("#p_" + n.id + " .container.logic").append("<div id=\"" + n.id + "_logic\" class=\"value\" contenteditable=\"true\" style=\"width:100%\" onblur=\"void(EditField('" + n.id + "','logic'));\">" + n.logic + "</div>");
  //}
  
  $("#p_" + n.id).show();
  $("#p_" + n.id).offset({ top: $("#" + nid).offset().top + 20, left: $("#" + nid).offset().left + 20});
}

function AddPopupElements(id, cont, data) {
  for(k in data) {
    $(cont).append("<div class=\"label\">" + k + "</div><div id=\"" + id + "_" + k + "\" class=\"value\" contenteditable=\"true\" onblur=\"void(EditField('" + id + "','" + k + "'));\">" + data[k] + "</div>");
  }
}

function EditField(id, key) {
  //alert(JSON.stringify(id) + JSON.stringify(key));
  val = $("#" + id + "_" + key).html();
  val = val.replace("\n", "<br/>");
  n = GetNode(id);
  
  if(key == "label")
    $("#n_" + id + "_label").html(val);
  
  if(key == "logic")
    n.logic = val;
  else
  	n.props[key] = val;
  
  
}

function LoadScopeList() {
  cscopeList = JSON.parse(localStorage.getItem("scopes"));
  if(!cscopeList)
    cscopeList = new Array();
  return cscopeList;
}

function UpdateScopeList(sc) {
  if(cscopeList.indexOf("" + sc) == -1) 
  	cscopeList.push(sc);
  
  localStorage.setItem("scopes", JSON.stringify(cscopeList));
}

function LoadScope(sId) {
  cscope = JSON.parse(localStorage.getItem(sId));
  if(cscope) {
    // Load nodes
    Draw();
  }
  else {
    // Fallback to test scope
    createTestScope();
  }
}

function SaveScope(sId) {
  // Find node locations and store
  for(i = 0; i < cscope.nodes.length; i++) {
    cscope.nodes[i].x = $("#n_" + cscope.nodes[i].id).offset().left;
    cscope.nodes[i].y = $("#n_" + cscope.nodes[i].id).offset().top;
  }
  localStorage.setItem(sId, JSON.stringify(cscope));
}

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};

  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

function Export() {
  return JSON.stringify(cscope);
}

function ResetSimulation() {
  ClearDependencies();
  
  // Build dependencies and links
  
  // Run all reset routines for nodes
  
  
}

function RunSimulationCycle() {
  for(i = 0; i < cscope.nodes.length; i++) {
    //cscope.nodes[i]
  }
}