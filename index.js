const services = [
    {
        "id": 1,
        "head": null,
        "name": "Проф.осмотр",
        "node": 0,
        "price": 100.0,
        "sorthead": 20
    },
    {
        "id": 2,
        "head": null,
        "name": "Хирургия",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 3,
        "head": 2,
        "name": "Удаление зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 4,
        "head": 3,
        "name": "Удаление зуба",
        "node": 0,
        "price": 800.0,
        "sorthead": 10
    },
    {
        "id": 5,
        "head": 3,
        "name": "Удаление 8ого зуба",
        "node": 0,
        "price": 1000.0,
        "sorthead": 30
    },
    {
        "id": 6,
        "head": 3,
        "name": "Удаление осколка зуба",
        "node": 0,
        "price": 2000.0,
        "sorthead": 20
    },
    {
        "id": 7,
        "head": 2,
        "name": "Хирургические вмешательство",
        "node": 0,
        "price": 200.0,
        "sorthead": 10
    },
    {
        "id": 8,
        "head": 2,
        "name": "Имплантация зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 20
    },
    {
        "id": 9,
        "head": 8,
        "name": "Коронка",
        "node": 0,
        "price": 3000.0,
        "sorthead": 10
    },
    {
        "id": 10,
        "head": 8,
        "name": "Слепок челюсти",
        "node": 0,
        "price": 500.0,
        "sorthead": 20
    }
]

function buildtree(array) {
    const map = new Map(services.map(item => [item.id, item]));
    for (let item of map.values()) {
        if (!map.has(item.head)) {
            continue;
        }
        const parent = map.get(item.head);
        parent.children = [...parent.children || [], item].sort(function (a, b) {
            return a.sorthead - b.sorthead;
        })
    }
    return [...map.values()].filter(item => !item.head).sort(function (a, b) {
        return a.sorthead - b.sorthead;
    });
}

const treeArr = buildtree(services);
const createNestedList = data =>
    data.reduce((ul, {name, children, price, node}) => {
        const li = document.createElement('li');

        li.textContent = name + ` ${price !== 0 ? '(' + price + ')' : ''}`;
        node == 1 ? li.innerHTML += "<span class='arrow'>&#x25BC;</span>" : ''
        if (children instanceof Array && children.length) {
            li.appendChild(createNestedList(children));
        }

        ul.appendChild(li);

        return ul;
    }, document.createElement('ul'));

const tree = document.querySelector('.tree')

tree.appendChild(createNestedList(treeArr));

for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
}

tree.onclick = function (event) {
    if (event.target.tagName != 'SPAN') {
        return;
    }
    let childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return;
    childrenContainer.hidden = !childrenContainer.hidden;
}