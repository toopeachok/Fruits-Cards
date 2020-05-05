import "./styles/bootstrap.min.css"
import "./styles/modal.scss"
import "./styles/main.scss"
import {$} from "./base"
import "./plugins/modal"

let options = {
  title: "Hello Modal",
  closable: true,
  content: `
    <p>Lorem ipsum dolor sit amet.</p>
  
    <p>Lorem ipsum dolor sit amet.</p>
  `,
  width: "400px",
  footerButtons: [
    {
      text: "OK", type: "primary", handler() {
        console.log("Primary button was clicked");
        modal.close();
      }
    },
    {
      text: "Cancel", type: "danger", handler() {
        console.log("Danger button was clicked");
        modal.close();
      }
    },
  ],
};

let modal = $.modal(options);

document.querySelector("p").addEventListener("click",
  () => modal.open()
);




