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

function createTestScope() {
  cscope = new Scope("Test.1", 0, [new Node("N1", "Test node", 100, 100), new Node("N2", "Test node2", 200, 100)]);
  //scope.size.x = 10;
  //scope.size.y = 10;
}
