import {  createNote } from './notes'
import {  setFilters} from './filters'
import { renderNotes } from './views'



renderNotes()


document.querySelector('#create-note').addEventListener('click', (event) => {
    const id = createNote()
    location.assign(`./edit.html#${id}`)
})


document.querySelector('#search-text').addEventListener('input', (event) => {
    setFilters({
        searchText: event.target.value
    })
    renderNotes()
})


document.querySelector('#filter-by').addEventListener('change',  (event) => {
    setFilters({
        sortBy: event.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        renderNotes()
    }
})

