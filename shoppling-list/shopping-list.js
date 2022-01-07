import { checkAuth, logout, createListItem, getListItem, buyListItem, deleteAllListItems } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

const listForm = document.querySelector('.item-form');

const deleteButton = document.querySelector('.delete');

const listEl = document.querySelector('.list');

logoutButton.addEventListener('click', () => {
    logout();
});

listForm.addEventListener('submit', async(e) => { 
    e.preventDefault();

    const data = new FormData(listForm);

    const item = data.get('item');

    const quantity = data.get('quantity');

    await createListItem(item, quantity);

    listForm.reset();

    await displayShoppingList();
});

deleteButton.addEventListener('click', async() => {
    await deleteAllListItems();

    await displayShoppingList();
});

async function displayShoppingList() {

} 

window.addEventListener('load', async() => {
    await displayShoppingList();
});