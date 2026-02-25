async function togglePiP(tab) {
    if (!tab.url.includes("youtube.com")) return;

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
}

chrome.commands.onCommand.addListener(async (command) => {
    if (command === "toggle-pip") {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        togglePiP(tab);
    }
});