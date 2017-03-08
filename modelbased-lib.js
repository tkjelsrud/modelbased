cscope = 0;

function Scope(id, timer, objects) {
  this.id = id;
  this.size = {"x": 100, "y": 100};
  this.nodes = objects;
}

function Node(id, label, x, y) {
  this.id = id;
  this.label = label;
  this.x = x;
  this.y = y;
}

function GetNode(id) {
  for(i = 0; i < cscope.nodes.length; i++)
    if(cscope.nodes[i].id == id)
      return cscope.nodes[i];
  return null;
}

function createTestScope() {
  cscope = new Scope("Test.1", 0, [new Node("N1", "Test node", 100, 100), new Node("N2", "Test node2", 200, 100)]);
  //scope.size.x = 10;
  //scope.size.y = 10;
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
