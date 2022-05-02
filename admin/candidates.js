window.onload = getCandidates();

function getCandidates() {

    fetch("https://desafiobrq.azurewebsites.net/Candidato", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(
        res => {
            res.json().then(
                data => {
                    // console.log(data);
                    if (data.length > 0) {

                        let temp = "";

                        data.forEach((itemData) => {

                            let skillsList = fetch("https://desafiobrq.azurewebsites.net/SkillCandidato/candidato/" + itemData.idCandidato, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                }).then(function(res) {
                                    return res.json()
                                })
                                .catch(function(res) {
                                    console.log(res)
                                });

                            let certificationList = fetch("https://desafiobrq.azurewebsites.net/CertificacaoCandidato/candidato/" + itemData.idCandidato, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                }).then(function(res) {
                                    return res.json()
                                })
                                .catch(function(res) {
                                    console.log(res)
                                });

                            const getData = () => {

                                skillsList.then((skills) => {
                                    // console.log(itemData.nome, a)
                                    certificationList.then((certifications) => {
                                        temp += "<tr>";
                                        temp += "<th scope='row'>" + itemData.nome + "</th>";
                                        temp += "<td>" + itemData.cpf + "</td>";
                                        temp += "<td>" + itemData.email + "</td>";
                                        temp += "<td>" + itemData.telefone + "</td>";
                                        if (skills.length != 0) {
                                            temp += "<td class='mr-3 p-8'>"
                                            for (let i = 0; i < skills.length; i++) {
                                                temp += "<li>" + skills[i].skill.nomeSkill + "</li>";
                                            }
                                            temp += "</td>"
                                        } else {
                                            temp += "<td>" + '-' + "</td>";
                                        }
                                        if (certifications.length != 0) {
                                            temp += "<td class='p-8'>"
                                            for (let i = 0; i < certifications.length; i++) {
                                                temp += "<li>" + certifications[i].certificacao.nomeCertificacao + "</li>";
                                            }
                                            temp += "<td>"
                                        } else {
                                            temp += "<td>" + '-' + "</td>";
                                        }
                                        // temp += "<td>" + itemData.nascimento + "</td>";
                                        // temp += "<td>" + itemData.genero + "</td></tr>";
                                        document.getElementById('data').innerHTML = temp;
                                    })
                                })
                            };

                            getData();
                        });
                    }
                }
            )
        }

    )

}

function search() {
    $('input#txt_consulta').quicksearch('table#tabela tbody tr');
}