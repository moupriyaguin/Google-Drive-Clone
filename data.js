let storage = document.querySelector(".storage");
let progressBar = document.createElement("progress");
progressBar.value = 77;
progressBar.max = 100;
progressBar.style.width = "100%";

progressBar.style.width = "90%";  
progressBar.style.height = "10px";  
progressBar.style.display = "block";
progressBar.style.marginTop = "-3px";
progressBar.style.marginLeft = "18px";

storage.appendChild(progressBar);

const sideNavLinks = document.querySelectorAll('.side-nav li');

sideNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    sideNavLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

const dragger = document.querySelector('.dragger');
const sidebar = document.querySelector('.side-nav');
const mainContent = document.querySelector('.main');
const maxDragDistance = document.documentElement.clientWidth - sidebar.offsetWidth - 600;
const sidebarWidth = sidebar.offsetWidth;
let initialX = 0;
let mainContentOriginalLeft = mainContent.offsetLeft;

dragger.addEventListener('mousedown', (event) => {
  initialX = event.clientX;

  const moveEvent = (moveEvent) => {
    const deltaX = moveEvent.clientX - initialX;
    const newLeft = dragger.offsetLeft + deltaX;

   
    dragger.style.left = Math.max(sidebarWidth, Math.min(maxDragDistance, newLeft)) + 'px';
    document.querySelector('.side-nav').style.width = dragger.offsetLeft + 'px';

    mainContent.style.transform = `translateX(${dragger.offsetLeft - mainContentOriginalLeft}px)`;

    initialX = moveEvent.clientX;
  };

  const upEvent = () => {
    document.removeEventListener('mousemove', moveEvent);
    document.removeEventListener('mouseup', upEvent);
  };

  document.addEventListener('mousemove', moveEvent);
  document.addEventListener('mouseup', upEvent);
});






const fileFolderButton = document.getElementById("file_folder");
const leftText = fileFolderButton.querySelector(".left-text");
const rightText = fileFolderButton.querySelector(".right-text");
const rightTextSpan = fileFolderButton.querySelector(".right-text span.material-symbols-outlined");
const leftTextSpan = fileFolderButton.querySelector(".left-text span.material-symbols-outlined");


leftText.addEventListener("click", function() {
    leftText.style.backgroundColor = "rgb(209, 237, 255)";
    rightText.style.backgroundColor = "";
    leftTextSpan.textContent = "check";
    rightTextSpan.textContent = "folder";
});

rightText.addEventListener("click", function() {
    rightText.style.backgroundColor = "rgb(209, 237, 255)";
    leftText.style.backgroundColor = "white";
    rightTextSpan.textContent = "check";
    leftTextSpan.textContent = "article";
});

const viewbtn = document.getElementById("view");
const leftView = viewbtn.querySelector(".left-text");
const rightView = viewbtn.querySelector(".right-text");
const checkedIcon = viewbtn.querySelector("#checked");
const uncheckedIcon = viewbtn.querySelector("#unchecked");
let isChecked = true;

leftView.addEventListener("click", function() {
    leftView.style.backgroundColor = "rgb(209, 237, 255)";
    rightView.style.backgroundColor = "";
    if(!isChecked){
        const tempId = checkedIcon.id;
        checkedIcon.id = uncheckedIcon.id;
        uncheckedIcon.id = tempId;
        isChecked = true;
    }
    
});

rightView.addEventListener("click", function() {
    rightView.style.backgroundColor = "rgb(209, 237, 255)";
    leftView.style.backgroundColor = "white";
    if(isChecked){
        const tempId = checkedIcon.id;
        checkedIcon.id = uncheckedIcon.id;
        uncheckedIcon.id = tempId;
        isChecked = false;
    }   
});



const newButton = document.querySelector("new-button");
const floatingList = document.getElementById("floating_list");
function myFunction(event){
        floatingList.style.visibility = "visible";
        event.stopPropagation();
}
document.addEventListener("click", function(event) {
    if (!floatingList.contains(event.target)) {
        floatingList.style.visibility = "hidden";
    }
});

