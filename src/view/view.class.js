const Controller = require("../controller/controller.class");

const divMessagesUI = document.getElementById('messages');
const tbody =  document.getElementById('almacen').getElementsByTagName('tbody')[0]

class View{
    renderNewProduct(product) {
        const tr = document.createElement('tr')
        tr.id = 'producto'+product.id
        tr.innerHTML = `<td class="id">${product.id}</td>
                        <td class="name">${product.name}</td>
                        <td class="units">${product.units}</td>
                        <td class="price">${product.price}</td>
                        <td class="import">${product.productImport().toFixed(2)}€</td>
                        <td><button class="up btn btn-secondary">
                        <span class="material-icons">arrow_drop_up</span>
                        </button>
                        <button class="down btn btn-secondary">
                        <span class="material-icons">arrow_drop_down</span>
                        </button>
                        <button class="delete btn btn-secondary">
                        <span class="material-icons">delete</span>
                        </button>
                        <button class="edit btn btn-secondary">
                        <span class="material-icons">edit</span>
                        </button></td>`    
        tbody.appendChild(tr)  
        if(product.units == 0){
            document.getElementById('producto'+product.id).querySelector(".down").setAttribute('disabled','disabled')
        }
    }

    renderEditForm(product){
        document.getElementById("newprod-id").value = product.id
        document.getElementById("newprod-name").value = product.name
        document.getElementById("newprod-units").value = product.units
        document.getElementById("newprod-price").value = product.price
    }

    renderEditProduct(product) {
        let tr = document.getElementById('producto'+product.id)
        tr.getElementsByClassName("name")[0].textContent = `${product.name}`
        tr.getElementsByClassName("units")[0].textContent = `${product.units}`
        tr.getElementsByClassName("import")[0].textContent = `${product.productImport().toFixed(2)}`
        tr.getElementsByClassName("price")[0].textContent = `${product.price}`
        if(product.units == 0){
            document.getElementById('producto'+product.id).querySelector(".down").setAttribute('disabled','disabled')
        }else{
            document.getElementById('producto'+product.id).querySelector(".down").removeAttribute('disabled')
        }
    }

    renderDelProduct(id) {
        let totalTbody = tbody.childElementCount
        let elementoEliminar = '';
        for (let i = 0; i < totalTbody; i++) {
            let tr = tbody.children[i]
            if(tr.firstElementChild.textContent == id){   
            elementoEliminar = tr
            }
        }
        tbody.removeChild(elementoEliminar)
    }

    renderStoreImport(total) {
        document.getElementById('total').textContent = total.toFixed(2) + ' €'
    }

    renderErrorMessage(message) {
        let newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
