console.log(" clientside hello");

const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
     const location = search.value;

     msgOne.textContent = 'Loading...' 
     msgTwo.textContent = '' 
     
     



     fetch('http://localhost:3000/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
       if(data.err){
        msgOne.textContent = data.err
       }
       else{ 
        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast

       
    }
    })
})
})