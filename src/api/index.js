// 3.3.对所有封装组件的网络请求在main.js中统一管理，一并导出
import {Recommend,songList} from './Home';
import {HotSong,hotSongList} from './Search'
import {getSongById,getLyricById} from './Play'
import {playList} from './PlayList'

export const RecommendAPI=Recommend
export const songListAPI=songList
export const HotSongAPI=HotSong
export const hotSongListAPI=hotSongList
export const getSongByIdAPI=getSongById
export const getLyricByIdAPI=getLyricById
export const playListAPI=playList
