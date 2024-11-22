var count = 0;
var cartoncount = 0;
function updatecount() {
  fetch("/numbers.json")
    .then((data) => data.json())
    .then((numbers) => {
      count = 0;
      cartoncount = 0;
      for (var i in numbers["stacks"]) {
        for (var i2 in numbers["stacks"][i]) {
          count += numbers["stacks"][i][i2];
          if (numbers["stacks"][i][i2] != 0) {
            cartoncount++;
          }
        }
      }
      count += numbers.boxes;
      document.getElementById("total").innerHTML = count;
      document.getElementById("cartoncount").innerHTML = cartoncount;
      if (count > 999) {
        document.getElementById("total").style.fontSize = "50vh";
      } else {
        document.getElementById("total").style.fontSize = "65vh";
      }
    });
}
setInterval(updatecount, 10000);
updatecount();
