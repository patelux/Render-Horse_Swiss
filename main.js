async function parcing() {
    try {
        const response = await fetch('bgAgents.json');
        const agents = await response.json();
        const licenseIDs = agents.map(agent => agent.LicenseID);

        await Promise.all(licenseIDs.map(id => scrapePage(id)));

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function extractContacts(text) {
    const phoneRegex = /(?:\+\d{1,2}\s?)?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

    const phoneNumbers = text.match(phoneRegex) || [];
    const emails = text.match(emailRegex) || [];

    return {
        phoneNumbers: phoneNumbers,
        emails: emails
    };
}

async function scrapePage() {
    const url = 'https://ntr.tourism.government.bg/Registration.nsf/endetail.xsp?id=C3D2D332726D9D0700257219003BCAD4';
    try {
        const response = await fetch(url);
        const html = await response.text();
        const contacts = extractContacts(html);
        console.log("Телефонные номера:");
        contacts.phoneNumbers.forEach(phoneNumber => console.log(phoneNumber));
        console.log("\nАдреса электронной почты:");
        contacts.emails.forEach(email => console.log(email));
    } catch (error) {
        console.error('Ошибка при загрузке страницы:', error);
    }
}

// Вызов функции парсинга
scrapePage()
