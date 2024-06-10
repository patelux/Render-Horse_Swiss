"use strict";

document.getElementById('button1').addEventListener('click', function _callee() {
  var response, agents, licenseIDs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('bgAgents.json'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          agents = _context.sent;
          // Step 2: Extract LicenseID values
          licenseIDs = agents.map(function (agent) {
            return agent.LicenseID;
          }); // Step 3: Fetch data for each LicenseID sequentially to append data step by step

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 11;

          for (_iterator = licenseIDs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            id = _step.value;
            scrapePage(id);
          }

          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 19:
          _context.prev = 19;
          _context.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context.prev = 22;

          if (!_didIteratorError) {
            _context.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context.finish(22);

        case 26:
          return _context.finish(19);

        case 27:
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t1 = _context["catch"](0);
          console.error('Error:', _context.t1);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 29], [11, 15, 19, 27], [20,, 22, 26]]);
}); // Функция для извлечения телефонных номеров и адресов электронной почты из текста

function extractContacts(text) {
  // Регулярные выражения для поиска телефонных номеров и адресов электронной почты
  var phoneRegex = /(\+\d{1,2}\s?)?(\d{3}\s?\d{3}\s?\d{2}\s?\d{2})/g;
  var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  var phoneNumbers = text.match(phoneRegex) || [];
  var emails = text.match(emailRegex) || [];
  return {
    phoneNumbers: phoneNumbers,
    emails: emails
  };
} // Функция для загрузки содержимого веб-страницы и извлечения контактной информации


function scrapePage(id) {
  var url = "https://ntr.tourism.government.bg/Registration.nsf/endetail.xsp?id=".concat(id);
  fetch(url).then(function (response) {
    return response.text();
  }).then(function (html) {
    var contacts = extractContacts(html);
    console.log("Телефонные номера:");
    contacts.phoneNumbers.forEach(function (phoneNumber) {
      console.log(phoneNumber);
    });
    console.log("\nАдреса электронной почты:");
    contacts.emails.forEach(function (email) {
      console.log(email);
    });
  })["catch"](function (error) {
    return console.error('Ошибка при загрузке страницы:', error);
  });
} // Пример использования функции для сканирования страницы
// var url = "https://guidor.nl/looking-for-a-guide/guides-and-languages";
// scrapePage(id);