const feddbacksEl = document.getElementById("feddbacks");
const addBtn = document.getElementById("add-feedback");

function allFeedbacks() {
    const feedbackList = getFeedbacks();

    if (feedbackList) {
        let productContent = "";
        for (const productItem of feedbackList) {
            productContent = productContent + `
            <div>
                <h3>${productItem.product}</h3>
                <button id="product-${productItem.id}">Показать отзывы</button>
                <div id="feedbacks-${productItem.id}">
                </div>
            </div>`
        }
        feddbacksEl.innerHTML = productContent;

        for (const productItem of feedbackList) {
            let showBtn = document.getElementById(`product-${productItem.id}`);
            showBtn.style.fontWeight = "bold";
            
            showBtn.addEventListener("click", () => {
                const index = showBtn.id.substring(showBtn.id.indexOf('-') + 1);
                let feebacksDiv = document.getElementById(`feedbacks-${productItem.id}`);

                if (showBtn.textContent === "Показать отзывы") {
                    showBtn.textContent = "Скрыть отзывы";
                    feebacksDiv.style.display = "block";
                } else {
                    showBtn.textContent = "Показать отзывы";
                    feebacksDiv.style.display = "none";
                }
            })
        }

        for (const productItem of feedbackList) { 
            let feebacksDiv = document.getElementById(`feedbacks-${productItem.id}`);   
            let feebacksContent = ""; 
            for (const feedbackItem of productItem.feedbacks) {    
                feebacksContent = feebacksContent + `
                <div>
                    <p id="fb-${productItem.id}-${feedbackItem.id}">${feedbackItem.feedback}</p>
                    <button id="fbdel-${productItem.id}-${feedbackItem.id}">Удалить</button>
                </div>`
            }
            feebacksDiv.innerHTML = feebacksContent;
            feebacksDiv.style.display = "none";

            for (const feedbackItem of productItem.feedbacks) {    
                let delBtn = document.getElementById(`fbdel-${productItem.id}-${feedbackItem.id}`);

                delBtn.addEventListener("click", () => {
                    let fbEl = document.getElementById(`fb-${productItem.id}-${feedbackItem.id}`);
                    
                    let productIdPos = delBtn.id.indexOf('-') + 1;
                    let feedbackIdPos = delBtn.id.lastIndexOf('-');
                    const productId = delBtn.id.substring(productIdPos, feedbackIdPos);
                    const feedbackId = delBtn.id.substring(feedbackIdPos + 1);

                    let parent = delBtn.parentNode;
                    parent.removeChild(fbEl);
                    parent.removeChild(delBtn);

                    const deleteParent = deleteFeedback(productId, feedbackId);

                    if (deleteParent) {
                         parent.parentNode.parentNode.parentNode.removeChild(parent.parentNode.parentNode);                     
                    }
                })
            }
        }        
    }
}

allFeedbacks();

addBtn.addEventListener("click", () => {
        window.open("feedback.html", "_self");
    })