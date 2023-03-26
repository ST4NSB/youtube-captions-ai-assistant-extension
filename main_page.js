async function main() {
  try {
    const captions = await getYoutubeVideoCaptions("qLGmj86-j4k");
    console.log(captions);
  } catch (err) {
    const msg = `YouTube captions AI assistant - main_page.js - ${err}`;
    console.error(msg);
  }
}

window.onload = function () {
  main();
};
