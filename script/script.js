const AddIdeaPage = document.querySelector('.add-idea-page')
const AddIdeaBtn = document.querySelector('.add-idea')
const EditIdeaPage = document.querySelector('.edit-page')
const EditIdeaBtn = document.querySelector('.edit-page-btn')
const DeleteIdeaBtn = document.querySelector('.delete-page-btn')

const IdeaPage = document.querySelector('.idea-page')

const ideaField = document.querySelector('.ideas')

const ideas = JSON.parse(localStorage.getItem('ideas')) || []

const CloseBtn = document.querySelectorAll('.close-page')

AddIdeaBtn.addEventListener('click',()=>{
    AddIdeaPage.style.display = 'flex'
})

EditIdeaBtn.addEventListener('click',()=>{
    EditIdeaPage.style.display = "flex"
    let ToBeEditedId = IdeaTitle.innerHTML.split('.')
    let ToBeEdited = ToBeEditedId[0]
    EditIdea(ToBeEdited)
})

CloseBtn.forEach(CloseBtn=>{
    CloseBtn.addEventListener('click',CloseAllPage)
})

function CloseAllPage()
{
    AddIdeaPage.style.display = 'none'
    IdeaPage.style.display = "none"
    EditIdeaPage.style.display = "none"
}
const IdeaTitle = document.querySelector('.idea-title')
const IdeaGenre = document.querySelector('.idea-genre')
const IdeaCharacters = document.querySelector('.idea-characters')
const IdeaSummary = document.querySelector('.idea-summary')
const IdeaScript = document.querySelector('.idea-script')

function OpenIdeaPage(id){
    ideas.forEach(idea=>{
        if(idea.id == id)
        {
            IdeaPage.style.display = "flex"
            IdeaTitle.innerHTML = idea.id+'.'+idea.title
            IdeaGenre.innerHTML = idea.genre
            IdeaCharacters.innerHTML = idea.characters
            IdeaSummary.innerHTML = idea.summary
            IdeaScript.innerHTML = idea.script           
        }
    })
}
//Edit page things
const EditTitle = document.querySelector('.edit-page .title input')
const EditGenre = document.querySelector('.edit-page .genre input')
const EditCharacters = document.querySelector('.edit-page .characters input')
const EditSummary = document.querySelector('.edit-page .summary input')
const EditScript = document.querySelector('.edit-page .script textarea')

const EditPage = document.querySelector('.edit-input-section')

var ToBeEditedRealId = 0

function EditIdea(id){
    ToBeEditedRealId = id
    EditTitle.value = ideas[ToBeEditedRealId].title
    EditGenre.value = ideas[ToBeEditedRealId].genre
    EditCharacters.value = ideas[ToBeEditedRealId].characters
    EditSummary.value = ideas[ToBeEditedRealId].summary
    EditScript.textContent = ideas[ToBeEditedRealId].script
}

EditPage.addEventListener('submit',(e)=>{

    e.preventDefault()

    const EditedIdea = {
        title: EditTitle.value,
        genre: EditGenre.value,
        characters: EditCharacters.value,
        summary: EditSummary.value,
        script: EditScript.value,
        id: ToBeEditedRealId,
    }
    ideas[ToBeEditedRealId] = EditedIdea

    localStorage.setItem('ideas',JSON.stringify(ideas))

    EditPage.reset()
    CloseAllPage()
})
const DownloadBtn = document.querySelector('.download')

DownloadBtn.addEventListener('click',()=>{
    let ToBeDownloadedId = IdeaTitle.innerHTML.split('.')
    ideas[ToBeDownloadedId[0]]
    let ToBeDownloaded = '\t\t'+ideas[ToBeDownloadedId[0]].title.toUpperCase() + "\n\nGenre:\n" + ideas[ToBeDownloadedId[0]].genre + "\n\nCharacters:\n" + ideas[ToBeDownloadedId[0]].characters+ '\n\nSummary:\n '+ ideas[ToBeDownloadedId[0]].summary + '\n\nScript:\n\n ' + IdeaScript.textContent
    
    const FileName = ideas[ToBeDownloadedId[0]].title.toLowerCase()+'.txt'

    const blob = new Blob([ToBeDownloaded],{type:'text/plain'})
    const url = URL.createObjectURL(blob)

    DownloadBtn.href = url
    DownloadBtn.download = FileName
})

DeleteIdeaBtn.addEventListener('click',()=>{
    
    let ToBeDeletedId = IdeaTitle.innerHTML.split('.')
    let ToBeDeleted = ToBeDeletedId[0]
    if(confirm('Are you sure to delete '+ToBeDeletedId[1]+'?'))
    {
        ideas.splice(ToBeDeleted,1)
        localStorage.setItem('ideas',JSON.stringify(ideas))
    }
    else{
        return 
    }
})
const addIdea = document.querySelector('.input-section')

const title = document.querySelector('.title input')
const genre = document.querySelector('.genre input')
const characters = document.querySelector('.characters input')
const summary = document.querySelector('.summary input')
const script = document.querySelector('.script textarea')

var ID = ideas.length || 0

addIdea.addEventListener('submit',(e)=>{
    e.preventDefault()
    const idea = {
        title: title.value,
        genre: genre.value,
        characters: characters.value,
        summary: summary.value,
        script: script.value,
        id: ID++,
    }
    ideas.push(idea)
    const div = document.createElement('div')
    div.classList.add('idea')
    const header = document.createElement('div')
    header.classList.add('title')
    header.textContent = idea.title
    const id = document.createElement('div')
    id.classList.add('id')
    id.textContent = idea.id
    div.appendChild(id)
    div.appendChild(header)
    ideaField.appendChild(div)
    
    localStorage.setItem('ideas',JSON.stringify(ideas))

    addIdea.reset()
    CloseAllPage()
    
})


ideas.forEach((idea,index)=>{
    idea.id = index
    localStorage.setItem('ideas',JSON.stringify(ideas))
    const div = document.createElement('div')
    div.classList.add('idea')
    const header = document.createElement('div')
    header.classList.add('title')
    const id = document.createElement('div')
    id.classList.add('id')
    id.textContent = idea.id
    div.appendChild(id)
    header.textContent = idea.title
    div.setAttribute('onclick','OpenIdeaPage("'+idea.id+'")')
    div.appendChild(header)
    ideaField.appendChild(div)
})
