cscope = 0;
drag = null;

function Scope(id, timer, objects) {
  this.id = id;
  this.size = {"x": 100, "y": 100};
  this.nodes = objects;
}

function Node(id, label, x, y) {
  this.id = id;
  this.vid = -1;
  this.label = label;
  this.x = x;
  this.y = y;
  this.props = {"prop1": "test", "prop2": "hallo"};
  this.tags = [["INC", "123", "Hello INC", 1],["INC", "2", "Hello INC 2", 3]];
  this.logic = {"event1": [1,2,3], "event2": [4,5,6]};
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

function Draw() {
    //paper = new Raphael(document.getElementById("canvas"), 800, 600);
    $("#canvas").empty();
       //c.drag(move, start, up);
       //c.sizer = s;
       //s.drag(rmove, rstart);
       //s.big = c;

    for(i = 0; i < cscope.nodes.length; i++) {
      n = cscope.nodes[i];
      cscope.nodes[i].vid = "n_" + n.id;
      d = $("<div id=\"n_" + n.id + "\" class=\"node\" style=\"left:" + n.x + "px;top:" + n.y + "px;\">" + n.label + "</div>");
      $(d).draggable();
      $(d).click(function(ev) {
        ShowPopup(this.id);
      });
      $("#canvas").append(d);

      //var re = paper.rect( n.x, n.y, 50, 50 );
      //re.attr("nid", n.id);
      //n.svgid = re.id;
      //re.attr("fill", "#ff0000");
      //ft = paper.freeTransform(re, { distance: 1, rotate: false });
      //ft.hideHandles();
    }

    /*bb1 = circle.getBBox();
	  bb2 = re.getBBox();
	  var newPath = paper.path('M'+bb1.cx+','+bb1.cy+'L'+bb2.cx+','+bb2.cy);
	  newPath.attr({ stroke: 'blue'})*/

}

function ShowPopup(nid) {
  n = GetNode(nid);
  $("#popup .title").text(n.label);

  $("#popup .container.base").empty();
  AddPopupElements("#popup .container.base", {"id": n.id, "label": n.label});

  $("#popup .container.logic").empty();
  if(n.logic) {
    AddPopupElements("#popup .container.logic", n.logic);
    //$("#popup .container.logic").text(JSON.stringify(n.logic));
  }
  $("#popup .container.props").empty();
  if(n.props) {
    AddPopupElements("#popup .container.props", n.props);
  }
  $("#popup").show();
  $("#popup").offset({ top: $("#" + nid).offset().top + 20, left: $("#" + nid).offset().left + 20});
}

function AddPopupElements(cont, data) {
  for(k in data) {
    $(cont).append("<div class=\"label\">" + k + "</div><div class=\"value\" contenteditable=\"true\" onblur=\"alert('edit')\">" + data[k] + "</div>");
  }
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
