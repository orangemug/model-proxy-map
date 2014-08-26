// Currently inefficient
function map(model, Model, fn) {
  var m = new Model;

  function update() {
    var data = {};
    if(typeof(fn) === "function") {
      data = fn(model);
    } else {
      for(var k in fn) {
        var v = fn[k];
        while(v.match(/\{([^}]+)\}/)) {
          var rk = RegExp.$1;
          v = v.replace("{"+rk+"}", model.get(rk));
        }
        data[k] = v;
      }
    }
    m.set(data);
  }

  update();
  model.on("change", update);
  return m;
}

module.exports = map;
