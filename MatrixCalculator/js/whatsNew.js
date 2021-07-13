const fakeURL = 'http://localhost:3000/whatsnew'
fetch(fakeURL)
    .then(response => response.json())
    .then(dataRes => {
        const htmlLogs = dataRes.map(whatsnew => `<p><strong>${whatsnew.date}:</strong><br>- ${whatsnew.log}</p>`)
        document.getElementById('card-text-content').innerHTML = htmlLogs
    })
    .catch(reason => console.log(`${reason}\nMake sure you already install nodejs and running json server.\nTo start json sever, type in your terminal:\n$ json-server ./server/whatsnew.json`))


function postLog(_date, _log) {
    const data = {
        date: _date,
        log: _log
    }
    fetch(fakeURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(dataRes => console.log('Success:', dataRes))
        .catch(reason => console.error('Error:', reason))
} 