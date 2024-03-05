const containerShops = document.getElementById("container-shops");
const downloadArrow = document.getElementById("download-arrow");
const api = "https://veryfast.io/t/front_test_api.php";

const xhr = new XMLHttpRequest();

const createBoxes = (array) =>
  (containerShops.innerHTML = array.map(
    ({
      product_key,
      is_best,
      is_disabled,
      name_display,
      name_prod,
      license_name,
      amount,
      amount_html,
      link,
    }) => {
      // amount_html - if nead i can gat price from this key 'amount_html'
      return ` <div class="elem cente-col ${
        is_disabled ? "disabled" : ""
      }" id="${product_key}" >
    <div class="price-content ${amount_html ? "cente-col" : `center-row`}">
      <div class="price-content-c flex-end ${
        amount_html ? "price-content-dop-text" : ""
      }">
        <p class="price">$ ${amount}</p>
        <span class="price-type">${amount_html ? "/mo" : "/per year"}</span>
      </div>
      ${is_best ? `<div class="advertist-best"> Best value</div>` : ""}

      ${amount_html ? `<div class="price-old">$9.99</div>` : ""}
    

      ${
        amount_html
          ? ` <img src="./imgs/50OFF.png" alt="50%" class="advertist-discount">`
          : ""
      }
     
    </div>

    <p class="elem-title">${name_prod}</p>
    <h2 class="elem-desc">${license_name}</h2>
    <a class="btn-download center-row"
    onclick="selectAgent()" title="${name_display}" download="${link}" href="${link}">
      <span class="btn-download-text">DOWNLOAD</span>
      <svg
        width="30.000000"
        height="30.000000"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs />
        <path
          id="Vector"
          d="M15 0C6.72517 0 0 6.71012 0 15C0 23.2899 6.71013 30 15 30C23.2899 30 30 23.2899 30 15C30 6.71012 23.2748 0 15 0ZM12.2768 14.6239L13.2547 14.6239C13.4654 14.6239 13.6459 14.4584 13.6459 14.2327L13.6459 8.33501C13.6459 8.12437 13.8114 7.94382 14.0371 7.94382L15.9629 7.94382C16.1735 7.94382 16.3541 8.10933 16.3541 8.33501L16.3541 14.2327C16.3541 14.4433 16.5195 14.6239 16.7452 14.6239L17.7231 14.6239C18.0391 14.6239 18.2196 15 18.024 15.2558L15.3009 18.671C15.1505 18.8666 14.8495 18.8666 14.6991 18.671L11.991 15.2558C11.7803 15 11.9609 14.6239 12.2768 14.6239ZM23.5155 20.2507L23.5155 21.6499C23.5155 21.8606 23.3501 22.0411 23.1244 22.0411L8.39516 22.0411L6.86057 22.0411C6.64993 22.0411 6.46941 21.8756 6.46941 21.6499L6.46941 20.2507L6.46941 16.4443C6.46941 16.2337 6.63489 16.0531 6.86057 16.0531L8.00401 16.0531C8.21465 16.0531 8.39516 16.2186 8.39516 16.4443L8.39516 19.8596C8.39516 20.0702 8.56067 20.2507 8.78635 20.2507L21.1534 20.2507C21.3641 20.2507 21.5446 20.0853 21.5446 19.8596L21.5446 16.4443C21.5446 16.2337 21.7101 16.0531 21.9358 16.0531L23.1394 16.0531C23.35 16.0531 23.5306 16.2186 23.5306 16.4443L23.5306 20.2507L23.5155 20.2507Z"
          fill="#FFFFFF"
          fill-opacity="1.000000"
          fill-rule="nonzero"
        />
      </svg>
    </a>
  </div>`;
    }
  ));

const getData = (url = api) => {
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
    //   console.log("Отримані дані:", data.result);
      createBoxes(data.result.elements);
    } else {
      console.error("Помилка отримання даних:", xhr.statusText);
    }
  };
  xhr.send();
};
const sworArraow = (className) => {
  downloadArrow.classList.add(className);
  setTimeout(() => {
    downloadArrow.classList.remove(className);
  }, 1500);
};
const selectAgent = () => {
  if (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor)
  ) {
    sworArraow("download-arrow-bottom");
    // on the design in chrome, the loading arrow is drawn from below, but in fact from above in the right corner (made as in the design)
  } else if (/Firefox/.test(navigator.userAgent)) {
    sworArraow("download-arrow-top");
  } else if (
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor)
  ) {
    sworArraow("download-arrow-top");
  } else if (/MSIE|Trident/.test(navigator.userAgent)) {
    sworArraow("download-arrow-bottom");
  } else if (/Edge/.test(navigator.userAgent)) {
    sworArraow("download-arrow-top");
  } else {
    sworArraow("download-arrow-top");
  }
};

(function () {
  getData();
})();
