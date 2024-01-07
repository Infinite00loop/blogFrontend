var list=document.getElementById('list-items');
list.addEventListener('click' ,addorDeleteElement);
var anonymousId;
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:5000/get-blog')
    .then((res)=> {
        console.log(res)

        for(var i=0; i<res.data.length;i++){
            showData(res.data[i])
        }
    })
    .catch((err) =>{
        console.log(err)
    })
})
function onsignup(){
    var title_=document.getElementById('id1').value;
    var author_=document.getElementById('id2').value;
    var content_=document.getElementById('id3').value;

    let myObj={
        title: title_,
        author: author_,
        content: content_
    };

    axios.post('http://localhost:5000/insert-blog',myObj)
    .then((res)=> console.log(res))
    .catch((err)=> console.log(err)); 
    
    showData(myObj);

}

function showData(obj){
    var newList=document.createElement('li');
    var div=document.createElement('div');
    var h2=document.createElement('h2');
    h2.appendChild(document.createTextNode(obj.title));
    div.appendChild(h2);
    var h4=document.createElement('h4');
    h4.appendChild(document.createTextNode("Author - "+obj.author));
    div.appendChild(h4);
    var div2=document.createElement('div');
    div2.appendChild(document.createTextNode(obj.content));
    div.appendChild(div2);
    div.style.backgroundColor = "teal";
    var comments=document.createElement('h2');
    comments.appendChild(document.createTextNode("Comments"));
    div.appendChild(comments);
    var input=document.createElement('input')
    input.type='text';
    input.className='input-container input-box arrow-button'
    div.appendChild(input);
    var comButton=document.createElement('button');
    comButton.className='comment';
    comButton.appendChild(document.createTextNode('Add Comment'));
    div.appendChild(comButton);
    var ul=document.createElement('ul');
    ul.className='unorderedList';
    div.appendChild(ul)
    newList.appendChild(div);
    list.appendChild(newList);
}

function addorDeleteElement(e){
    if(e.target.classList.contains('comment')){
        var div=e.target.parentElement;
        var ul=div.lastChild;
        var li=document.createElement('li');
        li.appendChild(document.createTextNode(div.children[4].value));
        var delButton=document.createElement('button');
        delButton.className='delete';
        delButton.appendChild(document.createTextNode('Delete'));
        li.appendChild(delButton);
        ul.appendChild(li);      
    }
    else if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete ?')){
            var li=e.target.parentElement;
            var ul=li.parentElement;
            ul.removeChild(li);
        }
    }
}
