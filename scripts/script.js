new Vue({
    el: "#app",
    data() {
      return {
        audio: null,
        circleLeft: null,
        barWidth: null,
        duration: null,
        currentTime: null,
        isTimerPlaying: false,
        tracks: [
          {
            name: "All Time Low",
            artist: "Jon Bellion, Stormzy",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/all_time_low.jpg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/All_Time_Low.mp3",
            url: "https://youtu.be/AXnqkVTFUqY",
            favorited: false
          },
          {
            name: "Weak when ur around",
            artist: "Blackbear",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/blackbear.jpeg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Blackbear.mp3",
            url: "https://youtu.be/gk2fKTitijs",
            favorited: true
          },
          {
            name: "Bloom",
            artist: "Dabin, Dia Frampton",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/bloom_dabin.jpeg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Bloom.mp3",
            url: "https://youtu.be/MVvclgDMtps",
            favorited: false
          },
          {
            name: "Channa Mereya - Unplugged",
            artist: "Pritam, Arijit Singh",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/channa_mereya-unplugged.jpg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Channa_Mereya.mp3",
            url: "https://youtu.be/PYzFp5o4lhE",
            favorited: true
          },
          {
            name: "Falling",
            artist: "Trever Daniel",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/falling.png",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Falling.mp3",
            url: "https://youtu.be/L7mfjvdnPno",
            favorited: false
          },
          {
            name: "Kun Faya Kun",
            artist: "A.R. Rahman",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/kun_faya_kun.jpeg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Kun_Faya_Kun.mp3",
            url: "https://youtu.be/T94PHkuydcw",
            favorited: true
          },
          {
            name: "Love Is Gone - Acoustic",
            artist: "SLANDER",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/love_is_gone-acoustic.jpeg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Love_Is_Gone.mp3",
            url: "https://youtu.be/hCrtcVDgCGw",
            favorited: true
          },
          {
            name: "Pehli Dafa",
            artist: "Atif Aslam",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/pehli_dafa.jpeg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/music/Pehli_Dafa.mp3",
            url: "https://youtu.be/SxTYjptEzZs",
            favorited: false
          },
          {
            name: "Saansein",
            artist: "Prateek Kuhad",
            cover: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets/img/saansein.jpg",
            source: "https://raw.githubusercontent.com/hafizmp/Music-Application/master/Assets//music/Saansein.mp3",
            url: "https://youtu.be/R3Ed4zvQ0Hs",
            favorited: false
          }
        ],
        currentTrack: null,
        currentTrackIndex: 0,
        transitionName: null
      };
    },
    methods: {
      play() {
        if (this.audio.paused) {
          this.audio.play();
          this.isTimerPlaying = true;
        } else {
          this.audio.pause();
          this.isTimerPlaying = false;
        }
      },
      generateTime() {
        let width = (100 / this.audio.duration) * this.audio.currentTime;
        this.barWidth = width + "%";
        this.circleLeft = width + "%";
        let durmin = Math.floor(this.audio.duration / 60);
        let dursec = Math.floor(this.audio.duration - durmin * 60);
        let curmin = Math.floor(this.audio.currentTime / 60);
        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
        this.duration = durmin + ":" + dursec;
        this.currentTime = curmin + ":" + cursec;
      },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.offsetLeft;
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },
      prevTrack() {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      nextTrack() {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      resetPlayer() {
        this.barWidth = 0;
        this.circleLeft = 0;
        this.audio.currentTime = 0;
        this.audio.src = this.currentTrack.source;
        setTimeout(() => {
          if(this.isTimerPlaying) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }, 300);
      },
      favorite() {
        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
          this.currentTrackIndex
        ].favorited;
      }
    },
    created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function() {
        vm.generateTime();
      };
      this.audio.onloadedmetadata = function() {
        vm.generateTime();
      };
      this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
      };
  
      // this is optional (for preload covers)
      for (let index = 0; index < this.tracks.length; index++) {
        const element = this.tracks[index];
        let link = document.createElement('link');
        link.rel = "prefetch";
        link.href = element.cover;
        link.as = "image"
        document.head.appendChild(link)
      }
    }
  });