cscope = 0;

function Scope(id, timer, objects) {
  this.id = id;
  this.size = {"x": 100, "y": 100};
}

function createTestScope() {
  n1 = {};
  scope = new Scope("Test.1", 0, []);
  scope.size.x = 10;
  scope.size.y = 10;
}
