window.onload = getSkills();

function newCertification(event) {
    event.preventDefault()

    let name = document.getElementById("certificationName");
    let institution = document.getElementById("institution");
    var skill = document.querySelector('input[name="skill"]:checked').value;

    const data = {
        nomeCertificacao: name.value,
        instituicao: institution.value,
        skillId: skill
    }

    fetch('https://desafiobrq.azurewebsites.net/Certificacao', {

        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }).then(function(res) {
        console.log(res)
        res.json()
        alert("Certificação cadastrada com sucesso!")
        window.location.reload()
    })

    .catch(function(res) {
        console.log(res)
    });

}

function getSkills() {

    fetch("https://desafiobrq.azurewebsites.net/Skill", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(
        res => {
            res.json().then(
                data => {
                    console.log(data);
                    if (data.length > 0) {

                        var temp = "";
                        data.forEach((itemData) => {
                            temp += "<div class='form-check form-check-inline'>";
                            temp += "<input class='form-check-input' type='radio' name='skill' id=" + itemData.nomeSkill + " value=" + itemData.idSkill + " />";
                            temp += "<label class='form-check-label' for=" + itemData.nomeSkill + ">" + itemData.nomeSkill + "</label>";
                            temp += "</div>";

                        });
                        document.getElementById('skillList').innerHTML = temp;
                    }
                }
            )
        }

    )

}