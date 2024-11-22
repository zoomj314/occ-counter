var numbers;
function ccount(amount) {
  if (amount == 0) {
    numbers["boxes"] = parseInt(document.getElementById("numberin").value);
  } else {
    numbers["boxes"] += amount;
    document.getElementById("numberin").value = numbers["boxes"];
  }
  const requestoptions = {
    method: "POST",
    body: JSON.stringify(numbers),
    headers: { "Content-Type": "application/json" },
  };
  fetch("update", requestoptions).catch((err) => alert(err));
}
function updateinterface() {
  var newhtml = "<div class='flex-r'>";
  for (var i in numbers.stacks) {
    newhtml += "<div class='flex-c'>";
    console.log(numbers.stacks[i]);
    for (var i2 in numbers.stacks[i]) {
      newhtml += `<div><button onclick='increment(${i},${i2}, -1)'>-</button><input type='text' class='number' id=${i}-${i2} value='${numbers.stacks[i][i2]}' inputmode='numeric' onClick='this.setSelectionRange(0, this.value.length)' onchange='updateserver(${i},${i2})'></input><button onclick='increment(${i},${i2}, 1)'>+</button></div>`;
    }
    newhtml += `<div><input type='checkbox' id='check-${i}' onchange='check(${i})'><label for='check-${i}'>lock</label><input type='button' value='delete' onclick='del(${i})'/></div></div>`;
  }
  newhtml +=
    "<tr><td><button onclick='addstack()'>Add stack</button></td></tr></div>";
  document.getElementById("columinput").innerHTML = newhtml;
  for (var i in numbers.locked) {
    console.log(`${i} is ${!numbers.locked[i]}`);
    document.getElementById(`check-${i}`).checked = numbers.locked[i];
  }
}
function increment(col, box, amount) {
  if (document.getElementById(`check-${col}`).checked == false) {
    document.getElementById(`${col}-${box}`).value = parseInt(
      document.getElementById(`${col}-${box}`).value
    );
    numbers.stacks[col][box] = parseInt(numbers.stacks[col][box]) + amount;
    document.getElementById(`${col}-${box}`).value = numbers.stacks[col][box];
    console.log(numbers);
    const requestoptions = {
      method: "POST",
      body: JSON.stringify(numbers),
      headers: { "Content-Type": "application/json" },
    };
    fetch("update", requestoptions).catch((err) => alert(err));
  }
}
function updateserver(col, box) {
  if (!numbers["locked"][col]) {
    numbers.stacks[col][box] = parseInt(
      document.getElementById(`${col}-${box}`).value
    );
    const requestoptions = {
      method: "POST",
      body: JSON.stringify(numbers),
      headers: { "Content-Type": "application/json" },
    };
    fetch("update", requestoptions).catch((err) => alert(err));
  } else {
    updateinterface();
  }
}
function addstack() {
  console.log("adding stack");
  if (numbers.stacks) {
    numbers["stacks"].push([0, 0, 0, 0]);
    numbers["locked"].push(false);
  } else {
    numbers["stacks"] = [[0, 0, 0, 0]];
    numbers["locked"] = [false];
  }
  updateinterface();
}
function check(stack) {
  console.log(stack);
  numbers.locked[stack] = document.getElementById(`check-${stack}`).checked;
  console.log(numbers);
  const requestoptions = {
    method: "POST",
    body: JSON.stringify(numbers),
    headers: { "Content-Type": "application/json" },
  };
  fetch("update", requestoptions).catch((err) => alert(err));
}
function del(stack) {
  if (!numbers["locked"][stack]) {
    if (confirm("Do you really want to delete it?")) {
      numbers["stacks"].splice(stack, 1);
      numbers["locked"].splice(stack, 1);
      console.log(numbers);
      updateinterface();
      const requestoptions = {
        method: "POST",
        body: JSON.stringify(numbers),
        headers: { "Content-Type": "application/json" },
      };
      fetch("update", requestoptions).catch((err) => alert(err));
    }
  }
}

fetch("https://occ-counter.glitch.me/numbers.json")
  .then((data) => data.json())
  .then((json) => {
    numbers = json;
    console.log(numbers);
    document.getElementById("numberin").value = numbers.boxes;
    updateinterface();
  })
  .catch((err) => alert(err));
