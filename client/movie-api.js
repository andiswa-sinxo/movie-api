import axios from "axios";

export default function userDetails() {
    return {
        firstname: null,
        lastname: null,
        username: null,
        password: null,
        film: null,
        user_id: null,
        movie_id: null,

        open_movies: false,

        movies: [],
        signIn: {
            username: null,
            password: null,
        },

        signUp: {
            firstname: null,
            lastname: null,
            username: null,
            password: null,
        },
        
        login() {

            const { username, password } = this.signIn

            axios.post('http://localhost:4000/api/login', {
                username, password
            })
                .then((users) => {
                    console.log(users)
                    if (users.data.status = 'success') {

                        this.user = users.data.user;
                        this.open_movies = true;
                    }
                }).catch(e => console.log(e))
        },
        register() {
            const { firstname, lastname, username, password } = this.signUp
            axios.post('http://localhost:4000/api/signUp', {
                firstname, lastname, username, password
            })
                .then((users) => {
                    console.log(users.data)
                    if (users.data.status = 'success') {
                        this.user = users.data.user;
                    }
                })
        },
                getMovies(){

                    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4aa05a41975aff41d147499d5ecba8e7&query=${this.film}`)
                    .then((result) => {
                        console.log(result.data.results)
                        this.movies = result.data.results
                    })

                }

                // userPlaylists(){
                //     axios.post('http://localhost:4000/api/playlist',{
                //         user_id, movie_id
                //     })

                //     .then((movies) => {
                //         if (movies.data.status = 'success') {

                //         }
                //     })
                // }

    }
}