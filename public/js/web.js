const place = document.querySelector('input')
const submit = document.getElementById('submit')
const one = document.getElementById('error')
const two = document.getElementById('out')

submit.addEventListener('click', (e) =>{
    e.preventDefault()

    one.textContent = 'Loading...'
    two.textContent = ''

    fetch('/weather?address='+place.value).then( (res) =>{
        res.json().then( (obj) => {
            console.log(obj)
            if(obj.error){
                one.textContent=obj.error
            } else{
                one.textContent=obj.location
                two.textContent=obj.forecast
            }
        })
    })

})