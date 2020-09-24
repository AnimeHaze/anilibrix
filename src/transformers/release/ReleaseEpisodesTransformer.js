// Transformer
import BaseTransformer from "@transformers/BaseTransformer";

// Utils
import __merge from 'lodash/merge'

// Parsing episode data
import {parsePlaylist, parseTorrents} from "@utils/episodes";


export default class ReleaseEpisodesTransformer extends BaseTransformer {

  /**
   * ReleaseEpisodesTransformer constructor
   *
   */
  constructor() {
    super();
    this.store = null;
    this.cancelToken = null;
    this.skipTorrents = false;
  }

  /**
   * Set store
   *
   * @param store
   * @return {ReleaseEpisodesTransformer}
   */
  setStore(store) {
    this.store = store;
    return this;
  }


  /**
   * Set cancel token
   *
   * @param cancelToken
   * @return {ReleaseEpisodesTransformer}
   */
  setCancelToken(cancelToken) {
    this.cancelToken = cancelToken;
    return this;
  }

  /**
   * Set skip torrents
   *
   * @param skip
   * @return {ReleaseEpisodesTransformer}
   */
  setSkipTorrents(skip = true) {
    this.skipTorrents = skip;
    return this;
  }


  /**
   * Method used to transform a fetched collection.
   *
   * @param release The items to be transformed.
   * @returns {Array} The transformed items.
   */
  async fetchCollection(release) {
    return await this.fetch(release);
  }


  /**
   * Make fetch item async/await
   *
   * @param release
   * @return {Promise<*>}
   */
  async fetchItem(release) {
    return await this.fetch(release);
  }

  /**
   * Transform episodes data
   *
   * @param release
   * @returns Promise
   */
  async fetch(release) {

    // Parse episodes from release torrents files
    const torrent_episodes = await parseTorrents(this.get(release, 'torrents') || [], {
      cancel_token: this.cancelToken,
      skip_torrents: this.skipTorrents,
      torrents_enabled: this._getTorrentsEnabledSetting(),
    });

    // Parse episodes from release playlist links
    const playlist_episodes = parsePlaylist(this.get(release, 'playlist') || []);

    // Filter all sources without payload
    // Reverse order -> first in array === last in release
    return Object
      .values(__merge(torrent_episodes, playlist_episodes))
      .map(episode => ({...episode, sources: episode.sources.filter(source => source.payload !== null)}))
      .filter(episode => episode.sources && episode.sources.length > 0)
      .reverse();
  }


  /**
   * Get torrents enabled settings flag from store
   *
   * @return {boolean}
   * @private
   */
  _getTorrentsEnabledSetting() {
    return this.get(this.store, 'state.app.settings.player.torrents.enabled') === true;
  }

}
