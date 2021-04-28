const newPost = async event => {
    event.preventDefault();
    const title = document.getElementById("post-title").value.trim();
    const text = document.getElementById("post-text").value.trim();

    if (title && text) {
        const response = await fetch("/api/post", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title,text})
        });

        if (response.ok) {
            alert("Post successful");
            document.location.replace("/");
        } else {
            alert("Post failed");
        }
    }
};

document.getElementById("post-form").addEventListener("submit",newPost);