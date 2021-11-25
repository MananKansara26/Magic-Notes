console.log("Welcome to javascript file");
showNotes();

//if user adds a note add to the local storage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e)
{
    let addTxt=document.getElementById('addTxt');
    let notes=localStorage.getItem('notes');
    if(notes == null)
    {
        notesObj=[];//if there is no item the we have to set object as null otherwise push operation can not be done to the object that is not exist
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));//coz we have to store as a string. Every time we add notes, notes(key in local storage) is overwrite in local storage while in notesObj one entry is added
    addTxt.value="";//remove written text after adding the note
    showNotes();
}
);  

//function to show notes from the local storage
function showNotes()
{
    let notes=localStorage.getItem('notes');
    if(notes == null)
    {
        notesObj=[];//if there is no item the we have to set object as null otherwise push operation can not be done to the object that is not exist
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index)//index is a optional parameter and used 
    {
        html+=`<div class="noteCard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id="index" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button><!--by writing this.id the id is passed to the function of this button-->
        </div>
    </div>`;
    }
    );
    let notesElm=document.getElementById('notes');//this note is id of div of all cards
    if(notesObj.length!=0)
    {
        notesElm.innerHTML=html;
    }
    else
    {
        notesElm.innerHTML=`Nothing to show. Add notes please!`;
    }
}

//function to delete function
function deleteNote(index)
{
    let notes=localStorage.getItem('notes');
    if(notes == null)
    {
        notesObj=[];//if there is no item the we have to set object as null otherwise push operation can not be done to the object that is not exist
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener('input',function()
{
    let inputVal=search.value.toLowerCase();//lowercase coz there will not case diffrent in search
    // console.log(inputVal);
    let noteCards=document.getElementsByClassName('noteCard');
    // console.log(noteCards);
    Array.from(noteCards).forEach(function(element)
    {
        let cardTxt=element.getElementsByTagName("p")[0].innerText.toLowerCase();//first p element of card which is decription of note. here also use lowercase so that both are in lower case so that searchin will efficient
        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    }
    )
}
)