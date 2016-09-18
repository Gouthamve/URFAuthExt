let handleClick = () => {
  fetch("http://localhost:8090/auth")
    .then(resp => {
      return resp.json()
    })
    .then(data => {
            
      //chrome.tabs.executeScript(null, {
        //code
      //});
      let code = `
      document.getElementById("email").value = "${data.uname}";
      document.getElementById("pass").value = "${data.password}";
      document.getElementById("loginbutton").click();`;

      chrome.tabs.executeScript(null, {
        code: code
      });
    })
    .catch(err => {
      console.log("ERR", err)
    })
}

document.getElementById("loginButton").addEventListener("click", handleClick);
