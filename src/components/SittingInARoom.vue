<template>
  <div class="room">
    <div class="text">
      <div class="headline text-h2">I am sitting in a room</div>
      <p class="full-text text-justify text-h4 font-weight-light">
        different from the one you are in now. I am recording the sound of my
        speaking voice and I am going to play it back into the room again and
        again until the resonant frequencies of the room reinforce themselves so
        that any semblance of my speech, with perhaps the exception of rhythm,
        is destroyed. What you will hear, then, are the natural resonant
        frequencies of the room articulated by speech. I regard this activity
        not so much as a demonstration of a physical fact, but more as a way to
        smooth out any irregularities my speech might have.
      </p>
    </div>

    <div class="recorder">
      <button @click="clickButton()">
        <p v-if="this.state == 'ready'">Start recording</p>
        <p v-if="this.state == 'recording'">Finish recording</p>
        <p v-if="this.state == 'playback'">Reset recording</p>
      </button>
      <v-dialog v-model="info" width="600px">
        <template v-slot:activator="{ on, attrs }">
          <button v-bind="attrs" v-on="on" class="float-right">
            <p>Info</p>
          </button>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
          <v-card-text>
            <a class="text-black" href="https://en.wikipedia.org/wiki/I_Am_Sitting_in_a_Room"><i>I am sitting in a room</i></a>
            is a sonic piece by Alvin Lucier
            which was first performed 1969.
            By recording spoken text in a room and playing back this recorded
            text in the same room while recording the playback again
            the resonance frequencies will get more dominant
            with each iteration.
            <v-spacer></v-spacer>
            This website tries to make it possible to try out this experiment
            in your own environment, although transparent audio playback and capture
            equipment is advised as otherwise one will hear the characteristics
            of the equipment instead of the resonance frequencies of the room.
            <br/><br/>
            The recordings you are making via this website are not send or
            stored anywhere and only exist in your local browser.
            The source code of this website is hosted at
            <a href="https://github.com/capital-G/I-am-sitting-in-a-room">GitHub</a>.
            <br/><br/>
            <h4>Imprint</h4>
            This website was build as dedication to one of the most interesting
            sonic pioneer of our time.
            If this violates the right of any right-holders please contact me
            to take down the site.<br/>
            <h5>Contact</h5>
            Dennis Scheiba<br/>
            Aachener Str. 450<br/>
            50933 Köln<br/>
            Mail: mail /at/ dennis.scheiba /dot/ com
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <button text @click="info = false">
              Close
            </button>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      info: false,
    };
  },
  methods: {
    clickButton() {
      if (this.state == "ready") {
        this.startRecording();
        this.state = "recording";
      } else if (this.state == "recording") {
        this.stopRecording();
        this.state = "playback";
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
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  padding-top: 5%;
}

a{
  color: black;
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

.full-text{
  padding-top: 2%;
  padding-bottom: 5%;
}


</style>
