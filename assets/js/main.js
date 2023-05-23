let add_card_toggle = document.querySelectorAll(".add_card_toggle")
let add_note_card = document.querySelector(".add_update_card_cont")
let add_note_btn = document.querySelector("#add_note_btn")
let add_edit_box_title = document.querySelector(".add_edit_box_title")
let add_note_title = document.querySelector("#add_note_title")
let add_note_desc = document.querySelector("#add_note_desc")
let append_cont = document.querySelector(".note_card_cont")
let note_content = []
let array_index 
let update_index
let is_update = false



add_card_toggle.forEach((add_card_toggle) => {
 

    add_card_toggle.addEventListener("click", () => {
        add_note_title.value = ""
        add_note_desc.value = ""
        add_note_btn.innerText = "Add Note"
        add_edit_box_title.innerText = "Add a Note"


        if (add_note_card.style.display == "none") {
            add_note_card.style.display = "flex"
        } else {
            add_note_card.style.display = "none"
        }
    })
})

add_note_btn.addEventListener("click", () => {

    let date = new Date
    let current_date = date.getDate()
    let current_month = date.getMonth()+1
    let current_year = date.getFullYear()

    let array_obj = {
        title: add_note_title.value,
        description: add_note_desc.value,
        date: `${current_date}/${current_month}/${current_year}`
    }
    if(!is_update == true){
        console.log("ok")
        console.log(add_note_title.value,add_note_desc.value)
        note_content.push(array_obj)
    }else{
        note_content[update_index].title = add_note_title.value
        note_content[update_index].description = add_note_desc.value
    }
  
    localStorage.setItem("item",JSON.stringify(note_content))
    update_data()
})


update_data = () => {
    let note_card = document.querySelectorAll(".note_card")

    note_card.forEach((note_card)=>{
        note_card.remove()
    })

    array_index = 0
    note_content.forEach((index) => {
        let html = `<div class="note_card">
                        <div class="note_title">
                            <h2>${index.title}</h2>
                        </div>
                        <div class="note_desc">
                            <p>${index.description}</p>
                        </div>
                        <div class="additional_info">
                            <div class="date">
                                <h4>${index.date}</h4>
                            </div>
                            <div class="additional_btn">
                                <div class="edit" onclick=edit_card(${array_index})>
                                    <img src="assets/images/icons8-pencil-30.png" alt="" width="20px">
                                </div>
                                <div class="delete" onclick=delete_card(${array_index})>
                                    <img src="assets/images/icons8-trash-30.png" alt="" width="20px">
                                </div>
                            </div>
                        </div>
                    </div>`

      append_cont.insertAdjacentHTML("beforeend",html)
      array_index++
    })
}

edit_card=(array_index)=>{
    add_note_card.style.display = "flex"
    add_note_title.value = note_content[array_index].title 
    add_note_desc.value = note_content[array_index].description 
    add_note_btn.innerText = "Edit Note"
    add_edit_box_title.innerText = "Edit Selected Note"
    is_update = true
    update_index = array_index
}


delete_card=(array_index)=>{
    note_content.splice(array_index,1)
    localStorage.setItem("item",JSON.stringify(note_content))
    update_data()
}


window.addEventListener("load",()=>{
    note_content = JSON.parse(localStorage.getItem("item"))
    note_content == null ? note_content = [] : 
    console.log(note_content)
    update_data()
})