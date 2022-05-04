const app = Vue.createApp({
    data(){
        return{
                showBooks: true,
                title: 'Hello There',
                age: 45
        }
    },
    methods: {
        toggleShowBooks() {
            this.showBooks = false
        }
    }
})
app.mount('#app');