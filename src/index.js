'use strict'

const Controller = require("./controller/controller.class")

let myController =  new Controller
window.addEventListener('load', () => {

  document.getElementById('Nuevoproducto').addEventListener('click', function() {
    document.getElementById('tabla').classList.add("hide")
    document.getElementById('new-prod').classList.remove("hide")})

  document.getElementById('Tabla').addEventListener('click', function() {
    document.getElementById('new-prod').classList.add("hide")
    document.getElementById('tabla').classList.remove("hide")})

  document.getElementById('new-prod').addEventListener('reset', (event) => {
    event.preventDefault()
    const id = Number( document.getElementById("newprod-id").value )
    const product = myController.store.findProduct(id);
    myController.view.renderEditForm(product)
  })

  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()
    const id = document.getElementById("newprod-id").value 
    const units = Number(document.getElementById("newprod-units").value) 
    const name = document.getElementById('newprod-name').value
    const price = Number(document.getElementById('newprod-price').value)
    if(id == ""){
      myController.addProductToStore({ name, price, units })   
    }else{ 
      myController.changeProductInStore({id, name, price, units })  
      document.getElementById('new-prod').classList.add("hide")
    }
  })

  document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault()
    const delProductId = document.getElementById('delprod-id').value
    myController.deleteProductFromStore(delProductId)
  })

  document.getElementById('stock-prod').addEventListener('submit', (event) => {
    event.preventDefault()
    const id = document.getElementById('stockprod-id').value
    const units = Number(document.getElementById('stockprod-units').value)  
    myController.changeProductStock({ id, units })   
  })

})
