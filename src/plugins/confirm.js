import {$} from "@/base";

$.confirm = function (options) {

  return new Promise((resolve, reject) => {

    const modal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy();
      } ,
      footerButtons: [
        {
          text: 'Удалить', type: 'danger', handler() {
            modal.close();
            resolve();
          }
        },
        {
          text: 'Отменить', type: 'secondary', handler() {
            modal.close();
            reject();
          }
        }
      ]
    });

    setTimeout(() => {
      modal.open();
    }, 0);
  })
};



