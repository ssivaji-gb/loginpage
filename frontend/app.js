let signUppage_btn = document.querySelector(".signUp-page");
let signIn = document.querySelector(".signIn");
let signUp = document.querySelector(".signUp");
let signUpBackbtn = document.querySelector(".signUp-back");
let userbacded = document.querySelector(".userbacded");
let adminbacked = document.querySelector(".adminbacked");

// admin E & M

let aEmail = "sathirabathiSivaji@gmail.com";
let aPassword = "123";
// sign-in-form

let sign_in_form = document.querySelector(".sign-in-form");

sign_in_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let sInEmailInput = document
    .querySelector(".sign-in-form-email")
    .value.trim();
  let sInPasswordInput = document
    .querySelector(".sign-in-form-password")
    .value.trim();

  SignInformvalidation(sInEmailInput, sInPasswordInput);
});

// sign-up-form

let sign_up_form = document.querySelector(".sign-up-form");

sign_up_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let sUpNameInput = document.querySelector(".sign-up-form-name").value.trim();
  let sUpEmailInput = document
    .querySelector(".sign-up-form-email")
    .value.trim();
  let sUpPasswordInput = document
    .querySelector(".sign-up-form-password")
    .value.trim();
  console.log(sUpNameInput, sUpEmailInput, sUpPasswordInput);

  SignUpformValidation(sUpNameInput, sUpEmailInput, sUpPasswordInput);
});

// get-function

async function get() {
  try {
    let users = await fetch("http://localhost:4001/users");
    let userData = await users.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error:", error);
  }
}

// post-function

async function post(name, email, password) {
  let user = { name, email, password };
  try {
    let response = await fetch("http://localhost:4001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    let res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Sign-up-form-validation

async function SignUpformValidation(name, email, password) {
  let result = await get();
  //   console.log(result);
  let final = result.findIndex((i) => i.email === email);
  console.log(final);

  if (final !== -1) {
    alert("Email already exists");
    // return
  } else {
    alert("New user can be registered");
    console.log(name, email, password);

    post(name, email, password);

    // inga POST API call panna laam
  }
}

// Sign-In-form-validation

async function SignInformvalidation(email, password) {
  let result = await get();
  let find = result.findIndex((i) => i.email == email);
  console.log(find);

  if (email == aEmail && password == aPassword) {
    alert("admin-irukku");
    admindashboard(aEmail, result);
  } else if (find !== -1) {
    alert("user-irukku");
    userDashboard(result[find]);
    console.log(result[find]);
  } else {
    alert("illai");
  }
}

// new user

signUppage_btn.addEventListener("click", () => {
  signUp.style.display = "block";
  signIn.style.display = "none";
});

//signUp-back

signUpBackbtn.addEventListener("click", () => {
  signUp.style.display = "none";
  signIn.style.display = "block";
});

// userDashboard

function userDashboard(user) {
  let usernamed = String(user.name).toUpperCase();

  signUp.style.display = "none";
  signIn.style.display = "none";
  document.querySelector(".userDashboard").style.display = "block";
  document.querySelector(
    ".userDashboard-h1"
  ).innerHTML = `WELCOME ${usernamed}`;
}

// userbacded

userbacded.addEventListener("click", () => {
  signUp.style.display = "none";
  signIn.style.display = "block";
  document.querySelector(".userDashboard").style.display = "none";
});

// admin-dashboard---UI

function admindashboard(name, result) {
  signUp.style.display = "none";
  signIn.style.display = "none";
  document.querySelector(".userDashboard").style.display = "none";
  document.querySelector(".admin-dashboard").style.display = "block";
  let ol = document.querySelector(".user-detail");
  result
    .map((i) => {
      let li=document.createElement("li")
      li.innerHTML=`<h3 class="usernamead">${i.name}</h3>
          <h3 class="email">${i.email}</h3>
          <h3 class="Password">${i.password}</h3>`
          ol.append(li)
    })
    
}
// adminbacked
adminbacked.addEventListener("click", () => {
  signUp.style.display = "none";
  signIn.style.display = "block";
  document.querySelector(".userDashboard").style.display = "none";
  document.querySelector(".admin-dashboard").style.display = "none";
});
