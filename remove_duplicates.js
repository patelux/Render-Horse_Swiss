const fs = require('fs');

// Читаем файл data.json
fs.readFile('data2.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    // Парсим JSON данные
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseErr) {
        console.error('Ошибка при разборе JSON:', parseErr);
        return;
    }

    // Получаем массив данных
    const dataArray = jsonData.data;

    // Используем Set для устранения повторяющихся значений
    const uniqueValues = new Set(dataArray);

    // Преобразуем Set обратно в массив
    const uniqueArray = Array.from(uniqueValues);

    // Преобразуем массив в строку
    const dataToWrite = uniqueArray.join('\n');

    // Выводим уникальные значения в консоль
    console.log(dataToWrite);
});