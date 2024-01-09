const addBtn = document.getElementById("add-feedback");
const backBtn = document.getElementById("back-main");
const productEl = document.getElementById("product-name");
const feedbackEl = document.getElementById("product-feedback");
const errEl  = document.getElementById("error");

addBtn.addEventListener("click", () => {
    if (productEl.value && feedbackEl.value) {
        addFeedback(productEl.value, feedbackEl.value);
        window.open("main.html", "_self");
    } else {
        setErrorDisplay("block")
    }
})

productEl.addEventListener("input", () => {
    setErrorDisplay("none")
})

feedbackEl.addEventListener("input", () => {
    setErrorDisplay("none")
})

function setErrorDisplay(displayProperty) {
    if (errEl.style.display !== displayProperty) {
        errEl.style.display = displayProperty;    
    }
} 

backBtn.addEventListener("click", () => {
    window.open("main.html", "_self");
})    


