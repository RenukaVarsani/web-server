const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


pathDir = path.join(__dirname,'../public');
app.use(express.static(pathDir))

viewsPath = path.join(__dirname,'../templates/views');
partialPath = path.join(__dirname,'../templates/partial');
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)


app.get('',(req,res)=>{
    res.render('index',
    {
        title:'Weather ',
        name: 'riaa'
    })

});


app.get('/about',(req,res)=>{
    res.render('about',
    
    {
        title:'About ',
        name: 'riaa'
    })

});



app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"must provide address"
        })
    }

   
  geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
   // console.log('address : ',address);
    if(err){
        return res.send({err})
    }
console.log('lat : ',latitude,longitude,location);
    forecast(latitude,longitude,(err,forecastData)=>{
        if(err){
            return res.send({err})
            
        }

        res.send({
             forecast:forecastData,
             location,
             address:req.query.address
        })
    })
  })


  

});

app.get('/help',(req,res)=>{
    res.render('help',
    
    {
        title:'Help',
        name: 'riaa'
    })

});






app.get("/help/*",(req,res)=>{
    res.render('404',{
     title: 404,
     name: "riaa",
     errorMsg:"404 page for help"
    })
 
 });

app.get("*",(req,res)=>{
   res.render('404',{
    title: 404,
    name: "riaa",
    errorMsg:"404 page"
   })

});



app.listen(3000,()=>{
    console.log("listening to the port 3000");
})

