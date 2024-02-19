//*                        TODO APP

//! JSON.stringfy : veriyi JSON formatına dönüştürmek amacıyla kullanılır

//!JSON.parse : JSON neslerini JavaScript e dönüştürmeye diğer bir değişle okumamız amacıyla kullanılır

//? SELECTORS

const addBtn = document.getElementById("todo-button")
const todoInput = document.getElementById("todo-input")
const todoUl = document.getElementById("todo-ul")

//! todos dizisini localStorage'daki veriler ile guncelle
//! eger localStorage'da todos adinda bir item bulunmazsa ise bos array atamasi yap

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);


const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

renderSavedTodos();


addBtn.addEventListener("click", () => { 
    if(todoInput.value.trim() === ""){
    alert("please enter new todo")
} else {
    const newTodo = {
    id:new Date().getTime()
};

createListElement(newTodo);
//? yeni oluşturulan todo yu dizi ye sakla
todos.push(newTodo);

todoInput.value = "" ;
};
});

function createListElement(newTodo) {
//? yeni bi li elementi oluştur 
const li = document.createElement("li")
// li.id = newTodo.id;
li.setAttribute("id" , newTodo.id);

 // newTodo.completed ? li.classList.add("done") : null;
  // if (newTodo.completed) li.classList.add("done");
  newTodo.completed && li.classList.add("done");


//? check ikonu oluştur ve li elementine bağla
const okIkon = document.createElement("i")
okIkon.setAttribute("class", "fas fa-check")
li.appendChild(okIkon)

//? todo başlığı için bir p elemeti ve yazı duğumu oluşturarak li yr bağla
const p = document.createElement("p")
const pTextNode = document.createTextNode(newTodo.text);
p.appendChild(pTextNode)
li.appendChild(p)

//?delete ikonu oluştur ve li elementine bağla
const deleteIcon= document.createElement("i")
deleteIcon.setAttribute("class" , "fas fa-trash")
li.appendChild(deleteIcon)

//? meydana gelen li elementini ul ye child olarak bağla
todoUl.appendChild(li)
}

// //? ul elementinin çocuklarından herhangi birisinden bir event gelirse bunu tespit et ve gerekeni yap (CAPTURİNG)

todoUl.addEventListener("click", (e) => {
    const id = e.target.parentElement.getAttribute("id");

//? event bir okey butonundan geldi isa ilgili li elementinde checked adında bi class ı varsa bunu sil aksi takdirde ekle (DOM)
if (e.target.classList.contains("fa-check")){
    e.target.parentElement.classList.toggle("done")


    //? todos dizisindeki ilgili elementin completed kismini guncelle
    todos.map((todo, index) => {
        if (todo.id == id) {
          todos[index].completed = !todos[index].completed;
        }
      });
      console.log(todos);
  
      //? todos dizisinin son halini localStorage'a sakla
      localStorage.setItem("TODOS", JSON.stringify(todos));
  
      //? event, bir delete butonundan geldi ise    

}else if (e.target.classList.contains("fa-trash")) {
e.target.parentElement.remove();

    //? Dizinin ilgili elementini sil
    todos = todos.filter((todo) => todo.id != id);

    // todos dizisinin son halini localStorage'a sakla
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }
});

//? enter tuşu ile ekleme mümkün olsun
todoInput.addEventListener("keydown" , (e) => {
    if(e.code === "enter") {
        addBtn.click();
    }
});

//? başlangıçta input aktif olsun
window.onload = () => {
    todoInput.focus();
};









