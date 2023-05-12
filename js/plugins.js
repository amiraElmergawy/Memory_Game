let firstImageSelected = null,
    secondImageSelected = null,
    score = 0,
    playListener = document.getElementById('onePlayer'),
    customListener = document.getElementById('twoPlayers'),
    firstPageDiv = document.getElementById('firstDiv'),
    secondPageDiv = document.getElementById('secondDiv'),
    thirdPageDiv = document.getElementById('thirdDiv'),
    backBtnListner = document.getElementById('backBtn'),
    backScoreDiv = document.getElementById('backScoreDiv'),
    imagesDisplay = document.getElementById('images'),
    images = [
        "./resources/images/alien-1.png",
        "./resources/images/crying_man.png",
        "./resources/images/grandma.png",
        "./resources/images/man.png",
        "./resources/images/mother.png",
        "./resources/images/people.png",
        "./resources/images/people_icon.png",
        "./resources/images/celebrate.png",
        "./resources/images/star.png",
        "./resources/images/wars.png",
        "./resources/images/pikachu.png",
        "./resources/images/playstation.png",
        "./resources/images/santa.png",
        "./resources/images/snowman.png",
        "./resources/images/amongus.png"
    ],
    ImageIndex = 0,
    fillLetterDivs = () => {
        if (document.images.length == 0) {
            images.forEach((element, index) => {
                addElement('div', `<img id='${index}-1' class='d-none' src='${element}'/>`, imagesDisplay, 'className', 'back-btn animate__heartBeat');
                addElement('div', `<img id='${index}-2' class='d-none' src='${element}'/>`, imagesDisplay, 'className', 'back-btn animate__heartBeat');
            });
            // console.log(document.images);

            for (i = 1; i <= imagesDisplay.children.length; i++) {
                const imageDiv = imagesDisplay.childNodes[i];
                imageDiv.addEventListener("click", () => {
                    console.log(imageDiv.childNodes[0].id);
                    if (firstImageSelected == null) {
                        firstImageSelected = imageDiv.childNodes[0];
                        imageDiv.childNodes[0].classList.remove('d-none');
                    }
                    else {
                        secondImageSelected = imageDiv.childNodes[0];
                        imageDiv.childNodes[0].classList.remove('d-none');
                        if ((+firstImageSelected.id.split('-')[0] != +secondImageSelected.id.split('-')[0]) || (firstImageSelected.id == secondImageSelected.id)) {
                            setTimeout(() => {
                                firstImageSelected.classList.add('d-none');
                                secondImageSelected.classList.add('d-none');
                                firstImageSelected = null;
                                secondImageSelected = null;
                            }
                                , 500);
                        } else {
                            firstImageSelected.removeEventListener('click', helperFunction);
                            secondImageSelected.removeEventListener('click', helperFunction);
                            firstImageSelected = null;
                            secondImageSelected = null;
                            score++;
                            document.getElementById('score').innerHTML = score;
                        }
                    }
                });
            }
        }
        shuffle(imagesDisplay);
    };


//hide first page
function arrangeSecondPart(){
    firstPageDiv.classList.add('d-none');
    backScoreDiv.classList.remove('d-none');
}

//move through app pages
playListener.addEventListener('click', (e) => {
    arrangeSecondPart();
    thirdPageDiv.classList.remove('d-none');
    fillLetterDivs(); // fill images box
});
customListener.addEventListener('click', (e) => {
    arrangeSecondPart();
    secondPageDiv.classList.remove('d-none');
});

// back to main menue
backBtnListner.addEventListener('click', (e) => {
    secondPageDiv.classList.add('d-none');
    backScoreDiv.classList.add('d-none');
    thirdPageDiv.classList.add('d-none');
    firstPageDiv.classList.remove('d-none');
    ImageIndex = 0;
    firstImageSelected = null;
    secondImageSelected = null;
    document.getElementById('showBtn').classList.remove('d-none');
});


//append element to parent node with its properties
var addElement = function (elementType, elementInnerHTML, parent, property, propertyValue) {
    element = document.createElement(elementType);
    element.innerHTML = elementInnerHTML;
    parent.appendChild(element);
    element[property] = propertyValue;
}

// document.getElementById('wordForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     word = Array.from(e.target.word.value);
//     if (word != '' || word.length != 0) {
//         secondPageDiv.classList.add('d-none');
//         thirdPageDiv.classList.remove('d-none');
//         fillLetterDivs(word);
//     } else {
//         alert('Please, enter a correct word');
//     }
// })

//show all images for half second
document.getElementById('showBtn').addEventListener('click', helperFunction);

function helperFunction() {
    for (i = 1; i <= imagesDisplay.children.length; i++) {
        imagesDisplay.childNodes[i].children[0].classList.remove('d-none');
    }
    setTimeout(() => {
        for (i = 1; i <= imagesDisplay.children.length; i++) {
            imagesDisplay.childNodes[i].children[0].classList.add('d-none');
        }
        document.getElementById('showBtn').classList.add('d-none');
    }
        ,
        5000
    );
    firstImageSelected = null;
    secondImageSelected = null;
}



document.getElementById("shuffleBtn").addEventListener('click', (e) => {
    shuffle(imagesDisplay);
})

//shuffle images
function shuffle(array) {
    hideAllImages();
    for (i = array.children.length; i >= 0; i--) {
        array.appendChild(array.children[Math.random() * i | 0]);
    }
}

// add none class to all images
function hideAllImages() {
    Array.from(document.images).forEach(element => {
        element.classList.add('d-none');
    });
}


