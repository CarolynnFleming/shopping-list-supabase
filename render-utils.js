import { buyListItem } from "./fetch-utils";

export function renderItem(item){
    const itemDiv = document.createElement('div');
    const itemsEl = document.createElement('p');

    if (item.bought){
        itemDiv.classList.add('bought');
    } else {
        itemDiv.classList.add('un-bought');
    }
    itemDiv.classList.add('item');

    itemsEl.textContent = `${item.quantity} ${item.item}`;

    itemDiv.append(itemsEl);

    return itemDiv;
}