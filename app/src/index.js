import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function () {
    const { web3 } = this;
    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address
      );
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStar: async function () {
    try {
      const { createStar } = this.meta.methods;
      const name = document.getElementById("starName").value;
      const id = document.getElementById("starId").value;
      this.loading("#createStar");
      await createStar(name, id).send({ from: this.account });
      document.querySelector("#createStar").innerHTML = "Create Star";
      App.setStatus("New Star Owner is " + this.account + ".");
      this.flash(
        "Star succesfully minted and sent to your address !",
        "success"
      );
    } catch (error) {
      this.flash(
        "An unexpected error has been encoutered please retry",
        "danger"
      );
    }
  },
  // Implement Task 4 Modify the front end of the DAPP

  setStarInfo(starName) {
    const starInfo = document.querySelector("#starInfo");
    if (starInfo) {
      starInfo.innerHTML = "";
      const p = document.createElement("p");
      p.innerHTML = `Name: ${starName}`;
      starInfo.appendChild(p);
    } else {
      console.error("startInfo container does not exists");
    }
  },

  lookUp: async function () {
    try {
      const { lookUptokenIdToStarInfo } = this.meta.methods;
      const id = document.querySelector("#lookid").value;
      if (id) {
        const starData = await lookUptokenIdToStarInfo(parseInt(id)).call();
        this.setStarInfo(starData);
      } else {
        this.flash(
          "Star id must be present in order to call this function",
          "info"
        );
      }
    } catch (error) {
      this.flash(
        "An unexpected error has been encoutered please retry",
        "danger"
      );
    }
  },

  loading: (selector) => {
    const span1 = document.createElement("span");
    const parent = document.querySelector(selector);
    let attributesSpan1 = [
      { name: "class", value: "spinner-border spinner-border-sm" },
      {
        name: "role",
        value: "status",
      },
      {
        name: "aria-hidden",
        value: "true",
      },
    ];

    attributesSpan1.map(({ name, value }) => span1.setAttribute(name, value));
    document.querySelector(selector).innerHTML = "";
    const text = document.createTextNode("Loading...");
    [span1, text].map((element) => parent.appendChild(element));
  },

  flash: (message, type) => {
    const alertContainer = document.querySelector("#alert-container");
    if (alertContainer) {
      alertContainer.innerHTML = "";
      const div = document.createElement("div");
      div.setAttribute("class", `alert alert-${type}`);
      div.innerHTML = message;
      alertContainer.appendChild(div);
    } else {
      console.error("alert-container is not defined");
    }
  },
};

window.App = App;

window.addEventListener("load", async function () {
  if (window.ethereum) {
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545")
    );
  }

  App.start();
});
