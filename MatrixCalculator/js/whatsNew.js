const fakeURL = 'http://localhost:3000/whatsnew'
fetch(fakeURL)
    .then(response => response.json())
    .then(dataRes => { 
        const whatNews = Object.values(dataRes)
        let htmlLogs = ''
        for (const whatsNew of whatNews) {
            htmlLogs+= `<br><strong>${whatsNew.date}:</strong>`
            if (whatsNew.logs.length === 1){
                htmlLogs+= `<br>- ${Object.entries(whatsNew.logs)[0][1].log}`
            } else{
                for (const log of whatsNew.logs) {
                    htmlLogs+= `<br>- ${Object.values(log)}`
                }
            }
        }
        document.getElementById('card-text-content').innerHTML = htmlLogs
    })
    .catch(reason => console.log(`${reason}\n\nMake sure you already install nodejs and running json server.\nTo start json sever, type in your terminal:\n$ json-server ./server/whatsnew.json`))


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