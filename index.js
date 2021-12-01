let div = document.querySelector('.container')
let ul = document.createElement('ul')
let resultId

if (div.classList.contains('html1')) {
    async function createArray() {
        const response = await fetch ('https://gorest.co.in/public-api/posts?')
        const data = await response.json()
        const array = data.data
        console.log(array)

        function createList(array) {
            for (const item of array) {
                let li = document.createElement('li')
                li.classList.add('main__item')
                let link = document.createElement('a')
                let idItem = item.id
                link.textContent = item.title
                link.href = 'index2.html?id=' + idItem
                li.append(link)
                ul.append(li)
                div.prepend(ul)
            }
        }
        createList(array)

        const pages = data.meta.pagination.pages
        let arrayPagination = []

        for (i=1; arrayPagination.length < pages; i++) {
            arrayPagination.push(i)
        }

        let list = document.createElement('ul')
        list.classList.add('pag__list')

        for (const item of arrayPagination) {
            let element = document.createElement('li')
            let link = document.createElement('a')
            link.href = ''
            link.classList.add('pag__link')
            element.classList.add('pag__item')
            link.textContent = item
            element.append(link)
            list.append(element)

            link.addEventListener('click', async (e)=>{
                e.preventDefault()
                const response = await fetch ('https://gorest.co.in/public-api/posts?page=' + item)
                const data = await response.json()
                const array = data.data
                ul.innerHTML = ''
                createList(array)
            })
        }
        console.log(pages)
        console.log(arrayPagination)
        div.append(list)
    }

    createArray ()
}

if (div.classList.contains('html2')) {
    let idUrl = document.location.search.substr(4)

    async function createInfo() {
        const response = await fetch('https://gorest.co.in/public-api/posts/' + idUrl)
        const data = await response.json()

        let title = document.createElement('h1')
        title.textContent = data.data.title
        let body = document.createElement('p')
        body.textContent = data.data.body
        div.prepend(body)
        div.prepend(title)
    }

    async function createCommit() {
        const response = await fetch('https://gorest.co.in/public-api/comments?post_id=' + idUrl)
        const data = await response.json()
        let array = data.data
        let box = document.createElement('ul')

        for (const item of array) {
            let element = document.createElement('li')
            element.classList.add('item')
            let name = document.createElement('div')
            name.textContent = item.name
            let body = document.createElement('div')
            body.textContent = item.body

            element.append(name)
            element.append(body)
            box.append(element)
        }
        div.append(box)
    }

    createInfo()
    createCommit()
}

document.body.append(div)
