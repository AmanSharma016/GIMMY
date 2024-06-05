let comment = document.querySelector(".comment");
document.addEventListener("click", () => {
    console.log("comment added");
    input();
});

let flag = true;
function input() {
    if (flag === true) {
        let input1 = document.createElement("input");
        let publish1 = document.createElement("button");
        publish1.innerText = "Publish";
        input1.classList.add("input");
        publish1.classList.add("publish__btn");
        input1.type = "text";
        input1.placeholder = "Add your precious review 1";
        comment.parentNode.appendChild(input1);
        comment.parentNode.appendChild(publish1);

        flag = false;

        publish1.addEventListener("click", () => {
            handlePublish(input1);
        });

        publish2.addEventListener("click", () => {
            handlePublish(input2);
        });
    }
}

function handlePublish(input) {
    let inputValue = input.value.trim();
    if (inputValue === "") {
        alert("Please give your review");
    } else {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("newComment");

        let commentText = document.createElement("p");
        commentText.innerText = inputValue;

        commentDiv.appendChild(commentText);
        comment.parentNode.appendChild(commentDiv);
        input.value = ''; 
        vanish(); 
    }
}

function vanish() {
    let erase = document.querySelector(".erase");
    erase.style.display = 'none';
}


console.log("thank me later for updates!");