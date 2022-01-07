import { checkAuth, logout, createListItem, getListItem, buyListItem, deleteAllListItems } from '../fetch-utils.js';

import { renderItem } from '../render-utils.js';

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
    const list = await getListItem();

    listEl.textContent = '';

    for (let item of list) {
        const itemEl = renderItem(item);
        if (item.bought === false) {
            itemEl.addEventListener('click', async() => {
                await buyListItem(item.id);
                displayShoppingList();
            });
            listEl.append(itemEl);
        }   
    }
} 

window.addEventListener('load', async() => {
    await displayShoppingList();
});