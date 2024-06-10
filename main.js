document.getElementById('button1').addEventListener('click', async () => {
    try {
        // Step 1: Fetch and parse bgAgents.json
        const response = await fetch('bgAgents.json');
        const agents = await response.json();

        // Step 2: Extract LicenseID values
        const licenseIDs = agents.map(agent => agent.LicenseID);

        // Initialize an array to hold fetched data
        const fetchedData = [];

        // Step 3: Fetch data for each LicenseID sequentially to append data step by step
        for (let id of licenseIDs) {
            try {
                const fetchResponse = await fetch(`https://ntr.tourism.government.bg/Registration.nsf/endetail.xsp?id=${id}`);
                const data = await fetchResponse.text();

                // Append the fetched data to the array
                fetchedData.push({ LicenseID: id, Data: data });

                // Save the updated array to a file
                const fileContent = JSON.stringify(fetchedData, null, 2);
                saveToFile(fileContent, 'fetchedData.txt');
            } catch (fetchError) {
                console.error(`Error fetching data for LicenseID ${id}:`, fetchError);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to save data to a file
function saveToFile(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


