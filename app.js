fetch('https://api.rach.io/1/public/person/info', {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134'
    }
})
    .then(response => response.json())
    .then(getByID)

function getByID(idObject) {
    const id = Object.values(idObject)
    fetch(`https://api.rach.io/1/public/person/${id}`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 76980330-8f0b-4659-a341-527364acf134'
    }
})
    .then(response => response.json())
    .then(response => console.log(response))
}