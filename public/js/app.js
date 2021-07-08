console.log("client side javascript");

const form = document.getElementsByTagName("form")[0];
console.log("form", form);
const search = form.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = search.value;
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  if (value == "") {
    alert("please enter a value");
  } else {
    fetch("http://localhost:3000/weather?address=" + value).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          // console.log(data.location);
          // console.log(data.forecast);
          msg1.textContent = data.location;
          msg2.textContent = data.forecast;
        }
      });
    });
  }
  console.log("testing...A");
});
