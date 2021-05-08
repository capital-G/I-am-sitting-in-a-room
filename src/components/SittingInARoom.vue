<template>
  <div class="room">
    <div class="text">
      <div class="headline"><h1>I am sitting in a room</h1></div>
      different from the one you are in now. I am recording the sound of my
      speaking voice and I am going to play it back into the room again and
      again until the resonant frequencies of the room reinforce themselves so
      that any semblance of my speech, with perhaps the exception of rhythm, is
      destroyed. What you will hear, then, are the natural resonant frequencies
      of the room articulated by speech. I regard this activity not so much as a
      demonstration of a physical fact, but more as a way to smooth out any
      irregularities my speech might have.
    </div>

    <div class="recorder">
      <button @click="clickButton()">
        <p v-if='this.state == "ready"'>Start recording</p>
        <p v-if='this.state == "recording"'>Finish recording</p>
        <p v-if='this.state == "playback"'>Reset recording</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SittingInARoom",
  props: {},
  data() {
    return {
      recorder: null,
      isRecording: false,
      recordingStream: [],
      playbackAudio: null,
      state: "ready",
    };
  },
  methods: {
    clickButton() {
      if(this.state == "ready"){
        this.startRecording();
        this.state="recording";
      } else if(this.state == "recording") {
        this.stopRecording();
        this.state="playback";
      } else {
        console.log("Panic");
        this.playbackAudio.pause();
        this.recorder = null;
        this.state = "ready";
      }
    },

    startRecording() {
      console.log("Start recording");
      // see https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
      var device = navigator.mediaDevices.getUserMedia({ audio: true });
      device.then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.start();
        this.recorder.addEventListener("dataavailable", (event) => {
          this.recordingStream.push(event.data);
        });
      });
    },
    stopRecording() {
      console.log("Stop recording");
      this.recorder.stop();

      this.recorder.addEventListener("stop", () => {
        const blob = new Blob(this.recordingStream);
        const audioURL = window.URL.createObjectURL(blob);
        this.playbackAudio = new Audio(audioURL);
        this.recordingStream = [];
        // wait
        this.startRecording();
        this.playbackAudio.play();
        this.playbackAudio.addEventListener("ended", () => {
          console.log("Playback finished");
          this.stopRecording();
        })
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.headline {
  background-color: #2c3e50;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.text {
  font-size: 5vh;
}
</style>
