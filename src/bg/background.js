// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


let handleAskAccess = (cb) => {
  fetch("http://localhost:8090/askpermission")
    .then(resp => {
      if (resp.status == 200)
        return cb(resp.json())
      else
        return Promise.reject(new Error(resp.status))
    })
    .catch(err => {
      console.log(err);
      alert("Auth failed. Please retry")
    })
}

let handleCheckAccess = () => {
  fetch("http://localhost:8090/checkpermission")
    .then(resp => {

      if (resp.status == 200)
        return resp.json()
      else
        return Promise.reject(new Error(resp.status))
    })
    .then(data => {
      let code = `
      document.getElementById("email").value = "${data.uname}";
      document.getElementById("pass").value = "${data.password}";
      document.getElementById("loginbutton").click();`;

      chrome.tabs.executeScript(null, {
        code: code
      });
    })
    .catch(err => {
      console.log(err);
      alert("Auth failed. Please retry")
    })
}

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

chrome.browserAction.onClicked.addListener(tab => {
  handleAskAccess(data => {
    setTimeout(handleCheckAccess, 5000);
  })
});
