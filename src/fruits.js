import {$} from "@/base";
import "@/plugins/modal"
import "@/plugins/confirm"

const toHML = fruit => `
    <div class="col">
      <div class="card" style="width: 300px">
        <img class="card-img-top" src="${fruit.img || ''}">
        <div class="card-body">
          <h5 class="card-title">${fruit.title || 'Unknown fruit'}</h5>
          <a href="#!" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Check price</a>
          <a href="#!" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
        </div>
      </div>
    </div>
  `;

function render(fruits) {
  const html = fruits.map(fruit => toHML(fruit)).join('');

  document.querySelector('[data-fruits]').innerHTML = html;
}

const priceModal = $.modal({
  title: "Цена на товар",
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Закрыть', type: 'primary', handler() {
        priceModal.close();
      }
    }
  ]
});

export function addFruitsCards(fruits) {

  render(fruits);

  document.querySelector('[data-fruits]').addEventListener('click',
    event => {

      event.preventDefault();

      const btnType = event.target.dataset.btn;

      const id = parseInt(event.target.dataset.id);

      const fruit = fruits.find(f => f.id === id);

      if (btnType === "price") {

        priceModal.setContent(`
          <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong> </p>
        `);

        priceModal.open();
      } else if (btnType === 'remove') {
        $.confirm({
          title: 'Вы уверены?',
          content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong> </p>`,
        }).then(() => {
          fruits = fruits.filter(f => f.id !== id);
          render(fruits);
        }).catch(() => {
          console.log('cancel')
        })
      }
    }
  );
}
