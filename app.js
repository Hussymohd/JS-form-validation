const form = document.querySelector("#form")
const username = document.getElementById ("username")
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");

//add a submit event listener on the form and prevent the default behavior of the form
//event propagation

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs()
});

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message; //to change text in javascript
}
function setSuccess(input) {
     const formControl = input.parentElement;
     formControl.className = "form-control success"; 
}

//how to get values inside of the input field
function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const captchaValue = captcha.value.trim();
  console.log(
    usernameValue,
    emailValue,
    passwordValue,
    password2Value,
    captchaValue
  );

  //validate the username (empty fields, min length is 5)
  if (usernameValue === "") {
    // console.log("Username is required");
    setError(username, "Username is required");
  } else if (usernameValue.length < 5) {
    //console.log("username is too short");
    setError(username, "Minimum username length is 5");
  } else {
    console.log("success");
    setSuccess(username);
  }

  //validate email (email must not be empty, email must not inlcude @)
  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!emailValue.includes("@")) {
    setError(email, "Email must include @");
  } else {
    setSuccess(email);
  }

  //password must not be empty and the min password is 7
  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 7) {
    setError(password, "Password is too short");
  } else {
    setSuccess(password);
  }

  //password2 must not be empty and must the first password
   if (password2Value === "") {
     setError(password2, "Password is required");
   } else if (password2Value !== passwordValue) {
     setError(password2, "Password does not match");
   } else {
     setSuccess(password2);
   }
 //captcha must not be empty
  if (captchaValue === "") {
    setError(captcha, "Captcha is required");
  }
}

//select the button using the class show-bth
const showBtn = document.querySelector(".show-btn")
showBtn.addEventListener("click", (e) => {
    e.preventDefault()
   const inputType = password.getAttribute("type");
   if (inputType === "password"){
    password.setAttribute("type", "text");
    showBtn.value = "Hide";
   } else {
     password.setAttribute("type", "password");
     showBtn.value = "Show"; 
   }  
});

captcha.addEventListener("input", (e) => {
    const img = document.querySelector("img");
    const text = e.target.value;
    const blurValue = 20 - text.length
    img.style.filter = `blur(${blurValue}px)`;

    if (blurValue <= 0) {
        setSuccess (captcha)
    } else {
        setError(captcha, "Text is not long enough");
    }
});


