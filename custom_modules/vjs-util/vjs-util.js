(() => {
  const vjsUtil = {
    /**
     * プレイヤーにVTTファイルをセットする
     * 
     * @param {object} player videojs playerインスタンス
     * @param {string} url VTTファイルのURL
     */
    setVTT(player, url) {
      this.removeVTT(player);
      const captionOption = {
        id: 'video-vtt-track',
        kind: 'captions',
        src: url
      };
      const trackElement = player.addRemoteTextTrack(captionOption, true);
      trackElement.addEventListener('load', () => {
        const tracks = player.remoteTextTracks();
        for (let i = -1, l = tracks.length; ++i < l;) {
          const track = tracks[i];
          track.mode = 'showing';
        }
      });
    },
    /**
     * プレイヤーからVTTファイルを削除する
     * 
     * @param {object} player videojs playerインスタンス
     */
    removeVTT(player) {
      const tracks = player.remoteTextTracks();
      for (let i = -1, l = tracks.length; ++i < l;) {
        const track = tracks[i];
        player.removeRemoteTextTrack(track);
      }
    },
    /**
     * プレイヤーのVTTキャプションを再描画する
     * 
     * @param {object} player videojs playerインスタンス
     */
    refreshVTT(player) {
      const tracks = player.remoteTextTracks();
      if (!tracks.length) {
        return;
      }
      const track = tracks[0];
      this.setVTT(player, track.src);
    }
  };

  module.exports = vjsUtil;
  window.vjsUtil = vjsUtil;
})();
