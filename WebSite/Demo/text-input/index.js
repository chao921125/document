function question() {
  const textVal = document.querySelector("#textIn").value;
  if (!textVal) return false;
  drawText(textVal, "text-right");
  setTimeout(() => {
    answer();
  }, 2000);
}
function answer() {
  let text = "I Dont Know You Say What What";
  for (let i = 0; i < 100; i++) {
    text += "I Dont Know You Say What What" + i + "; ";
  }
  drawText(text, "text-left");
}
function drawText(text, clazz = "text-left") {
  let boxDiv = document.createElement("div");
  boxDiv.setAttribute("class", `message-item ${clazz}`);
  boxDiv.innerHTML = `<div class="text-box"><div class="text-out">${text}</div></div>`;
  document.querySelector("#textOut").appendChild(boxDiv);
  document.querySelector("#textIn").value = "";
}
