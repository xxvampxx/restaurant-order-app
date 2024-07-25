import menuArray from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

// let orderSection = document.getElementById('order-items-receipt')
const toggleReceipt = document.getElementById('toggle-receipt')
const myModal = document.getElementById('my-modal')
const userName = document.getElementById('user-name')
const cardNumber = document.getElementById('card-number')
const cvvNumber = document.getElementById('cvv-number')


let addToCartArr = []

function getItemsHtml(itemArray) {

    return itemArray = menuArray.map((item) => {

        const { name,
            ingredients,
            id,
            price,
            emoji }
            = item

        return `
        <div id="card-container">
        <div class="item-info">
        <h2 id="item-emoji">${emoji}</h2>
        <div class="item-text">
        <h2 id="item-title">${name}</h2>
        <p id="item-description">${ingredients}</p>
        <p id="item-price">$${price}</p>
        </div>
        </div>
        <button class="add-to-cart-btn" data-id ="${id}">+</button>
        </div>
        `
    }).join('')
}

document.getElementById('item-container').innerHTML = getItemsHtml(menuArray)

document.addEventListener('click', (e) => {
    handleClicks(e)
    getTotalPrice()
})

function handleClicks(e) {
    if (e.target.dataset.id && e.target.className === 'add-to-cart-btn') {
        addOrderItem(e.target.dataset.id)
        toggleReceipt.style.display = 'block'
        document.getElementById('complete-order-btn').style.display = 'block'
        document.getElementById('your-order-title').style.display = 'block'

    }
    else if (e.target.dataset.uuid && e.target.className === 'remove-button') {
        removeOrderItem(e.target.dataset.uuid)
        if (addToCartArr < 1) {
            toggleReceipt.style.display = 'none'
        }
    }
    if (e.target.id === 'complete-order-btn') {
        myModal.style.display = 'block'
    }
    if (e.target.className === 'close-modal') {
        myModal.style.display = 'none'
    }

}

function addOrderItem(clickedId) {
    const addedItem = menuArray.filter(item => item.id == clickedId)
    const uuid = uuidv4()
    addToCartArr.push({ ...addedItem[0], uuid })
    document.getElementById('order-items-container').innerHTML = ReceiptHtml()
    document.getElementById('total-price-container').style.display = 'flex'
}

function removeOrderItem(clickedUuid) {
    addToCartArr.splice(addToCartArr.findIndex(order => order.uuid == clickedUuid), 1)
    document.getElementById('order-items-container').innerHTML = ReceiptHtml()
}

function ReceiptHtml() {
    let orderHtml = ''
    addToCartArr.forEach(item => {
        orderHtml += `<div id="order-items-receipt">
                        <div id="item-and-remove-container">
                        <h2>${item.name}</h2>
                        <button class="remove-button" data-uuid ="${item.uuid}">remove</button>
                        </div>
                        <p>$${item.price}</p>
                      </div>
    `
    })
    return orderHtml
}

let totalPriceSum = document.getElementById('total-price')

function getTotalPrice() {
    let totalArr = []
    addToCartArr.forEach(item => {
        totalArr.push(item.price)
    })
    const sum = totalArr.reduce((partialSum, a) => partialSum + a, 0)
    totalPriceSum.innerText = '$' + sum
}

const payBtn = document.getElementById('pay-button')

payBtn.addEventListener('click', (e) => {
    if (userName.value && cardNumber.value && cvvNumber.value) {
        orderSuccess()
    } else {
        console.log("enter name")
    }
})

function orderSuccess() {
    document.getElementById('order-items-container').innerHTML = `<p id="success-message">Thanks, ${userName.value}! Your order is on its way!</p>`
    document.getElementById('complete-order-btn').style.display = 'none'
    document.getElementById('your-order-title').style.display = 'none'
    document.getElementById('total-price-container').style.display = 'none'
    myModal.style.display = 'none'
    userName.value = ""
    cardNumber.value = ""
    cvvNumber.value = ""
    addToCartArr = []
}









