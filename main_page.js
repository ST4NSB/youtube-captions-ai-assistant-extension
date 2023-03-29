let rendered = false;
let oldPageUrl = "";

function createMutationObserver() {
  const observer = new MutationObserver(async (mutationsList, observer) => {
    try {
      const currentPageUrl = window.location.href;
      if (oldPageUrl !== currentPageUrl || !rendered) {
        if (oldPageUrl !== currentPageUrl) {
          oldPageUrl = currentPageUrl;
          rendered = false;
        }

        if (!rendered) {
          const config = getMainConfig();
          const youtubeComponent = document.getElementById("above-the-fold");
          if (document.contains(youtubeComponent)) {
            rendered = true;

            const videoId = getYoutubeVideoId();
            if (videoId === null) {
              throw new Error("Couldn't fetch videoId.");
            }

            renderChatBox();
            createChatConversation(await getAllQuestionPairs(videoId));
            const captions = await getYoutubeVideoCaptionBuckets(videoId);
            if (config.DEBUG) {
              console.log("YouTube-VideoID:", videoId);
              console.log("YouTube-Captions:", captions);
            }

            renderChatGptEventListeners(videoId, captions);
          }
        }
      }
    } catch (err) {
      const msg = `Error: ${err}. - YouTube video AI assistant, main_page.js, mutationObserver.`;
      console.error(msg);
      alert(msg);
    }
  });

  const observerConfig = {
    childList: true,
    subtree: true,
  };

  observer.observe(document.documentElement, observerConfig);
}

window.onload = function () {
  createMutationObserver();
};
