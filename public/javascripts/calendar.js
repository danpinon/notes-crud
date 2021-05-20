const math = document.getElementById('Math')
const web = document.getElementById('Web Fundamentals')
const java = document.getElementById('Javascript 101')
const eng = document.getElementById('English')
const deselect = document.getElementById('deselect')
const subjectContainer = document.querySelector('.subject-container')
const weeklyContainer = document.querySelector('.weekly-container')
const resetBtn = document.querySelector('.deleteBtn')
const popUp = document.querySelector('.pop-up-container')
const yesBtn = document.getElementById('btn-yes')
const noBtn = document.getElementById('btn-no')

let selectedColor, active


//EVENT LISTENERS
subjectContainer.addEventListener('click',selectSubj)
weeklyContainer.addEventListener('click',setColors)
deselect.addEventListener('click',resetSubjs)
resetBtn.addEventListener('click', openPopup)
noBtn.addEventListener('click',closePopup)
yesBtn.addEventListener('click', deleteSubjs)


//subject click
function selectSubj(e) {
  resetSubjs()

  subjColor = e.target.style.backgroundColor

  switch(e.target.id){
    case 'Math':
      activeSubj(math, subjColor)
      icon = '<i class="fas fa-couch"></i>'
      break
    case 'Web Fundamentals':
      activeSubj(web, subjColor)
      icon = '<i class="fas fa-dumbbell"></i>'
      break
    case 'Javascript 101':
      activeSubj(java, subjColor)
      icon = '<i class="fas fa-book"></i>'
      break
    case 'English':
      activeSubj(eng, subjColor)
      icon = '<i class="fas fa-tv"></i>'
      break
  }  
}

//SET COLOR FOR SCHEDULE
function setColors(elems) {
  if(elems.target.classList.contains('task') && active === true){
    elems.target.style.backgroundColor = selectedColor
    elems.target.innerHTML = icon
  }
  
}


//SELECT SUBJECT

function activeSubj(subj, color) {
  subj.classList.toggle('selected')

  if(subj.classList.contains('selected')){
    active = true
    selectedColor = color
    return selectedColor
  }else{
    active = false
  }
  
}


//RESET SUBJECTS

function resetSubjs() {
  const allSubjs = document.querySelectorAll('.subject-name')

  allSubjs.forEach((item) => {
    item.className = 'subject-name'
  })  
}

//DELETE SUBJECTS
function deleteSubjs() {
  const subjs = document.querySelectorAll('.task')
  subjs.forEach((item) => {
    item.innerHTML = ''
    item.style.backgroundColor = 'white'
  })  
}

//OPEN POP UP
function openPopup() {
  popUp.style.display = 'flex'  
}

//CLOSE POP UP
function closePopup() {
  popUp.style.display = 'none'  
}