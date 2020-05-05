import {$} from "./base"
import "./plugins/modal"

export function createFruitsListItem(fruit) {

  let fruitCard = `
    <img class="card-img-top" src="${fruit.img || ''}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title || 'Unknown fruit'}</h5>
      <a href="#!" class="btn btn-primary" data-price="${fruit.price}">Check price</a>
      <a href="#!" class="btn btn-danger" data-delete>Delete</a>
    </div>
  `;

  return fruitCard;

}

export function showFruitsList(fruits) {

  let fruitsList = document.querySelector('[data-fruits]');

  let modal = {};
  modal.window = window;

  fruits.forEach(fruit => {

    const $fruit = document.createElement("div");

    $fruit.classList.add("card");

    $fruit.style.width = "400px";

    let isDeleteCreated = false;
    let isPriceCreated = false;
    $fruit.classList.add('col');

    $fruit.innerHTML = createFruitsListItem(fruit);
    $fruit.setAttribute('data-id', fruit.id);

    $fruit.querySelector('[data-price]').addEventListener('click', (event) => openPriceModal(event));
    $fruit.querySelector('[data-delete]').addEventListener('click', (event) => openDeleteModal(event));

    fruitsList.insertAdjacentElement('beforeend', $fruit);

    function openPriceModal(event) {
      event.preventDefault();

      if(isDeleteCreated) {
        modal.destroy();
        isDeleteCreated = false
      }

      if(isPriceCreated) {
        modal.setTitle(fruit.title);
        modal.setContent(makePriceContent());
        modal.open();
        return
      }

      modal = $.modal({
        title: fruit.title,
        closable: true,
        content: makePriceContent()
      });
      isPriceCreated = true;

      modal.open();

      function makePriceContent() {
        return  `
                    <span class="price-title">Цена на ${fruit.title}:</span>
                    <span class="price">${fruit.price} рублей</span>
                `
      }
    }

    function openDeleteModal(event) {
      event.preventDefault();

      if(isPriceCreated) {
        modal.destroy();
        isPriceCreated = false
      }

      if(isDeleteCreated) {
        modal.setTitle(fruit.title);
        modal.open();
        return
      }

      modal = $.modal({
        title: `Удалить ${fruit.title} ?`,
        closable: true,
        footerButtons: [
          {
            text: 'Удалить', type: 'danger', handler() {
              deleteFruitCard()
            }
          },
          {
            text: 'Отмена', handler() {
              modal.close()
            }
          }
        ]
      });
      isDeleteCreated = true;

      modal.open();

      function deleteFruitCard() {
        const card = fruitsList.querySelector(`[data-id="${fruit.id}"]`);
        card.querySelector('[data-price]').removeEventListener('click', () => openPriceModal(event));
        card.querySelector('[data-delete]').removeEventListener('click', () => openDeleteModal(event));
        card.parentNode.removeChild(card);

        modal.destroy();
        isDeleteCreated = false
      }

    }

  })

}