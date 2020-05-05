import "./styles/bootstrap.min.css"
import "./styles/modal.scss"
import "./styles/main.scss"
import {$} from "./base"
import "./plugins/modal"
import {createFruitsListItem, showFruitsList} from "@/fruits";

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

const fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
];



showFruitsList(fruits);







