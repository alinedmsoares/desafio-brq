window.onload = getSkills();
window.onload = getCertifications();

function newCandidate(event) {
    event.preventDefault()

    let name = document.getElementById("name");
    let cpf = document.getElementById("cpf");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let gender = document.getElementById("gender");
    let birthdate = document.getElementById("birthdate");

    const data = {
        nome: name.value,
        cpf: parseInt(cpf.value.replace(/[^0-9]/g, '')),
        email: email.value,
        telefone: parseInt(phone.value.replace(/[^0-9]/g, '')),
        genero: gender.value,
        nascimento: formatDate(birthdate)
    }

    fetch('https://desafiobrq.azurewebsites.net/Candidato', {

            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then(res => {
            window.location.replace("/candidates/skill.html?idCandidato=" + res.idCandidato);
        })
        .catch(function(res) {
            console.log(res)
        });

}

function formatDate(date) {
    const [year, month, day] = date.value.split('-');
    const birthdate = [day, month, year].join('/');

    return birthdate;
}

function selectSkill(event) {
    event.preventDefault();

    let url_string = window.location.href
    let url = new URL(url_string);
    let candidateId = url.searchParams.get("idCandidato");

    let candidate = candidateId;
    let skills = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
        skills.push(checkboxes[i].value)
    }

    for (let i = 0; i < skills.length; i++) {
        const data = {
            candidatoId: candidate,
            skillId: parseInt(skills[i])
        }

        fetch('https://desafiobrq.azurewebsites.net/SkillCandidato/', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }).then(function(res) {
                console.log(res)
                res.json()
            })
            .then(res => {
                window.location.replace("/candidates/certifications.html?idCandidato=" + candidate);
            })
            .catch(function(res) {
                console.log(res)
            });
    }
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
                            temp += "<label class='btn btn-secondary active mr-3'>";
                            temp += "<input type='checkbox' class='mr-1' value='" + itemData.idSkill + "'/>" + itemData.nomeSkill;
                            temp += "</label>";
                        });
                        document.getElementById('skillCandidateList').innerHTML = temp;
                    }
                }
            )
        }

    )

}

function selectCertification(event) {
    event.preventDefault()

    let url_string = window.location.href
    let url = new URL(url_string);
    let candidateId = url.searchParams.get("idCandidato");

    let candidate = candidateId;
    let certification = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
        certification.push(checkboxes[i].value)
    }

    for (let i = 0; i < certification.length; i++) {
        const data = {
            candidatoId: candidate,
            idCertificacao: parseInt(certification[i])
        }

        fetch('https://desafiobrq.azurewebsites.net/CertificacaoCandidato/', {

            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then(function(res) {
            console.log(res)
            res.json()
            alert("Candidatura enviada!")
            window.location.reload()
        })

        .catch(function(res) {
            console.log(res)
        });
    }
}

function getCertifications() {

    fetch("https://desafiobrq.azurewebsites.net/Certificacao", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(
            res => {
                res.json().then(
                    data => {
                        console.log(data);
                        if (data.length > 0) {

                            var temp = "";
                            data.forEach((itemData) => {
                                temp += "<label class='btn btn-secondary active mr-3'>";
                                temp += "<input type='checkbox' class='mr-1' value='" + itemData.idCertificacao + "'/>" + itemData.nomeCertificacao;
                                temp += "</label>";
                            });
                            document.getElementById('certificationList').innerHTML = temp;
                        }
                    }
                )
            }

        )

}