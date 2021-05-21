//SELECT SUBJECTS BY A NUMBER


const sub1 = document.getElementById('sub-1')
const sub2 = document.getElementById('sub-2')
const sub3 = document.getElementById('sub-3')
const sub4 = document.getElementById('sub-4')
const sub5 = document.getElementById('sub-5')
const sub6 = document.getElementById('sub-6')
const sub7 = document.getElementById('sub-7')
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

let colors = ['#b3ffc3', '#e6e8eb', '#53d8b0', '#c6bcf5','#b7dd85','#4293ac','#ca9c60','#97d1a9','#5b97e6'];
let random_color = colors[Math.floor(Math.random() * colors.length)];
document.getElementById('sub-1').style.backgroundColor = colors[0];
document.getElementById('sub-2').style.backgroundColor = colors[1];
document.getElementById('sub-3').style.backgroundColor = colors[2];
document.getElementById('sub-4').style.backgroundColor = colors[3];
document.getElementById('sub-5').style.backgroundColor = colors[4];
document.getElementById('sub-6').style.backgroundColor = colors[5];
document.getElementById('sub-7').style.backgroundColor = colors[6];
document.getElementById('sub-8').style.backgroundColor = colors[7];
document.getElementById('sub-9').style.backgroundColor = colors[8];
document.getElementById('sub-10').style.backgroundColor = colors[9];

//subject click
function selectSubj(e) {
  resetSubjs()

  subjColor = e.target.style.backgroundColor

  switch(e.target.id){
    case 'sub-1':
      activeSubj(sub1, subjColor)
      icon = '<i class="fas fa-couch"></i>'
      break
    case 'sub-2':
      activeSubj(sub2, subjColor)
      icon = '<i class="fas fa-dumbbell"></i>'
      break
    case 'sub-3':
      activeSubj(sub3, subjColor)
      icon = '<i class="fas fa-book"></i>'
      break
    case 'sub-4':
      activeSubj(sub4, subjColor)
      icon = '<i class="fas fa-tv"></i>'
      break
    case 'sub-5':
      activeSubj(sub5, subjColor)
      icon = '<i class="fas fa-apple-alt"></i>'
      break
    case 'sub-6':
      activeSubj(sub6, subjColor)
      icon = '<i class="fas fa-atom"></i>'
      break
    case 'sub-7':
      activeSubj(sub7, subjColor)
      icon = '<i class="fas fa-baseball-ball"></i>'
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


// //SELECT LIST OF SUBJS
function deleteSubjs() {
  const subjs = document.querySelectorAll('.task')
  subjs.forEach((item) => {
    item.innerHTML = ''
    item.style.backgroundColor = 'white'
  })  
}

function subjList(subjs, color) {
  const subjsList = document.querySelectorAll('.subject')
  subjsList.forEach((item)=>{
    if(item.classList.contains('sub-2')){
      item.innerHTML = ''
      item.style.backgroundColor = '#12a136'
    }
  })
  
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