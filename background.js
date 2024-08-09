let startTime;
let totalTime = 0;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes("facebook.com") && changeInfo.status === 'complete') {
    startTime = Date.now();
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (!tab.url.includes("facebook.com")) {
      if (startTime) {
        totalTime += Date.now() - startTime;
        startTime = null;
        chrome.storage.local.set({ facebookTime: totalTime });
      }
    } else {
      startTime = Date.now();
    }
  });
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (startTime) {
      totalTime += Date.now() - startTime;
      startTime = null;
      chrome.storage.local.set({ facebookTime: totalTime });
    }
  } else {
    chrome.windows.get(windowId, {}, window => {
      chrome.tabs.query({ active: true, windowId: windowId }, tabs => {
        if (tabs[0].url.includes("facebook.com")) {
          startTime = Date.now();
        }
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFacebookTime") {
    sendResponse({ facebookTime: totalTime });
  }
});
