console.log("client side javascript");

const form = document.getElementsByTagName("form")[0];
console.log("form", form);
const search = form.querySelector("input");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = search.value;
  if (value == "") {
    alert("please enter a value");
  } else {
    fetch("http://localhost:3000/weather?address=" + value).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    });
  }
  console.log("testing...A");
});
