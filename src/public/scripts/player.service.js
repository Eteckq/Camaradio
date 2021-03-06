class PlayerService {
  player;

  constructor() {
    let accessToken = getCookie("access_token");

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = accessToken;

      const player = new Spotify.Player({
        name: "Camaradio",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      // Error handling
      this.player.addListener("initialization_error", ({ message }) => {
        //console.error(message);
      });
      this.player.addListener("authentication_error", ({ message }) => {
        // console.error(message);
      });
      this.player.addListener("account_error", ({ message }) => {
        //console.error(message);
      });
      this.player.addListener("playback_error", ({ message }) => {
        // console.error(message);
      });

      // Playback status updates
      this.player.addListener("player_state_changed", (state) => {
        // console.log(state);
      });

      // Ready
      this.player.addListener("ready", ({ device_id }) => {
        // console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      this.player.addListener("not_ready", ({ device_id }) => {
        //console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      this.player.connect();
    };
  }
}
