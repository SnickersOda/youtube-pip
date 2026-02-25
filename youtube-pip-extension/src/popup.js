document.getElementById("toggle").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.includes("youtube.com")) {
        alert("Открой YouTube вкладку");
        return;
    }

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const video = document.querySelector("video");
            if (!video) return;

            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                video.requestPictureInPicture();
            }
        }
    });

    window.close();
});