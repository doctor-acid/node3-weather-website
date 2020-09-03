const geocode = require('../utils/geocode')
const path =require('path')
const express = require('express')
const hbs = require('hbs')

//Define Paths
const app = express()
const public_path = path.join(__dirname, '../public')
const view_path = path.join(__dirname, '../src/templates/views')
const partials_path = path.join(__dirname, '../src/templates/partials')
const port = process.env.PORT || 3000

//Set view and Engine
app.set('view engine', 'hbs')
app.set("views", view_path)
app.use(express.static(public_path))
hbs.registerPartials(partials_path)

//get individual pages
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Avnish'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About',
        name:'Avnish'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name:'Avnish',
    })
})

//weather api-- returns json data
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Please enter the address!'})
    }

    geocode.location(req.query.address, (error, {location, latitude, longitude} = {}) =>{
        if (error){
            res.send({
                error
            })
        } else{
            geocode.forecast(latitude, longitude, (error, forecastData ) => {
                if(error){
                    res.send({
                        error: error
                    })
                } else{
                    res.send({
                        location,
                        forecast :forecastData,
                        address : req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Avnish',
        err: 'Help Article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Avnish',
        err: 'Page'
    })
})

app.listen(port, () => {
    console.log('sever is up on port '+port)
})