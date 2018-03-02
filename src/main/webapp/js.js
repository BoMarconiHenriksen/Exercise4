//OPG SHOW ALL USERS
document.addEventListener("load", table());

//show users
function table() { 

    fetch("http://localhost:3000/users") //returner objekt som promise
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                }
                throw new Error("Noget gik galt med fetch metoden!" + response.status.text);
            })
            .then(data => { //nu er data klar
                //Laver rækken
                const rows = data.map(user => `<tr>
                                                <td>${user.name}</td>
                                                <td>${user.age}</td>
                                                <td>${user.gender}</td>
                                                <td>${user.email}</td></tr>`).join("\n");
                //Her laves det som skal udskrives på htmlsiden                                
                const htmlTable = `<table class="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Email</th>
                        </tr>
                    </thead
                    <tbody>
                    ${rows}
                    </tbody>
                </table>
        `
                document.getElementById("table").innerHTML = htmlTable;
            })
            .catch(error => {
                document.getElementById("error").innerText = error.message;
            });

}

//OPG ADD A NEW USER
document.getElementById("newUser").addEventListener("click", addUser);

function addUser() {

    //Henter info fra input felterne
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var email = document.getElementById("email").value;

    //clear the input fields
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("email").value = "";

    document.getElementById("added").innerHTML = "The user is added.";

    var newUser = {
        age: age,
        name: name,
        gender: gender,
        email: email
    }

    var settings = {
        body: JSON.stringify(newUser), // must match 'Content-Type' header. Fra java object til json
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, PUT, DELETE, etc.
    }

    fetch("http://localhost:3000/users", settings)
            .then(res => res.json()) //ta json resopnse og send det videre
//            .then(data => document.getElementById("name").innerText = data.name) //data er bare et navn

}

//OPG FIND SINGLE USER
document.getElementById("findUser").addEventListener("click", findSingleUser);

function findSingleUser() {
    var id = document.getElementById("enteredId").value;

    var baseUrl = "http://localhost:3000/users/";

    var url = baseUrl + id;

    fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                }
                throw new Error("Noget gik galt med fetch metoden!" + response.status.text);
            })
            .then(data => { //nu er data klar

                var user = "id: " + data.id + "<br>"
                        + "Name: " + data.name + "<br>"
                        + "Age: " + data.age + "<br>"
                        + "Gender: " + data.gender + "<br>"
                        + "Email: " + data.email + "<br>";

                document.getElementById("theUser").innerHTML = user;
            })
            .catch(error => {
                document.getElementById("error").innerText = error.message;
            });
}

//OPG DELETE AN EXISTING USER
document.getElementById("deleteUser").addEventListener("click", deleteUser);

function deleteUser() {
    var idDelete = document.getElementById("deleteIdUser").value;

    //clear the input fields
    document.getElementById("deleteIdUser").value = "";

    var baseUrl = "http://localhost:3000/users/";

    var urlDelete = baseUrl + idDelete;

    var settings = {
        body: JSON.stringify(newUser), // must match 'Content-Type' header. Fra java object til json
        headers: {
            'content-type': 'application/json'
        },
        method: 'DELETE', // *GET, PUT, DELETE, etc.
    }

    fetch(urlDelete, settings)
            .then(response => {
                if (response.ok) {
                    return response.json(); //res.jason hvis det er json
                }
                throw new Error("Noget gik galt med fetch metoden!" + response.status.text);
            })
            .then(data => { //nu er data klar

                document.getElementById("userDeleted").innerHTML = "The user is deleted!";
            })
            .catch(error => {
                document.getElementById("error").innerText = error.message;
            });
}

//OPG EDIT AN EXISTING USER
document.getElementById("changeUSer").onclick = changeUser;

function changeUser() {
    var idChangedUser = document.getElementById("userId").value;
    var newName = document.getElementById("newName").value;
    var ageChange = document.getElementById("ageChange").value;
    var genderChange = document.getElementById("genderChange").value;
    var emailChange = document.getElementById("emailChange").value;

    var baseUrlFor = "http://localhost:3000/users/";

    var urlChange = baseUrlFor + idChangedUser;



    //Find the user to change
    fetch(urlChange)
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                }
                throw new Error("Noget gik galt med fetch metoden!" + response.status.text);
            })
            .then(data => { //nu er data klar
                console.log(data.name);
                
                //Det her virker ikke
                if (newName === undefined) {
                    newName === data.name;
                    console.log(newName);
                }

                var newUser = {
                    age: ageChange,
                    name: newName,
                    gender: genderChange,
                    email: emailChange
                }

                var settings = {
                    body: JSON.stringify(newUser), // must match 'Content-Type' header. Fra java object til json
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'PUT', // *GET, PUT, DELETE, etc.
                }

                fetch(urlChange, settings)
                        .then(res => res.json()) //ta json resopnse og send det videre
//            .then(data => document.getElementById("name").innerText = data.name) //data er bare et navn

            })
            .catch(error => {
                document.getElementById("error").innerText = error.message;
            });

}



