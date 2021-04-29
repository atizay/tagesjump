addEventListener('DOMContentLoaded', function() {

  const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };


  getResource('items.json')
    .then(res => createCards(res))
    .catch(error => console.log(error));


  getResource('materials.json')
    .then(res => createSelectMaterial(res))
    .catch(error => console.log(error));


  function createCards(response) {
    response.forEach(({name, code, price: {old_price, current_price}, image: {url}, material}) => {
      let card = document.createElement('div');
      let oldPrice = old_price ? old_price + '₽' : '';
      let codeProduct = code ? code : '<br>';

      card.classList.add('product-card');

      card.setAttribute('data-sort', current_price);
      card.setAttribute('data-material', material);

      card.innerHTML = `      
          <span class="product-card__discount">Скидка</span>
          <a href="#">
            <img src="assets/${url}" alt="" class="product-card__img">
          </a>
          <span class="product-card__code">
            ${codeProduct}
          </span>
          <a href="#">
            <p class="product-card__title">
              ${name}
            </p>
          </a>

          <div hidden data-material="${material}">${material}</div>
          
          <div class="product-card__label">
            <div class="product-card__info">
              
              <div class="product-card__wr-price">
                <span class="product-card__price product-card__price_old">${oldPrice}</span>
                <span class="product-card__new-price product-card__price_current">${current_price}₽</span>
              </div>
            </div>
            <div class="product-card__actions">
              <button class="btn btn_basket">
                <svg width="19" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.664 1.802c-.16 0-.314.018-.46.052a3.91 3.91 0 00-.768-1.14C1.925.202 1.117 0 0 0v1.8c.683 0 1.075.098 1.164.186.34.34.636 1.032.636 1.614l.01.127.88 6.173C1.216 9.977.073 11.123.002 12.555L0 13.5c.087 1.48 1.226 2.618 2.649 2.698h.204a2.701 2.701 0 005.093.002h2.108a2.701 2.701 0 100-1.8H7.946a2.701 2.701 0 00-5.092 0H2.7c-.459-.027-.87-.439-.902-.954L1.8 12.6c.024-.467.433-.876.945-.901H4.52l.013.001h9.071l.133-.042a2.362 2.362 0 001.487-1.396l.095-.187.308-.61a675.1 675.1 0 00.948-1.884c.76-1.514 1.24-2.477 1.345-2.713.544-1.214-.558-2.148-1.684-2.168L3.664 1.802zM13.292 9.9h-8.69a.153.153 0 01-.11-.126l-.883-6.173 12.495.894a314.03 314.03 0 01-1.136 2.278l-.013.026-.934 1.855-.308.61-.116.23-.044.102a.563.563 0 01-.26.304zm-.692 6.3a.9.9 0 100-1.8.9.9 0 000 1.8zm-6.3-.9a.9.9 0 11-1.8 0 .9.9 0 011.8 0z"/></svg>
              </button>

              <!-- <button class="btn btn_added">
                <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 20.9c-5.468 0-9.9-4.432-9.9-9.9S5.532 1.1 11 1.1s9.9 4.432 9.9 9.9-4.432 9.9-9.9 9.9zm0-1.8a8.1 8.1 0 100-16.2 8.1 8.1 0 000 16.2zm2.964-11.436L9.2 12.427l-2.064-2.063-1.272 1.272L9.2 14.973l6.036-6.037-1.272-1.272z"/></svg>
              </button> -->

              <button class="btn btn_wishlist">
                <svg width="20" height="19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.098 0c-1.303 0-2.143.155-3.106.626a5.62 5.62 0 00-1.001.63 5.67 5.67 0 00-.961-.6C8.048.17 7.165 0 5.91 0 2.544 0 .1 2.788.1 6.408c0 2.734 1.524 5.375 4.364 7.929 1.49 1.34 3.393 2.667 4.756 3.373l.78.403.78-.403c1.363-.706 3.266-2.033 4.756-3.373 2.84-2.554 4.364-5.195 4.364-7.93 0-3.58-2.468-6.392-5.802-6.407zM18.1 6.408c0 2.142-1.272 4.346-3.768 6.59-1.36 1.224-3.109 2.447-4.332 3.088-1.223-.641-2.972-1.864-4.332-3.087C3.172 10.754 1.9 8.55 1.9 6.408 1.9 3.733 3.595 1.8 5.91 1.8c.998 0 1.613.118 2.322.469.418.207.788.48 1.108.821l.662.707.656-.712a3.776 3.776 0 011.126-.842c.687-.336 1.264-.443 2.31-.443 2.285.01 4.006 1.97 4.006 4.608z"/></svg>
              </button>

            </div>
          </div>      
      `;
      document.querySelector('.product-list').appendChild(card);
    });
  }

  function createSelectMaterial(response) {
    response.forEach(({ id, name }) => {

      const option = document.createElement("option");
      const nameOption = document.createTextNode(name);

      option.value = id;
      option.appendChild(nameOption);
      document.querySelector('select#material').appendChild(option);

    });
  }

  const selectElemPrice = document.querySelector('#price'),
        selectElemMaterial = document.querySelector('#material');

  selectElemPrice.addEventListener('change', (e) => {
    let target = e.target.value;
    if (target == 'sort-asc') {
      mySortAsc();
    } else if (target == 'sort-desc') {
      mySortDesc();
    }
  });

  selectElemMaterial.addEventListener('change', (e) => {
    let target = e.target.value;

    switch(target) {
      case '1':
        showMaterial(1);
        break;
      case '2':
        showMaterial(2);
        break;
      default:
        break;
    }
  
  });

  function mySortAsc() {
    let nav = document.querySelector('.product-list');
    for (let i = 0; i < nav.children.length; i++) {
      for (let j = i; j < nav.children.length; j++) {
        if (+nav.children[i].getAttribute('data-sort') > +nav.children[j].getAttribute('data-sort')) {
          replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
          insertAfter(replacedNode, nav.children[i]);
        }
      }
    }
  }

  function mySortDesc() {
    let nav = document.querySelector('.product-list');
    for (let i = 0; i < nav.children.length; i++) {
      for (let j = i; j < nav.children.length; j++) {
        if (+nav.children[i].getAttribute('data-sort') < +nav.children[j].getAttribute('data-sort')) {
          replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
          insertAfter(replacedNode, nav.children[i]);
        }
      }
    }
  }

  function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  }

  function showMaterial(dataMeterial) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(item => {
      item.remove();
    })

    getResource('items.json')
      .then(res => createCards(res.filter(item => item.material == dataMeterial)))
      .catch(error => console.log(error));
  }

});