document.title = "diff"
let div = document.createElement("div");
div.style.color = "#000";
div.style.backgroundColor = "#fff";
div.innerHTML += "[1,2,3,4,1,3] 4" + "<br/>";

function StrArr(array) {
  let hm = new Map();
  for (let i = 0; i < array.length; i++) {
    let sum = 0;
    array[i].split("").forEach((item) => sum += item.codePointAt());
    if (hm.has(sum)) {
      hm.set(sum, [...hm.get(sum), array[i]]);
    } else {
      hm.set(sum, [array[i]])
    }
  }
  let rel = [];
  for (let o of hm.values()) {
    rel.push(o);
  }
  return rel;
}
div.innerHTML += "Result: " + StrArr(["eat", "tea", "tan", "ate", "nat", "bat"]) + "<br/>";

document.body.appendChild(div);
