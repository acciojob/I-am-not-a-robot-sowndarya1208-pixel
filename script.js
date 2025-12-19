//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const heading = document.getElementById("h");

// Image class names from CSS
const imgClasses = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];

function init() {
    // 1. Reset state
    imageContainer.innerHTML = "";
    selectedImages = [];
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    para.innerText = "";
    
    // 2. Pick 5 unique images and 1 duplicate
    let imagesToDisplay = [...imgClasses];
    const duplicateImg = imgClasses[Math.floor(Math.random() * imgClasses.length)];
    imagesToDisplay.push(duplicateImg);

    // 3. Shuffle the array
    imagesToDisplay.sort(() => Math.random() - 0.5);

    // 4. Create and append images
    imagesToDisplay.forEach((className, index) => {
        const img = document.createElement("img");
        img.className = className;
        // Assign a unique ID or index to distinguish tiles, 
        // but verification uses the class (image source)
        img.setAttribute("data-index", index); 
        img.onclick = () => onImageClick(img);
        imageContainer.appendChild(img);
    });
}

function onImageClick(img) {
    // Prevent clicking more than 2 images or the same image twice
    if (selectedImages.length < 2 && !img.classList.contains("selected")) {
        img.classList.add("selected");
        selectedImages.push(img);

        // Show reset button on first click
        resetBtn.style.display = "inline-block";

        // Show verify button only when exactly 2 are clicked
        if (selectedImages.length === 2) {
            verifyBtn.style.display = "inline-block";
        } else {
            verifyBtn.style.display = "none";
        }
    }
}

resetBtn.onclick = () => {
    init();
};

verifyBtn.onclick = () => {
    const img1Class = selectedImages[0].className.split(" ")[0];
    const img2Class = selectedImages[1].className.split(" ")[0];

    if (img1Class === img2Class) {
        para.innerText = "You are a human. Congratulations!";
    } else {
        para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyBtn.style.display = "none";
};

// Initialize on page load
init();
