function newSkill(event) {
    event.preventDefault()

    let name = document.getElementById("skillName");

    const data = {
        nomeSkill: name.value,
    }

    fetch('https://desafiobrq.azurewebsites.net/Skill', {

            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then(function(res) {
            console.log(res)
            res.json()
            alert("Skill cadastarda com sucesso!")
            window.location.reload()
        })
        .catch(function(res) {
            console.log(res)
        });

}