const startBtn = document.getElementById("start");
const startMicBtn = document.getElementById("start-mic");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const stopBtn = document.getElementById("stop");
const previewBox = document.getElementById("preview-box");
const previewBoxVideo = document.querySelector("#preview-box video");
const downloadBtn = document.querySelector("#preview-box .download");
const saveBtn = document.querySelector("#preview-box .save");
const cancelBtn = document.querySelector("#preview-box .cancel");
const historyEl = document.getElementById("history");
let chunks = [];
let recorder, stream, blob, num_of_videos;

var store = localforage.createInstance({
  name: "screenio",
});

// create date string
function getDateString() {
  var now = new Date();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var year = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return `${month}-${day}-${year} ${hour}:${minute}:${second}`;
}

async function startRecording(withMic = false) {
  try {
    if (withMic) {
      // Start recording displayStream
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      // voiceStream for recording voice with screen recording
      const voiceStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const result = await navigator.permissions.query({ name: "microphone" });
      if (result.state == "granted") {
        console.log("can use mic");
        let tracks = [
          ...displayStream.getTracks(),
          ...voiceStream.getAudioTracks(),
        ];
        stream = new MediaStream(tracks);
      } else if (result.state == "denied") {
        stream = displayStream;
      }
    } else {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        stopRecording();
      };
    });

    // Reset stream data
    chunks = [];
    recorder = new MediaRecorder(stream);

    // Listen to recorder events
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = (event) => {
      stopRecording(chunks);
    };

    recorder.start();
  } catch (error) {
    if (error.name === "NotAllowedError") {
      resetScreen();
    }
  }
}

const stopRecording = () => {
  startBtn.classList.remove("hidden");
  startMicBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  resumeBtn.classList.add("hidden");
  stopBtn.classList.add("hidden");
  // displayStream.getVideoTracks()[0].stop();
  let tracks = stream.getTracks();
  for (let track of tracks) {
    track.stop();
  }
  if (chunks.length > 0) {
    blob = new Blob(chunks, { type: "video/webm" });
    blob.name = "screenio-" + getDateString() + ".webm";
    const url = URL.createObjectURL(blob);
    previewBoxVideo.src = url;
    previewBox.classList.remove("hidden");
  }

  // previewBoxVideo.play();
};

const saveVideo = () => {
  // Save blob to indexeddb
  if (!blob) {
    alert("No video to save. Record a new one?");
    return;
  }
  const name = prompt("Enter file name:");
  const filename = name + "-" + getDateString();
  store
    .setItem(filename ? filename : blob.name, blob)
    .then(() => {
      const noVideoEl = document.querySelector(".no-videos");
      if (noVideoEl) {
        noVideoEl.remove();
      }
      appendVideo(blob, filename);
      blob = undefined;
      alert("saved video successfully");
      num_of_videos++;
      previewBox.classList.add("hidden");
    })
    .catch((error) => {
      console.log(error);
    });
};

const downloadVideo = () => {
  if (!blob) {
    alert("No video to download. Record a new one?");
    return;
  }
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  const filename = prompt("Enter file name:");
  a.download = filename ? filename : blob.name;
  a.click();
  window.URL.revokeObjectURL(url);
  previewBox.classList.add("hidden");
  blob = undefined;
};

const deleteVideo = (e) => {
  const key = e.target.dataset.key;
  store
    .removeItem(key)
    .then(() => {
      console.log(`deleted ${key}`);
      const delVideoEl = historyEl.querySelector(`div[data-key="${key}"]`);
      delVideoEl.remove();
      num_of_videos--;
      if (num_of_videos < 1) {
        renderNoVideos();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

startBtn.addEventListener("click", (e) => {
  pauseBtn.classList.remove("hidden");
  stopBtn.classList.remove("hidden");
  e.target.classList.add("hidden");
  startMicBtn.classList.add("hidden");
  startRecording();
});

startMicBtn.addEventListener("click", (e) => {
  pauseBtn.classList.remove("hidden");
  stopBtn.classList.remove("hidden");
  e.target.classList.add("hidden");
  startBtn.classList.add("hidden");
  startRecording(true);
});

pauseBtn.addEventListener("click", (e) => {
  recorder.pause();
  e.target.classList.add("hidden");
  resumeBtn.classList.remove("hidden");
});

resumeBtn.addEventListener("click", (e) => {
  recorder.resume();
  e.target.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
});

stopBtn.addEventListener("click", (e) => {
  recorder.stop();
  e.target.classList.add("hidden");
  startBtn.classList.remove("hidden");
  startMicBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  resumeBtn.classList.add("hidden");
});

saveBtn.addEventListener("click", () => {
  // Save blob to indexeddb
  saveVideo();
});

downloadBtn.addEventListener("click", () => {
  // Save file to disk
  downloadVideo();
});

const appendVideo = (data, key) => {
  const videoEl = document.createElement("video");
  const title = document.createElement("h4");
  const deleteBtn = document.createElement("span");
  deleteBtn.dataset.key = key;
  deleteBtn.textContent = "Delete Video";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = deleteVideo;
  const date = document.createElement("span");
  title.textContent = key.substring(0, key.indexOf("-"));
  date.textContent =
    " created: " + key.substring(key.indexOf("-") + 1, key.length);
  title.appendChild(date);
  title.appendChild(deleteBtn);
  const url = URL.createObjectURL(data);
  videoEl.src = url;
  videoEl.controls = true;
  const div = document.createElement("div");
  div.appendChild(title);
  div.appendChild(videoEl);
  div.dataset.key = key;
  historyEl.prepend(div);
};

const fetchSavedVideos = () => {
  const keys = [];
  num_of_videos = 0;
  store
    .iterate((value, key) => {
      appendVideo(value, key);
      keys.push(key);
      num_of_videos++;
    })
    .then(() => {
      console.log("completed fetching videos");
      if (keys.length < 1) {
        renderNoVideos();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderNoVideos = () => {
  historyEl.previousElementSibling.classList.add("hidden");
  historyEl.innerHTML = `
        <div class="no-videos">
          <h4>No Videos Added to Library</h4>
          <p>Every time you save a new video, you’ll find it here. Only you can manage videos in this library.</p>
        </div>
      `;
};
// store.clear();
fetchSavedVideos();

const resetScreen = () => {
  window.location.reload();
};

cancelBtn.addEventListener("click", resetScreen);
