import axios from "axios";

export default function userDetails() {
    return {
        firstname: null,
        lastname: null,
        username: null,
        password: null,


        signIn: {
            username: null,
            password: null,
        },

        signUp: {
            username: null,
            password: null,
        },
        login() {
            
            const { username, password } = this.signIn

            axios.post('http://localhost:3000/api/login', {
                username, password
            })
                .then((users) => {
                    console.log(users)
                    if (users.data.status = 'success') {
        
                        this.user = users.data.user;
                    }
                }).catch(e => console.log(e))
        },
        register() {
            const { firstname, lastname, username, password } = this.signUp
            axios.post('http://localhost:3000/api/register', {
               firstname, lastname, username, password
            })
                .then((users) => {
                    console.log(users.data)
                    if (users.data.status = 'success') {
                        this.user = users.data.user;
                    }
                })
        }
    }
}