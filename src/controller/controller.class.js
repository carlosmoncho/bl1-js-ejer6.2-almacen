const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        try{
            if(formData.name.length < 3){
                throw `Debes introducir al menos 3 caracteres`
            }
            if(Number(formData.price) <= 0 || Number.isInteger(Number(formData.price))){
                throw `Debes ser número mayor o igual que 0 y con 2 decimales`
            }
            const newProd = this.store.addProduct(formData);
            this.view.renderNewProduct(newProd);
            const tr =document.getElementById('producto'+newProd.id);
            let id =newProd.id
            let down = -1
            let up = 1
            tr.querySelector(".up").addEventListener('click', () => {
                this.changeProductStock({ id:id,units:up })
            })  
            tr.querySelector(".down").addEventListener('click', () => {
                this.changeProductStock({id:id,units:down})
            })          
            tr.querySelector(".delete").addEventListener('click', () => {
                this.deleteProductFromStore(newProd.id)
            })  
            tr.querySelector(".edit").addEventListener('click', () => {
                document.getElementById('new-prod').classList.remove("hide")
                this.view.renderEditForm(newProd)
            })     
        }catch(Error){
            this.view.renderErrorMessage(Error)
        }		         
    }

    deleteProductFromStore(prodId) {
        try{ 
            if (Number.isInteger(Number(prodId)) && Number(prodId) > 0){
                const product =  this.store.findProduct(Number(prodId))
                if(!product){
                    throw `No existe el producto con id ${prodId}`
                }
                let respuesta = prompt(`Quieres borrar el producto con id ${prodId} ? [S/N]`) 
                if(respuesta == 's' || respuesta == 'S'){
                    if(product.units <= 0){
                        this.store.delProduct(prodId)
                        this.view.renderDelProduct(prodId)
                    }else{
                        respuesta = prompt(`El producto con id ${prodId} tiene ${product.units} units quieres borarlo igualmente ? [S/N]`) 
                        if(respuesta == 's' || respuesta == 'S'){
                            let units =  -product.units
                            this.store.changeProductUnits({ id:product.id, units:units })
                            this.store.delProduct(product.id)
                            this.view.renderDelProduct(product.id)
                            let total = this.store.totalImport()
                            this.view.renderStoreImport(total)
                        }
                    }  
                }
            }
        }catch(Error){
            this.view.renderErrorMessage(Error)
        }
    }

    changeProductInStore(formData) {

        try{
            let product = this.store.changeProduct(formData)
            this.view.renderEditProduct(product)    
            let importeTotal = this.store.totalImport()
            this.view.renderStoreImport(importeTotal)
        }catch(Error){
            this.view.renderErrorMessage(Error) 
        }
    }

    changeProductStock(formData) {
        try{
            if(!Number.isInteger(Number(formData.id))|| Number(formData.id) <=0){
                throw `El id debe ser entero y positivo `
            }
            let product = this.store.changeProductUnits(formData)
            this.view.renderEditProduct(product)    
            let importeTotal = this.store.totalImport()
            this.view.renderStoreImport(importeTotal)
        }catch(Error){
            this.view.renderErrorMessage(Error) 
        }
       
    }
}

module.exports = Controller
