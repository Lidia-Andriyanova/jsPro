const feedbacksKey = "feedbacks";

function addFeedback(product, feedback) {

    let id = Date.now();

    if (localStorage.getItem(feedbacksKey)) {
        const feedbackList = JSON.parse(localStorage.getItem(feedbacksKey));

        const productEl = feedbackList.find((el) => {
            return el.product === product;
        }) || null;
        
        if (productEl) {
            productEl.feedbacks.push({id, feedback});
        } else {
            const newProductEl = {id, product};
            id++;
            newProductEl.feedbacks = [{id, feedback}];
            feedbackList.push(newProductEl);
        }
        localStorage.setItem(feedbacksKey, JSON.stringify(feedbackList));
    } else {
        const feedbacks = [{id, feedback}];
        id++;
        localStorage.setItem(feedbacksKey, JSON.stringify([{id, product, feedbacks}]));
    }
}

function getFeedbacks() {
    return localStorage.getItem(feedbacksKey) ? JSON.parse(localStorage.getItem(feedbacksKey)) : null;
}

function deleteFeedback(productId, feedbackId) {
    let deleteProduct = false;

    if (localStorage.getItem(feedbacksKey)) {
        const feedbackList = JSON.parse(localStorage.getItem(feedbacksKey));    
        
        const product = feedbackList.find((el) => {
            return el.id == productId;
        }) || null;

        if (product) {
            const feedback = product.feedbacks.find((el) => {
                return el.id == feedbackId;
            })

            product.feedbacks.splice(product.feedbacks.indexOf(feedback), 1);

            if (product.feedbacks.length === 0) {
                feedbackList.splice(feedbackList.indexOf(product), 1);
                deleteProduct = true;
            }

            localStorage.setItem(feedbacksKey, JSON.stringify(feedbackList));
        }
    }
    return deleteProduct;    
}