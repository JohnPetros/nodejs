const url = "http://localhost:5500/api"

function getUsers() {
    axios.get(url)
        .then(response => {
            apiResult.textContent = JSON.stringify(response.data)
        })
        .catch(error => console.error(error))
}

function addNewUser() {
    axios.post(url, newUser)
        .then(response => {
            console.log("SAVED USER")
        })
        .catch(error => console.error(error))
}

function getUser(id) {
    axios.get(`${url}/${id}`)
        .then(response => {
            const data = response.data
            userName.textContent = data.name
            userCity.textContent = data.city
            UserID.textContent = data.id
            userAvatar.src =  data.avatar
        })
        .catch(error => console.error(error))
}

function updateUser(id, userUpdated){
    axios.put(`${url}/${id}`, userUpdated)
        .then(response => console.log(response))
        .catch(error => console.error(error))
}

const userUpdated = {
    name: "Marcelo Calvis",
    avatar: "http://picsum.photos/200/300",
    city: "Recife"
}

function deleteUser(id){
    axios.delete(`${url}/${id}`)
        .then(response => console.log(response))
        .catch(error => console.error(error))
}

deleteUser(1)



getUsers()
getUser(1)

const newUser = {
    name: "Olívia Zars",
    avatar: "http://picsum.photos/200/300",
    city: "Rio de Janeiro"
}

// addNewUser(newUser)
// updateUser(1, userUpdated)
