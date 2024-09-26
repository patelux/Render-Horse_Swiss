"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var toTopButton = document.querySelector('.to-top');

  function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (toTopButton) {
    toTopButton.addEventListener('click', scrollToTop);
  }

  function toggleToTopButton() {
    if (window.scrollY > 100) {
      toTopButton.classList.add('active');
    } else {
      toTopButton.classList.remove('active');
    }
  }

  window.addEventListener('scroll', toggleToTopButton);
  toggleToTopButton();
});
var allProducts = []; // Сопоставление кантонов с международным телефонным кодом

var countryCodes = {
  "BE": "+41",
  // Bern
  "GE": "+41",
  // Geneva
  "AG": "+41",
  // Aargau
  "SH": "+41",
  // Schaffhausen
  "ZH": "+41",
  // Zurich
  "LU": "+41",
  // Lucerne
  "BS": "+41",
  // Basel-Stadt
  "VD": "+41",
  // Vaud
  "": "N/A",
  // Пустые значения
  "FR": "+41",
  // Fribourg
  "NE": "+41",
  // Neuchâtel
  "GR": "+41",
  // Graubünden
  "SG": "+41",
  // St. Gallen
  "SO": "+41",
  // Solothurn
  "TG": "+41",
  // Thurgau
  "GL": "+41",
  // Glarus
  "AR": "+41",
  // Appenzell Ausserrhoden
  "ZG": "+41",
  // Zug
  "BL": "+41",
  // Basel-Landschaft
  "SZ": "+41",
  // Schwyz
  "VS": "+41",
  // Valais
  "null": "N/A",
  // Значения null
  "OW": "+41",
  // Obwalden
  "JU": "+41",
  // Jura
  "TI": "+41",
  // Ticino
  "NW": "+41",
  // Nidwalden
  "FL": "+423",
  // Liechtenstein
  "UR": "+41",
  // Uri
  "AI": "+41" // Appenzell Innerrhoden

};

function generateContactList(namejson) {
  var name = "".concat(namejson, ".json");
  fetch(name).then(function (response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }).then(function (data) {
    allProducts = data; // перезаписываем данные в массиве allProducts
    // console.log(allProducts);

    var uniqueKantonsFilter = allProducts.map(function (product) {
      return product.person_kanton;
    }).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }); // console.log(uniqueKantonsFilter); // выводим уникальные значения в консоль

    generateContactListMarkup(); // вызываем функцию для генерации разметки после получения данных
  })["catch"](function (error) {
    return console.error('Ошибка при загрузке данных:', error);
  });
}

function generateContactListMarkup() {
  var html = '';
  var seenIds = new Set(); // Используем Set для хранения уникальных ID

  for (var i = 0; i < allProducts.length; i++) {
    var rowNumber = i + 1; // Номер строки по порядку

    var personId = allProducts[i].person_id; // Получаем ID текущего человека
    // Проверяем, был ли уже добавлен этот ID

    if (seenIds.has(personId)) {
      // console.warn(`Дубликат ID: ${personId}, пропускаем.`);
      continue; // Пропускаем этот элемент, если ID уже существует
    }

    seenIds.add(personId); // Добавляем ID в Set, чтобы избежать дубликатов
    // Получаем международный код по кантону

    var internationalCode = countryCodes[allProducts[i].person_kanton] || 'N/A'; // По умолчанию 'N/A'
    // Убираем пробелы из телефонных номеров

    var telefonMobil = allProducts[i].person_telefon_mobil ? allProducts[i].person_telefon_mobil.replace(/\s+/g, '') : '';
    var telefonPrivat = allProducts[i].person_telefon_privat ? allProducts[i].person_telefon_privat.replace(/\s+/g, '') : '';
    var telefonArbeit = allProducts[i].person_telefon_arbeit ? allProducts[i].person_telefon_arbeit.replace(/\s+/g, '') : '';
    html += "\n        <tr>\n           <td>".concat(rowNumber, "</td>\n            <td>").concat(allProducts[i].person_vorname, " ").concat(allProducts[i].person_nachname, "</td>\n            <td>").concat(internationalCode !== null ? internationalCode : '', "</td>\n            <td>").concat(telefonMobil, "</td>\n            <td>").concat(telefonPrivat, "</td>\n            <td>").concat(telefonArbeit, "</td>\n            <td>").concat(allProducts[i].person_email !== null ? allProducts[i].person_email : '', "</td>\n        </tr>\n      ");
  }

  document.getElementById('data-table').innerHTML = html;
}

document.getElementById('button1').addEventListener('click', function () {
  return generateContactList('horse1');
});
document.getElementById('button2').addEventListener('click', function () {
  return generateContactList('horse2');
});