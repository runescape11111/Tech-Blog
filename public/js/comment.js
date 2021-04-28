const newComment = async event => {
    event.preventDefault();
    const reply = document.getElementById("post-reply").value.trim();
    const urlSplit = window.location.href.split("/");
    const post_id = urlSplit[urlSplit.length-1];

    if (reply && post_id) {
        const response = await fetch("/api/comment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({reply,post_id})
        });

        if (response.ok) {
            alert("Comment successful");
            document.location.replace(`/post/${post_id}`);
        } else {
            alert("Comment failed");
        }
    }
};

document.getElementById("comment-form").addEventListener("submit",newComment);