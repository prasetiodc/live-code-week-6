
      new Vue({
          el:'#app',
          data:{
              statusShow:'0', 
              email:'',
              password:'',
              joke: '',
              favJoke: []
          },
            created(){
                axios.get('http://localhost:3000/joke')
                .then(response=>{
                    // localStorage.setItem('token', )
                    console.log(response);
                    console.log(response.data);
                    this.joke = response.data;
                })
                axios.get('http://localhost:3000/favJoke',{headers:{'token':localStorage.getItem('token')}})
                .then(response=>{
                    console.log(response);
                    
                    this.favJoke = response;
                })
          },
          methods:{
            newJoke(){
                axios.get('http://localhost:3000/joke')
                .then(response=>{
                    // localStorage.setItem('token', )
                    console.log(response);
                    console.log(response.data);
                    this.joke = response.data;
                })
            },
              login(){
                  axios.post('http://localhost:3000/login', {email:this.email, password: this.password})
                  .then(response=>{
                      // localStorage.setItem('token', )
                      console.log(response);
                      
                  })
              },
              fav(){
                axios.post('http://localhost:3000/favorites', {joke:this.joke},
                {headers:{'token':localStorage.getItem('token')}})
                .then(response=>{
                    // localStorage.setItem('token', )
                    axios.get('http://localhost:3000/joke')
                .then(response=>{
                    // localStorage.setItem('token', )
                    console.log(response);
                    console.log(response.data);
                    this.joke = response.data;
                })
                    
                })
            }
          }
      })