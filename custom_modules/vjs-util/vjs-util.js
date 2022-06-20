(() => {
  const vjsUtil = {
    /**
     * プレイヤーにVTTファイルをセットする
     * 
     * @param {object} player videojs playerインスタンス
     * @param {object} url VTTファイルのURL
     */
    setVTT(player, url) {
      this.removeVTT(player);
      if (url.captions) {
        const captionOption = {
          id: 'video-vtt-track',
          kind: 'captions',
          src: url.captions
        };
        const trackElement = player.addRemoteTextTrack(captionOption, true);
        trackElement.addEventListener('load', () => {
          const tracks = player.remoteTextTracks();
          for (let i = -1, l = tracks.length; ++i < l;) {
            const track = tracks[i];
            track.mode = 'showing';
          }
        });
      }

      if (url.chapters) {
        var option = {
          id: 'video-vtt-track-chapter',
          kind: 'chapters',
          src: url.chapters
        };
        player.addRemoteTextTrack(option, true);
      }
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
      var vttUrls = {};
      [].forEach.call(tracks, (track) => {
        if (track.kind === 'captions') {
          vttUrls['captions'] = track.src;
        } else if (track.kind === 'chapters') {
          vttUrls['chapters'] = track.src;
        }
      });
      this.setVTT(player, vttUrls);
    }
  };

  module.exports = vjsUtil;
  window.vjsUtil = vjsUtil;
})();
