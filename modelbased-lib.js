cscope = 0;

function Scope(id, timer, objects) {

}

function createTestScope() {
  n1 = {};
  scope = new Scope("Test.1", 0, []);
  scope.size.x = 10;
  scope.size.y = 10;
}
