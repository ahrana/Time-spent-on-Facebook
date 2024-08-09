function createScroller(notes) {
  let scroller = document.createElement("div");
  scroller.id = "note-scroller";
  scroller.style.position = "fixed";
  scroller.style.top = "50px"; // Adjust based on the bookmark bar position
  scroller.style.width = "100%";
  scroller.style.overflow = "hidden";
  scroller.style.whiteSpace = "nowrap";
  scroller.style.backgroundColor = "#f1f1f1";
  scroller.style.zIndex = "1000";
  scroller.style.borderBottom = "1px solid #ccc";
  scroller.style.padding = "10px 0";
  scroller.style.boxShadow = "0 4px 2px -2px gray";

  notes.forEach(note => {
    let span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.padding = "0 20px";
    span.style.fontSize = "16px";
    span.style.color = "#333";
    span.textContent = note;
    scroller.appendChild(span);
  });

  document.body.appendChild(scroller);
}

chrome.storage.sync.get("notes", (data) => {
  createScroller(data.notes || []);
});
