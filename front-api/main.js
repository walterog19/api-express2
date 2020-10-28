const loadTweets=()=>{
    alert('entro');

    const url='https://twitter-walrog.herokuapp.com/api/tweets';
    fetch(url)
    .then(response =>response.json())
    .then(json=>{

        

            const tweets  = json.items[0].tweets;
            let texto =[];
            tweets.map(t=>texto.push(t.user.name+"<br/>"+t.text+"<br>"+t.createdAt));
            document.getElementById('tweets').innerHTML = texto;

        

    })
    .catch(error=> alert('No se pudo cargar los datos error:'+error));
    
}