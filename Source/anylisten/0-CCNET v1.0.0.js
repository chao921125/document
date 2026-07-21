/**
 * @name CCNET
 * @description 自定义音源脚本，支持多平台多链路自动回退
 * @version 1.0.0
 * @author CCNET
 * @homepage https://lxmusic.toside.cn/desktop/custom-source
 */

// ════════════════════════════════════════════════════════════════
// 第一部分：全局配置区（修改此区域即可自定义脚本行为）
// ════════════════════════════════════════════════════════════════

/**
 * 平台配置
 * key: 平台ID（对应 LX Music 内置的 kw/kg/tx/wy/mg）
 * name: 平台显示名称
 * qualitys: 该平台支持的音质列表（按优先级从高到低排列）
 */
const PLATFORM_CONFIG = {
  wy:    { name: '网易云音乐', qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
  tx:    { name: 'QQ音乐',     qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
  kw:    { name: '酷我音乐',   qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
  kg:    { name: '酷狗音乐',   qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
  mg:    { name: '咪咕音乐',   qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
  local: { name: '本地音乐',   qualitys: [], actions: ['musicUrl', 'pic', 'lyric'] },
};

/**
 * 缓存配置
 */
const CACHE_CONFIG = {
  ttlMs: 21600000,    // 缓存过期时间（毫秒），默认6小时
  maxSize: 500,       // 缓存最大条目数
};

/**
 * 回退策略配置
 * parallelCount: 首次并发尝试的音源数量
 * retryDelay: 顺序回退时每个源之间的间隔（毫秒，0表示无间隔）
 */
const FALLBACK_CONFIG = {
  parallelCount: 3,
  retryDelay: 0,
};

/**
 * HTTP 请求默认超时（毫秒）
 */
const DEFAULT_TIMEOUT = 5000;

// ════════════════════════════════════════════════════════════════
// 第二部分：音源 Provider 注册区（扩展新音源只需在此添加）
// ════════════════════════════════════════════════════════════════

/**
 * Provider 接口规范：
 * {
 *   name: string,              // 音源名称（用于日志和错误提示）
 *   platforms: string[],       // 支持的平台ID列表，如 ['wy', 'tx', 'kw']
 *   qualitys: string[],        // 支持的音质列表，如 ['128k', '320k', 'flac']
 *   getUrl: async (platform, songId, quality, songInfo) => string
 *                              // 获取播放URL的核心方法，返回音频URL字符串
 * }
 *
 * 添加新音源步骤：
 * 1. 在下方实现一个 provider 对象
 * 2. 将其加入 PROVIDERS 数组
 * 3. 框架会自动将其纳入回退链
 */

// --- Provider: 星海主API ---
const xinghaiMainProvider = {
  name: '星海主',
  platforms: ['wy', 'tx', 'kw', 'kg', 'mg'],
  qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit'],

  // 平台ID → 星海API源名称
  _platformMap: { wy: 'netease', tx: 'tencent', kw: 'kuwo', kg: 'kugou', mg: 'migu' },
  // 音质 → 星海API码率
  _qualityBrMap: { '128k': '128', '192k': '192', '320k': '320', flac: '740', flac24bit: '999', '24bit': '999' },
  // API端点
  _apiUrl: 'https://music-api.gdstudio.xyz/api.php?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light',

  async getUrl(platform, songId, quality, songInfo) {
    const source = this._platformMap[platform];
    if (!source) throw new Error('星海主不支持该平台');
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('星海主缺少歌曲ID');
    const selectedQuality = selectQuality(quality, this.qualitys);
    const br = this._qualityBrMap[selectedQuality];
    if (!br) throw new Error('星海主音质映射失败');
    const url = this._apiUrl + '&types=url&source=' + source + '&id=' + encodeURIComponent(id) + '&br=' + br;
    const res = await httpRequest(url, {
      method: 'GET',
      headers: { 'User-Agent': 'LX-Music-Mobile', Accept: 'application/json' },
    });
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    if (!body || typeof body !== 'object' || !body.url) {
      throw new Error(body?.message || '星海主未返回可用URL');
    }
    return body.url;
  },
};

// --- Provider: 星海备API ---
const xinghaiBackupProvider = {
  name: '星海备',
  platforms: ['wy', 'tx', 'kw'],
  qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit'],

  _platformMap: { wy: 'netease', tx: 'qq', kw: 'kuwo' },
  _apiUrl: 'https://music-dl.sayqz.com/api/',

  async getUrl(platform, songId, quality, songInfo) {
    const source = this._platformMap[platform];
    if (!source) throw new Error('星海备不支持该平台');
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('星海备缺少歌曲ID');
    const selectedQuality = selectQuality(quality, this.qualitys);
    return this._apiUrl + '?source=' + encodeURIComponent(source) + '&id=' + encodeURIComponent(id) + '&type=url&br=' + encodeURIComponent(selectedQuality);
  },
};

// --- Provider: Huibq API ---
const huibqProvider = {
  name: 'Huibq',
  platforms: ['wy', 'tx', 'kw', 'kg', 'mg'],
  qualitys: ['128k', '320k'],

  _apiUrl: 'https://lxmusicapi.onrender.com',
  _requestKey: 'share-v3',

  async getUrl(platform, songId, quality, songInfo) {
    const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
    if (!hashOrMid) throw new Error('Huibq缺少hash/songmid');
    const selectedQuality = selectQuality(quality, this.qualitys);
    const url = this._apiUrl + '/url/' + platform + '/' + encodeURIComponent(hashOrMid) + '/' + encodeURIComponent(selectedQuality);
    const res = await httpRequest(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getMobileUserAgent(),
        'X-Request-Key': this._requestKey,
      },
    });
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    if (!body || typeof body !== 'object' || Number.isNaN(Number(body.code))) {
      throw new Error('Huibq返回无效');
    }
    switch (Number(body.code)) {
      case 0:
        if (!body.url) throw new Error('Huibq返回空URL');
        return body.url;
      case 1: throw new Error('Huibq block ip');
      case 2: throw new Error('Huibq get music url failed');
      case 4: throw new Error('Huibq too many requests');
      case 5: throw new Error('Huibq param error');
      case 6: throw new Error('Huibq internal server error');
      default: throw new Error(body.message || 'Huibq unknown error');
    }
  },
};

// --- Provider: 聆川API ---
const lingchuanProvider = {
  name: '聆川',
  platforms: ['wy', 'tx', 'kw', 'kg', 'mg'],
  qualitys: ['128k', '320k'],

  _apiUrl: 'https://lc.guoyue2010.top/api/music',

  async getUrl(platform, songId, quality, songInfo) {
    const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
    if (!hashOrMid) throw new Error('聆川缺少hash/songmid');
    const selectedQuality = selectQuality(quality, this.qualitys);
    const url = this._apiUrl + '/url?source=' + encodeURIComponent(platform) + '&songId=' + encodeURIComponent(hashOrMid) + '&quality=' + encodeURIComponent(selectedQuality);
    const res = await httpRequest(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'User-Agent': getMobileUserAgent() },
      follow_max: 5,
    });
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    if (!body || typeof body !== 'object' || Number.isNaN(Number(body.code))) {
      throw new Error('聆川返回无效');
    }
    switch (Number(body.code)) {
      case 200:
        if (!body.url) throw new Error('聆川返回空URL');
        return body.url;
      case 403: throw new Error('聆川403 forbidden');
      case 429: throw new Error('聆川429 rate limit');
      case 500: throw new Error('聆川500 ' + (body.message || 'server error'));
      default: throw new Error(body.message || '聆川未知错误');
    }
  },
};

// --- Provider: 溯音QQ ---
const suyinQQProvider = {
  name: '溯音QQ',
  platforms: ['tx'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _apiUrl: 'https://oiapi.net/api/QQ_Music',
  _apiKey: 'oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575',
  _qualityBrMap: { '128k': 7, '320k': 5, flac: 4, hires: 3, atmos: 2, master: 1, '24bit': 1 },

  async getUrl(platform, songId, quality, songInfo) {
    const qqId = getQQSongId(songInfo);
    if (!qqId) throw new Error('溯音QQ缺少songmid/id');
    const normalizedQuality = qualityToSuyinQQ(quality);
    const startBr = this._qualityBrMap[normalizedQuality] || this._qualityBrMap['128k'];
    const brList = [startBr, 4, 5, 7]
      .filter((val, idx, arr) => arr.indexOf(val) === idx && val >= startBr)
      .sort((a, b) => a - b);
    let lastError = null;
    for (const br of brList) {
      try {
        const reqParams = { key: this._apiKey, type: 'json', br: br, n: 1 };
        if (qqId.type === 'mid') {
          reqParams.mid = qqId.value;
        } else {
          reqParams.songid = qqId.value;
        }
        const res = await httpGet(this._apiUrl, reqParams);
        return extractQQUrl(res);
      } catch (e) {
        lastError = e;
      }
    }
    throw new Error('溯音QQ全部音质尝试失败: ' + (lastError?.message || 'unknown'));
  },
};

// --- Provider: 溯音163 ---
const suyin163Provider = {
  name: '溯音163',
  platforms: ['wy'],
  qualitys: ['128k', '320k', 'flac'],

  _apiUrl: 'https://oiapi.net/api/Music_163',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songInfo?.songmid || songInfo?.id;
    if (!id) throw new Error('溯音163缺少songmid/id');
    const res = await httpGet(this._apiUrl, { id: id });
    if (res?.code === 0 && res?.data) {
      const item = Array.isArray(res.data) ? res.data[0] : res.data;
      if (item?.url) return item.url;
    }
    throw new Error('溯音163获取失败');
  },
};

// --- Provider: 溯音酷我（搜索模式） ---
const suyinKuwoProvider = {
  name: '溯音酷我',
  platforms: ['kw'],
  qualitys: ['128k', '320k', 'flac'],

  _apiUrl: 'https://oiapi.net/api/Kuwo',
  _qualityBrMap: { flac: 1, '320k': 5, '128k': 7, '24bit': 1 },

  async getUrl(platform, songId, quality, songInfo) {
    if (!songInfo?.name) throw new Error('溯音酷我需要歌曲名');
    const cacheKey = buildCacheKey('suyin_kw', songInfo, quality);
    const cached = getCachedUrl(cacheKey);
    if (cached) return cached;
    const selectedQuality = selectQuality(quality, this.qualitys);
    const br = this._qualityBrMap[selectedQuality] || 1;
    const keywords = buildSearchKeywords(songInfo);
    let lastError = null;
    for (const item of keywords) {
      try {
        const res = await httpGet(this._apiUrl, { msg: item.keyword, n: 1, br: br });
        if (res?.data?.url) {
          if (item.strict && !songInfoMatch(res, songInfo)) {
            throw new Error('溯音酷我歌曲信息不匹配');
          }
          setCachedUrl(cacheKey, res.data.url);
          return res.data.url;
        }
        if (res?.message) {
          const match = String(res.message).match(/音乐链接[：:](\S+)/);
          if (match && match[1]) {
            if (item.strict) {
              const parsed = parseMessageSongInfo(res.message);
              if (parsed && !songInfoMatch(parsed, songInfo)) {
                throw new Error('溯音酷我歌曲信息不匹配');
              }
            }
            setCachedUrl(cacheKey, match[1]);
            return match[1];
          }
        }
      } catch (e) {
        lastError = e;
      }
    }
    throw new Error('溯音酷我失败: ' + (lastError?.message || 'unknown'));
  },
};

// --- Provider: 溯音咪咕（搜索模式） ---
const suyinMiguProvider = {
  name: '溯音咪咕',
  platforms: ['mg'],
  qualitys: ['128k', '320k', 'flac'],

  _apiUrl: 'https://api.xcvts.cn/api/music/migu',

  async getUrl(platform, songId, quality, songInfo) {
    if (!songInfo?.name) throw new Error('溯音咪咕需要歌曲名');
    const cacheKey = buildCacheKey('suyin_mg', songInfo);
    const cached = getCachedUrl(cacheKey);
    if (cached) return cached;
    const keywords = buildSearchKeywords(songInfo);
    let lastError = null;
    for (const item of keywords) {
      try {
        const res = await httpGet(this._apiUrl, { gm: item.keyword, n: 1, num: 1, type: 'json' });
        if (res?.code === 200 && res?.musicInfo) {
          if (item.strict && !songTitleMatch(res, songInfo)) {
            throw new Error('溯音咪咕歌曲信息不匹配');
          }
          setCachedUrl(cacheKey, res.musicInfo);
          return res.musicInfo;
        }
      } catch (e) {
        lastError = e;
      }
    }
    throw new Error('溯音咪咕失败: ' + (lastError?.message || 'unknown'));
  },
};

// --- Provider: 长青SVIP（模板URL） ---
const changqingVipProvider = {
  name: '长青SVIP',
  platforms: ['wy', 'tx', 'kw', 'kg', 'mg'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _templates: {
    tx: 'http://175.27.166.236/kgqq/qq.php?type=mp3&id={id}&level={level}',
    wy: 'http://175.27.166.236/wy/wy.php?type=mp3&id={id}&level={level}',
    kw: 'https://musicapi.haitangw.net/music/kw.php?type=mp3&id={id}&level={level}',
    kg: 'https://music.haitangw.cc/kgqq/kg.php?type=mp3&id={id}&level={level}',
    mg: 'https://music.haitangw.cc/musicapi/mg.php?type=mp3&id={id}&level={level}',
  },

  async getUrl(platform, songId, quality, songInfo) {
    return buildTemplateUrl(platform, quality, songInfo, this._templates, this.name);
  },
};

// --- Provider: 念心SVIP（模板URL） ---
const nianxinVipProvider = {
  name: '念心SVIP',
  platforms: ['wy', 'tx', 'kw', 'kg', 'mg'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _templates: {
    tx: 'https://music.nxinxz.com/kgqq/tx.php?id={id}&level={level}&type=mp3',
    wy: 'http://music.nxinxz.com/wy.php?id={id}&level={level}&type=mp3',
    kw: 'http://music.nxinxz.com/kw.php?id={id}&level={level}&type=mp3',
    kg: 'https://music.nxinxz.com/kgqq/kg.php?id={id}&level={level}&type=mp3',
    mg: 'http://music.nxinxz.com/mg.php?id={id}&level={level}&type=mp3',
  },

  async getUrl(platform, songId, quality, songInfo) {
    return buildTemplateUrl(platform, quality, songInfo, this._templates, this.name);
  },
};

// --- Provider: 稳定版API（简单直连） ---
const stableWyProvider = {
  name: '稳定版网易云',
  platforms: ['wy'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _qualityMap: { '128k': 'standard', '320k': 'exhigh', flac: 'lossless', flac24bit: 'lossless' },
  _apiUrl: 'https://api.injahow.cn/meting/api/',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('稳定版网易云缺少歌曲ID');
    const level = this._qualityMap[quality] || 'standard';
    const url = this._apiUrl + '?server=wy&type=url&id=' + encodeURIComponent(id) + '&level=' + encodeURIComponent(level);
    const res = await httpGet(url);
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    const realUrl = body?.url || body?.data?.url;
    if (!realUrl || String(realUrl).includes('404') || String(realUrl).includes('error')) {
      throw new Error('稳定版网易云获取链接失败');
    }
    return realUrl;
  },
};

const stableTxProvider = {
  name: '稳定版QQ音乐',
  platforms: ['tx'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _apiUrl: 'https://cyapi.top/API/qq_music.php',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('稳定版QQ音乐缺少歌曲ID');
    const url = this._apiUrl + '?apikey=1ffdf5733f5d538760e63d7e46ba17438d9f7b9dfc18c51be1109386fd74c3a1&type=json&mid=' + encodeURIComponent(id);
    const res = await httpGet(url);
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    const realUrl = body?.url || body?.data?.url;
    if (!realUrl || String(realUrl).includes('404') || String(realUrl).includes('error')) {
      throw new Error('稳定版QQ音乐获取链接失败');
    }
    return realUrl;
  },
};

const stableKwProvider = {
  name: '稳定版酷我',
  platforms: ['kw'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _qualityMap: { '128k': '128k', '320k': '320k', flac: 'lossless', flac24bit: 'lossless' },
  _apiUrl: 'https://kw-api.cenguigui.cn',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('稳定版酷我缺少歌曲ID');
    const level = this._qualityMap[quality] || '128k';
    const url = this._apiUrl + '?id=' + encodeURIComponent(id) + '&type=song&format=json&level=' + encodeURIComponent(level);
    const res = await httpGet(url);
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    const realUrl = body?.url || body?.data?.url;
    if (!realUrl || String(realUrl).includes('404') || String(realUrl).includes('error')) {
      throw new Error('稳定版酷我获取链接失败');
    }
    return realUrl;
  },
};

// --- Provider: 收集の网易云（cenguigui 网易云API） ---
const shoujiWyProvider = {
  name: '收集の网易云',
  platforms: ['wy'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master'],

  _qualityMap: {
    '128k': 'standard', '320k': 'exhigh', flac: 'lossless', flac24bit: 'lossless',
    hires: 'lossless', atmos: 'lossless', master: 'lossless',
  },
  _apiUrl: 'https://api.cenguigui.cn/api/netease/music_v1.php',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('收集の网易云缺少歌曲ID');
    const level = this._qualityMap[quality] || 'lossless';
    const url = this._apiUrl + '?id=' + encodeURIComponent(id) + '&type=json&level=' + encodeURIComponent(level);
    const res = await httpGet(url);
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    if (!body) throw new Error('收集の网易云空响应');
    const realUrl = body.url || body.data?.url;
    if (!realUrl || String(realUrl).includes('404') || String(realUrl).includes('error')) {
      throw new Error('收集の网易云获取链接失败');
    }
    return realUrl;
  },
};

// --- Provider: 收集のQQ音乐（cyapi QQ音乐API） ---
const shoujiTxProvider = {
  name: '收集のQQ音乐',
  platforms: ['tx'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master'],

  _qualityMap: {
    '128k': '128k', '320k': '320k', flac: 'flac', flac24bit: 'flac',
    hires: 'flac', atmos: 'flac', master: 'flac',
  },
  _apiUrl: 'https://cyapi.top/API/qq_music.php',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('收集のQQ音乐缺少歌曲ID');
    const url = this._apiUrl + '?apikey=1ffdf5733f5d538760e63d7e46ba17438d9f7b9dfc18c51be1109386fd74c3a1&type=json&mid=' + encodeURIComponent(id);
    const res = await httpGet(url);
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    if (!body) throw new Error('收集のQQ音乐空响应');
    const realUrl = body.url || body.data?.url;
    if (!realUrl || String(realUrl).includes('404') || String(realUrl).includes('error')) {
      throw new Error('收集のQQ音乐获取链接失败');
    }
    return realUrl;
  },
};

// --- Provider: 收集の酷我（cenguigui 酷我API） ---
const shoujiKwProvider = {
  name: '收集の酷我',
  platforms: ['kw'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master'],

  _qualityMap: {
    '128k': '128k', '320k': '320k', flac: 'lossless', flac24bit: 'lossless',
    hires: 'lossless', atmos: 'lossless', master: 'lossless',
  },
  _apiUrl: 'https://kw-api.cenguigui.cn',

  async getUrl(platform, songId, quality, songInfo) {
    const id = songId || getHashOrMid(songInfo);
    if (!id) throw new Error('收集の酷我缺少歌曲ID');
    const level = this._qualityMap[quality] || 'lossless';
    const url = this._apiUrl + '?id=' + encodeURIComponent(id) + '&type=song&format=json&level=' + encodeURIComponent(level);
    const res = await httpGet(url);
    const body = typeof res === 'string' ? safeJsonParse(res) : res;
    if (!body) throw new Error('收集の酷我空响应');
    const realUrl = body.url || body.data?.url;
    if (!realUrl || String(realUrl).includes('404') || String(realUrl).includes('error')) {
      throw new Error('收集の酷我获取链接失败');
    }
    return realUrl;
  },
};

// --- Provider: FishMusic（自建API服务器） ---
const fishMusicProvider = {
  name: 'FishMusic',
  platforms: ['wy', 'tx', 'kw', 'kg', 'mg'],
  qualitys: ['128k', '320k', 'flac', 'flac24bit'],

  _apiUrl: 'https://m-api.ceseet.me',
  _apiKey: '',  // 如需鉴权可在此填写 API Key

  async getUrl(platform, songId, quality, songInfo) {
    const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
    if (!hashOrMid) throw new Error('FishMusic缺少hash/songmid');
    const selectedQuality = selectQuality(quality, this.qualitys);
    const url = this._apiUrl + '/url/' + encodeURIComponent(platform) + '/' + encodeURIComponent(hashOrMid) + '/' + encodeURIComponent(selectedQuality);
    const res = await httpRequest(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getLxUserAgent(),
        'X-Request-Key': this._apiKey,
      },
      follow_max: 5,
    });
    const body = res.body;
    if (!body || typeof body !== 'object' || isNaN(Number(body.code))) {
      throw new Error('FishMusic返回无效响应');
    }
    switch (Number(body.code)) {
      case 0:
        if (!body.data) throw new Error('FishMusic返回空URL');
        return body.data;
      case 1: throw new Error('FishMusic IP被封禁');
      case 2: throw new Error('FishMusic获取失败: ' + (body.msg || ''));
      case 4: throw new Error('FishMusic服务器错误');
      case 5: throw new Error('FishMusic请求过于频繁');
      case 6: throw new Error('FishMusic参数错误');
      default: throw new Error(body.msg || 'FishMusic未知错误');
    }
  },
};

// --- Provider: FishMusic本地源（本地音乐文件） ---
const fishMusicLocalProvider = {
  name: 'FishMusic本地',
  platforms: ['local'],
  qualitys: [],

  _apiUrl: 'https://m-api.ceseet.me',
  _apiKey: '',  // 如需鉴权可在此填写 API Key

  async getUrl(platform, songId, quality, songInfo) {
    const songmid = songInfo?.songmid || '';
    if (!songmid.startsWith('server_')) throw new Error('FishMusic本地不支持此文件格式');
    const requestBody = { p: songmid.replace('server_', '') };
    const b = base64UrlSafeEncode(JSON.stringify(requestBody));
    // 先检查文件是否存在
    const checkUrl = this._apiUrl + '/local/c?q=' + b;
    const checkRes = await httpRequest(checkUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getLxUserAgent(),
        'X-Request-Key': this._apiKey,
      },
      follow_max: 5,
    });
    const checkBody = checkRes.body;
    if (checkBody?.code === 0 && checkBody?.data?.file) {
      return this._apiUrl + '/local/u?q=' + b;
    }
    throw new Error('FishMusic本地文件未找到');
  },

  /** 获取本地音乐封面 */
  async getPic(songInfo) {
    const songmid = songInfo?.songmid || '';
    if (!songmid.startsWith('server_')) throw new Error('FishMusic本地不支持此文件格式');
    const requestBody = { p: songmid.replace('server_', '') };
    const b = base64UrlSafeEncode(JSON.stringify(requestBody));
    const checkUrl = this._apiUrl + '/local/c?q=' + b;
    const checkRes = await httpRequest(checkUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getLxUserAgent(),
        'X-Request-Key': this._apiKey,
      },
      follow_max: 5,
    });
    const checkBody = checkRes.body;
    if (checkBody?.code === 0 && checkBody?.data?.cover) {
      return this._apiUrl + '/local/p?q=' + b;
    }
    throw new Error('FishMusic本地封面未找到');
  },

  /** 获取本地音乐歌词 */
  async getLyric(songInfo) {
    const songmid = songInfo?.songmid || '';
    if (!songmid.startsWith('server_')) throw new Error('FishMusic本地不支持此文件格式');
    const requestBody = { p: songmid.replace('server_', '') };
    const b = base64UrlSafeEncode(JSON.stringify(requestBody));
    // 先检查歌词是否存在
    const checkUrl = this._apiUrl + '/local/c?q=' + b;
    const checkRes = await httpRequest(checkUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getLxUserAgent(),
        'X-Request-Key': this._apiKey,
      },
      follow_max: 5,
    });
    const checkBody = checkRes.body;
    if (checkBody?.code === 0 && checkBody?.data?.lyric) {
      const lyricUrl = this._apiUrl + '/local/l?q=' + b;
      const lyricRes = await httpRequest(lyricUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': getLxUserAgent(),
          'X-Request-Key': this._apiKey,
        },
        follow_max: 5,
      });
      const lyricBody = lyricRes.body;
      if (lyricBody?.code === 0) {
        return {
          lyric: lyricBody.data || '',
          tlyric: '',
          rlyric: '',
          lxlyric: '',
        };
      }
    }
    throw new Error('FishMusic本地歌词未找到');
  },
};

/**
 * ★★★ 音源 Provider 注册表 ★★★
 * 
 * 顺序决定回退优先级：排在前面的优先使用。
 * 框架会自动根据当前请求的平台过滤出可用的 Provider，
 * 然后按并发+顺序混合策略进行回退。
 * 
 * 添加新音源：在此数组中追加 provider 对象即可。
 * 删除音源：注释掉或移除对应行即可。
 */
const PROVIDERS = [
  // ---- 星海系列 ----
  xinghaiMainProvider,
  xinghaiBackupProvider,
  // ---- Huibq ----
  huibqProvider,
  // ---- 聆川 ----
  lingchuanProvider,
  // ---- 溯音系列（oiapi） ----
  suyinQQProvider,
  suyin163Provider,
  suyinKuwoProvider,
  suyinMiguProvider,
  // ---- 长青SVIP ----
  changqingVipProvider,
  // ---- 念心SVIP ----
  nianxinVipProvider,
  // ---- 稳定版系列 ----
  stableWyProvider,
  stableTxProvider,
  stableKwProvider,
  // ---- 收集の聚合接口系列（cenguigui/cyapi） ----
  shoujiWyProvider,
  shoujiTxProvider,
  shoujiKwProvider,
  // ---- FishMusic 系列 ----
  fishMusicProvider,
  fishMusicLocalProvider,
];

// ════════════════════════════════════════════════════════════════
// 第三部分：核心基础设施（一般不需要修改）
// ════════════════════════════════════════════════════════════════

// --- LX API 绑定 ---
const { EVENT_NAMES, request, on, send } = globalThis.lx;

// --- 常量 ---
const HTTP_URL_REGEX = /^https?:\/\//i;
const HIRES_QUALITY_SET = new Set(['24bit', 'flac', 'flac24bit', 'hires', 'master', 'atmos']);

// --- URL 缓存 ---
const urlCache = new Map();

function getCachedUrl(cacheKey) {
  const entry = urlCache.get(cacheKey);
  if (!entry) return null;
  if (Date.now() - entry.timestamp >= CACHE_CONFIG.ttlMs) {
    urlCache.delete(cacheKey);
    return null;
  }
  return entry.url;
}

function setCachedUrl(cacheKey, url) {
  urlCache.set(cacheKey, { url: url, timestamp: Date.now() });
  if (urlCache.size > CACHE_CONFIG.maxSize) {
    const oldestKey = urlCache.keys().next().value;
    if (oldestKey !== undefined) urlCache.delete(oldestKey);
  }
}

function buildCacheKey(prefix, songInfo, quality) {
  const name = songInfo?.name || '';
  const singer = songInfo?.singer || '';
  const album = songInfo?.albumName || songInfo?.album || '';
  return prefix + '_' + name + '_' + singer + '_' + album + '_' + (quality || '');
}

// --- HTTP 请求封装 ---

/** 安全 JSON 解析 */
function safeJsonParse(str) {
  if (typeof str !== 'string') return str;
  const trimmed = str.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.startsWith('"')) {
    try { return JSON.parse(trimmed); } catch (e) { /* 忽略解析错误 */ }
  }
  return str;
}

/** Base64 URL 安全编码（用于 FishMusic 本地源） */
function base64UrlSafeEncode(str) {
  const b64 = typeof btoa === 'function'
    ? btoa(unescape(encodeURIComponent(str)))
    : Buffer.from(str, 'utf-8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** 获取 LX Music User-Agent（用于 FishMusic 等需要 UA 的 API） */
function getLxUserAgent() {
  try {
    const v = globalThis.lx?.version || 'unknown';
    const e = globalThis.lx?.env || 'desktop';
    return 'lx-music-' + e + '/' + v;
  } catch (_) {
    return 'lx-music-request/1.0.0';
  }
}

/** 底层 HTTP 请求，返回 Promise<{statusCode, headers, body}> */
function httpRequest(url, options = { method: 'GET' }) {
  return new Promise((resolve, reject) => {
    request(url, { timeout: DEFAULT_TIMEOUT, ...options }, (err, res) => {
      if (err) return reject(new Error('请求错误: ' + err.message));
      let body = res?.body;
      if (typeof body === 'string') {
        body = safeJsonParse(body);
      }
      resolve({
        statusCode: res?.statusCode ?? 0,
        headers: res?.headers || {},
        body: body,
      });
    });
  });
}

/** GET 请求，自动拼接查询参数，返回响应 body */
async function httpGet(url, params) {
  const queryStr = buildQueryString(params);
  const sep = url.includes('?') ? '&' : '?';
  const fullUrl = url + (queryStr ? sep + queryStr : '');
  const res = await httpRequest(fullUrl, { method: 'GET', timeout: DEFAULT_TIMEOUT });
  if (res.statusCode >= 400) throw new Error('HTTP错误: ' + res.statusCode);
  return res.body;
}

/** POST 请求，body 为 JSON，返回响应 body */
async function httpPost(url, body, timeout) {
  const res = await httpRequest(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    timeout: timeout || DEFAULT_TIMEOUT,
  });
  if (res.statusCode >= 400) throw new Error('HTTP错误: ' + res.statusCode);
  return res.body;
}

/** 构建查询字符串（带前导 ?） */
function buildQueryString(params) {
  if (!params) return '';
  const parts = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => encodeURIComponent(String(k)) + '=' + encodeURIComponent(String(params[k])));
  return parts.length ? '?' + parts.join('&') : '';
}

// --- URL 验证 ---
function validateUrl(url, sourceName) {
  if (!url || typeof url !== 'string') throw new Error(sourceName + '返回空URL');
  if (!HTTP_URL_REGEX.test(url.trim())) throw new Error(sourceName + '非法URL格式');
  return url;
}

// --- 音质管理 ---

/** 从支持的音质列表中选择最接近的音质 */
function selectQuality(requestedQuality, supportedQualities) {
  if (requestedQuality === '24bit') return '24bit';
  const qualityList = Array.isArray(supportedQualities) ? supportedQualities : ['128k'];
  const normalized = String(requestedQuality || '128k').toLowerCase();
  if (qualityList.includes(normalized)) return normalized;
  const qualityOrder = ['flac24bit', 'flac', '320k', '192k', '128k'];
  let idx = qualityOrder.indexOf(normalized);
  if (idx < 0) idx = qualityOrder.length - 1;
  // 向下降级
  for (let i = idx; i < qualityOrder.length; i++) {
    if (qualityList.includes(qualityOrder[i])) return qualityOrder[i];
  }
  // 如果都找不到，从最低音质开始尝试
  for (let i = qualityOrder.length - 1; i >= 0; i--) {
    if (qualityList.includes(qualityOrder[i])) return qualityOrder[i];
  }
  return qualityList[0] || '128k';
}

/** 将音质转换为网易云格式 */
function qualityToNetease(quality) {
  const q = String(quality || '128k').toLowerCase();
  if (q === 'flac' || q === 'flac24bit' || q === 'hires' || q === 'master' || q === 'atmos') return 'lossless';
  if (q === '320k' || q === '192k') return 'exhigh';
  return 'standard';
}

/** 将音质转换为溯音QQ格式 */
function qualityToSuyinQQ(quality) {
  const q = String(quality || '128k').toLowerCase();
  if (q === 'flac24bit') return 'hires';
  if (q === '192k') return '320k';
  const map = { '128k': '128k', '320k': '320k', flac: 'flac', hires: 'hires' };
  return map[q] || '128k';
}

// --- 歌曲信息工具 ---

/** 获取歌曲的 hash 或 mid（优先 hash） */
function getHashOrMid(songInfo) {
  return songInfo?.hash ?? songInfo?.songmid ?? songInfo?.id ?? null;
}

/** 获取歌曲ID（兼容各种字段名） */
function getSongId(songInfo) {
  return (songInfo?.id || songInfo?.songmid || songInfo?.songId || songInfo?.hash || songInfo?.rid || songInfo?.mid || songInfo?.strMediaMid || songInfo?.mediaId || '').toString();
}

/** 获取QQ音乐歌曲ID（区分 mid 字符串和 songid 数字） */
function getQQSongId(songInfo) {
  const mid = songInfo?.meta?.qq?.mid || songInfo?.meta?.mid || songInfo?.songmid ||
    (typeof songInfo?.id === 'string' && !/^\d+$/.test(songInfo.id) ? songInfo.id : null);
  if (mid) return { type: 'mid', value: mid };
  const songid = songInfo?.meta?.qq?.songid || songInfo?.meta?.songid ||
    (typeof songInfo?.id === 'number' ? songInfo.id :
      (typeof songInfo?.id === 'string' && /^\d+$/.test(songInfo.id) ? Number(songInfo.id) : null));
  if (songid) return { type: 'songid', value: songid };
  return null;
}

/** 获取平台对应的歌曲ID */
function getPlatformSongId(platform, songInfo) {
  if (platform === 'kg') {
    return songInfo?.hash || songInfo?.songmid || songInfo?.id || songInfo?.rid || songInfo?.mid || null;
  }
  if (platform === 'tx') {
    const qqId = getQQSongId(songInfo);
    if (qqId?.value) return qqId.value;
  }
  return songInfo?.songmid || songInfo?.id || songInfo?.songId || songInfo?.rid || songInfo?.hash || null;
}

/** 构建模板URL（替换 {id} 和 {level} 占位符） */
function buildTemplateUrl(platform, quality, songInfo, templates, sourceName) {
  const template = templates[platform];
  if (!template) throw new Error(sourceName + '不支持该平台');
  const songId = getPlatformSongId(platform, songInfo);
  if (!songId) throw new Error(sourceName + '缺少songId');
  const level = qualityToNetease(quality);
  return template
    .replace('{id}', encodeURIComponent(String(songId)))
    .replace('{level}', encodeURIComponent(level));
}

/** 获取移动端 User-Agent */
function getMobileUserAgent() {
  return 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';
}

// --- 搜索匹配工具 ---

/** 标准化关键词（去除括号、空格、特殊字符，转小写） */
function normalizeKeyword(keyword) {
  if (!keyword) return '';
  return String(keyword)
    .replace(/\(\s*Live\s*\)/gi, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, '')
    .replace(/[^\w\u4e00-\u9fa5]/g, '')
    .trim()
    .toLowerCase();
}

/** 构建搜索关键词列表（标题+专辑、标题+歌手、仅标题） */
function buildSearchKeywords(songInfo) {
  const keywords = [];
  const name = songInfo?.name || '';
  const album = songInfo?.albumName || songInfo?.album || '';
  const singer = songInfo?.singer || '';
  if (name && album) {
    const kw = normalizeKeyword(name + album);
    if (kw) keywords.push({ keyword: kw, strict: true });
  }
  if (name && singer) {
    const kw = normalizeKeyword(name + singer);
    if (kw) keywords.push({ keyword: kw, strict: true });
  }
  if (name) {
    const kw = normalizeKeyword(name);
    if (kw) keywords.push({ keyword: kw, strict: false });
  }
  return keywords;
}

/** 标题模糊匹配（双向包含） */
function titleMatch(a, b) {
  const na = normalizeKeyword(a);
  const nb = normalizeKeyword(b);
  if (!na || !nb) return true;
  return na.includes(nb) || nb.includes(na);
}

/** 歌曲信息匹配（song/singer/album 字段） */
function songInfoMatch(responseData, songInfo) {
  const song = responseData?.song || responseData?.data?.song || '';
  const singer = responseData?.singer || responseData?.data?.singer || '';
  const album = responseData?.album || responseData?.data?.album || '';
  if (!titleMatch(song, songInfo?.name || '')) return false;
  if (songInfo?.singer && singer && !titleMatch(singer, songInfo.singer)) return false;
  if ((songInfo?.albumName || songInfo?.album) && album && !titleMatch(album, songInfo.albumName || songInfo.album)) return false;
  return true;
}

/** 歌曲标题匹配（title/artist/album 字段） */
function songTitleMatch(responseData, songInfo) {
  if (!titleMatch(responseData?.title || '', songInfo?.name || '')) return false;
  if (songInfo?.singer && responseData?.artist && !titleMatch(responseData.artist, songInfo.singer)) return false;
  if ((songInfo?.albumName || songInfo?.album) && responseData?.album && !titleMatch(responseData.album, songInfo.albumName || songInfo.album)) return false;
  return true;
}

/** 从消息文本中解析歌曲信息 */
function parseMessageSongInfo(message) {
  if (!message) return null;
  const result = {};
  const lines = String(message).split('\n');
  for (const line of lines) {
    if (line.startsWith('歌名：')) result.song = line.replace('歌名：', '').trim();
    if (line.startsWith('歌手：')) result.singer = line.replace('歌手：', '').trim();
    if (line.startsWith('专辑：')) result.album = line.replace('专辑：', '').trim();
  }
  return result.song ? result : null;
}

/** 从溯音QQ响应中提取音频URL */
function extractQQUrl(responseData) {
  if (responseData?.music) return responseData.music;
  if (responseData?.url) return responseData.url;
  if (responseData?.message) {
    const match = String(responseData.message).match(/音频链接[：:](.+?)(?:\n|$)/);
    if (match && match[1]) return match[1].trim();
  }
  throw new Error('溯音QQ未找到音频链接');
}

// ════════════════════════════════════════════════════════════════
// 第四部分：回退引擎与事件注册（一般不需要修改）
// ════════════════════════════════════════════════════════════════

/**
 * 构建指定平台的回退链
 * 从 PROVIDERS 中筛选支持该平台的 Provider，按注册顺序排列
 */
function buildFallbackChain(platform) {
  return PROVIDERS.filter(p => p.platforms.includes(platform));
}

/**
 * 带回退的 URL 获取
 * 策略：先并发尝试前 N 个源，若全部失败则顺序尝试剩余源
 */
async function getUrlWithFallback(platform, songInfo, quality) {
  if (!platform || !PLATFORM_CONFIG[platform]) {
    throw new Error('无效的平台参数: ' + platform);
  }
  if (!songInfo || typeof songInfo !== 'object') {
    throw new Error('无效的歌曲信息');
  }

  const resolvedQuality = quality || '128k';
  const selectedQuality = selectQuality(resolvedQuality, PLATFORM_CONFIG[platform].qualitys);
  const songId = getHashOrMid(songInfo);
  const chain = buildFallbackChain(platform);

  if (!chain.length) {
    throw new Error('未找到支持平台 [' + platform + '] 的音源');
  }

  const errors = [];

  // 第一阶段：并发尝试前 N 个源
  const parallelCount = Math.min(FALLBACK_CONFIG.parallelCount, chain.length);
  const parallelProviders = chain.slice(0, parallelCount);
  try {
    const url = await Promise.any(parallelProviders.map(async provider => {
      const result = await provider.getUrl(platform, songId, selectedQuality, songInfo);
      return validateUrl(result, provider.name);
    }));
    if (url) return url;
  } catch (e) {
    if (e.errors) {
      e.errors.forEach(err => errors.push(err.message));
    }
  }

  // 第二阶段：顺序尝试剩余源
  const remainingProviders = chain.slice(parallelCount);
  for (const provider of remainingProviders) {
    try {
      const result = await provider.getUrl(platform, songId, selectedQuality, songInfo);
      return validateUrl(result, provider.name);
    } catch (e) {
      errors.push(provider.name + ': ' + e.message);
      continue;
    }
  }

  throw new Error('所有源均失败 [' + platform + ' ' + selectedQuality + ']: ' + errors.join('; '));
}

// --- 生成源配置 ---
const sourceConfig = {};
Object.keys(PLATFORM_CONFIG).forEach(platform => {
  const cfg = PLATFORM_CONFIG[platform];
  sourceConfig[platform] = {
    name: cfg.name,
    type: 'music',
    actions: cfg.actions || ['musicUrl'],
    qualitys: cfg.qualitys,
  };
});

// --- local 源专用 Provider 查找 ---
function findLocalProvider() {
  return PROVIDERS.find(p => p.platforms.includes('local') && (p.getPic || p.getLyric));
}

// --- 注册事件监听 ---
on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl': {
      if (!info?.musicInfo) return Promise.reject('请求参数不完整');
      return getUrlWithFallback(source, info.musicInfo, info.type || '128k')
        .then(url => Promise.resolve(url))
        .catch(err => Promise.reject(err.message || '获取播放链接失败'));
    }
    case 'pic': {
      if (source !== 'local' || !info?.musicInfo) return Promise.reject('不支持的操作: pic');
      const localProvider = findLocalProvider();
      if (!localProvider?.getPic) return Promise.reject('无本地封面源');
      return localProvider.getPic(info.musicInfo)
        .then(url => Promise.resolve(url))
        .catch(err => Promise.reject(err.message || '获取封面失败'));
    }
    case 'lyric': {
      if (source !== 'local' || !info?.musicInfo) return Promise.reject('不支持的操作: lyric');
      const localProvider = findLocalProvider();
      if (!localProvider?.getLyric) return Promise.reject('无本地歌词源');
      return localProvider.getLyric(info.musicInfo)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err.message || '获取歌词失败'));
    }
    default:
      return Promise.reject('不支持的操作: ' + action);
  }
});

// --- 发送初始化事件 ---
send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: sourceConfig,
});
