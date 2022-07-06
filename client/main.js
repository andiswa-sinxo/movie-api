import './style.css'
import Alpine from 'alpinejs'
import userDetails from './movie-api'
import './movie-api'
window.Alpine = Alpine

Alpine.data('loginForm', userDetails)
Alpine.data('movies',userDetails)
// document.querySelector('#app').innerHTML = ``

// document.querySelector('#paragraph').innerHTML = ` 
// <p>Please login if you have an account or sign up if you do not have an account</p>`

Alpine.start();