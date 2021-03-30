import moment from 'moment'
import { getFilters } from './filters'
import { getNotes, sortNotes} from './notes'

// Generate the DOM  structure for note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
    
    // setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Un-named Note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // setup the link
    noteEl.setAttribute('href', `./edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Render application notes
// this func takes all note & filter and search for a note and THEN redner it to user
const renderNotes = () => {
    const notesEle = document.querySelector('#notes')
    const filters = getFilters()    
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    // Next, clear the div element by sitting to emtpy str
    notesEle.innerHTML = ''

    if (filteredNotes.length > 0) {
            // add only filtered notes
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note)
           notesEle.appendChild(noteElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEle.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign('./index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}


// Generate
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`


export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }