/**
 * @name CCNET
 * @description 合并 24 个明文音源，同平台多源自动切换
 * @version 3.5.0
 * @author CCNET
 * build: 20261013.212038
 */
/* CCNET-BUILD {"contract": 2, "disabled": 0, "kernel": "3.5.0", "manualDecl": [], "sources": 24, "stamp": "20261013.212038"} */

;(function () {

  var __HOST = globalThis.lx
  if (!__HOST || typeof __HOST.on !== 'function' || typeof __HOST.send !== 'function') {
    throw new Error('[CCNET] 未检测到 globalThis.lx，请把本文件作为「自定义源」导入洛雪音乐(LX Music)')
  }

  var __EVENT = __HOST.EVENT_NAMES || {};
  var __REQ = __EVENT.request || 'request';
  var __INITED = __EVENT.inited || 'inited';
  var __ALERT = __EVENT.updateAlert || 'updateAlert';
  var __ONG = __HOST.on;
  var __SENDG = __HOST.send;
  var __HOSTREQ = __HOST.request;

  var __PLATS = ['kw', 'kg', 'tx', 'wy', 'mg', 'local'];
  var __LABEL = { kw: '酷我音乐', kg: '酷狗音乐', tx: 'QQ音乐', wy: '网易云音乐', mg: '咪咕音乐', local: '本地音乐' };
  var __QUAL = { '128k': 1, '320k': 1, 'flac': 1, 'flac24bit': 1 };
  var __SELF_KEYS = { globalThis: 1, window: 1, self: 1, top: 1, parent: 1 };

  var __P = typeof Promise === 'function' ? Promise : null;
  var __setT = typeof setTimeout === 'function' ? setTimeout : null;
  var __clearT = typeof clearTimeout === 'function' ? clearTimeout : null;
  var __ProxyCtor = typeof Proxy === 'function' ? Proxy : null;

  var __MOBILE = __HOST.env === 'mobile';

  // ==================== 段① 配置（由 index.py 从 ccnet.json 压成常量）====================
//  这就是产物运行时真正读的那一份。每项什么意思、当前来自哪一层：
//      python3 index.py --show-config
//  要持久修改请改 ccnet.json —— 改这里只影响这一份产物，下次装配会被覆盖。
// =========================================================================
var CCNET_CONFIG = {
  "logLevel":                "info",
  "openDevTools":            false,
  "parallel":                3,
  "attemptTimeoutMs":        8000,
  "maxAttempts":             0,
  "rememberWinner":          true,
  "manualDeclLast":          true,
  "linkPattern":             "^https?://",
  "linkMaxLen":              2048,
  "forwardUpdateAlert":      true,
  "guardBlockProcessExit":   true,
  "declareLocal":            true,
  "cacheTtlMs":              300000,
  "cacheMaxEntries":         500,
  "cacheActions":            ["lyric", "musicUrl", "pic"],
  "healthEnabled":           true,
  "healthWindow":            50,
  "healthMinSamples":        5,
  "healthFailRateBelow":     0.15,
  "healthCooldownMs":        300000,
  "healthCooldownMaxMs":     1800000,
  "healthHalfOpenProbes":    1,
  "_kernel":                 "3.5.0",
  "_contract":               2
};

  var __N = 24;
  var __NAMES = ["👖裤佬SVIP音源(二改整合版) v3.0.0 | 2026-08-19", "HYWmusic_公益版 v1.2.0", "K×H测试 1.7.17", "fish_music 1.0.1", "星澜聚合音源 (StellarWave) v3.2.0", "星海音乐源 v3.2.15", "全豆要 v3.0.0", "全豆要[聚合音源] v4.0", "收集の聚合接口(LX版) 1.0.0-beta", "溯音音源 v1", "稳定版音源 v1.0.3", "聚合API接口 (CF) 3", "非常刀 v5", "星澜聚合音源 (StellarWave) v4.0.0", "全豆要[聚合音源] v4.1", "弥音 v1", "KuwoDES 1.0.0", "monster🐱‍🐉 v1.5.5", "𝖧౿ᥣᥣ𝗈 Ԝ𝗈𝗋ᥣᑯ 260809", "gdstudio音乐源 1.0.1", "回避聚合 (HuiBi Aggregate) 0.0.1", "幻音音源 v3", "统一音乐源 1.0.0", "西瓜聚合源 v1.40"];
  var __IDS = ["裤佬svip音源_二改整合版", "hywmusic_公益版", "k_h测试", "fish_music", "星澜聚合音源_stellarwave", "星海音乐源", "全豆要", "全豆要_聚合音源", "收集_聚合接口_lx版", "溯音音源", "稳定版音源", "聚合api接口_cf", "非常刀", "星澜聚合音源_stellarwave_2", "全豆要_聚合音源_2", "弥音", "kuwodes", "monster", "c0", "gdstudio音乐源", "回避聚合_huibi_aggregate", "幻音音源", "统一音乐源", "西瓜聚合源"];
  var __INFO = [{"name": "👖裤佬SVIP音源(二改整合版)", "description": "基于安妮独家音源v4 + 星海音乐源v3.2.12 重构，替代原不稳定版本", "version": "v3.0.0 | 2026-08-19", "author": "裤佬 | 安妮 | 星海", "homepage": "", "rawScript": "/*!\n * @name 👖裤佬SVIP音源(二改整合版)\n * @description 基于安妮独家音源v4 + 星海音乐源v3.2.12 重构，替代原不稳定版本\n * @description 官网 https://Jsnzkpg.github.io\n * @version v3.0.0 | 2026-08-19\n * @author 裤佬 | 安妮 | 星海\n */"}, {"name": "HYWmusic_公益版", "description": "qq群：1094095648；965503129", "version": "v1.2.0", "author": "Ryn", "homepage": "https://github.com/Macrohard0001/HYWmusic_source", "rawScript": "/**\n * @name HYWmusic_公益版\n * @version v1.2.0\n * @author Ryn\n * @description qq群：1094095648；965503129\n * @homepage https://github.com/Macrohard0001/HYWmusic_source\n * @license MIT\n * @updateUrl https://103.79.184.97/api/releases?script=HYWmusic_%E5%85%AC%E7%9B%8A%E7%89%88&scriptType=free&releaseType=lx&version=v1.2.0\n *\n * 支持平台: kw、tx、wy、mg、qs、bili、ytb、xm、kg\n * 支持音质: 128k、320k、flac、flac24bit\n * 生成时间: 2026-10-08T11:39:01.047Z\n *\n * 协议参考：ikun-music-source.js + lxmusic.toside.cn/desktop/custom-source\n *   - MUSIC_QUALITY 每平台独立音质（收敛到规范标准集，高音质可直接请求由服务端解析）\n *   - actions 固定 ['musicUrl']（官方桌面/移动规范：非 local 源仅支持 musicUrl）\n *   - on handler 纯 Promise 风格：({action, source, info}) => Promise\n *   - inited 发送 status:true + sources\n *   - API_BASE 必须注入，禁止回退 localhost\n */"}, {"name": "K×H测试", "description": "Koneko×HYW音源技术测试音源 - 多源聚合 + 多链路回退，支持 5 大平台，集成加密保护", "version": "1.7.17", "author": "HYW & Koneko", "homepage": "", "rawScript": "/**\n * @name K×H测试\n * @version 1.7.17\n * @author HYW & Koneko\n * @description Koneko×HYW音源技术测试音源 - 多源聚合 + 多链路回退，支持 5 大平台，集成加密保护\n *  v1.7.17 修复要点：\n *    1. 清除 ikun API (已失效)\n *    2. 清除海棠 API (已失效)\n *  v1.7.16 修复要点：\n *    1. 新增残像 API (网易云，支持 master/jymaster)\n *    2. 填入用户提供的残像 token\n *    3. 网易云第一组加残像（最高优先级）\n *  v1.7.15 修复要点：\n *    1. 新增 QQ 全音质 API (含 master，不需 apikey)\n *    2. 新增星海聚合 API (酷我/酷狗/咪咕)\n *    3. 填入用户提供的酷狗 API 凭据\n *  v1.7.14 修复要点：\n *    1. 填入用户提供的酷狗 API 凭据\n *    2. 更新日志脱敏: 移除所有 URL 和 apikey 暴露\n *    3. 注释脱敏: 移除所有 URL 和 apikey 暴露\n *  v1.7.13 修复要点：\n *    4. 描述字段移除 apikey 暴露（用户要求）\n *  v1.7.12 修复要点：\n *    1. 新增念心 API (mcp.nianxinxz.com) - 酷狗直链，支持全音质 (128k/320k/flac/hires)\n *    2. 念心实测: 返回完整 kuwo.cn 直链，不需二次请求\n *    3. yuafeng 酷狗: music 字段是 m.kugou.com 失效接口，已降级为 fallback\n *    4. 填入用户提供的酷狗 API 凭据\n *  v1.7.11 修复要点：\n *    1. chksz 修复: 路径 /music/wy (404) -> /api/163_music (200，参考玉宁熙用法)\n *    2. chksz level 映射修复: 用网易云标准 level (jymaster 而非 128k)\n *    3. 网易云 master (超清母带) 现在可用！实测拿到完整 master FLAC 直链\n *  v1.7.10 修复要点：\n *    1. 妖狐咪咕: 只有 id 没歌名时，先用 id 调妖狐搜索 API 拿到歌曲名，再请求 URL\n *    2. 酷狗 API: 需要用户填 apikey\n *    3. 描述字段脱敏: 所有 URL 在日志/注释里都不暴露\n *    4. API 配置区: 把需要用户填的 apikey 字段提到最上面，方便配置\n *  v1.7.9 修复要点：\n *    1. 修复 API 域名\n *    2. yunmge 超时: 4s -> 8s\n *    3. 移除音源文件里所有\"专属\"敏感字眼，改成中性描述（功能保留，描述不暴露细节）\n *  v1.7.8 修复要点：\n *    2. 新增 酷狗 yuafeng API (需 apikey)\n *    3. 新增 酷狗 clientappid: KM20260809C1B8F43A9CE47ADF (玉宁熙/冷雨)\n *    4. 酷狗 API 提示: 用户去对应平台注册可获取更高音质\n *    5. 修复加密 URL 丢字符 bug: _xd() 在 base64 padding 反转后开头是 = 时 break，导致部分 URL 丢首字符\n *  v1.7.6 修复要点：\n *    1. 新增 yunmge 酷我专用通道 (用 _xd 加密)\n *    2. 修复日志系统: 所有 [K×H] 硬编码改为 [K×H]，统一用 SCRIPT_NAME 变量\n *    3. 新增\"下载方式\"概念: sources 注册时附带 meta.downloadType='test'，初始化日志输出\n *    4. 修复混淆: 新增 _xd() 加密方式 (XOR + 自定义 base64 + 反转)，比原 _e() 更强\n *    5. 重命名音源: SCRIPT_NAME 改为 K×H测试，描述改为 Koneko×HYW音源技术测试音源\n *    6. v1.7.5 修复一并带入: 网易云 MUSIC_U cookie 注入本地 API，修复 /song -> /song/url/v1\n *  v1.7.4 修复要点：\n *    1. 脱敏增强: contentId/copyrightId/songId/songmid参数值脱敏，修复短URL路径(15+字符)遗漏\n *    2. 嵌套编码修复: pattern3跳过已含<<E:>>标记的路径，防止双重编码导致解码失败\n *    3. 日志参数合并: contentId:/copyrightId:标签与值合并为单参数，确保_mask能匹配\n *    4. purl日志修复: QQ专属purl值添加purl=前缀，使脱敏pattern6能正确匹配\n *    5. JSON错误脱敏: fetchJSON的JSON解析错误消息也经过_mask处理\n *  v1.7.5 修复要点：\n *    1. 网易云官方Cookie接入: 新增 API.neteaseCookie (MUSIC_U 凭据，_xd 加密混淆)，注入本地API调用\n *    2. 修复本地网易API路由: /song 路由不存在(404)，改为 NeteaseCloudMusicApi 标准路由 /song/url/v1\n *    3. 修复本地歌词/封面调用: /song?type=lyric|json 改为 /lyric 和 /song/detail\n *    4. 本地网易策略提权: 带上 MUSIC_U 后命中无损/VIP 几率大幅提升，挪到 wy 第一组最高优先级\n *  v1.7.3 修复要点：\n *    1. 日志脱敏: 所有日志输出自动脱敏API key、内部IP、完整URL、Cookie、purl等敏感信息\n *    2. 错误消息脱敏: throw new Error中的JSON.stringify也经过脱敏处理\n *  v1.7.2 修复要点：\n *    1. QQ专属增强: 所有策略携带完整Cookie(uin+qm_keyst+pgv_pvid)，策略B新增专属uin变体\n *    2. 恢复密钥: 内嵌RECOVERY_KEY，支持通过还原脚本恢复完整音源\n *  v1.7.1 修复要点：\n *    1. 修复混淆解码器: LX Music沙箱无Buffer/atob，改用纯JS base64解码\n *    2. QQ音乐专属: 3重策略(ut.y.qq.com GetEVkey + u.y.qq.com platform=23 + ut+key增强)\n *    3. 咪咕快速返回: 不逐层降级，直接尝试请求音质+PQ兜底，优先健康检查\n *    4. 咪咕返回支持音质: 日志输出实际可用音质(128k/320k/flac)\n *    5. 全量代码混淆: API key/URL/敏感数据均经base64+反转编码，防止泄露\n * @homepage Miao-moe\n * @license MIT\n *\n * 支持平台: 网易云音乐、QQ音乐、酷我音乐、酷狗音乐、咪咕音乐\n * 支持音质: 128k, 192k, 320k, flac, flac24bit, hires, atmos, atmos_plus, master\n * 生成时间: 2026-08-10\n *\n * RECOVERY_KEY: HYW_KONEKO_2026_v1_7_17_RESTORE\n */"}, {"name": "fish_music", "description": "交流群组:https://t.me/yus_share", "version": "1.0.1", "author": "大鱼吃小鱼", "homepage": "", "rawScript": "/*!\n * @name fish_music\n * @description 交流群组:https://t.me/yus_share\n * @version 1.0.1\n * @author 大鱼吃小鱼\n * @repository https://github.com/lxmusics/lx-music-api-server\n */"}, {"name": "星澜聚合音源 (StellarWave)", "description": "基于墨澜 v2.3.1 与星澜 v3.1.1.1 融合，删除失效 API，新增 FFAPI，智能缓存 + 并发 Fallback，支持母带/全景声", "version": "v3.2.0", "author": "星澜团队", "homepage": "https://github.com/your-repo/StellarWave", "rawScript": "/*!\n * @name 星澜聚合音源 (StellarWave)\n * @description 基于墨澜 v2.3.1 与星澜 v3.1.1.1 融合，删除失效 API，新增 FFAPI，智能缓存 + 并发 Fallback，支持母带/全景声\n * @version v3.2.0\n * @author 星澜团队\n * @homepage https://github.com/your-repo/StellarWave\n * @license MIT\n * @update 2026-08-17\n * @changelog\n *   - 深度融合墨澜 v2.3.1 后端池（含 ikun、Hello World、长青海棠等）\n *   - 保留 QQ越权（3重策略）、ygking、残像、星海聚合、yunmge、念心等\n *   - 引入星澜 LRU 缓存 + 并发/顺序 Fallback\n *   - 提升高音质获取成功率\n *   - 清理重复及失效后端\n */"}, {"name": "星海音乐源", "description": "GDAPI | 聚合 | ChKSz API | 全平台支持 24bit FLAC，网易、酷狗、QQ 最高支持母带", "version": "v3.2.15", "author": "万去了了 / 科学大魔王", "homepage": "https://zddyr.top/", "rawScript": "/*!\n * @name         星海音乐源\n * @description  GDAPI | 聚合 | ChKSz API | 全平台支持 24bit FLAC，网易、酷狗、QQ 最高支持母带\n * @version      v3.2.15\n * @author       万去了了 / 科学大魔王\n * @homepage     https://zddyr.top/\n * @see          http://gc.kxwa.top/\n * @lastUpdate   2026-10-02\n * @update       1. 新增汽水音乐支持（测试）；2. 感谢科学大魔王的技术支持；3. 国庆快乐\n * @license      仅供学习交流，请支持正版\n */"}, {"name": "全豆要", "description": "聚合 星海/Huibq/聆川/溯音/念心/长青/歌一刀专属汽水音乐，多链路自动回退", "version": "v3.0.0", "author": "Toskysun", "homepage": "", "rawScript": "/*!\n * @name 全豆要\n * @description 聚合 星海/Huibq/聆川/溯音/念心/长青/歌一刀专属汽水音乐，多链路自动回退\n * @version v3.0.0\n * @author Toskysun\n */"}, {"name": "全豆要[聚合音源]", "description": "迭代4.0版本，聚合 星海/Huibq/聆川/溯音/念心/长青/歌一刀专属汽水音乐，多链路自动回退", "version": "v4.0", "author": "全豆要 and Gemini优化 Toskysun去混淆", "homepage": "", "rawScript": "/*!\n * @name 全豆要[聚合音源]\n * @description 迭代4.0版本，聚合 星海/Huibq/聆川/溯音/念心/长青/歌一刀专属汽水音乐，多链路自动回退\n * @version v4.0\n * @author 全豆要 and Gemini优化 Toskysun去混淆\n */"}, {"name": "收集の聚合接口(LX版)", "description": "聚合接口-来源于网络 整理:QZ", "version": "1.0.0-beta", "author": "QZ", "homepage": "", "rawScript": "/*!\n * @name 收集の聚合接口(LX版)\n * @id netapis_free\n * @version 1.0.0-beta\n * @description 聚合接口-来源于网络 整理:QZ\n * @author QZ\n * @support tx wy kw\n * @expire 2099-12-31 23:59:59\n */"}, {"name": "溯音音源", "description": "集成QQ、网易、酷我、咪咕音乐平台 ，QQ群1078955749", "version": "v1", "author": "竹佀", "homepage": "", "rawScript": "/*!\n * @name 溯音音源\n * @description 集成QQ、网易、酷我、咪咕音乐平台 ，QQ群1078955749\n * @version v1\n * @author 竹佀\n */"}, {"name": "稳定版音源 v1.0.3", "description": "多平台稳定获取播放链接，无调试日志", "version": "1.0.3", "author": "LX", "homepage": "https://lxmusic.toside.cn/mobile/custom-source", "rawScript": "/**\n * @name 稳定版音源 v1.0.3\n * @description 多平台稳定获取播放链接，无调试日志\n * @version 1.0.3\n * @author LX\n * @homepage https://lxmusic.toside.cn/mobile/custom-source\n */"}, {"name": "聚合API接口 (CF)", "description": "v3", "version": "3", "author": "t.me/JHMS_Channel", "homepage": "", "rawScript": "/*!\r\n * @name 聚合API接口 (CF)\r\n * @description v3\r\n * @version 3\r\n * @author t.me/JHMS_Channel\r\n */"}, {"name": "非常刀", "description": "聚合音源，进群链接 https://t.me/gydjlfk", "version": "v5", "author": "群主要进去", "homepage": "", "rawScript": "/*!\n * @name 非常刀\n * @description 聚合音源，进群链接 https://t.me/gydjlfk\n * @version v5\n * @author 群主要进去\n */"}, {"name": "星澜聚合音源 (StellarWave)", "description": "基于墨澜 v2.3.3 与星澜 v3.1.1.1 融合，删除失效 API，新增 FFAPI，智能缓存 + 并发 Fallback，支持母带/全景声", "version": "v4.0.0", "author": "星澜团队", "homepage": "https://github.com/your-repo/StellarWave", "rawScript": "/*!\n * @name 星澜聚合音源 (StellarWave)\n * @description 基于墨澜 v2.3.3 与星澜 v3.1.1.1 融合，删除失效 API，新增 FFAPI，智能缓存 + 并发 Fallback，支持母带/全景声\n * @version v4.0.0\n * @author 星澜团队\n * @homepage https://github.com/your-repo/StellarWave\n * @license MIT\n * @update 2026-09-12\n * @changelog\n *   - v4.0.0 (2026-09-12) 大版本维护更新\n *     · 合并墨澜 v2.3.3（修复 kw、kg，删除失效 API）\n *     · 精简后端池，去除重复/失效后端\n *     · 修复网易云官方后端 form 传参兼容性问题\n *     · 修复 ikun 网易云 body 未序列化的问题\n *     · 重构 extractUrl：支持数组候选，按序提取首个有效 URL\n *     · 缓存写入时刷新 LRU 顺序，避免热点键被误淘汰\n *     · 统一日志与版本标识\n */"}, {"name": "全豆要[聚合音源]", "description": "迭代4.1版本，聚合 星海/溯音/念心/长青/歌一刀专属汽水音乐，多链路自动回退", "version": "v4.1", "author": "全豆要 and Gemini优化 Toskysun去混淆 TZB679兼容性处理，修复部分平台播放无法获取链接语音问题", "homepage": "", "rawScript": "/*!\n * @name 全豆要[聚合音源]\n * @description 迭代4.1版本，聚合 星海/溯音/念心/长青/歌一刀专属汽水音乐，多链路自动回退\n * @version v4.1\n * @author 全豆要 and Gemini优化 Toskysun去混淆 TZB679兼容性处理，修复部分平台播放无法获取链接语音问题\n */"}, {"name": "弥音", "description": "仅Q音，仅128k", "version": "v1", "author": "玥然OvO", "homepage": "", "rawScript": "/*!\n * @name 弥音\n * @description 仅Q音，仅128k\n * @version v1\n * @author 玥然OvO\n */"}, {"name": "KuwoDES", "description": "酷我音乐音源接口", "version": "1.0.0", "author": "不知名纯鹿人", "homepage": "", "rawScript": "/*!\n * @name KuwoDES\n * @version 1.0.0\n * @author 不知名纯鹿人\n * @description 酷我音乐音源接口\n */"}, {"name": "monster🐱‍🐉", "description": "哥斯拉vs大金刚", "version": "v1.5.5", "author": "哥总", "homepage": "", "rawScript": "/*!\n * @name monster🐱‍🐉\n * @description 哥斯拉vs大金刚\n * @version v1.5.5\n * @author 哥总\n *\n *\n */"}, {"name": "𝖧౿ᥣᥣ𝗈 Ԝ𝗈𝗋ᥣᑯ", "description": "缝合怪,轻点喷", "version": "260809", "author": "hello world", "homepage": "", "rawScript": "/*!\n * @name 𝖧౿ᥣᥣ𝗈 Ԝ𝗈𝗋ᥣᑯ\n * @author hello world\n * @version 260809\n * @description 缝合怪,轻点喷\n */"}, {"name": "gdstudio音乐源", "description": "通过 music-api.gdstudio.xyz 提供音乐播放链接", "version": "1.0.1", "author": "lx-music", "homepage": "https://github.com/lyswhut/lx-music-desktop", "rawScript": "/**\n * @name gdstudio音乐源\n * @description 通过 music-api.gdstudio.xyz 提供音乐播放链接\n * @version 1.0.1\n * @author lx-music\n * @homepage https://github.com/lyswhut/lx-music-desktop\n */"}, {"name": "回避聚合 (HuiBi Aggregate)", "description": "融合多源之精华，全平台母带/全景声，智能缓存+并发/顺序Fallback，支持酷我代理解密、ChKSz API。", "version": "0.0.1", "author": "回避", "homepage": "https://github.com/your-repo/HuiBiAggregate", "rawScript": "/*!\n * @name 回避聚合 (HuiBi Aggregate)\n * @version 0.0.1\n * @description 融合多源之精华，全平台母带/全景声，智能缓存+并发/顺序Fallback，支持酷我代理解密、ChKSz API。\n * @author 回避\n * @homepage https://github.com/your-repo/HuiBiAggregate\n * @license MIT\n * @update 2026-08-18\n * @changelog\n *   - 基于星澜 v3.2.0 与星海 v3.2.13 深度融合\n *   - 新增用户配置区域（酷我代理解密、ChKSz apikey）\n *   - 引入Token认证与客户端头（星海）\n *   - 保留全部后端池\n *   - 保留LRU缓存 + 并发/顺序Fallback\n *   - 保留_u()混淆编码\n *   - v0.0.1: 智能音质降级，超时5s，音质匹配校验，高音质后端优先\n *   - 移除自动更新检查\n *   - 酷狗速度优化：高音质8s超时，低音质3s超时\n *   - 强制最高音质优先，拒绝降级到低音质\n *\n * ==================== 借鉴源标注 ====================\n * 本音源综合以下开源音源之优点创作而成：\n * 1. 独家音源 v5        - 动态配置思想、指纹/版本校验、混淆编码\n * 2. 屿溪-终章          - 咪咕24bit/母带、酷狗/酷我官方接口、长青海棠\n * 3. K×H测试·暗香浮动夜  - 混淆编码、日志脱敏、音质降级链、API分组并发竞速、\n *                          QQ越权、ygking、残像、星海聚合、yunmge、念心、\n *                          HelloWorld签名、FishAPI签名、FFAPI、酷我代理解密、\n *                          Token认证、LRU缓存\n * 4. 玉宁熙-Pro          - 缓存系统、版本检查、音质分平台定义\n * 5. 星海音乐源 v2.2.8   - 动态源配置、服务器状态检查、音质映射\n * 6. 星澜聚合音源 v3.2.0 - QQ/WY/KW/KG/MG 全平台后端池、SHA256纯JS实现、\n *                          Promise.any并发、网易云EAPI加密\n * 7. 星海音乐源 v3.2.13  - ChKSz API 支持、酷我代理解密配置、GD API音质映射\n * ====================================================\n */"}, {"name": "幻音音源", "description": "", "version": "v3", "author": "竹佀", "homepage": "", "rawScript": "/*!\n * @name 幻音音源\n * @version v3\n * @author 竹佀\n */"}, {"name": "统一音乐源", "description": "基于GD音乐台（music.gdstudio.xyz）的通用音乐源", "version": "1.0.0", "author": "脚本作者：7878gyc API提供者：GDSTUDIO", "homepage": "", "rawScript": "/**\n * @name 统一音乐源\n * @description 基于GD音乐台（music.gdstudio.xyz）的通用音乐源\n * @version 1.0.0\n * @author 脚本作者：7878gyc API提供者：GDSTUDIO\n */"}, {"name": "西瓜聚合源", "description": "聚合星海/溯音/CHKSZ/长青/念心/Huibq等10+API后端，多源自动回退", "version": "v1.40", "author": "整合自多个音源", "homepage": "", "rawScript": "/*!\r\n * @name 西瓜聚合源\r\n * @description 聚合星海/溯音/CHKSZ/长青/念心/Huibq等10+API后端，多源自动回退\r\n * @version v1.40\r\n * @author 整合自多个音源\r\n */"}];

  var __cfgObj = (typeof CCNET_CONFIG !== 'undefined' && CCNET_CONFIG
    && typeof CCNET_CONFIG === 'object') ? CCNET_CONFIG : {};

  function __cfg(key, fallback) {
    var v = __cfgObj[key];
    return (typeof v === 'undefined' || v === null) ? fallback : v;
  }

  function __cfgNum(key, fallback) {
    var v = __cfg(key, fallback);
    if (typeof v === 'number') return (isFinite(v) ? v : fallback);
    var n = parseFloat(v);
    return isFinite(n) ? n : fallback;
  }

  function __cfgFlag(key, fallback) {
    var v = __cfg(key, fallback);
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (typeof v === 'string') {
      var s = v.toLowerCase();
      if (s === 'true' || s === '1' || s === 'on' || s === 'yes') return true;
      if (s === 'false' || s === '0' || s === 'off' || s === 'no') return false;
    }
    return fallback;
  }

  function __cfgStr(key, fallback) {
    var v = __cfg(key, fallback);
    return (typeof v === 'string') ? v : fallback;
  }

  function __mkRegex(src, fallback) {
    try {
      return new RegExp(src);
    } catch (e) {
      __log('段① 配置里的正则在 JS 里编译不过，已用默认值：' + src);
      try { return new RegExp(fallback); } catch (e2) { return /^https?:\/\//; }
    }
  }

  var __LEVELS = { silent: 0, error: 1, warn: 2, info: 3, debug: 4 };
  var __LEVEL_NAMES = { 0: 'silent', 1: 'error', 2: 'warn', 3: 'info', 4: 'debug' };
  var __logLevel = (function () {
    var lv = __cfgStr('logLevel', 'info');
    return (typeof __LEVELS[lv] === 'number') ? __LEVELS[lv] : __LEVELS.info;
  })();
  var __verbose = __logLevel >= __LEVELS.debug;

  var __attempt = __cfgNum('attemptTimeoutMs', 8000);        
  var __maxTries = __cfgNum('maxAttempts', 0);               
  var __parallel = __cfgNum('parallel', 3);                  
  var __guardOn = __cfgFlag('guardBlockProcessExit', true);  
  var __devtools = __cfgFlag('openDevTools', false);         
  var __localOn = __cfgFlag('declareLocal', true);           
  var __remember = __cfgFlag('rememberWinner', true);        
  var __manualLast = __cfgFlag('manualDeclLast', true);      
  var __fwdAlert = __cfgFlag('forwardUpdateAlert', true);    
  var __linkRe = __mkRegex(__cfgStr('linkPattern', '^https?:\\/\\/'), '^https?:\\/\\/');

  var __linkMaxRaw = __cfgNum('linkMaxLen', 2048);
  var __linkMax = (__linkMaxRaw > 0) ? __linkMaxRaw : 2048;

  var __KERNEL = __cfgStr('_kernel', '');
  var __CONTRACT = __cfgNum('_contract', 0);

  function __caps() {
    var out = [];
    out.push('Proxy ' + (__ProxyCtor ? '有' : '无（子源隔离退化成普通对象）'));
    out.push('Promise.any ' + (__P && typeof __P.any === 'function' ? '有' : '无（用手写的并发）'));
    out.push('Object.assign ' + (typeof Object.assign === 'function' ? '有' : '无'));
    out.push('Array.includes ' + (typeof Array.prototype.includes === 'function' ? '有' : '无'));
    out.push('Map ' + (typeof Map === 'function' ? '有' : '无'));
    return out.join('／');
  }

  function __ident() {
    return '内核 ' + (__KERNEL || '?') + '／契约 ' + (__CONTRACT || '?')
      + '｜宿主 ' + (__HOST.env || '?') + '｜能力：' + __caps();
  }

  // ==================== 段② 源清单（由 index.py 生成，可直接编辑）====================
  //  把某一条的 enabled 改成 false → 这个源立刻不参与播放（段④ 的代码块仍然在，
  //  改回 true 就恢复）。priority 数字越小越先试，越靠后的行数字越大（10/20/30…），
  //  所以「想把某个源提前」= 把它的 priority 改小，不必去挪代码块。
  //  weight 只在 priority 相同时当细调（同档内 weight 大的排前面），不跨档。
  //  timeoutMs 是给这一个源单独设的软超时（0 = 用全局值）；staticPlatforms 用来给
  //  异步上报 inited 的源手工补平台声明（它自己报不了，详见 sources.json 的说明）。
  //  forceState 是给健康度熔断留的手工兜底："up" = 永不熔断（熔断误判时用），
  //  "cool" = 当作一直熔断（等于临时停用，但保留在候选逻辑里便于对比）。
  //  注意它只在熔断总开关 health.enabled=true 时有意义 —— 熔断整个关掉时，
  //  也就没有"兜底"这回事了（那种情况请用 enabled:false）。
  //  熔断是按「源 × 平台」分别统计的：一个源在 kw 上被判死，不会连累它的 wy。
  //  platPriority 是**按平台单独定顺序**的稀疏覆盖（默认不写 = 该平台用 priority）：
  //  写 {"kw": 5} 就表示"只在 kw 上，排到优先级 5 这一档"，数字越小越先试。
  //  label 只影响日志里显示的名字；group 给规则引擎（ccnet.json 的 rules）当条件用。
  //  改这里只影响这一份产物；想让改动进 sources.json，跑一次 index.py。
  // ====================================================================
//<<CCNET-MANIFEST-START>>
  var CCNET_MANIFEST = [
  { "id": "裤佬svip音源_二改整合版", "enabled": true, "priority": 10, "weight": 1.0, "label": "👖裤佬SVIP音源(二改整合版) v3.0.0 | 2026-08-19", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "hywmusic_公益版", "enabled": true, "priority": 20, "weight": 1.0, "label": "HYWmusic_公益版 v1.2.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "k_h测试", "enabled": true, "priority": 30, "weight": 1.0, "label": "K×H测试 1.7.17", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "fish_music", "enabled": true, "priority": 40, "weight": 1.0, "label": "fish_music 1.0.1", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "星澜聚合音源_stellarwave", "enabled": true, "priority": 50, "weight": 1.0, "label": "星澜聚合音源 (StellarWave) v3.2.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "星海音乐源", "enabled": true, "priority": 60, "weight": 1.0, "label": "星海音乐源 v3.2.15", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "全豆要", "enabled": true, "priority": 70, "weight": 1.0, "label": "全豆要 v3.0.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "全豆要_聚合音源", "enabled": true, "priority": 80, "weight": 1.0, "label": "全豆要[聚合音源] v4.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "收集_聚合接口_lx版", "enabled": true, "priority": 90, "weight": 1.0, "label": "收集の聚合接口(LX版) 1.0.0-beta", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "溯音音源", "enabled": true, "priority": 100, "weight": 1.0, "label": "溯音音源 v1", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "稳定版音源", "enabled": true, "priority": 110, "weight": 1.0, "label": "稳定版音源 v1.0.3", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "聚合api接口_cf", "enabled": true, "priority": 120, "weight": 1.0, "label": "聚合API接口 (CF) 3", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "非常刀", "enabled": true, "priority": 130, "weight": 1.0, "label": "非常刀 v5", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "星澜聚合音源_stellarwave_2", "enabled": true, "priority": 140, "weight": 1.0, "label": "星澜聚合音源 (StellarWave) v4.0.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "全豆要_聚合音源_2", "enabled": true, "priority": 150, "weight": 1.0, "label": "全豆要[聚合音源] v4.1", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "弥音", "enabled": true, "priority": 160, "weight": 1.0, "label": "弥音 v1", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "kuwodes", "enabled": true, "priority": 170, "weight": 1.0, "label": "KuwoDES 1.0.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "monster", "enabled": true, "priority": 180, "weight": 1.0, "label": "monster🐱‍🐉 v1.5.5", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "c0", "enabled": true, "priority": 190, "weight": 1.0, "label": "𝖧౿ᥣᥣ𝗈 Ԝ𝗈𝗋ᥣᑯ 260809", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "gdstudio音乐源", "enabled": true, "priority": 200, "weight": 1.0, "label": "gdstudio音乐源 1.0.1", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "回避聚合_huibi_aggregate", "enabled": true, "priority": 210, "weight": 1.0, "label": "回避聚合 (HuiBi Aggregate) 0.0.1", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "幻音音源", "enabled": true, "priority": 220, "weight": 1.0, "label": "幻音音源 v3", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "统一音乐源", "enabled": true, "priority": 230, "weight": 1.0, "label": "统一音乐源 1.0.0", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  { "id": "西瓜聚合源", "enabled": true, "priority": 240, "weight": 1.0, "label": "西瓜聚合源 v1.40", "group": "", "timeoutMs": 0, "staticPlatforms": [], "forceState": "", "note": "" },
  ];
//<<CCNET-MANIFEST-END>>

  var __off = {};
  var __prio = {};
  var __wgt = {};
  var __lab = {};
  var __mto = {};
  var __manp = {};
  var __fst = {};
  var __ppr = {};
  var __inManifest = {};
  var __m, __e;
  if (typeof CCNET_MANIFEST !== 'undefined' && CCNET_MANIFEST) {
    for (__m = 0; __m < CCNET_MANIFEST.length; __m++) {
      __e = CCNET_MANIFEST[__m];
      if (!__e || typeof __e !== 'object' || !__e.id) continue;
      __inManifest[__e.id] = true;
      if (__e.enabled === false) __off[__e.id] = true;
      if (typeof __e.priority === 'number') __prio[__e.id] = __e.priority;
      if (typeof __e.weight === 'number') __wgt[__e.id] = __e.weight;
      if (typeof __e.timeoutMs === 'number' && __e.timeoutMs > 0) __mto[__e.id] = __e.timeoutMs;
      if (__e.label) __lab[__e.id] = String(__e.label);
      if (__e.staticPlatforms && __e.staticPlatforms.length) __manp[__e.id] = __e.staticPlatforms;
      if (__e.forceState === 'up' || __e.forceState === 'cool') __fst[__e.id] = __e.forceState;
      if (__e.platPriority && typeof __e.platPriority === 'object') __ppr[__e.id] = __e.platPriority;
    }
  }
  __logAt('debug', '已读内嵌清单：' + (typeof CCNET_MANIFEST !== 'undefined' && CCNET_MANIFEST
    ? CCNET_MANIFEST.length : 0) + ' 条');

  var __fakes = {};
  var __globals = {};
  var __decl = {};
  var __handler = {};
  var __thrown = {};
  var __active = -1;
  var __blocked = 0;
  var __alertSent = false;
  var __procShim = null;
  var __hit = {};

  function __emit(level, args) {
    if (__logLevel < level) return;
    try {
      if (typeof console === 'undefined' || !console) return;
      var fn = (level <= __LEVELS.error && typeof console.error === 'function') ? console.error
        : (level === __LEVELS.warn && typeof console.warn === 'function') ? console.warn
          : (typeof console.log === 'function' ? console.log : null);
      if (!fn) return;
      var a = ['[CCNET]'];
      for (var i = 0; i < args.length; i++) a.push(args[i]);
      fn.apply(console, a);
    } catch (e) {   }
  }

  function __log( ) { __emit(__LEVELS.info, arguments); }

  function __warn( ) { __emit(__LEVELS.warn, arguments); }

  function __err( ) { __emit(__LEVELS.error, arguments); }

  function __logAt(level,  ) {
    var n = (typeof level === 'number') ? level : __LEVELS[level];
    if (typeof n !== 'number') n = __LEVELS.info;
    __emit(n, Array.prototype.slice.call(arguments, 1));
  }

  function __id(i) { return __IDS[i] || ('#' + i); }

  function __name(i) { return __lab[__IDS[i]] || __NAMES[i] || ('#' + i); }

  function __isOff(i) { return __off[__IDS[i]] === true; }

  function __pri(i, fallback) {
    var v = __prio[__IDS[i]];
    return (typeof v === 'number') ? v : ((typeof fallback === 'number') ? fallback : (i + 1) * 10);
  }

  function __staticPlats(i) { return __manp[__IDS[i]] || null; }

  function __weight(i) {
    var v = __wgt[__IDS[i]];
    return (typeof v === 'number' && isFinite(v)) ? v : 1;
  }

  function __forceOf(i) { return __fst[__IDS[i]] || ''; }

  function __priOn(i, source) {
    var m = __ppr[__IDS[i]];
    if (m && typeof m[source] === 'number') return m[source];
    return __pri(i);
  }

  function __platPrioList() {
    var out = [];
    for (var i = 0; i < __N; i++) {
      if (__isOff(i)) continue;
      var m = __ppr[__IDS[i]];
      if (!m) continue;
      var parts = [];
      for (var p = 0; p < __PLATS.length; p++) {
        if (typeof m[__PLATS[p]] === 'number') parts.push(__PLATS[p] + '→' + m[__PLATS[p]]);
      }
      if (parts.length) out.push(__name(i) + '（' + parts.join('、') + '）');
    }
    return out;
  }

  function __forceList(state) {
    var out = [];
    for (var i = 0; i < __N; i++) if (!__isOff(i) && __forceOf(i) === state) out.push(__name(i));
    return out;
  }

  function __timeoutOf(i) {
    var v = __mto[__IDS[i]];
    return (typeof v === 'number' && v > 0) ? v : __attempt;
  }

  function __msg(e) { return (e && e.message) ? e.message : String(e); }

  function __union(list, add) {
    if (!add || !add.length) return list;
    for (var i = 0; i < add.length; i++) if (list.indexOf(add[i]) < 0) list.push(add[i]);
    return list;
  }

  function __cfgSummary() {
    return '日志=' + (__LEVEL_NAMES[__logLevel] || 'info')
      + '／并发=' + (__parallel > 1 ? __parallel + '个' : '关')
      + '／软超时=' + (__attempt > 0 ? __attempt + 'ms' : '不限')
      + '／最多尝试=' + (__maxTries > 0 ? __maxTries + '个' : '不限')
      + '／记忆=' + (__remember ? '开' : '关')
      + '／宿主保护=' + (__guardOn ? '开' : '关')
      + '／local=' + (__localOn ? '声明' : '不声明')
      + '／更新提示=' + (__fwdAlert ? '转发' : '忽略')
      + '／链接校验=' + (__linkRe.source || '') + ' 且 ≤' + __linkMax
      + (__linkMaxRaw !== __linkMax ? '（段① 里写的是 ' + __linkMaxRaw + '，已按宿主上限处理）' : '');
  }

  function __hCacheSummary() {
    var __fUp = __forceList('up'), __fCool = __forceList('cool');
    return '熔断=' + (__hOn
      ? ('开（近 ' + __hWin + ' 次成功率 <' + Math.round(__hRate * 100) + '% 且样本 ≥' + __hMin
         + ' → 冷却 ' + __hCoolDesc(__hCool) + '，上限 ' + __hCoolDesc(__hCoolMax) + '）')
      : '关')
      + '／缓存=' + (__cOn
        ? (__cacheStat().actions + '，' + Math.round(__cTtl / 1000) + 's，最多 ' + __cMax + ' 条')
        : '关')

      + ((__fUp.length || __fCool.length)
        ? ('／人工钉住：forceState=up ' + __fUp.length + ' 个、cool ' + __fCool.length + ' 个')
        : '');
  }

  function __badLink(v) {
    if (typeof v !== 'string') return '不是字符串';
    if (v.length > __linkMax) return '长度 ' + v.length + ' 超过上限 ' + __linkMax;
    if (!__linkRe.test(v)) return '不匹配链接规则 ' + (__linkRe.source || '');
    return null;
  }

  function __fakeLx(i) {
    if (__fakes[i]) return __fakes[i];
    var f = {};
    try { Object.setPrototypeOf(f, __HOST); } catch (e) {}
    function own(k, v) {
      try {
        Object.defineProperty(f, k, { value: v, writable: true, configurable: true, enumerable: true });
      } catch (e) { f[k] = v; }
    }
    own('EVENT_NAMES', __EVENT);
    own('version', __HOST.version);
    own('env', __HOST.env);
    own('utils', __HOST.utils);
    own('currentScriptInfo', __INFO[i] || {});
    own('request', __req);
    own('on', function (name, fn) { __capOn(i, name, fn); });
    own('send', function (name, data) { __capSend(i, name, data); });
    __fakes[i] = f;
    return f;
  }

  function __req(url, options, callback) {
    if (typeof options === 'function') { callback = options; options = {}; }
    if (!options || typeof options !== 'object') options = {};
    return __HOSTREQ(url, options, callback);
  }

  function __makeGlobal(i) {
    if (__globals[i]) return __globals[i];
    var fake = __fakeLx(i);
    var holder = {};
    try { Object.setPrototypeOf(holder, globalThis); } catch (e) {}

    if (!__ProxyCtor) {

      try { Object.defineProperty(holder, 'lx', { value: fake, writable: true, configurable: true }); } catch (e) {}
      __globals[i] = holder;
      return holder;
    }

    var g = new __ProxyCtor(holder, {
      get: function (target, key) {
        if (key === 'lx') return fake;
        if (__SELF_KEYS[key]) return g;
        if (key === 'process') return __processShim(globalThis);
        return globalThis[key];
      },
      set: function (target, key, value) {
        if (key === 'lx') return true;              
        try { globalThis[key] = value; } catch (e) {}
        return true;
      },
      has: function (target, key) {
        return (key === 'lx') ? true : (key in globalThis);
      },
      deleteProperty: function () { return true; },
      defineProperty: function (target, key, desc) {
        try { Object.defineProperty(globalThis, key, desc); } catch (e) {}
        return true;
      },
      preventExtensions: function () { return true; },
      isExtensible: function () { return true; },
    });
    __globals[i] = g;
    return g;
  }

  function __processShim(target) {
    var p = target.process;
    if (!p) return p;
    if (!__guardOn) return p;
    if (__procShim) return __procShim;
    try {
      __procShim = Object.create(p);
      var names = ['kill', 'abort', 'exit', 'reallyExit', '_exit'];
      for (var i = 0; i < names.length; i++) {
        if (typeof p[names[i]] !== 'function') continue;
        __procShim[names[i]] = (function (name) {
          return function () {
            __blocked++;
            if (__blocked <= 5) {
              __log('已拦截子源「' + __name(__active) + '」的 process.' + name + '() 调用，避免音源自毁导致播放器退出');
            }
          };
        })(names[i]);
      }
    } catch (e) { __procShim = p; }
    return __procShim;
  }

  function __capOn(i, name, fn) {
    if (name !== __REQ && name !== 'request') return;
    if (typeof fn === 'function') __handler[i] = fn;
  }

  function __capSend(i, name, data) {
    if (name === __INITED || name === 'inited') {
      __decl[i] = __pick(data && data.sources);
    } else if ((name === __ALERT || name === 'updateAlert') && __fwdAlert) {

      __alert(i, data);
    }
  }

  function __pick(sources) {
    var out = {};
    if (!sources || typeof sources !== 'object') return out;
    for (var k in sources) {
      var item = sources[k];
      if (!item || typeof item !== 'object') continue;
      if (__PLATS.indexOf(k) < 0) {
        __warn('忽略非官方平台 key「' + k + '」（来自 ' + __name(__active) + '）');
        continue;
      }
      var acts = (item.actions && item.actions.length ? item.actions : ['musicUrl']).slice(0);
      if (k !== 'local') acts = ['musicUrl'];
      var qs = [];
      if (k !== 'local' && item.qualitys && item.qualitys.length) {
        for (var q = 0; q < item.qualitys.length; q++) {
          if (__QUAL[item.qualitys[q]]) qs.push(item.qualitys[q]);
        }
      }
      out[k] = { actions: acts, qualitys: qs };
    }
    return out;
  }

  function __alert(i, data) {
    if (__alertSent || !data || !data.log) return;
    __alertSent = true;
    try {
      __SENDG.call(__HOST, __ALERT, {
        log: '[CCNET] 子源「' + __name(i) + '」提示更新：\n' + String(data.log).slice(0, 900),
        updateUrl: data.updateUrl
      });
    } catch (e) {}
  }

  function __load(i, fn) {

    if (__isOff(i)) {
      __log('已停用跳过：' + __name(i) + '（段② 清单里这条是 enabled:false）');
      return;
    }
    var g = __makeGlobal(i);
    var prev = __active;
    __active = i;
    try {

      fn.call(g, g, g, g, g, g, __fakeLx(i), __proc());
    } catch (e) {
      __thrown[i] = __msg(e);
      __log('✗ ' + __name(i) + ' 加载失败：' + __thrown[i]);
    } finally {
      __active = prev;
    }
  }

  function __proc() {
    return __processShim(globalThis);
  }

  function __usableItem(i, source, action) {
    if (__thrown[i]) return null;
    var d = __decl[i];
    var item = d ? d[source] : null;
    if (!item || typeof __handler[i] !== 'function') return null;
    if ((item.actions || ['musicUrl']).indexOf(action) < 0) return null;
    return item;
  }

  function __staticItem(i, source) {
    if (__thrown[i] || typeof __handler[i] !== 'function') return null;
    var list = __staticPlats(i);
    if (!list || list.indexOf(source) < 0) return null;
    var d = __decl[i];
    return (d && d[source]) || { actions: ['musicUrl'], qualitys: [] };
  }

  function __byPrio(source, a, b) {
    var pa = __priOn(a, source), pb = __priOn(b, source);
    if (pa !== pb) return pa - pb;

    var wa = __weight(a), wb = __weight(b);
    if (wa !== wb) return wb - wa;
    return a - b;
  }

  function __candidates(source, action, quality, blockedOut) {
    var pref = [], rest = [], manual = [];

    var last = (__remember && (typeof __hit[source] === 'number')) ? __hit[source] : -1;
    var lastIdx = -1;
    for (var i = 0; i < __N; i++) {
      var item = __usableItem(i, source, action);
      var stat = item ? null : __staticItem(i, source);
      if (!item && !stat) continue;
      var blk = __hWhyBlocked(i, source);
      if (blk) {

        if (blockedOut) blockedOut.push(__name(i) + (blk === 'forced' ? '（forceState:"cool"）' : ''));
        continue;
      }
      if (i === last) { lastIdx = i; continue; }
      if (item) {
        if (quality && (item.qualitys || []).indexOf(quality) >= 0) pref.push(i);
        else rest.push(i);
      } else {

        if (__manualLast) manual.push(i);
        else rest.push(i);
      }
    }

    function cmp(x, y) { return __byPrio(source, x, y); }
    pref.sort(cmp);
    rest.sort(cmp);
    manual.sort(cmp);
    var out = [];
    if (lastIdx >= 0) out.push(lastIdx);
    return out.concat(pref, rest, manual);
  }

  function __buildSources() {
    var out = {};
    for (var p = 0; p < __PLATS.length; p++) {
      var key = __PLATS[p], acts = [], qs = [], ok = false;
      if (key === 'local' && !__localOn) continue;   
      for (var i = 0; i < __N; i++) {
        var item = __usableItem(i, key, 'musicUrl');
        if (!item) {
          if (__staticItem(i, key)) ok = true;
          continue;
        }
        ok = true;
        __union(acts, item.actions);
        __union(qs, item.qualitys);
      }
      if (!ok) continue;
      if (key === 'local') {
        out[key] = {
          name: __LABEL[key], type: 'music',
          actions: acts.length ? acts : ['musicUrl'], qualitys: []
        };
      } else {
        var list = [];
        for (var m = 0; m < qs.length; m++) if (__QUAL[qs[m]]) list.push(qs[m]);
        out[key] = {
          name: __LABEL[key], type: 'music',
          actions: ['musicUrl'], qualitys: list.length ? list : ['128k']
        };
      }
    }
    return out;
  }

  function __guard(p, ms) {
    var wait = (typeof ms === 'number') ? ms : __attempt;
    p = __P.resolve(p);
    if (!(wait > 0)) return p;
    return new __P(function (resolve, reject) {
      var done = false;
      var t = __setT ? __setT(function () {
        if (done) return;
        done = true;

        var err = new Error('超过软超时 ' + wait + 'ms');
        err.__ccnetTimeout = true;
        reject(err);
      }, wait) : null;
      p.then(function (v) {
        if (done) return;
        done = true;
        if (t !== null && __clearT) __clearT(t);
        resolve(v);
      }, function (e) {
        if (done) return;
        done = true;
        if (t !== null && __clearT) __clearT(t);
        reject(e);
      });
    });
  }

  var __validators = {};

  function __registerValidator(action, fn) {
    if (typeof action === 'string' && typeof fn === 'function') __validators[action] = fn;
  }

  function __why(v) {
    if (typeof v === 'string') return JSON.stringify(v.trim().slice(0, 60));
    return typeof v;
  }

  function __normalize(action, v) {
    if ((action === 'musicUrl' || action === 'pic') && typeof v === 'string') return v.trim();
    return v;
  }

  function __validate(action, v, ctx) {
    var fn = __validators[action] || __validators['*'];
    if (typeof fn !== 'function') return null;
    var out;
    try {
      out = fn(v, ctx);
    } catch (e) {
      return '校验器「' + action + '」自身出错：' + __msg(e);
    }
    return out ? String(out) : null;
  }

  function __vLink(value, ctx) {
    var bad = __badLink(value);
    if (!bad) return null;
    return '没有返回可用的 http(s) 链接（' + bad + '），实际返回：' + __why(ctx.raw);
  }
  __registerValidator('musicUrl', __vLink);
  __registerValidator('pic', __vLink);

  var LYRIC_MAX = 51200, LYRIC_SUB_MAX = { tlyric: 5120, rlyric: 5120, lxlyric: 8192 };
  __registerValidator('lyric', function (v, ctx) {
    if (!v || typeof v !== 'object' || typeof v.lyric !== 'string' || !v.lyric.trim().length) {
      return '返回的歌词内容无效（实际返回：' + __why(ctx.raw) + '）';
    }
    if (v.lyric.length > LYRIC_MAX) {
      return '歌词长度 ' + v.lyric.length + ' 超过宿主上限 ' + LYRIC_MAX;
    }
    var dropped = null;
    for (var k in LYRIC_SUB_MAX) {
      var sub = v[k];
      if (sub === undefined || sub === null) continue;
      if (typeof sub !== 'string' || sub.length >= LYRIC_SUB_MAX[k]) {
        if (!dropped) { dropped = {}; for (var t in v) dropped[t] = v[t]; }
        delete dropped[k];
        __logAt('debug', '   摘掉不合格的 ' + k + '（' + (typeof sub === 'string'
          ? sub.length + ' 字符 ≥ ' + LYRIC_SUB_MAX[k] : '不是字符串') + '）');
      }
    }

    if (dropped) ctx.drop = dropped;
    return null;
  });

  __registerValidator('*', function (v) {
    return (v === undefined || v === null) ? '返回结果为空' : null;
  });

  var __hOn = __cfgFlag('healthEnabled', true);
  var __hWin = __cfgNum('healthWindow', 50);              
  var __hMin = __cfgNum('healthMinSamples', 5);           
  var __hRate = __cfgNum('healthFailRateBelow', 0.15);    
  var __hCool = __cfgNum('healthCooldownMs', 300000);     
  var __hCoolMax = __cfgNum('healthCooldownMaxMs', 1800000);
  var __hProbes = __cfgNum('healthHalfOpenProbes', 1);    

  if (!(__hWin > 0)) __hWin = 50;
  if (!(__hMin > 0)) __hMin = 1;
  if (!(__hRate >= 0 && __hRate <= 1)) __hRate = 0.15;
  if (!(__hCool > 0)) __hCool = 300000;
  if (!(__hCoolMax >= __hCool)) __hCoolMax = __hCool;
  if (!(__hProbes > 0)) __hProbes = 1;

  var __hSt = {};
  var __hCooledN = 0;

  function __nowMs() {
    try { return Date.now(); } catch (e) { return 0; }
  }

  function __hKey(i, source) { return __id(i) + '\u0001' + (source || ''); }

  function __hGet(i, source) {
    var key = __hKey(i, source);
    var s = __hSt[key];
    if (!s) {
      s = {
        name: __name(i), source: source || '', hist: [], ok: 0, fail: 0, tm: 0,
        phase: 'up',          
        coolUntil: 0, coolMs: __hCool, probes: 0, reason: '', coolCount: 0,
      };
      __hSt[key] = s;
    }
    s.name = __name(i);
    return s;
  }

  function __hLabel(s) { return s.name + (s.source ? '（' + s.source + '）' : ''); }

  function __hPush(s, good) {
    s.hist.push(good ? 1 : 0);
    while (s.hist.length > __hWin) s.hist.shift();
  }

  function __hOkCount(s) {
    var n = 0;
    for (var k = 0; k < s.hist.length; k++) if (s.hist[k]) n++;
    return n;
  }

  function __hWhyBlocked(i, source) {
    var forced = __forceOf(i);

    if (!__hOn) return '';
    if (forced === 'up') return '';         
    if (forced === 'cool') return 'forced'; 
    var s = __hSt[__hKey(i, source)];
    if (!s || s.phase === 'up') return '';
    if (s.phase === 'cool') {
      if (__nowMs() < s.coolUntil) return 'cool';
      s.phase = 'half';
      s.probes = __hProbes;
      __log('冷却到期，放行探测：' + __hLabel(s));
    }
    if (s.phase === 'half') {

      if (s.probes <= 0) return 'half';
      s.probes--;
      return '';
    }
    return '';
  }

  function __hOk(i, source) {
    if (!__hOn) return;
    var s = __hGet(i, source);
    s.ok++;
    __hPush(s, true);
    if (s.phase !== 'up') {
      __log('已恢复：' + __hLabel(s) + '（' + (s.phase === 'half' ? '半开探测成功' : '成功一次')
        + '，重新进入候选）');
    }
    s.phase = 'up';
    s.coolUntil = 0;
    s.coolMs = __hCool;
    s.probes = 0;
    s.reason = '';
  }

  function __hFail(i, source, isTimeout, why) {
    if (!__hOn) return;
    var s = __hGet(i, source);
    if (isTimeout) s.tm++;
    else s.fail++;
    __hPush(s, false);
    s.reason = why || '';

    if (__forceOf(i) === 'up') return;

    if (s.phase === 'half') {         
      s.coolMs = Math.min(s.coolMs * 2, __hCoolMax);
      s.coolUntil = __nowMs() + s.coolMs;
      s.phase = 'cool';
      s.probes = 0;
      __warn('探测失败，重新熔断 ' + __hCoolDesc(s.coolMs) + '：' + __hLabel(s) + '（' + s.reason + '）');
      return;
    }
    if (s.phase === 'cool') return;   

    var total = s.hist.length;
    if (total < __hMin) return;
    var rate = __hOkCount(s) / total;
    if (rate >= __hRate) return;
    s.phase = 'cool';
    s.coolMs = __hCool;
    s.coolUntil = __nowMs() + __hCool;
    s.coolCount++;
    __hCooledN++;
    s.reason = '近 ' + total + ' 次只成功 ' + __hOkCount(s) + ' 次';
    __warn('已熔断 ' + __hCoolDesc(__hCool) + '：' + __hLabel(s) + '（' + s.reason
      + '）—— 这个平台会走别的源；接口恢复后会自动回来。'
      + '想强制它一直可用：在段② 清单里给这条加 "forceState": "up"');
  }

  function __hCoolDesc(ms) {
    var sec = Math.round(ms / 1000);
    return sec >= 60 ? (Math.round(sec / 60) + ' 分钟') : (sec + ' 秒');
  }

  function __hCooled() {
    var out = [];
    for (var key in __hSt) {
      var s = __hSt[key];
      if (s.phase === 'cool' || s.phase === 'half') out.push(__hLabel(s));
    }
    return out;
  }

  function __hStat() {
    var up = 0, cool = 0, half = 0, total = 0;
    for (var key in __hSt) {
      var s = __hSt[key];
      total++;
      if (s.phase === 'up') up++;
      else if (s.phase === 'cool') cool++;
      else half++;
    }
    return { items: total, up: up, cool: cool, half: half, cooledTimes: __hCooledN };
  }

  function __hRows() {
    var rows = [];
    for (var key in __hSt) {
      var s = __hSt[key];
      var n = s.hist.length;
      rows.push({
        name: s.name,
        source: s.source,
        n: n,
        rate: n ? (__hOkCount(s) / n) : -1,
        phase: s.phase,
        reason: s.reason,
        text: __hLabel(s) + '：' + (n ? (__hOkCount(s) + '/' + n + ' 成功') : '无样本')
          + '（失败 ' + s.fail + ' / 超时 ' + s.tm + '）'
          + (s.phase === 'up' ? '' : (s.phase === 'cool' ? '【已熔断】' : '【探测中】'))
          + (s.reason ? ' ' + s.reason : ''),
      });
    }
    rows.sort(function (a, b) { return (a.rate - b.rate) || (b.n - a.n); });
    return rows;
  }

  var __cTtl = __cfgNum('cacheTtlMs', 300000);
  var __cMax = __cfgNum('cacheMaxEntries', 500);
  var __cActs = {};
  var __cActList = __cfg('cacheActions', ['lyric', 'musicUrl', 'pic']);
  if (typeof __cActList === 'string') __cActList = [__cActList];
  if (!__cActList || typeof __cActList.length !== 'number') __cActList = [];
  for (var __ca = 0; __ca < __cActList.length; __ca++) {
    if (typeof __cActList[__ca] === 'string') __cActs[__cActList[__ca]] = true;
  }
  var __cOn = __cTtl > 0 && __cMax > 0;
  if (__cMax <= 0) __cMax = 500;

  var __cMap = {};
  var __cOrder = [];
  var __cHit = 0, __cSet = 0, __cEvict = 0, __cExpire = 0;

  function __cacheable(action) { return __cOn && __cActs[action] === true; }

  function __songKey(info) {
    var m = info && info.musicInfo;
    if (m === undefined || m === null) return '';
    if (typeof m === 'string') return String(m);
    if (typeof m === 'number') return String(m);
    if (typeof m !== 'object') return '';
    var keys = ['songmid', 'songId', 'id', 'hash', 'copyrightId', 'path', 'filePath'];
    for (var k = 0; k < keys.length; k++) {
      var v = m[keys[k]];
      if (v !== undefined && v !== null && v !== '') return keys[k] + ':' + v;
    }
    return '';
  }

  function __cacheKey(action, source, quality, info) {
    var song = __songKey(info);
    if (!song) return '';
    return action + '\u0001' + source + '\u0001' + (quality || '') + '\u0001' + song;
  }

  function __cacheTrim() {
    var now = __nowMs();
    while (__cOrder.length) {
      var head = __cOrder[0];
      var e = __cMap[head];
      if (e && now < e.exp && __cOrder.length <= __cMax) break;
      __cOrder.shift();
      if (e) { __cEvict++; if (now >= e.exp) __cExpire++; }
      delete __cMap[head];
    }
  }

  function __cacheGet(k) {
    if (!__cOn || !k) return undefined;
    var e = __cMap[k];
    if (!e) return undefined;
    if (__nowMs() >= e.exp) {
      delete __cMap[k];
      var at = __cOrder.indexOf(k);
      if (at >= 0) __cOrder.splice(at, 1);
      __cExpire++;
      return undefined;
    }
    __cHit++;
    return e.v;
  }

  function __cacheSet(k, v) {
    if (!__cOn || !k || v === undefined || v === null) return;
    if (__cMap[k]) {
      var at = __cOrder.indexOf(k);
      if (at >= 0) __cOrder.splice(at, 1);
    }
    __cOrder.push(k);
    __cMap[k] = { v: v, exp: __nowMs() + __cTtl };
    __cSet++;
    __cacheTrim();
  }

  function __cacheStat() {
    return {
      on: __cOn, ttlMs: __cTtl, max: __cMax, size: __cOrder.length,
      hit: __cHit, set: __cSet, evict: __cEvict, expire: __cExpire,
      actions: __cActList.join('/') || '（空 = 什么都不缓存）',
    };
  }

  function __cacheClear() {
    __cMap = {};
    __cOrder = [];
    __cHit = __cSet = __cEvict = __cExpire = 0;
  }

  function __router(params) {
    var source = (params && params.source) || '';
    var action = (params && params.action) || 'musicUrl';
    var info = (params && params.info) || null;
    var quality = info ? info.type : null;

    var ck = __cacheable(action) ? __cacheKey(action, source, quality, info) : '';
    var cached = __cacheGet(ck);
    if (cached !== undefined) {
      __logAt('debug', '缓存命中「' + source + '/' + action + '」' + (quality || '')
        + '（' + (ck ? ck.slice(-24) : '') + '）');
      return __P.resolve(cached);
    }

    var blocked = [];
    var cands = __candidates(source, action, quality, blocked);
    if (!cands.length) {

      var why = blocked.length
        ? '（声明过它的 ' + blocked.length + ' 个源暂时不参与：' + blocked.join('、')
          + '。其中熔断的那些接口恢复后会自动回来；标了 forceState:"cool" 的要改段② 清单）'
        : '';
      return __P.reject(new Error('CCNET：没有可用于「' + source + '」的音源（' + action + '）' + why));
    }
    if (__maxTries > 0 && cands.length > __maxTries) cands = cands.slice(0, __maxTries);

    var errs = [], tried = 0, winner = -1;
    if (__verbose) {
      var nm = [];
      for (var k = 0; k < cands.length; k++) nm.push(__name(cands[k]));
      __log('「' + source + '/' + action + '」候选 ' + cands.length + ' 个：' + nm.join('、'));
    }

    function __check(r, i) {
      var ctx = { action: action, source: source, quality: quality, raw: r };
      var out = __normalize(action, r);
      var bad = __validate(action, out, ctx);
      if (bad) throw __fail(i, bad);
      return ctx.drop ? ctx.drop : out;
    }

    function __fail(i, why, isTimeout) {
      var m = __name(i) + '：' + why;
      errs.push(m);
      __hFail(i, source, !!isTimeout, why);
      __logAt('debug', '   ✗ ' + __name(i) + ' → ' + why);
      return new Error(m);
    }

    function one(i) {
      tried++;
      __logAt('debug', '→ 尝试「' + source + '/' + action + '」用 ' + __name(i));
      var p;
      try {
        p = __handler[i]({ source: source, action: action, info: info });
      } catch (e) {
        p = __P.reject(e);
      }
      return __guard(p, __timeoutOf(i)).then(function (r) {
        var out = __check(r, i);
        __logAt('debug', '   ✓ ' + __name(i) + ' 返回 ' + __why(out));
        __hOk(i, source);
        __cacheSet(ck, out);
        if (winner < 0) {
          winner = i;
          if (__remember) __hit[source] = i;
          __log('「' + source + '」由子源「' + __name(i) + '」提供服务');
        }
        return out;
      }, function (e) {
        throw __fail(i, __msg(e), e && e.__ccnetTimeout === true);
      });
    }

    function seq(list, at) {
      if (at >= list.length) return __P.reject(new Error('候选源已全部失败'));
      return one(list[at]).then(null, function () { return seq(list, at + 1); });
    }

    function anyOf(list) {
      return new __P(function (resolve, reject) {
        var left = list.length, first = null;
        if (!left) return reject(new Error('候选源已全部失败'));
        for (var i = 0; i < list.length; i++) {
          (function (k) {
            one(list[k]).then(resolve, function (e) {
              if (!first) first = e;
              if (--left === 0) reject(first);
            });
          })(i);
        }
      });
    }

    var n = (__parallel > 1) ? Math.min(__parallel, cands.length) : 0;
    var run;
    if (n > 1 && n < cands.length) {
      run = anyOf(cands.slice(0, n)).then(null, function () { return seq(cands, n); });
    } else if (n > 1) {
      run = anyOf(cands);
    } else {
      run = seq(cands, 0);
    }

    return run.then(null, function () {
      throw new Error('CCNET：已尝试 ' + tried + ' 个子源，均未取到结果 → ' + (errs.join(' ｜ ') || '未知错误'));
    });
  }

  // [01] 裤佬svip音源_二改整合版 | A0-裤佬SVIP音源-v3.0.0.js
  __load(0, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send, env, version } = globalThis.lx;

const CHKSZ_APIKEY = '';

const KW_DECRYPT_PROXY = {
  url: '',
  allowEncryptedLossless: false,
  urlParamName: 'url',
  ekeyParamName: 'ekey'
};

const PLATFORMS = ['wy', 'tx', 'kw', 'kg', 'mg'];
const PLATFORM_NAMES = {
  wy: '网易云音乐', tx: 'QQ音乐', kw: '酷我音乐', kg: '酷狗音乐', mg: '咪咕音乐'
};

const MUSIC_QUALITIES = {
  wy: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'jyeffect', 'sky', 'jymaster'],
  tx: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master'],
  kw: ['128k', '320k', 'flac', 'flac24bit', 'hires'],
  kg: ['128k', '320k', 'flac', 'flac24bit', 'hires'],
  mg: ['128k', '320k', 'flac', 'flac24bit']
};

const QUALITY_ORDER = ['jymaster', 'sky', 'jyeffect', 'master', 'hires', 'flac24bit', 'atmos', 'flac', '320k', '192k', '128k'];

const API = {

  kgAnnie: 'https://api.music.lerd.dpdns.org/kg',

  txVkeys: 'https://api.vkeys.cn/v2/music/tencent/geturl',

  kwMobi: 'http://nmobi.kuwo.cn/mobi.s',

  wyWeb: 'https://c.wwwweb.top/music/url',

  xhBackend: 'https://yy.zddyr.top/lx/api/',

  xhBackendFallback: 'https://zrcdy.dpdns.org/lx/api/',

  gdStudio: 'https://music-api.gdstudio.xyz/api.php',

  chkszWy: 'https://api.chksz.com/api/163_music',
  chkszTx: 'https://api.chksz.com/api/qq_music',

  qsVip: 'https://api.qs.vip/music/',
  qsVipFallback: 'https://api.qs.la/music/'
};

const QUALITY_MAP = {
  kg: { '128k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac24bit', 'hires': 'flac24bit' },
  tx: { '128k': '6', '192k': '7', '320k': '8', 'flac': '10', 'flac24bit': '11', 'hires': '11', 'atmos': '13', 'master': '14' },
  kw: { '128k': '128kmp3', '320k': '320kmp3', 'flac': '2000kflac', 'flac24bit': '4000kflac', 'hires': '4000kflac' },
  wy: { '128k': '128k', '192k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac24bit', 'hires': 'hires', 'jyeffect': 'hires', 'sky': 'atmos', 'jymaster': 'master' },
  mg: { '128k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac24bit' }
};

const GD_BR_MAP = { '128k': '128', '192k': '192', '320k': '320', 'flac': '740', 'flac24bit': '999', 'hires': '999' };
const CHKSZ_WY_LEVEL = { '128k': 'standard', '192k': 'exhigh', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'hires', 'hires': 'hires', 'jyeffect': 'jyeffect', 'sky': 'sky', 'jymaster': 'jymaster' };
const CHKSZ_TX_SIZE = { '128k': '128k', '192k': '320k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'hires', 'hires': 'hires', 'atmos': 'master', 'master': 'master' };

const httpFetch = (url, options = {}) => new Promise((resolve, reject) => {
  request(url, { timeout: 5000, ...options }, (err, resp) => {
    if (err) return reject(err);
    let body = resp.body;
    if (typeof body === 'string') {
      const t = body.trim();
      if (t.startsWith('{') || t.startsWith('[')) {
        try { body = JSON.parse(t); } catch (e) {}
      }
    }
    resolve({ statusCode: resp.statusCode, headers: resp.headers || {}, body });
  });
});

function mapQuality(quality, avail) {
  if (avail.includes(quality)) return quality;
  for (const q of QUALITY_ORDER) {
    if (avail.includes(q)) return q;
  }
  return avail[0] || '128k';
}

function getSongId(info) {
  return info?.hash || info?.songmid || info?.id || info?.rid || '';
}

const cache = new Map();
const CACHE_TTL = 6 * 60 * 60 * 1000;
const MAX_CACHE_SIZE = 500;

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, time: Date.now() });
  if (cache.size > MAX_CACHE_SIZE) {
    const first = cache.keys().next().value;
    if (first) cache.delete(first);
  }
}

async function resolveKgAnnie(info, quality) {
  const hash = info.SQFileHash || info.HQFileHash || info.FileHash || info.hash || info.songmid;
  if (!hash) throw new Error('缺少酷狗歌曲hash');
  const type = QUALITY_MAP.kg[quality] || '128k';
  const resp = await httpFetch(API.kgAnnie, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, musicInfo: { source: 'kg', hash } })
  });
  if (resp.body?.code === 200 && resp.body?.data?.url) return resp.body.data.url;
  throw new Error(resp.body?.message || `酷狗安妮获取失败(code:${resp.body?.code})`);
}

async function resolveTxVkeys(info, quality) {
  const mid = info.songmid;
  if (!mid) throw new Error('缺少QQ songmid');
  const qc = QUALITY_MAP.tx[quality] || '6';
  const resp = await httpFetch(`${API.txVkeys}?mid=${mid}&quality=${qc}`);
  if (resp.body?.code === 200 && resp.body?.data?.url) return resp.body.data.url;
  throw new Error(resp.body?.message || `QQ vkeys获取失败(code:${resp.body?.code})`);
}

async function resolveKwMobi(info, quality) {
  const rid = info.rid || info.hash || info.songmid || info.id;
  if (!rid) throw new Error('缺少酷我歌曲ID');
  const br = QUALITY_MAP.kw[quality];
  if (!br) throw new Error('不支持的酷我音质');
  const params = {
    f: 'web', user: '0',
    source: 'kwplayerhd_ar_4.3.0.8_tianbao_T1A_qirui.apk',
    type: 'convert_url_with_sign', rid, br
  };
  const qs = Object.keys(params).map(k => `${k}=${encodeURIComponent(params[k])}`).join('&');
  const resp = await httpFetch(`${API.kwMobi}?${qs}`);
  if (resp.body?.code === 200 && resp.body?.data?.url) return resp.body.data.url;
  throw new Error(resp.body?.msg || `酷我mobi获取失败(code:${resp.body?.code})`);
}

async function resolveWyWeb(info, quality) {
  const id = info.songmid || info.id || info.hash;
  if (!id) throw new Error('缺少网易歌曲ID');
  const level = QUALITY_MAP.wy[quality] || 'flac';
  const resp = await httpFetch(API.wyWeb, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { source: 'wy', musicId: id, quality: level }
  });
  const b = resp.body;
  if (b?.code === 200 && b?.url) return b.url;
  throw new Error(b?.message || `网易web获取失败(code:${b?.code})`);
}

async function resolveXhBackend(platform, info, quality, baseUrl) {
  const sourceMap = { wy: 'netease', tx: 'qq', kw: 'kw', kg: 'kg', mg: 'migu' };
  const source = sourceMap[platform] || platform;
  const params = { source, quality: quality || '' };
  params.songmid = info.songmid || info.id || '';
  params.name = info.name || '';
  params.singer = info.singer || '';
  params.albumName = info.albumName || info.album || '';
  params.interval = info.interval || '';

  if (platform === 'kg') {
    const types = info._types || {};
    params.mainHash = info.hash || '';
    if (types[quality]?.hash) params.hash = types[quality].hash;
    params.albumId = info.albumId || '';
  }

  const qs = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
  const url = `${baseUrl}?${qs}`;
  const resp = await httpFetch(url);
  const data = resp.body;
  if (data?.code === 200 && data?.url) {

    if (platform === 'kw' && KW_DECRYPT_PROXY.allowEncryptedLossless && data.ekey && KW_DECRYPT_PROXY.url) {
      return `${KW_DECRYPT_PROXY.url}?${KW_DECRYPT_PROXY.urlParamName}=${encodeURIComponent(data.url)}&${KW_DECRYPT_PROXY.ekeyParamName}=${encodeURIComponent(data.ekey)}`;
    }
    return data.url;
  }
  throw new Error(data?.msg || `星海后端获取失败(code:${data?.code})`);
}

async function resolveWyGdStudio(info, quality) {
  const id = info.songmid || info.id || info.hash;
  if (!id) throw new Error('缺少网易歌曲ID');
  const br = GD_BR_MAP[quality] || '320';
  const url = `${API.gdStudio}?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light&types=url&source=netease&id=${id}&br=${br}`;
  const resp = await httpFetch(url);
  if (resp.body?.url) return resp.body.url;

  if (quality === 'hires' || quality === 'flac24bit') {
    const fallbackUrl = `${API.gdStudio}?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light&types=url&source=netease&id=${id}&br=740`;
    const resp2 = await httpFetch(fallbackUrl);
    if (resp2.body?.url) return resp2.body.url;
  }
  throw new Error(resp.body?.msg || 'GD Studio获取失败');
}

async function resolveWyChksz(info, quality) {
  if (!CHKSZ_APIKEY) throw new Error('ChKSz未配置apikey');
  const id = info.songmid || info.id || info.hash;
  if (!id) throw new Error('缺少网易歌曲ID');
  const level = CHKSZ_WY_LEVEL[quality];
  if (!level) throw new Error(`ChKSz不支持网易音质:${quality}`);
  const resp = await httpFetch(`${API.chkszWy}?id=${id}&level=${level}&apikey=${encodeURIComponent(CHKSZ_APIKEY)}`);
  if (resp.body?.code === 200 && resp.body?.data?.url) return resp.body.data.url;
  throw new Error(resp.body?.msg || 'ChKSz网易获取失败');
}

async function resolveTxChksz(info, quality) {
  if (!CHKSZ_APIKEY) throw new Error('ChKSz未配置apikey');
  const mid = info.songmid || info.id;
  if (!mid) throw new Error('缺少QQ mid');
  const size = CHKSZ_TX_SIZE[quality];
  if (!size) throw new Error(`ChKSz不支持QQ音质:${quality}`);
  const resp = await httpFetch(`${API.chkszTx}?mid=${mid}&size=${size}&type=json&apikey=${encodeURIComponent(CHKSZ_APIKEY)}`);
  if (resp.body?.code === 200 && resp.body?.url) return resp.body.url;
  throw new Error(resp.body?.msg || 'ChKSz QQ获取失败');
}

async function searchQsVip(keywords, page = 1, pageSize = 30) {
  if (!keywords) return { isEnd: true, list: [] };
  const urls = [API.qsVip, API.qsVipFallback];
  let lastErr = null;
  for (const baseUrl of urls) {
    try {
      const url = `${baseUrl}?act=search&keywords=${encodeURIComponent(keywords)}&page=${page}&pagesize=${pageSize}&type=music`;
      const resp = await httpFetch(url);
      const data = resp.body;
      if (data?.code === 200 && Array.isArray(data?.data?.list)) {
        const list = data.data.list.map(item => ({
          id: item.id || '',
          songmid: item.id || '',
          hash: item.id || '',
          name: item.name || '',
          singer: item.singer || item.artist || '',
          albumName: item.albumName || item.album || '',
          duration: item.duration || 0,
          pic: item.pic || item.cover || ''
        }));
        const total = Number(data.data.total) || list.length;
        return { isEnd: list.length < pageSize, list, total };
      }
      lastErr = new Error(data?.msg || 'QSVIP搜索异常');
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('QSVIP搜索全部失败');
}

const extraCache = new Map();

async function fetchMusicUrl(platform, info, quality) {
  const actualQuality = mapQuality(quality, MUSIC_QUALITIES[platform] || ['128k', '320k', 'flac']);
  const id = info.hash || info.songmid || info.id;
  if (!id) throw new Error('缺少歌曲标识符');

  const chains = {
    wy: [
      { name: 'ChKSz网易', fn: () => resolveWyChksz(info, actualQuality) },
      { name: 'GD Studio', fn: () => resolveWyGdStudio(info, actualQuality) },
      { name: 'c.wwwweb.top', fn: () => resolveWyWeb(info, actualQuality) },
      { name: '星海后端', fn: () => resolveXhBackend('wy', info, actualQuality, API.xhBackend) },
      { name: '星海后端(备)', fn: () => resolveXhBackend('wy', info, actualQuality, API.xhBackendFallback) }
    ],
    tx: [
      { name: 'ChKSz QQ', fn: () => resolveTxChksz(info, actualQuality) },
      { name: 'vkeys QQ', fn: () => resolveTxVkeys(info, actualQuality) },
      { name: '星海后端', fn: () => resolveXhBackend('tx', info, actualQuality, API.xhBackend) },
      { name: '星海后端(备)', fn: () => resolveXhBackend('tx', info, actualQuality, API.xhBackendFallback) }
    ],
    kw: [
      { name: '星海后端', fn: () => resolveXhBackend('kw', info, actualQuality, API.xhBackend) },
      { name: '酷我mobi', fn: () => resolveKwMobi(info, actualQuality) },
      { name: '星海后端(备)', fn: () => resolveXhBackend('kw', info, actualQuality, API.xhBackendFallback) }
    ],
    kg: [
      { name: '酷狗安妮', fn: () => resolveKgAnnie(info, actualQuality) },
      { name: '星海后端', fn: () => resolveXhBackend('kg', info, actualQuality, API.xhBackend) },
      { name: '星海后端(备)', fn: () => resolveXhBackend('kg', info, actualQuality, API.xhBackendFallback) }
    ],
    mg: [
      { name: '星海后端', fn: () => resolveXhBackend('mg', info, actualQuality, API.xhBackend) },
      { name: '星海后端(备)', fn: () => resolveXhBackend('mg', info, actualQuality, API.xhBackendFallback) }
    ]
  };

  const chain = chains[platform];
  if (!chain) throw new Error(`不支持的平台: ${platform}`);

  const errors = [];
  for (const provider of chain) {
    try {
      const url = await provider.fn();
      if (typeof url === 'string' && url.startsWith('http')) {
        extraCache.set(id, { provider: provider.name });
        return url;
      }
      errors.push(`${provider.name}: 返回无效URL`);
    } catch (e) {
      errors.push(`${provider.name}: ${e.message}`);
    }
  }
  throw new Error(`所有接口均失败: ${errors.join('; ')}`);
}

on(EVENT_NAMES.request, async ({ action, source, info }) => {
  if (!source || !PLATFORMS.includes(source)) {
    throw new Error(`不支持的音乐源: ${source}`);
  }

  if (action === 'search') {
    const keywords = info?.text || '';
    const page = info?.page || 1;
    const pageSize = info?.limit || 30;
    return searchQsVip(keywords, page, pageSize);
  }

  if (action === 'musicUrl') {
    if (!info?.musicInfo || !info?.type) throw new Error('参数不完整');
    return fetchMusicUrl(source, info.musicInfo, info.type);
  }

  if (action === 'lyric') {
    return { lyric: '', tlyric: '' };
  }

  if (action === 'pic') {
    const id = info?.musicInfo?.hash || info?.musicInfo?.songmid || info?.musicInfo?.id;
    return null;
  }

  throw new Error(`不支持的操作: ${action}`);
});

const sources = {};
PLATFORMS.forEach(p => {
  sources[p] = {
    name: PLATFORM_NAMES[p],
    type: 'music',
    actions: ['search', 'musicUrl', 'lyric', 'pic'],
    qualitys: MUSIC_QUALITIES[p]
  };
});

send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: false,
  sources
});

  })

  // [02] hywmusic_公益版 | A9-HYWmusic_公益版-v1.2.0.js
  __load(1, function (globalThis, window, self, top, parent, lx, process) {
'use strict'

const DEV_ENABLE = false
const UPDATE_ENABLE = true

const { EVENT_NAMES, request, on, send, env, version: LX_VERSION } = globalThis.lx

const MUSIC_QUALITY = JSON.parse('{"kw":["128k","320k","flac","flac24bit"],"tx":["128k","320k","flac","flac24bit"],"wy":["128k","320k","flac","flac24bit"],"mg":["128k","320k"],"qs":["128k","320k"],"bili":["128k","320k"],"ytb":["128k"],"xm":["128k","320k"],"kg":["128k","320k","flac","flac24bit"]}')
const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY)

const API_BASE = 'https://103.79.184.97'
const CARD_KEY = '6C1F-53W0-GRKI-EVFG'

const log = {
  info: (...args) => { try { console.log('[HYWmusic]', ...args) } catch(e) {} },
  error: (...args) => { try { console.error('[HYWmusic ERROR]', ...args) } catch(e) {} },
  warn: (...args) => { try { console.warn('[HYWmusic WARN]', ...args) } catch(e) {} },
}

if (!API_BASE || !/^https?:\/\//.test(API_BASE)) {
  log.error('API_BASE 未配置或格式非法: "' + API_BASE + '"，所有请求都将失败')
  log.error('请联系发行版管理员在创建发行版时设置 metadata.apiUrl')
}

const httpFetch = (url, options = { method: 'GET' }) => {
  return new Promise((resolve, reject) => {
    if (!API_BASE || !/^https?:\/\//.test(API_BASE)) {
      return reject(new Error('API_BASE 未配置或格式非法'))
    }
    const headers = {
      ...(options.headers || {}),
      'User-Agent': env ? `lx-music-${env}/${LX_VERSION}` : `lx-music-request/${LX_VERSION || '1.0.0'}`,
    }

    if (CARD_KEY && /^[\x20-\x7E]*$/.test(CARD_KEY)) headers['X-Card-Key'] = CARD_KEY
    const reqOptions = { ...options, headers }
    if (!reqOptions.method) reqOptions.method = 'GET'

    request(url, reqOptions, (err, resp, body) => {
      if (err) return reject(err)
      const respBody = (resp && resp.body !== undefined && resp.body !== null)
        ? resp.body
        : body
      resolve({
        statusCode: resp ? resp.statusCode : undefined,
        headers: resp ? resp.headers : undefined,
        body: respBody,
      })
    })
  })
}

const collectMusicInfoParams = (musicInfo, platform) => {
  if (!musicInfo) return {}
  const params = {}
  const songId = musicInfo.songmid || musicInfo.songId || musicInfo.id || musicInfo.hash
    || musicInfo.rid || musicInfo.musicId || musicInfo.copyrightId || musicInfo.songid || ''
  if (songId) params.songId = songId
  if (musicInfo.songmid) params.songmid = musicInfo.songmid
  if (musicInfo.hash) params.hash = musicInfo.hash

  const fields = ['albumAudioId', 'strMediaMid', 'mediaMid', 'copyrightId', 'rid', 'musicId',
    'albumId', 'albumName', 'albumMid', 'songname', 'songName', 'name', 'singer', 'singers', 'artist',
    'interval', 'duration'] 
  for (const f of fields) {
    if (musicInfo[f] !== undefined && musicInfo[f] !== null && musicInfo[f] !== '') params[f] = musicInfo[f]
    if (musicInfo.meta && musicInfo.meta[f] !== undefined && musicInfo.meta[f] !== null && musicInfo.meta[f] !== '') params[f] = musicInfo.meta[f]
  }
  params.platform = platform
  params.source = platform
  return params
}

const handleGetMusicUrl = async (source, musicInfo, quality) => {
  const params = collectMusicInfoParams(musicInfo, source)
  if (quality) params.quality = quality
  if (CARD_KEY) params.key = CARD_KEY

  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => k + '=' + encodeURIComponent(String(v)))
    .join('&')
  const url = API_BASE + '/api/music/url' + (query ? '?' + query : '')

  const resp = await httpFetch(url, { method: 'GET' })
  let respBody = resp && resp.body
  if (typeof respBody === 'string') {
    try { respBody = JSON.parse(respBody) } catch (e) {
      throw new Error('服务端返回非 JSON 数据')
    }
  }
  if (!respBody || typeof respBody !== 'object') {
    throw new Error('空响应')
  }
  switch (respBody.code) {
    case 200:
      return respBody.url || respBody.data || respBody
    case 401:
    case 403:
      throw new Error(respBody.message || '鉴权失败')
    case 429:
      throw new Error('请求过速')
    case 500:
      throw new Error(respBody.message || '服务器错误')
    default:
      throw new Error(respBody.message || ('未知错误 code=' + respBody.code))
  }
}

const handleGetLyric = async (source, musicInfo) => {
  const params = collectMusicInfoParams(musicInfo, source)
  params.action = 'lyric'
  if (CARD_KEY) params.key = CARD_KEY
  try {
    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => k + '=' + encodeURIComponent(String(v)))
      .join('&')
    const url = API_BASE + '/api/music/info' + (query ? '?' + query : '')
    const resp = await httpFetch(url, { method: 'GET' })
    let respBody = resp && resp.body
    if (typeof respBody === 'string') {
      try { respBody = JSON.parse(respBody) } catch (e) { respBody = null }
    }
    if (!respBody || respBody.code !== 200) return { lyric: '', tlyric: null, rlyric: null, lxlyric: null }
    const data = respBody.data || respBody
    return {
      lyric: data.lyric || '',
      tlyric: data.tlyric || null,
      rlyric: data.rlyric || null,
      lxlyric: data.lxlyric || null,
    }
  } catch (e) {
    return { lyric: '', tlyric: null, rlyric: null, lxlyric: null }
  }
}

const handleGetPic = async (source, musicInfo) => {
  const params = collectMusicInfoParams(musicInfo, source)
  params.action = 'pic'
  if (CARD_KEY) params.key = CARD_KEY
  try {
    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => k + '=' + encodeURIComponent(String(v)))
      .join('&')
    const url = API_BASE + '/api/music/info' + (query ? '?' + query : '')
    const resp = await httpFetch(url, { method: 'GET' })
    let respBody = resp && resp.body
    if (typeof respBody === 'string') {
      try { respBody = JSON.parse(respBody) } catch (e) { return '' }
    }
    if (!respBody || respBody.code !== 200) return ''
    const data = respBody.data || respBody
    return data.pic || data.url || ''
  } catch (e) { return '' }
}

on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl':
      return handleGetMusicUrl(source, info.musicInfo, info.type)
    case 'lyric':
      return handleGetLyric(source, info.musicInfo)
    case 'pic':
      return handleGetPic(source, info.musicInfo)
    default:
      return Promise.reject('action not support: ' + action)
  }
})

const musicSources = {}
MUSIC_SOURCE.forEach((item) => {
  musicSources[item] = {
    name: item,
    type: 'music',
    actions: ['musicUrl'],
    qualitys: MUSIC_QUALITY[item],
  }
})

send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: DEV_ENABLE,
  sources: musicSources,
})

const SCRIPT_VERSION = 'v1.2.0'
const UPDATE_URL = 'https://103.79.184.97/api/releases?script=HYWmusic_%E5%85%AC%E7%9B%8A%E7%89%88&scriptType=free&releaseType=lx&version=' + SCRIPT_VERSION

const parseVer = (s) => {
  const m = String(s || '').match(/\d+(?:\.\d+)+/)
  if (!m) return null
  return m[0].split('.').map((n) => parseInt(n, 10))
}

const cmpVer = (a, b) => {
  const va = parseVer(a)
  const vb = parseVer(b)
  if (!va || !vb) return 0
  const len = Math.max(va.length, vb.length)
  for (let i = 0; i < len; i++) {
    const x = va[i] || 0
    const y = vb[i] || 0
    if (x > y) return 1
    if (x < y) return -1
  }
  return 0
}

const checkUpdate = async () => {
  try {
    if (!UPDATE_ENABLE) return
    log.info('检查更新: ' + UPDATE_URL)

    const resp = await httpFetch(UPDATE_URL, { method: 'GET' })
    if (!resp || resp.statusCode !== 200) return
    let respBody = resp.body
    if (typeof respBody === 'string') {
      try { respBody = JSON.parse(respBody) } catch (e) { return }
    }
    if (!respBody || typeof respBody !== 'object') return
    if (respBody.code !== 200 || !respBody.data || !respBody.data.version) return
    const latestVersion = respBody.data.version
    if (cmpVer(latestVersion, SCRIPT_VERSION) > 0) {

      const absUrl = respBody.data.url && String(respBody.data.url).indexOf('http') === 0
        ? respBody.data.url
        : API_BASE + (respBody.data.url || '')
      log.info('发现新版本 ' + latestVersion + ' -> ' + absUrl)
      send(EVENT_NAMES.updateAlert, {
        log: respBody.data.updateLog || ('发现新版本 ' + latestVersion),
        updateUrl: absUrl,
      })
    } else {
      log.info('当前已是最新版本: ' + SCRIPT_VERSION)
    }
  } catch (e) {
    log.warn('更新检查失败: ' + (e && e.message))
  }
}

checkUpdate()

  })

  // [03] k_h测试 | A9-K×H测试-v1.7.17.js
  __load(2, function (globalThis, window, self, top, parent, lx, process) {
'use strict'

const { EVENT_NAMES, request, on, send, env, version } = globalThis.lx

const _XOR_KEY = 'KonekoHYW_v176_SecretKey_2026'
const _B64_X = 'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210+/'
const _xd = (s) => {
  if (!s || s[0] !== 'X') return s
  try {
    const r = s.slice(1).split('').reverse().join('')

    let padding = ''
    let rest = ''
    for (const c of r) {
      if (c === '=') padding += c
      else rest += c
    }
    const normalized = rest + padding
    let binary = ''
    for (let i = 0; i < normalized.length; i += 4) {
      const a = _B64_X.indexOf(normalized[i])
      const b = _B64_X.indexOf(normalized[i + 1])
      const c = _B64_X.indexOf(normalized[i + 2])
      const d = _B64_X.indexOf(normalized[i + 3])
      if (a < 0 || b < 0) break
      binary += String.fromCharCode((a << 2) | (b >> 4))
      if (c >= 0 && normalized[i + 2] !== '=') binary += String.fromCharCode(((b & 15) << 4) | (c >> 2))
      if (d >= 0 && normalized[i + 3] !== '=') binary += String.fromCharCode(((c & 3) << 6) | d)
    }
    let out = ''
    for (let i = 0; i < binary.length; i++) {
      out += String.fromCharCode(binary.charCodeAt(i) ^ _XOR_KEY.charCodeAt(i % _XOR_KEY.length))
    }
    try { return decodeURIComponent(escape(out)) } catch (e) { return out }
  } catch (e) { return s }
}

const _B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const _d = (s) => {
  try {
    const r = s.split('').reverse().join('')
    let clean = ''
    for (let i = 0; i < r.length; i++) {
      const c = r[i]
      if (_B64.indexOf(c) >= 0 || c === '=') clean += c
    }
    let binary = ''
    for (let i = 0; i < clean.length; i += 4) {
      const a = _B64.indexOf(clean[i])
      const b = _B64.indexOf(clean[i + 1])
      const c = _B64.indexOf(clean[i + 2])
      const d = _B64.indexOf(clean[i + 3])
      if (a < 0 || b < 0) break
      binary += String.fromCharCode((a << 2) | (b >> 4))
      if (c >= 0 && clean[i + 2] !== '=') binary += String.fromCharCode(((b & 15) << 4) | (c >> 2))
      if (d >= 0 && clean[i + 3] !== '=') binary += String.fromCharCode(((c & 3) << 6) | d)
    }
    try { return decodeURIComponent(escape(binary)) } catch (e) { return binary }
  } catch (e) { return s }
}

const _e = (s) => {
  try {

    let binary = ''
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i)
      if (c < 128) binary += String.fromCharCode(c)
      else if (c < 2048) { binary += String.fromCharCode(192 | (c >> 6)); binary += String.fromCharCode(128 | (c & 63)) }
      else { binary += String.fromCharCode(224 | (c >> 12)); binary += String.fromCharCode(128 | ((c >> 6) & 63)); binary += String.fromCharCode(128 | (c & 63)) }
    }

    let b64 = ''
    for (let i = 0; i < binary.length; i += 3) {
      const a = binary.charCodeAt(i)
      const b = i + 1 < binary.length ? binary.charCodeAt(i + 1) : 0
      const c = i + 2 < binary.length ? binary.charCodeAt(i + 2) : 0
      b64 += _B64[a >> 2]
      b64 += _B64[((a & 3) << 4) | (b >> 4)]
      b64 += i + 1 < binary.length ? _B64[((b & 15) << 2) | (c >> 6)] : '='
      b64 += i + 2 < binary.length ? _B64[c & 63] : '='
    }

    return b64.split('').reverse().join('')
  } catch (e) { return s }
}

const USER_CONFIG = {

  yuafeng_apikey: 'ak_d6c2d3eef8b8d16ac34b1fc38f6bfc198d8c2e6c25f38165',  

  netease_music_u: '',  
}

const API = {

  localQQ:   { base: _d('1MDMzoTO0EjLz4CM44SM3EzLvoDc0RHa'), enabled: true },
  localWy:   { base: _d('2MDMzoTO0EjLz4CM44SM3EzLvoDc0RHa'), enabled: true },
  miguLocal: { base: _d('3MDMzoTO0EjLz4CM44SM3EzLvoDc0RHa'), enabled: true },

  toubiec:   { base: _d('uNmLjVWaiV3b05SawFWe39yL6MHc0RHa'), enabled: true },
  ffapi:     { base: _d('=IjdvQnbp9ibj5SawFmZm9yL6MHc0RHa'), enabled: true },
  yaohu:     { base: _d('==wYpNXdt9SawF2LuNmLkVHavFWeukGch9yL6MHc0RHa'), key: _d('==gNBhGRyZkTTZ0Q3cne2R3SnZnb'), enabled: true },

  suyinQQ:   { base: _d('jl2c110XRF1LpBXYvQXZu5SawFWav9yL6MHc0RHa'), key: _d('1cTNygTY3AjMlNDZtMGO3gTLkdzYk1iZyMWYtcjYzMTM2YWZtkGchl2b'), enabled: true },
  suyinWy:   { base: _d('==wM2EzXjl2c110LpBXYvQXZu5SawFWav9yL6MHc0RHa'), key: _d('1cTNygTY3AjMlNDZtMGO3gTLkdzYk1iZyMWYtcjYzMTM2YWZtkGchl2b'), enabled: true },
  suyinKw:   { base: _d('=82d1t0LpBXYvQXZu5SawFWav9yL6MHc0RHa'), key: _d('1cTNygTY3AjMlNDZtMGO3gTLkdzYk1iZyMWYtcjYzMTM2YWZtkGchl2b'), enabled: true },

  cyapi: {
    qq: _d('==AcoBnLjl2c112XxF3LJBVQvA3b05SawFWej9yL6MHc0RHa'),
    wy: _d('whGcuU2chVGdl52LJBVQvA3b05SawFWej9yL6MHc0RHa'),
    key: _d('==wMlRTZ5Q2NxY2N4EWOwUWO4EmNyAjZyEzYxEWZxIGMidjMyQWMzcTO0gzYykTMxM2N0Q2MjFjY5EGM5UGOidTN'),
    enabled: true
  },

  chksz:     { base: _d('==QawF2Lw9Gduo3crh2YukGch9yL6MHc0RHa'), enabled: true },

  yuningxi:  { base: _d('==gbj5yZuVmZhVXeuIjdtkGch9yL6MHc0RHa'), key: _d('==wM3gjMyMTOhZ2YiVGN1EGMwYWO2gzMiBDO0QzYmR2YlFTZwEWY2UGOlJ2M2cTM1IDOhljZ1ETO2MDNhF2NzIWZ'), enabled: true },

  fish:      { base: _d('=UWbuQXZlNXZj5SawFWLt9yL6MHc0RHa'), enabled: true },

  hywmusic:  { base: _d('w9Gaz5CNkFDNyEGei5yYpNXdt9yL6MHc0RHa'), enabled: true },

  yaohuMg:   { base: _d('=U3Zp12Ljl2c112LpBXYv42YuMHd2NGeukGch9yL6MHc0RHa'), enabled: true },

  yunmge: {
    url:   _xd('XmtsSLVWXopEJuh8OBlpQyBZCTRtKcNpGu1cO7B6AEsIUzhcR'),
    key:   _xd('X=l7YKJ8UkQ7zdsoWVhUC34ZFRJoKQQEPWcEJGMJMkYtZVZYyrg7vxoUHS1sP'),
    token: _xd('X=t8CeBdEVVtzQItvINdJCcoM2RZZRZFKc9DxzsdEDAEv'),
    enabled: true
  },

  neteaseCookie: _xd('X9ICz2ZEuWI8Jo9ozmAZwQJGTGtTuvoEEj5EvZx6YSdYKF4tMIAFQIknzL1Jwa1TBikmDGMbDD0JwZBZZf0VF1U9RcNUFHdcwYJmNn4TS/4rPtBoPRVtYXVdzMQEXYU8HoZbAjIJxZFqyncnuxM8QlpbvWlJY9o7GI8tInBWRGw7yUFZXKgTUzdtPHIUDzkZwYxZYkYVCMBaRYIURq8YxZZtGgUYBQlXCm1rO1QtwYNmAOUru7B8InRozeAZYSNazEp7uw0URBsEXYV6YWt7KxMSIGwaQmR7AVZJwb5sVkgmOxI8DyMCw9Edxy5VEKVFRWYrEjwDw7QSJwNsT4woPxcUC+EmwXNJT5ZEWMwoMFw8Bv5ZYXNWSElnWzcURu0UuLZ6YccTKmltJEgFRwEcyaMJYKw7yyZCPjB8DxQCYXFmwikWR/EWFPMEFC17wLJSJhwDydobCGwUO3w6XWVtTOEEX7V8HmV8ziYdWRVpzpssWv0oFCgoxZBtwW5TLppZJmB9EplTyXRdxTg7Vt8ZCGMrCC4SYUZJxx9GE1MpEVkURqcnY9wSNyNDSO5UDp1EOPxtX7ACyRwXvYEoJsNrUwVtZaIpSsYTvhpXRllHvWx6YawTKFkmMFMWREwDTY5tZ65sVBpCOzIoPz0ZZ6ESYv59FMRaEOk8EEhIYVpdMfUcSQpbCG8UC24JYYBdTRIEXVI8NIAbBzVJYWB9zG9DXDgEFedUv6YtxUx7Kx4mIpJpDwUIy6USwToIAzp6EuIbPAQ6wOBdXeYVFKVGFcxrEIhcwasZImYTTMl8DxkbP0YZxRZdT/ZoXYMoHsxbUABdWVBpAH1sukpEFhlXuaw6ZTtDJppdJxQpDtF7zLBtYUAnAB9CDfd8Cj1SYZtZYjkWF4AWRVwoEjo7WaQZIyFsTPdrFJoECRBtZawJy5NXXTMXICYrVfUZwbYWyrkYWf1XEjpHWawSwccTGD0JGpBpRqBYz9E6YK4cyh0CPfBbOiNCwTBCxlsVE2EWCVYECnwTxUJ6MgUczd8UCx4oO1ISxZxCyM8ox6N8MrJUBgw6WVFaymIDSdtXO0lqY'),

  yuafeng: {
    url: _xd('X=9tY5N9CCoUxJFsPygJVMQJK3ZoEV0JxsB6AEsIUzhcR'),
    apikey: USER_CONFIG.yuafeng_apikey || '',  
    clientid: _xd('X=J6T5R8ucBbHrB8AA5JwZFqAmUTvAoEExQXZ'),
    enabled: !!USER_CONFIG.yuafeng_apikey
  },

  canxiang: {
    url: _xd('XTxZS+h8HQEVxJFsPygJVMIJLo5VEu1cO7B6AEsIUzhcR'),
    token: _xd('XX5ZAlRoDCwtyoNbOxRZHS1sP'),
    enabled: true
  },

  ygking: {
    url: _xd('X=NJTJVVXopEJuh8OBl9LyVYCVhtL9VoGu1cO7B6AEsIUzhcR'),
    enabled: true
  },

  xinghai: {
    url: _xd('X==JSAQpKD8cQyEISChFRnR8FOsoQfB6AEsIUzhcR'),
    enabled: true
  },

  nianxin: {
    url: _xd('X=1rCS0IV9tSNtdsWTVpX4xoDW8sNDBJAL9YSP9IK+1EDuBZK3B6AEsIUzhcR'),
    enabled: true
  },

  qqDirect: {
    key: _d('=ElZalmdyZ3VSJ1Qhp1bJh3YwNXNxdXSHJVRCpXcYhTcjd0Z3UDMjdnTOB3QFh1Xj9VQa1mRmJ0QtxWRsV3a1JGM30iVrBHW2Uzbwg2TtZUbo50MmNDRwY3YD50MrNjNfx0XI9VU'),
    uin: _d('==ANxgTO5IjN3YzM'),
    enabled: true
  },
}

const SCRIPT_NAME = 'K×H测试'
const SCRIPT_VERSION = '1.7.17'
const SCRIPT_DESC = 'Koneko×HYW音源技术测试音源 - v1.7.10'
const DOWNLOAD_TYPE = '测试'
const SUPPORTED_SOURCES = ['wy', 'tx', 'kw', 'kg', 'mg']

const PLATFORM_NAMES = {
  wy: '网易云音乐', tx: 'QQ音乐', kw: '酷我音乐', kg: '酷狗音乐', mg: '咪咕音乐'
}

const QMAP = {
  '128k': '128', '192k': '192', '320k': '320',
  'flac': 'flac', 'flac24bit': 'flac24bit',
  'hires': 'hires', 'atmos': 'atmos', 'atmos_plus': 'atmos_plus', 'master': 'master'
}

const QUALITY_FALLBACK = {
  'master':      ['master', 'hires', 'flac24bit', 'flac', '320k', '128k'],
  'hires':       ['hires', 'flac24bit', 'flac', '320k', '128k'],
  'flac24bit':   ['flac24bit', 'flac', '320k', '128k'],
  'flac':        ['flac', '320k', '128k'],
  'atmos':       ['atmos', 'master', 'flac', '320k', '128k'],
  'atmos_plus':  ['atmos_plus', 'atmos', 'master', 'flac', '320k', '128k'],
  '320k':        ['320k', '192k', '128k'],
  '192k':        ['192k', '320k', '128k'],
  '128k':        ['128k'],
}

const PLATFORM_QUALITIES = {
  tx: { supported: ['128k', '320k', 'flac', 'hires', 'master', 'atmos', 'atmos_plus'], note: 'QQ专属支持全音质' },
  wy: { supported: ['128k', '320k', 'flac', 'hires', 'master'], note: 'chksz 支持 jymaster 超清母带' },
  kw: { supported: ['128k', '320k', 'flac', 'hires'], note: '妖狐搜索返回无损' },
  kg: { supported: ['128k', '320k', 'flac'], note: '妖狐搜索返回无损' },
  mg: { supported: ['128k', '320k', 'flac'], note: '本地API: PQ/HQ/SQ' },
}

const _mask = (s) => {
  if (!s) return s
  let r = String(s)

  r = r.replace(/([?&](?:key|apikey|api_key|token|access_token|qm_keyst|qqmusic_key|psrf_qqaccess_token|contentId|copyrightId|songId|songmid)=)([^&\s"'<>]+)/gi, (m, p1, p2) => p1 + '<<E:' + _e(p2) + '>>')

  r = r.replace(/(\d{1,3}\.\d{1,3})\.(\d{1,3}\.\d{1,3})(:\d+)?/g, (m, p1, p2, p3) => p1 + '.<<E:' + _e(p2) + '>>' + (p3 || ''))

  r = r.replace(/(https?:\/\/[^/]+\/)([^\s"'<>]{15,})/g, (m, p1, p2) => p2.includes('<<E:') ? m : p1 + '<<E:' + _e(p2) + '>>')

  r = r.replace(/(contentId[=:]\s?)(\d+)/gi, (m, p1, p2) => p1 + '<<E:' + _e(p2) + '>>')
  r = r.replace(/(copyrightId[=:]\s?)(\d+)/gi, (m, p1, p2) => p1 + '<<E:' + _e(p2) + '>>')

  r = r.replace(/(qm_keyst=)([^;\s<>]+)/gi, (m, p1, p2) => p1 + '<<E:' + _e(p2) + '>>')
  r = r.replace(/(uin=o)(\d+)/gi, (m, p1, p2) => p1 + '<<E:' + _e(p2) + '>>')

  r = r.replace(/(purl[=:]\s?)([^\s"'<>]{10,})/gi, (m, p1, p2) => p1 + '<<E:' + _e(p2) + '>>')
  return r
}

const _maskArgs = (args) => args.map(a => {
  if (typeof a === 'string') return _mask(a)
  if (typeof a === 'object') {
    try { return _mask(JSON.stringify(a)) } catch (e) { return '[obj]' }
  }
  return a
})

const _LOG_TAG = `[${SCRIPT_NAME}]`
const log = {
  i: (...a) => { try { console.log(_LOG_TAG, ..._maskArgs(a)) } catch (e) {} },
  e: (...a) => { try { console.error(`${_LOG_TAG} ERR`, ..._maskArgs(a)) } catch (e) {} },
  w: (...a) => { try { console.warn(`${_LOG_TAG} WARN`, ..._maskArgs(a)) } catch (e) {} },
  d: (...a) => { try { console.debug(`${_LOG_TAG} DBG`, ..._maskArgs(a)) } catch (e) {} },
  t: (level, ...a) => {
    try {
      const ts = new Date().toISOString().substring(11, 19)
      const fn = level === 'e' ? console.error : level === 'w' ? console.warn : console.log
      fn(`[${SCRIPT_NAME} ${ts}]`, ..._maskArgs(a))
    } catch (e) {}
  },
}

const DEFAULT_TIMEOUT = 4000

const http = (url, opts = {}) => new Promise((resolve, reject) => {
  const defaultOpts = {
    method: 'GET',
    timeout: DEFAULT_TIMEOUT,
    headers: { 'X-Client-Software': 'lx' }
  }
  const finalOpts = { ...defaultOpts, ...opts }
  log.d('HTTP', finalOpts.method, url.substring(0, 120))
  request(url, finalOpts, (err, resp) => {
    if (err) {
      log.d('HTTP错误:', err.message || err)
      return reject(new Error('请求错误: ' + (err.message || err)))
    }
    let body = resp?.body
    if (typeof body === 'string') {
      const trimmed = body.trim()
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try { body = JSON.parse(trimmed) } catch (e) {   }
      }
    }
    resolve({
      statusCode: resp?.statusCode ?? 0,
      headers: resp?.headers || {},
      body: body
    })
  })
})

const isValidJsonResponse = (resp) => {
  if (!resp || resp.statusCode >= 400) return false
  const body = resp.body
  if (!body) return false
  if (typeof body === 'object') return true
  if (typeof body === 'string') {
    const trimmed = body.trim().toLowerCase()
    if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')) return false
    if (trimmed.includes('cloudflare') && trimmed.includes('challenge')) return false
    if (trimmed.includes('just a moment')) return false
  }
  return true
}

const fetchJSON = async (url, opts = {}) => {
  const resp = await http(url, opts)
  if (!isValidJsonResponse(resp)) {
    throw new Error('HTTP ' + resp.statusCode + ': ' + _mask(url).substring(0, 60))
  }
  let body = resp.body
  if (typeof body === 'string') {
    const trimmed = body.trim()
    try { body = JSON.parse(trimmed) } catch (e) {
      throw new Error('JSON解析失败: ' + _mask(trimmed).substring(0, 100))
    }
  }
  return body
}

const httpGet = async (url, params = {}) => {
  const queryStr = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
  const sep = url.includes('?') ? '&' : '?'
  const fullUrl = url + (queryStr ? sep + queryStr : '')
  return fetchJSON(fullUrl, { method: 'GET', timeout: DEFAULT_TIMEOUT })
}

const httpPost = async (url, body = {}, timeout = DEFAULT_TIMEOUT) => {
  return fetchJSON(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
    timeout: timeout
  })
}

const getId = (info) => {
  if (!info || typeof info !== 'object') return ''
  const id = info.songmid || info.songId || info.id || info.hash || info.rid || info.musicId || info.copyrightId || info.songid || info.mid || info.strMediaMid || info.FileHash || info.fileHash || info.copyrightid || ''
  if (id) return String(id)
  const src = info.source || ''
  switch (src) {
    case 'kg': return String(info.hash || info.FileHash || info.fileHash || info.songId || info.id || '')
    case 'tx': return String(info.songmid || info.strMediaMid || info.mid || info.songId || info.id || '')
    case 'wy': return String(info.songId || info.id || info.songmid || '')
    case 'kw': return String(info.songId || info.rid || info.musicId || info.id || info.songmid || '')
    case 'mg': return String(info.copyrightId || info.songId || info.songmid || info.id || '')
    default: return String(info.songId || info.songmid || info.id || info.hash || '')
  }
}

const isValidAudioUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false
  if (url.includes('404') && url.length < 50) return false
  const lower = url.toLowerCase()
  const audioPatterns = ['.mp3', '.flac', '.m4a', '.ogg', '.wav', 'music.126.net', 'qqmusic', 'kuwo.cn', 'kugou.com', 'migu', 'music']
  return audioPatterns.some(p => lower.includes(p))
}

const extractUrl = (data) => {
  if (!data) return ''
  if (typeof data === 'string') return data.startsWith('http') ? data : ''
  if (typeof data !== 'object') return ''
  if (typeof data.url === 'string' && data.url.startsWith('http')) return data.url
  if (data.data) {
    if (typeof data.data === 'string' && data.data.startsWith('http')) return data.data
    if (typeof data.data.url === 'string' && data.data.url.startsWith('http')) return data.data.url
    if (data.data.vipmusic && typeof data.data.vipmusic.url === 'string' && data.data.vipmusic.url.startsWith('http')) return data.data.vipmusic.url
    if (typeof data.data.play_url === 'string' && data.data.play_url.startsWith('http')) return data.data.play_url
    if (Array.isArray(data.data) && data.data.length > 0) {
      if (typeof data.data[0].url === 'string' && data.data[0].url.startsWith('http')) return data.data[0].url
      if (typeof data.data[0] === 'string' && data.data[0].startsWith('http')) return data.data[0]
    }
  }
  if ((data.code === 200 || data.code === 0 || data.status === 200) && data.data) {
    return extractUrl({ data: data.data })
  }
  if (data.text && typeof data.text === 'string') {
    const match = data.text.match(/https?:\/\/[^\s"']+/)
    if (match) return match[0]
  }
  if (data.data && data.data.text && typeof data.data.text === 'string') {
    const match = data.data.text.match(/https?:\/\/[^\s"']+/)
    if (match) return match[0]
  }
  return ''
}

const getLocalQQ = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  const typeMap = { '128k': 'MP3_128', '192k': 'MP3_320', '320k': 'MP3_320', 'flac': 'FLAC', 'flac24bit': 'Master', 'hires': 'Master', 'master': 'Master' }
  log.d('本地QQ请求:', id, q)
  const data = await httpGet(`${API.localQQ.base}/song/urls`, { mids: id, type: typeMap[q] || 'MP3_128' })
  const url = extractUrl(data) || (data && data.data && data.data[id] && data.data[id].url) || ''
  if (url) return url
  throw new Error('localQQ fail: ' + _mask(JSON.stringify(data)).substring(0, 100))
}

const getLocalWy = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  const levelMap = { '128k': 'standard', '192k': 'exhigh', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'hires', 'hires': 'hires', 'master': 'jymaster' }
  log.d('本地网易请求:', id, q)

  const data = await httpPost(`${API.localWy.base}/song/url/v1`, {
    id: id,
    level: levelMap[q] || 'standard',
    encodeType: 'flac',
    cookie: API.neteaseCookie,
  })
  if (data && data.code === 200 && Array.isArray(data.data) && data.data[0] && data.data[0].url) {
    return data.data[0].url
  }
  const url = extractUrl(data)
  if (url) return url
  throw new Error('localWy fail: ' + _mask(JSON.stringify(data)).substring(0, 100))
}

const getToubiec = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  const levelMap = { '128k': 'standard', '192k': 'exhigh', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'hires' }
  log.d('Toubiec请求:', id, q)
  const data = await httpGet(`${API.toubiec.base}/song`, { id: id, level: levelMap[q] || 'standard' })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('toubiec fail')
}

const getFFAPI = async (info, q) => {
  const id = getId(info)
  const src = info.source
  if (!id) throw new Error('no id')
  let url = ''
  if (src === 'tx') url = `https://y.qq.com/n/ryqq/songDetail/${id}`
  else if (src === 'wy') url = `https://music.163.com/song?id=${id}`
  else if (src === 'kw') url = `https://www.kuwo.cn/play_detail/${id}`
  else if (src === 'kg') url = `https://www.kugou.com/song/#hash=${id}`
  else if (src === 'mg') url = `https://music.migu.cn/v3/music/song/${id}`
  else throw new Error('unsupported src: ' + src)
  log.d('FFAPI请求:', src, id)
  const data = await httpGet(`${API.ffapi.base}/songurl`, { url: url })
  const u = extractUrl(data)
  if (u) return u
  throw new Error('ffapi fail')
}

const getYuafengKg = async (info, q) => {
  if (!API.yuafeng.apikey) {
    throw new Error('yuafengKg: 未配置 apikey')
  }
  const hash = info.hash || info.songmid || info.id || ''
  if (!hash) throw new Error('yuafengKg: no hash')
  log.d('yuafeng酷狗请求:', hash, q)
  const data = await httpGet(API.yuafeng.url, {
    apikey: API.yuafeng.apikey,
    hash: hash,
    msg: (info.songName || '') + ' ' + (info.singer || ''),
    n: 1,
  })
  if (data && data.code === 200) {
    const url = data.url || (data.data && data.data.url) || ''
    if (url && isValidAudioUrl(url)) {
      log.d('yuafeng酷狗成功:', q)
      return url
    }
  }
  throw new Error('yuafengKg fail: code=' + (data?.code ?? 'null'))
}

const getNianxinKg = async (info, q) => {
  const hash = info.hash || info.songmid || info.id || ''
  if (!hash) throw new Error('nianxinKg: no hash')

  const levelMap = {
    '128k': '128kmp3',
    '192k': '320kmp3',  
    '320k': '320kmp3',
    'flac': '2000kflac',
    'flac24bit': '4000kflac',
    'hires': 'hires',
    'master': '4000kflac',  
    'atmos': '4000kflac',
    'atmos_plus': '4000kflac',
  }
  const level = levelMap[q] || '320kmp3'
  log.d('念心酷狗请求:', hash, q, '->', level)
  const data = await httpGet(API.nianxin.url, { id: hash, level: level }, 8000)

  if (data && data.code === 200 && data.url) {
    log.d('念心酷狗成功:', q, '(level=' + level + ')')
    return data.url
  }
  throw new Error('nianxinKg fail: code=' + (data?.code ?? 'null') + ' msg=' + (data?.msg || '').substring(0, 60))
}

const getCanxiang = async (info, q) => {
  const id = info.songId || info.id || info.songmid || ''
  const songName = info.songName || info.name || ''
  const singer = info.singer || ''

  const qMap = {
    '128k': '128k', '192k': '320k', '320k': '320k',
    'flac': 'flac', 'flac24bit': 'hires', 'hires': 'hires',
    'master': 'jymaster', 'atmos': 'jymaster', 'atmos_plus': 'jymaster',
  }
  const type = qMap[q] || '320k'

  log.d('残像请求:', id || (songName + singer), q, '->', type)

  const params = { token: API.canxiang.token, type: type }
  if (id) {
    params.id = String(id)
  } else if (songName) {
    params.msg = songName + (singer ? ' ' + singer : '')
    params.n = 1
  } else {
    throw new Error('canxiang: no id and no songName')
  }

  const data = await httpGet(API.canxiang.url, params, 8000)

  if (data && data.code === 200 && data.data && data.data.url) {
    log.d('残像成功:', q, '(type=' + type + ', quality=' + (data.data.quality || '?') + ')')
    return data.data.url
  }
  throw new Error('canxiang fail: code=' + (data?.code ?? 'null') + ' msg=' + (data?.msg || '').substring(0, 60))
}

const getYgkingTx = async (info, q) => {
  const mid = info.songmid || info.strMediaMid || info.mediaMid || info.id || ''
  if (!mid) throw new Error('ygking: no mid')

  const qMap = {
    '128k': '128', '192k': '320', '320k': '320',
    'flac': 'flac', 'flac24bit': 'hires', 'hires': 'hires',
    'master': 'master', 'atmos': 'master', 'atmos_plus': 'master',
  }
  const quality = qMap[q] || '320'
  log.d('ygking QQ请求:', mid, q, '->', quality)
  const data = await httpGet(API.ygking.url, { mid: mid, quality: quality }, 8000)

  if (data && data.code === 0 && data.data) {
    const url = data.data[mid] || data.data[Object.keys(data.data)[0]] || ''
    if (url && isValidAudioUrl(url)) {
      log.d('ygking QQ成功:', q, '(quality=' + quality + ')')
      return url
    }
  }
  throw new Error('ygking fail: code=' + (data?.code ?? 'null'))
}

const getXinghai = async (source, info, q) => {
  const id = source === 'kg' ? (info.hash || info.songmid || info.id || '')
           : source === 'migu' ? (info.songId || info.contentId || info.id || '')
           : (info.songmid || info.rid || info.id || '')
  if (!id) throw new Error('xinghai: no id for source=' + source)
  const songName = info.songName || info.name || ''
  const singer = info.singer || ''
  const name = songName + (singer ? ' ' + singer : '')

  const qMap = {
    '128k': '128kmp3', '192k': '320kmp3', '320k': '320kmp3',
    'flac': 'flac', 'flac24bit': 'hires', 'hires': 'hires',
    'master': 'flac', 'atmos': 'flac', 'atmos_plus': 'flac',
  }
  const quality = qMap[q] || '320kmp3'
  log.d('星海请求:', source, id, q, '->', quality)
  const data = await httpGet(API.xinghai.url, {
    source: source, name: name, songmid: String(id), quality: quality,
  }, 8000)
  if (data && data.code === 200 && data.url) {
    log.d('星海成功:', source, q)
    return data.url
  }
  throw new Error('xinghai fail: code=' + (data?.code ?? 'null') + ' msg=' + (data?.message || '').substring(0, 60))
}

const getXinghaiKw = (info, q) => getXinghai('kw', info, q)
const getXinghaiKg = (info, q) => getXinghai('kg', info, q)
const getXinghaiMg = (info, q) => getXinghai('migu', info, q)

const getYunmgeKw = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('yunmgeKw: no id')

  const brMap = {
    '128k': 128, '192k': 192, '320k': 320,
    'flac': 2000, 'flac24bit': 2000, 'hires': 4000,
    'atmos': 4000, 'atmos_plus': 4000, 'master': 4000
  }

  const brFallback = {
    '4000': [4000, 2000, 320, 192, 128],
    '2000': [2000, 320, 192, 128],
    '320':  [320, 192, 128],
    '192':  [192, 128],
    '128':  [128],
  }
  const wantBr = brMap[q] || 320
  const tryBrs = brFallback[String(wantBr)] || [wantBr]

  log.d('yunmge酷我请求:', id, q, '->', wantBr)
  const data = await httpGet(API.yunmge.url, {
    key: API.yunmge.key,
    token: API.yunmge.token,
    id: id,
  }, 8000)

  if (!data || data.code !== 200 || !data.data) {
    throw new Error('yunmgeKw fail: code=' + (data?.code ?? 'null') + ' msg=' + _mask(JSON.stringify(data)).substring(0, 80))
  }

  const allBrs = data.data.all_bitrates || []
  if (allBrs.length === 0) {
    throw new Error('yunmgeKw: no all_bitrates')
  }

  for (const br of tryBrs) {
    const item = allBrs.find(b => b.bitrate === br || String(b.bitrate) === String(br))
    if (item && item.play_url) {
      log.d('yunmge酷我成功:', 'bitrate=' + item.bitrate, 'label=' + (item.label || ''))
      return item.play_url
    }
  }

  for (const item of allBrs) {
    if (item.play_url) {
      log.d('yunmge酷我兜底返回:', 'bitrate=' + item.bitrate)
      return item.play_url
    }
  }

  throw new Error('yunmgeKw: all play_url empty')
}

const getYaohuKw = async (info, q) => {
  const songName = info.songName || info.name || ''
  const singer = info.singer || ''
  if (songName) {
    const searchKey = songName + singer
    log.d('妖狐酷我搜索:', searchKey)
    const data = await httpGet(`${API.yaohu.base}/kuwo`, {
      key: API.yaohu.key, action: 'search', msg: searchKey, n: 1
    })
    const vm = data?.data?.vipmusic || {}
    const url = vm.url || ''
    if (url && isValidAudioUrl(url)) {
      log.d('妖狐酷我搜索成功, level:', vm.level, 'bitrate:', vm.bitrate)
      return url
    }
  }
  const id = getId(info)
  if (!id) throw new Error('yaohuKw: no id and no songName')
  log.d('妖狐酷我ID解析:', id)
  const data = await httpGet(`${API.yaohu.base}/kuwo`, {
    key: API.yaohu.key, action: 'song', id: id, size: 'lossless'
  })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('yaohuKw fail: ' + _mask(JSON.stringify(data)).substring(0, 100))
}

const getYaohuKg = async (info, q) => {
  const songName = info.songName || info.name || ''
  const singer = info.singer || ''
  if (!songName) throw new Error('no songName for kg search')
  const qualityMap = { '128k': '128', '192k': '320', '320k': '320', 'flac': 'flac', 'flac24bit': 'high', 'hires': 'high', 'master': 'high' }
  const quality = qualityMap[q] || '128'
  const searchKey = songName + singer
  log.d('妖狐酷狗请求:', searchKey, quality)
  const data = await httpGet(`${API.yaohu.base}/kg`, {
    key: API.yaohu.key, msg: searchKey, n: 1, quality: quality
  })
  const playUrl = data?.data?.play_url || ''
  if (playUrl && isValidAudioUrl(playUrl)) return playUrl
  const url = extractUrl(data)
  if (url) return url
  throw new Error('yaohuKg fail: ' + _mask(JSON.stringify(data)).substring(0, 100))
}

const getYaohu = async (info, q) => {
  const src = info.source
  const songName = info.songName || info.name || ''
  const singer = info.singer || ''
  if (!songName) throw new Error('no songName')
  const pathMap = { wy: 'wy', tx: 'qq' }
  const path = pathMap[src]
  if (!path) throw new Error('unsupported src: ' + src)
  const searchKey = songName + singer
  log.d('妖狐通用请求:', path, searchKey)
  const data = await httpGet(`${API.yaohu.base}/${path}`, {
    key: API.yaohu.key, msg: searchKey, n: 1
  })
  const musicUrl = data?.data?.musicurl || ''
  if (musicUrl && isValidAudioUrl(musicUrl)) return musicUrl
  const url = extractUrl(data)
  if (url) return url
  throw new Error('yaohu fail: ' + _mask(JSON.stringify(data)).substring(0, 100))
}

const getYaohuMg = async (info, q) => {
  let songName = info.songName || info.name || ''
  const singer = info.singer || ''
  const id = getId(info)

  if (!songName && id) {
    log.d('妖狐咪咕: 无歌名，用 id 搜索获取:', id)
    try {
      const searchData = await httpGet(`${API.yaohuMg.base}`, {
        key: API.yaohu.key, msg: String(id), n: 1
      })
      const song = searchData?.data?.vipmusic || searchData?.data?.[0] || null
      if (song && (song.songName || song.name)) {
        songName = song.songName || song.name
        log.d('妖狐咪咕: 通过 id 搜索到歌名:', songName)
      }
    } catch (e) {
      log.d('妖狐咪咕: id 搜索失败:', e.message)
    }
  }

  if (!songName) throw new Error('yaohuMg: 无歌名且 id 搜索失败')
  const searchKey = songName + (singer ? ' ' + singer : '')
  log.d('妖狐咪咕请求:', searchKey)
  const data = await httpGet(`${API.yaohuMg.base}`, {
    key: API.yaohu.key, msg: searchKey, n: 1
  })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('yaohuMg fail: ' + _mask(JSON.stringify(data)).substring(0, 100))
}

const _miguHealthCache = { ok: null, ts: 0 }
const MIGU_HEALTH_TTL = 60000

const checkMiguHealth = async () => {
  const now = Date.now()
  if (_miguHealthCache.ok !== null && now - _miguHealthCache.ts < MIGU_HEALTH_TTL) {
    return _miguHealthCache.ok
  }
  try {
    const resp = await http(`${API.miguLocal.base}/api/search?text=test&page=1&size=1`, { timeout: 2000 })
    _miguHealthCache.ok = isValidJsonResponse(resp)
    _miguHealthCache.ts = now
    log.d('咪咕API健康检查:', _miguHealthCache.ok ? '正常' : '异常')
    return _miguHealthCache.ok
  } catch (e) {
    _miguHealthCache.ok = false
    _miguHealthCache.ts = now
    log.d('咪咕API健康检查: 异常', e.message)
    return false
  }
}

const getMiguLocal = async (info, q) => {

  const supportedQ = ['128k', '320k', 'flac']
  log.d('咪咕支持音质:', supportedQ.join('/'), '| 请求音质:', q)

  const healthy = await checkMiguHealth()
  if (!healthy) {
    throw new Error('miguLocal: API不可达(健康检查失败)')
  }

  const songName = info.songName || info.name || ''
  const singer = info.singer || ''
  let contentId = ''
  let copyrightId = ''

  const rawId = getId(info)
  if (rawId) {
    if (rawId.length > 15) {
      contentId = rawId
    } else if (rawId.length >= 8 && rawId.length <= 14) {
      copyrightId = rawId
    } else {
      contentId = info.contentId || rawId
      copyrightId = info.copyrightId || info.copyrightid || ''
    }
  }
  contentId = info.contentId || contentId
  copyrightId = info.copyrightId || info.copyrightid || copyrightId

  log.d('咪咕本地(3037):', songName, 'contentId: ' + contentId, 'copyrightId: ' + copyrightId)

  if (!contentId) {
    if (!songName) throw new Error('miguLocal: 无contentId且无songName')
    const searchKey = songName + (singer ? ' ' + singer : '')
    log.d('咪咕本地搜索:', searchKey)
    const searchData = await httpGet(`${API.miguLocal.base}/api/search`, { text: searchKey, page: 1, size: 5 })
    if (searchData && searchData.success && searchData.data && searchData.data.items) {
      const items = searchData.data.items
      let matched = null
      if (copyrightId) {
        matched = items.find(it => it.song && (it.song.copyrightId === copyrightId))
      }
      if (!matched && items.length > 0) {
        matched = items[0]
      }
      if (matched && matched.song) {
        contentId = matched.song.contentId || ''
        copyrightId = copyrightId || matched.song.copyrightId || ''
        log.d('咪咕搜索匹配:', matched.song.songName, 'contentId: ' + contentId)
      }
    }
  }

  if (!contentId) {
    throw new Error('miguLocal: 无法获取contentId')
  }

  const toneFlagMap = { '128k': 'PQ', '192k': 'HQ', '320k': 'HQ', 'flac': 'SQ', 'flac24bit': 'ZQ', 'hires': 'ZQ' }
  const toneFlag = toneFlagMap[q] || 'PQ'

  const tryGetUrl = async (flag) => {
    const url = `${API.miguLocal.base}/api/url/h5v2.4?contentId=${contentId}&copyrightId=${copyrightId || ''}&resourceType=2&toneFlag=${flag}`
    const data = await httpGet(url)
    if (data && data.success && data.data && data.data.url && typeof data.data.url === 'string') {
      return data.data.url
    }
    const u = extractUrl(data)
    if (u) return u
    return ''
  }

  let url = await tryGetUrl(toneFlag)
  if (url) {
    log.d('咪咕本地成功:', q, '(toneFlag=' + toneFlag + ')', url.substring(0, 60))
    return url
  }

  if (q !== '128k') {
    log.d('咪咕快速兜底: 请求音质', q, '失败，直接尝试PQ(128k)')
    url = await tryGetUrl('PQ')
    if (url) {
      log.d('咪咕兜底成功(PQ/128k):', url.substring(0, 60))
      return url
    }
  }

  throw new Error(_mask('miguLocal fail: contentId=' + contentId + ' toneFlag=' + toneFlag))
}

const getSuyinQQ = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  const brMap = { '128k': 7, '192k': 5, '320k': 5, 'flac': 4, 'hires': 3, 'flac24bit': 1, 'master': 1 }
  log.d('溯音QQ请求:', id, q)
  const data = await httpGet(API.suyinQQ.base, { key: API.suyinQQ.key, type: 'json', br: brMap[q] || 7, n: 1, mid: id })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('suyinQQ fail')
}

const getSuyinWy = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  const levelMap = { '128k': 'standard', '192k': 'exhigh', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'hires', 'hires': 'hires', 'master': 'jymaster' }
  log.d('溯音网易请求:', id, q)
  const data = await httpGet(API.suyinWy.base, { key: API.suyinWy.key, type: 'json', level: levelMap[q] || 'standard', n: 1, id: id })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('suyinWy fail')
}

const getSuyinKw = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  const brMap = { '128k': 7, '192k': 5, '320k': 5, 'flac': 1, 'flac24bit': 1, 'hires': 1 }
  log.d('溯音酷我请求:', id, q)
  const data = await httpGet(API.suyinKw.base, { key: API.suyinKw.key, type: 'json', br: brMap[q] || 7, n: 1, id: id })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('suyinKw fail')
}

const getCyapi = async (info, q) => {
  const src = info.source
  const id = getId(info)
  if (!id && src !== 'wy') throw new Error('cyapi: no id')

  if (src === 'tx') {
    log.d('cyapi QQ请求 mid:', id)
    const data = await httpGet(API.cyapi.qq, { apikey: API.cyapi.key, type: 'json', mid: id })
    if (data && data.url && typeof data.url === 'string' && data.url.startsWith('http')) {
      return data.url
    }
    throw new Error('cyapi QQ fail: no url field')
  } else if (src === 'wy') {
    const songName = info.songName || info.name || ''
    const singer = info.singer || ''
    if (!songName) throw new Error('cyapi WY: no songName')
    const searchKey = songName + (singer ? ' ' + singer : '')
    log.d('cyapi 网易请求:', searchKey)
    const data = await httpGet(API.cyapi.wy, { apikey: API.cyapi.key, msg: searchKey, n: 1, type: 'json' })
    if (data && data.url && typeof data.url === 'string' && data.url.startsWith('http')) {
      return data.url
    }
    throw new Error('cyapi WY fail: no url field')
  }
  throw new Error('cyapi: unsupported src: ' + src)
}

const getChksz = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')

  const levelMap = {
    '128k': 'standard',
    '192k': 'exhigh',
    '320k': 'exhigh',
    'flac': 'lossless',
    'flac24bit': 'hires',
    'hires': 'hires',
    'master': 'jymaster',     
    'atmos': 'jymaster',
    'atmos_plus': 'jymaster',
  }
  const level = levelMap[q] || 'standard'
  log.d('chksz请求:', id, q, '->', level)

  const data = await httpGet(`${API.chksz.base}/api/163_music`, { id: id, level: level })

  if (data && data.code === 200 && data.data && data.data.url) {
    log.d('chksz成功:', q, '(level=' + level + ')')
    return data.data.url
  }

  const url = extractUrl(data)
  if (url) return url
  throw new Error('chksz fail: code=' + (data?.code ?? 'null'))
}

const getFish = async (info, q) => {
  const id = getId(info)
  const src = info.source
  if (!id) throw new Error('no id')
  log.d('fish请求:', src, id)
  const data = await httpGet(`${API.fish.base}/${src}/song`, { id: id })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('fish fail')
}

const getHYW = async (info, q) => {
  const id = getId(info)
  if (!id) throw new Error('no id')
  log.d('HYW请求:', id)
  const data = await httpGet(`${API.hywmusic.base}/api/music`, { mid: id })
  const url = extractUrl(data)
  if (url) return url
  throw new Error('hyw fail')
}

const getYuafeng = async (info, q) => {
  const src = info.source
  const songName = info.songName || info.name || ''
  const singer = info.singer || ''
  if (!songName) throw new Error('yuafeng: no songName')

  const endpointMap = {
    wy: 'wymusic', tx: 'qqmusic', kw: 'kwmusic',
    kg: 'kgmusic', mg: 'mgmusic'
  }
  const endpoint = endpointMap[src]
  if (!endpoint) throw new Error('yuafeng: unsupported src: ' + src)

  const typeMap = {
    '128k': '1', '192k': '2', '320k': '2',
    'flac': '4', 'flac24bit': '4', 'hires': '4',
    'master': '4', 'atmos': '4', 'atmos_plus': '4'
  }
  const type = typeMap[q] || '1'

  const searchKey = songName + (singer ? ' ' + singer : '')
  log.d('玉宁熙请求:', endpoint, searchKey, 'type=' + type)

  const data = await httpGet(`${API.yuningxi.base}/API/${endpoint}.php`, {
    apikey: API.yuningxi.key, msg: searchKey, n: 1, type: type
  })

  if (data && data.code === 0 && data.data) {
    const musicUrl = data.data.music
    if (musicUrl && typeof musicUrl === 'string' && musicUrl.startsWith('http')) {
      log.d('玉宁熙成功:', endpoint, musicUrl.substring(0, 60))
      return musicUrl
    }
    if (src === 'mg' && data.data.copyrightId && data.data.id) {
      log.d('玉宁熙咪咕: 搜索成功但直链空, copyrightId=' + data.data.copyrightId)
      throw new Error(_mask('yuafeng mg: 直链为空 copyrightId=' + String(data.data.copyrightId)))
    }
  }

  throw new Error('yuafeng fail: code=' + (data?.code ?? 'null') + ' msg=' + (data?.msg || '').substring(0, 60))
}

const getQQExploit = async (info, q) => {
  const songmid = getId(info)
  if (!songmid) throw new Error('QQ专属: no songmid')

  const mediaMid = info.mediaMid || info.strMediaMid || info.media_mid || info.strmediamid || ''

  const qualityPrefix = {
    '128k': 'M500', '192k': 'M800', '320k': 'M800',
    'flac': 'F000', 'flac24bit': 'RS01', 'hires': 'RS01',
    'atmos': 'atmosphere', 'atmos_plus': 'atmosphere',
    'master': 'AIM00'
  }
  const prefix = qualityPrefix[q] || 'M800'

  const extMap = {
    'M500': 'mp3', 'M800': 'mp3',
    'F000': 'flac', 'RS01': 'flac', 'RS02': 'flac',
    'AIM00': 'mflac', 'atmosphere': 'flac'
  }
  const ext = extMap[prefix] || 'mp3'

  const midForFile = mediaMid || songmid
  const qqKey = API.qqDirect.key
  const qqUin = API.qqDirect.uin

  const pgv_pvid = Math.floor(Math.random() * 10000000000).toString()
  const qqCookie = `qm_keyst=${qqKey}; uin=o${qqUin}; pgv_pvid=${pgv_pvid}; qqmusic_key=${qqKey}; qqmusic_uin=o${qqUin}; psrf_qqaccess_token=${qqKey}; ts_uid=${pgv_pvid}; psi=${pgv_pvid}`

  const filenameA = `${prefix}${midForFile}.${ext}`
  const bodyA = {
    comm: { ct: 19, cv: 0, guid: pgv_pvid, tmeAppID: 'qqmusic', qq: qqUin },
    hot: {
      method: 'CgiGetHotVkey',
      module: 'music.vkey.GetEVkey',
      param: { filename: [filenameA], songmid: [songmid] }
    },
    ekey: {
      method: 'GetEkey',
      module: 'music.vkey.GetEVkey',
      param: { finfo: [{ filename: filenameA, mid: midForFile || '0' }] }
    }
  }

  try {
    log.d('QQ专属(ut)请求:', songmid, prefix, filenameA)
    const resp = await http('https://ut.y.qq.com/cgi-bin/musicu.fcg', {
      method: 'POST',
      timeout: DEFAULT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://y.qq.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': qqCookie
      },
      body: JSON.stringify(bodyA)
    })

    if (isValidJsonResponse(resp)) {
      const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
      const urls = data?.hot?.data?.urls || []
      if (urls.length > 0 && urls[0].purl) {
        const sip = 'https://dl.stream.qqmusic.qq.com/'
        log.d('QQ专属(ut)成功:', prefix, 'purl=' + urls[0].purl.substring(0, 60))
        return `${sip}${urls[0].purl}`
      }
      log.d('QQ专属(ut)无purl:', JSON.stringify(data?.hot?.data || {}).substring(0, 100))
    }
  } catch (e) {
    log.d('QQ专属(ut)失败:', e.message)
  }

  const variants = [
    { name: '双songmid+专属uin', filename: `${prefix}${songmid}${songmid}.${ext}`, uin: qqUin, loginflag: 1 },
    { name: '单songmid+专属uin', filename: `${prefix}${songmid}.${ext}`, uin: qqUin, loginflag: 1 },
    { name: '双songmid+空uin', filename: `${prefix}${songmid}${songmid}.${ext}`, uin: '', loginflag: 1 },
    { name: '单songmid+空uin', filename: `${prefix}${songmid}.${ext}`, uin: '', loginflag: 1 },
  ]

  for (const v of variants) {
    try {
      const param = {
        filename: [v.filename],
        songmid: [songmid],
        songtype: [0],
        uin: v.uin,
        loginflag: v.loginflag,
        platform: '23',
        firstlogin: 1,
        newver: 1,
        nohash: 0,
        cms: 0,
      }
      const apiData = JSON.stringify({
        comm: { uin: v.uin ? parseInt(v.uin) : 0, format: 'json', ct: 23, cv: 0, ...(v.uin ? { qq: v.uin } : {}) },
        req_0: { module: 'vkey.GetVkeyServer', method: 'CgiGetVkey', param }
      })
      const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=${encodeURIComponent(apiData)}`
      log.d('QQ专属(u,p23)请求:', v.name, songmid, prefix)
      const resp = await http(url, {
        method: 'GET',
        timeout: DEFAULT_TIMEOUT,
        headers: {
          'Referer': 'https://y.qq.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Cookie': qqCookie
        }
      })

      if (isValidJsonResponse(resp)) {
        const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
        const songInfo = data?.req_0?.data?.midurlinfo?.[0]
        if (data?.code === 0 && songInfo?.purl) {
          const sip = data.req_0?.data?.sip?.[0] || 'https://dl.stream.qqmusic.qq.com/'
          log.d('QQ专属(u,p23)成功:', v.name, prefix)
          return `${sip}${songInfo.purl}`
        }
      }
    } catch (e) {
      log.d(`QQ专属(u,p23) ${v.name}失败:`, e.message)
    }
  }

  const bodyC = {
    comm: {
      ct: 19, cv: 0,
      guid: pgv_pvid,
      tmeAppID: 'qqmusic', qq: qqUin
    },
    hot: {
      method: 'CgiGetHotVkey',
      module: 'music.vkey.GetEVkey',
      param: { filename: [filenameA], songmid: [songmid] }
    }
  }

  try {
    log.d('QQ专属(ut+key)请求:', songmid, prefix)
    const resp = await http('https://ut.y.qq.com/cgi-bin/musicu.fcg', {
      method: 'POST',
      timeout: DEFAULT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://y.qq.com/',
        'User-Agent': 'Mozilla/5.0 QQMusic/2201',
        'Cookie': qqCookie
      },
      body: JSON.stringify(bodyC)
    })

    if (isValidJsonResponse(resp)) {
      const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
      const urls = data?.hot?.data?.urls || []
      if (urls.length > 0 && urls[0].purl) {
        const sip = 'https://dl.stream.qqmusic.qq.com/'
        log.d('QQ专属(ut+key)成功:', prefix)
        return `${sip}${urls[0].purl}`
      }
    }
  } catch (e) {
    log.d('QQ专属(ut+key)失败:', e.message)
  }

  throw new Error('QQ专属全部失败: ' + _mask(songmid) + ' ' + prefix)
}

const API_GROUPS = {

  tx: [

    [
      { name: 'ygkingQQ', fn: getYgkingTx },
    ],

    [
      { name: 'QQ专属', fn: getQQExploit },
    ],

    [
      { name: 'cyapi QQ', fn: getCyapi },
      { name: '溯音QQ', fn: getSuyinQQ },
      { name: 'FFAPI', fn: getFFAPI },
    ],

    [
      { name: '妖狐QQ', fn: getYaohu },
      { name: '玉宁熙TX', fn: getYuafeng },
    ],

    [
      { name: '本地QQ(3035)', fn: getLocalQQ },
      { name: 'HYW', fn: getHYW },
      { name: 'fish', fn: getFish },
    ],
  ],

  wy: [
    [
      { name: '残像WY', fn: getCanxiang },  
      { name: 'chksz', fn: getChksz },
      { name: '本地网易(3036+cookie)', fn: getLocalWy },
      { name: '妖狐WY', fn: getYaohu },
      { name: 'cyapi 网易', fn: getCyapi },
      { name: '溯音网易', fn: getSuyinWy },
      { name: 'Toubiec', fn: getToubiec },
    ],
    [
      { name: '玉宁熙WY', fn: getYuafeng },
      { name: 'FFAPI', fn: getFFAPI },
    ],
    [
      { name: 'HYW', fn: getHYW },
      { name: 'fish', fn: getFish },
    ],
  ],

  kw: [
    [
      { name: '星海酷我', fn: getXinghaiKw },  
      { name: 'yunmge酷我', fn: getYunmgeKw },
      { name: '妖狐酷我', fn: getYaohuKw },
      { name: '溯音酷我', fn: getSuyinKw },
    ],
    [
      { name: '玉宁熙KW', fn: getYuafeng },
      { name: 'FFAPI', fn: getFFAPI },
    ],
    [
      { name: 'fish', fn: getFish },
    ],
  ],

  kg: [
    [
      { name: '星海酷狗', fn: getXinghaiKg },  
      { name: '念心酷狗', fn: getNianxinKg },
      { name: 'yuafeng酷狗', fn: getYuafengKg },
      { name: '妖狐酷狗', fn: getYaohuKg },
    ],
    [
      { name: '玉宁熙KG', fn: getYuafeng },
      { name: 'FFAPI', fn: getFFAPI },
    ],
    [
      { name: 'fish', fn: getFish },
    ],
  ],

  mg: [
    [
      { name: '星海咪咕', fn: getXinghaiMg },  
      { name: '咪咕本地(3037)', fn: getMiguLocal },
    ],

    [
      { name: '妖狐咪咕', fn: getYaohuMg },
      { name: 'FFAPI', fn: getFFAPI },
      { name: 'fish', fn: getFish },
    ],
  ],
}

const raceApis = async (apis, info, quality) => {
  if (!apis || apis.length === 0) return null

  return new Promise((resolve) => {
    let remaining = apis.length
    let settled = false

    apis.forEach(async (api) => {
      try {
        const url = await api.fn(info, quality)
        if (url && isValidAudioUrl(url)) {
          if (!settled) {
            settled = true
            resolve({ url, name: api.name })
          }
          return
        }
      } catch (e) {
        log.d(`[竞速] ${api.name} 失败:`, e.message)
      }
      remaining--
      if (remaining === 0 && !settled) {
        settled = true
        resolve(null)
      }
    })
  })
}

const getMusicUrl = async (source, musicInfo, quality) => {
  log.t('i', '=== 获取URL开始 v1.7.1 ===')
  log.t('i', '平台:', PLATFORM_NAMES[source] || source, '| 请求音质:', quality, '| 歌曲ID:', getId(musicInfo))

  const pq = PLATFORM_QUALITIES[source]
  if (pq) {
    log.t('i', '平台支持音质:', pq.supported.join('/'), '(' + pq.note + ')')
  }

  if (!SUPPORTED_SOURCES.includes(source)) {
    log.t('e', '不支持的平台:', source)
    throw new Error('不支持的平台: ' + source)
  }

  const fallbackChain = QUALITY_FALLBACK[quality] || [quality]
  log.t('i', '音质降级链:', fallbackChain.join(' -> '))

  const groups = API_GROUPS[source]
  if (!groups || groups.length === 0) {
    throw new Error('未配置API组: ' + source)
  }

  if (source === 'mg') {
    log.t('i', '咪咕快速模式: 不逐层降级，直接尝试+PQ兜底')
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi]
      log.t('i', `[音质${quality}] 组${gi+1}/${groups.length} 并行尝试 ${group.length} 个API: ${group.map(a => a.name).join(', ')}`)
      const result = await raceApis(group, musicInfo, quality)
      if (result && result.url) {
        log.t('i', `✓ 成功! 来源:${result.name} -> ${result.url.substring(0, 80)}...`)
        return result.url
      }
      log.t('w', `[音质${quality}] 组${gi+1} 全部失败`)
    }
    log.t('e', '=== 咪咕所有API均失败 ===')
    throw new Error('咪咕所有API均失败 (v1.7.1 快速模式)')
  }

  for (let qi = 0; qi < fallbackChain.length; qi++) {
    const currentQ = fallbackChain[qi]
    const isLastQuality = (qi === fallbackChain.length - 1)

    if (qi > 0) {
      log.t('w', `音质 ${fallbackChain[qi-1]} 全部失败，降级到 ${currentQ}`)
    }

    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi]
      const isLocalGroup = (gi === groups.length - 1)

      if (isLocalGroup && !isLastQuality && qi > 0) {
        continue
      }

      log.t('i', `[音质${currentQ}] 组${gi+1}/${groups.length} 并行尝试 ${group.length} 个API: ${group.map(a => a.name).join(', ')}`)

      const result = await raceApis(group, musicInfo, currentQ)
      if (result && result.url) {
        log.t('i', `✓ 成功! 音质:${currentQ} 来源:${result.name} -> ${result.url.substring(0, 80)}...`)
        if (currentQ !== quality) {
          log.t('w', `⚠ 用户请求 ${quality}，已降级到 ${currentQ}`)
        }
        return result.url
      }

      log.t('w', `[音质${currentQ}] 组${gi+1} 全部失败`)
    }
  }

  log.t('e', '=== 所有API + 所有音质档 均失败 ===')
  throw new Error('所有API均失败 (v1.7.1 已尝试音质降级)')
}

const getLyric = async (source, musicInfo) => {
  const id = getId(musicInfo)
  if (!id) {
    log.w('歌词: 无歌曲ID')
    return { lyric: '', tlyric: '', rlyric: '', lxlyric: '' }
  }

  log.t('i', '获取歌词:', PLATFORM_NAMES[source] || source, id)

  try {
    if (source === 'wy') {

      const data = await httpPost(`${API.localWy.base}/lyric`, { id: id, cookie: API.neteaseCookie })
      if (data && (data.status === 200 || data.code === 200) && data.data) {
        log.t('i', '歌词获取成功(网易)')
        return {
          lyric: data.data.lrc?.lyric || '',
          tlyric: data.data.tlyric?.lyric || '',
          rlyric: data.data.romalrc?.lyric || '',
          lxlyric: ''
        }
      }
    } else if (source === 'tx') {
      const data = await httpGet(`${API.localQQ.base}/song/lyric`, { mid: id, decode: 1 })
      if (data && data.code === 0 && data.data) {
        log.t('i', '歌词获取成功(QQ)')
        return {
          lyric: data.data.lyric || '',
          tlyric: data.data.trans || '',
          rlyric: data.data.roma || '',
          lxlyric: ''
        }
      }
    }
  } catch (e) {
    log.t('e', '歌词获取失败:', e.message)
  }

  log.w('歌词: 无结果')
  return { lyric: '', tlyric: '', rlyric: '', lxlyric: '' }
}

const getPic = async (source, musicInfo) => {
  const id = getId(musicInfo)
  if (!id) {
    log.w('封面: 无歌曲ID')
    return ''
  }

  log.t('i', '获取封面:', PLATFORM_NAMES[source] || source, id)

  try {
    if (source === 'wy') {

      const data = await httpPost(`${API.localWy.base}/song/detail`, { ids: id, cookie: API.neteaseCookie })
      if (data && (data.status === 200 || data.code === 200) && data.data && data.data.pic) {
        log.t('i', '封面获取成功(网易)')
        return data.data.pic
      }
    } else if (source === 'tx') {
      const data = await httpGet(`${API.localQQ.base}/song/detail`, { mids: id })
      if (data && data.code === 0 && data.data && data.data.length > 0) {
        const pic = data.data[0].album?.cover || ''
        if (pic) log.t('i', '封面获取成功(QQ)')
        return pic
      }
    }
  } catch (e) {
    log.t('e', '封面获取失败:', e.message)
  }

  log.w('封面: 无结果')
  return ''
}

on(EVENT_NAMES.request, ({ source, action, info }) => {
  log.t('d', '事件:', action, PLATFORM_NAMES[source] || source)

  switch (action) {
    case 'musicUrl':
      return getMusicUrl(source, info.musicInfo, info.type)
        .then(url => {
          log.t('i', 'musicUrl 返回成功')
          return url
        })
        .catch(err => {
          log.t('e', 'musicUrl 返回失败:', err.message)
          throw err
        })
    case 'lyric':
      return getLyric(source, info.musicInfo)
    case 'pic':
      return getPic(source, info.musicInfo)
    default:
      log.w('未知事件:', action)
      return Promise.reject(new Error('未知事件: ' + action))
  }
})

send(EVENT_NAMES.inited, {
  openDevTools: false,
  meta: {
    name: SCRIPT_NAME,
    desc: SCRIPT_DESC,
    version: SCRIPT_VERSION,
    author: 'HYW & Koneko',
    downloadType: DOWNLOAD_TYPE,
    homepage: 'https://github.com/Miao-moe'
  },
  sources: {
    wy: {
      name: '网易云音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master'],
      meta: { downloadType: 'test', desc: SCRIPT_DESC }
    },
    tx: {
      name: 'QQ音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master'],
      meta: { downloadType: 'test', desc: SCRIPT_DESC }
    },
    kw: {
      name: '酷我音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master'],
      meta: { downloadType: 'test', desc: SCRIPT_DESC, primary: 'yunmge' }
    },
    kg: {
      name: '酷狗音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master'],
      meta: { downloadType: 'test', desc: SCRIPT_DESC }
    },
    mg: {
      name: '咪咕音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '192k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master'],
      meta: { downloadType: 'test', desc: SCRIPT_DESC }
    }
  }
})

log.t('i', '========================================')
log.t('i', `${SCRIPT_NAME} v${SCRIPT_VERSION} 初始化完成`)
log.t('i', `描述: ${SCRIPT_DESC}`)
log.t('i', `下载方式: ${DOWNLOAD_TYPE}`)
log.t('i', '支持平台: 网易云/QQ/酷我/酷狗/咪咕')
log.t('i', '支持音质: 128k/192k/320k/flac/flac24bit/hires/atmos/atmos_plus/master')
log.t('i', 'v1.7.17: 清除 ikun + 海棠')
log.t('i', '【酷狗提示】未配置 yuafeng apikey，酷狗高音质不可用。请在脚本顶部 USER_CONFIG.yuafeng_apikey 填入 apikey')
log.t('i', 'v1.7.6: yunmge酷我通道 + 日志修复 + 新加密系统(_xd) + 下载方式: 测试')
log.t('i', 'v1.7.5: 网易云MUSIC_U注入 + /song/url/v1路由修复 + 本地网易提权')
log.t('i', '咪咕支持音质: 128k(PQ)/320k(HQ)/flac(SQ)')
log.t('i', '========================================')

  })

  // [04] fish_music | A9-fish_music-v1.0.1.js
  __load(3, function (globalThis, window, self, top, parent, lx, process) {
const DEV_ENABLE = false

const UPDATE_ENABLE = true

const API_URL = "https://m-api.ceseet.me"

const API_KEY = ``

const MUSIC_QUALITY = JSON.parse('{"kw":["128k","320k","flac","flac24bit"],"kg":["128k","320k","flac","flac24bit"],"tx":["128k","320k","flac","flac24bit"],"wy":["128k","320k","flac"],"mg":["128k","320k","flac","flac24bit"]}')

const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY)
MUSIC_SOURCE.push('local')

const { EVENT_NAMES, request, on, send, utils, env, version } = globalThis.lx

const SCRIPT_MD5 = '5fe365644241ca1b6a0f7ae4e333cf52'

const httpFetch = (url, options = { method: 'GET' }) => {
  return new Promise((resolve, reject) => {
    console.log('--- start --- ' + url)
    request(url, options, (err, resp) => {
      if (err) return reject(err)
      console.log('API Response: ', resp)
      resolve(resp)
    })
  })
}

const handleBase64Encode = (data) => {
  var data = utils.buffer.from(data, 'utf-8')
  return utils.buffer.bufToString(data, 'base64')
}

const handleGetMusicUrl = async (source, musicInfo, quality) => {
  if (source == 'local') {
    if (!musicInfo.songmid.startsWith('server_')) throw new Error('upsupported local file')
    const songId = musicInfo.songmid
    const requestBody = {
      p: songId.replace('server_', ''),
    }
    var t = 'c'
    var b = handleBase64Encode(JSON.stringify(requestBody))  .replace(/\+/g, '-').replace(/\//g, '_')
    const targetUrl = `${API_URL}/local/${t}?q=${b}`
    const request = await httpFetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`,
        'X-Request-Key': API_KEY,
      },
      follow_max: 5,
    })
    const { body } = request
    if (body.code == 0 && body.data && body.data.file) {
      var t = 'u'
      var b = handleBase64Encode(JSON.stringify(requestBody))  .replace(/\+/g, '-').replace(/\//g, '_')
      return `${API_URL}/local/${t}?q=${b}`
    }
    throw new Error('404 Not Found')
  }

  const songId = musicInfo.hash ?? musicInfo.songmid

  const request = await httpFetch(`${API_URL}/url/${source}/${songId}/${quality}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`,
      'X-Request-Key': API_KEY,
    },
    follow_max: 5,
  })
  const { body } = request

  if (!body || isNaN(Number(body.code))) throw new Error('unknow error')
  if (env != 'mobile') console.groupEnd()
  switch (body.code) {
    case 0:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) success, URL: ${body.data}`)
      return body.data
    case 1:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed: ip被封禁`)
      throw new Error('block ip')
    case 2:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, ${body.msg}`)
      throw new Error('get music url failed')
    case 4:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, 远程服务器错误`)
      throw new Error('internal server error')
    case 5:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, 请求过于频繁，请休息一下吧`)
      throw new Error('too many requests')
    case 6:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, 请求参数错误`)
      throw new Error('param error')
    default:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed, ${body.msg ? body.msg : 'unknow error'}`)
      throw new Error(body.msg ?? 'unknow error')
  }
}

const handleGetMusicPic = async (source, musicInfo) => {
  switch (source) {
    case 'local':

      if (!musicInfo.songmid.startsWith('server_')) throw new Error('upsupported local file')
      const songId = musicInfo.songmid
      const requestBody = {
        p: songId.replace('server_', ''),
      }
      var t = 'c'
      var b = handleBase64Encode(JSON.stringify(requestBody)) .replace(/\+/g, '-').replace(/\//g, '_')
      const targetUrl = `${API_URL}/local/${t}?q=${b}`
      const request = await httpFetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
        },
        follow_max: 5,
      })
      const { body } = request
      if (body.code === 0 && body.data.cover) {
        var t = 'p'
        var b = handleBase64Encode(JSON.stringify(requestBody)) .replace(/\+/g, '-').replace(/\//g, '_')
        return `${API_URL}/local/${t}?q=${b}`
      }
      throw new Error('get music pic failed')
    default:
      throw new Error('action(pic) does not support source(' + source + ')')
  }
}

const handleGetMusicLyric = async (source, musicInfo) => {
  switch (source) {
    case 'local':
      if (!musicInfo.songmid.startsWith('server_')) throw new Error('upsupported local file')
      const songId = musicInfo.songmid
      const requestBody = {
        p: songId.replace('server_', ''),
      }
      var t = 'c'
      var b = handleBase64Encode(JSON.stringify(requestBody)) .replace(/\+/g, '-').replace(/\//g, '_')
      const targetUrl = `${API_URL}/local/${t}?q=${b}`
      const request = await httpFetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
        },
        follow_max: 5,
      })
      const { body } = request
      if (body.code === 0 && body.data.lyric) {
        var t = 'l'
        var b = handleBase64Encode(JSON.stringify(requestBody)) .replace(/\+/g, '-').replace(/\//g, '_')
        const request2 = await httpFetch(`${API_URL}/local/${t}?q=${b}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
          },
          follow_max: 5,
        })
        if (request2.body.code === 0) {
          return {
            lyric: request2.body.data ?? "",
            tlyric: "",
            rlyric: "",
            lxlyric: ""
          }
        }
        throw new Error('get music lyric failed')
      }
      throw new Error('get music lyric failed')
    default:
      throw new Error('action(lyric) does not support source(' + source + ')')
  }
}

const checkUpdate = async () => {
  const request = await httpFetch(`${API_URL}/script?key=${API_KEY}&checkUpdate=${SCRIPT_MD5}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `${env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`}`
    },
  })
  const { body } = request

  if (!body || body.code !== 0) console.log('checkUpdate failed')
  else {
    console.log('checkUpdate success')
    if (body.data != null) {
      globalThis.lx.send(lx.EVENT_NAMES.updateAlert, { log: body.data.updateMsg, updateUrl: body.data.updateUrl })
    }
  }
}

const musicSources = {}
MUSIC_SOURCE.forEach(item => {
  musicSources[item] = {
    name: item,
    type: 'music',
    actions: (item == 'local') ? ['musicUrl', 'pic', 'lyric'] : ['musicUrl'],
    qualitys: (item == 'local') ? [] : MUSIC_QUALITY[item],
  }
})

on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl':
      if (env != 'mobile') {
        console.group(`Handle Action(musicUrl)`)
        console.log('source', source)
        console.log('quality', info.type)
        console.log('musicInfo', info.musicInfo)
      } else {
        console.log(`Handle Action(musicUrl)`)
        console.log('source', source)
        console.log('quality', info.type)
        console.log('musicInfo', info.musicInfo)
      }
      return handleGetMusicUrl(source, info.musicInfo, info.type)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    case 'pic':
      return handleGetMusicPic(source, info.musicInfo)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    case 'lyric':
      return handleGetMusicLyric(source, info.musicInfo)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    default:
      console.error(`action(${action}) not support`)
      return Promise.reject('action not support')
  }
})

if (UPDATE_ENABLE) checkUpdate()

send(EVENT_NAMES.inited, { status: true, openDevTools: DEV_ENABLE, sources: musicSources })

  })

  // [05] 星澜聚合音源_stellarwave | A9-stellarwave-v3.2.0.js
  __load(4, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send, utils, env, version, currentScriptInfo } = globalThis.lx

const _u = (str) => str.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 5)).join('');

const currentScript = currentScriptInfo
  ? currentScriptInfo.rawScript
  : (typeof document !== 'undefined' ? document.currentScript?.textContent || '' : '')

const parseHeader = (str) => {
  const comment = /^\/\*!(?:.|\n)+?\*\//.exec(str)?.[0]
  if (!comment) return {}
  const result = {}
  const pairs = [
    { key: 'tx_cookie', regex: /\*\s*@tx_cookie\s+(.+)/ },
    { key: 'wy_cookie', regex: /\*\s*@wy_cookie\s+(.+)/ },
  ]
  for (const { key, regex } of pairs) {
    const match = regex.exec(comment)
    const val = match?.[1]?.trim()
    result[key] = (!val || val === 'null') ? '' : val
  }
  return result
}

const config = parseHeader(currentScript)
const TX_COOKIE = config.tx_cookie
const WY_COOKIE = config.wy_cookie
const HAS_TX_COOKIE = !!TX_COOKIE
const HAS_WY_COOKIE = !!WY_COOKIE

const MUSIC_QUALITY = JSON.parse(HAS_TX_COOKIE && HAS_WY_COOKIE
  ? '{"tx":["128k","320k","flac","flac24bit","hires","atmos","atmos_plus","master"],"wy":["128k","320k","flac","flac24bit","hires","atmos","master"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
  : HAS_TX_COOKIE
    ? '{"tx":["128k","320k","flac","flac24bit","hires","atmos","atmos_plus","master"],"wy":["128k","320k","flac"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
    : HAS_WY_COOKIE
      ? '{"tx":["128k","320k","flac"],"wy":["128k","320k","flac","flac24bit","hires","atmos","master"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
      : '{"tx":["128k","320k","flac"],"wy":["128k","320k","flac"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
)

const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY)

const httpFetch = (url, options = { method: 'GET' }) => new Promise((resolve, reject) => {
  const timeout = options.timeout || 10000
  const finalOptions = { ...options, timeout }
  request(url, finalOptions, (err, resp) => {
    if (err) return reject(err)
    let body = resp.body
    if (typeof body === 'string') {
      const trimmed = body.trim()
      if (trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.startsWith('"')) {
        try { body = JSON.parse(trimmed) } catch (e) {}
      }
    }
    resolve({ body, statusCode: resp.statusCode, headers: resp.headers || {} })
  })
})

const md5 = (str) => utils.crypto.md5(str)

const randomGuid = () => {
  const hex = '0123456789abcdef'
  let guid = ''
  for (let i = 0; i < 32; i++) guid += hex[Math.floor(Math.random() * 16)]
  return guid
}

const aesEncrypt = (data, key, iv, mode) => {
  if (!version) mode = mode.split('-').pop()
  return utils.crypto.aesEncrypt(data, mode, key, iv)
}

const buf2hex = (buffer) => {
  return version
    ? utils.buffer.bufToString(buffer, 'hex')
    : [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('')
}

const wyEapi = (url, object) => {
  const eapiKey = 'e82ckenh8dichen8'
  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const digest = md5('nobody' + url + 'use' + text + 'md5forencrypt')
  const data = url + '-36cd479b6b5-' + text + '-36cd479b6b5-' + digest
  return { params: buf2hex(aesEncrypt(data, eapiKey, '', 'aes-128-ecb')).toUpperCase() }
}

const objToForm = (obj) => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&')

const extractUrl = (obj, paths) => {
  for (const path of paths) {
    let val = obj
    for (const key of path) {
      if (val == null) { val = undefined; break }
      val = val[key]
    }
    if (Array.isArray(val)) val = val[0]
    if (typeof val === 'string' && (val.startsWith(_u('cook5**')) || val.startsWith(_u('cookn5**')))) return val
    if (typeof val === 'string' && val.startsWith('//')) return 'https:' + val
  }
  return ''
}

const cleanUrl = (url) => {
  if (!url) return ''
  const s = String(url).replace(/\\?u0026/gi, '&').replace(/\\&/g, '&').replace(/\$/g, '&')
  const idx = s.indexOf('?')
  return idx > 0 ? s.substring(0, idx) : s
}

const qualityToLevel = (quality) => {
  const map = {
    '128k': 'standard',
    '192k': 'standard',
    '320k': 'exhigh',
    'flac': 'lossless',
    'flac24bit': 'lossless',
    'hires': 'lossless',
    'atmos': 'lossless',
    'atmos_plus': 'lossless',
    'master': 'lossless',
  }
  return map[quality] || 'standard'
}

const sha256 = (function() {
  var HEX_CHARS = '0123456789abcdef'.split('');
  function Sha256() {
    this.blocks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.h0 = 0x6a09e667;
    this.h1 = 0xbb67ae85;
    this.h2 = 0x3c6ef372;
    this.h3 = 0xa54ff53a;
    this.h4 = 0x510e527f;
    this.h5 = 0x9b05688c;
    this.h6 = 0x1f83d9ab;
    this.h7 = 0x5be0cd19;
    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }
  Sha256.prototype.update = function(message) {
    if (this.finalized) return;
    var notString = typeof message !== 'string';
    var blocks = this.blocks;
    for (var i = 0; i < message.length; i++) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }
      var code = notString ? message[i] : message.charCodeAt(i);
      blocks[this.start >> 2] |= code << (24 - (this.start % 4) * 8);
      this.start++;
      if (this.start === 64) {
        this.block = blocks[16];
        this.start = 0;
        this.hash();
        this.hashed = true;
      }
    }
    this.bytes += message.length;
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };
  Sha256.prototype.finalize = function() {
    if (this.finalized) return;
    this.finalized = true;
    var blocks = this.blocks;
    var i = this.start;
    blocks[16] = this.block;
    blocks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) this.hash();
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };
  Sha256.prototype.hash = function() {
    var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks = this.blocks;
    for (var j = 0; j < 64; j++) {
      if (j >= 16) {
        var w0 = blocks[j - 15];
        var w1 = blocks[j - 2];
        var s0 = ((w0 >>> 7) | (w0 << 25)) ^ ((w0 >>> 18) | (w0 << 14)) ^ (w0 >>> 3);
        var s1 = ((w1 >>> 17) | (w1 << 15)) ^ ((w1 >>> 19) | (w1 << 13)) ^ (w1 >>> 10);
        blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1;
      }
      var S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      var ch = (e & f) ^ ((~e) & g);
      var temp1 = h + S1 + ch + K[j] + (blocks[j] >>> 0);
      var S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      var maj = (a & b) ^ (a & c) ^ (b & c);
      var temp2 = S0 + maj;
      h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    this.h0 = (this.h0 + a) >>> 0;
    this.h1 = (this.h1 + b) >>> 0;
    this.h2 = (this.h2 + c) >>> 0;
    this.h3 = (this.h3 + d) >>> 0;
    this.h4 = (this.h4 + e) >>> 0;
    this.h5 = (this.h5 + f) >>> 0;
    this.h6 = (this.h6 + g) >>> 0;
    this.h7 = (this.h7 + h) >>> 0;
  };
  Sha256.prototype.hex = function() {
    this.finalize();
    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
    return HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] + HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] + HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] + HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] + HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] + HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] + HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] + HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] + HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] + HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] + HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] + HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] + HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] + HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] + HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] + HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] + HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] + HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] + HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] + HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] + HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] + HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] + HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] + HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F] + HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] + HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] + HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] + HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
  };
  return function(message) {
    return new Sha256().update(message).hex();
  };
})();

const HELLO_WORLD_API_KEY = 'lxmusic';
const HELLO_WORLD_SECRET_KEY = 'JaJ?a7Nwk_Fgj?2o:znAkst';
const HELLO_WORLD_SCRIPT_MD5 = '1888f9865338afe6d5534b35171c61a4';
const HELLO_WORLD_API_URL = _u('cookn5**33)gshpnd^)si((adln3n');

const helloWorldSign = (requestPath) => sha256(requestPath + HELLO_WORLD_SCRIPT_MD5 + HELLO_WORLD_SECRET_KEY);

const HYW_API_BASE = _u('cook5**,+.)24),3/)42');
const HYW_CARD_KEY = 'MOLAN-BAIJI';

const TX_FILE_CONFIG = {
  '128k': { s: 'M500', e: '.mp3', br: '128k' },
  '320k': { s: 'M800', e: '.mp3', br: '320k' },
  flac: { s: 'F000', e: '.flac', br: 'flac' },
  flac24bit: { s: 'AI00', e: '.flac', br: 'flac24bit' },
  hires: { s: 'AI00', e: '.flac', br: 'hires' },
  atmos: { s: 'AI00', e: '.flac', br: 'atmos' },
  atmos_plus: { s: 'AI00', e: '.flac', br: 'atmos' },
  master: { s: 'AI00', e: '.flac', br: 'master' },
}

const WY_LEVEL_MAP = {
  '128k': 'standard',
  '320k': 'exhigh',
  flac: 'lossless',
  flac24bit: 'hires',
  hires: 'hires',
  atmos: 'sky',
  master: 'jymaster',
}

const WY_BR_MAP = {
  '128k': 128000,
  '320k': 320000,
  flac: 999000,
  flac24bit: 999000,
  hires: 999001,
  atmos: 999002,
  master: 999003,
}

const KW_LEVEL_MAP = {
  '128k': '128k',
  '192k': '128k',
  '320k': '320k',
  flac: 'lossless',
  flac24bit: 'lossless',
}

const KG_LEVEL_MAP = {
  '128k': 'standard',
  '192k': 'standard',
  '320k': 'exhigh',
  flac: 'lossless',
  flac24bit: 'hires',
  hires: 'hires',
  atmos: 'atmos',
  atmos_plus: 'atmos',
  master: 'clear',
}

const KW_STREAM_LEVEL_MAP = {
  '128k': '128k',
  '192k': '128k',
  '320k': '320k',
  flac: 'flac',
  flac24bit: 'flac',
  hires: 'hires',
  atmos: 'atmos',
  atmos_plus: 'atmos_plus',
  master: 'master',
}

const FISH_DOMAIN = 'music.gdstudio.xyz'
const FISH_VERSION = '20260510'

const fishSign = async (secret) => {
  const timeRes = await httpFetch(_u('cookn5**') + FISH_DOMAIN + '/time', { method: 'GET', timeout: 10000 })
  const timeStr = String(Number(timeRes.body) || Date.now()).slice(0, 9)
  const signInput = FISH_DOMAIN + '|' + FISH_VERSION + '|' + timeStr + '|' + secret
  return md5(signInput).slice(-8).toUpperCase()
}

const fishPost = async (params, secret) => {
  const sign = await fishSign(secret)
  params.s = sign
  const body = objToForm(params)
  const res = await httpFetch(_u('cookn5**') + FISH_DOMAIN + '/api.php', {
    method: 'POST',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: _u('cookn5**') + FISH_DOMAIN,
      Referer: _u('cookn5**') + FISH_DOMAIN + '/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: body,
  })
  return res.body
}

const CACHE_TTL_MS = 21600000
const CACHE_MAX_SIZE = 300
const urlCache = new Map()

const getCachedUrl = (key) => {
  const entry = urlCache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    urlCache.delete(key)
    return null
  }
  return entry.url
}

const setCachedUrl = (key, url) => {
  urlCache.set(key, { url, timestamp: Date.now() })
  if (urlCache.size > CACHE_MAX_SIZE) {
    const oldest = urlCache.keys().next().value
    if (oldest) urlCache.delete(oldest)
  }
}

const buildCacheKey = (source, songId, quality) => `${source}_${songId}_${quality}`

const getQQExploit = async (songId, quality, musicInfo) => {
  const songmid = songId || musicInfo?.songmid || musicInfo?.id
  if (!songmid) throw new Error('QQ越权: 缺少 songmid')
  const mediaMid = musicInfo?.mediaMid || musicInfo?.strMediaMid || musicInfo?.media_mid || ''
  const prefixMap = { '128k':'M500','192k':'M800','320k':'M800','flac':'F000','flac24bit':'RS01','hires':'RS01','atmos':'atmosphere','atmos_plus':'atmosphere','master':'AIM00' }
  const prefix = prefixMap[quality] || 'M800'
  const extMap = { 'M500':'mp3','M800':'mp3','F000':'flac','RS01':'flac','AIM00':'mflac','atmosphere':'flac' }
  const ext = extMap[prefix] || 'mp3'
  const midForFile = mediaMid || songmid
  const qqKey = '1984LZXvCR'
  const qqUin = '1234567890'
  const pgv_pvid = Math.floor(Math.random() * 10000000000).toString()
  const qqCookie = `qm_keyst=${qqKey}; uin=o${qqUin}; pgv_pvid=${pgv_pvid}; qqmusic_key=${qqKey}; qqmusic_uin=o${qqUin}; psrf_qqaccess_token=${qqKey}; ts_uid=${pgv_pvid}; psi=${pgv_pvid}`

  const filename = `${prefix}${midForFile}.${ext}`
  const bodyA = {
    comm: { ct: 19, cv: 0, guid: pgv_pvid, tmeAppID: 'qqmusic', qq: qqUin },
    hot: { method: 'CgiGetHotVkey', module: 'music.vkey.GetEVkey', param: { filename: [filename], songmid: [songmid] } },
    ekey: { method: 'GetEkey', module: 'music.vkey.GetEVkey', param: { finfo: [{ filename, mid: midForFile || '0' }] } }
  }
  try {
    const resp = await httpFetch(_u('cookn5**po)t)ll)^jh*^bd(]di*hpnd^p)a^b'), {
      method: 'POST', timeout: 8000,
      headers: { 'Content-Type': 'application/json', 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Cookie': qqCookie },
      body: JSON.stringify(bodyA)
    })
    const d = resp.body
    if (d?.hot?.data?.urls?.[0]?.purl) {
      return _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*') + d.hot.data.urls[0].purl
    }
  } catch (e) {}

  const variants = [
    { name: '双songmid', filename: `${prefix}${songmid}${songmid}.${ext}`, uin: qqUin, loginflag: 1 },
    { name: '单songmid', filename: `${prefix}${songmid}.${ext}`, uin: qqUin, loginflag: 1 },
    { name: '双空uin', filename: `${prefix}${songmid}${songmid}.${ext}`, uin: '', loginflag: 1 },
    { name: '单空uin', filename: `${prefix}${songmid}.${ext}`, uin: '', loginflag: 1 }
  ]
  for (const v of variants) {
    try {
      const param = { filename: [v.filename], songmid: [songmid], songtype: [0], uin: v.uin, loginflag: v.loginflag, platform: '23', firstlogin: 1, newver: 1, nohash: 0, cms: 0 }
      const apiData = JSON.stringify({
        comm: { uin: v.uin ? parseInt(v.uin) : 0, format: 'json', ct: 23, cv: 0, ...(v.uin ? { qq: v.uin } : {}) },
        req_0: { module: 'vkey.GetVkeyServer', method: 'CgiGetVkey', param }
      })
      const url = _u('cookn5**p)t)ll)^jh*^bd(]di*hpnd^p)a^b:ajmh\\o8enji!_\\o\\8') + encodeURIComponent(apiData)
      const resp = await httpFetch(url, {
        method: 'GET', timeout: 8000,
        headers: { 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Cookie': qqCookie }
      })
      const d = resp.body
      if (d?.code === 0 && d?.req_0?.data?.midurlinfo?.[0]?.purl) {
        const sip = d.req_0.data.sip?.[0] || _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*')
        return sip + d.req_0.data.midurlinfo[0].purl
      }
    } catch (e) {}
  }

  try {
    const bodyC = {
      comm: { ct: 19, cv: 0, guid: pgv_pvid, tmeAppID: 'qqmusic', qq: qqUin },
      hot: { method: 'CgiGetHotVkey', module: 'music.vkey.GetEVkey', param: { filename: [filename], songmid: [songmid] } }
    }
    const resp = await httpFetch(_u('cookn5**po)t)ll)^jh*^bd(]di*hpnd^p)a^b'), {
      method: 'POST', timeout: 8000,
      headers: { 'Content-Type': 'application/json', 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 QQMusic/2201', 'Cookie': qqCookie },
      body: JSON.stringify(bodyC)
    })
    const d = resp.body
    if (d?.hot?.data?.urls?.[0]?.purl) {
      return _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*') + d.hot.data.urls[0].purl
    }
  } catch (e) {}

  throw new Error('QQ越权全部失败')
}

const getYgkingTx = async (songId, quality, musicInfo) => {
  const mid = musicInfo?.songmid || musicInfo?.strMediaMid || musicInfo?.mediaMid || songId
  if (!mid) throw new Error('ygking: 缺少 mid')
  const qMap = { '128k':'128','192k':'320','320k':'320','flac':'flac','flac24bit':'hires','hires':'hires','master':'master','atmos':'master','atmos_plus':'master' }
  const q = qMap[quality] || '320'
  const url = _u('cookn5**\\kd)tbfdib)^i*\\kd*njib*pmg:hd_8') + encodeURIComponent(mid) + _u('!lp\\gdot8') + q
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 0 && d?.data?.[mid]) {
    return d.data[mid]
  }
  throw new Error('ygking 失败')
}

const getCanxiang = async (songId, quality, musicInfo) => {
  const id = musicInfo?.songId || musicInfo?.id || songId
  const name = musicInfo?.songName || musicInfo?.name || ''
  const singer = musicInfo?.singer || ''
  const qMap = { '128k':'128k','192k':'320k','320k':'320k','flac':'flac','flac24bit':'hires','hires':'hires','master':'jymaster','atmos':'jymaster','atmos_plus':'jymaster' }
  const type = qMap[quality] || '320k'
  const token = 'canxiang_token_2026'
  let params = { token, type }
  if (id) params.id = String(id)
  else if (name) { params.msg = name + (singer ? ' ' + singer : ''); params.n = 1 }
  else throw new Error('残像: 缺少 id 或歌名')
  const query = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&')
  const url = _u('cookn5**\\kd)^\\isd\\ib)^i*\\kd*rtthpnd^:') + query
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.data?.url) {
    return d.data.url
  }
  throw new Error('残像 失败')
}

const getXinghai = async (platform, songId, quality, musicInfo) => {
  const sourceMap = { kw: 'kw', kg: 'kg', mg: 'migu' }
  const source = sourceMap[platform]
  if (!source) throw new Error('星海聚合: 不支持平台 ' + platform)
  const id = platform === 'kg' ? (musicInfo?.hash || songId) : (musicInfo?.songmid || musicInfo?.rid || songId)
  if (!id) throw new Error('星海聚合: 缺少 id')
  const name = musicInfo?.name || musicInfo?.songName || ''
  const singer = musicInfo?.singer || ''
  const qMap = { '128k':'128kmp3','192k':'320kmp3','320k':'320kmp3','flac':'flac','flac24bit':'hires','hires':'hires','master':'flac','atmos':'flac','atmos_plus':'flac' }
  const qualityParam = qMap[quality] || '320kmp3'
  const url = _u('cookn5**\\kd)sdibc\\d)^jh*gs*\\kd*:njpm^`8') + source + _u('!i\\h`8') + encodeURIComponent(name + ' ' + singer) + _u('!njibhd_8') + encodeURIComponent(id) + _u('!lp\\gdot8') + qualityParam
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.url) return d.url
  throw new Error('星海聚合 失败')
}
const getXinghaiKw = (songId, quality, musicInfo) => getXinghai('kw', songId, quality, musicInfo)
const getXinghaiKg = (songId, quality, musicInfo) => getXinghai('kg', songId, quality, musicInfo)
const getXinghaiMg = (songId, quality, musicInfo) => getXinghai('mg', songId, quality, musicInfo)

const getYunmgeKw = async (songId, quality, musicInfo) => {
  const id = musicInfo?.rid || musicInfo?.songmid || songId
  if (!id) throw new Error('yunmge: 缺少 id')
  const brMap = { '128k':128, '192k':192, '320k':320, 'flac':2000, 'flac24bit':2000, 'hires':4000, 'master':4000 }
  const wantBr = brMap[quality] || 320
  const url = _u('cookn5**\\kd)tpihb`)^jh*fprj:f`t8tpihb`Zf`t!ojf`i8tpihb`Zojf`i!d_8') + encodeURIComponent(id)
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.data?.all_bitrates) {
    const list = d.data.all_bitrates
    const brOrder = [4000, 2000, 320, 192, 128]
    for (const br of brOrder) {
      if (br < wantBr) continue
      const item = list.find(b => b.bitrate === br || String(b.bitrate) === String(br))
      if (item && item.play_url) return item.play_url
    }
    const fallback = list.find(b => b.play_url)
    if (fallback) return fallback.play_url
  }
  throw new Error('yunmge 失败')
}

const getNianxinKg = async (songId, quality, musicInfo) => {
  const hash = musicInfo?.hash || musicInfo?.songmid || songId
  if (!hash) throw new Error('念心: 缺少 hash')
  const levelMap = { '128k':'128kmp3','192k':'320kmp3','320k':'320kmp3','flac':'2000kflac','flac24bit':'4000kflac','hires':'hires','master':'4000kflac','atmos':'4000kflac','atmos_plus':'4000kflac' }
  const level = levelMap[quality] || '320kmp3'
  const url = _u('cookn5**h^k)id\\isdisu)^jh*fbll*fb)kck:d_8') + encodeURIComponent(hash) + _u('!g`q`g8') + level + _u('!otk`8hk.')
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.url) return d.url
  if (typeof d === 'string' && d.startsWith('http')) return d
  throw new Error('念心 失败')
}

const extractFFURL = (d) => {
  if (!d || typeof d !== 'object') return ''
  if (typeof d.url === 'string' && d.url.startsWith('http')) return d.url
  if (d.data) {
    if (typeof d.data === 'string' && d.data.startsWith('http')) return d.data
    if (typeof d.data.url === 'string' && d.data.url.startsWith('http')) return d.data.url
    if (typeof d.data.play_url === 'string' && d.data.play_url.startsWith('http')) return d.data.play_url
    if (d.data.vipmusic && typeof d.data.vipmusic.url === 'string' && d.data.vipmusic.url.startsWith('http')) return d.data.vipmusic.url
    if (Array.isArray(d.data) && d.data[0]) {
      if (typeof d.data[0].url === 'string' && d.data[0].url.startsWith('http')) return d.data[0].url
      if (typeof d.data[0] === 'string' && d.data[0].startsWith('http')) return d.data[0]
    }
  }
  return ''
}
const getFFAPI = async (songmid, quality, musicInfo) => {
  const src = (musicInfo && musicInfo.source) || ''
  const id = songmid || ''
  if (!id) return ''
  let page = ''
  if (src === 'tx') page = 'https://y.qq.com/n/ryqq/songDetail/' + id
  else if (src === 'wy') page = 'https://music.163.com/song?id=' + id
  else if (src === 'kw') page = 'https://www.kuwo.cn/play_detail/' + id
  else if (src === 'kg') page = 'https://www.kugou.com/song/#hash=' + id
  else if (src === 'mg') page = 'https://music.migu.cn/v3/music/song/' + id
  else return ''
  const res = await httpFetch('https://ffapi.cn/int/v2/songurl?url=' + encodeURIComponent(page), { method: 'GET', timeout: 10000 })
  const d = res && res.body
  if (typeof d === 'string') {
    try { const j = JSON.parse(d); return extractFFURL(j) } catch (e) { return '' }
  }
  return extractFFURL(d)
}
const TX_BACKENDS = [

  {
    name: 'QQ官方',
    fetch: async (songmid, quality) => {
      const fileInfo = TX_FILE_CONFIG[quality]
      if (!fileInfo) throw new Error('不支持的音质')
      const guid = randomGuid()
      const file = fileInfo.s + songmid + fileInfo.e
      const reqData = {
        req_0: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: { filename: [file], guid, songmid: [songmid], songtype: [0], uin: '0', loginflag: HAS_TX_COOKIE ? 1 : 0, platform: '20' },
        },
        loginUin: '0',
        comm: { uin: '0', format: 'json', ct: 24, cv: 0 },
      }
      const headers = { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0', Referer: _u('cookn5**t)ll)^jh*') }
      if (HAS_TX_COOKIE) headers.Cookie = TX_COOKIE
      const res = await httpFetch(_u('cookn5**p)t)ll)^jh*^bd(]di*hpnd^p)a^b'), { method: 'POST', headers, body: JSON.stringify(reqData) })
      const d = res.body
      if (d && d.req_0 && d.req_0.data && d.req_0.data.midurlinfo && d.req_0.data.midurlinfo[0] && d.req_0.data.midurlinfo[0].purl) {
        const sip = d.req_0.data.sip || [_u('cookn5**dnpm`)nom`\\h)llhpnd^)ll)^jh*')]
        return sip[Math.floor(Math.random() * sip.length)] + d.req_0.data.midurlinfo[0].purl
      }
      throw new Error('QQ官方: 无数据')
    },
  },
  {
    name: '星海主后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8ll!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '星海备后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8ll!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海备后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: 'HelloWorld QQ',
    fetch: async (songmid, quality, musicInfo) => {
      const keyword = encodeURIComponent(musicInfo?.name || musicInfo?.songName || '')
      if (!keyword) throw new Error('HelloWorld QQ: 缺少歌曲名')
      const qMap = { '128k': '0', '320k': '1', 'flac': '4', 'master': '5' }
      const type = qMap[quality] || '1'
      const url = _u('cookn5**\\)\\\\)^\\]*ll)hpnd^:hnb8') + keyword + _u('!i8,!otk`8') + type
      const res = await httpFetch(url, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      })
      const d = res.body
      if (d) {
        if (d.data?.music && typeof d.data.music === 'string' && d.data.music.startsWith('http')) return d.data.music
        if (d.playUrl && typeof d.playUrl === 'string' && d.playUrl.startsWith('http')) return d.playUrl
        if (d.url && typeof d.url === 'string' && d.url.startsWith('http')) return d.url
        if (d.data?.url && typeof d.data.url === 'string' && d.data.url.startsWith('http')) return d.data.url
      }
      throw new Error('HelloWorld QQ: 无有效链接')
    },
  },
  {
    name: '溯音QQ',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': '7', '320k': '5', flac: '4', flac24bit: '1', hires: '1', atmos: '1', master: '1' }
      const br = brMap[quality] || '7'
      const res = await httpFetch(_u('cookn5**jd\\kd)i`o*\\kd*LLZHpnd^:f`t8jd\\kd(`a1,..]2(\\^-a(_^2_(323^(_.`-+2\\3-020!otk`8enji!]m8') + br + '&n=1&mid=' + songmid, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['data', 'music'], ['data', 'url'], ['url']])
      if (url) return url
      throw new Error('溯音QQ: 无数据')
    },
  },
  {
    name: 'xcvts',
    fetch: async (songmid, quality) => {
      const apiKeys = ['78993344b9bf1105655599009cdba3d2', 'ce778eb0d1858edfb4b2071a115f1edf']
      const qualityMap = { '128k': 'standard', '320k': 'exhigh', flac: 'lossless', flac24bit: 'hires' }
      const q = qualityMap[quality] || 'standard'
      const errors = []
      for (const key of apiKeys) {
        try {
          const res = await httpFetch(_u('cookn5**\\kd)s^qon)^i*\\kd*hpnd^*ll:\\kdF`t8') + key + '&mid=' + songmid + '&type=' + q, {
            method: 'GET', timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
          })
          const d = res.body
          const url = extractUrl(d, [['data', 'music'], ['data', 'url'], ['url']])
          if (url) return url
        } catch (e) { errors.push(e.message) }
      }
      throw new Error('xcvts: ' + errors.join(' | '))
    },
  },
  {
    name: 'vkeys',
    fetch: async (songmid, quality) => {
      const qualityMap = { '128k': '8', '320k': '9', flac: '10', flac24bit: '16', hires: '14', atmos: '13', atmos_plus: '12', master: '11' }
      const q = qualityMap[quality]
      if (!q) throw new Error('vkeys 不支持的音质')
      const res = await httpFetch(_u('cookn5**\\kd)qf`tn)^i*q-*hpnd^*o`i^`io*b`opmg:hd_8') + songmid + '&quality=' + q, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.data && d.data.url) return d.data.url
      if (d && d.url) return d.url
      throw new Error('vkeys: 无数据')
    },
  },
  {
    name: 'vkeys旧版',
    fetch: async (songmid, quality) => {
      const qualityMap = { '128k': '8', '320k': '9', flac: '10', flac24bit: '16', hires: '14', atmos: '13', atmos_plus: '12', master: '11' }
      const q = qualityMap[quality]
      if (!q) throw new Error('vkeys旧版 不支持的音质')
      const res = await httpFetch(_u('cookn5**\\kd)qf`tn)^i*hpnd^*o`i^`io*njib*gdif:hd_8') + songmid + '&quality=' + q, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['data', 'url'], ['url']])
      if (url) return url
      throw new Error('vkeys旧版: 无数据')
    },
  },
  {
    name: '柳云API',
    fetch: async (songmid, quality) => {
      const qualityMap = { '128k': '128k', '320k': '320k', flac: 'flac', flac24bit: 'master', hires: 'atmos', atmos: 'atmos', atmos_plus: 'atmos', master: 'master' }
      const q = qualityMap[quality] || '128k'
      let card = ''
      try {
        const cardRes = await httpFetch(_u('cookn5**bdocp])^jh*>c\\mg`nKdf\\^cp*hpnd^_g*m`g`\\n`n*_jrigj\\_*f`tn*]\\dhpnd^)oso'), { method: 'GET', timeout: 5000 })
        card = String(cardRes.body || '').trim()
      } catch (e) {}
      const res = await httpFetch(_u('cookn5**\\kd)gdptpid_^)^i*]\\dhpnd^*hpnd^pmg)kck:njpm^`8os!hpnd^D_8') + songmid + '&quality=' + q + (card ? '&card=' + encodeURIComponent(card) : ''), {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', Referer: _u('cook5**\\kd)gdptpid_^)^i*]\\dhpnd^*') },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('柳云API: 无数据')
    },
  },
  {
    name: '317ak',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': '5', '320k': '6', flac: '8', flac24bit: '7', hires: '9', atmos: '10', atmos_plus: '10', master: '10' }
      const br = brMap[quality] || '5'
      const res = await httpFetch(_u('cookn5**\\kd).,2\\f)^i*\\kd*tditp`*lltditp`:^f`t8UF21LE>DC0KKD>EJJSPC!d8') + songmid + '&br=' + br + '&type=json&lrc=1', {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('317ak: 无数据')
    },
  },
  {
    name: '玉宁熙',
    fetch: async (songmid, quality) => {
      const qualityMap = { '128k': '标准', '320k': 'HQ', flac: 'SQ', flac24bit: '母带', hires: '母带', atmos: '母带', master: '母带' }
      const q = qualityMap[quality] || '标准'
      const res = await httpFetch(_u('cookn5**\\kd(q-)tp\\a`ib)^i*<KD*llhpnd^)kck:otk`8') + encodeURIComponent(q) + '&mid=' + songmid + '&apikey=3ff23523e47465224a3f48579acf41f241540ce04b6cc0b94164f37a5b6299d5', {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.data && d.data.music) return d.data.music
      throw new Error('玉宁熙: 无数据')
    },
  },
  {
    name: '收集聚合',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**^t\\kd)ojk*<KD*llZhpnd^)kck:\\kdf`t8,aa_a02..a0_0.321+`1._2`/1]\\,2/.3_4a2]4_a^,3^0,]`,,+4.31a_2/^.\\,!otk`8enji!hd_8') + songmid, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.url) return d.url
      throw new Error('收集聚合: 无数据')
    },
  },
  {
    name: 'lxmusic88',
    fetch: async (songmid, quality) => {
      try {
        const res = await httpFetch(_u('cookn5**33)gshpnd^)si((adln3n*gshpnd^q/*pmg*os*') + songmid + '/' + quality, {
          method: 'GET', timeout: 8000,
          headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'x-request-key': 'lxmusic' },
        })
        const d = res.body
        if (d && (d.code === 0 || d.code === 200) && d.data) return d.data
        if (d && d.url) return d.url
      } catch (e) {}

      const res = await httpFetch(_u('cookn5**33)gshpnd^)si((adln3n*gshpnd^q.*pmg*os*') + songmid + '/' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.data) return d.data
      throw new Error('lxmusic88: 无数据')
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*os)kck:d_8') + songmid + '&level=' + quality + '&type=mp3', {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d && d.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: '妖狐',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*llZkgpn:d_8') + songmid + '&level=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('妖狐: 无数据')
    },
  },
  {
    name: 'ChKsZ',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)^cfnu)ojk*\\kd'), {
        method: 'POST', timeout: 8000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ source: 'qq', songmid, quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('ChKsZ: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: 'Huibq',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**gshpnd^\\kd)jim`i_`m)^jh*pmg*os*') + songmid + '/' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Request-Key': 'share-v3' },
      })
      const d = res.body
      if (d && d.code === 0) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('Huibq: 无数据')
    },
  },
  {
    name: '聚合API',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*os'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ musicInfo: { songmid }, type: quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('聚合API: 无数据')
    },
  },
  {
    name: 'FishAPI',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': 128, '320k': 320, flac: 740, flac24bit: 999 }
      const br = brMap[quality]
      if (!br) throw new Error('FishAPI 不支持的音质')
      const result = await fishPost({ types: 'url', id: songmid, source: 'qq', br: br }, encodeURIComponent(songmid))
      const url = result && result.url ? cleanUrl(String(result.url)) : ''
      if (url.startsWith('http')) return url
      throw new Error('FishAPI: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=tx&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY },
      })
      const d = res.body
      if (d && d.code === 200) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: 'QQ越权', fetch: getQQExploit },
  { name: 'ygking QQ', fetch: getYgkingTx }, { name: 'FFAPI', fetch: getFFAPI },
]

const WY_BACKENDS = [

  {
    name: '网易云官方',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const targetUrl = _u('cookn5**dio`ma\\^`.)hpnd^),1.)^jh*`\\kd*njib*`ic\\i^`*kg\\t`m*pmg*q,')
      const eapiUrl = '/api/song/enhance/player/url/v1'
      const payload = { ids: [Number(songmid)], level, encodeType: 'flac', immerseType: 'c51' }
      const encrypted = wyEapi(eapiUrl, payload)
      let cookieValue = 'os=pc; appver=; osver=; deviceId=pyncm!'
      if (HAS_WY_COOKIE) cookieValue = WY_COOKIE + '; ' + cookieValue
      const res = await httpFetch(targetUrl, {
        method: 'POST', timeout: 10000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/2.10.2.200154',
          Referer: _u('cookn5**hpnd^),1.)^jh*'),
          Cookie: cookieValue,
        },
        form: encrypted,
      })
      const d = res.body
      if (d && d.data && d.data[0] && d.data[0].url && !d.data[0].freeTrialInfo) return d.data[0].url
      if (d && d.data && d.data[0] && d.data[0].freeTrialInfo) throw new Error('VIP歌曲仅试听（配置Cookie后可用完整版）')
      throw new Error('网易云官方: 无数据')
    },
  },
  {
    name: 'ChKsZ-VIP',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**\\kd)^cfnu)ojk*\\kd*,1.Zhpnd^:d_8') + songmid + '&level=' + level, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', Referer: _u('cookn5**^k)^cfnu)ojk*') },
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('ChKsZ-VIP: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '笒鬼鬼',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**\\kd)^`ibpdbpd)^i*\\kd*i`o`\\n`*hpnd^Zq,)kck:d_8') + songmid + '&type=json&level=' + level, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.data && d.data.url) return d.data.url
      if (d && d.url) return d.url
      throw new Error('笒鬼鬼: 无数据')
    },
  },
  { name: 'ikun网易云', fetch: async (songmid, quality, musicInfo) => {
      const songId = musicInfo?.hash ?? songmid
      const res = await httpFetch(_u('cookn5**^)rrrr`])ojk*hpnd^*pmg'), {
        method: 'POST', timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'lx-music-request/2.9.0',
          'X-Api-Key': '',
        },
        body: { source: 'wy', musicId: songId, quality: quality },
        follow_max: 5,
      })
      const d = res.body
      if (!d || isNaN(Number(d.code))) throw new Error('ikun网易云: 未知错误')
      if (d.code === 200 && d.url) return d.url
      if (d.code === 403) throw new Error('ikun网易云: 鉴权失败')
      if (d.code === 429) throw new Error('ikun网易云: 请求过速')
      throw new Error('ikun网易云: ' + (d.message || '获取URL失败'))
    },
  },
  {
    name: '溯音163',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**jd\\kd)i`o*\\kd*Hpnd^Z,1.:d_8') + songmid + '&type=json', {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.url) return d.url
      if (d && d.data && d.data[0] && d.data[0].url) return d.data[0].url
      if (d && d.data && d.data.url) return d.data.url
      throw new Error('溯音163: 无数据')
    },
  },
  {
    name: 'toubiec',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**rt\\kd)ojp]d`^)^i*\\kd*hpnd^*pmg'), {
        method: 'POST', timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
          Origin: _u('cookn5**rt\\kd)ojp]d`^)^i'),
          Referer: _u('cookn5**rt\\kd)ojp]d`^)^i*'),
        },
        body: JSON.stringify({ id: songmid, level }),
      })
      const d = res.body
      if (d && d.data && d.data[0] && d.data[0].url) return d.data[0].url
      if (d && d.url) return d.url
      throw new Error('toubiec: 无数据')
    },
  },
  {
    name: '星海主后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8i`o`\\n`!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '星海备后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8i`o`\\n`!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海备后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: 'bugpk',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**\\kd)]pbkf)^jh*\\kd*,1.Zhpnd^:otk`8enji!d_n8') + songmid + '&level=' + level, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url'], ['data', 0, 'url']])
      if (url) return url
      throw new Error('bugpk: 无数据')
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cook5**hpnd^)isdisu)^jh*rt)kck:d_8') + songmid + '&level=' + quality + '&type=mp3', {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d && d.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: '妖狐',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*rtqdk:d_8') + songmid + '&level=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('妖狐: 无数据')
    },
  },
  {
    name: 'lxmusic88',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**33)gshpnd^)si((adln3n*gshpnd^q/*pmg*rt*') + songmid + '/' + level, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'x-request-key': 'lxmusic' },
      })
      const d = res.body
      if (d && (d.code === 0 || d.code === 200)) {
        if (d.data) return d.data
        if (d.url) return d.url
      }
      throw new Error('lxmusic88: 无数据')
    },
  },
  {
    name: 'FishAPI',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': 128, '320k': 320, flac: 740, flac24bit: 999 }
      const br = brMap[quality]
      if (!br) throw new Error('FishAPI 不支持的音质')
      const result = await fishPost({ types: 'url', id: songmid, source: 'netease', br: br }, encodeURIComponent(songmid))
      const url = result && result.url ? cleanUrl(String(result.url)) : ''
      if (url.startsWith('http')) return url
      throw new Error('FishAPI: 无数据')
    },
  },
  {
    name: 'Huibq',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**gshpnd^\\kd)jim`i_`m)^jh*pmg*rt*') + songmid + '/' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Request-Key': 'share-v3' },
      })
      const d = res.body
      if (d && d.code === 0) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('Huibq: 无数据')
    },
  },
  {
    name: '聚合API',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*rt'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ musicInfo: { songmid }, type: quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('聚合API: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=wy&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY },
      })
      const d = res.body
      if (d && d.code === 200) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: '残像 WY', fetch: async (songmid, quality) => {
      const info = { songId: songmid, songName: '', singer: '' }
      return getCanxiang(songmid, quality, info)
    }
  }, { name: 'FFAPI', fetch: getFFAPI },
]

const KW_BACKENDS = [

  {
    name: '星海主后端',
    fetch: async (songmid, quality, musicInfo) => {
      const name = musicInfo?.name || ''
      const singer = musicInfo?.singer || ''
      const interval = musicInfo?.interval || ''
      const albumName = musicInfo?.albumName || musicInfo?.album || ''
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8fr!i\\h`8') + encodeURIComponent(name) + '&singer=' + encodeURIComponent(singer) + '&songmid=' + encodeURIComponent(songmid) + '&interval=' + encodeURIComponent(interval) + '&albumName=' + encodeURIComponent(albumName) + '&quality=' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '星海备后端',
    fetch: async (songmid, quality, musicInfo) => {
      const name = musicInfo?.name || ''
      const singer = musicInfo?.singer || ''
      const interval = musicInfo?.interval || ''
      const albumName = musicInfo?.albumName || musicInfo?.album || ''
      const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8fr!i\\h`8') + encodeURIComponent(name) + '&singer=' + encodeURIComponent(singer) + '&songmid=' + encodeURIComponent(songmid) + '&interval=' + encodeURIComponent(interval) + '&albumName=' + encodeURIComponent(albumName) + '&quality=' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海备后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '笒鬼鬼',
    fetch: async (songmid, quality) => {
      const level = KW_LEVEL_MAP[quality] || '128k'
      const res = await httpFetch(_u('cookn5**\\kd)^`ibpdbpd)^i*\\kd*fprj*hpnd^Zq,)kck:d_8') + songmid + '&type=song&format=json&level=' + level, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['data', 'url'], ['url']])
      if (url) return url
      throw new Error('笒鬼鬼: 无数据')
    },
  },
  {
    name: '酷我流媒体',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KW_STREAM_LEVEL_MAP[quality] || 'master'
      const songIdTmp = musicInfo?.songmid || musicInfo?.id || musicInfo?.hash || musicInfo?.songId || musicInfo?.musicId || songmid
      if (!songIdTmp) throw new Error('酷我流媒体: 找不到歌曲ID')
      const songId = String(songIdTmp).trim()
      return _u('cook5**,20)-2),11)-.1534-3*frnom`\\h:d_8') + encodeURIComponent(songId) + '&level=' + level + '&stream=1'
    },
  },
  {
    name: '聚合API',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*fr'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ musicInfo: { songmid }, type: quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('聚合API: 无数据')
    },
  },
  {
    name: '妖狐',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*frqdk:d_8') + songmid + '&level=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('妖狐: 无数据')
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const level = qualityToLevel(quality)
      const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*fr)kck:d_8') + songmid + '&level=' + level + '&type=mp3', {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d && d.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: '酷我官方',
    fetch: async (songmid, quality, musicInfo) => {
      const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' }
      const br = brMap[quality]
      if (!br) throw new Error('酷我官方 不支持的音质')
      let rid = musicInfo?.rid || ''
      if (!rid && musicInfo?.musicrid) rid = String(musicInfo.musicrid).replace(/^MUSIC_/, '')
      if (!rid) rid = songmid
      const res = await httpFetch(_u('cookn5**hj]d)fprj)^i*hj]d)n:a8r`]!md_8') + rid + '&br=' + br + '&source=jiakong&type=convert_url_with_sign&surl=1', {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36' },
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.surl) return d.data.surl
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('酷我官方: 无数据')
    },
  },
  {
    name: '酷我手机版',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' }
      const br = brMap[quality]
      if (!br) throw new Error('酷我手机版 不支持的音质')
      const res = await httpFetch(_u('cookn5**ihj]d)fprj)^i*hj]d)n:a8r`]!pn`m8+!njpm^`8frkg\\t`mc_Z\\mZ/).)+)3Zod\\i]\\jZO,<Zldmpd)\\kf!otk`8^jiq`moZpmgZrdocZndbi!md_8') + songmid + '&br=' + br, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36' },
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      if (d && d.code === 200 && d.data && d.data.surl) return d.data.surl
      throw new Error('酷我手机版: 无数据')
    },
  },
  {
    name: '酷我车机版',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' }
      const br = brMap[quality]
      if (!br) throw new Error('酷我车机版 不支持的音质')
      const res = await httpFetch(_u('cookn5**hj]d)fprj)^i*hj]d)n:a8r`]!pn`m8+!njpm^`8frkg\\t`m^\\mZ\\mZ1)+)+)4Z=Zed\\fjibZqc)\\kf!otk`8^jiq`moZpmgZrdocZndbi!]m8') + br + '&sig=0&rid=' + songmid, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36' },
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      if (d && d.code === 200 && d.data && d.data.surl) return d.data.surl
      throw new Error('酷我车机版: 无数据')
    },
  },
  {
    name: '聆澜',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**njpm^`)ncdld\\ied\\ib)^i*\\kd*hpnd^*pmg:njpm^`8fr!njibD_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      if (d && d.data && d.data.url) return d.data.url
      throw new Error('聆澜: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=kw&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY },
      })
      const d = res.body
      if (d && d.code === 200) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('HYWmusic: 无数据')
    },
  },
  {
    name: '溯音酷我',
    fetch: async (songmid, quality, musicInfo) => {
      const brMap = { '128k': '7', '192k': '5', '320k': '5', flac: '1', flac24bit: '1' }
      const br = brMap[quality] || '7'
      const name = musicInfo?.name || ''
      const singer = musicInfo?.singer || ''
      const keyword = name + (singer ? ' ' + singer : '')
      if (!keyword) throw new Error('溯音酷我: 缺少歌曲名')
      const res = await httpFetch(_u('cookn5**jd\\kd)i`o*\\kd*Fprj:hnb8') + encodeURIComponent(keyword) + '&n=1&br=' + br, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.data && d.data.url) return d.data.url
      if (d && d.url) return d.url
      throw new Error('溯音酷我: 无数据')
    },
  },
  {
    name: 'HelloWorld',
    fetch: async (songmid, quality, musicInfo) => {
      const songId = musicInfo?.rid || musicInfo?.hash || musicInfo?.songmid || musicInfo?.id || songmid
      if (!songId) throw new Error('HelloWorld: 找不到歌曲ID')
      const requestPath = '/lxmusicv4/url/kw/' + songId + '/' + quality
      const sign = helloWorldSign(requestPath)
      const url = HELLO_WORLD_API_URL + requestPath + '?sign=' + sign
      const res = await httpFetch(url, {
        method: 'GET', timeout: 10000,
        headers: {
          'accept': 'application/json',
          'x-request-key': HELLO_WORLD_API_KEY,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })
      const d = res.body
      if (d && (d.code === 0 || d.code === 200)) {
        const musicUrl = d.data || d.url
        if (musicUrl) return musicUrl
      }
      throw new Error('HelloWorld: ' + (d?.msg || '无数据'))
    },
  },
  { name: 'yunmge酷我', fetch: getYunmgeKw },
  { name: '星海酷我', fetch: getXinghaiKw }, { name: 'FFAPI', fetch: getFFAPI },
]

const KG_BACKENDS = [

  {
    name: '星海主后端',
    fetch: async (songmid, quality, musicInfo) => {
      const hash = musicInfo?.hash || (musicInfo?._types?.[quality]?.hash) || songmid
      const albumId = musicInfo?.albumId || ''
      const mainHash = hash
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8fb!lp\\gdot8') + quality + '&songmid=' + (musicInfo?.songmid || songmid) + '&albumId=' + albumId + '&mainHash=' + mainHash + '&hash=' + hash, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '星海备后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8fb!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海备后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '聚合API',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*fb'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ musicInfo: { songmid }, type: quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('聚合API: 无数据')
    },
  },
  {
    name: '长青海棠',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const hash = musicInfo?.hash || musicInfo?.songmid || songmid
      const res = await httpFetch(_u('cookn5**hpnd^n`mq`m)c\\do\\ibr)^^*q,*hpnd^*m`njgq`(pmg'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ source: 'kg', rid: hash, level: level }),
      })
      const d = res.body
      if (d && d.code === 0 && d.data && d.data.url) return d.data.url
      throw new Error('长青海棠: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '长青SVIP直链',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const hash = musicInfo?.hash || musicInfo?.songmid || songmid
      const url = _u('cookn5**hpnd^)c\\do\\ibr)^^*fbll,*fb)kck:otk`8hk.!d_8') + hash + '&level=' + level
      const res = await httpFetch(url, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d && d.url) return d.url
      throw new Error('长青SVIP直链: 无数据')
    },
  },
  {
    name: '长青POST',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const hash = musicInfo?.hash || songmid
      const res = await httpFetch(_u('cook5**,20)-2),11)-.1*fbll,*fb)kck'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ source: 'kg', id: hash, level: level }),
      })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d && d.url) return d.url
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('长青POST: 无数据')
    },
  },
  {
    name: 'HelloWorld',
    fetch: async (songmid, quality, musicInfo) => {
      const songId = musicInfo?.hash || musicInfo?.songmid || musicInfo?.id || songmid
      if (!songId) throw new Error('HelloWorld: 找不到歌曲ID')
      const requestPath = '/lxmusicv4/url/kg/' + songId + '/' + quality
      const sign = helloWorldSign(requestPath)
      const url = HELLO_WORLD_API_URL + requestPath + '?sign=' + sign
      const res = await httpFetch(url, {
        method: 'GET', timeout: 10000,
        headers: {
          'accept': 'application/json',
          'x-request-key': HELLO_WORLD_API_KEY,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })
      const d = res.body
      if (d && (d.code === 0 || d.code === 200)) {
        const musicUrl = d.data || d.url
        if (musicUrl) return musicUrl
      }
      throw new Error('HelloWorld: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '妖狐',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*fbqdk:d_8') + songmid + '&level=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('妖狐: 无数据')
    },
  },
  {
    name: '念心KG',
    fetch: async (songmid, quality) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*fb)kck:d_8') + songmid + '&level=' + level + '&type=mp3', {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      throw new Error('念心KG: 无数据')
    },
  },
  {
    name: 'ChKsZ',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)^cfnu)ojk*\\kd'), {
        method: 'POST', timeout: 8000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ source: 'kg', songmid, quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('ChKsZ: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '海棠API',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const hash = musicInfo?.hash || (musicInfo?._types?.[quality]?.hash) || songmid
      const res = await httpFetch(_u('cookn5**hpnd^\\kd)c\\do\\ibr)i`o*fbll*fb)kck:otk`8enji!d_8') + hash + '&level=' + level, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      const url = extractUrl(d, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('海棠API: 无数据')
    },
  },
  {
    name: '酷狗官方',
    fetch: async (songmid, quality, musicInfo) => {
      const hash = musicInfo?.hash || songmid
      const albumId = musicInfo?.albumId || ''
      const res = await httpFetch(_u('cookn5**rrr\\kd)fpbjp)^jh*tt*di_`s)kck:m8kg\\t*b`o_\\o\\!c\\nc8') + hash + '&platid=4&album_id=' + albumId + '&mid=00000000000000000000000000000000', {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Referer: _u('cookn5**rrr)fpbjp)^jh*') },
      })
      const d = res.body
      if (d && d.status === 1 && d.data && d.data.play_backup_url) return d.data.play_backup_url
      if (d && d.status === 1 && d.data && d.data.play_url) return d.data.play_url
      throw new Error('酷狗官方: 无数据')
    },
  },
  {
    name: '聆澜',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**njpm^`)ncdld\\ied\\ib)^i*\\kd*hpnd^*pmg:njpm^`8fb!njibD_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      if (d && d.data && d.data.url) return d.data.url
      throw new Error('聆澜: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=kg&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY },
      })
      const d = res.body
      if (d && d.code === 200) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: '星海酷狗', fetch: getXinghaiKg },
  { name: '念心酷狗', fetch: getNianxinKg }, { name: 'FFAPI', fetch: getFFAPI },
]

const MG_BACKENDS = [

  {
    name: '星海主后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8hdbp!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '星海备后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8hdbp!njibhd_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      throw new Error('星海备后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '聚合API',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*hb'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({ musicInfo: { songmid }, type: quality }),
      })
      const d = res.body
      if (d && d.code === 200 && d.data && d.data.url) return d.data.url
      throw new Error('聚合API: 无数据')
    },
  },
  {
    name: 'Migu直接源',
    fetch: async (songmid, quality) => {
      const level = qualityToLevel(quality)
      const res = await httpFetch(_u('cookn5**hpnd^)hdbp)^i*q.*\\kd*hpnd^*\\p_djKg\\t`m*b`oKg\\tDiaj:^jktmdbcoD_8') + encodeURIComponent(String(songmid)) + '&level=' + level, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', Referer: _u('cookn5**hpnd^)hdbp)^i*') },
      })
      const d = res.body
      if (d && d.data && d.data.playUrl) return d.data.playUrl
      if (d && d.url) return d.url
      if (d && d.playUrl) return d.playUrl
      throw new Error('Migu直接源: 无数据')
    },
  },
  {
    name: 'Migu API',
    fetch: async (songmid, quality) => {
      const levelMap = { '128k': 'PQ', '320k': 'HQ', flac: 'SQ', flac24bit: 'ZQ' }
      const level = levelMap[quality] || 'HQ'
      const res = await httpFetch(_u('cookn5**\\kk)^)ia)hdbp)^i*HDBPH-)+*nom\\o`bt*gdno`i(pmg*q-)-:^jktmdbcoD_8') + encodeURIComponent(String(songmid)) + '&quality=' + level, {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36', Referer: _u('cookn5**\\kk)^)ia)hdbp)^i*') },
      })
      const d = res.body
      if (d && d.data && d.data.url) return d.data.url
      if (d && d.url) return d.url
      if (d && d.data && d.data.playUrl) return d.data.playUrl
      throw new Error('Migu API: 无数据')
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const level = qualityToLevel(quality)
      const res = await httpFetch(_u('cook5**hpnd^)isdisu)^jh*hb)kck:d_8') + encodeURIComponent(String(songmid)) + '&level=' + level + '&type=mp3', {
        method: 'GET', timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d && d.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: '聆澜',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**njpm^`)ncdld\\ied\\ib)^i*\\kd*hpnd^*pmg:njpm^`8hb!njibD_8') + songmid + '&quality=' + quality, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      })
      const d = res.body
      if (d && d.code === 200 && d.url) return d.url
      if (d && d.data && d.data.url) return d.data.url
      throw new Error('聆澜: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=mg&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, {
        method: 'GET', timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY },
      })
      const d = res.body
      if (d && d.code === 200) {
        if (d.url) return d.url
        if (d.data && d.data.url) return d.data.url
      }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: '星海咪咕', fetch: getXinghaiMg }, { name: 'FFAPI', fetch: getFFAPI },
]

const handleGetMusicUrl = async (source, musicInfo, quality) => {
  const songId = musicInfo.hash ?? musicInfo.songmid ?? musicInfo.id
  if (!songId) throw new Error('无法获取歌曲ID')

  const supported = MUSIC_QUALITY[source] || ['128k']
  const targetQuality = supported.includes(quality) ? quality : (supported[supported.length - 1] || '128k')

  const cacheKey = buildCacheKey(source, songId, targetQuality)
  const cached = getCachedUrl(cacheKey)
  if (cached) {
    console.log(`[星澜] 缓存命中: ${source} ${songId} ${targetQuality}`)
    return cached
  }

  const backends = {
    tx: TX_BACKENDS,
    wy: WY_BACKENDS,
    kw: KW_BACKENDS,
    kg: KG_BACKENDS,
    mg: MG_BACKENDS,
  }[source]

  if (!backends) throw new Error('未知音源: ' + source)

  const errors = []
  const total = backends.length

  const firstTier = backends.slice(0, 3)
  try {
    const result = await Promise.any(firstTier.map(async (backend) => {
      const url = await backend.fetch(songId, targetQuality, musicInfo)
      if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
        return url
      }
      throw new Error(`${backend.name} 返回无效URL`)
    }))
    setCachedUrl(cacheKey, result)
    return result
  } catch (err) {
    if (err.errors) {
      err.errors.forEach(e => errors.push(e.message || e))
    } else {
      errors.push(err.message)
    }
  }

  for (const backend of backends.slice(3)) {
    try {
      const url = await backend.fetch(songId, targetQuality, musicInfo)
      if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
        setCachedUrl(cacheKey, url)
        return url
      }
      errors.push(`${backend.name}: 返回无效URL`)
    } catch (e) {
      errors.push(`${backend.name}: ${e.message}`)
    }
  }

  throw new Error(`所有后端均失败（共 ${total} 个）\n${errors.join('\n')}`)
}

on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl':
      return handleGetMusicUrl(source, info.musicInfo, info.type)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    default:
      return Promise.reject('action not support: ' + action)
  }
})

const musicSources = {}
MUSIC_SOURCE.forEach((item) => {
  const nameMap = {
    tx: 'QQ音乐',
    wy: '网易云音乐',
    kw: '酷我音乐',
    kg: '酷狗音乐',
    mg: '咪咕音乐',
  }
  musicSources[item] = {
    name: nameMap[item] || item,
    type: 'music',
    actions: ['musicUrl'],
    qualitys: MUSIC_QUALITY[item],
  }
})

send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: false,
  sources: musicSources,
})

console.log('[星澜] v3.1.2 聚合音源已加载完成')
console.log('[星澜] 平台: ' + MUSIC_SOURCE.join(', '))
console.log('[星澜] QQ后端数: ' + TX_BACKENDS.length + ' | 网易: ' + WY_BACKENDS.length + ' | 酷我: ' + KW_BACKENDS.length + ' | 酷狗: ' + KG_BACKENDS.length + ' | 咪咕: ' + MG_BACKENDS.length)
console.log('[星澜] 缓存已启用，TTL: ' + (CACHE_TTL_MS / 3600000) + ' 小时')
console.log('[星澜] 保留核心后端: QQ越权, ygking, 残像WY, 星海聚合, yunmge, 念心')

  })

  // [06] 星海音乐源 | A9-xinghai-music-sourcev2.3.15.js
  __load(5, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send, env } = globalThis.lx;

const KW_DECRYPT_PROXY = {
    url: '',
    allowEncryptedLossless: false,
    urlParamName: 'url',
    ekeyParamName: 'ekey',
};

const CHKSZ_CONFIG = {
    apikey: '',
    enableNetease: true,
    enableQQ: true,
};

const KW_LOCAL_CONFIG = {
    enabled: true,
    strictHighEnd: true,
    fallbackToBackend: true,
};

const URL_CONFIG = {
    domains: {
        primary: 'yy.zddyr.top',
        fallback: 'zrcdy.dpdns.org',
        gdStudio: 'music-api.gdstudio.xyz',
        chkszNew: 'api.chksz.com'
    },
    paths: {
        backend: '/lx/api/',
        version: '/lx/versionh2.php',
        update: '/lx/vers.php',
        ip: '/ip.php',
        gdApi: '/api.php',
        chkszNetease: '/api/163_music',
        chkszQQ: '/api/qq_music'
    },
    gdParams: 'use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light'
};

const buildUrl = (domainKey, pathKey, extraQuery = '') => {
    const domain = URL_CONFIG.domains[domainKey];
    const path = URL_CONFIG.paths[pathKey];
    if (!domain || !path) throw new Error(`URL配置错误: ${domainKey} / ${pathKey}`);
    let url = `https://${domain}${path}`;
    if (extraQuery) {
        if (extraQuery.startsWith('&') && !path.includes('?')) {
            url += '?' + extraQuery.substring(1);
        } else {
            url += extraQuery;
        }
    }
    return url;
};

const SCRIPT_VERSION = 'v3.2.15';
const SCRIPT_NAME = 'XingHaiMusicSource';
const SOURCE_MAP = { tx: 'qq', mg: 'migu', kw: 'kw', kg: 'kg', qs: 'qs' };
const PLATFORM_NAMES = { wy: '网易云音乐', tx: 'QQ音乐', kw: '酷我音乐', kg: '酷狗音乐', mg: '咪咕音乐', qs: '汽水音乐' };
const MUSIC_QUALITIES = {
    wy: ['128k','320k','flac','hires','atmos','master'],
    tx: ['128k','192k','320k','flac','hires','atmos','atmos_plus','master'],
    kw: ['128k','320k','flac','hires','atmos','master'],
    kg: ['128k','320k','flac','hires','atmos','master'],
    mg: ['128k','320k','flac'],
    qs: ['128k','320k','flac','spatial','hires']
};

const CHKSZ_NETEASE_LEVEL_MAP = {
    '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless',
    'hires': 'hires', 'atmos': 'jymaster', 'master': 'jymaster'
};

const CHKSZ_QQ_SIZE_MAP = {
    '128k': '128k', '192k': '320k', '320k': '320k',
    'flac': 'flac', 'hires': 'hires',
    'atmos': 'master', 'atmos_plus': 'master', 'master': 'master'
};

const GD_BR_MAP = { '128k':'128', '320k':'320', 'flac':'740', 'hires':'999' };
const GD_SUPPORTED_QUALITIES = new Set(['128k','320k','flac','hires']);

const TOKEN_TTL = 5 * 60 * 1000;

let userIp = null;
let userToken = '';
let tokenTimestamp = 0;
let clientHeader = '';
let deviceId = '';
let availablePlatforms = [];
let backendAggBlocked = false;
const extraCache = new Map();

const KW_UA_MOBI = 'okhttp/3.10.0';
const KW_UA_WEB = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
const KW_TIMEOUT = 15000;

const KW_QUALITIES = {
    '128k':  { br: '128kmp3',    format: 'mp3',   desc: '标准 128k',      min_kbps: 96,   max_kbps: 192,  target_kbps: 128 },
    '192k':  { br: '192kmp3',    format: 'mp3',   desc: '中品 192k',      min_kbps: 161,  max_kbps: 255,  target_kbps: 192 },
    '320k':  { br: '320kmp3',    format: 'mp3',   desc: '高品 320k',      min_kbps: 256,  max_kbps: 360,  target_kbps: 320 },
    'flac':  { br: '2000kflac',  format: 'flac',  desc: '无损 FLAC',      min_kbps: 800,  max_kbps: 3000, target_kbps: 2000 },
    'hires': { br: '4000kflac',  format: 'flac',  desc: 'Hi-Res 母带',    min_kbps: 3000, max_kbps: 20000,target_kbps: 4000 },
    'hifi':  { br: '6000kflac',  format: 'mflac', desc: '超高音质(加密)', min_kbps: 4000, max_kbps: 20000,target_kbps: 6000 },
    'master':{ br: '4000kflac',  format: 'flac',  desc: '母带(Hi-Res)',   min_kbps: 3000, max_kbps: 20000,target_kbps: 4000 },
    'atmos': { br: '20501kzpga', format: 'mflac', desc: '臻品全景声(加密)',min_kbps: 3000,max_kbps: 23000,target_kbps: 20501 },
    'zpga':  { br: '20501kzpga', format: 'mflac', desc: '臻品全景声(加密)',min_kbps: 3000,max_kbps: 23000,target_kbps: 20501 },
    'sur':   { br: '20501kzpga', format: 'mflac', desc: '臻品全景音(加密)',min_kbps: 3000,max_kbps: 23000,target_kbps: 20501 },
    'atmos_plus': { br: '24900kszpga', format: 'mflac', desc: '臻品全景声Atmos+(加密)', min_kbps: 22000, max_kbps: 26000, target_kbps: 24900 },
    'zp':    { br: '20900kzply', format: 'mflac', desc: '臻品母带(加密mgg)', min_kbps: 3000, max_kbps: 25000, target_kbps: 20900 },
    'jymaster': { br: '28000kzlmaster', format: 'mgg', desc: '臻品母带极致(加密mgg)', min_kbps: 24000, max_kbps: 32000, target_kbps: 28000 },
};

const KW_QUALITIES_ALIAS = {
    'atmos+': 'atmos_plus', 'atmosplus': 'atmos_plus', 'atmos2': 'atmos_plus',
    'sur+': 'atmos_plus',
    'zp+': 'jymaster', 'zpplus': 'jymaster', 'zp2': 'jymaster',
};

const KW_PLUGIN_TO_LOCAL = {
    '128k': '128k', '320k': '320k', 'flac': 'flac',
    'hires': 'hires', 'atmos': 'atmos', 'master': 'master',
};

const KW_BR_CHAIN = {
    '128k':  ['128kmp3'],
    '192k':  ['192kmp3', '128kmp3'],
    '320k':  ['320kmp3', '192kmp3', '128kmp3'],
    'flac':  ['2000kflac', '320kmp3', '192kmp3'],
    'hires': ['4000kflac', '2000kflac', '320kmp3'],
    'hifi':  ['6000kflac', '4000kflac', '2000kflac', '320kmp3'],
    'atmos': ['20501kzpga', '2000kflac', '320kmp3'],
    'master':['4000kflac', '2000kflac', '320kmp3'],
    'zpga':  ['20501kzpga', '2000kflac', '320kmp3'],
    'sur':   ['20501kzpga', '2000kflac', '320kmp3'],
    'atmos_plus': ['24900kszpga', '20501kzpga', '2000kflac', '320kmp3'],
    'zp':    ['20900kzply', '2000kflac', '320kmp3'],
    'jymaster': ['28000kzlmaster', '20900kzply', '2000kflac', '320kmp3'],
};

const KW_LOSSLESS_PLUS = new Set(['flac','hires','hifi','atmos','master','zp','zpga','sur','atmos_plus','jymaster']);
const KW_LOSSLESS_FMTS = new Set(['flac','mgg','mflac']);
const KW_ENCRYPTED_FMTS = new Set(['mgg','mflac']);
const KW_HIGH_END = new Set(['hires','hifi','master','atmos','zp','zpga','sur','atmos_plus','jymaster']);

const KW_CHANNELS_PREMIUM = [
    { name: 'car_conv2', url: 'http://anymatch.kuwo.cn/mobi.s', type: 'convert_url2', source: 'kwplayercar_ar_6.0.0.9_B_jiakong_vh.apk' },
    { name: 'mobi_conv2', url: 'http://mobi.kuwo.cn/mobi.s', type: 'convert_url2', source: 'kwplayer_ar_8.5.5.0_apk_keluze.apk' },
];
const KW_CHANNELS_STABLE = [
    { name: 'mobi_with_sign', url: 'https://mobi.kuwo.cn/mobi.s', type: 'convert_url_with_sign', source: 'kwplayer_ar_8.5.5.0_apk_keluze.apk' },
    { name: 'car_sign_6005', url: 'http://nmobi.kuwo.cn/mobi.s', type: 'convert_url_with_sign', source: 'kwplayercar_ar_6.0.0.5_B_jiakong_vh.apk' },
    { name: 'car_sign_6100', url: 'http://nmobi.kuwo.cn/mobi.s', type: 'convert_url_with_sign', source: 'kwplayercar_ar_6.1.0.0_B_jiakong_vh.apk' },
];
const KW_CHANNELS_FALLBACK = [
    { name: 'sign_mobi_http', url: 'http://mobi.kuwo.cn/mobi.s', type: 'convert_url_with_sign', source: 'kwplayer_ar_8.5.5.0_apk_keluze.apk' },
];

const kwUrlCache = new Map();
const KW_CACHE_TTL = 30 * 60 * 1000;

function isBuffer(obj) {
    return obj && typeof obj === 'object' &&
        ((typeof Buffer !== 'undefined' && Buffer.isBuffer(obj)) ||
        (typeof obj.constructor === 'function' && obj.constructor.name === 'Buffer'));
}

function safeParseBody(body) {
    if (typeof body === 'string') {
        const trimmed = body.trim();
        if (/^[{["]/.test(trimmed)) { try { return JSON.parse(trimmed); } catch (e) {} }
        return body;
    }
    if (typeof body === 'object' && body !== null) {
        try { if (typeof body.toString === 'function' && body.toString() !== '[object Object]') body = body.toString('utf-8'); } catch (e) {}
        if (typeof body === 'object' && !isBuffer(body)) return body;
    }
    try {
        if (isBuffer(body)) {
            if (globalThis.lx?.utils?.buffer?.bufToString) body = globalThis.lx.utils.buffer.bufToString(body, 'utf-8');
            else if (typeof Buffer !== 'undefined') body = Buffer.from(body).toString('utf-8');
            else body = String(body);
        }
    } catch (e) {}
    if (typeof body === 'string') {
        const trimmed = body.trim();
        if (/^[{["]/.test(trimmed)) { try { return JSON.parse(trimmed); } catch (e) {} }
    }
    return body;
}

function safeBase64Encode(str) {
    try {
        if (globalThis.lx?.utils?.buffer?.from) {
            const buf = globalThis.lx.utils.buffer.from(str, 'utf-8');
            return globalThis.lx.utils.buffer.bufToString(buf, 'base64');
        }
        if (typeof Buffer !== 'undefined') return Buffer.from(str, 'utf-8').toString('base64');
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        return str;
    }
}

function simpleGetQueryParam(url, key) {
    if (typeof url !== 'string' || !url) return null;
    const qIdx = url.indexOf('?');
    if (qIdx < 0) return null;
    let query = url.substring(qIdx + 1);
    const hashIdx = query.indexOf('#');
    if (hashIdx >= 0) query = query.substring(0, hashIdx);
    const pairs = query.split('&');
    for (const p of pairs) {
        const eq = p.indexOf('=');
        if (eq < 0) continue;
        if (p.substring(0, eq) === key) {
            try { return decodeURIComponent(p.substring(eq + 1)); } catch (e) { return p.substring(eq + 1); }
        }
    }
    return null;
}

function generateDeviceId() {
    return 'lx-online-' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36).slice(-4);
}

function buildClientHeader() {
    let deviceType = 'unknown';
    try {
        const p = (env?.platform || '').toLowerCase();
        if (p.includes('android')) deviceType = 'Android';
        else if (p.includes('ios')) deviceType = 'iOS';
        else if (p.includes('win')) deviceType = 'Windows';
        else if (p.includes('mac')) deviceType = 'macOS';
        else if (p.includes('linux')) deviceType = 'Linux';
    } catch (e) {}
    return `${SCRIPT_NAME}/${SCRIPT_VERSION} (${deviceType})`;
}

function generateToken(ip) {
    if (!deviceId) deviceId = generateDeviceId();
    const payload = {
        device_id: deviceId,
        ip: ip || '0.0.0.0',
        timestamp: Math.floor(Date.now() / 1000),
        random: Math.random().toString(36).substring(2, 12)
    };
    tokenTimestamp = Date.now();
    return safeBase64Encode(JSON.stringify(payload));
}

function ensureTokenFresh() {
    if (!userToken || (Date.now() - tokenTimestamp) > TOKEN_TTL) {
        userToken = generateToken(userIp);
    }
}

const httpFetch = (url, options = {}) => new Promise((resolve, reject) => {
    if (!options.noAuth) ensureTokenFresh();
    const headers = { ...(options.headers || {}) };
    if (!options.noAuth) {
        if (userToken) headers['X-Token'] = userToken;
        if (clientHeader) headers['X-Client'] = clientHeader;
    }
    if (!headers['User-Agent']) headers['User-Agent'] = 'lx-music';
    request(url, { ...options, headers }, (err, resp) => {
        if (err) return reject(err);
        resolve({ body: safeParseBody(resp.body), statusCode: resp.statusCode, headers: resp.headers || {} });
    });
});

function mapQuality(target, avail) {
    const pm = {
        '臻品母带': 'jymaster', '臻品音质2.0': 'sky', '臻品音质AI': 'jyeffect',
        '臻品音质': 'jyeffect', 'Hires 无损24-Bit': 'hires', 'Hi-Res': 'hires',
        'FLAC': 'flac', '320k': '320k', '192k': '192k', '128k': '128k',
        '空间音频': 'spatial', 'Spatial': 'spatial'
    };
    if (avail.includes(target)) return target;
    const m = pm[target]; if (m && avail.includes(m)) return m;
    const order = ['jymaster', 'sky', 'jyeffect', 'hires', 'flac24bit', 'spatial', 'master', 'flac', '320k', '192k', '128k'];
    for (const q of order) if (avail.includes(q)) return q;
    return avail[0] || '128k';
}

function processKwEncryptedUrl(data, source) {
    if (source !== 'kw' || !KW_DECRYPT_PROXY.allowEncryptedLossless) {
        return data?.url || '';
    }
    let ekey = null;
    if (data?.ekey) {
        ekey = typeof data.ekey === 'string' ? data.ekey.trim() : String(data.ekey).trim();
    }
    if (!ekey && data?.url && typeof data.url === 'string') {
        ekey = simpleGetQueryParam(data.url, 'ekey');
    }
    if (!ekey || !KW_DECRYPT_PROXY.url) {
        return data?.url || '';
    }
    const rawUrl = typeof data.url === 'string' ? data.url : String(data.url);
    try {
        return `${KW_DECRYPT_PROXY.url}?${KW_DECRYPT_PROXY.urlParamName}=${encodeURIComponent(rawUrl)}&${KW_DECRYPT_PROXY.ekeyParamName}=${encodeURIComponent(ekey)}`;
    } catch (e) {
        return rawUrl;
    }
}

function kwResolveQuality(q) {
    if (!q) return q;
    q = String(q).trim().toLowerCase();
    if (KW_QUALITIES_ALIAS[q]) return KW_QUALITIES_ALIAS[q];
    if (KW_QUALITIES[q]) return q;
    const raw = q.replace(/\+/g, 'plus').replace(/[-_]/g, '');
    for (const k of Object.keys(KW_QUALITIES_ALIAS)) {
        const kk = k.replace(/\+/g, 'plus').replace(/[-_]/g, '');
        if (kk === raw) return KW_QUALITIES_ALIAS[k];
    }
    return q;
}

function kwNormalizeFmt(fmt) {
    fmt = String(fmt || '').toLowerCase().trim();
    fmt = fmt.replace(/^\d+k/, '');
    return fmt;
}

function kwExtractEkeyFromUrl(url) {
    const result = {};
    if (!url) return result;
    try {
        const qIdx = url.indexOf('?');
        if (qIdx < 0) return result;
        const query = url.substring(qIdx + 1).split('#')[0];
        const pairs = query.split('&');
        for (const p of pairs) {
            const eq = p.indexOf('=');
            if (eq < 0) continue;
            const k = p.substring(0, eq);
            const v = decodeURIComponent(p.substring(eq + 1));
            if (['ekey','album_id','encrypt','sign','key'].includes(k) && v.length > 3) {
                result[k] = v;
            }
        }
    } catch (e) {}
    return result;
}

function kwExtractEkeyDeep(data, depth = 0, maxDepth = 5) {
    const found = {};
    if (depth > maxDepth || data == null) return found;
    const EKEY_KEYS = ['ekey','album_id','albumid','secret','seckey','decrypt_key','decryptkey','mkey','music_key','k','key'];
    if (typeof data === 'object' && !Array.isArray(data)) {
        for (const [k, v] of Object.entries(data)) {
            const lk = String(k).toLowerCase();
            if (EKEY_KEYS.includes(lk) && typeof v === 'string' && v.length >= 8) {
                found[lk] = v;
            }
            if (typeof v === 'string' && v.length >= 16 && v.length <= 512 && ['data','info','extra','msg','message','result'].includes(lk)) {
                try {
                    const sub = JSON.parse(v);
                    Object.assign(found, kwExtractEkeyDeep(sub, depth + 1, maxDepth));
                } catch (e) {}
            }
            if (typeof v === 'object' && v !== null) {
                Object.assign(found, kwExtractEkeyDeep(v, depth + 1, maxDepth));
            }
        }
    } else if (Array.isArray(data)) {
        for (const item of data) {
            Object.assign(found, kwExtractEkeyDeep(item, depth + 1, maxDepth));
        }
    }
    return found;
}

function kwParseBrEntry(brStr, defaultFmt) {
    brStr = String(brStr);
    const kIdx = brStr.toLowerCase().lastIndexOf('k');
    if (kIdx < 0) return { br: brStr, format: defaultFmt };
    let fmt = brStr.substring(kIdx + 1);
    if (!fmt) return { br: brStr, format: defaultFmt };
    const fmtL = fmt.toLowerCase();
    if (['zply','mgg'].includes(fmtL)) fmt = 'mgg';
    else if (['zpga','szpga','mflac','zlmaster'].includes(fmtL)) fmt = 'mflac';
    else if (fmtL === 'flac') fmt = 'flac';
    else if (fmtL === 'mp3') fmt = 'mp3';
    return { br: brStr, format: fmt };
}

const kwHttpFetch = (url, options = {}) => new Promise((resolve, reject) => {
    const headers = { 'User-Agent': KW_UA_MOBI, ...(options.headers || {}) };
    request(url, { ...options, headers, timeout: options.timeout || KW_TIMEOUT }, (err, resp) => {
        if (err) return reject(err);
        resolve({ body: safeParseBody(resp.body), statusCode: resp.statusCode, headers: resp.headers || {}, rawBody: resp.body });
    });
});

async function kwTryChannel(ch, rid, qCfg) {
    let info = null;
    let rawResp = null;

    if (ch.type === 'convert_url_with_sign') {
        const params = new URLSearchParams();
        params.set('user', '0');
        params.set('source', ch.source);
        params.set('type', ch.type);
        params.set('br', qCfg.br);
        params.set('format', qCfg.format);
        params.set('sig', '0');
        params.set('rid', rid);
        params.set('network', 'WIFI');
        params.set('f', 'web');
        const url = `${ch.url}?${params.toString()}`;
        const resp = await kwHttpFetch(url);
        const d = resp.body;
        if (d && d.code === 200 && d.data && d.data.url) {
            info = {
                br: d.data.bitrate,
                format: d.data.format,
                url: d.data.url,
                ekey: d.data.ekey || '',
            };
            rawResp = d;
        }
    } else if (ch.type === 'convert_url2') {
        const params = new URLSearchParams();
        params.set('user', '0');
        params.set('source', ch.source);
        params.set('type', ch.type);
        params.set('br', qCfg.br);
        params.set('format', qCfg.format);
        params.set('rid', rid);
        params.set('network', 'WIFI');
        params.set('f', 'web');
        params.set('mode', 'download');
        const url = `${ch.url}?${params.toString()}`;
        const resp = await kwHttpFetch(url);
        const text = typeof resp.body === 'string' ? resp.body : String(resp.body || '');
        const d = {};
        for (const line of text.split(/\r?\n/)) {
            const eq = line.indexOf('=');
            if (eq > 0) d[line.substring(0, eq).trim()] = line.substring(eq + 1).trim();
        }
        if (d.url && !d.url.startsWith('None')) {
            info = {
                br: d.bitrate,
                format: d.format,
                url: d.url,
                ekey: d.ekey || '',
            };
            rawResp = d;
        }
    }

    if (!info) return null;

    let ekeyFinal = info.ekey || '';
    if (!ekeyFinal) {
        const urlEk = kwExtractEkeyFromUrl(info.url);
        if (urlEk.ekey) ekeyFinal = urlEk.ekey;
    }
    if (!ekeyFinal && rawResp) {
        const extraEk = kwExtractEkeyDeep(rawResp);
        if (extraEk.ekey) ekeyFinal = extraEk.ekey;
        else if (extraEk.album_id) ekeyFinal = extraEk.album_id;
    }
    info.ekey = ekeyFinal;
    return info;
}

async function kwGetContentLength(url) {
    try {
        const resp = await kwHttpFetch(url, { method: 'HEAD', timeout: 8000 });
        const cl = resp.headers['Content-Length'] || resp.headers['content-length'];
        if (cl) return parseInt(cl, 10);
    } catch (e) {}
    return null;
}

async function kwGetExtra(rid) {
    const result = {
        lrc: '', lrc_line: [], album: '', album_id: '',
        artist: '', song_name: '', album_pic: '', artist_pic: '',
    };
    if (!rid) return result;

    const ridS = String(rid);
    const h5Url = `http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${ridS}&httpsStatus=1`;

    try {
        const resp = await kwHttpFetch(h5Url, { headers: { 'User-Agent': KW_UA_WEB }, timeout: 8000 });
        const d = resp.body;
        const data = d && d.data ? d.data : {};
        const songinfo = data.songinfo || {};
        const lrclist = data.lrclist || [];

        if (songinfo) {
            result.album = String(songinfo.album || '');
            result.album_id = String(songinfo.albumId || '');
            result.artist = String(songinfo.artist || '');
            result.song_name = String(songinfo.songName || '');
        }

        if (Array.isArray(lrclist) && lrclist.length) {
            result.lrc_line = lrclist;
            const lines = [];
            for (const row of lrclist) {
                if (typeof row !== 'object') continue;
                const tm = parseFloat(row.time || '0') || 0;
                const mm = Math.floor(tm / 60);
                const ss = tm - mm * 60;
                const lyric = row.lineLyric || row.lyric || '';
                lines.push(`[${String(mm).padStart(2,'0')}:${ss.toFixed(2).padStart(5,'0')}]${lyric}`);
            }
            result.lrc = lines.join('\n');
        }

        const picRaw = String(songinfo.pic || '').trim();
        if (picRaw) {
            let u = picRaw;
            if (u.startsWith('//')) u = 'https:' + u;
            if (!u.startsWith('http')) u = 'https://img1.kwcdn.kuwo.cn' + (u.startsWith('/') ? '' : '/') + u;
            result.album_pic = u;
        }

        const artistId = String(songinfo.artistId || '0');
        if (artistId && artistId !== '0') {
            const a = artistId.length >= 2 ? artistId[artistId.length - 2] : '0';
            const b = artistId.length >= 1 ? artistId[artistId.length - 1] : '0';
            result.artist_pic = `https://img1.kwcdn.kuwo.cn/star/starheads/500/${a}/${b}/${artistId}.jpg`;
        } else if (picRaw) {
            result.artist_pic = result.album_pic;
        }
    } catch (e) {}

    return result;
}

async function kwGetUrlLocal(rid, quality, durationSec) {
    const localQ = KW_PLUGIN_TO_LOCAL[quality] || kwResolveQuality(quality);
    if (!KW_QUALITIES[localQ]) throw new Error(`酷我不支持音质: ${quality}`);

    const cacheKey = `${rid}:${localQ}`;
    const cached = kwUrlCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < KW_CACHE_TTL) {
        return cached.value;
    }

    const cfg = KW_QUALITIES[localQ];
    const isHighEnd = KW_HIGH_END.has(localQ);
    const wantLossless = KW_LOSSLESS_PLUS.has(localQ);
    const strictHighEnd = KW_LOCAL_CONFIG.strictHighEnd;

    let bestResult = null;
    let bestEkeyResult = null;
    let extraLoaded = null;

    const loadExtraOnce = async () => {
        if (extraLoaded === null) {
            try { extraLoaded = await kwGetExtra(rid); } catch (e) { extraLoaded = {}; }
        }
        return extraLoaded;
    };

    const finalize = async (resCh) => {
        if (!resCh) return null;
        const [res, chName] = resCh;
        const extra = await loadExtraOnce();
        if (extra) {
            for (const [k, v] of Object.entries(extra)) {
                if (res[k] === undefined) res[k] = v;
            }
        }
        res.channel = chName;
        kwUrlCache.set(cacheKey, { value: res, ts: Date.now() });
        return res;
    };

    let chain = KW_BR_CHAIN[localQ];
    if (!chain) {
        if (['atmos_plus','sur'].includes(localQ)) chain = KW_BR_CHAIN.zpga || [];
        else if (localQ === 'jymaster') chain = KW_BR_CHAIN.zp || [];
        else if (localQ === 'hifi') chain = KW_BR_CHAIN.hires || [];
        else chain = [cfg.br];
    }

    const stagePlan = (brIdx) => {
        if (isHighEnd && brIdx === 0) {
            return [
                ['premium', KW_CHANNELS_PREMIUM, true],
                ['stable', KW_CHANNELS_STABLE, false],
                ['fallback', KW_CHANNELS_FALLBACK, false],
            ];
        }
        return [
            ['stable', KW_CHANNELS_STABLE, false],
            ['fallback', KW_CHANNELS_FALLBACK, false],
        ];
    };

    for (let idx = 0; idx < chain.length; idx++) {
        const brEntry = chain[idx];
        const { br: brStr, format: brFmt } = kwParseBrEntry(brEntry, cfg.format);
        const qCfg = { ...cfg, br: brStr, format: brFmt };
        const baseStrict = strictHighEnd && isHighEnd && idx === 0;

        for (const [stageName, stageChannels, stageIsPremium] of stagePlan(idx)) {
            const doStrict = baseStrict && stageIsPremium;

            for (const ch of stageChannels) {
                let info;
                try {
                    info = await kwTryChannel(ch, rid, qCfg);
                } catch (e) { info = null; }
                if (!info) continue;
                if (String(info.br) === '6') continue;

                const fmt = kwNormalizeFmt(info.format);
                if (wantLossless && !KW_LOSSLESS_FMTS.has(fmt)) continue;

                const result = {
                    url: info.url, format: fmt, br: info.br,
                    br_req: brStr, ekey: info.ekey || '', stage: stageName,
                };

                if (doStrict) {
                    const wantFmt = kwNormalizeFmt(qCfg.format);
                    if (KW_ENCRYPTED_FMTS.has(wantFmt) && !KW_ENCRYPTED_FMTS.has(fmt)) {
                        if (!bestResult) bestResult = [result, ch.name];
                        continue;
                    }

                    let brVal = null;
                    try {
                        const brRaw = info.br;
                        if (typeof brRaw === 'string' && brRaw.toLowerCase().endsWith('k')) {
                            brVal = parseFloat(brRaw.slice(0, -1));
                        } else if (brRaw != null) {
                            brVal = parseFloat(String(brRaw).replace(/[kK]/g, ''));
                        }
                    } catch (e) {}
                    if (brVal != null && brVal < (qCfg.min_kbps || 0)) {
                        if (!bestResult) bestResult = [result, ch.name];
                        continue;
                    }

                    if (durationSec && durationSec > 0) {
                        const cl = await kwGetContentLength(info.url);
                        if (cl) {
                            result.content_length = cl;
                            const estKbps = (cl * 8) / 1000 / durationSec;
                            result.estimated_kbps_by_head = Math.round(estKbps * 10) / 10;
                            if (estKbps < (qCfg.min_kbps || 0)) {
                                if (!bestResult) bestResult = [result, ch.name];
                                continue;
                            }
                        }
                    }
                }

                if (result.ekey) {
                    if (!bestEkeyResult) {
                        bestEkeyResult = [result, ch.name];
                        if (stageIsPremium && KW_ENCRYPTED_FMTS.has(fmt)) {
                            return finalize([result, ch.name]);
                        }
                    }
                }
                if (!bestResult) bestResult = [result, ch.name];
            }
        }

        if (bestEkeyResult) return finalize(bestEkeyResult);
        if (bestResult) return finalize(bestResult);
    }

    if (bestResult) return finalize(bestResult);
    return null;
}

async function fetchIp() {
    try {
        const r = await httpFetch(buildUrl('primary', 'ip'), { timeout: 3000 });
        if (r.body?.ip) {
            userIp = r.body.ip;
            userToken = generateToken(userIp);
        }
    } catch (e) {}
}

async function getWyChkszUrl(id, quality) {
    const level = CHKSZ_NETEASE_LEVEL_MAP[quality];
    if (!level) throw new Error('chksz不支持该品质');
    const url = `https://${URL_CONFIG.domains.chkszNew}${URL_CONFIG.paths.chkszNetease}?id=${id}&level=${level}&apikey=${encodeURIComponent(CHKSZ_CONFIG.apikey)}`;
    const resp = await httpFetch(url, { headers: { 'User-Agent': 'LX-Music-Mobile' }, timeout: 8000, noAuth: true });
    if (resp.statusCode !== 200 || resp.body.code !== 200 || !resp.body.data?.url) {
        throw new Error(`chksz网易失败(${resp.statusCode}): ${resp.body?.msg || '未返回url'}`);
    }
    return { url: resp.body.data.url, lyric: null, cover: resp.body.data.picUrl || null };
}

async function getTxChkszUrl(musicInfo, quality) {
    const size = CHKSZ_QQ_SIZE_MAP[quality];
    if (!size) throw new Error('chksz不支持该品质');
    const mid = musicInfo.songmid || musicInfo.id;
    if (!mid) throw new Error('缺少QQ mid');
    const url = `https://${URL_CONFIG.domains.chkszNew}${URL_CONFIG.paths.chkszQQ}?mid=${mid}&size=${size}&type=json&apikey=${encodeURIComponent(CHKSZ_CONFIG.apikey)}`;
    const resp = await httpFetch(url, { headers: { 'User-Agent': 'LX-Music-Mobile' }, timeout: 8000, noAuth: true });
    if (resp.statusCode !== 200 || resp.body.code !== 200 || !resp.body.url) {
        throw new Error(`chksz QQ失败(${resp.statusCode}): ${resp.body?.msg || '未返回url'}`);
    }
    return { url: resp.body.url, lyric: resp.body.lrc || null, cover: resp.body.cover || null };
}

async function getWyGDUrl(id, q) {
    const br = GD_BR_MAP[q] || '320';
    const url = buildUrl('gdStudio', 'gdApi', `&${URL_CONFIG.gdParams}&types=url&source=netease&id=${id}&br=${br}`);
    let resp = await httpFetch(url, { headers: { 'User-Agent': 'LX-Music-Mobile' }, timeout: 8000, noAuth: true });
    if (q === 'hires' && (resp.statusCode !== 200 || !resp.body.url)) {
        const fallbackUrl = buildUrl('gdStudio', 'gdApi', `&${URL_CONFIG.gdParams}&types=url&source=netease&id=${id}&br=740`);
        resp = await httpFetch(fallbackUrl, { headers: { 'User-Agent': 'LX-Music-Mobile' }, timeout: 8000, noAuth: true });
    }
    if (resp.statusCode !== 200 || !resp.body.url) {
        throw new Error(`GD接口状态${resp.statusCode}，未返回音频`);
    }
    return { url: resp.body.url, lyric: null, cover: null };
}

async function getUrlFromBackend(source, musicInfo, quality) {
    const backendSource = SOURCE_MAP[source] || source;
    const baseUrl = buildUrl('primary', 'backend');
    const params = {};
    if (backendSource === 'kg') {
        const types = musicInfo._types || {};
        params.source = 'kg';
        params.quality = quality || '';
        params.songmid = musicInfo.songmid || musicInfo.id || '';
        params.albumId = musicInfo.albumId || '';
        params.mainHash = musicInfo.hash || '';
        if (types[quality]?.hash) params.hash = types[quality].hash;
    } else {
        params.source = backendSource;
        params.name = musicInfo.name || '';
        params.singer = musicInfo.singer || '';
        params.songmid = musicInfo.songmid || musicInfo.id || '';
        params.interval = musicInfo.interval || '';
        params.albumName = musicInfo.albumName || musicInfo.album || '';
        params.quality = quality || '';
    }
    const query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    const url = `${baseUrl}?${query}`;
    const resp = await httpFetch(url, { method: 'GET', timeout: 8000 });

    if (resp.statusCode === 403) {
        backendAggBlocked = true;
        throw new Error('后端聚合接口返回403，已屏蔽');
    }

    if (resp.statusCode !== 200) throw new Error(`后端接口状态${resp.statusCode}`);

    const data = resp.body;
    if (data.code !== 200) throw new Error(data.msg || '后端无可用链接');

    if (backendSource === 'qs') {
        const d = data.data || {};
        let streamUrl = d.url || '';

        if (streamUrl && d.key && !/[?&]key=/.test(streamUrl)) {
            streamUrl += (streamUrl.includes('?') ? '&' : '?') + 'key=' + encodeURIComponent(d.key);
        }

        if (!streamUrl) streamUrl = d.source_url || '';
        if (!streamUrl) throw new Error('汽水后端未返回流媒体链接');

        return {
            url: streamUrl,
            lyric: d.lyric || d.lrc || null,
            cover: d.cover || d.picture || d.album_pic || null,
        };
    }

    if (!data.url) throw new Error(data.msg || '后端无可用链接');
    const finalUrl = processKwEncryptedUrl(data, backendSource);
    return { url: finalUrl, lyric: data.lrc || null, cover: data.picture || null };
}

async function fetchMusicUrl(source, musicInfo, quality) {
    const id = musicInfo.hash ?? musicInfo.songmid ?? musicInfo.id;
    if (!id) throw new Error('缺少 songId');
    let actualQuality = mapQuality(quality, MUSIC_QUALITIES[source] || ['128k','320k','flac']);

    if (source === 'kw' && !KW_DECRYPT_PROXY.allowEncryptedLossless) {
        actualQuality = mapQuality(quality, ['128k','320k','flac']);
    }

    let result = { url: '', lyric: null, cover: null };
    let lastError = '';
    const chkszEnabled = !!(CHKSZ_CONFIG.apikey && CHKSZ_CONFIG.apikey.trim());

    if (source === 'kw') {
        if (KW_LOCAL_CONFIG.enabled) {
            try {
                const durationSec = musicInfo.interval ? parseInt(musicInfo.interval, 10) : null;
                const kwResult = await kwGetUrlLocal(id, actualQuality, durationSec);
                if (kwResult && kwResult.url) {
                    let finalUrl = kwResult.url;
                    if (KW_DECRYPT_PROXY.allowEncryptedLossless && KW_ENCRYPTED_FMTS.has(kwResult.format)) {
                        finalUrl = processKwEncryptedUrl({ url: kwResult.url, ekey: kwResult.ekey }, 'kw');
                    }
                    result = { url: finalUrl, lyric: kwResult.lrc || null, cover: kwResult.album_pic || null };
                }
            } catch (e) {
                lastError = `酷我本地直连失败: ${e.message}`;
            }
        }

        if (!result.url && KW_LOCAL_CONFIG.fallbackToBackend && !backendAggBlocked) {
            try {
                result = await getUrlFromBackend('kw', musicInfo, actualQuality);
            } catch (e) {
                lastError = `后端聚合失败: ${e.message}`;
            }
        }
    }

    else if (source === 'wy') {
        if (chkszEnabled && CHKSZ_CONFIG.enableNetease) {
            try {
                result = await getWyChkszUrl(id, actualQuality);
            } catch (e) {
                lastError = `chksz网易失败: ${e.message}`;
            }
        }

        if (!result.url && !backendAggBlocked) {
            try {
                result = await getUrlFromBackend('wy', musicInfo, actualQuality);
            } catch (e) {
                lastError = `后端聚合失败: ${e.message}`;
            }
        }

        if (!result.url && GD_SUPPORTED_QUALITIES.has(actualQuality)) {
            try {
                result = await getWyGDUrl(id, actualQuality);
            } catch (e) {
                lastError = `GD接口失败: ${e.message}`;
            }
        }
    }

    else if (source === 'tx') {
        if (chkszEnabled && CHKSZ_CONFIG.enableQQ) {
            try {
                result = await getTxChkszUrl(musicInfo, actualQuality);
            } catch (e) { lastError = `chksz QQ失败: ${e.message}`; }
        }

        if (!result.url) {
            try {
                result = await getUrlFromBackend(source, musicInfo, actualQuality);
            } catch (e) { lastError = `后端失败: ${e.message}`; }
        }
    }

    else if (source === 'qs') {
        try {
            result = await getUrlFromBackend('qs', musicInfo, actualQuality);
        } catch (e) {
            lastError = `汽水后端失败: ${e.message}`;
        }
    }

    else {
        try {
            result = await getUrlFromBackend(source, musicInfo, actualQuality);
        } catch (e) { lastError = `后端失败: ${e.message}`; }
    }

    extraCache.set(id, { lyric: result.lyric, cover: result.cover });

    const trimmedUrl = typeof result.url === 'string' ? result.url.trim() : '';
    if (typeof result.url !== 'string' || trimmedUrl.length < 1 || !trimmedUrl.match(/^https?:\/\//i)) {
        throw new Error(lastError || '获取播放链接失败');
    }

    return trimmedUrl;
}

async function checkUpdate() {
    const versionUrls = [
        buildUrl('primary', 'version') + '?ver=' + encodeURIComponent(SCRIPT_VERSION),
        buildUrl('fallback', 'version') + '?ver=' + encodeURIComponent(SCRIPT_VERSION)
    ];
    try {
        const resp = await Promise.any(versionUrls.map(u => httpFetch(u, { timeout: 5000 })));
        if (resp.statusCode === 200 && resp.body && resp.body.update_url) {
            send(EVENT_NAMES.updateAlert, {
                log: resp.body.changelog || resp.body.message || `发现新版本 ${resp.body.version || ''}`,
                updateUrl: resp.body.update_url
            });
        }
    } catch (e) {}
}

on(EVENT_NAMES.request, async ({ action, source, info }) => {
    if (!source || !MUSIC_QUALITIES[source]) throw new Error(`不支持的音乐源: ${source}`);

    if (action === 'musicUrl') {
        if (!info?.musicInfo || !info.type) throw new Error('参数不完整');
        return fetchMusicUrl(source, info.musicInfo, info.type);
    }

    const id = info?.musicInfo?.hash ?? info?.musicInfo?.songmid ?? info?.musicInfo?.id;
    const cached = extraCache.get(id);
    if (action === 'lyric') return cached?.lyric ? { lyric: cached.lyric, tlyric: '' } : null;
    if (action === 'pic') return cached?.cover || null;
    throw new Error(`不支持的操作: ${action}`);
});

(async () => {
    deviceId = generateDeviceId();
    clientHeader = buildClientHeader();
    userToken = generateToken(null);
    availablePlatforms = ['wy', 'tx', 'kg', 'kw', 'mg', 'qs'];
    const sources = {};
    availablePlatforms.forEach(p => { sources[p] = { name: PLATFORM_NAMES[p], type: 'music', actions: ['musicUrl', 'lyric', 'pic'], qualitys: MUSIC_QUALITIES[p] }; });
    send(EVENT_NAMES.inited, { openDevMode: false, status: true, sources });
    fetchIp();
    checkUpdate();
})();

  })

  // [07] 全豆要 | A9-全豆要[聚合音源]-tss-v3.0.0.js
  __load(6, function (globalThis, window, self, top, parent, lx, process) {
const CACHE_TTL = 300000,
  MAX_CACHE_SIZE = 500,
  SAFE_URL_RE = /^https?:\/\//i,
  MAIN_API_URL =
    "https://music-api.gdstudio.xyz/api.php?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light",
  BACKUP_API_URL = "https://music-dl.sayqz.com/api/",
  HUIBQ_API_URL = "https://lxmusicapi.onrender.com",
  HUIBQ_API_KEY = "share-v3",
  LINGCHUAN_API_URL = "https://lc.guoyue2010.top/api/music",
  SUYIN_QQ_API_URL = "https://oiapi.net/api/QQ_Music",
  SUYIN_QQ_API_KEY = "oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575",
  SUYIN_WY_API_URL = "https://oiapi.net/api/Music_163",
  SUYIN_KW_API_URL = "https://oiapi.net/api/Kuwo",
  SUYIN_MG_API_URL = "https://api.xcvts.cn/api/music/migu",
  CHANGQING_VIP_URL_MAP = {
    tx: "http://175.27.166.236/kgqq/qq.php?type=mp3&id={id}&level={level}",
    wy: "http://175.27.166.236/wy/wy.php?type=mp3&id={id}&level={level}",
    kw: "https://musicapi.haitangw.net/music/kw.php?type=mp3&id={id}&level={level}",
    kg: "https://music.haitangw.cc/kgqq/kg.php?type=mp3&id={id}&level={level}",
    mg: "https://music.haitangw.cc/musicapi/mg.php?type=mp3&id={id}&level={level}",
  },
  NIANXIN_VIP_URL_MAP = {
    tx: "https://music.nxinxz.com/kgqq/tx.php?id={id}&level={level}&type=mp3",
    wy: "http://music.nxinxz.com/wy.php?id={id}&level={level}&type=mp3",
    kw: "http://music.nxinxz.com/kw.php?id={id}&level={level}&type=mp3",
    kg: "https://music.nxinxz.com/kgqq/kg.php?id={id}&level={level}&type=mp3",
    mg: "http://music.nxinxz.com/mg.php?id={id}&level={level}&type=mp3",
  },
  QSVIP_SOURCE_ID = "qsvip",
  QSVIP_SOURCE_NAME = "汽水VIP",
  QSVIP_API_URL = "https://api.vsaa.cn/api/music.qishui.vip",
  QSVIP_API_FALLBACK_URL = "http://api.vsaa.cn/api/music.qishui.vip",
  QSVIP_PROXY_URL = "https://proxy.qishui.vsaa.cn/qishui/proxy",
  MUSIC_QUALITY = {
    wy: ["128k", "192k", "320k", "flac", "flac24bit"],
    tx: ["128k", "192k", "320k", "flac", "flac24bit"],
    kw: ["128k", "192k", "320k", "flac", "flac24bit"],
    kg: ["128k", "192k", "320k", "flac", "flac24bit"],
    mg: ["128k", "192k", "320k", "flac"],
  },
  MAIN_API_SOURCE_MAP = {
    wy: "netease",
    tx: "tencent",
    kw: "kuwo",
    kg: "kugou",
    mg: "migu",
  },
  MAIN_API_QUALITY_MAP = {
    "128k": "128",
    "192k": "192",
    "320k": "320",
    flac: "740",
    flac24bit: "999",
  },
  BACKUP_API_SOURCE_MAP = {
    wy: "netease",
    tx: "qq",
    kw: "kuwo",
  },
  SUYIN_QQ_BR_MAP = {
    "128k": 7,
    "320k": 5,
    flac: 4,
    hires: 3,
    atmos: 2,
    master: 1,
  },
  SUYIN_KW_QUALITY_MAP = {
    flac: 1,
    "320k": 5,
    "128k": 7,
  },
  HIGH_QUALITY_SET = new Set(["flac", "flac24bit", "hires", "master", "atmos"]),
  LOSSLESS_QUALITY_SET = new Set([
    "flac",
    "flac24bit",
    "hires",
    "master",
    "atmos",
  ]),
  cache = new Map(),
  { EVENT_NAMES, request, on, send, env, version } = globalThis.lx;

function log(...args) {
  console.log("[全豆要]", ...args);
}

function httpFetch(url, options = { method: "GET" }) {
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        timeout: 6000,
        ...options,
      },
      (err, res) => {
        if (err) return reject(new Error("请求失败: " + err.message));
        let body = res?.body;
        if (typeof body === "string") {
          const trimmed = body.trim();
          if (
            trimmed.startsWith("{") ||
            trimmed.startsWith("[") ||
            trimmed.startsWith('"')
          )
            try {
              body = JSON.parse(trimmed);
            } catch (_e) {}
        }
        resolve({
          statusCode: res?.statusCode ?? 0,
          headers: res?.headers || {},
          body: body,
        });
      },
    );
  });
}

async function sendRequest(url, params = {}) {
  const queryStr = Object.keys(params)
      .filter((key) => params[key] !== undefined && params[key] !== null)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(params[key]),
      )
      .join("&"),
    separator = url.includes("?") ? "&" : "?",
    fullUrl = "" + url + (queryStr ? separator + queryStr : ""),
    response = await httpFetch(fullUrl, {
      method: "GET",
      timeout: 5000,
    });
  if (response.statusCode >= 400)
    throw new Error("HTTP " + response.statusCode);
  return response.body;
}

function qsVipBuildQuery(params = {}) {
  const pairs = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map(
      (key) =>
        encodeURIComponent(String(key)) +
        "=" +
        encodeURIComponent(String(params[key])),
    );
  return pairs.length ? "?" + pairs.join("&") : "";
}

async function qsVipGet(url, params = {}, timeout = 15000) {
  const urls =
    url === QSVIP_API_URL ? [QSVIP_API_URL, QSVIP_API_FALLBACK_URL] : [url];
  let lastErr = null;
  for (const endpoint of urls) {
    try {
      const fullUrl = "" + endpoint + qsVipBuildQuery(params),
        response = await httpFetch(fullUrl, {
          method: "GET",
          timeout: timeout,
        });
      if (response.statusCode >= 400)
        throw new Error("HTTP " + response.statusCode);
      return response.body;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("汽水VIP请求失败");
}

async function qsVipPost(url, body = {}, timeout = 60000) {
  const response = await httpFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
    timeout: timeout,
  });
  if (response.statusCode >= 400)
    throw new Error("HTTP " + response.statusCode);
  return response.body;
}

function qsVipPickId(info) {
  return (
    info?.id ||
    info?.songmid ||
    info?.songId ||
    info?.hash ||
    info?.rid ||
    info?.mid ||
    info?.strMediaMid ||
    info?.mediaId ||
    ""
  ).toString();
}

function qsVipMapQuality(quality) {
  switch (String(quality || "").toLowerCase()) {
    case "128k":
      return "low";
    case "320k":
      return "standard";
    case "flac":
      return "lossless";
    case "flac24bit":
      return "hi_res";
    default:
      return "standard";
  }
}

function qsVipNormalizeSongItem(item) {
  const songId = item?.id || item?.vid ? String(item.id || item.vid) : "";
  return {
    id: songId,
    songmid: songId,
    hash: songId,
    name: item?.name ? String(item.name) : "未知歌曲",
    singer: item?.artists ? String(item.artists) : "未知歌手",
    albumName: item?.album ? String(item.album) : "",
    duration: item?.duration ? Math.floor(Number(item.duration) / 1000) : 0,
    pic: item?.cover || item?.pic ? String(item.cover || item.pic) : "",
    _raw: item || {},
  };
}

function qsVipExtractSong(result) {
  const data = result?.data;
  if (Array.isArray(data)) return data[0] || null;
  if (data && typeof data === "object" && data[0]) return data[0];
  return null;
}

async function qsVipSearch(keyword, page = 1, pageSize = 30) {
  if (!keyword)
    return {
      isEnd: true,
      list: [],
    };
  const result = await qsVipGet(
      QSVIP_API_URL,
      {
        act: "search",
        keywords: keyword,
        page: page,
        pagesize: pageSize,
        type: "music",
      },
      15000,
    ),
    list = Array.isArray(result?.data?.lists) ? result.data.lists : [],
    total = result?.data?.total ? Number(result.data.total) : list.length;
  return {
    isEnd: list.length < pageSize,
    list: list.map(qsVipNormalizeSongItem),
    total: total,
  };
}

async function qsVipResolveMusicUrl(musicInfo, quality) {
  const songId = qsVipPickId(musicInfo);
  if (!songId) throw new Error("汽水VIP缺少歌曲ID");
  const result = await qsVipGet(
      QSVIP_API_URL,
      {
        act: "song",
        id: songId,
        quality: qsVipMapQuality(quality),
      },
      20000,
    ),
    song = qsVipExtractSong(result);
  if (!song?.url) throw new Error("汽水VIP未返回可用URL");
  if (song.ekey) {
    const proxyResult = await qsVipPost(
      QSVIP_PROXY_URL,
      {
        url: song.url,
        key: song.ekey,
        filename: song.name || "KMusic",
        ext: song.codec_type ? String(song.codec_type) : "aac",
      },
      60000,
    );
    if (Number(proxyResult?.code) === 200 && proxyResult?.url)
      return String(proxyResult.url);
    throw new Error("汽水VIP代理解密失败");
  }
  return String(song.url);
}

async function qsVipGetLyric(musicInfo) {
  const songId = qsVipPickId(musicInfo);
  if (!songId)
    return {
      lyric: "",
    };
  const result = await qsVipGet(
      QSVIP_API_URL,
      {
        act: "song",
        id: songId,
      },
      15000,
    ),
    song = qsVipExtractSong(result);
  return {
    lyric: song?.lyric ? String(song.lyric) : "",
  };
}

async function handleQsVipRequest(action, info = {}) {
  if (action === "musicSearch" || action === "search") {
    const keyword = info?.keyword ? String(info.keyword) : "",
      page = info?.page ? Number(info.page) : 1,
      limit = info?.limit ? Number(info.limit) : 30;
    return qsVipSearch(keyword, page, limit);
  }
  if (action === "musicUrl") {
    if (!info?.musicInfo) throw new Error("请求参数不完整");
    const url = await qsVipResolveMusicUrl(info.musicInfo, info.type);
    return ensureSafeUrl(url, "汽水VIP");
  }
  if (action === "lyric") return qsVipGetLyric(info?.musicInfo || {});
  throw new Error("action not support");
}

function mapQuality(quality, supported) {
  const list = Array.isArray(supported) ? supported : ["128k"],
    q = String(quality || "128k").toLowerCase();
  if (list.includes(q)) return q;
  const hierarchy = ["flac24bit", "flac", "320k", "192k", "128k"];
  let idx = hierarchy.indexOf(q);
  if (idx < 0) idx = hierarchy.length - 1;
  for (let i = idx; i < hierarchy.length; i++) {
    if (list.includes(hierarchy[i])) return hierarchy[i];
  }
  for (let i = hierarchy.length - 1; i >= 0; i--) {
    if (list.includes(hierarchy[i])) return hierarchy[i];
  }
  return list[0] || "128k";
}

function cleanText(text) {
  if (!text) return "";
  return String(text)
    .replace(/\(\s*Live\s*\)/gi, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, "")
    .replace(/[^\w\u4e00-\u9fa5]/g, "")
    .trim()
    .toLowerCase();
}

function getSearchPriority(musicInfo) {
  const priorities = [],
    name = musicInfo?.name || "",
    album = musicInfo?.albumName || musicInfo?.album || "",
    singer = musicInfo?.singer || "";
  if (name && album) {
    const cleaned = cleanText(name + album);
    if (cleaned)
      priorities.push({
        keyword: cleaned,
        strict: true,
      });
  }
  if (name && singer) {
    const cleaned = cleanText(name + singer);
    if (cleaned)
      priorities.push({
        keyword: cleaned,
        strict: true,
      });
  }
  if (name) {
    const cleaned = cleanText(name);
    if (cleaned)
      priorities.push({
        keyword: cleaned,
        strict: false,
      });
  }
  return priorities;
}

function textLike(a, b) {
  const cleanA = cleanText(a),
    cleanB = cleanText(b);
  if (!cleanA || !cleanB) return true;
  return cleanA.includes(cleanB) || cleanB.includes(cleanA);
}

function checkKwMatch(data, musicInfo) {
  const song = data?.song || data?.data?.song || "",
    singer = data?.singer || data?.data?.singer || "",
    album = data?.album || data?.data?.album || "";
  if (!textLike(song, musicInfo?.name || "")) return false;
  if (musicInfo?.singer && singer && !textLike(singer, musicInfo.singer))
    return false;
  if (
    (musicInfo?.albumName || musicInfo?.album) &&
    album &&
    !textLike(album, musicInfo.albumName || musicInfo.album)
  )
    return false;
  return true;
}

function checkMgMatch(data, musicInfo) {
  if (!textLike(data?.title || "", musicInfo?.name || "")) return false;
  if (
    musicInfo?.singer &&
    data?.artist &&
    !textLike(data.artist, musicInfo.singer)
  )
    return false;
  if (
    (musicInfo?.albumName || musicInfo?.album) &&
    data?.album &&
    !textLike(data.album, musicInfo.albumName || musicInfo.album)
  )
    return false;
  return true;
}

function parseKwFromMessage(message) {
  if (!message) return null;
  const result = {},
    lines = String(message).split("\n");
  for (const line of lines) {
    if (line.includes("歌名："))
      result.song = line.replace("歌名：", "").trim();
    if (line.includes("歌手："))
      result.singer = line.replace("歌手：", "").trim();
    if (line.includes("专辑："))
      result.album = line.replace("专辑：", "").trim();
  }
  return result.song ? result : null;
}

function getSongId(musicInfo) {
  return musicInfo?.hash ?? musicInfo?.songmid ?? musicInfo?.id ?? null;
}

function getQqSongId(musicInfo) {
  const mid =
    musicInfo?.meta?.qq?.mid ||
    musicInfo?.meta?.mid ||
    musicInfo?.songmid ||
    (typeof musicInfo?.id === "string" && !/^\d+$/.test(musicInfo.id)
      ? musicInfo.id
      : null);
  if (mid)
    return {
      type: "mid",
      value: mid,
    };
  const songid =
    musicInfo?.meta?.qq?.songid ||
    musicInfo?.meta?.songid ||
    (typeof musicInfo?.id === "number"
      ? musicInfo.id
      : typeof musicInfo?.id === "string" && /^\d+$/.test(musicInfo.id)
        ? Number(musicInfo.id)
        : null);
  if (songid)
    return {
      type: "songid",
      value: songid,
    };
  return null;
}

function mapLegacyVipQualityLevel(quality) {
  const q = String(quality || "128k").toLowerCase();
  if (
    q === "flac" ||
    q === "flac24bit" ||
    q === "hires" ||
    q === "master" ||
    q === "atmos"
  )
    return "lossless";
  if (q === "320k" || q === "192k") return "exhigh";
  return "standard";
}

function getLegacyVipSongId(source, musicInfo) {
  if (source === "kg") {
    return (
      musicInfo?.hash ||
      musicInfo?.songmid ||
      musicInfo?.id ||
      musicInfo?.songId ||
      musicInfo?.rid ||
      null
    );
  }
  if (source === "tx") {
    const qqId = getQqSongId(musicInfo);
    if (qqId?.value) return qqId.value;
  }
  return (
    musicInfo?.songmid ||
    musicInfo?.id ||
    musicInfo?.songId ||
    musicInfo?.rid ||
    musicInfo?.hash ||
    null
  );
}

function buildLegacyVipUrl(source, quality, musicInfo, urlMap, label) {
  const template = urlMap[source];
  if (!template) throw new Error(label + "不支持该平台");
  const songId = getLegacyVipSongId(source, musicInfo);
  if (!songId) throw new Error(label + "缺少songId");
  const level = mapLegacyVipQualityLevel(quality);
  return template
    .replace("{id}", encodeURIComponent(String(songId)))
    .replace("{level}", encodeURIComponent(level));
}

function getCacheKey(source, musicInfo, quality = "") {
  const name = musicInfo?.name || "",
    singer = musicInfo?.singer || "",
    album = musicInfo?.albumName || musicInfo?.album || "";
  return source + "_" + name + "_" + singer + "_" + album + "_" + quality;
}

function getCachedUrl(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp >= CACHE_TTL)
    return (cache.delete(key), null);
  return entry.url;
}

function setCachedUrl(key, url) {
  cache.set(key, {
    url: url,
    timestamp: Date.now(),
  });
  if (cache.size > MAX_CACHE_SIZE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

function ensureSafeUrl(url, label) {
  if (!url || typeof url !== "string") throw new Error(label + " 返回空URL");
  if (!SAFE_URL_RE.test(url.trim())) throw new Error(label + " 返回不安全URL");
  return url;
}

function isObviouslyLossyUrl(url) {
  if (!url) return false;
  const lower = String(url).toLowerCase();
  if (/\.flac(?:$|[?#])/.test(lower) || /\bquflac\b/.test(lower)) return false;
  if (/\.mp3(?:$|[?#])/.test(lower)) return true;
  if (/\bqu(?:128|192|320)\b/.test(lower)) return true;
  return false;
}

function isObviouslyBelow320Url(url) {
  if (!url) return false;
  const lower = String(url).toLowerCase();
  if (/\.flac(?:$|[?#])/.test(lower) || /\bquflac\b/.test(lower)) return false;
  if (
    /\bqu320\b/.test(lower) ||
    /(?:[?&]|\b)br=320(?:[&#]|$)/.test(lower) ||
    /(?:[?&]|\b)level=exhigh(?:[&#]|$)/.test(lower)
  )
    return false;
  if (/\bqu(?:128|192)\b/.test(lower)) return true;
  if (/(?:[?&]|\b)br=(?:96|128|192)(?:[&#]|$)/.test(lower)) return true;
  if (/(?:[?&]|\b)level=standard(?:[&#]|$)/.test(lower)) return true;
  return false;
}

function buildUserAgent() {
  return "lx-music-" + (env || "desktop") + "/" + (version || "unknown");
}

async function resolveXinghai(source, songId, quality, musicInfo) {
  const apiSource = MAIN_API_SOURCE_MAP[source];
  if (!apiSource) throw new Error("星海主API不支持该平台");
  const id = songId ?? getSongId(musicInfo);
  if (!id) throw new Error("缺少songId");
  const mappedQuality = mapQuality(quality, [
      "128k",
      "192k",
      "320k",
      "flac",
      "flac24bit",
    ]),
    apiQuality = MAIN_API_QUALITY_MAP[mappedQuality];
  if (!apiQuality) throw new Error("星海主API音质映射失败");
  const url =
      MAIN_API_URL +
      "&types=url&source=" +
      apiSource +
      "&id=" +
      encodeURIComponent(id) +
      "&br=" +
      apiQuality,
    response = await httpFetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "LX-Music-Mobile",
        Accept: "application/json",
      },
    }),
    body = response.body;
  if (!body || typeof body !== "object" || !body.url)
    throw new Error(body?.msg || "星海主API未返回可用URL");
  return body.url;
}

async function resolveXinghaiBackup(source, songId, quality, musicInfo) {
  const apiSource = BACKUP_API_SOURCE_MAP[source];
  if (!apiSource) throw new Error("星海备API不支持该平台");
  const id = songId ?? getSongId(musicInfo);
  if (!id) throw new Error("缺少songId");
  const mappedQuality = mapQuality(quality, [
    "128k",
    "192k",
    "320k",
    "flac",
    "flac24bit",
  ]);
  return (
    BACKUP_API_URL +
    "?source=" +
    encodeURIComponent(apiSource) +
    "&id=" +
    encodeURIComponent(id) +
    "&type=url&br=" +
    encodeURIComponent(mappedQuality)
  );
}

async function resolveHuibq(source, songId, quality, musicInfo) {
  const hash = musicInfo?.hash ?? musicInfo?.songmid;
  if (!hash) throw new Error("Huibq缺少hash/songmid");
  const mappedQuality = mapQuality(quality, ["320k", "128k"]),
    url =
      HUIBQ_API_URL +
      "/url/" +
      source +
      "/" +
      encodeURIComponent(hash) +
      "/" +
      encodeURIComponent(mappedQuality),
    response = await httpFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": buildUserAgent(),
        "X-Request-Key": HUIBQ_API_KEY,
      },
    }),
    body = response.body;
  if (!body || typeof body !== "object" || Number.isNaN(Number(body.code)))
    throw new Error("Huibq返回无效");
  switch (Number(body.code)) {
    case 0:
      if (!body.url) throw new Error("Huibq返回空URL");
      return body.url;
    case 1:
      throw new Error("Huibq block ip");
    case 2:
      throw new Error("Huibq get music url failed");
    case 4:
      throw new Error("Huibq internal server error");
    case 5:
      throw new Error("Huibq too many requests");
    case 6:
      throw new Error("Huibq param error");
    default:
      throw new Error(body.msg || "Huibq unknown error");
  }
}

async function resolveLingchuan(source, songId, quality, musicInfo) {
  const hash = musicInfo?.hash ?? musicInfo?.songmid;
  if (!hash) throw new Error("聆川缺少hash/songmid");
  const mappedQuality = mapQuality(quality, ["320k", "128k"]),
    url =
      LINGCHUAN_API_URL +
      "/url?source=" +
      encodeURIComponent(source) +
      "&songId=" +
      encodeURIComponent(hash) +
      "&quality=" +
      encodeURIComponent(mappedQuality),
    response = await httpFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": buildUserAgent(),
      },
      follow_max: 5,
    }),
    body = response.body;
  if (!body || typeof body !== "object" || Number.isNaN(Number(body.code)))
    throw new Error("聆川返回无效");
  switch (Number(body.code)) {
    case 200:
      if (!body.url) throw new Error("聆川返回空URL");
      return body.url;
    case 403:
      throw new Error("聆川403 forbidden");
    case 429:
      throw new Error("聆川429 rate limit");
    case 500:
      throw new Error("聆川500 " + (body.message || "server error"));
    default:
      throw new Error(body.message || "聆川未知错误");
  }
}

function extractSuyinQqUrl(data) {
  if (data?.music) return data.music;
  if (data?.url) return data.url;
  if (data?.message) {
    const match = String(data.message).match(/音频链接[：:](.+?)(?:\n|$)/);
    if (match && match[1]) return match[1].trim();
  }
  throw new Error("溯音QQ未找到音频链接");
}

function mapSuyinQqQuality(quality) {
  const q = String(quality || "128k").toLowerCase();
  if (q === "flac24bit") return "hires";
  if (q === "192k") return "320k";
  if (SUYIN_QQ_BR_MAP[q]) return q;
  return "128k";
}

async function resolveSuyinQQ(musicInfo, quality) {
  const qqId = getQqSongId(musicInfo);
  if (!qqId) throw new Error("溯音QQ缺少songmid/id");
  const mappedQuality = mapSuyinQqQuality(quality),
    br = SUYIN_QQ_BR_MAP[mappedQuality] || SUYIN_QQ_BR_MAP["128k"],
    brList = [br, 4, 5, 7]
      .filter((val, idx, arr) => arr.indexOf(val) === idx && val >= br)
      .sort((a, b) => a - b);
  let lastErr = null;
  for (const currentBr of brList) {
    try {
      const params = {
        key: SUYIN_QQ_API_KEY,
        type: "json",
        br: currentBr,
        n: 1,
      };
      if (qqId.type === "mid") params.mid = qqId.value;
      else params.songid = qqId.value;
      const result = await sendRequest(SUYIN_QQ_API_URL, params);
      return extractSuyinQqUrl(result);
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error("溯音QQ全部音质尝试失败: " + (lastErr?.message || "unknown"));
}

async function resolveSuyinWY(musicInfo) {
  const songId = musicInfo?.songmid || musicInfo?.id;
  if (!songId) throw new Error("溯音163缺少songmid/id");
  const result = await sendRequest(SUYIN_WY_API_URL, {
    id: songId,
  });
  if (result?.code === 0 && result?.data) {
    const data = Array.isArray(result.data) ? result.data[0] : result.data;
    if (data?.url) return data.url;
  }
  throw new Error("溯音163获取失败");
}

async function fetchKwAudio(keyword, br, musicInfo = null) {
  const result = await sendRequest(SUYIN_KW_API_URL, {
    msg: keyword,
    n: 1,
    br: br,
  });
  if (result?.data?.url) {
    if (musicInfo && !checkKwMatch(result, musicInfo))
      throw new Error("溯音酷我歌曲信息不匹配");
    return result.data.url;
  }
  if (result?.message) {
    const match = String(result.message).match(/音乐链接[：:](\S+)/);
    if (match && match[1]) {
      if (musicInfo) {
        const parsed = parseKwFromMessage(result.message);
        if (parsed && !checkKwMatch(parsed, musicInfo))
          throw new Error("溯音酷我歌曲信息不匹配");
      }
      return match[1];
    }
  }
  throw new Error("溯音酷我未找到链接");
}

async function resolveSuyinKW(musicInfo, quality) {
  if (!musicInfo?.name) throw new Error("溯音酷我需要歌曲名");
  const cacheKey = getCacheKey("kw", musicInfo, quality),
    cached = getCachedUrl(cacheKey);
  if (cached) return cached;
  const mappedQuality = mapQuality(quality, ["flac", "320k", "128k"]),
    kwBr = SUYIN_KW_QUALITY_MAP[mappedQuality] || 1,
    priorities = getSearchPriority(musicInfo);
  let lastErr = null;
  for (const entry of priorities) {
    try {
      const audioUrl = await fetchKwAudio(
        entry.keyword,
        kwBr,
        entry.strict ? musicInfo : null,
      );
      if (audioUrl) {
        setCachedUrl(cacheKey, audioUrl);
        return audioUrl;
      }
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error("溯音酷我失败: " + (lastErr?.message || "unknown"));
}

async function resolveSuyinMG(musicInfo) {
  if (!musicInfo?.name) throw new Error("溯音咪咕需要歌曲名");
  const cacheKey = getCacheKey("mg", musicInfo),
    cached = getCachedUrl(cacheKey);
  if (cached) return cached;
  const priorities = getSearchPriority(musicInfo);
  let lastErr = null;
  for (const entry of priorities) {
    try {
      const result = await sendRequest(SUYIN_MG_API_URL, {
        gm: entry.keyword,
        n: 1,
        num: 1,
        type: "json",
      });
      if (result?.code === 200 && result?.music_url) {
        if (entry.strict && !checkMgMatch(result, musicInfo))
          throw new Error("溯音咪咕歌曲信息不匹配");
        setCachedUrl(cacheKey, result.music_url);
        return result.music_url;
      }
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error("溯音咪咕失败: " + (lastErr?.message || "unknown"));
}

async function resolveSuyin(source, songId, quality, musicInfo) {
  switch (source) {
    case "tx":
      return resolveSuyinQQ(musicInfo, quality);
    case "wy":
      return resolveSuyinWY(musicInfo);
    case "kw":
      return resolveSuyinKW(musicInfo, quality);
    case "mg":
      return resolveSuyinMG(musicInfo);
    default:
      throw new Error("溯音不支持该平台");
  }
}

async function resolveChangqingVip(source, songId, quality, musicInfo) {
  return buildLegacyVipUrl(
    source,
    quality,
    musicInfo,
    CHANGQING_VIP_URL_MAP,
    "长青SVIP",
  );
}

async function resolveNianxinVip(source, songId, quality, musicInfo) {
  return buildLegacyVipUrl(
    source,
    quality,
    musicInfo,
    NIANXIN_VIP_URL_MAP,
    "念心SVIP",
  );
}

const PROVIDERS = {
  xinghai: {
    name: "星海主",
    fn: resolveXinghai,
  },
  xinghaiBackup: {
    name: "星海备",
    fn: resolveXinghaiBackup,
  },
  huibq: {
    name: "Huibq",
    fn: resolveHuibq,
  },
  lingchuan: {
    name: "聆川",
    fn: resolveLingchuan,
  },
  suyinQQ: {
    name: "溯音QQ",
    fn: (_source, _songId, quality, musicInfo) =>
      resolveSuyin("tx", _songId, quality, musicInfo),
  },
  suyin163: {
    name: "溯音163",
    fn: (_source, _songId, quality, musicInfo) =>
      resolveSuyin("wy", _songId, quality, musicInfo),
  },
  suyinSearch: {
    name: "溯音搜索",
    fn: (_source, _songId, quality, musicInfo) =>
      resolveSuyin("kw", _songId, quality, musicInfo),
  },
  suyinMigu: {
    name: "溯音咪咕",
    fn: (_source, _songId, quality, musicInfo) =>
      resolveSuyin("mg", _songId, quality, musicInfo),
  },
  changqingVip: {
    name: "长青SVIP",
    fn: resolveChangqingVip,
  },
  nianxinVip: {
    name: "念心SVIP",
    fn: resolveNianxinVip,
  },
};

function getFallbackChain(source, isHighQuality, quality = "128k") {
  const highQualityChains = {
      wy: [
        "xinghai",
        "huibq",
        "lingchuan",
        "nianxinVip",
        "changqingVip",
        "xinghaiBackup",
        "suyin163",
      ],
      tx: [
        "xinghai",
        "huibq",
        "lingchuan",
        "nianxinVip",
        "changqingVip",
        "xinghaiBackup",
        "suyinQQ",
      ],
      kw: [
        "xinghai",
        "huibq",
        "lingchuan",
        "nianxinVip",
        "changqingVip",
        "xinghaiBackup",
        "suyinSearch",
      ],
      kg: ["xinghai", "huibq", "lingchuan", "nianxinVip", "changqingVip"],
      mg: [
        "xinghai",
        "huibq",
        "lingchuan",
        "suyinMigu",
        "nianxinVip",
        "changqingVip",
      ],
    },
    losslessChains = {
      wy: [
        "xinghai",
        "huibq",
        "lingchuan",
        "nianxinVip",
        "changqingVip",
        "suyin163",
        "xinghaiBackup",
      ],
      tx: [
        "xinghai",
        "huibq",
        "lingchuan",
        "nianxinVip",
        "changqingVip",
        "suyinQQ",
        "xinghaiBackup",
      ],
      kw: [
        "xinghai",
        "huibq",
        "lingchuan",
        "nianxinVip",
        "changqingVip",
        "xinghaiBackup",
      ],
      kg: ["nianxinVip", "changqingVip", "xinghai", "huibq", "lingchuan"],
      mg: ["xinghai", "huibq", "lingchuan", "nianxinVip", "changqingVip"],
    },
    standardChains = {
      wy: [
        "nianxinVip",
        "changqingVip",
        "xinghai",
        "huibq",
        "lingchuan",
        "suyin163",
        "xinghaiBackup",
      ],
      tx: [
        "nianxinVip",
        "changqingVip",
        "xinghai",
        "huibq",
        "lingchuan",
        "suyinQQ",
        "xinghaiBackup",
      ],
      kw: [
        "nianxinVip",
        "changqingVip",
        "xinghai",
        "huibq",
        "lingchuan",
        "suyinSearch",
        "xinghaiBackup",
      ],
      kg: ["nianxinVip", "changqingVip", "xinghai", "huibq", "lingchuan"],
      mg: [
        "nianxinVip",
        "changqingVip",
        "xinghai",
        "huibq",
        "lingchuan",
        "suyinMigu",
      ],
    };
  if (quality === "320k") {
    const chain = standardChains[source] || [];
    return chain.map((key) => PROVIDERS[key]).filter(Boolean);
  }
  const chain =
    (isHighQuality ? losslessChains : highQualityChains)[source] || [];
  return chain.map((key) => PROVIDERS[key]).filter(Boolean);
}

async function getMusicUrl(source, musicInfo, quality) {
  if (!source || typeof source !== "string" || !MUSIC_QUALITY[source])
    throw new Error("不支持的平台");
  if (!musicInfo || typeof musicInfo !== "object")
    throw new Error("缺少歌曲信息");
  const effectiveQuality = quality || "128k",
    mappedQuality = mapQuality(effectiveQuality, MUSIC_QUALITY[source]),
    songId = getSongId(musicInfo),
    isHighQuality = HIGH_QUALITY_SET.has(effectiveQuality.toLowerCase()),
    fallbackChain = getFallbackChain(source, isHighQuality, mappedQuality);
  if (!fallbackChain.length) throw new Error("未找到可用fallback链");
  const errors = [];
  for (const provider of fallbackChain) {
    try {
      log(
        "尝试 " +
          provider.name +
          " source=" +
          source +
          " quality=" +
          mappedQuality,
      );
      const rawUrl = await provider.fn(
          source,
          songId,
          mappedQuality,
          musicInfo,
        ),
        safeUrl = ensureSafeUrl(rawUrl, provider.name);
      if (mappedQuality === "320k" && isObviouslyBelow320Url(safeUrl))
        throw new Error(provider.name + " 返回疑似低于320流，继续尝试");
      if (
        LOSSLESS_QUALITY_SET.has(mappedQuality) &&
        isObviouslyLossyUrl(safeUrl)
      )
        throw new Error(provider.name + " 返回有损流，继续尝试");
      return safeUrl;
    } catch (e) {
      errors.push(provider.name + ": " + e.message);
    }
  }
  throw new Error("所有源均失败: " + errors.join("; "));
}

const musicSources = {},
  SOURCE_NAMES = {
    wy: "网易云音乐",
    tx: "QQ音乐",
    kw: "酷我音乐",
    kg: "酷狗音乐",
    mg: "咪咕音乐",
  };

Object.keys(MUSIC_QUALITY).forEach((key) => {
  musicSources[key] = {
    name: SOURCE_NAMES[key],
    type: "music",
    actions: ["musicUrl"],
    qualitys: MUSIC_QUALITY[key],
  };
});

musicSources[QSVIP_SOURCE_ID] = {
  name: QSVIP_SOURCE_NAME,
  type: "music",
  actions: ["musicSearch", "musicUrl", "lyric"],
  qualitys: ["128k", "320k", "flac", "flac24bit"],
};

on(EVENT_NAMES.request, ({ action, source, info }) => {
  if (source === QSVIP_SOURCE_ID) return handleQsVipRequest(action, info);
  if (action !== "musicUrl")
    return Promise.reject(new Error("action not support"));
  if (!info?.musicInfo) return Promise.reject(new Error("请求参数不完整"));
  return getMusicUrl(source, info.musicInfo, info.type || "128k")
    .then((url) => Promise.resolve(url))
    .catch((err) => Promise.reject(err));
});

send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: musicSources,
});

log("初始化完成，聚合音源已就绪");

  })

  // [08] 全豆要_聚合音源 | A9-全豆要[聚合音源]-tss-v4.0.js
  __load(7, function (globalThis, window, self, top, parent, lx, process) {
const CACHE_TTL_MS = 21600000;
const CACHE_MAX_SIZE = 500;
const HTTP_URL_REGEX = /^https?:\/\//i;

const XINGHAI_MAIN_API = "https://music-api.gdstudio.xyz/api.php?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light";
const XINGHAI_BACKUP_API = "https://music-dl.sayqz.com/api/";
const HUIBQ_API = "https://lxmusicapi.onrender.com";
const HUIBQ_REQUEST_KEY = "share-v3";
const LINGCHUAN_API = "https://lc.guoyue2010.top/api/music";
const SUYIN_QQ_API = "https://oiapi.net/api/QQ_Music";
const SUYIN_QQ_KEY = "oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575";
const SUYIN_163_API = "https://oiapi.net/api/Music_163";
const SUYIN_KUWO_API = "https://oiapi.net/api/Kuwo";
const SUYIN_MIGU_API = "https://api.xcvts.cn/api/music/migu";

const CHANGQING_URL_TEMPLATES = {
  tx: "http://175.27.166.236/kgqq/qq.php?type=mp3&id={id}&level={level}",
  wy: "http://175.27.166.236/wy/wy.php?type=mp3&id={id}&level={level}",
  kw: "https://musicapi.haitangw.net/music/kw.php?type=mp3&id={id}&level={level}",
  kg: "https://music.haitangw.cc/kgqq/kg.php?type=mp3&id={id}&level={level}",
  mg: "https://music.haitangw.cc/musicapi/mg.php?type=mp3&id={id}&level={level}"
};

const NIANXIN_URL_TEMPLATES = {
  tx: "https://music.nxinxz.com/kgqq/tx.php?id={id}&level={level}&type=mp3",
  wy: "http://music.nxinxz.com/wy.php?id={id}&level={level}&type=mp3",
  kw: "http://music.nxinxz.com/kw.php?id={id}&level={level}&type=mp3",
  kg: "https://music.nxinxz.com/kgqq/kg.php?id={id}&level={level}&type=mp3",
  mg: "http://music.nxinxz.com/mg.php?id={id}&level={level}&type=mp3"
};

const QISHUI_SOURCE_ID = "qsvip";
const QISHUI_SOURCE_NAME = "汽水VIP";
const QISHUI_API_HTTPS = "https://api.vsaa.cn/api/music.qishui.vip";
const QISHUI_API_HTTP = "http://api.vsaa.cn/api/music.qishui.vip";
const QISHUI_PROXY_API = "https://proxy.qishui.vsaa.cn/qishui/proxy";

const PLATFORM_QUALITIES = {
  wy: ["24bit", "flac", "320k", "192k", "128k"],
  tx: ["24bit", "flac", "320k", "192k", "128k"],
  kw: ["24bit", "flac", "320k", "192k", "128k"],
  kg: ["24bit", "flac", "320k", "192k", "128k"],
  mg: ["24bit", "flac", "320k", "192k", "128k"]
};

const PLATFORM_TO_XINGHAI = {
  wy: "netease",
  tx: "tencent",
  kw: "kuwo",
  kg: "kugou",
  mg: "migu"
};

const QUALITY_TO_BR = {
  "128k": "128",
  "192k": "192",
  "320k": "320",
  flac: "740",
  flac24bit: "999",
  "24bit": "999"
};

const PLATFORM_TO_XINGHAI_BACKUP = {
  wy: "netease",
  tx: "qq",
  kw: "kuwo"
};

const QUALITY_TO_SUYIN_QQ_BR = {
  "128k": 7,
  "320k": 5,
  flac: 4,
  hires: 3,
  atmos: 2,
  master: 1,
  "24bit": 1
};

const QUALITY_TO_KUWO_BR = {
  flac: 1,
  "320k": 5,
  "128k": 7,
  "24bit": 1
};

const HIRES_QUALITY_SET = new Set(["24bit", "flac", "flac24bit", "hires", "master", "atmos"]);

const urlCache = new Map();

const {
  EVENT_NAMES,
  request,
  on,
  send
} = globalThis.lx;

function noop() {}

function httpRequest(url, options = { method: "GET" }) {
  return new Promise((resolve, reject) => {
    request(url, {
      timeout: 2000,
      ...options
    }, (err, res) => {
      if (err) {
        return reject(new Error("请求错误: " + err.message));
      }
      let body = res?.body;
      if (typeof body === "string") {
        const trimmed = body.trim();
        if (trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.startsWith("\"")) {
          try {
            body = JSON.parse(trimmed);
          } catch (e2) {}
        }
      }
      resolve({
        statusCode: res?.statusCode ?? 0,
        headers: res?.headers || {},
        body: body
      });
    });
  });
}

async function httpGet(url, params = {}) {
  const queryStr = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  const sep = url.includes("?") ? "&" : "?";
  const fullUrl = "" + url + (queryStr ? sep + queryStr : "");
  const res = await httpRequest(fullUrl, {
    method: "GET",
    timeout: 2000
  });
  if (res.statusCode >= 400) {
    throw new Error("HTTP错误: " + res.statusCode);
  }
  return res.body;
}

function buildQueryString(params = {}) {
  const parts = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => encodeURIComponent(String(k)) + "=" + encodeURIComponent(String(params[k])));
  if (parts.length) {
    return "?" + parts.join("&");
  } else {
    return "";
  }
}

async function httpGetWithFallback(url, params = {}, timeout = 5000) {
  const urls = url === QISHUI_API_HTTPS ? [QISHUI_API_HTTPS, QISHUI_API_HTTP] : [url];
  let lastError = null;
  for (const u of urls) {
    try {
      const fullUrl = "" + u + buildQueryString(params);
      const res = await httpRequest(fullUrl, {
        method: "GET",
        timeout: timeout
      });
      if (res.statusCode >= 400) {
        throw new Error("HTTP " + res.statusCode);
      }
      return res.body;
    } catch (e3) {
      lastError = e3;
    }
  }
  throw lastError || new Error("汽水VIP请求失败");
}

async function httpPost(url, body = {}, timeout = 5000) {
  const res = await httpRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body,
    timeout: timeout
  });
  if (res.statusCode >= 400) {
    throw new Error("HTTP错误: " + res.statusCode);
  }
  return res.body;
}

function getSongId(songInfo) {
  return (songInfo?.id || songInfo?.songmid || songInfo?.songId || songInfo?.hash || songInfo?.rid || songInfo?.mid || songInfo?.strMediaMid || songInfo?.mediaId || "").toString();
}

function normalizeQuality(quality) {
  switch (String(quality || "").toLowerCase()) {
    case "128k":
      return "low";
    case "320k":
      return "standard";
    case "flac":
      return "lossless";
    case "flac24bit":
      return "flac24bit";
    default:
      return "128k";
  }
}

function normalizeSongInfo(raw) {
  const id = raw?.id || raw?.vid ? String(raw.id || raw.vid) : "";
  return {
    id: id,
    songmid: id,
    hash: id,
    name: raw?.name ? String(raw.name) : "未知歌曲",
    singer: raw?.artists ? String(raw.artists) : "未知歌手",
    albumName: raw?.album ? String(raw.album) : "",
    duration: raw?.duration ? Math.floor(Number(raw.duration) / 1000) : 0,
    pic: raw?.cover || raw?.pic ? String(raw.cover || raw.pic) : "",
    _raw: raw || {}
  };
}

function getFirstData(response) {
  const data = response?.data;
  if (Array.isArray(data)) {
    return data[0] || null;
  }
  if (data && typeof data === "object" && data[0]) {
    return data[0];
  }
  return null;
}

async function qishuiSearch(keyword, page = 1, pageSize = 30) {
  if (!keyword) {
    return {
      isEnd: true,
      list: []
    };
  }
  const res = await httpGetWithFallback(QISHUI_API_HTTPS, {
    act: "search",
    keywords: keyword,
    page: page,
    pagesize: pageSize,
    type: "music"
  }, 15000);
  const list = Array.isArray(res?.data?.lists) ? res.data.lists : [];
  const total = res?.data?.total ? Number(res.data.total) : list.length;
  return {
    isEnd: list.length < pageSize,
    list: list.map(normalizeSongInfo),
    total: total
  };
}

async function qishuiGetUrl(songInfo, quality) {
  const songId = getSongId(songInfo);
  if (!songId) {
    throw new Error("汽水VIP缺少歌曲ID");
  }
  const res = await httpGetWithFallback(QISHUI_API_HTTPS, {
    act: "song",
    id: songId,
    quality: normalizeQuality(quality)
  }, 20000);
  const data = getFirstData(res);
  if (!data?.url) {
    throw new Error("汽水VIP未返回可用URL");
  }
  if (data.ekey) {
    const proxyRes = await httpPost(QISHUI_PROXY_API, {
      url: data.url,
      key: data.ekey,
      filename: data.filename || "KMusic",
      ext: data.fileExtension ? String(data.fileExtension) : "aac"
    }, 60000);
    if (Number(proxyRes?.code) === 200 && proxyRes?.url) {
      return String(proxyRes.url);
    }
    throw new Error("汽水VIP代理解密失败");
  }
  return String(data.url);
}

async function qishuiGetLyric(songInfo) {
  const songId = getSongId(songInfo);
  if (!songId) {
    return { lyric: "" };
  }
  const res = await httpGetWithFallback(QISHUI_API_HTTPS, {
    act: "song",
    id: songId
  }, 15000);
  const data = getFirstData(res);
  return {
    lyric: data?.lyric ? String(data.lyric) : ""
  };
}

async function qishuiHandler(action, params = {}) {
  if (action === "musicSearch" || action === "search") {
    const keyword = params?.keyword ? String(params.keyword) : "";
    const page = params?.page ? Number(params.page) : 1;
    const pageSize = params?.pagesize ? Number(params.pagesize) : 30;
    return qishuiSearch(keyword, page, pageSize);
  }
  if (action === "musicUrl") {
    if (!params?.musicInfo) {
      throw new Error("请求参数不完整");
    }
    const url = await qishuiGetUrl(params.musicInfo, params.type);
    return validateUrl(url, "汽水VIP");
  }
  if (action === "lyric") {
    return qishuiGetLyric(params?.musicInfo || {});
  }
  throw new Error("action not support");
}

function selectQuality(requestedQuality, supportedQualities) {
  if (requestedQuality === "24bit") {
    return "24bit";
  }
  const qualityList = Array.isArray(supportedQualities) ? supportedQualities : ["128k"];
  const normalized = String(requestedQuality || "128k").toLowerCase();
  if (qualityList.includes(normalized)) {
    return normalized;
  }
  const qualityOrder = ["flac24bit", "flac", "320k", "192k", "128k"];
  let idx = qualityOrder.indexOf(normalized);
  if (idx < 0) {
    idx = qualityOrder.length - 1;
  }
  for (let i = idx; i < qualityOrder.length; i++) {
    if (qualityList.includes(qualityOrder[i])) {
      return qualityOrder[i];
    }
  }
  for (let i = qualityOrder.length - 1; i >= 0; i--) {
    if (qualityList.includes(qualityOrder[i])) {
      return qualityOrder[i];
    }
  }
  return qualityList[0] || "128k";
}

function normalizeKeyword(keyword) {
  if (!keyword) {
    return "";
  }
  return String(keyword)
    .replace(/\(\s*Live\s*\)/gi, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, "")
    .replace(/[^\w\u4e00-\u9fa5]/g, "")
    .trim()
    .toLowerCase();
}

function buildSearchKeywords(songInfo) {
  const keywords = [];
  const name = songInfo?.name || "";
  const album = songInfo?.albumName || songInfo?.album || "";
  const singer = songInfo?.singer || "";
  if (name && album) {
    const kw = normalizeKeyword(name + album);
    if (kw) {
      keywords.push({ keyword: kw, strict: true });
    }
  }
  if (name && singer) {
    const kw = normalizeKeyword(name + singer);
    if (kw) {
      keywords.push({ keyword: kw, strict: true });
    }
  }
  if (name) {
    const kw = normalizeKeyword(name);
    if (kw) {
      keywords.push({ keyword: kw, strict: false });
    }
  }
  return keywords;
}

function titleMatch(a, b) {
  const na = normalizeKeyword(a);
  const nb = normalizeKeyword(b);
  if (!na || !nb) {
    return true;
  }
  return na.includes(nb) || nb.includes(na);
}

function songInfoMatch(responseData, songInfo) {
  const song = responseData?.song || responseData?.data?.song || "";
  const singer = responseData?.singer || responseData?.data?.singer || "";
  const album = responseData?.album || responseData?.data?.album || "";
  if (!titleMatch(song, songInfo?.name || "")) {
    return false;
  }
  if (songInfo?.singer && singer && !titleMatch(singer, songInfo.singer)) {
    return false;
  }
  if ((songInfo?.albumName || songInfo?.album) && album && !titleMatch(album, songInfo.albumName || songInfo.album)) {
    return false;
  }
  return true;
}

function songTitleMatch(responseData, songInfo) {
  if (!titleMatch(responseData?.title || "", songInfo?.name || "")) {
    return false;
  }
  if (songInfo?.singer && responseData?.artist && !titleMatch(responseData.artist, songInfo.singer)) {
    return false;
  }
  if ((songInfo?.albumName || songInfo?.album) && responseData?.album && !titleMatch(responseData.album, songInfo.albumName || songInfo.album)) {
    return false;
  }
  return true;
}

function parseMessageSongInfo(message) {
  if (!message) {
    return null;
  }
  const result = {};
  const lines = String(message).split("\n");
  for (const line of lines) {
    if (line.startsWith("歌名：")) {
      result.song = line.replace("歌名：", "").trim();
    }
    if (line.startsWith("歌手：")) {
      result.singer = line.replace("歌手：", "").trim();
    }
    if (line.startsWith("专辑：")) {
      result.album = line.replace("专辑：", "").trim();
    }
  }
  if (result.song) {
    return result;
  } else {
    return null;
  }
}

function getHashOrMid(songInfo) {
  return songInfo?.hash ?? songInfo?.songmid ?? songInfo?.id ?? null;
}

function getQQSongId(songInfo) {
  const mid = songInfo?.meta?.qq?.mid || songInfo?.meta?.mid || songInfo?.songmid ||
    (typeof songInfo?.id === "string" && !/^\d+$/.test(songInfo.id) ? songInfo.id : null);
  if (mid) {
    return { type: "mid", value: mid };
  }
  const songid = songInfo?.meta?.qq?.songid || songInfo?.meta?.songid ||
    (typeof songInfo?.id === "number" ? songInfo.id :
      (typeof songInfo?.id === "string" && /^\d+$/.test(songInfo.id) ? Number(songInfo.id) : null));
  if (songid) {
    return { type: "songid", value: songid };
  }
  return null;
}

function qualityToNetease(quality) {
  const q = String(quality || "128k").toLowerCase();
  if (q === "flac" || q === "flac24bit" || q === "hires" || q === "master" || q === "atmos") {
    return "lossless";
  }
  if (q === "320k" || q === "192k") {
    return "exhigh";
  }
  return "standard";
}

function getPlatformSongId(platform, songInfo) {
  if (platform === "kg") {
    return songInfo?.hash || songInfo?.songmid || songInfo?.id || songInfo?.rid || songInfo?.mid || null;
  }
  if (platform === "tx") {
    const qqId = getQQSongId(songInfo);
    if (qqId?.value) {
      return qqId.value;
    }
  }
  return songInfo?.songmid || songInfo?.id || songInfo?.songId || songInfo?.rid || songInfo?.hash || null;
}

function buildTemplateUrl(platform, quality, songInfo, templates, sourceName) {
  const template = templates[platform];
  if (!template) {
    throw new Error(sourceName + "不支持该平台");
  }
  const songId = getPlatformSongId(platform, songInfo);
  if (!songId) {
    throw new Error(sourceName + "缺少songId");
  }
  const level = qualityToNetease(quality);
  return template
    .replace("{id}", encodeURIComponent(String(songId)))
    .replace("{level}", encodeURIComponent(level));
}

function buildCacheKey(prefix, songInfo, quality = "") {
  const name = songInfo?.name || "";
  const singer = songInfo?.singer || "";
  const album = songInfo?.albumName || songInfo?.album || "";
  return prefix + "_" + name + "_" + singer + "_" + album + "_" + quality;
}

function getCachedUrl(cacheKey) {
  const entry = urlCache.get(cacheKey);
  if (!entry) {
    return null;
  }
  if (Date.now() - entry.timestamp >= CACHE_TTL_MS) {
    urlCache.delete(cacheKey);
    return null;
  }
  return entry.url;
}

function setCachedUrl(cacheKey, url) {
  urlCache.set(cacheKey, {
    url: url,
    timestamp: Date.now()
  });
  if (urlCache.size > CACHE_MAX_SIZE) {
    const oldestKey = urlCache.keys().next().value;
    if (oldestKey !== undefined) {
      urlCache.delete(oldestKey);
    }
  }
}

function validateUrl(url, sourceName) {
  if (!url || typeof url !== "string") {
    throw new Error(sourceName + "返回空URL");
  }
  if (!HTTP_URL_REGEX.test(url.trim())) {
    throw new Error(sourceName + "非法URL格式");
  }
  return url;
}

function getMobileUserAgent() {
  return "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";
}

async function xinghaiMainGetUrl(platform, songId, quality, songInfo) {
  const source = PLATFORM_TO_XINGHAI[platform];
  if (!source) {
    throw new Error("星海主API不支持该平台");
  }
  const id = songId ?? getHashOrMid(songInfo);
  if (!id) {
    throw new Error("缺少songId");
  }
  const selectedQuality = selectQuality(quality, ["128k", "192k", "320k", "flac", "flac24bit"]);
  const br = QUALITY_TO_BR[selectedQuality];
  if (!br) {
    throw new Error("星海主API音质映射失败");
  }
  const url = XINGHAI_MAIN_API + "&types=url&source=" + source + "&id=" + encodeURIComponent(id) + "&br=" + br;
  const res = await httpRequest(url, {
    method: "GET",
    headers: {
      "User-Agent": "LX-Music-Mobile",
      Accept: "application/json"
    }
  });
  const body = res.body;
  if (!body || typeof body !== "object" || !body.url) {
    throw new Error(body?.message || "星海主API未返回可用URL");
  }
  return body.url;
}

async function xinghaiBackupGetUrl(platform, songId, quality, songInfo) {
  const source = PLATFORM_TO_XINGHAI_BACKUP[platform];
  if (!source) {
    throw new Error("星海备API不支持该平台");
  }
  const id = songId ?? getHashOrMid(songInfo);
  if (!id) {
    throw new Error("缺少songId");
  }
  const selectedQuality = selectQuality(quality, ["128k", "192k", "320k", "flac", "flac24bit"]);
  return XINGHAI_BACKUP_API + "?source=" + encodeURIComponent(source) + "&id=" + encodeURIComponent(id) + "&type=url&br=" + encodeURIComponent(selectedQuality);
}

async function huibqGetUrl(platform, songId, quality, songInfo) {
  const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
  if (!hashOrMid) {
    throw new Error("Huibq缺少hash/songmid");
  }
  const selectedQuality = selectQuality(quality, ["320k", "128k"]);
  const url = HUIBQ_API + "/url/" + platform + "/" + encodeURIComponent(hashOrMid) + "/" + encodeURIComponent(selectedQuality);
  const res = await httpRequest(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": getMobileUserAgent(),
      "X-Request-Key": HUIBQ_REQUEST_KEY
    }
  });
  const body = res.body;
  if (!body || typeof body !== "object" || Number.isNaN(Number(body.code))) {
    throw new Error("Huibq返回无效");
  }
  switch (Number(body.code)) {
    case 0:
      if (!body.url) {
        throw new Error("Huibq返回空URL");
      }
      return body.url;
    case 1:
      throw new Error("Huibq block ip");
    case 2:
      throw new Error("Huibq get music url failed");
    case 4:
      throw new Error("Huibq too many requests");
    case 5:
      throw new Error("Huibq param error");
    case 6:
      throw new Error("Huibq internal server error");
    default:
      throw new Error(body.message || "Huibq unknown error");
  }
}

async function lingchuanGetUrl(platform, songId, quality, songInfo) {
  const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
  if (!hashOrMid) {
    throw new Error("聆川缺少hash/songmid");
  }
  const selectedQuality = selectQuality(quality, ["320k", "128k"]);
  const url = LINGCHUAN_API + "/url?source=" + encodeURIComponent(platform) + "&songId=" + encodeURIComponent(hashOrMid) + "&quality=" + encodeURIComponent(selectedQuality);
  const res = await httpRequest(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": getMobileUserAgent()
    },
    follow_max: 5
  });
  const body = res.body;
  if (!body || typeof body !== "object" || Number.isNaN(Number(body.code))) {
    throw new Error("聆川返回无效");
  }
  switch (Number(body.code)) {
    case 200:
      if (!body.url) {
        throw new Error("聆川返回空URL");
      }
      return body.url;
    case 403:
      throw new Error("聆川403 forbidden");
    case 429:
      throw new Error("聆川429 rate limit");
    case 500:
      throw new Error("聆川500 " + (body.message || "server error"));
    default:
      throw new Error(body.message || "聆川未知错误");
  }
}

function extractQQUrl(responseData) {
  if (responseData?.music) {
    return responseData.music;
  }
  if (responseData?.url) {
    return responseData.url;
  }
  if (responseData?.message) {
    const match = String(responseData.message).match(/音频链接[：:](.+?)(?:\n|$)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  throw new Error("溯音QQ未找到音频链接");
}

function qualityToSuyinQQ(quality) {
  const q = String(quality || "128k").toLowerCase();
  if (q === "flac24bit") {
    return "hires";
  }
  if (q === "192k") {
    return "320k";
  }
  if (QUALITY_TO_SUYIN_QQ_BR[q]) {
    return q;
  }
  return "128k";
}

async function suyinQQGetUrl(songInfo, quality) {
  const qqId = getQQSongId(songInfo);
  if (!qqId) {
    throw new Error("溯音QQ缺少songmid/id");
  }
  const normalizedQuality = qualityToSuyinQQ(quality);
  const startBr = QUALITY_TO_SUYIN_QQ_BR[normalizedQuality] || QUALITY_TO_SUYIN_QQ_BR["128k"];
  const brList = [startBr, 4, 5, 7]
    .filter((val, idx, arr) => arr.indexOf(val) === idx && val >= startBr)
    .sort((a, b) => a - b);
  let lastError = null;
  for (const br of brList) {
    try {
      const reqParams = {
        key: SUYIN_QQ_KEY,
        type: "json",
        br: br,
        n: 1
      };
      if (qqId.type === "mid") {
        reqParams.mid = qqId.value;
      } else {
        reqParams.songid = qqId.value;
      }
      const res = await httpGet(SUYIN_QQ_API, reqParams);
      return extractQQUrl(res);
    } catch (e4) {
      lastError = e4;
    }
  }
  throw new Error("溯音QQ全部音质尝试失败: " + (lastError?.message || "unknown"));
}

async function suyin163GetUrl(songInfo) {
  const id = songInfo?.songmid || songInfo?.id;
  if (!id) {
    throw new Error("溯音163缺少songmid/id");
  }
  const res = await httpGet(SUYIN_163_API, { id: id });
  if (res?.code === 0 && res?.data) {
    const item = Array.isArray(res.data) ? res.data[0] : res.data;
    if (item?.url) {
      return item.url;
    }
  }
  throw new Error("溯音163获取失败");
}

async function suyinKuwoSearch(keyword, br, songInfo = null) {
  const res = await httpGet(SUYIN_KUWO_API, {
    msg: keyword,
    n: 1,
    br: br
  });
  if (res?.data?.url) {
    if (songInfo && !songInfoMatch(res, songInfo)) {
      throw new Error("溯音酷我歌曲信息不匹配");
    }
    return res.data.url;
  }
  if (res?.message) {
    const match = String(res.message).match(/音乐链接[：:](\S+)/);
    if (match && match[1]) {
      if (songInfo) {
        const parsed = parseMessageSongInfo(res.message);
        if (parsed && !songInfoMatch(parsed, songInfo)) {
          throw new Error("溯音酷我歌曲信息不匹配");
        }
      }
      return match[1];
    }
  }
  throw new Error("溯音酷我未找到链接");
}

async function suyinKuwoGetUrl(songInfo, quality) {
  if (!songInfo?.name) {
    throw new Error("溯音酷我需要歌曲名");
  }
  const cacheKey = buildCacheKey("kw", songInfo, quality);
  const cached = getCachedUrl(cacheKey);
  if (cached) {
    return cached;
  }
  const selectedQuality = selectQuality(quality, ["flac", "320k", "128k"]);
  const br = QUALITY_TO_KUWO_BR[selectedQuality] || 1;
  const keywords = buildSearchKeywords(songInfo);
  let lastError = null;
  for (const item of keywords) {
    try {
      const url = await suyinKuwoSearch(item.keyword, br, item.strict ? songInfo : null);
      if (url) {
        setCachedUrl(cacheKey, url);
        return url;
      }
    } catch (e5) {
      lastError = e5;
    }
  }
  throw new Error("溯音酷我失败: " + (lastError?.message || "unknown"));
}

async function suyinMiguGetUrl(songInfo) {
  if (!songInfo?.name) {
    throw new Error("溯音咪咕需要歌曲名");
  }
  const cacheKey = buildCacheKey("mg", songInfo);
  const cached = getCachedUrl(cacheKey);
  if (cached) {
    return cached;
  }
  const keywords = buildSearchKeywords(songInfo);
  let lastError = null;
  for (const item of keywords) {
    try {
      const res = await httpGet(SUYIN_MIGU_API, {
        gm: item.keyword,
        n: 1,
        num: 1,
        type: "json"
      });
      if (res?.code === 200 && res?.musicInfo) {
        if (item.strict && !songTitleMatch(res, songInfo)) {
          throw new Error("溯音咪咕歌曲信息不匹配");
        }
        setCachedUrl(cacheKey, res.musicInfo);
        return res.musicInfo;
      }
    } catch (e6) {
      lastError = e6;
    }
  }
  throw new Error("溯音咪咕失败: " + (lastError?.message || "unknown"));
}

async function suyinGetUrl(platform, songId, quality, songInfo) {
  switch (platform) {
    case "tx":
      return suyinQQGetUrl(songInfo, quality);
    case "wy":
      return suyin163GetUrl(songInfo);
    case "kw":
      return suyinKuwoGetUrl(songInfo, quality);
    case "mg":
      return suyinMiguGetUrl(songInfo);
    default:
      throw new Error("溯音不支持该平台");
  }
}

async function changqingGetUrl(platform, songId, quality, songInfo) {
  return buildTemplateUrl(platform, quality, songInfo, CHANGQING_URL_TEMPLATES, "长青SVIP");
}

async function nianxinGetUrl(platform, songId, quality, songInfo) {
  return buildTemplateUrl(platform, quality, songInfo, NIANXIN_URL_TEMPLATES, "念心SVIP");
}

const SOURCE_HANDLERS = {
  xinghai: {
    name: "星海主",
    fn: xinghaiMainGetUrl
  },
  xinghaiBackup: {
    name: "星海备",
    fn: xinghaiBackupGetUrl
  },
  huibq: {
    name: "Huibq",
    fn: huibqGetUrl
  },
  lingchuan: {
    name: "聆川",
    fn: lingchuanGetUrl
  },
  suyinQQ: {
    name: "溯音QQ",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("tx", songId, quality, songInfo)
  },
  suyin163: {
    name: "溯音163",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("wy", songId, quality, songInfo)
  },
  suyinSearch: {
    name: "溯音搜索",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("kw", songId, quality, songInfo)
  },
  suyinMigu: {
    name: "溯音咪咕",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("mg", songId, quality, songInfo)
  },
  changqingVip: {
    name: "长青SVIP",
    fn: changqingGetUrl
  },
  nianxinVip: {
    name: "念心SVIP",
    fn: nianxinGetUrl
  }
};

function buildSourceChain(platform, isHires, quality) {
  const chain = [];
  if (SOURCE_HANDLERS.xinghai) {
    chain.push(SOURCE_HANDLERS.xinghai);
  }
  if (SOURCE_HANDLERS.huibq) {
    chain.push(SOURCE_HANDLERS.huibq);
  }
  if (platform === "wy" && SOURCE_HANDLERS.suyin163) {
    chain.push(SOURCE_HANDLERS.suyin163);
  }
  if (platform === "tx" && SOURCE_HANDLERS.suyinQQ) {
    chain.push(SOURCE_HANDLERS.suyinQQ);
  }
  if (platform === "kw" && SOURCE_HANDLERS.suyinSearch) {
    chain.push(SOURCE_HANDLERS.suyinSearch);
  }
  if (platform === "mg" && SOURCE_HANDLERS.suyinMigu) {
    chain.push(SOURCE_HANDLERS.suyinMigu);
  }
  if (SOURCE_HANDLERS.lingchuan) {
    chain.push(SOURCE_HANDLERS.lingchuan);
  }
  if (SOURCE_HANDLERS.changqingVip) {
    chain.push(SOURCE_HANDLERS.changqingVip);
  }
  if (SOURCE_HANDLERS.nianxinVip) {
    chain.push(SOURCE_HANDLERS.nianxinVip);
  }
  return chain;
}

async function getUrlWithFallback(platform, songInfo, quality) {
  if (!platform || typeof platform !== "string" || !PLATFORM_QUALITIES[platform]) {
    throw new Error("无效的平台参数");
  }
  if (!songInfo || typeof songInfo !== "object") {
    throw new Error("无效的歌曲信息");
  }
  const resolvedQuality = quality || "128k";
  const selectedQuality = selectQuality(resolvedQuality, PLATFORM_QUALITIES[platform]);
  const songId = getHashOrMid(songInfo);
  const isHires = HIRES_QUALITY_SET.has(resolvedQuality.toLowerCase());
  const chain = buildSourceChain(platform, isHires, selectedQuality);
  if (!chain.length) {
    throw new Error("未找到可用fallback链");
  }
  const errors = [];
  try {
    const url = await Promise.any(chain.slice(0, 3).map(async handler => {
      const result = await handler.fn(platform, songId, selectedQuality, songInfo);
      return validateUrl(result, handler.name);
    }));
    if (url) {
      return url;
    }
  } catch (e7) {
    if (e7.errors) {
      e7.errors.forEach(err => errors.push(err.message));
    }
  }
  for (const handler of chain.slice(3)) {
    try {
      const result = await handler.fn(platform, songId, selectedQuality, songInfo);
      return validateUrl(result, handler.name);
    } catch (e8) {
      errors.push(handler.name + ": " + e8.message);
      continue;
    }
  }
  throw new Error("所有源均失败: " + errors.join("; "));
}

const sourceConfig = {};

const PLATFORM_NAMES = {
  wy: "网易云音乐",
  tx: "QQ音乐",
  kw: "酷我音乐",
  kg: "酷狗音乐",
  mg: "咪咕音乐"
};

Object.keys(PLATFORM_QUALITIES).forEach(platform => {
  sourceConfig[platform] = {
    name: PLATFORM_NAMES[platform],
    type: "music",
    actions: ["musicUrl"],
    qualitys: PLATFORM_QUALITIES[platform]
  };
});

sourceConfig[QISHUI_SOURCE_ID] = {
  name: QISHUI_SOURCE_NAME,
  type: "music",
  actions: ["musicSearch", "musicUrl", "lyric"],
  qualitys: ["128k", "320k", "flac", "flac24bit"]
};

on(EVENT_NAMES.request, ({ action, source, info }) => {
  if (source === QISHUI_SOURCE_ID) {
    return qishuiHandler(action, info);
  }
  if (action !== "musicUrl") {
    return Promise.reject(new Error("action not support"));
  }
  if (!info?.musicInfo) {
    return Promise.reject(new Error("请求参数不完整"));
  }
  return getUrlWithFallback(source, info.musicInfo, info.type || "128k")
    .then(url => Promise.resolve(url))
    .catch(err => Promise.reject(err));
});

send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: sourceConfig
});

noop("初始化完成，聚合音源已就绪");

  })

  // [09] 收集_聚合接口_lx版 | A9-收集の聚合接口-v1.0.0.js
  __load(8, function (globalThis, window, self, top, parent, lx, process) {
const DEV_ENABLE = false
const UPDATE_ENABLE = false
const SUPPORT_SOURCE = ['tx', 'wy', 'kw']
const QUALITY_MAP = {
  tx: { '128k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac', 'hires': 'flac', 'atmos': 'flac', 'master': 'flac' },
  wy: { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'lossless', 'hires': 'lossless', 'atmos': 'lossless', 'master': 'lossless' },
  kw: { '128k': '128k', '320k': '320k', 'flac': 'lossless', 'flac24bit': 'lossless', 'hires': 'lossless', 'atmos': 'lossless', 'master': 'lossless' }
}

const { EVENT_NAMES, request, on, send, env, version } = globalThis.lx

const httpFetch = (url, options = { method: 'GET' }) => {
  return new Promise((resolve, reject) => {
    request(url, options, (err, resp) => {
      if (err) return reject(err)
      resolve(resp)
    })
  })
}

const getMusicUrl = async (source, musicInfo, quality) => {
  const songId = musicInfo.hash ?? musicInfo.songmid
  const level = QUALITY_MAP[source][quality] || 'lossless'

  let url
  switch (source) {
    case 'tx':
      url = `https://cyapi.top/API/qq_music.php?apikey=1ffdf5733f5d538760e63d7e46ba17438d9f7b9dfc18c51be1109386fd74c3a1&type=json&mid=${songId}`
      break
    case 'wy':
      url = `https://api.cenguigui.cn/api/netease/music_v1.php?id=${songId}&type=json&level=${level}`
      break
    case 'kw':
      url = `https://kw-api.cenguigui.cn?id=${songId}&type=song&format=json&level=${level}`
      break
    default:
      throw new Error('不支持的源')
  }

  const { body } = await httpFetch(url, {
    method: 'GET',
    headers: { 'User-Agent': env ? `lx-music-${env}/${version}` : `lx-music-request/${version}` }
  })

  if (!body) throw new Error('空响应')

  let realUrl
  if (source === 'tx') realUrl = body.url
  else if (body.data) realUrl = body.data.url
  if (!realUrl) throw new Error('获取播放链接失败')

  return realUrl
}

const sources = {}
SUPPORT_SOURCE.forEach(s => {
  sources[s] = {
    name: s,
    type: 'music',
    actions: ['musicUrl'],
    qualitys: Object.keys(QUALITY_MAP[s])
  }
})

on(EVENT_NAMES.request, ({ action, source, info }) => {
  if (action !== 'musicUrl') return Promise.reject('action not support')
  return getMusicUrl(source, info.musicInfo, info.type)
    .then(url => Promise.resolve(url))
    .catch(err => Promise.reject(err.message || err))
})

send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: DEV_ENABLE,
  sources
})

  })

  // [10] 溯音音源 | A9-溯音音源-v1.js
  __load(9, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send } = globalThis.lx

let QQ_API_KEY = 'oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575'

const cache = new Map()
const CACHE_TTL = 300000

const QQ_QUALITY_MAP = {
    '128k': { br: 7, format: 'mp3' },
    '320k': { br: 5, format: 'mp3' },
    'flac': { br: 4, format: 'flac' },
    'hires': { br: 3, format: 'flac' },
    'atmos': { br: 2, format: 'flac' },
    'master': { br: 1, format: 'flac' }
}

on(EVENT_NAMES.request, async ({ action, source, info }) => {
    try {
        switch (action) {
            case 'musicUrl':
                return await handleMusicUrl(source, info)
            case 'search':
                return await handleSearch(source, info)
            default:
                throw new Error('不支持的操作')
        }
    } catch (error) {
        console.error(`[溯音音源] ${source} ${action} 错误:`, error.message)
        throw error
    }
})

async function handleMusicUrl(source, info) {
    if (!info?.musicInfo) throw new Error('需要歌曲信息')

    const musicInfo = info.musicInfo
    const quality = info.type || '128k'

    switch (source) {
        case 'tx':
            return await getQqMusicUrl(musicInfo, quality)
        case 'wy':
            return await getWyMusicUrl(musicInfo)
        case 'kw':
            return await getKwMusicUrl(musicInfo, quality)
        case 'mg':
            return await getMgMusicUrl(musicInfo)
        default:
            throw new Error('不支持的平台')
    }
}

async function getQqMusicUrl(musicInfo, quality) {
    if (!QQ_API_KEY) throw new Error('请先配置QQ音乐API Key')

    const songId = getQqSongId(musicInfo)
    if (!songId) throw new Error('歌曲缺少ID信息')

    const qualityConfig = QQ_QUALITY_MAP[quality] || QQ_QUALITY_MAP['128k']

    try {
        const params = {
            key: QQ_API_KEY,
            type: 'json',
            br: qualityConfig.br,
            n: 1
        }

        if (songId.type === 'mid') {
            params.mid = songId.value
        } else {
            params.songid = songId.value
        }

        const data = await sendRequest('https://oiapi.net/api/QQ_Music', params)
        return extractQqAudioUrl(data)
    } catch (error) {
        return await tryQqQualityFallback(songId, qualityConfig.br)
    }
}

function getQqSongId(musicInfo) {
    const mid = musicInfo.meta?.qq?.mid ||
               musicInfo.meta?.mid ||
               musicInfo.songmid ||
               (musicInfo.id && typeof musicInfo.id === 'string' && !/^\d+$/.test(musicInfo.id) ? musicInfo.id : null)

    if (mid) return { type: 'mid', value: mid }

    const songid = musicInfo.meta?.qq?.songid ||
                  musicInfo.meta?.songid ||
                  (musicInfo.id && /^\d+$/.test(musicInfo.id) ? parseInt(musicInfo.id) : null)

    if (songid) return { type: 'songid', value: songid }

    return null
}

function extractQqAudioUrl(data) {
    if (data?.music) return data.music
    if (data?.url) return data.url
    if (data?.message) {
        const match = data.message.match(/音频链接：(.+?)(?:\n|$)/)
        if (match && match[1]) return match[1]
    }
    throw new Error('未找到音频链接')
}

async function tryQqQualityFallback(songId, originalBr) {
    const brValues = [1, 2, 3, 4, 5, 7]

    for (const br of brValues) {
        if (br === originalBr) continue

        try {
            const params = {
                key: QQ_API_KEY,
                type: 'json',
                br: br,
                n: 1
            }

            if (songId.type === 'mid') {
                params.mid = songId.value
            } else {
                params.songid = songId.value
            }

            const data = await sendRequest('https://oiapi.net/api/QQ_Music', params)
            return extractQqAudioUrl(data)
        } catch (error) {
            continue
        }
    }

    throw new Error('所有音质尝试均失败')
}

async function getWyMusicUrl(musicInfo) {
    const songId = musicInfo.songmid || musicInfo.id
    if (!songId) throw new Error('缺少ID')

    const data = await sendRequest(`https://oiapi.net/api/Music_163?id=${songId}`)

    if (data.code === 0 && data.data) {
        const song = Array.isArray(data.data) ? data.data[0] : data.data
        if (song.url) return song.url
    }
    throw new Error('获取失败')
}

const KW_QUALITY_MAP = {
    'flac': 1,   
    '320k': 2,   
    '128k': 3    
}

async function getKwMusicUrl(musicInfo, quality) {
    if (!musicInfo.name) throw new Error('需要歌曲名')

    const cacheKey = `kw_${musicInfo.name}_${musicInfo.albumName || ''}_${musicInfo.singer || ''}_${quality}`
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)
        if (Date.now() - cached.timestamp < CACHE_TTL) {
            return cached.url
        }
    }

    const br = KW_QUALITY_MAP[quality] || 3
    const searchPriority = getSearchPriority(musicInfo)

    for (const term of searchPriority) {
        try {
            console.log(`[溯音音源-酷我] 尝试搜索: ${term.keyword} (严格: ${term.strict}) 音质: ${quality}`)
            const url = await fetchKwAudio(term.keyword, br, term.strict ? musicInfo : null)
            if (url) {
                cache.set(cacheKey, { url, timestamp: Date.now() })
                return url
            }
        } catch (error) {
            console.log(`[溯音音源-酷我] 搜索失败: ${term.keyword} - ${error.message}`)
        }
    }

    throw new Error('无法获取音频链接')
}

async function fetchKwAudio(keyword, br, checkInfo = null) {
    const data = await sendRequest('https://oiapi.net/api/Kuwo', {
        msg: keyword,
        n: 1,
        br: br
    })

    if (data.data?.url) {
        if (checkInfo && !checkKwMatch(data, checkInfo)) {
            throw new Error('歌曲信息不匹配')
        }
        return data.data.url
    }

    if (data.message) {
        const match = data.message.match(/音乐链接：(\S+)/)
        if (match) {
            if (checkInfo) {
                const songInfo = parseKwFromMessage(data.message)
                if (songInfo && !checkKwMatch(songInfo, checkInfo)) {
                    throw new Error('歌曲信息不匹配')
                }
            }
            return match[1]
        }
    }

    throw new Error('未找到链接')
}

function checkKwMatch(apiData, musicInfo) {
    const apiTitle = (apiData.song || apiData.data?.song || '').toLowerCase()
    const apiArtist = (apiData.singer || apiData.data?.singer || '').toLowerCase()
    const apiAlbum = (apiData.album || apiData.data?.album || '').toLowerCase()

    const songName = (musicInfo.name || '').toLowerCase()
    const singer = (musicInfo.singer || '').toLowerCase()
    const album = ((musicInfo.albumName || musicInfo.album) || '').toLowerCase()

    if (!apiTitle.includes(songName) && !songName.includes(apiTitle)) {
        return false
    }

    if (album && apiAlbum && !apiAlbum.includes(album) && !album.includes(apiAlbum)) {
        return false
    }

    if (singer && apiArtist && !apiArtist.includes(singer) && !singer.includes(apiArtist)) {
        return false
    }

    return true
}

function parseKwFromMessage(message) {
    if (!message) return null

    const lines = message.split('\n')
    const result = {}

    for (const line of lines) {
        if (line.includes('歌名：')) {
            result.song = line.replace('歌名：', '').trim()
        } else if (line.includes('歌手：')) {
            result.singer = line.replace('歌手：', '').trim()
        } else if (line.includes('专辑：')) {
            result.album = line.replace('专辑：', '').trim()
        }
    }

    return result.song ? result : null
}

async function getMgMusicUrl(musicInfo) {
    if (!musicInfo.name) throw new Error('需要歌曲名称')

    const cacheKey = `mg_${musicInfo.name}_${musicInfo.albumName || ''}_${musicInfo.singer || ''}`
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)
        if (Date.now() - cached.timestamp < CACHE_TTL) {
            return cached.url
        }
    }

    const searchPriority = getSearchPriority(musicInfo)

    for (const term of searchPriority) {
        try {
            console.log(`[溯音音源-咪咕] 尝试搜索: ${term.keyword} (严格: ${term.strict})`)
            const data = await sendRequest('https://api.xcvts.cn/api/music/migu', {
                gm: term.keyword,
                n: 1,
                num: 1,
                type: 'json'
            })

            if (data.code === 200 && data.music_url) {
                if (term.strict && !checkMgMatch(data, musicInfo)) {
                    console.log(`[溯音音源-咪咕] 信息不匹配: ${data.title} vs ${musicInfo.name}`)
                    throw new Error('歌曲信息不匹配')
                }

                cache.set(cacheKey, { url: data.music_url, timestamp: Date.now() })
                return data.music_url
            }
        } catch (error) {
            console.log(`[溯音音源-咪咕] 搜索失败: ${term.keyword} - ${error.message}`)
        }
    }

    throw new Error('未找到咪咕音乐链接')
}

function checkMgMatch(apiData, musicInfo) {
    const apiTitle = (apiData.title || '').toLowerCase()
    const apiArtist = (apiData.artist || '').toLowerCase()
    const apiAlbum = (apiData.album || '').toLowerCase()

    const songName = (musicInfo.name || '').toLowerCase()
    const singer = (musicInfo.singer || '').toLowerCase()
    const album = ((musicInfo.albumName || musicInfo.album) || '').toLowerCase()

    if (!apiTitle.includes(songName) && !songName.includes(apiTitle)) {
        return false
    }

    if (album && apiAlbum && !apiAlbum.includes(album) && !album.includes(apiAlbum)) {
        return false
    }

    if (singer && apiArtist && !apiArtist.includes(singer) && !singer.includes(apiArtist)) {
        return false
    }

    return true
}

async function handleSearch(source, info) {
    if (!info?.keyword) throw new Error('需要搜索关键词')

    const keyword = info.keyword.trim()
    const page = info.page || 1
    const limit = Math.min(info.limit || 20, 30)

    switch (source) {
        case 'kw':
            return await searchKwMusic(keyword, page, limit)
        case 'mg':
            return await searchMgMusic(keyword, page, limit)
        default:
            throw new Error('该平台不支持搜索')
    }
}

async function searchKwMusic(keyword, page, limit) {
    const results = []
    const maxPages = Math.ceil(limit / 5)

    for (let i = page; i <= maxPages && results.length < limit; i++) {
        try {
            const data = await sendRequest('https://oiapi.net/api/Kuwo', {
                msg: keyword,
                n: i
            })

            const song = parseKwSong(data)
            if (song) {
                results.push(song)
            }
        } catch {}
    }

    if (results.length === 0) throw new Error('未找到相关歌曲')
    return results
}

async function searchMgMusic(keyword, page, limit) {
    const results = []

    for (let i = page; i <= page + 2 && results.length < limit; i++) {
        try {
            const data = await sendRequest('https://api.xcvts.cn/api/music/migu', {
                gm: keyword,
                n: i,
                num: 1,
                type: 'json'
            })

            if (data.code === 200) {
                results.push({
                    name: data.title || keyword,
                    singer: data.artist || '',
                    albumName: data.album || '',
                    id: `mg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
                    source: 'mg',
                    interval: data.duration || '00:00'
                })
            }
        } catch {}
    }

    if (results.length === 0) throw new Error('未找到相关歌曲')
    return results
}

function getSearchPriority(musicInfo) {
    const priority = []

    if (musicInfo.albumName || musicInfo.album) {
        const album = musicInfo.albumName || musicInfo.album
        const keyword = cleanText(musicInfo.name + album)
        if (keyword) {
            priority.push({
                keyword: keyword,
                strict: true,
                type: 'name+album'
            })
        }
    }

    if (musicInfo.singer) {
        const keyword = cleanText(musicInfo.name + musicInfo.singer)
        if (keyword) {
            priority.push({
                keyword: keyword,
                strict: true,
                type: 'name+singer'
            })
        }
    }

    const keyword = cleanText(musicInfo.name)
    if (keyword) {
        priority.push({
            keyword: keyword,
            strict: false,
            type: 'name'
        })
    }

    return priority
}

function parseKwSong(data) {
    const songInfo = data.data || data
    if (!songInfo?.song) {
        if (data.message) {
            const parsed = parseKwFromMessage(data.message)
            if (parsed?.song) {
                songInfo.song = parsed.song
                songInfo.singer = parsed.singer
                songInfo.album = parsed.album
            }
        }
    }

    if (!songInfo?.song) return null

    const duration = parseInt(songInfo.time) || 0
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60

    return {
        name: songInfo.song,
        singer: songInfo.singer || '',
        albumName: songInfo.album || '',
        id: songInfo.rid || `kw_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        source: 'kw',
        interval: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        meta: {
            picture: songInfo.picture || ''
        }
    }
}

function sendRequest(baseUrl, params = {}) {
    return new Promise((resolve, reject) => {
        const query = Object.keys(params)
            .map(k => `${k}=${encodeURIComponent(params[k])}`)
            .join('&')
        const url = `${baseUrl}${query ? '?' + query : ''}`

        request(url, {
            method: 'GET',
            timeout: 8000
        }, (err, resp) => {
            if (err) {
                reject(new Error(`请求失败: ${err.message}`))
                return
            }

            try {
                const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
                resolve(data)
            } catch (e) {
                reject(new Error('响应格式错误'))
            }
        })
    })
}

function cleanText(text) {
    if (!text) return ''
    return text
        .replace(/\(\s*Live\s*\)/gi, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/\s+/g, '')
        .replace(/[^\w\u4e00-\u9fa5]/g, '')
        .trim()
}

on(EVENT_NAMES.showConfigView, () => {
    const view = {
        title: '溯音音源配置',
        width: 450,
        height: 200,
        config: [{
            key: 'qq_api_key',
            type: 'input',
            title: 'QQ音乐API Key',
            placeholder: '输入oiapi密钥',
            value: QQ_API_KEY,
            description: '用于获取QQ音乐的高品质音源'
        }],
        onSave: (config) => {
            QQ_API_KEY = config.qq_api_key.trim()
            return {
                result: true,
                message: QQ_API_KEY ? '密钥已保存' : '密钥已清空'
            }
        }
    }

    send(EVENT_NAMES.showConfigView, view)
})

const registeredSources = {
    tx: {
        name: 'QQ音乐',
        type: 'music',
        actions: ['musicUrl'],
        qualitys: Object.keys(QQ_QUALITY_MAP),
        features: ['idOnly'],
        defaultQuality: '128k'
    },
    wy: {
        name: '网易云音乐',
        type: 'music',
        actions: ['musicUrl'],
        qualitys: ['128k', '320k', 'flac']
    },
    kw: {
        name: '酷我音乐',
        type: 'music',
        actions: ['musicUrl', 'search'],
        qualitys: ['128k', '320k', 'flac'],
        supportSearchSuggestions: true
    },
    mg: {
        name: '咪咕音乐',
        type: 'music',
        actions: ['musicUrl', 'search'],
        qualitys: ['128k', '320k'],
        supportSearchSuggestions: false
    }
}

send(EVENT_NAMES.inited, {
    openDevTools: false,
    sources: registeredSources
})

console.log('[溯音音源] v1 已加载 - 支持QQ、网易、酷我、咪咕音乐')

  })

  // [11] 稳定版音源 | A9-稳定版音源-v1.0.3.js
  __load(10, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send } = globalThis.lx;

const QUALITY_MAP = {
    wy: { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'lossless' },
    tx: { '128k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac' },
    kw: { '128k': '128k', '320k': '320k', 'flac': 'lossless', 'flac24bit': 'lossless' }
};

const STABLE_API = {
    wy: (id, level) => `https://api.injahow.cn/meting/api/?server=wy&type=url&id=${id}&level=${level}`,
    tx: (id, level) => `https://cyapi.top/API/qq_music.php?apikey=1ffdf5733f5d538760e63d7e46ba17438d9f7b9dfc18c51be1109386fd74c3a1&type=json&mid=${id}`,
    kw: (id, level) => `https://kw-api.cenguigui.cn?id=${id}&type=song&format=json&level=${level}`
};

const httpRequest = (url, options = { method: 'GET' }) => new Promise((resolve, reject) => {
    request(url, options, (err, _, body) => {
        if (err) return reject(err);
        resolve(body);
    });
});

const getMusicUrl = async (source, musicInfo, quality) => {
    const songId = (
        musicInfo.id ||
        musicInfo.hash ||
        musicInfo.songmid ||
        musicInfo.songId ||
        musicInfo.musicId ||
        ''
    ).toString().trim();

    if (!songId) throw new Error('歌曲ID无效，请检查歌单导入来源');

    const level = QUALITY_MAP[source][quality] || '128k';
    const apiUrl = STABLE_API[source](songId, level);

    const res = await httpRequest(apiUrl, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
        }
    });

    let realUrl = '';
    if (typeof res === 'string') {
        realUrl = res;
    } else if (res?.url) {
        realUrl = res.url;
    } else if (res?.data?.url) {
        realUrl = res.data.url;
    }

    if (!realUrl || realUrl.includes('404') || realUrl.includes('error') || realUrl.includes('null')) {
        throw new Error('获取链接失败，可能是该歌曲无版权或接口维护');
    }
    return realUrl;
};

const apis = {
    wy: { musicUrl: (info, q) => getMusicUrl('wy', info, q) },
    tx: { musicUrl: (info, q) => getMusicUrl('tx', info, q) },
    kw: { musicUrl: (info, q) => getMusicUrl('kw', info, q) }
};

on(EVENT_NAMES.request, (params) => {
    const { source, action, info } = params;
    switch (action) {
        case 'musicUrl':
            return apis[source].musicUrl(info.musicInfo, info.type)
                .catch(err => Promise.reject(err.message || '获取播放链接失败'));
        default:
            return Promise.reject('不支持的操作，仅支持musicUrl');
    }
});

send(EVENT_NAMES.inited, {
    sources: {
        wy: { name: '网易云稳定版', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
        tx: { name: 'QQ音乐稳定版', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
        kw: { name: '酷狗稳定版', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac', 'flac24bit'] }
    }
});

  })

  // [12] 聚合api接口_cf | A9-聚合API接口 (CF)-v3.js
  __load(11, function (globalThis, window, self, top, parent, lx, process) {
let{stringify:t,parse:a}=JSON;let x=(r)=>{throw new Error(r)};let{EVENT_NAMES:n,request:b,on,send:y,version:v}=globalThis.lx;let A='https://api.music.lerd.dpdns.org/';let h=(u,o={method:'GET'})=>new Promise((s,j)=>{b(u,o,(e,r)=>{if(e)return j(e);s(r)})});h(A+'init.conf').then(r=>{if(r.body.code!==200)x("脚本初始化失败");let U=r.body.data;if(U.update.version>v)y(n.updateAlert,U.update);y(n.inited,U.init);}).catch(e=>x(e));on(n.request,async({action,source,info})=>{let r=await h(A+source,{method:'POST',body:t(info),headers:{'Content-Type':'application/json'}});let B=r.body;if(B.code===200)return B.data.url;else if(B.code===303){let S=a(t(B.data));let D=S.request;let F=S.response;try{let z=await h(encodeURI(D.url),D.options);if(F.check.key.reduce((a,c)=>a&&a[c],z)==F.check.value){let u=F.url.reduce((a,c)=>a&&a[c],z);if(u.startsWith("http"))return u;}}catch(e){x(e)}}else x(B.msg);});

  })

  // [13] 非常刀 | A9-非常刀 v5.js
  __load(12, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send } = globalThis.lx

const CHKSZ_API = 'https://api.chksz.top/api'
const XINGHAI_API = 'https://music-api.gdstudio.xyz/api.php?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light'
const SUYIN_QQ_API = 'https://oiapi.net/api/QQ_Music'
const SUYIN_QQ_KEY = 'oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575'
const SUYIN_163_API = 'https://oiapi.net/api/Music_163'
const SUYIN_KW_API = 'https://oiapi.net/api/Kuwo'
const SUYIN_MG_API = 'https://api.xcvts.cn/api/music/migu'
const QISHUI_SEARCH_API = 'https://api-vehicle.volcengine.com/v2/search/type'
const QISHUI_H5_API = 'https://api.qishui.com/luna/h5/track'

const CHKSZ_LEVEL = { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'jymaster' }
const CHKSZ_FALLBACK = {
  jymaster: ['jymaster', 'lossless', 'exhigh', 'standard'],
  lossless: ['lossless', 'exhigh', 'standard'],
  exhigh: ['exhigh', 'standard'],
  standard: ['standard'],
}
const XINGHAI_BR = { '128k': '128', '192k': '192', '320k': '320', 'flac': '740', 'flac24bit': '999' }
const XINGHAI_SRC = { wy: 'netease', tx: 'tencent', kw: 'kuwo', kg: 'kugou', mg: 'migu' }
const SUYIN_QQ_BR = { '128k': 7, '320k': 5, 'flac': 4, 'hires': 3, 'flac24bit': 1, 'master': 1 }
const SUYIN_KW_BR = { 'flac': 1, '320k': 5, '128k': 7 }

const CHANGQING = {
  tx: 'http://175.27.166.236/kgqq/qq.php?type=mp3&id={id}&level={level}',
  wy: 'http://175.27.166.236/wy/wy.php?type=mp3&id={id}&level={level}',
  kw: 'https://musicapi.haitangw.net/music/kw.php?type=mp3&id={id}&level={level}',
  kg: 'https://music.haitangw.cc/kgqq/kg.php?type=mp3&id={id}&level={level}',
  mg: 'https://music.haitangw.cc/musicapi/mg.php?type=mp3&id={id}&level={level}',
}
const NIANXIN = {
  tx: 'https://music.nxinxz.com/kgqq/tx.php?id={id}&level={level}&type=mp3',
  wy: 'http://music.nxinxz.com/wy.php?id={id}&level={level}&type=mp3',
  kw: 'http://music.nxinxz.com/kw.php?id={id}&level={level}&type=mp3',
  kg: 'https://music.nxinxz.com/kgqq/kg.php?id={id}&level={level}&type=mp3',
  mg: 'http://music.nxinxz.com/mg.php?id={id}&level={level}&type=mp3',
}

const cache = new Map()
const CACHE_TTL = 300000
const CACHE_MAX = 200

function cacheGet(key) {
  const c = cache.get(key)
  if (!c) return null
  if (Date.now() - c.ts > CACHE_TTL) { cache.delete(key); return null }
  return c.val
}

function cacheSet(key, val) {
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value)
  cache.set(key, { val, ts: Date.now() })
}

function httpGet(url, { timeout = 10000, headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    request(url, { method: 'GET', timeout, headers: { Accept: 'application/json', ...headers } }, (err, resp) => {
      if (err) return reject(new Error(err.message))
      try {
        resolve(typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body)
      } catch { reject(new Error('响应解析失败')) }
    })
  })
}

function validateUrl(url) {
  if (typeof url === 'string' && /^https?:\/\//.test(url)) return url
  throw new Error('无效URL')
}

function getSongId(info) {
  return (info.hash || info.songmid || info.id || info.rid || info.songId || '').toString()
}

function getQqSongId(info) {
  const mid = info.meta?.qq?.mid || info.meta?.mid || info.songmid || (typeof info.id === 'string' && !/^\d+$/.test(info.id) ? info.id : null)
  if (mid) return { type: 'mid', value: mid }
  const songid = info.meta?.qq?.songid || info.meta?.songid || info.id
  if (songid) return { type: 'songid', value: songid }
  return null
}

function qualityToLevel(q) {
  if (['flac', 'flac24bit', '24bit', 'hires', 'master'].includes(q)) return 'lossless'
  if (['320k', '192k'].includes(q)) return 'exhigh'
  return 'standard'
}

function cleanText(text) {
  if (!text) return ''
  return text.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, '').replace(/[【】《》"""'''·,，。!！?？:：;；/\\|\-]/g, '').trim().toLowerCase()
}

function formatDuration(ms) {
  const sec = typeof ms === 'number' ? Math.floor(ms > 1000 ? ms / 1000 : ms) : 0
  if (sec <= 0) return '00:00'
  return `${Math.floor(sec / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`
}

function buildSearchKeywords(info) {
  const kws = []
  if (info.singer) kws.push({ kw: `${info.name} ${info.singer}`, strict: true })
  if (info.albumName || info.album) kws.push({ kw: `${info.name} ${info.albumName || info.album}`, strict: true })
  kws.push({ kw: info.name, strict: false })
  return kws
}

function checkSongMatch(apiName, apiArtist, musicInfo) {
  const a = cleanText(apiName), b = cleanText(musicInfo.name || '')
  if (!a || !b || (!a.includes(b) && !b.includes(a))) return false
  const singer = cleanText(musicInfo.singer || '')
  if (singer) {
    const c = cleanText(apiArtist || '')
    if (c && !c.includes(singer) && !singer.includes(c)) return false
  }
  return true
}

async function chkszGetUrl(info, quality) {
  const level = CHKSZ_LEVEL[quality] || 'standard'
  const levels = CHKSZ_FALLBACK[level] || ['standard']
  const id = getSongId(info)
  if (!id) throw new Error('缺少ID')
  for (const lv of levels) {
    try {
      const body = await httpGet(`${CHKSZ_API}/163_music?id=${id}&level=${lv}`, { headers: { Referer: 'https://cp.chksz.top/' } })
      if (body?.code === 200 && body.data?.url) return body.data.url
    } catch { continue }
  }
  throw new Error('CHKSZ失败')
}

async function xinghaiGetUrl(platform, info, quality) {
  const source = XINGHAI_SRC[platform]
  const br = XINGHAI_BR[quality] || '320'
  const id = getSongId(info)
  if (!source || !id) throw new Error('参数缺失')
  const body = await httpGet(`${XINGHAI_API}&types=url&source=${source}&id=${encodeURIComponent(id)}&br=${br}`)
  return validateUrl(body?.url)
}

async function suyinQQGetUrl(info, quality) {
  const qqId = getQqSongId(info)
  if (!qqId) throw new Error('缺少QQ歌曲ID')
  const startBr = SUYIN_QQ_BR[quality] || 5
  const brs = [...new Set([startBr, 4, 5, 7])]
  for (const br of brs) {
    try {
      const params = `key=${SUYIN_QQ_KEY}&type=json&br=${br}&n=1&${qqId.type}=${qqId.value}`
      const body = await httpGet(`${SUYIN_QQ_API}?${params}`)
      const url = body?.data?.music || body?.data?.url || extractUrlFromMsg(body?.data?.message || body?.message)
      if (url) return validateUrl(url)
    } catch { continue }
  }
  throw new Error('溯音QQ失败')
}

function extractUrlFromMsg(msg) {
  if (!msg) return null
  const m = msg.match(/https?:\/\/[^\s"'<>]+/)
  return m ? m[0] : null
}

async function suyin163GetUrl(info) {
  const id = getSongId(info)
  if (!id) throw new Error('缺少ID')
  const body = await httpGet(`${SUYIN_163_API}?id=${id}`)
  const data = Array.isArray(body?.data) ? body.data[0] : body?.data
  return validateUrl(data?.url)
}

async function suyinKwGetUrl(info, quality) {
  const br = SUYIN_KW_BR[quality] || 5
  for (const { kw, strict } of buildSearchKeywords(info)) {
    try {
      const body = await httpGet(`${SUYIN_KW_API}?msg=${encodeURIComponent(kw)}&n=1&br=${br}`)
      const url = body?.data?.url || extractUrlFromMsg(body?.data?.message || body?.message)
      if (url && (!strict || checkSongMatch(body?.data?.song || '', body?.data?.singer || '', info)))
        return validateUrl(url)
    } catch { continue }
  }
  throw new Error('溯音酷我失败')
}

async function suyinMgGetUrl(info) {
  for (const { kw, strict } of buildSearchKeywords(info)) {
    try {
      const body = await httpGet(`${SUYIN_MG_API}?gm=${encodeURIComponent(kw)}&n=1&num=1&type=json`)
      if (body?.code === 200 && body?.music_url) {
        if (!strict || checkSongMatch(body.title || '', body.artist || '', info))
          return validateUrl(body.music_url)
      }
    } catch { continue }
  }
  throw new Error('溯音咪咕失败')
}

async function templateGetUrl(platform, info, quality, templates) {
  const tpl = templates[platform]
  if (!tpl) throw new Error('模板不支持该平台')
  const id = getSongId(info)
  if (!id) throw new Error('缺少ID')
  const level = qualityToLevel(quality)
  const url = tpl.replace('{id}', encodeURIComponent(id)).replace('{level}', level)
  const body = await httpGet(url)
  return validateUrl(body?.url || body?.data?.url || extractUrlFromMsg(typeof body === 'string' ? body : JSON.stringify(body)))
}

async function qishuiH5GetUrl(info) {
  const id = getSongId(info)
  if (!id) throw new Error('缺少ID')
  const body = await httpGet(`${QISHUI_H5_API}?track_id=${id}`)
  const songStr = body?.track_player?.video_model
  if (!songStr) throw new Error('汽水H5无数据')
  const song = JSON.parse(songStr).video_list?.[0]
  if (!song?.main_url) throw new Error('汽水H5无链接')
  return validateUrl(song.main_url)
}

const CHAINS = {
  wy: [
    { name: 'CHKSZ', fn: (si, q) => chkszGetUrl(si, q) },
    { name: '星海', fn: (si, q) => xinghaiGetUrl('wy', si, q) },
    { name: '溯音163', fn: (si, q) => suyin163GetUrl(si) },
    { name: '长青', fn: (si, q) => templateGetUrl('wy', si, q, CHANGQING) },
    { name: '念心', fn: (si, q) => templateGetUrl('wy', si, q, NIANXIN) },
  ],
  tx: [
    { name: '溯音QQ', fn: (si, q) => suyinQQGetUrl(si, q) },
    { name: '星海', fn: (si, q) => xinghaiGetUrl('tx', si, q) },
    { name: '长青', fn: (si, q) => templateGetUrl('tx', si, q, CHANGQING) },
    { name: '念心', fn: (si, q) => templateGetUrl('tx', si, q, NIANXIN) },
  ],
  kw: [
    { name: '星海', fn: (si, q) => xinghaiGetUrl('kw', si, q) },
    { name: '溯音酷我', fn: (si, q) => suyinKwGetUrl(si, q) },
    { name: '长青', fn: (si, q) => templateGetUrl('kw', si, q, CHANGQING) },
    { name: '念心', fn: (si, q) => templateGetUrl('kw', si, q, NIANXIN) },
  ],
  kg: [
    { name: '星海', fn: (si, q) => xinghaiGetUrl('kg', si, q) },
    { name: '长青', fn: (si, q) => templateGetUrl('kg', si, q, CHANGQING) },
    { name: '念心', fn: (si, q) => templateGetUrl('kg', si, q, NIANXIN) },
  ],
  mg: [
    { name: '星海', fn: (si, q) => xinghaiGetUrl('mg', si, q) },
    { name: '溯音咪咕', fn: (si, q) => suyinMgGetUrl(si) },
    { name: '长青', fn: (si, q) => templateGetUrl('mg', si, q, CHANGQING) },
    { name: '念心', fn: (si, q) => templateGetUrl('mg', si, q, NIANXIN) },
  ],
  qs: [
    { name: '汽水H5', fn: (si, q) => qishuiH5GetUrl(si) },
  ],
}

async function getUrlWithFallback(platform, songInfo, quality) {
  const chain = CHAINS[platform]
  if (!chain) throw new Error('不支持的平台')

  const key = `url_${platform}_${getSongId(songInfo)}_${quality}`
  const cached = cacheGet(key)
  if (cached) return cached

  const concurrent = chain.slice(0, 3)
  try {
    const url = await Promise.any(concurrent.map(s => s.fn(songInfo, quality).then(validateUrl)))
    cacheSet(key, url)
    return url
  } catch {}

  for (const s of chain.slice(3)) {
    try {
      const url = validateUrl(await s.fn(songInfo, quality))
      cacheSet(key, url)
      return url
    } catch { continue }
  }

  throw new Error('所有音源均失败')
}

on(EVENT_NAMES.request, async ({ action, source, info }) => {
  try {
    switch (action) {
      case 'musicUrl': return await handleMusicUrl(source, info)
      case 'search': return await handleSearch(source, info)
      case 'lyric': return await handleLyric(source, info)
      default: throw new Error('不支持的操作')
    }
  } catch (error) {
    console.error(`[非常刀] ${source} ${action} 错误:`, error.message)
    throw error
  }
})

async function handleMusicUrl(source, info) {
  if (!info?.musicInfo) throw new Error('需要歌曲信息')
  return await getUrlWithFallback(source, info.musicInfo, info.type || '128k')
}

async function handleSearch(source, info) {
  if (!info?.keyword) throw new Error('需要搜索关键词')
  const keyword = info.keyword.trim()
  const limit = Math.min(info.limit || 20, 30)

  switch (source) {
    case 'wy': return await searchChksz(keyword, limit)
    case 'kw': return await searchKuwo(keyword, limit)
    case 'mg': return await searchMigu(keyword, limit)
    case 'qs': return await searchQishui(keyword, limit)
    default: throw new Error('该平台不支持搜索')
  }
}

async function searchChksz(keyword, limit) {
  const body = await httpGet(`${CHKSZ_API}/163_search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`, { headers: { Referer: 'https://cp.chksz.top/' } })
  if (body?.code !== 200) throw new Error('搜索失败')
  const items = Array.isArray(body.data) ? body.data : (body.data?.songs || [])
  if (!items.length) throw new Error('未找到相关歌曲')
  return items.slice(0, limit).map(s => ({
    name: s.name || '', singer: s.artists || '',
    albumName: typeof s.album === 'string' ? s.album : (s.album?.name || ''),
    id: s.id, source: 'wy', interval: formatDuration(s.duration),
    meta: { picture: s.picUrl || '', wy: { id: s.id, url_id: s.id, lyric_id: s.id } }
  }))
}

async function searchKuwo(keyword, limit) {
  const results = []
  for (let page = 1; results.length < limit && page <= 3; page++) {
    try {
      const body = await httpGet(`${SUYIN_KW_API}?msg=${encodeURIComponent(keyword)}&n=${page}`)
      const d = body?.data
      if (!d?.song) break
      results.push({
        name: d.song || '', singer: d.singer || '', albumName: d.album || '',
        id: d.rid || `kw_${Date.now()}_${page}`, source: 'kw',
        interval: formatDuration(d.duration || d.time),
        meta: { kw: { id: d.rid || d.id } }
      })
    } catch { break }
  }
  if (!results.length) throw new Error('未找到相关歌曲')
  return results
}

async function searchMigu(keyword, limit) {
  const results = []
  for (let page = 1; results.length < limit && page <= 3; page++) {
    try {
      const body = await httpGet(`${SUYIN_MG_API}?gm=${encodeURIComponent(keyword)}&n=${page}&num=1&type=json`)
      if (body?.code !== 200 || !body.title) break
      results.push({
        name: body.title || '', singer: body.artist || '', albumName: body.album || '',
        id: `mg_${Date.now()}_${page}`, source: 'mg', interval: body.duration || '00:00',
        meta: { mg: { id: body.id || '' } }
      })
    } catch { break }
  }
  if (!results.length) throw new Error('未找到相关歌曲')
  return results
}

async function handleLyric(source, info) {
  if (source !== 'qs') throw new Error('该平台不支持歌词')
  const id = getSongId(info?.musicInfo || {})
  if (!id) throw new Error('缺少ID')
  const body = await httpGet(`${QISHUI_H5_API}?track_id=${id}`)
  const raw = body?.lyric?.content || ''
  if (!raw) throw new Error('无歌词')
  return { lyric: krcToLrc(raw) }
}

function krcToLrc(krc) {
  const lines = krc.split('\n')
  const result = []
  for (const line of lines) {
    const m = line.match(/^\[(\d+),(\d+)\](.*)$/)
    if (!m) continue
    const startMs = parseInt(m[1])
    const min = Math.floor(startMs / 60000)
    const sec = Math.floor((startMs % 60000) / 1000)
    const ms = Math.floor((startMs % 1000) / 10)
    const text = m[3].replace(/<\d+,\d+,\d+>/g, '')
    if (text.trim()) result.push(`[${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(ms).padStart(2,'0')}]${text}`)
  }
  return result.join('\n')
}

async function searchQishui(keyword, limit) {
  const body = await httpGet(`${QISHUI_SEARCH_API}?keyword=${encodeURIComponent(keyword)}&search_type=music&limit=${limit}&real_offset=0&search_source=qishui`)
  const items = body?.data?.list
  if (!Array.isArray(items) || !items.length) throw new Error('未找到相关歌曲')
  return items.slice(0, limit).map(s => ({
    name: s.title || '', singer: s.author_info?.name || '', albumName: '',
    id: s.item_id, source: 'qs', interval: formatDuration(s.duration),
    img: s.cover_url || '',
    meta: { picture: s.cover_url || '', qs: { id: s.item_id } }
  }))
}

send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: {
    wy: { name: '网易云音乐', type: 'music', actions: ['musicUrl', 'search'], qualitys: ['128k', '320k', 'flac', 'flac24bit'], defaultQuality: 'flac' },
    tx: { name: 'QQ音乐', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
    kw: { name: '酷我音乐', type: 'music', actions: ['musicUrl', 'search'], qualitys: ['128k', '320k', 'flac'] },
    kg: { name: '酷狗音乐', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac', 'flac24bit'] },
    mg: { name: '咪咕音乐', type: 'music', actions: ['musicUrl', 'search'], qualitys: ['128k', '320k', 'flac'] },
    qs: { name: '汽水音乐', type: 'music', actions: ['musicUrl', 'search', 'lyric'], qualitys: ['128k'] },
  }
})

console.log('[非常刀] v4 已加载 - 网易/QQ/酷我/酷狗/咪咕/汽水 多源聚合')

  })

  // [14] 星澜聚合音源_stellarwave_2 | B0-stellarwave-v4.0.0.js
  __load(13, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send, utils, env, version, currentScriptInfo } = globalThis.lx

const _u = (str) => str.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 5)).join('');

const currentScript = currentScriptInfo
  ? currentScriptInfo.rawScript
  : (typeof document !== 'undefined' ? document.currentScript?.textContent || '' : '')

const parseHeader = (str) => {
  const comment = /^\/\*!(?:.|\n)+?\*\//.exec(str)?.[0]
  if (!comment) return {}
  const result = {}
  const pairs = [
    { key: 'tx_cookie', regex: /\*\s*@tx_cookie\s+(.+)/ },
    { key: 'wy_cookie', regex: /\*\s*@wy_cookie\s+(.+)/ },
  ]
  for (const { key, regex } of pairs) {
    const match = regex.exec(comment)
    const val = match?.[1]?.trim()
    result[key] = (!val || val === 'null') ? '' : val
  }
  return result
}

const config = parseHeader(currentScript)
const TX_COOKIE = config.tx_cookie
const WY_COOKIE = config.wy_cookie
const HAS_TX_COOKIE = !!TX_COOKIE
const HAS_WY_COOKIE = !!WY_COOKIE

const MUSIC_QUALITY = JSON.parse(
  HAS_TX_COOKIE && HAS_WY_COOKIE
    ? '{"tx":["128k","320k","flac","flac24bit","hires","atmos","atmos_plus","master"],"wy":["128k","320k","flac","flac24bit","hires","atmos","master"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
    : HAS_TX_COOKIE
      ? '{"tx":["128k","320k","flac","flac24bit","hires","atmos","atmos_plus","master"],"wy":["128k","320k","flac"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
      : HAS_WY_COOKIE
        ? '{"tx":["128k","320k","flac"],"wy":["128k","320k","flac","flac24bit","hires","atmos","master"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
        : '{"tx":["128k","320k","flac"],"wy":["128k","320k","flac"],"kw":["128k","192k","320k","flac","flac24bit"],"kg":["128k","320k","flac","hires","atmos","master"],"mg":["128k","320k","flac"]}'
)

const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY)

const httpFetch = (url, options = { method: 'GET' }) => new Promise((resolve, reject) => {
  const timeout = options.timeout || 10000
  const finalOptions = { ...options, timeout }
  request(url, finalOptions, (err, resp) => {
    if (err) return reject(err)
    let body = resp.body
    if (typeof body === 'string') {
      const trimmed = body.trim()
      if (trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.startsWith('"')) {
        try { body = JSON.parse(trimmed) } catch (e) {}
      }
    }
    resolve({ body, statusCode: resp.statusCode, headers: resp.headers || {} })
  })
})

const md5 = (str) => utils.crypto.md5(str)

const randomGuid = () => {
  const hex = '0123456789abcdef'
  let guid = ''
  for (let i = 0; i < 32; i++) guid += hex[Math.floor(Math.random() * 16)]
  return guid
}

const aesEncrypt = (data, key, iv, mode) => {
  if (!version) mode = mode.split('-').pop()
  return utils.crypto.aesEncrypt(data, mode, key, iv)
}

const buf2hex = (buffer) => {
  return version
    ? utils.buffer.bufToString(buffer, 'hex')
    : [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('')
}

const wyEapi = (url, object) => {
  const eapiKey = 'e82ckenh8dichen8'
  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const digest = md5('nobody' + url + 'use' + text + 'md5forencrypt')
  const data = url + '-36cd479b6b5-' + text + '-36cd479b6b5-' + digest
  return { params: buf2hex(aesEncrypt(data, eapiKey, '', 'aes-128-ecb')).toUpperCase() }
}

const objToForm = (obj) => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&')

const extractUrl = (obj, paths) => {
  const candidates = []
  for (const path of paths) {
    let val = obj
    for (const key of path) {
      if (val == null) { val = undefined; break }
      val = val[key]
    }
    if (Array.isArray(val)) candidates.push(...val)
    else if (val != null) candidates.push(val)
  }
  for (const val of candidates) {
    if (typeof val !== 'string') continue
    if (val.startsWith('http://') || val.startsWith('https://')) return val
    if (val.startsWith('//')) return 'https:' + val
  }
  return ''
}

const cleanUrl = (url) => {
  if (!url) return ''
  const s = String(url).replace(/\\?u0026/gi, '&').replace(/\\&/g, '&').replace(/\$/g, '&')
  const idx = s.indexOf('?')
  return idx > 0 ? s.substring(0, idx) : s
}

const qualityToLevel = (quality) => {
  const map = {
    '128k': 'standard', '192k': 'standard', '320k': 'exhigh',
    'flac': 'lossless', 'flac24bit': 'lossless', 'hires': 'lossless',
    'atmos': 'lossless', 'atmos_plus': 'lossless', 'master': 'lossless',
  }
  return map[quality] || 'standard'
}

const sha256 = (function () {
  const HEX_CHARS = '0123456789abcdef'.split('');
  function Sha256() {
    this.blocks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.h0 = 0x6a09e667; this.h1 = 0xbb67ae85; this.h2 = 0x3c6ef372; this.h3 = 0xa54ff53a;
    this.h4 = 0x510e527f; this.h5 = 0x9b05688c; this.h6 = 0x1f83d9ab; this.h7 = 0x5be0cd19;
    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false; this.first = true;
  }
  Sha256.prototype.update = function (message) {
    if (this.finalized) return;
    const notString = typeof message !== 'string';
    const blocks = this.blocks;
    for (let i = 0; i < message.length; i++) {
      if (this.hashed) {
        this.hashed = false; blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }
      const code = notString ? message[i] : message.charCodeAt(i);
      blocks[this.start >> 2] |= code << (24 - (this.start % 4) * 8);
      this.start++;
      if (this.start === 64) {
        this.block = blocks[16]; this.start = 0; this.hash(); this.hashed = true;
      }
    }
    this.bytes += message.length;
    if (this.bytes > 4294967295) { this.hBytes += this.bytes / 4294967296 << 0; this.bytes = this.bytes % 4294967296; }
    return this;
  };
  Sha256.prototype.finalize = function () {
    if (this.finalized) return;
    this.finalized = true;
    const blocks = this.blocks;
    let i = this.start;
    blocks[16] = this.block;
    blocks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) this.hash();
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };
  Sha256.prototype.hash = function () {
    const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    let a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7;
    const blocks = this.blocks;
    for (let j = 0; j < 64; j++) {
      if (j >= 16) {
        const w0 = blocks[j - 15], w1 = blocks[j - 2];
        const s0 = ((w0 >>> 7) | (w0 << 25)) ^ ((w0 >>> 18) | (w0 << 14)) ^ (w0 >>> 3);
        const s1 = ((w1 >>> 17) | (w1 << 15)) ^ ((w1 >>> 19) | (w1 << 13)) ^ (w1 >>> 10);
        blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1;
      }
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ ((~e) & g);
      const temp1 = h + S1 + ch + K[j] + (blocks[j] >>> 0);
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = S0 + maj;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    this.h0 = (this.h0 + a) >>> 0; this.h1 = (this.h1 + b) >>> 0;
    this.h2 = (this.h2 + c) >>> 0; this.h3 = (this.h3 + d) >>> 0;
    this.h4 = (this.h4 + e) >>> 0; this.h5 = (this.h5 + f) >>> 0;
    this.h6 = (this.h6 + g) >>> 0; this.h7 = (this.h7 + h) >>> 0;
  };
  Sha256.prototype.hex = function () {
    this.finalize();
    const { h0, h1, h2, h3, h4, h5, h6, h7 } = this;
    return [h0, h1, h2, h3, h4, h5, h6, h7].map(x =>
      HEX_CHARS[(x >> 28) & 0x0F] + HEX_CHARS[(x >> 24) & 0x0F] + HEX_CHARS[(x >> 20) & 0x0F] + HEX_CHARS[(x >> 16) & 0x0F] +
      HEX_CHARS[(x >> 12) & 0x0F] + HEX_CHARS[(x >> 8) & 0x0F] + HEX_CHARS[(x >> 4) & 0x0F] + HEX_CHARS[x & 0x0F]
    ).join('');
  };
  return function (message) { return new Sha256().update(message).hex(); };
})();

const HELLO_WORLD_API_KEY = 'lxmusic';
const HELLO_WORLD_SECRET_KEY = 'JaJ?a7Nwk_Fgj?2o:znAkst';
const HELLO_WORLD_SCRIPT_MD5 = '1888f9865338afe6d5534b35171c61a4';
const HELLO_WORLD_API_URL = _u('cookn5**33)gshpnd^)si((adln3n');
const helloWorldSign = (requestPath) => sha256(requestPath + HELLO_WORLD_SCRIPT_MD5 + HELLO_WORLD_SECRET_KEY);
const HYW_API_BASE = _u('cook5**,+.)24),3/)42');
const HYW_CARD_KEY = 'MOLAN-BAIJI';

const TX_FILE_CONFIG = {
  '128k': { s: 'M500', e: '.mp3' }, '320k': { s: 'M800', e: '.mp3' },
  flac: { s: 'F000', e: '.flac' }, flac24bit: { s: 'AI00', e: '.flac' },
  hires: { s: 'AI00', e: '.flac' }, atmos: { s: 'AI00', e: '.flac' },
  atmos_plus: { s: 'AI00', e: '.flac' }, master: { s: 'AI00', e: '.flac' },
}
const WY_LEVEL_MAP = { '128k': 'standard', '320k': 'exhigh', flac: 'lossless', flac24bit: 'hires', hires: 'hires', atmos: 'sky', master: 'jymaster' }
const KW_LEVEL_MAP = { '128k': '128k', '192k': '128k', '320k': '320k', flac: 'lossless', flac24bit: 'lossless' }
const KG_LEVEL_MAP = { '128k': 'standard', '192k': 'standard', '320k': 'exhigh', flac: 'lossless', flac24bit: 'hires', hires: 'hires', atmos: 'atmos', atmos_plus: 'atmos', master: 'clear' }
const KW_STREAM_LEVEL_MAP = { '128k': '128k', '192k': '128k', '320k': '320k', flac: 'flac', flac24bit: 'flac', hires: 'hires', atmos: 'atmos', atmos_plus: 'atmos_plus', master: 'master' }

const FISH_DOMAIN = 'music.gdstudio.xyz'
const FISH_VERSION = '20260510'
const fishSign = async (secret) => {
  const timeRes = await httpFetch(_u('cookn5**') + FISH_DOMAIN + '/time', { method: 'GET', timeout: 10000 })
  const timeStr = String(Number(timeRes.body) || Date.now()).slice(0, 9)
  const signInput = FISH_DOMAIN + '|' + FISH_VERSION + '|' + timeStr + '|' + secret
  return md5(signInput).slice(-8).toUpperCase()
}
const fishPost = async (params, secret) => {
  const sign = await fishSign(secret)
  params.s = sign
  const body = objToForm(params)
  const res = await httpFetch(_u('cookn5**') + FISH_DOMAIN + '/api.php', {
    method: 'POST', timeout: 15000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: _u('cookn5**') + FISH_DOMAIN,
      Referer: _u('cookn5**') + FISH_DOMAIN + '/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  })
  return res.body
}

const CACHE_TTL_MS = 21600000
const CACHE_MAX_SIZE = 300
const urlCache = new Map()
const getCachedUrl = (key) => {
  const entry = urlCache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) { urlCache.delete(key); return null }
  urlCache.delete(key); urlCache.set(key, entry)
  return entry.url
}
const setCachedUrl = (key, url) => {
  if (urlCache.has(key)) urlCache.delete(key)
  urlCache.set(key, { url, timestamp: Date.now() })
  if (urlCache.size > CACHE_MAX_SIZE) {
    const oldest = urlCache.keys().next().value
    if (oldest) urlCache.delete(oldest)
  }
}
const buildCacheKey = (source, songId, quality) => `${source}_${songId}_${quality}`

const getQQExploit = async (songId, quality, musicInfo) => {
  const songmid = songId || musicInfo?.songmid || musicInfo?.id
  if (!songmid) throw new Error('QQ越权: 缺少 songmid')
  const mediaMid = musicInfo?.mediaMid || musicInfo?.strMediaMid || musicInfo?.media_mid || ''
  const prefixMap = { '128k':'M500','192k':'M800','320k':'M800','flac':'F000','flac24bit':'RS01','hires':'RS01','atmos':'atmosphere','atmos_plus':'atmosphere','master':'AIM00' }
  const prefix = prefixMap[quality] || 'M800'
  const extMap = { 'M500':'mp3','M800':'mp3','F000':'flac','RS01':'flac','AIM00':'mflac','atmosphere':'flac' }
  const ext = extMap[prefix] || 'mp3'
  const midForFile = mediaMid || songmid
  const qqKey = '1984LZXvCR'
  const qqUin = '1234567890'
  const pgv_pvid = Math.floor(Math.random() * 10000000000).toString()
  const qqCookie = `qm_keyst=${qqKey}; uin=o${qqUin}; pgv_pvid=${pgv_pvid}; qqmusic_key=${qqKey}; qqmusic_uin=o${qqUin}; psrf_qqaccess_token=${qqKey}; ts_uid=${pgv_pvid}; psi=${pgv_pvid}`
  const filename = `${prefix}${midForFile}.${ext}`
  const bodyA = {
    comm: { ct: 19, cv: 0, guid: pgv_pvid, tmeAppID: 'qqmusic', qq: qqUin },
    hot: { method: 'CgiGetHotVkey', module: 'music.vkey.GetEVkey', param: { filename: [filename], songmid: [songmid] } },
    ekey: { method: 'GetEkey', module: 'music.vkey.GetEVkey', param: { finfo: [{ filename, mid: midForFile || '0' }] } }
  }
  try {
    const resp = await httpFetch(_u('cookn5**po)t)ll)^jh*^bd(]di*hpnd^p)a^b'), {
      method: 'POST', timeout: 8000,
      headers: { 'Content-Type': 'application/json', 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Cookie': qqCookie },
      body: JSON.stringify(bodyA)
    })
    const d = resp.body
    if (d?.hot?.data?.urls?.[0]?.purl) return _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*') + d.hot.data.urls[0].purl
  } catch (e) {}

  const variants = [
    { filename: `${prefix}${songmid}${songmid}.${ext}`, uin: qqUin },
    { filename: `${prefix}${songmid}.${ext}`, uin: qqUin },
    { filename: `${prefix}${songmid}${songmid}.${ext}`, uin: '' },
    { filename: `${prefix}${songmid}.${ext}`, uin: '' },
  ]
  for (const v of variants) {
    try {
      const param = { filename: [v.filename], songmid: [songmid], songtype: [0], uin: v.uin, loginflag: 1, platform: '23', firstlogin: 1, newver: 1, nohash: 0, cms: 0 }
      const apiData = JSON.stringify({
        comm: { uin: v.uin ? parseInt(v.uin) : 0, format: 'json', ct: 23, cv: 0, ...(v.uin ? { qq: v.uin } : {}) },
        req_0: { module: 'vkey.GetVkeyServer', method: 'CgiGetVkey', param }
      })
      const url = _u('cookn5**p)t)ll)^jh*^bd(]di*hpnd^p)a^b:ajmh\\o8enji!_\\o\\8') + encodeURIComponent(apiData)
      const resp = await httpFetch(url, {
        method: 'GET', timeout: 8000,
        headers: { 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Cookie': qqCookie }
      })
      const d = resp.body
      if (d?.code === 0 && d?.req_0?.data?.midurlinfo?.[0]?.purl) {
        const sip = d.req_0.data.sip?.[0] || _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*')
        return sip + d.req_0.data.midurlinfo[0].purl
      }
    } catch (e) {}
  }
  throw new Error('QQ越权全部失败')
}

const getYgkingTx = async (songId, quality, musicInfo) => {
  const mid = musicInfo?.songmid || musicInfo?.strMediaMid || musicInfo?.mediaMid || songId
  if (!mid) throw new Error('ygking: 缺少 mid')
  const qMap = { '128k':'128','192k':'320','320k':'320','flac':'flac','flac24bit':'hires','hires':'hires','master':'master','atmos':'master','atmos_plus':'master' }
  const q = qMap[quality] || '320'
  const url = _u('cookn5**\\kd)tbfdib)^i*\\kd*njib*pmg:hd_8') + encodeURIComponent(mid) + _u('!lp\\gdot8') + q
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 0 && d?.data?.[mid]) return d.data[mid]
  throw new Error('ygking 失败')
}

const getCanxiang = async (songId, quality, musicInfo) => {
  const id = musicInfo?.songId || musicInfo?.id || songId
  const name = musicInfo?.songName || musicInfo?.name || ''
  const singer = musicInfo?.singer || ''
  const qMap = { '128k':'128k','192k':'320k','320k':'320k','flac':'flac','flac24bit':'hires','hires':'hires','master':'jymaster','atmos':'jymaster','atmos_plus':'jymaster' }
  const type = qMap[quality] || '320k'
  const token = 'canxiang_token_2026'
  const params = { token, type }
  if (id) params.id = String(id)
  else if (name) { params.msg = name + (singer ? ' ' + singer : ''); params.n = 1 }
  else throw new Error('残像: 缺少 id 或歌名')
  const query = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&')
  const url = _u('cookn5**\\kd)^\\isd\\ib)^i*\\kd*rtthpnd^:') + query
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.data?.url) return d.data.url
  throw new Error('残像 失败')
}

const getXinghai = async (platform, songId, quality, musicInfo) => {
  const sourceMap = { kw: 'kw', kg: 'kg', mg: 'migu' }
  const source = sourceMap[platform]
  if (!source) throw new Error('星海聚合: 不支持平台 ' + platform)
  const id = platform === 'kg' ? (musicInfo?.hash || songId) : (musicInfo?.songmid || musicInfo?.rid || songId)
  if (!id) throw new Error('星海聚合: 缺少 id')
  const name = musicInfo?.name || musicInfo?.songName || ''
  const singer = musicInfo?.singer || ''
  const qMap = { '128k':'128kmp3','192k':'320kmp3','320k':'320kmp3','flac':'flac','flac24bit':'hires','hires':'hires','master':'flac','atmos':'flac','atmos_plus':'flac' }
  const qualityParam = qMap[quality] || '320kmp3'
  const url = _u('cookn5**\\kd)sdibc\\d)^jh*gs*\\kd*:njpm^`8') + source + _u('!i\\h`8') + encodeURIComponent(name + ' ' + singer) + _u('!njibhd_8') + encodeURIComponent(id) + _u('!lp\\gdot8') + qualityParam
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.url) return d.url
  throw new Error('星海聚合 失败')
}
const getXinghaiKw = (s, q, m) => getXinghai('kw', s, q, m)
const getXinghaiKg = (s, q, m) => getXinghai('kg', s, q, m)
const getXinghaiMg = (s, q, m) => getXinghai('mg', s, q, m)

const getYunmgeKw = async (songId, quality, musicInfo) => {
  const id = musicInfo?.rid || musicInfo?.songmid || songId
  if (!id) throw new Error('yunmge: 缺少 id')
  const brMap = { '128k':128, '192k':192, '320k':320, 'flac':2000, 'flac24bit':2000, 'hires':4000, 'master':4000 }
  const wantBr = brMap[quality] || 320
  const url = _u('cookn5**\\kd)tpihb`)^jh*fprj:f`t8tpihb`Zf`t!ojf`i8tpihb`Zojf`i!d_8') + encodeURIComponent(id)
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.data?.all_bitrates) {
    const list = d.data.all_bitrates
    for (const br of [4000, 2000, 320, 192, 128]) {
      if (br < wantBr) continue
      const item = list.find(b => b.bitrate === br || String(b.bitrate) === String(br))
      if (item && item.play_url) return item.play_url
    }
    const fallback = list.find(b => b.play_url)
    if (fallback) return fallback.play_url
  }
  throw new Error('yunmge 失败')
}

const getNianxinKg = async (songId, quality, musicInfo) => {
  const hash = musicInfo?.hash || musicInfo?.songmid || songId
  if (!hash) throw new Error('念心: 缺少 hash')
  const levelMap = { '128k':'128kmp3','192k':'320kmp3','320k':'320kmp3','flac':'2000kflac','flac24bit':'4000kflac','hires':'hires','master':'4000kflac','atmos':'4000kflac','atmos_plus':'4000kflac' }
  const level = levelMap[quality] || '320kmp3'
  const url = _u('cookn5**h^k)id\\isdisu)^jh*fbll*fb)kck:d_8') + encodeURIComponent(hash) + _u('!g`q`g8') + level + _u('!otk`8hk.')
  const resp = await httpFetch(url, { method: 'GET', timeout: 8000 })
  const d = resp.body
  if (d?.code === 200 && d?.url) return d.url
  if (typeof d === 'string' && d.startsWith('http')) return d
  throw new Error('念心 失败')
}

const extractFFURL = (d) => {
  if (!d || typeof d !== 'object') return ''
  if (typeof d.url === 'string' && d.url.startsWith('http')) return d.url
  if (d.data) {
    if (typeof d.data === 'string' && d.data.startsWith('http')) return d.data
    if (typeof d.data.url === 'string' && d.data.url.startsWith('http')) return d.data.url
    if (typeof d.data.play_url === 'string' && d.data.play_url.startsWith('http')) return d.data.play_url
    if (d.data.vipmusic && typeof d.data.vipmusic.url === 'string' && d.data.vipmusic.url.startsWith('http')) return d.data.vipmusic.url
    if (Array.isArray(d.data) && d.data[0]) {
      if (typeof d.data[0].url === 'string' && d.data[0].url.startsWith('http')) return d.data[0].url
      if (typeof d.data[0] === 'string' && d.data[0].startsWith('http')) return d.data[0]
    }
  }
  return ''
}
const getFFAPI = async (songmid, quality, musicInfo) => {
  const src = (musicInfo && musicInfo.source) || ''
  const id = songmid || ''
  if (!id) return ''
  let page = ''
  if (src === 'tx') page = 'https://y.qq.com/n/ryqq/songDetail/' + id
  else if (src === 'wy') page = 'https://music.163.com/song?id=' + id
  else if (src === 'kw') page = 'https://www.kuwo.cn/play_detail/' + id
  else if (src === 'kg') page = 'https://www.kugou.com/song/#hash=' + id
  else if (src === 'mg') page = 'https://music.migu.cn/v3/music/song/' + id
  else return ''
  const res = await httpFetch('https://ffapi.cn/int/v2/songurl?url=' + encodeURIComponent(page), { method: 'GET', timeout: 10000 })
  const d = res && res.body
  if (typeof d === 'string') {
    try { return extractFFURL(JSON.parse(d)) } catch (e) { return '' }
  }
  return extractFFURL(d)
}

const TX_BACKENDS = [
  {
    name: 'QQ官方',
    fetch: async (songmid, quality) => {
      const fileInfo = TX_FILE_CONFIG[quality]
      if (!fileInfo) throw new Error('不支持的音质')
      const guid = randomGuid()
      const file = fileInfo.s + songmid + fileInfo.e
      const reqData = {
        req_0: {
          module: 'vkey.GetVkeyServer', method: 'CgiGetVkey',
          param: { filename: [file], guid, songmid: [songmid], songtype: [0], uin: '0', loginflag: HAS_TX_COOKIE ? 1 : 0, platform: '20' },
        },
        loginUin: '0',
        comm: { uin: '0', format: 'json', ct: 24, cv: 0 },
      }
      const headers = { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0', Referer: _u('cookn5**t)ll)^jh*') }
      if (HAS_TX_COOKIE) headers.Cookie = TX_COOKIE
      const res = await httpFetch(_u('cookn5**p)t)ll)^jh*^bd(]di*hpnd^p)a^b'), { method: 'POST', headers, body: JSON.stringify(reqData) })
      const d = res.body
      if (d?.req_0?.data?.midurlinfo?.[0]?.purl) {
        const sip = d.req_0.data.sip || [_u('cookn5**dnpm`)nom`\\h)llhpnd^)ll)^jh*')]
        return sip[Math.floor(Math.random() * sip.length)] + d.req_0.data.midurlinfo[0].purl
      }
      throw new Error('QQ官方: 无数据')
    },
  },
  {
    name: '星海主后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8ll!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (d?.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: 'HelloWorld QQ',
    fetch: async (songmid, quality, musicInfo) => {
      const keyword = encodeURIComponent(musicInfo?.name || musicInfo?.songName || '')
      if (!keyword) throw new Error('HelloWorld QQ: 缺少歌曲名')
      const qMap = { '128k': '0', '320k': '1', 'flac': '4', 'master': '5' }
      const type = qMap[quality] || '1'
      const url = _u('cookn5**\\)\\\\)^\\]*ll)hpnd^:hnb8') + keyword + _u('!i8,!otk`8') + type
      const res = await httpFetch(url, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } })
      const d = res.body
      if (d?.data?.music?.startsWith?.('http')) return d.data.music
      if (d?.playUrl?.startsWith?.('http')) return d.playUrl
      if (d?.url?.startsWith?.('http')) return d.url
      if (d?.data?.url?.startsWith?.('http')) return d.data.url
      throw new Error('HelloWorld QQ: 无有效链接')
    },
  },
  {
    name: 'vkeys',
    fetch: async (songmid, quality) => {
      const qualityMap = { '128k': '8', '320k': '9', flac: '10', flac24bit: '16', hires: '14', atmos: '13', atmos_plus: '12', master: '11' }
      const q = qualityMap[quality]
      if (!q) throw new Error('vkeys 不支持的音质')
      const res = await httpFetch(_u('cookn5**\\kd)qf`tn)^i*q-*hpnd^*o`i^`io*b`opmg:hd_8') + songmid + '&quality=' + q, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' } })
      const d = res.body
      if (d?.data?.url) return d.data.url
      if (d?.url) return d.url
      throw new Error('vkeys: 无数据')
    },
  },
  {
    name: '317ak',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': '5', '320k': '6', flac: '8', flac24bit: '7', hires: '9', atmos: '10', atmos_plus: '10', master: '10' }
      const br = brMap[quality] || '5'
      const res = await httpFetch(_u('cookn5**\\kd).,2\\f)^i*\\kd*tditp`*lltditp`:^f`t8UF21LE>DC0KKD>EJJSPC!d8') + songmid + '&br=' + br + '&type=json&lrc=1', { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' } })
      const url = extractUrl(res.body, [['url'], ['data', 'url']])
      if (url) return url
      throw new Error('317ak: 无数据')
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*os)kck:d_8') + songmid + '&level=' + quality + '&type=mp3', { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d?.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: 'FishAPI',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': 128, '320k': 320, flac: 740, flac24bit: 999 }
      const br = brMap[quality]
      if (!br) throw new Error('FishAPI 不支持的音质')
      const result = await fishPost({ types: 'url', id: songmid, source: 'qq', br }, encodeURIComponent(songmid))
      const url = result && result.url ? cleanUrl(String(result.url)) : ''
      if (url.startsWith('http')) return url
      throw new Error('FishAPI: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=tx&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY } })
      const d = res.body
      if (d?.code === 200) { if (d.url) return d.url; if (d.data?.url) return d.data.url }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: 'QQ越权', fetch: getQQExploit },
  { name: 'ygking QQ', fetch: getYgkingTx },
  { name: 'FFAPI', fetch: getFFAPI },
]

const WY_BACKENDS = [
  {
    name: '网易云官方',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const targetUrl = _u('cookn5**dio`ma\\^`.)hpnd^),1.)^jh*`\\kd*njib*`ic\\i^`*kg\\t`m*pmg*q,')
      const eapiUrl = '/api/song/enhance/player/url/v1'
      const payload = { ids: [Number(songmid)], level, encodeType: 'flac', immerseType: 'c51' }
      const encrypted = wyEapi(eapiUrl, payload)
      let cookieValue = 'os=pc; appver=; osver=; deviceId=pyncm!'
      if (HAS_WY_COOKIE) cookieValue = WY_COOKIE + '; ' + cookieValue
      const res = await httpFetch(targetUrl, {
        method: 'POST', timeout: 10000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/2.10.2.200154',
          Referer: _u('cookn5**hpnd^),1.)^jh*'),
          Cookie: cookieValue,
        },
        body: 'params=' + encrypted.params,
      })
      const d = res.body
      if (d?.data?.[0]?.url && !d.data[0].freeTrialInfo) return d.data[0].url
      if (d?.data?.[0]?.freeTrialInfo) throw new Error('VIP歌曲仅试听（配置Cookie后可用完整版）')
      throw new Error('网易云官方: 无数据')
    },
  },
  {
    name: 'ikun网易云',
    fetch: async (songmid, quality, musicInfo) => {
      const songId = musicInfo?.hash ?? songmid
      const res = await httpFetch(_u('cookn5**^)rrrr`])ojk*hpnd^*pmg'), {
        method: 'POST', timeout: 10000,
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'lx-music-request/2.9.0', 'X-Api-Key': '' },
        body: JSON.stringify({ source: 'wy', musicId: songId, quality }),
        follow_max: 5,
      })
      const d = res.body
      if (!d || isNaN(Number(d.code))) throw new Error('ikun网易云: 未知错误')
      if (d.code === 200 && d.url) return d.url
      if (d.code === 403) throw new Error('ikun网易云: 鉴权失败')
      if (d.code === 429) throw new Error('ikun网易云: 请求过速')
      throw new Error('ikun网易云: ' + (d.message || '获取URL失败'))
    },
  },
  {
    name: '笒鬼鬼',
    fetch: async (songmid, quality) => {
      const level = WY_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**\\kd)^`ibpdbpd)^i*\\kd*i`o`\\n`*hpnd^Zq,)kck:d_8') + songmid + '&type=json&level=' + level, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' } })
      const d = res.body
      if (d?.data?.url) return d.data.url
      if (d?.url) return d.url
      throw new Error('笒鬼鬼: 无数据')
    },
  },
  {
    name: '星海主后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8i`o`\\n`!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (d?.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cook5**hpnd^)isdisu)^jh*rt)kck:d_8') + songmid + '&level=' + quality + '&type=mp3', { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d?.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: 'FishAPI',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': 128, '320k': 320, flac: 740, flac24bit: 999 }
      const br = brMap[quality]
      if (!br) throw new Error('FishAPI 不支持的音质')
      const result = await fishPost({ types: 'url', id: songmid, source: 'netease', br }, encodeURIComponent(songmid))
      const url = result && result.url ? cleanUrl(String(result.url)) : ''
      if (url.startsWith('http')) return url
      throw new Error('FishAPI: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=wy&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY } })
      const d = res.body
      if (d?.code === 200) { if (d.url) return d.url; if (d.data?.url) return d.data.url }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: '残像 WY', fetch: (songmid, quality) => getCanxiang(songmid, quality, { songId: songmid, songName: '', singer: '' }) },
  { name: 'FFAPI', fetch: getFFAPI },
]

const KW_BACKENDS = [
  {
    name: '酷我流媒体',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KW_STREAM_LEVEL_MAP[quality] || 'master'
      const songIdTmp = musicInfo?.songmid || musicInfo?.id || musicInfo?.hash || musicInfo?.songId || musicInfo?.musicId || songmid
      if (!songIdTmp) throw new Error('酷我流媒体: 找不到歌曲ID')
      const songId = String(songIdTmp).trim()
      return _u('cook5**,20)-2),11)-.1534-3*frnom`\\h:d_8') + encodeURIComponent(songId) + '&level=' + level + '&stream=1'
    },
  },
  {
    name: '星海主后端',
    fetch: async (songmid, quality, musicInfo) => {
      const name = musicInfo?.name || '', singer = musicInfo?.singer || '', interval = musicInfo?.interval || '', albumName = musicInfo?.albumName || musicInfo?.album || ''
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8fr!i\\h`8') + encodeURIComponent(name) + '&singer=' + encodeURIComponent(singer) + '&songmid=' + encodeURIComponent(songmid) + '&interval=' + encodeURIComponent(interval) + '&albumName=' + encodeURIComponent(albumName) + '&quality=' + quality, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (d?.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '酷我官方',
    fetch: async (songmid, quality, musicInfo) => {
      const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' }
      const br = brMap[quality]
      if (!br) throw new Error('酷我官方 不支持的音质')
      let rid = musicInfo?.rid || ''
      if (!rid && musicInfo?.musicrid) rid = String(musicInfo.musicrid).replace(/^MUSIC_/, '')
      if (!rid) rid = songmid
      const res = await httpFetch(_u('cookn5**hj]d)fprj)^i*hj]d)n:a8r`]!md_8') + rid + '&br=' + br + '&source=jiakong&type=convert_url_with_sign&surl=1', { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36' } })
      const d = res.body
      if (d?.code === 200 && d?.data?.surl) return d.data.surl
      if (d?.code === 200 && d?.data?.url) return d.data.url
      throw new Error('酷我官方: 无数据')
    },
  },
  {
    name: '酷我手机版',
    fetch: async (songmid, quality) => {
      const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' }
      const br = brMap[quality]
      if (!br) throw new Error('酷我手机版 不支持的音质')
      const res = await httpFetch(_u('cookn5**ihj]d)fprj)^i*hj]d)n:a8r`]!pn`m8+!njpm^`8frkg\\t`mc_Z\\mZ/).)+)3Zod\\i]\\jZO,<Zldmpd)\\kf!otk`8^jiq`moZpmgZrdocZndbi!md_8') + songmid + '&br=' + br, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36' } })
      const d = res.body
      if (d?.code === 200 && d?.data?.url) return d.data.url
      if (d?.code === 200 && d?.data?.surl) return d.data.surl
      throw new Error('酷我手机版: 无数据')
    },
  },
  {
    name: '念心直链',
    fetch: async (songmid, quality) => {
      const level = qualityToLevel(quality)
      const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*fr)kck:d_8') + songmid + '&level=' + level + '&type=mp3', { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      if (d?.url) return d.url
      throw new Error('念心直链: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=kw&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY } })
      const d = res.body
      if (d?.code === 200) { if (d.url) return d.url; if (d.data?.url) return d.data.url }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: 'yunmge酷我', fetch: getYunmgeKw },
  { name: '星海酷我', fetch: getXinghaiKw },
  { name: 'FFAPI', fetch: getFFAPI },
]

const KG_BACKENDS = [
  {
    name: '星海主后端',
    fetch: async (songmid, quality, musicInfo) => {
      const hash = musicInfo?.hash || (musicInfo?._types?.[quality]?.hash) || songmid
      const albumId = musicInfo?.albumId || ''
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8fb!lp\\gdot8') + quality + '&songmid=' + (musicInfo?.songmid || songmid) + '&albumId=' + albumId + '&mainHash=' + hash + '&hash=' + hash, { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (d?.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '长青海棠',
    fetch: async (songmid, quality, musicInfo) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const hash = musicInfo?.hash || musicInfo?.songmid || songmid
      const res = await httpFetch(_u('cookn5**hpnd^n`mq`m)c\\do\\ibr)^^*q,*hpnd^*m`njgq`(pmg'), { method: 'POST', timeout: 10000, headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' }, body: JSON.stringify({ source: 'kg', rid: hash, level }) })
      const d = res.body
      if (d?.code === 0 && d?.data?.url) return d.data.url
      throw new Error('长青海棠: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: '酷狗官方',
    fetch: async (songmid, quality, musicInfo) => {
      const hash = musicInfo?.hash || songmid
      const albumId = musicInfo?.albumId || ''
      const res = await httpFetch(_u('cookn5**rrr\\kd)fpbjp)^jh*tt*di_`s)kck:m8kg\\t*b`o_\\o\\!c\\nc8') + hash + '&platid=4&album_id=' + albumId + '&mid=00000000000000000000000000000000', { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Referer: _u('cookn5**rrr)fpbjp)^jh*') } })
      const d = res.body
      if (d?.status === 1 && d?.data?.play_backup_url) return d.data.play_backup_url
      if (d?.status === 1 && d?.data?.play_url) return d.data.play_url
      throw new Error('酷狗官方: 无数据')
    },
  },
  {
    name: '念心KG',
    fetch: async (songmid, quality) => {
      const level = KG_LEVEL_MAP[quality] || 'standard'
      const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*fb)kck:d_8') + songmid + '&level=' + level + '&type=mp3', { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (d?.code === 200 && d.url) return d.url
      if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d
      throw new Error('念心KG: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=kg&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY } })
      const d = res.body
      if (d?.code === 200) { if (d.url) return d.url; if (d.data?.url) return d.data.url }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: '星海酷狗', fetch: getXinghaiKg },
  { name: '念心酷狗', fetch: getNianxinKg },
  { name: 'FFAPI', fetch: getFFAPI },
]

const MG_BACKENDS = [
  {
    name: '星海主后端',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8hdbp!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } })
      const d = res.body
      if (d?.code === 200 && d.url) return d.url
      throw new Error('星海主后端: ' + (d?.msg || '无数据'))
    },
  },
  {
    name: 'Migu直接源',
    fetch: async (songmid, quality) => {
      const level = qualityToLevel(quality)
      const res = await httpFetch(_u('cookn5**hpnd^)hdbp)^i*q.*\\kd*hpnd^*\\p_djKg\\t`m*b`oKg\\tDiaj:^jktmdbcoD_8') + encodeURIComponent(String(songmid)) + '&level=' + level, { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', Referer: _u('cookn5**hpnd^)hdbp)^i*') } })
      const d = res.body
      if (d?.data?.playUrl) return d.data.playUrl
      if (d?.url) return d.url
      if (d?.playUrl) return d.playUrl
      throw new Error('Migu直接源: 无数据')
    },
  },
  {
    name: 'Migu API',
    fetch: async (songmid, quality) => {
      const levelMap = { '128k': 'PQ', '320k': 'HQ', flac: 'SQ', flac24bit: 'ZQ' }
      const level = levelMap[quality] || 'HQ'
      const res = await httpFetch(_u('cookn5**\\kk)^)ia)hdbp)^i*HDBPH-)+*nom\\o`bt*gdno`i(pmg*q-)-:^jktmdbcoD_8') + encodeURIComponent(String(songmid)) + '&quality=' + level, { method: 'GET', timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36', Referer: _u('cookn5**\\kk)^)ia)hdbp)^i*') } })
      const d = res.body
      if (d?.data?.url) return d.data.url
      if (d?.url) return d.url
      if (d?.data?.playUrl) return d.data.playUrl
      throw new Error('Migu API: 无数据')
    },
  },
  {
    name: 'HYWmusic',
    fetch: async (songmid, quality) => {
      const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=mg&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json', 'X-Card-Key': HYW_CARD_KEY } })
      const d = res.body
      if (d?.code === 200) { if (d.url) return d.url; if (d.data?.url) return d.data.url }
      throw new Error('HYWmusic: 无数据')
    },
  },
  { name: '星海咪咕', fetch: getXinghaiMg },
  { name: 'FFAPI', fetch: getFFAPI },
]

const handleGetMusicUrl = async (source, musicInfo, quality) => {
  const songId = musicInfo.hash ?? musicInfo.songmid ?? musicInfo.id
  if (!songId) throw new Error('无法获取歌曲ID')

  const supported = MUSIC_QUALITY[source] || ['128k']
  const targetQuality = supported.includes(quality) ? quality : (supported[supported.length - 1] || '128k')

  const cacheKey = buildCacheKey(source, songId, targetQuality)
  const cached = getCachedUrl(cacheKey)
  if (cached) {
    console.log(`[星澜] 缓存命中: ${source} ${songId} ${targetQuality}`)
    return cached
  }

  const backends = { tx: TX_BACKENDS, wy: WY_BACKENDS, kw: KW_BACKENDS, kg: KG_BACKENDS, mg: MG_BACKENDS }[source]
  if (!backends) throw new Error('未知音源: ' + source)

  const errors = []
  const total = backends.length

  try {
    const result = await Promise.any(backends.slice(0, 3).map(async (backend) => {
      const url = await backend.fetch(songId, targetQuality, musicInfo)
      if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) return url
      throw new Error(`${backend.name} 返回无效URL`)
    }))
    setCachedUrl(cacheKey, result)
    return result
  } catch (err) {
    if (err.errors) err.errors.forEach(e => errors.push(e.message || e))
    else errors.push(err.message)
  }

  for (const backend of backends.slice(3)) {
    try {
      const url = await backend.fetch(songId, targetQuality, musicInfo)
      if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
        setCachedUrl(cacheKey, url)
        return url
      }
      errors.push(`${backend.name}: 返回无效URL`)
    } catch (e) {
      errors.push(`${backend.name}: ${e.message}`)
    }
  }

  throw new Error(`所有后端均失败（共 ${total} 个）\n${errors.join('\n')}`)
}

on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl':
      return handleGetMusicUrl(source, info.musicInfo, info.type)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
    default:
      return Promise.reject('action not support: ' + action)
  }
})

const musicSources = {}
MUSIC_SOURCE.forEach((item) => {
  const nameMap = { tx: 'QQ音乐', wy: '网易云音乐', kw: '酷我音乐', kg: '酷狗音乐', mg: '咪咕音乐' }
  musicSources[item] = {
    name: nameMap[item] || item,
    type: 'music',
    actions: ['musicUrl'],
    qualitys: MUSIC_QUALITY[item],
  }
})

send(EVENT_NAMES.inited, { status: true, openDevTools: false, sources: musicSources })

console.log('[星澜] v4.0.0 聚合音源已加载完成')
console.log('[星澜] 平台: ' + MUSIC_SOURCE.join(', '))
console.log('[星澜] QQ后端数: ' + TX_BACKENDS.length + ' | 网易: ' + WY_BACKENDS.length + ' | 酷我: ' + KW_BACKENDS.length + ' | 酷狗: ' + KG_BACKENDS.length + ' | 咪咕: ' + MG_BACKENDS.length)
console.log('[星澜] 缓存已启用，TTL: ' + (CACHE_TTL_MS / 3600000) + ' 小时，容量: ' + CACHE_MAX_SIZE)
console.log('[星澜] 已合并墨澜 v2.3.3 修复（kw/kg），保留核心后端: QQ越权, ygking, 残像WY, 星海聚合, yunmge, 念心')

  })

  // [15] 全豆要_聚合音源_2 | B0-全豆要-聚合音源-V4.1.js
  __load(14, function (globalThis, window, self, top, parent, lx, process) {
const CACHE_TTL_MS = 21600000;
const CACHE_MAX_SIZE = 500;
const HTTP_URL_REGEX = /^https?:\/\//i;

const XINGHAI_MAIN_API = "https://music-api.gdstudio.xyz/api.php?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light";
const XINGHAI_BACKUP_API = "https://music-dl.sayqz.com/api/";
const SUYIN_QQ_API = "https://oiapi.net/api/QQ_Music";
const SUYIN_QQ_KEY = "oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575";
const SUYIN_163_API = "https://oiapi.net/api/Music_163";
const SUYIN_KUWO_API = "https://oiapi.net/api/Kuwo";
const SUYIN_MIGU_API = "https://api.xcvts.cn/api/music/migu";

const CHANGQING_URL_TEMPLATES = {
  tx: "http://175.27.166.236/kgqq/qq.php?type=mp3&id={id}&level={level}",
  wy: "http://175.27.166.236/wy/wy.php?type=mp3&id={id}&level={level}",
  kw: "https://musicapi.haitangw.net/music/kw.php?type=mp3&id={id}&level={level}",
  kg: "https://music.haitangw.cc/kgqq/kg.php?type=mp3&id={id}&level={level}",
  mg: "https://music.haitangw.cc/musicapi/mg.php?type=mp3&id={id}&level={level}"
};

const NIANXIN_URL_TEMPLATES = {
  tx: "https://music.nxinxz.com/kgqq/tx.php?id={id}&level={level}&type=mp3",
  wy: "http://music.nxinxz.com/wy.php?id={id}&level={level}&type=mp3",
  kw: "http://music.nxinxz.com/kw.php?id={id}&level={level}&type=mp3",
  kg: "https://music.nxinxz.com/kgqq/kg.php?id={id}&level={level}&type=mp3",
  mg: "http://music.nxinxz.com/mg.php?id={id}&level={level}&type=mp3"
};

const QISHUI_SOURCE_ID = "qsvip";
const QISHUI_SOURCE_NAME = "汽水VIP";
const QISHUI_API_HTTPS = "https://api.vsaa.cn/api/music.qishui.vip";
const QISHUI_API_HTTP = "http://api.vsaa.cn/api/music.qishui.vip";
const QISHUI_PROXY_API = "https://proxy.qishui.vsaa.cn/qishui/proxy";

const PLATFORM_QUALITIES = {
  wy: ["24bit", "flac", "320k", "192k", "128k"],
  tx: ["24bit", "flac", "320k", "192k", "128k"],
  kw: ["24bit", "flac", "320k", "192k", "128k"],
  kg: ["24bit", "flac", "320k", "192k", "128k"],
  mg: ["24bit", "flac", "320k", "192k", "128k"]
};

const PLATFORM_TO_XINGHAI = {
  wy: "netease",
  tx: "tencent",
  kw: "kuwo",
  kg: "kugou",
  mg: "migu"
};

const QUALITY_TO_BR = {
  "128k": "128",
  "192k": "192",
  "320k": "320",
  flac: "740",
  flac24bit: "999",
  "24bit": "999"
};

const PLATFORM_TO_XINGHAI_BACKUP = {
  wy: "netease",
  tx: "qq",
  kw: "kuwo"
};

const QUALITY_TO_SUYIN_QQ_BR = {
  "128k": 7,
  "320k": 5,
  flac: 4,
  hires: 3,
  atmos: 2,
  master: 1,
  "24bit": 1
};

const QUALITY_TO_KUWO_BR = {
  flac: 1,
  "320k": 5,
  "128k": 7,
  "24bit": 1
};

const HIRES_QUALITY_SET = new Set(["24bit", "flac", "flac24bit", "hires", "master", "atmos"]);

const urlCache = new Map();

const {
  EVENT_NAMES,
  request,
  on,
  send
} = globalThis.lx;

function noop() {}

function httpRequest(url, options = { method: "GET" }) {
  return new Promise((resolve, reject) => {
    request(url, {
      timeout: 2000,
      ...options
    }, (err, res) => {
      if (err) {
        return reject(new Error("请求错误: " + err.message));
      }
      let body = res?.body;
      if (typeof body === "string") {
        const trimmed = body.trim();
        if (trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.startsWith("\"")) {
          try {
            body = JSON.parse(trimmed);
          } catch (e2) {}
        }
      }
      resolve({
        statusCode: res?.statusCode ?? 0,
        headers: res?.headers || {},
        body: body
      });
    });
  });
}

async function httpGet(url, params = {}) {
  const queryStr = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  const sep = url.includes("?") ? "&" : "?";
  const fullUrl = "" + url + (queryStr ? sep + queryStr : "");
  const res = await httpRequest(fullUrl, {
    method: "GET",
    timeout: 2000
  });
  if (res.statusCode >= 400) {
    throw new Error("HTTP错误: " + res.statusCode);
  }
  return res.body;
}

function buildQueryString(params = {}) {
  const parts = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => encodeURIComponent(String(k)) + "=" + encodeURIComponent(String(params[k])));
  if (parts.length) {
    return "?" + parts.join("&");
  } else {
    return "";
  }
}

async function httpGetWithFallback(url, params = {}, timeout = 5000) {
  const urls = url === QISHUI_API_HTTPS ? [QISHUI_API_HTTPS, QISHUI_API_HTTP] : [url];
  let lastError = null;
  for (const u of urls) {
    try {
      const fullUrl = "" + u + buildQueryString(params);
      const res = await httpRequest(fullUrl, {
        method: "GET",
        timeout: timeout
      });
      if (res.statusCode >= 400) {
        throw new Error("HTTP " + res.statusCode);
      }
      return res.body;
    } catch (e3) {
      lastError = e3;
    }
  }
  throw lastError || new Error("汽水VIP请求失败");
}

async function httpPost(url, body = {}, timeout = 5000) {
  const res = await httpRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body,
    timeout: timeout
  });
  if (res.statusCode >= 400) {
    throw new Error("HTTP错误: " + res.statusCode);
  }
  return res.body;
}

function getSongId(songInfo) {
  return (songInfo?.id || songInfo?.songmid || songInfo?.songId || songInfo?.hash || songInfo?.rid || songInfo?.mid || songInfo?.strMediaMid || songInfo?.mediaId || "").toString();
}

function normalizeQuality(quality) {
  switch (String(quality || "").toLowerCase()) {
    case "128k":
      return "low";
    case "320k":
      return "standard";
    case "flac":
      return "lossless";
    case "flac24bit":
      return "flac24bit";
    default:
      return "128k";
  }
}

function normalizeSongInfo(raw) {
  const id = raw?.id || raw?.vid ? String(raw.id || raw.vid) : "";
  return {
    id: id,
    songmid: id,
    hash: id,
    name: raw?.name ? String(raw.name) : "未知歌曲",
    singer: raw?.artists ? String(raw.artists) : "未知歌手",
    albumName: raw?.album ? String(raw.album) : "",
    duration: raw?.duration ? Math.floor(Number(raw.duration) / 1000) : 0,
    pic: raw?.cover || raw?.pic ? String(raw.cover || raw.pic) : "",
    _raw: raw || {}
  };
}

function getFirstData(response) {
  const data = response?.data;
  if (Array.isArray(data)) {
    return data[0] || null;
  }
  if (data && typeof data === "object" && data[0]) {
    return data[0];
  }
  return null;
}

async function qishuiSearch(keyword, page = 1, pageSize = 30) {
  if (!keyword) {
    return {
      isEnd: true,
      list: []
    };
  }
  const res = await httpGetWithFallback(QISHUI_API_HTTPS, {
    act: "search",
    keywords: keyword,
    page: page,
    pagesize: pageSize,
    type: "music"
  }, 15000);
  const list = Array.isArray(res?.data?.lists) ? res.data.lists : [];
  const total = res?.data?.total ? Number(res.data.total) : list.length;
  return {
    isEnd: list.length < pageSize,
    list: list.map(normalizeSongInfo),
    total: total
  };
}

async function qishuiGetUrl(songInfo, quality) {
  const songId = getSongId(songInfo);
  if (!songId) {
    throw new Error("汽水VIP缺少歌曲ID");
  }
  const res = await httpGetWithFallback(QISHUI_API_HTTPS, {
    act: "song",
    id: songId,
    quality: normalizeQuality(quality)
  }, 20000);
  const data = getFirstData(res);
  if (!data?.url) {
    throw new Error("汽水VIP未返回可用URL");
  }
  if (data.ekey) {
    const proxyRes = await httpPost(QISHUI_PROXY_API, {
      url: data.url,
      key: data.ekey,
      filename: data.filename || "KMusic",
      ext: data.fileExtension ? String(data.fileExtension) : "aac"
    }, 60000);
    if (Number(proxyRes?.code) === 200 && proxyRes?.url) {
      return String(proxyRes.url);
    }
    throw new Error("汽水VIP代理解密失败");
  }
  return String(data.url);
}

async function qishuiGetLyric(songInfo) {
  const songId = getSongId(songInfo);
  if (!songId) {
    return { lyric: "" };
  }
  const res = await httpGetWithFallback(QISHUI_API_HTTPS, {
    act: "song",
    id: songId
  }, 15000);
  const data = getFirstData(res);
  return {
    lyric: data?.lyric ? String(data.lyric) : ""
  };
}

async function qishuiHandler(action, params = {}) {
  if (action === "musicSearch" || action === "search") {
    const keyword = params?.keyword ? String(params.keyword) : "";
    const page = params?.page ? Number(params.page) : 1;
    const pageSize = params?.pagesize ? Number(params.pagesize) : 30;
    return qishuiSearch(keyword, page, pageSize);
  }
  if (action === "musicUrl") {
    if (!params?.musicInfo) {
      throw new Error("请求参数不完整");
    }
    const url = await qishuiGetUrl(params.musicInfo, params.type);
    return validateUrl(url, "汽水VIP");
  }
  if (action === "lyric") {
    return qishuiGetLyric(params?.musicInfo || {});
  }
  throw new Error("action not support");
}

function selectQuality(requestedQuality, supportedQualities) {
  if (requestedQuality === "24bit") {
    return "24bit";
  }
  const qualityList = Array.isArray(supportedQualities) ? supportedQualities : ["128k"];
  const normalized = String(requestedQuality || "128k").toLowerCase();
  if (qualityList.includes(normalized)) {
    return normalized;
  }
  const qualityOrder = ["flac24bit", "flac", "320k", "192k", "128k"];
  let idx = qualityOrder.indexOf(normalized);
  if (idx < 0) {
    idx = qualityOrder.length - 1;
  }
  for (let i = idx; i < qualityOrder.length; i++) {
    if (qualityList.includes(qualityOrder[i])) {
      return qualityOrder[i];
    }
  }
  for (let i = qualityOrder.length - 1; i >= 0; i--) {
    if (qualityList.includes(qualityOrder[i])) {
      return qualityOrder[i];
    }
  }
  return qualityList[0] || "128k";
}

function normalizeKeyword(keyword) {
  if (!keyword) {
    return "";
  }
  return String(keyword)
    .replace(/\(\s*Live\s*\)/gi, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, "")
    .replace(/[^\w\u4e00-\u9fa5]/g, "")
    .trim()
    .toLowerCase();
}

function buildSearchKeywords(songInfo) {
  const keywords = [];
  const name = songInfo?.name || "";
  const album = songInfo?.albumName || songInfo?.album || "";
  const singer = songInfo?.singer || "";
  if (name && album) {
    const kw = normalizeKeyword(name + album);
    if (kw) {
      keywords.push({ keyword: kw, strict: true });
    }
  }
  if (name && singer) {
    const kw = normalizeKeyword(name + singer);
    if (kw) {
      keywords.push({ keyword: kw, strict: true });
    }
  }
  if (name) {
    const kw = normalizeKeyword(name);
    if (kw) {
      keywords.push({ keyword: kw, strict: false });
    }
  }
  return keywords;
}

function titleMatch(a, b) {
  const na = normalizeKeyword(a);
  const nb = normalizeKeyword(b);
  if (!na || !nb) {
    return true;
  }
  return na.includes(nb) || nb.includes(na);
}

function songInfoMatch(responseData, songInfo) {
  const song = responseData?.song || responseData?.data?.song || "";
  const singer = responseData?.singer || responseData?.data?.singer || "";
  const album = responseData?.album || responseData?.data?.album || "";
  if (!titleMatch(song, songInfo?.name || "")) {
    return false;
  }
  if (songInfo?.singer && singer && !titleMatch(singer, songInfo.singer)) {
    return false;
  }
  if ((songInfo?.albumName || songInfo?.album) && album && !titleMatch(album, songInfo.albumName || songInfo.album)) {
    return false;
  }
  return true;
}

function songTitleMatch(responseData, songInfo) {
  if (!titleMatch(responseData?.title || "", songInfo?.name || "")) {
    return false;
  }
  if (songInfo?.singer && responseData?.artist && !titleMatch(responseData.artist, songInfo.singer)) {
    return false;
  }
  if ((songInfo?.albumName || songInfo?.album) && responseData?.album && !titleMatch(responseData.album, songInfo.albumName || songInfo.album)) {
    return false;
  }
  return true;
}

function parseMessageSongInfo(message) {
  if (!message) {
    return null;
  }
  const result = {};
  const lines = String(message).split("\n");
  for (const line of lines) {
    if (line.startsWith("歌名：")) {
      result.song = line.replace("歌名：", "").trim();
    }
    if (line.startsWith("歌手：")) {
      result.singer = line.replace("歌手：", "").trim();
    }
    if (line.startsWith("专辑：")) {
      result.album = line.replace("专辑：", "").trim();
    }
  }
  if (result.song) {
    return result;
  } else {
    return null;
  }
}

function getHashOrMid(songInfo) {
  return songInfo?.hash ?? songInfo?.songmid ?? songInfo?.id ?? null;
}

function getQQSongId(songInfo) {
  const mid = songInfo?.meta?.qq?.mid || songInfo?.meta?.mid || songInfo?.songmid ||
    (typeof songInfo?.id === "string" && !/^\d+$/.test(songInfo.id) ? songInfo.id : null);
  if (mid) {
    return { type: "mid", value: mid };
  }
  const songid = songInfo?.meta?.qq?.songid || songInfo?.meta?.songid ||
    (typeof songInfo?.id === "number" ? songInfo.id :
      (typeof songInfo?.id === "string" && /^\d+$/.test(songInfo.id) ? Number(songInfo.id) : null));
  if (songid) {
    return { type: "songid", value: songid };
  }
  return null;
}

function qualityToNetease(quality) {
  const q = String(quality || "128k").toLowerCase();
  if (q === "flac" || q === "flac24bit" || q === "hires" || q === "master" || q === "atmos") {
    return "lossless";
  }
  if (q === "320k" || q === "192k") {
    return "exhigh";
  }
  return "standard";
}

function getPlatformSongId(platform, songInfo) {
  if (platform === "kg") {
    return songInfo?.hash || songInfo?.songmid || songInfo?.id || songInfo?.rid || songInfo?.mid || null;
  }
  if (platform === "tx") {
    const qqId = getQQSongId(songInfo);
    if (qqId?.value) {
      return qqId.value;
    }
  }
  return songInfo?.songmid || songInfo?.id || songInfo?.songId || songInfo?.rid || songInfo?.hash || null;
}

function buildTemplateUrl(platform, quality, songInfo, templates, sourceName) {
  const template = templates[platform];
  if (!template) {
    throw new Error(sourceName + "不支持该平台");
  }
  const songId = getPlatformSongId(platform, songInfo);
  if (!songId) {
    throw new Error(sourceName + "缺少songId");
  }
  const level = qualityToNetease(quality);
  return template
    .replace("{id}", encodeURIComponent(String(songId)))
    .replace("{level}", encodeURIComponent(level));
}

function buildCacheKey(prefix, songInfo, quality = "") {
  const name = songInfo?.name || "";
  const singer = songInfo?.singer || "";
  const album = songInfo?.albumName || songInfo?.album || "";
  return prefix + "_" + name + "_" + singer + "_" + album + "_" + quality;
}

function getCachedUrl(cacheKey) {
  const entry = urlCache.get(cacheKey);
  if (!entry) {
    return null;
  }
  if (Date.now() - entry.timestamp >= CACHE_TTL_MS) {
    urlCache.delete(cacheKey);
    return null;
  }
  return entry.url;
}

function setCachedUrl(cacheKey, url) {
  urlCache.set(cacheKey, {
    url: url,
    timestamp: Date.now()
  });
  if (urlCache.size > CACHE_MAX_SIZE) {
    const oldestKey = urlCache.keys().next().value;
    if (oldestKey !== undefined) {
      urlCache.delete(oldestKey);
    }
  }
}

function validateUrl(url, sourceName) {
  if (!url || typeof url !== "string") {
    throw new Error(sourceName + "返回空URL");
  }
  if (!HTTP_URL_REGEX.test(url.trim())) {
    throw new Error(sourceName + "非法URL格式");
  }
  return url;
}

function getMobileUserAgent() {
  return "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";
}

async function xinghaiMainGetUrl(platform, songId, quality, songInfo) {
  const source = PLATFORM_TO_XINGHAI[platform];
  if (!source) {
    throw new Error("星海主API不支持该平台");
  }
  const id = songId ?? getHashOrMid(songInfo);
  if (!id) {
    throw new Error("缺少songId");
  }
  const selectedQuality = selectQuality(quality, ["128k", "192k", "320k", "flac", "flac24bit"]);
  const br = QUALITY_TO_BR[selectedQuality];
  if (!br) {
    throw new Error("星海主API音质映射失败");
  }
  const url = XINGHAI_MAIN_API + "&types=url&source=" + source + "&id=" + encodeURIComponent(id) + "&br=" + br;
  const res = await httpRequest(url, {
    method: "GET",
    headers: {
      "User-Agent": "LX-Music-Mobile",
      Accept: "application/json"
    }
  });
  const body = res.body;
  if (!body || typeof body !== "object" || !body.url) {
    throw new Error(body?.message || "星海主API未返回可用URL");
  }
  return body.url;
}

async function xinghaiBackupGetUrl(platform, songId, quality, songInfo) {
  const source = PLATFORM_TO_XINGHAI_BACKUP[platform];
  if (!source) {
    throw new Error("星海备API不支持该平台");
  }
  const id = songId ?? getHashOrMid(songInfo);
  if (!id) {
    throw new Error("缺少songId");
  }
  const selectedQuality = selectQuality(quality, ["128k", "192k", "320k", "flac", "flac24bit"]);
  return XINGHAI_BACKUP_API + "?source=" + encodeURIComponent(source) + "&id=" + encodeURIComponent(id) + "&type=url&br=" + encodeURIComponent(selectedQuality);
}

async function huibqGetUrl(platform, songId, quality, songInfo) {
  const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
  if (!hashOrMid) {
    throw new Error("Huibq缺少hash/songmid");
  }
  const selectedQuality = selectQuality(quality, ["320k", "128k"]);
  const url = HUIBQ_API + "/url/" + platform + "/" + encodeURIComponent(hashOrMid) + "/" + encodeURIComponent(selectedQuality);
  const res = await httpRequest(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": getMobileUserAgent(),
      "X-Request-Key": HUIBQ_REQUEST_KEY
    }
  });
  const body = res.body;
  if (!body || typeof body !== "object" || Number.isNaN(Number(body.code))) {
    throw new Error("Huibq返回无效");
  }
  switch (Number(body.code)) {
    case 0:
      if (!body.url) {
        throw new Error("Huibq返回空URL");
      }
      return body.url;
    case 1:
      throw new Error("Huibq block ip");
    case 2:
      throw new Error("Huibq get music url failed");
    case 4:
      throw new Error("Huibq too many requests");
    case 5:
      throw new Error("Huibq param error");
    case 6:
      throw new Error("Huibq internal server error");
    default:
      throw new Error(body.message || "Huibq unknown error");
  }
}

async function lingchuanGetUrl(platform, songId, quality, songInfo) {
  const hashOrMid = songInfo?.hash ?? songInfo?.songmid;
  if (!hashOrMid) {
    throw new Error("聆川缺少hash/songmid");
  }
  const selectedQuality = selectQuality(quality, ["320k", "128k"]);
  const url = LINGCHUAN_API + "/url?source=" + encodeURIComponent(platform) + "&songId=" + encodeURIComponent(hashOrMid) + "&quality=" + encodeURIComponent(selectedQuality);
  const res = await httpRequest(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": getMobileUserAgent()
    },
    follow_max: 5
  });
  const body = res.body;
  if (!body || typeof body !== "object" || Number.isNaN(Number(body.code))) {
    throw new Error("聆川返回无效");
  }
  switch (Number(body.code)) {
    case 200:
      if (!body.url) {
        throw new Error("聆川返回空URL");
      }
      return body.url;
    case 403:
      throw new Error("聆川403 forbidden");
    case 429:
      throw new Error("聆川429 rate limit");
    case 500:
      throw new Error("聆川500 " + (body.message || "server error"));
    default:
      throw new Error(body.message || "聆川未知错误");
  }
}

function extractQQUrl(responseData) {
  if (responseData?.music) {
    return responseData.music;
  }
  if (responseData?.url) {
    return responseData.url;
  }
  if (responseData?.message) {
    const match = String(responseData.message).match(/音频链接[：:](.+?)(?:\n|$)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  throw new Error("溯音QQ未找到音频链接");
}

function qualityToSuyinQQ(quality) {
  const q = String(quality || "128k").toLowerCase();
  if (q === "flac24bit") {
    return "hires";
  }
  if (q === "192k") {
    return "320k";
  }
  if (QUALITY_TO_SUYIN_QQ_BR[q]) {
    return q;
  }
  return "128k";
}

async function suyinQQGetUrl(songInfo, quality) {
  const qqId = getQQSongId(songInfo);
  if (!qqId) {
    throw new Error("溯音QQ缺少songmid/id");
  }
  const normalizedQuality = qualityToSuyinQQ(quality);
  const startBr = QUALITY_TO_SUYIN_QQ_BR[normalizedQuality] || QUALITY_TO_SUYIN_QQ_BR["128k"];
  const brList = [startBr, 4, 5, 7]
    .filter((val, idx, arr) => arr.indexOf(val) === idx && val >= startBr)
    .sort((a, b) => a - b);
  let lastError = null;
  for (const br of brList) {
    try {
      const reqParams = {
        key: SUYIN_QQ_KEY,
        type: "json",
        br: br,
        n: 1
      };
      if (qqId.type === "mid") {
        reqParams.mid = qqId.value;
      } else {
        reqParams.songid = qqId.value;
      }
      const res = await httpGet(SUYIN_QQ_API, reqParams);
      return extractQQUrl(res);
    } catch (e4) {
      lastError = e4;
    }
  }
  throw new Error("溯音QQ全部音质尝试失败: " + (lastError?.message || "unknown"));
}

async function suyin163GetUrl(songInfo) {
  const id = songInfo?.songmid || songInfo?.id;
  if (!id) {
    throw new Error("溯音163缺少songmid/id");
  }
  const res = await httpGet(SUYIN_163_API, { id: id });
  if (res?.code === 0 && res?.data) {
    const item = Array.isArray(res.data) ? res.data[0] : res.data;
    if (item?.url) {
      return item.url;
    }
  }
  throw new Error("溯音163获取失败");
}

async function suyinKuwoSearch(keyword, br, songInfo = null) {
  const res = await httpGet(SUYIN_KUWO_API, {
    msg: keyword,
    n: 1,
    br: br
  });
  if (res?.data?.url) {
    if (songInfo && !songInfoMatch(res, songInfo)) {
      throw new Error("溯音酷我歌曲信息不匹配");
    }
    return res.data.url;
  }
  if (res?.message) {
    const match = String(res.message).match(/音乐链接[：:](\S+)/);
    if (match && match[1]) {
      if (songInfo) {
        const parsed = parseMessageSongInfo(res.message);
        if (parsed && !songInfoMatch(parsed, songInfo)) {
          throw new Error("溯音酷我歌曲信息不匹配");
        }
      }
      return match[1];
    }
  }
  throw new Error("溯音酷我未找到链接");
}

async function suyinKuwoGetUrl(songInfo, quality) {
  if (!songInfo?.name) {
    throw new Error("溯音酷我需要歌曲名");
  }
  const cacheKey = buildCacheKey("kw", songInfo, quality);
  const cached = getCachedUrl(cacheKey);
  if (cached) {
    return cached;
  }
  const selectedQuality = selectQuality(quality, ["flac", "320k", "128k"]);
  const br = QUALITY_TO_KUWO_BR[selectedQuality] || 1;
  const keywords = buildSearchKeywords(songInfo);
  let lastError = null;
  for (const item of keywords) {
    try {
      const url = await suyinKuwoSearch(item.keyword, br, item.strict ? songInfo : null);
      if (url) {
        setCachedUrl(cacheKey, url);
        return url;
      }
    } catch (e5) {
      lastError = e5;
    }
  }
  throw new Error("溯音酷我失败: " + (lastError?.message || "unknown"));
}

async function suyinMiguGetUrl(songInfo) {
  if (!songInfo?.name) {
    throw new Error("溯音咪咕需要歌曲名");
  }
  const cacheKey = buildCacheKey("mg", songInfo);
  const cached = getCachedUrl(cacheKey);
  if (cached) {
    return cached;
  }
  const keywords = buildSearchKeywords(songInfo);
  let lastError = null;
  for (const item of keywords) {
    try {
      const res = await httpGet(SUYIN_MIGU_API, {
        gm: item.keyword,
        n: 1,
        num: 1,
        type: "json"
      });
      if (res?.code === 200 && res?.musicInfo) {
        if (item.strict && !songTitleMatch(res, songInfo)) {
          throw new Error("溯音咪咕歌曲信息不匹配");
        }
        setCachedUrl(cacheKey, res.musicInfo);
        return res.musicInfo;
      }
    } catch (e6) {
      lastError = e6;
    }
  }
  throw new Error("溯音咪咕失败: " + (lastError?.message || "unknown"));
}

async function suyinGetUrl(platform, songId, quality, songInfo) {
  switch (platform) {
    case "tx":
      return suyinQQGetUrl(songInfo, quality);
    case "wy":
      return suyin163GetUrl(songInfo);
    case "kw":
      return suyinKuwoGetUrl(songInfo, quality);
    case "mg":
      return suyinMiguGetUrl(songInfo);
    default:
      throw new Error("溯音不支持该平台");
  }
}

async function changqingGetUrl(platform, songId, quality, songInfo) {
  return buildTemplateUrl(platform, quality, songInfo, CHANGQING_URL_TEMPLATES, "长青SVIP");
}

async function nianxinGetUrl(platform, songId, quality, songInfo) {
  return buildTemplateUrl(platform, quality, songInfo, NIANXIN_URL_TEMPLATES, "念心SVIP");
}

const SOURCE_HANDLERS = {
  xinghai: {
    name: "星海主",
    fn: xinghaiMainGetUrl
  },
  xinghaiBackup: {
    name: "星海备",
    fn: xinghaiBackupGetUrl
  },
  huibq: {
    name: "Huibq",
    fn: huibqGetUrl
  },
  lingchuan: {
    name: "聆川",
    fn: lingchuanGetUrl
  },
  suyinQQ: {
    name: "溯音QQ",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("tx", songId, quality, songInfo)
  },
  suyin163: {
    name: "溯音163",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("wy", songId, quality, songInfo)
  },
  suyinSearch: {
    name: "溯音搜索",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("kw", songId, quality, songInfo)
  },
  suyinMigu: {
    name: "溯音咪咕",
    fn: (platform, songId, quality, songInfo) => suyinGetUrl("mg", songId, quality, songInfo)
  },
  changqingVip: {
    name: "长青SVIP",
    fn: changqingGetUrl
  },
  nianxinVip: {
    name: "念心SVIP",
    fn: nianxinGetUrl
  }
};

function buildSourceChain(platform, isHires, quality) {
  const chain = [];
  if (SOURCE_HANDLERS.xinghai) {
    chain.push(SOURCE_HANDLERS.xinghai);
  }
  if (SOURCE_HANDLERS.huibq) {
    chain.push(SOURCE_HANDLERS.huibq);
  }
  if (platform === "wy" && SOURCE_HANDLERS.suyin163) {
    chain.push(SOURCE_HANDLERS.suyin163);
  }
  if (platform === "tx" && SOURCE_HANDLERS.suyinQQ) {
    chain.push(SOURCE_HANDLERS.suyinQQ);
  }
  if (platform === "kw" && SOURCE_HANDLERS.suyinSearch) {
    chain.push(SOURCE_HANDLERS.suyinSearch);
  }
  if (platform === "mg" && SOURCE_HANDLERS.suyinMigu) {
    chain.push(SOURCE_HANDLERS.suyinMigu);
  }
  if (SOURCE_HANDLERS.lingchuan) {
    chain.push(SOURCE_HANDLERS.lingchuan);
  }
  if (SOURCE_HANDLERS.changqingVip) {
    chain.push(SOURCE_HANDLERS.changqingVip);
  }
  if (SOURCE_HANDLERS.nianxinVip) {
    chain.push(SOURCE_HANDLERS.nianxinVip);
  }
  return chain;
}

async function getUrlWithFallback(platform, songInfo, quality) {
  if (!platform || typeof platform !== "string" || !PLATFORM_QUALITIES[platform]) {
    throw new Error("无效的平台参数");
  }
  if (!songInfo || typeof songInfo !== "object") {
    throw new Error("无效的歌曲信息");
  }
  const resolvedQuality = quality || "128k";
  const selectedQuality = selectQuality(resolvedQuality, PLATFORM_QUALITIES[platform]);
  const songId = getHashOrMid(songInfo);
  const isHires = HIRES_QUALITY_SET.has(resolvedQuality.toLowerCase());
  const chain = buildSourceChain(platform, isHires, selectedQuality);
  if (!chain.length) {
    throw new Error("未找到可用fallback链");
  }
  const errors = [];
  try {
    const url = await Promise.any(chain.slice(0, 3).map(async handler => {
      const result = await handler.fn(platform, songId, selectedQuality, songInfo);
      return validateUrl(result, handler.name);
    }));
    if (url) {
      return url;
    }
  } catch (e7) {
    if (e7.errors) {
      e7.errors.forEach(err => errors.push(err.message));
    }
  }
  for (const handler of chain.slice(3)) {
    try {
      const result = await handler.fn(platform, songId, selectedQuality, songInfo);
      return validateUrl(result, handler.name);
    } catch (e8) {
      errors.push(handler.name + ": " + e8.message);
      continue;
    }
  }
  throw new Error("所有源均失败: " + errors.join("; "));
}

const sourceConfig = {};

const PLATFORM_NAMES = {
  wy: "网易云音乐",
  tx: "QQ音乐",
  kw: "酷我音乐",
  kg: "酷狗音乐",
  mg: "咪咕音乐"
};

Object.keys(PLATFORM_QUALITIES).forEach(platform => {
  sourceConfig[platform] = {
    name: PLATFORM_NAMES[platform],
    type: "music",
    actions: ["musicUrl"],
    qualitys: PLATFORM_QUALITIES[platform]
  };
});

sourceConfig[QISHUI_SOURCE_ID] = {
  name: QISHUI_SOURCE_NAME,
  type: "music",
  actions: ["musicSearch", "musicUrl", "lyric"],
  qualitys: ["128k", "320k", "flac", "flac24bit"]
};

on(EVENT_NAMES.request, ({ action, source, info }) => {
  if (source === QISHUI_SOURCE_ID) {
    return qishuiHandler(action, info);
  }
  if (action !== "musicUrl") {
    return Promise.reject(new Error("action not support"));
  }
  if (!info?.musicInfo) {
    return Promise.reject(new Error("请求参数不完整"));
  }
  return getUrlWithFallback(source, info.musicInfo, info.type || "128k")
    .then(url => Promise.resolve(url))
    .catch(err => Promise.reject(err));
});

send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: sourceConfig
});

noop("初始化完成，聚合音源已就绪");

  })

  // [16] 弥音 | B0-弥音-v1.js
  __load(15, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send } = globalThis.lx

on(EVENT_NAMES.request, async ({ source, action, info }) => {
  if (source !== 'tx' || action !== 'musicUrl') return

  const mid = info.musicInfo.mid || info.musicInfo.songmid || info.musicInfo.id
  if (!mid) throw new Error('缺少MID')

  const apiUrl = `https://api.xunhuisi.store/API/QQMusic/Song.php?mid=${mid}`

  return new Promise((resolve, reject) => {
    request(apiUrl, {
      method: 'GET',
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (err, resp) => {
      if (err) return reject(new Error('网络请求失败'))

      try {
        const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
        if (data.code === 200 && data.music_url) {
          resolve(data.music_url)
        } else {
          reject(new Error(data.msg || '未找到音频链接'))
        }
      } catch {
        reject(new Error('数据解析失败'))
      }
    })
  })
})

send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: {
    tx: {
      name: 'QQ音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: [{ type: '128k', label: '标准品质' }]
    }
  }
})

  })

  // [17] kuwodes | C0-KuwoDES-v1.0.0.js
  __load(16, function (globalThis, window, self, top, parent, lx, process) {
const MUSIC_QUALITY = {
  'kw': ['128k', '320k', 'flac', 'flac24bit', 'hires']
};

const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY);
const QUALITY_MAP = {
  '128k': '128kmp3',
  '320k': '320kmp3',
  'flac': '2000kflac',
  'flac24bit': '4000kflac',
  'hires': '4000kflac'
};

const { EVENT_NAMES, request, on, send, env, version } = globalThis.lx;

const httpFetch = (url, options = { method: 'GET' }) => {
  return new Promise((resolve, reject) => {
    console.log('--- start --- ' + url);
    request(url, options, (err, resp) => {
      if (err) return reject(err);
      console.log('API Response: ', resp);
      resolve(resp);
    });
  });
};

const handleGetMusicUrl = async (source, musicInfo, quality) => {
  const songId = musicInfo.hash ?? musicInfo.songmid;
  const response = await httpFetch(
    `https://mobi.kuwo.cn/mobi.s?f=web&rid=${songId}&source=jiakong&type=convert_url_with_sign&surl=1&br=${QUALITY_MAP[quality]}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`
      },
      follow_max: 5
    }
  );

  const { body } = response;

  if (!body || isNaN(Number(body.code))) throw new Error('未知错误');

  if (env != 'mobile') console.groupEnd();

  switch (body.code) {
    case 200:
      console.log(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) success, URL: ${body.data.surl}`);
      return body.data.surl;
    default:
      console.error(`handleGetMusicUrl(${source}_${musicInfo.songmid}, ${quality}) failed`);
      throw new Error('获取音乐链接失败');
  }
};

const musicSources = {};
MUSIC_SOURCE.forEach(source => {
  musicSources[source] = {
    name: source,
    type: 'music',
    actions: ['musicUrl'],
    qualitys: MUSIC_QUALITY[source]
  };
});

on(EVENT_NAMES.request, ({ action, source, info }) => {
  switch (action) {
    case 'musicUrl':
      if (env != 'mobile') {
        console.group(`Handle Action(musicUrl)`);
        console.log('source', source);
        console.log('quality', info.type);
        console.log('musicInfo', info.musicInfo);
      } else {
        console.log(`Handle Action(musicUrl)`);
        console.log('source', source);
        console.log('quality', info.type);
        console.log('musicInfo', info.musicInfo);
      }
      return handleGetMusicUrl(source, info.musicInfo, info.type)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err));
    default:
      console.error(`action(${action}) not support`);
      return Promise.reject('action not support');
  }
});

send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: false,
  sources: musicSources
});

  })

  // [18] monster | C0-monster-v1.5.5.js
  __load(17, function (globalThis, window, self, top, parent, lx, process) {
(() => {
    "use strict";
    const {
        EVENT_NAMES: e,
        on: r,
        send: t,
        request: n,
        utils: o,
        version: a
    } = globalThis.lx, s = {
        buffer: {
            from: o.buffer.from,
            bufToString: o.buffer.bufToString
        },
        crypto: {
            aesEncrypt: o.crypto.aesEncrypt,
            md5: o.crypto.md5,
            randomBytes: o.crypto.randomBytes,
            rsaEncrypt: o.crypto.rsaEncrypt
        }
    }, l = {
        "128k": "128kmp3",
        "320k": "320kmp3",
        flac: "2000kflac",
        flac24bit: "4000kflac"
    }, d = e => s.crypto.md5(e);
    var i, A, u, p;
    i = e => ("" + e).replace(/[^\d.]+/g, e => "." + (e.replace(/[\W_]+/, "").toUpperCase().charCodeAt(0) - 65536) + ".").replace(/(?:\.0+)*(\.-\d+(?:\.\d+)?)\.*$/g, "$1").split(".");

    function E(t, o = "") {
        const i = Object.keys(t).sort();
        let a = "";
        return i.forEach((e, r) => {
            a += e + "=" + t[e], r != i.length - 1 && (a += o)
        }), a
    }
    const m = {
            "128k": 0,
            "320k": 1,
            flac: 2
        },
        D = {
            "128k": "standard",
            "320k": "exhigh",
            flac: "lossless",
            flac24bit: "hires"
        },
        f = (e, r) => {
            var t, o, i = `nobody${e="/"+e}use${text}md5forencrypt`,
                i = d(i),
                e = `${e}-${c}-${text}-${c}-` + i;
            return {
                params: (i = e, e = "e82ckenh8dichen8", t = "", o = "aes-128-ecb", a || (o = o.split("-").pop()), i = s.crypto.aesEncrypt(i, o, e, t), (a ? s.buffer.bufToString(i, "hex") : [...new Uint8Array(i)].map(e => e.toString(16).padStart(2, "0")).join("")).toUpperCase())
            }
        },
        B = {
            "128k": "PQ",
            "320k": "HQ",
            flac: "SQ",
            flac24bit: "ZQ"
        },
        C = {
            kw: {
                info: {
                    name: "酷我音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac", "flac24bit"]
                },
                async musicUrl({
                    songmid: e
                }, r) {
                    const i = `https://nmobi.kuwo.cn/mobi.s?f=web&source=kwplayer_ar_1.1.9_oppo_118980_320.apk&type=convert_url_with_sign&rid=${e}&br=` + (r = l[r]);
                    return new Promise((t, o) => {
                        n(i, {
                            method: "GET",
                            headers: {
                                "User-Agent": "okhttp/4.10.0"
                            }
                        }, (e, r) => e ? o(e) : 200 != r.body.code || 0 == r.body.data.bitrate ? o(new Error("failed")) : void t(r.body.data.url.split("?")[0]))
                    })
                }
            },
            kg: {
                info: {
                    name: "酷狗音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k"]
                },
                musicUrl({
                    hash: i,
                    albumId: a
                }, e) {
                    return new Promise((t, o) => {
                        var e = d(i + "57ae12eb6890223e355ccfcb74edf70d10051234560"),
                            e = {
                                album_id: a,
                                userid: 0,
                                area_code: 1,
                                hash: i,
                                module: "",
                                mid: 123456,
                                appid: "1005",
                                ssa_flag: "is_fromtrack",
                                clientver: "10086",
                                vipType: 6,
                                ptype: 0,
                                token: "",
                                auth: "",
                                mtype: 0,
                                album_audio_id: 0,
                                behavior: "play",
                                clienttime: Math.floor(Date.now() / 1e3),
                                pid: 2,
                                key: e,
                                dfid: "-",
                                pidversion: 3001,
                                quality: "128"
                            },
                            r = d("OIlwieks28dk2k092lksi2UIkp" + E(e) + "OIlwieks28dk2k092lksi2UIkp"),
                            e = "https://gateway.kugou.com/v5/url?" + E(e, "&") + "&signature=" + r;
                        n(e, {
                            method: "GET",
                            headers: {
                                "User-Agent": "Android712-AndroidPhone-8983-18-0-NetMusic-wifi",
                                "KG-THash": "3e5ec6b",
                                "KG-Rec": "1",
                                "KG-RC": "1",
                                "x-router": "tracker.kugou.com"
                            }
                        }, (e, r) => {
                            return e ? o(e) : 1 !== (e = r.body).status ? o(new Error(e.err_code)) : void t(r.body.url[0])
                        })
                    })
                }
            },
            tx: {
                info: {
                    name: "企鹅音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac"]
                },
                musicUrl({
                    songmid: e
                }, r) {
                    return new Promise((t, o) => {
                        n("https://md.khkj.xyz/qq/?type=song", {
                            method: "POST",
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Linux; Android 10; NOH-AN01 Build/HUAWEINOH-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.93 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/36.0)",
                                Connection: "Keep-Alive",
                                "Accept-Encoding": "gzip",
                                "Content-Type": "application/x-www-form-urlencoded",
                                DNT: "1",
                                "Sec-GPC": "1"
                            },
                            body: "mid=" + e + "&pmid=" + e + "&q=" + m[r]
                        }, (e, r) => {
                            return console.log(JSON.stringify(r.body, "", "  ")), e ? o("failed") : (e = r.body.data, 200 == r.body.code && e.purl ? void t(e.purl) : o(new Error("failed")))
                        })
                    })
                }
            },
            wy: {
                info: {
                    name: "网易音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac", "flac24bit"]
                },
                musicUrl({
                    songmid: e
                }, r) {
                    r = D[r];
                    r = "api/song/enhance/player/url/v1";
                    JSON.stringify([e]);
                    const i = f(r);
                    return new Promise((t, o) => {
                        n("https://interface.music.163.com/eapi/song/enhance/player/url/v1", {
                            method: "POST",
                            form: i,
                            headers: {
                                cookie: "EVNSM=1.0.0; versioncode=9000025; buildver=240205104600; ntes_kaola_ad=1; mobilename=sukiseki; osver=13; MUSIC_U=00C0AB8A13333D8FE277B703A2CFBBE280982A63BCFAE1D947FC3C53C5A069A56D333FE23DD3FFB95C10F811493A4070519F5A0511EBE5F2C032BF6E1F7508803007439BE7625982E5DCC0F9AEA729EE9A0084994199221E1159F0D7D63F26D2321C1AC656B9B219A9C19B0A19107EC4EA492A07896BCE24A05002646926C3A628AC6014EDF1B53946766EE920C57FCD74BF6E2B336B843B1B1E11D78DB53472AFB2CBBB6644D8BD9BE5B72CD70E699B4E63356A13DD1B9D99C40EA784FF163D3CA0F50377D738E9A07604D9C0205FB3227C55D2644E538226DA1D2770BD81CA7C90C4632A01FD837E6EA0D8E7B46086AB762C40B5257BE231552163CDAA8A24DE5DE490CFD33A401D890A73D7ACB7062F533824A42480B3772D4564718629D8B64014D8B2C2E8A46F8FE8A7DA698DAA39C9931007AE795485D1EC49C4B66BC26A47D66C0E455697B1350140DC334191DB4D3EB22EA55B25869A421F90480C64F55E0912BCB766D14BC05E8AA5C487A197AF4D3855D06710C91BE28281A00E20DF; os=android; channel=bubugao1; appver=9.0.25; packageType=release"
                            }
                        }, (e, r) => {
                            return e ? o(e) : ({
                                url: e,
                                freeTrialInfo: r
                            } = r.body.data[0], !e || r ? o(new Error("failed")) : void t(e))
                        })
                    })
                }
            },
            mg: {
                info: {
                    name: "咪咕音乐",
                    type: "music",
                    actions: ["musicUrl"],
                    qualitys: ["128k", "320k", "flac", "flac24bit"]
                },
                musicUrl(e, r) {
                    r = B[r], console.log(e);
                    const t = `https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.4?netType=01&resourceType=E&songId=${e.copyrightId}&toneFlag=` + r;
                    return new Promise((o, i) => {
                        console.log(r), n(t, {
                            method: "GET",
                            headers: {
                                channel: "014000D",
                                token: "848401000134020058524459344E544130526A4932517A55344D7A56434E55453240687474703A2F2F70617373706F72742E6D6967752E636E2F6E303030312F4062393662376634326336326434303935393366666433366434313939393033300300040298EAFB0400063232303032340500164D4759355A4463784D324E684E4449324F57566B4E51FF0020795263B9A333A4580E13DD7F28820A8B9788F30062F6025FA08BF10CC5A8AA04",
                                aversionid: "DF94898993A5A28A64968A9FD0ADA0749397878BC39DD7BC68C584A1BAAFC96EC5938D8D8ED1A490949A8F9EB680997296DFD0D391D6ABBC69928AD0B57D99779CC8B88CDDECEE89628F89A1827E986F94978AD392A7A2916A928AA4878199779C"
                            }
                        }, (e, r) => {
                            if (e) return i(e);
                            let t = r.body.data?.url;
                            if (!t) return i(new Error("failed"));
                            t.startsWith("//") && (t = "https:" + t), o(t.replace(/\+/g, "%2B").split("?")[0])
                        })
                    })
                }
            }
        };
    var y, k, F = globalThis.lx["currentScriptInfo"],
        b = (r(e.request, ({
            source: e,
            action: r,
            info: t
        }) => {
            if ("musicUrl" === r) return C[e].musicUrl(t.musicInfo, t.type).catch(e => Promise.reject(e))
        }), {});
    for ([y, k] of Object.entries(C)) b[y] = k.info;
    t(e.inited, {
        status: !0,
        openDevTools: !1,
        sources: b
    })
})();

  })

  // [19] c0 | C0-𝖧౿ᥣᥣ𝗈 Ԝ𝗈𝗋ᥣᑯ-v260809.js
  __load(18, function (globalThis, window, self, top, parent, lx, process) {
const ENABLE_CACHE = true;
const CACHE_TTL = 20 * 60 * 1000;
const TIMEOUT = 10000;
const RACE_APIS = false;
const CONFIG = {
  kw: {
    name: '酷我音乐',
    apis: [
      {
        api: '', 
        idField: ['rid', 'id', 'songmid', 'hash'], 
        urlField: ['data.url', 'url', 'playUrl'],
        quality: { '128k': '0', '320k': '5', 'flac': '1' }
      }
    ]
  },
  kg: {
    name: '酷狗音乐',
    apis: [
      {
        api: '', 
        idField: ['hash', 'songmid', 'id', 'rid'], 
        urlField: ['0.url','url', 'data.url', 'playUrl'],
        quality: { '128k': '128', '320k': '320', 'flac': 'flac' }
      }
    ]
  },
  tx: {
    name: 'QQ音乐',
    apis: [
      {
        api: 'https://a.aa.cab/qq.music?msg={keyword}&n=1&type={quality}', 
        idField: ['songmid', 'id', 'hash'], 
        urlField: ['data.music','playUrl', 'url', 'data.url'],
        quality: { '128k': '0', '320k': '1', 'flac': '4', 'master': '5' }
      }
    ]
  },
  wy: {
    name: '网易云音乐',
    apis: [
      {
        api: '', 
        idField: ['id', 'songmid', 'hash'], 
        urlField: ['url', 'data.url', 'playUrl'],
        quality: { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless' ,'hires':'hires','atmos':'jyeffect','atmos_plus':'sky','master':'jymaster'}
      }
    ]
  },
mg: {
  name: '咪咕音乐',
  apis: [
    {
      api: 'https://yy.zddyr.top/lx/api/?source=migu&songmid={id}&quality={quality}',
      idField: ['songmid', 'id', 'hash'],
      urlField: ['url', 'data.url'],
      quality: {
        '128k': '128k',
        '320k': '320k',
        'flac': 'flac'
      }
    }
  ]
}
}

const { EVENT_NAMES, request, on, send } = globalThis.lx;
const cache = Object.create(null);
const sourceKeys = Object.keys(CONFIG);

const getCache = k => ENABLE_CACHE && cache[k]?.expire > Date.now() ? cache[k].data : (delete cache[k], null);
const setCache = (k, d) => ENABLE_CACHE && (cache[k] = { data: d, expire: Date.now() + CACHE_TTL });

const httpRequest = (url, options = {}) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('请求超时')), TIMEOUT);
  request(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' }, ...options }, (err, resp) => {
    clearTimeout(timer);
    if (err) return reject(err instanceof Error ? err : new Error(String(err)));
    if (!resp) return reject(new Error('空响应'));
    resolve({ body: resp.body, statusCode: resp.statusCode || resp.status || 200, url: resp.url });
  });
});

const getField = (obj, path) => path.split('.').reduce((val, p) => val == null ? undefined
  : Array.isArray(val) ? (/^\d+$/.test(p) ? val[+p] : val.map(v => v?.[p]).find(v => v != null && v !== ''))
  : val[p], obj);

const asUrl = v => typeof v === 'string' && /^(https?:)?\/\//.test(v.trim())
  ? (v.trim().startsWith('//') ? 'https:' + v.trim() : v.trim())
  : null;

const findUrl = (data, fields) => data == null ? null : asUrl(data) || fields.map(f => asUrl(getField(data, f))).find(Boolean) || null;

const getSongId = (info, fields) => fields.map(f => info[f]).find(v => v !== undefined && v !== null && v !== '')?.toString() ?? '';

const qualitys = Object.create(null);
const sources = Object.create(null);
const idFieldsBySource = Object.create(null);
sourceKeys.forEach(s => {
  const apiList = CONFIG[s].apis || [];
  const qs = [...new Set(apiList.flatMap(a => Object.keys(a.quality || {})))];
  qualitys[s] = qs.reduce((acc, q) => (acc[q] = q, acc), {});
  sources[s] = { name: CONFIG[s].name, type: 'music', actions: ['musicUrl'], qualitys: qs };
  idFieldsBySource[s] = [...new Set(apiList.flatMap(a => a.idField || []))];
});
qualitys.local = {};
sources.local = { name: '本地音乐', type: 'music', actions: ['musicUrl', 'lyric', 'pic'], qualitys: [] };

const FALLBACK = {
  master: ['master', 'atmos', 'atmos_plus', 'hires', 'flac24bit', 'flac', '320k', '128k'],
  atmos: ['atmos', 'atmos_plus', 'hires', 'flac24bit', 'flac', '320k', '128k'],
  atmos_plus: ['atmos_plus', 'hires', 'flac24bit', 'flac', '320k', '128k'],
  hires: ['hires', 'flac24bit', 'flac', '320k', '128k'],
  flac24bit: ['flac24bit', 'flac', '320k', '128k'],
  flac: ['flac', '320k', '128k'],
  '320k': ['320k', '128k'],
  '128k': ['128k'],
};

const tryApi = async (s, info, quality) => {
  const apiList = CONFIG[s].apis;
  if (!apiList?.length) throw new Error('无API配置');
  const keyword = encodeURIComponent(info.name || info.songname || '');

  const run = async api => {
    const tag = api.api.split('?')[0].split('/').pop() || 'api';
    if (api.quality && !(quality in api.quality)) throw new Error(`${tag}:不支持${quality}`);
    const needsId = api.api.includes('{id}');
    const needsKeyword = api.api.includes('{keyword}');
    const id = needsId ? getSongId(info, api.idField) : '';
    if (needsId && !id) throw new Error(`${tag}:缺少id字段`);
    if (needsKeyword && !keyword) throw new Error(`${tag}:缺少歌曲名`);
    const url = api.api.replace(/\{id\}/g, id).replace(/\{keyword\}/g, keyword).replace(/\{quality\}/g, api.quality ? api.quality[quality] : quality);
    if (!url || /\{[^}]*\}/.test(url)) throw new Error(`${tag}:URL模板未配置`);
    const resp = await httpRequest(url);
    if ([301, 302, 307, 308].includes(resp.statusCode) && resp.url) {
      const abs = asUrl(resp.url) || (() => { try { return new URL(resp.url, url).href; } catch { return null; } })();
      if (abs) return abs;
    }
    const direct = asUrl(resp.body);
    if (direct) return direct;
    const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body;
    const result = findUrl(data, api.urlField || ['url', 'data.url', 'playUrl']);
    if (result) return result;
    throw new Error(`${tag}:响应中未找到有效链接`);
  };

  if (RACE_APIS) {
    try { return await Promise.any(apiList.map(run)); }
    catch (agg) { throw new Error(`所有API均失败(${quality}) [${(agg.errors || [agg]).map(e => e.message || String(e)).join(' | ')}]`); }
  }

  const fails = [];
  for (const api of apiList) {
    try { return await run(api); } catch (e) { fails.push(e.message || String(e)); }
  }
  throw new Error(`所有API均失败(${quality}) [${fails.join(' | ')}]`);
};

const inflight = Object.create(null);

const apis = sourceKeys.reduce((acc, s) => {
  acc[s] = {
    async musicUrl(info, quality) {
      if (!info) throw new Error('缺少musicInfo');
      const key = `${s}_${getSongId(info, idFieldsBySource[s]) || `${info.name || ''}-${info.singer || info.artist || ''}` || 'unknown'}_${quality}`;
      const cached = getCache(key);
      if (cached) return cached;
      if (inflight[key]) return inflight[key];

      const run = (async () => {
        const fails = [];
        for (const q of FALLBACK[quality] || [quality]) {
          if (!qualitys[s].hasOwnProperty(q)) continue;
          try {
            const result = await tryApi(s, info, q);
            if (result) { setCache(key, result); return result; }
          } catch (e) { fails.push(e.message || String(e)); }
        }
        throw new Error(fails.length ? fails.join(' || ') : '所有音质均失败');
      })();

      inflight[key] = run;
      try { return await run; } finally { delete inflight[key]; }
    }
  };
  return acc;
}, {});

on(EVENT_NAMES.request, ({ source, action, info } = {}) => {
  if (!apis[source] || action !== 'musicUrl') return Promise.reject('不支持');
  if (!qualitys[source]?.[info?.type]) return Promise.reject(`不支持的音质: ${info?.type}`);
  return apis[source].musicUrl(info.musicInfo, info.type).catch(e => {
    console.error(`[${source}] 失败:`, e.message);
    return Promise.reject(e.message);
  });
});

send(EVENT_NAMES.inited, { openDevTools: false, sources });

;(function() {
  'use strict';

  CONFIG.kg.qualitys = {'128k': '128','320k': '320','flac': 'flac','flac24bit': 'flac24bit','atmos': 'atmos','atmos_plus': 'atmos_plus','hires': 'hires','master': 'master'};
  CONFIG.kw.qualitys = { '128k': '128', '320k': '320', 'flac': 'flac' };

  const API_URL = "https://88.lxmusic.xn--fiqs8s";
  const API_KEY = "lxmusic";
  const SECRET_KEY = 'JaJ?a7Nwk_Fgj?2o:znAkst';
  const SCRIPT_MD5 = '1888f9865338afe6d5534b35171c61a4';
  const KG_QUALITY_LIST = ['master', 'flac24bit', 'flac', '320k', '128k'];
  const KW_QUALITY_LIST = ['flac', '320k', '128k'];
  const MUSIC_SOURCE = ['kg', 'kw'];

  const sha256 = (function() {
    var HEX_CHARS = '0123456789abcdef'.split('');
    function Sha256() {
      this.blocks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
      this.block = this.start = this.bytes = this.hBytes = 0;
      this.finalized = this.hashed = false;
      this.first = true;
    }
    Sha256.prototype.update = function(message) {
      if (this.finalized) return;
      var notString = typeof message !== 'string';
      var blocks = this.blocks;
      for (var i = 0; i < message.length; i++) {
        if (this.hashed) {
          this.hashed = false;
          blocks[0] = this.block;
          blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        var code = notString ? message[i] : message.charCodeAt(i);
        blocks[this.start >> 2] |= code << (24 - (this.start % 4) * 8);
        this.start++;
        if (this.start === 64) {
          this.block = blocks[16];
          this.start = 0;
          this.hash();
          this.hashed = true;
        }
      }
      this.bytes += message.length;
      if (this.bytes > 4294967295) {
        this.hBytes += this.bytes / 4294967296 << 0;
        this.bytes = this.bytes % 4294967296;
      }
      return this;
    };
    Sha256.prototype.finalize = function() {
      if (this.finalized) return;
      this.finalized = true;
      var blocks = this.blocks;
      var i = this.start;
      blocks[16] = this.block;
      blocks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
      this.block = blocks[16];
      if (i >= 56) {
        if (!this.hashed) this.hash();
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }
      blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
      blocks[15] = this.bytes << 3;
      this.hash();
    };
    Sha256.prototype.hash = function() {
      var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks = this.blocks;
      for (var j = 0; j < 64; j++) {
        if (j >= 16) {
          var w0 = blocks[j - 15];
          var w1 = blocks[j - 2];
          var s0 = ((w0 >>> 7) | (w0 << 25)) ^ ((w0 >>> 18) | (w0 << 14)) ^ (w0 >>> 3);
          var s1 = ((w1 >>> 17) | (w1 << 15)) ^ ((w1 >>> 19) | (w1 << 13)) ^ (w1 >>> 10);
          blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1;
        }
        var S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        var ch = (e & f) ^ ((~e) & g);
        var temp1 = h + S1 + ch + K[j] + (blocks[j] >>> 0);
        var S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var temp2 = S0 + maj;
        h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
      }
      this.h0 = (this.h0 + a) >>> 0;
      this.h1 = (this.h1 + b) >>> 0;
      this.h2 = (this.h2 + c) >>> 0;
      this.h3 = (this.h3 + d) >>> 0;
      this.h4 = (this.h4 + e) >>> 0;
      this.h5 = (this.h5 + f) >>> 0;
      this.h6 = (this.h6 + g) >>> 0;
      this.h7 = (this.h7 + h) >>> 0;
    };
    Sha256.prototype.hex = function() {
      this.finalize();
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
      return HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] + HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] + HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] + HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] + HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] + HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] + HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] + HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] + HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] + HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] + HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] + HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] + HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] + HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] + HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] + HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] + HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] + HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] + HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] + HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] + HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] + HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] + HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] + HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F] + HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] + HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] + HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] + HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    };
    return function(message) {
      return new Sha256().update(message).hex();
    };
  })();

  const generateSign = (requestPath) => sha256(requestPath + SCRIPT_MD5 + SECRET_KEY);

  const getSongId = (source, musicInfo) => {
    if (source === 'kg') return musicInfo.hash ?? musicInfo.songmid ?? musicInfo.id;
    if (source === 'kw') return musicInfo.rid ?? musicInfo.id ?? musicInfo.songmid ?? musicInfo.hash;
    return musicInfo.hash ?? musicInfo.songmid ?? musicInfo.id;
  };

  const httpFetch = (url, options = { method: 'GET' }) => {
    const isFullUrl = url.startsWith('http');
    if (!isFullUrl) {
      const requestPath = url;
      const sign = generateSign(requestPath);
      url = `${API_URL}${requestPath}?sign=${sign}`;
    }
    return new Promise((resolve, reject) => {
      request(url, {
        method: options.method || 'GET',
        headers: {
          'accept': 'application/json',
          'x-request-key': API_KEY,
          'user-agent': `${globalThis.lx.env ? `lx-music-${globalThis.lx.env}/${globalThis.lx.version}` : 'lx-music-request/2.0.0'}`
        },
        ...options
      }, (err, resp, body) => {
        if (err) return reject(err);
        const statusCode = resp ? (resp.statusCode || resp.status || 200) : 200;
        resolve({ statusCode, body: body || (resp ? resp.body : null), headers: resp ? resp.headers : {} });
      });
    });
  };

  const handleGetMusicUrl = async (source, musicInfo, quality) => {
    const songId = getSongId(source, musicInfo);
    if (!songId) throw new Error('找不到歌曲ID');
    const requestPath = `/lxmusicv4/url/${source}/${songId}/${quality}`;
    const response = await httpFetch(requestPath);
    const { body, statusCode } = response;
    if (statusCode === 404) throw new Error('API端点不存在');
    if (statusCode >= 500) throw new Error(`服务器错误(${statusCode})`);
    if (!body) throw new Error('服务器返回空响应');
    const data = typeof body === 'string' ? JSON.parse(body) : body;
    if (!data || isNaN(Number(data.code))) throw new Error('无效的响应数据');
    switch (data.code) {
      case 0:
      case 200:
        const musicUrl = data.data || data.url;
        if (musicUrl) return musicUrl;
        throw new Error('响应中未找到有效的URL');
      case 1:
        throw new Error('block ip');
      case 2:
        throw new Error(data.msg || 'get music url failed');
      case 5:
        throw new Error('too many requests');
      default:
        throw new Error(data.msg ?? `Unknown error(code:${data.code})`);
    }
  };

  apis.kg = {
    async musicUrl(info, quality) {
      const id = getSongId('kg', info);
      const key = `kg_${id || info.name || 'unknown'}_${quality}`;
      const cached = getCache(key);
      if (cached) return cached;

      const idx = KG_QUALITY_LIST.indexOf(quality);
      const qList = idx >= 0 ? KG_QUALITY_LIST.slice(idx) : [quality];

      for (const q of qList) {
        try {
          const result = await handleGetMusicUrl('kg', info, q);
          setCache(key, result);
          return result;
        } catch (e) { continue; }
      }
      throw '所有音质均失败';
    }
  };

  apis.kw = {
    async musicUrl(info, quality) {
      const id = getSongId('kw', info);
      const key = `kw_${id || info.name || 'unknown'}_${quality}`;
      const cached = getCache(key);
      if (cached) return cached;

      const idx = KW_QUALITY_LIST.indexOf(quality);
      const qList = idx >= 0 ? KW_QUALITY_LIST.slice(idx) : [quality];

      for (const q of qList) {
        try {
          const result = await handleGetMusicUrl('kw', info, q);
          setCache(key, result);
          return result;
        } catch (e) { continue; }
      }
      throw '所有音质均失败';
    }
  };

  sources.kg = { name: '酷狗母带', type: 'music', actions: ['musicUrl'], qualitys: KG_QUALITY_LIST };
  sources.kw = { name: '酷我无损', type: 'music', actions: ['musicUrl'], qualitys: KW_QUALITY_LIST };

  qualitys.kg = KG_QUALITY_LIST.reduce((acc, q) => { acc[q] = q; return acc; }, {});
  qualitys.kw = KW_QUALITY_LIST.reduce((acc, q) => { acc[q] = q; return acc; }, {});

})();

;(function() {
  'use strict';

  var WY_QUALITY_LIST = ['master', 'hires', 'flac24bit', 'flac', '320k', '128k'];

  function tryApi(url, body) {
    return new Promise(function(resolve, reject) {
      var timer = setTimeout(function() {
        reject('请求超时');
      }, 10000);

      request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        },
        body: body
      }, function(err, resp) {
        clearTimeout(timer);
        if (err) {
          reject(err);
          return;
        }
        try {
          var data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body;
          if (data.code === 200 && data.url) {
            resolve(data.url);
            return;
          }
        } catch (e) {}
        reject('未找到播放链接');
      });
    });
  }

  apis.wy = {
    async musicUrl(info, quality) {
      var id = info.songmid || info.songId || info.id;
      if (!id) throw new Error('网易云歌曲ID不存在');

      var key = 'wy_' + id + '_' + quality;
      var cached = getCache(key);
      if (cached) return cached;

      var fallbackList = [];
      var idx = WY_QUALITY_LIST.indexOf(quality);
      if (idx >= 0) {
        fallbackList = WY_QUALITY_LIST.slice(idx);
      } else {
        fallbackList = ['128k'];
      }

      for (var i = 0; i < fallbackList.length; i++) {
        var q = fallbackList[i];
        var body = {
          source: 'wy',
          musicId: id,
          quality: q
        };

        try {
          var result = await tryApi('https://c.wwwweb.top/music/url', body);
          if (result) {
            setCache(key, result);
            return result;
          }
        } catch (e) {
          continue;
        }
      }

      throw new Error('网易云所有音质均失败');
    }
  };

  sources.wy = {
    name: '网易云音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: WY_QUALITY_LIST
  };

  qualitys.wy = {};
  for (var i = 0; i < WY_QUALITY_LIST.length; i++) {
    var q = WY_QUALITY_LIST[i];
    qualitys.wy[q] = q;
  }
})();

  })

  // [20] gdstudio音乐源 | D0-gdstudio音乐源-v1.0.1.js
  __load(19, function (globalThis, window, self, top, parent, lx, process) {
var DEV_ENABLE = false
var API_BASE = 'https://music-api.gdstudio.xyz/api.php'
var SEARCH_COUNT = 5
var CACHE_TTL = 30 * 60 * 1000
var REQUEST_TIMEOUT = 15000

var QUALITY_MAP = {
  '128k': 128,
  '320k': 320,
  flac: 740,
  flac24bit: 999,
}
var QUALITY_FALLBACKS = {
  999: [740, 320, 128],
  740: [320, 128],
  320: [128],
  128: [],
}

var SOURCE_MAP = {
  wy: 'netease',
  kw: 'kuwo',
  tx: 'tencent',
  kg: 'netease',
  mg: 'netease',
}

var SUPPORTED_SOURCES = ['wy', 'kw', 'tx', 'kg', 'mg']
var MUSIC_QUALITY = {
  wy: ['128k', '320k', 'flac', 'flac24bit'],
  kw: ['128k', '320k', 'flac', 'flac24bit'],
  tx: ['128k', '320k', 'flac', 'flac24bit'],
  kg: ['128k', '320k', 'flac', 'flac24bit'],
  mg: ['128k', '320k', 'flac', 'flac24bit'],
}

var EVENT_NAMES = globalThis.lx.EVENT_NAMES
var request = globalThis.lx.request
var on = globalThis.lx.on
var send = globalThis.lx.send
var env = globalThis.lx.env
var version = globalThis.lx.version

var httpFetch = function (url, options) {
  options = options || { method: 'GET' }
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      reject(new Error('Request timeout'))
    }, REQUEST_TIMEOUT)
    request(url, options, function (err, resp) {
      clearTimeout(timer)
      if (err) return reject(err)
      resolve(resp)
    })
  })
}

var buildSearchUrl = function (source, keyword) {
  return API_BASE + '?types=search&source=' + source + '&name=' + encodeURIComponent(keyword) + '&count=' + SEARCH_COUNT
}

var buildUrlApi = function (source, trackId, br) {
  return API_BASE + '?types=url&source=' + source + '&id=' + trackId + '&br=' + br
}

var SINGER_SPLIT_RXP = /、|&|;|；|\/|,|，|\|/

var normalizeArtist = function (artist) {
  if (!artist) return ''
  if (Array.isArray(artist)) {

    var cleaned = artist.map(function (a) {
      return String(a).replace(/[-.]+$/g, '').trim()
    })
    return cleaned.join('、')
  }
  return String(artist)
}

var getFirstSinger = function (artist) {
  if (!artist) return ''
  var str = normalizeArtist(artist)
  return str.split(SINGER_SPLIT_RXP)[0].toLowerCase()
}

var calcSimilarity = function (a, b) {
  if (!a || !b) return 0
  var sa = a.toLowerCase().replace(/\s+/g, '')
  var sb = b.toLowerCase().replace(/\s+/g, '')
  if (sa === sb) return 100
  if (sa.includes(sb) || sb.includes(sa)) return 80
  var minLen = Math.min(sa.length, sb.length)
  var match = 0
  for (var i = 0; i < minLen; i++) {
    if (sa[i] === sb[i]) match++
    else break
  }
  return (match / Math.max(sa.length, sb.length)) * 60
}

var selectBestMatch = function (list, targetName, targetSinger) {
  if (!list || !list.length) return null
  if (list.length === 1) return list[0]

  var tName = (targetName || '').toLowerCase().trim()
  var tSinger = getFirstSinger(targetSinger)

  var scored = list.map(function (item) {
    var iName = (item.name || '').toLowerCase().trim()
    var iArtistStr = normalizeArtist(item.artist).toLowerCase()
    var iArtistFirst = getFirstSinger(item.artist)

    var score = 0
    if (iName === tName) {
      score += 50
    } else if (iName.includes(tName) || tName.includes(iName)) {
      score += 35
    } else {
      score += calcSimilarity(tName, iName) * 0.3
    }

    if (tSinger && (iArtistStr.indexOf(tSinger) >= 0 || iArtistFirst === tSinger)) {
      score += 40
    } else if (tSinger) {
      score += calcSimilarity(tSinger, iArtistFirst) * 0.2
    }

    return { item: item, score: score }
  })

  scored.sort(function (a, b) { return b.score - a.score })
  if (scored[0].score < 20) return null
  return scored[0].item
}

var pendingCache = {}
var resultCache = {}

var makeCacheKey = function (lxSource, name, singer) {
  var sname = (name || '').toLowerCase().replace(/\s+/g, '')
  var ssinger = getFirstSinger(singer || '')
  return lxSource + ':' + sname + ':' + ssinger
}

var cacheGet = function (key) {
  var entry = resultCache[key]
  if (!entry) return null
  if (Date.now() > entry.expireTime) {
    delete resultCache[key]
    return null
  }
  return entry.data
}

var cacheSet = function (key, data) {
  var keys = Object.keys(resultCache)
  if (keys.length > 500) {
    delete resultCache[keys[0]]
  }
  resultCache[key] = {
    data: data,
    expireTime: Date.now() + CACHE_TTL,
  }
}

var searchSong = async function (lxSource, targetSource, name, singer) {
  var cacheKey = makeCacheKey(lxSource, name, singer)

  var cached = cacheGet(cacheKey)
  if (cached) return cached

  if (pendingCache[cacheKey]) return pendingCache[cacheKey]

  var keyword = (name || '') + ' ' + (singer || '')
  keyword = keyword.trim()
  if (!keyword) throw new Error('Search keyword is empty')

  var promise = (async function () {
    try {
      var resp = await httpFetch(buildSearchUrl(targetSource, keyword))
      var body = resp.body
      if (!body || !Array.isArray(body)) {
        throw new Error('Invalid search response')
      }
      if (!body.length) {
        throw new Error('No search results')
      }

      var matched = selectBestMatch(body, name, singer)
      if (!matched) {
        throw new Error('No matching song found')
      }

      var result = {
        trackId: matched.id,
        lyricId: matched.lyric_id || matched.id,
        picId: matched.pic_id || '',
        matchedName: matched.name,
        matchedArtist: matched.artist,
        gdSource: matched.source || targetSource,
      }
      cacheSet(cacheKey, result)
      return result
    } finally {
      delete pendingCache[cacheKey]
    }
  })()

  pendingCache[cacheKey] = promise
  return promise
}

var handleMusicUrl = async function (lxSource, musicInfo, quality) {
  var targetSource = SOURCE_MAP[lxSource]
  if (!targetSource) throw new Error('Unsupported source: ' + lxSource)

  var requestedBr = QUALITY_MAP[quality] || 320
  var fallbacks = QUALITY_FALLBACKS[requestedBr] || [320, 128]
  var brsToTry = [requestedBr].concat(fallbacks)

  var searchResult = await searchSong(lxSource, targetSource, musicInfo.name, musicInfo.singer)

  for (var i = 0; i < brsToTry.length; i++) {
    var br = brsToTry[i]
    try {
      var resp = await httpFetch(buildUrlApi(searchResult.gdSource, searchResult.trackId, br))
      var body = resp.body
      if (body && body.url) {
        if (br !== requestedBr) {
          console.log('[gdstudio] quality fallback: ' + quality + '(' + requestedBr + ') -> br=' + br)
        }
        return body.url
      }
    } catch (_) {}
  }

  throw new Error('Failed to get audio URL at all quality levels')
}

on(EVENT_NAMES.request, function (data) {
  var action = data.action
  var source = data.source
  var info = data.info

  switch (action) {
    case 'musicUrl':
      if (env !== 'mobile') {
        console.group('[gdstudio] musicUrl')
        console.log('source:', source)
        console.log('quality:', info.type)
        console.log('name:', info.musicInfo && info.musicInfo.name)
        console.log('singer:', info.musicInfo && info.musicInfo.singer)
        console.groupEnd()
      }
      return handleMusicUrl(source, info.musicInfo, info.type)
    default:
      return Promise.reject(new Error('Unsupported action: ' + action))
  }
})

var musicSources = {}
SUPPORTED_SOURCES.forEach(function (s) {
  musicSources[s] = {
    name: s,
    type: 'music',
    actions: ['musicUrl'],
    qualitys: MUSIC_QUALITY[s],
  }
})

send(EVENT_NAMES.inited, {
  openDevTools: DEV_ENABLE,
  sources: musicSources,
})

  })

  // [21] 回避聚合_huibi_aggregate | D0-回避聚合-v0.0.1.js
  __load(20, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send, utils, env, version, currentScriptInfo } = globalThis.lx;

const USER_CONFIG = {
    kwDecrypt: {
        url: '',
        allowEncryptedLossless: false,
        urlParamName: 'url',
        ekeyParamName: 'ekey',
    },
    chksz: {
        apikey: '',
        enableNetease: true,
        enableQQ: true,
    },
    debug: false,
};

const _u = (str) => str.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 5)).join('');

const currentScript = currentScriptInfo
    ? currentScriptInfo.rawScript
    : (typeof document !== 'undefined' ? document.currentScript?.textContent || '' : '');

const parseHeader = (str) => {
    const comment = /^\/\*!(?:.|\n)+?\*\//.exec(str)?.[0];
    if (!comment) return {};
    const result = {};
    const pairs = [
        { key: 'tx_cookie', regex: /\*\s*@tx_cookie\s+(.+)/ },
        { key: 'wy_cookie', regex: /\*\s*@wy_cookie\s+(.+)/ },
    ];
    for (const { key, regex } of pairs) {
        const match = regex.exec(comment);
        const val = match?.[1]?.trim();
        result[key] = (!val || val === 'null') ? '' : val;
    }
    return result;
};
const config = parseHeader(currentScript);
const TX_COOKIE = config.tx_cookie;
const WY_COOKIE = config.wy_cookie;
const HAS_TX_COOKIE = !!TX_COOKIE;
const HAS_WY_COOKIE = !!WY_COOKIE;

const MUSIC_QUALITY = {
    tx: ['128k','192k','320k','flac','flac24bit','hires','atmos','atmos_plus','master'],
    wy: ['128k','192k','320k','flac','flac24bit','hires','atmos','master'],
    kw: ['128k','192k','320k','flac','flac24bit'],
    kg: ['128k','192k','320k','flac','hires','atmos','master'],
    mg: ['128k','320k','flac'],
};
const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY);
const QUALITY_PRIORITY = ['master', 'atmos_plus', 'atmos', 'hires', 'flac24bit', 'flac', '320k', '192k', '128k'];

const httpFetch = (url, options = {}) => new Promise((resolve, reject) => {

    const timeout = options.timeout || 5000;
    const finalOptions = { ...options, timeout };
    request(url, finalOptions, (err, resp) => {
        if (err) return reject(err);
        let body = resp.body;
        if (typeof body === 'string') {
            const trimmed = body.trim();
            if (trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.startsWith('"')) {
                try { body = JSON.parse(trimmed); } catch (e) {}
            }
        }
        resolve({ body, statusCode: resp.statusCode, headers: resp.headers || {} });
    });
});

const md5 = (str) => utils.crypto.md5(str);
const randomGuid = () => {
    const hex = '0123456789abcdef';
    let guid = '';
    for (let i = 0; i < 32; i++) guid += hex[Math.floor(Math.random() * 16)];
    return guid;
};
const aesEncrypt = (data, key, iv, mode) => {
    if (!version) mode = mode.split('-').pop();
    return utils.crypto.aesEncrypt(data, mode, key, iv);
};
const buf2hex = (buffer) => {
    return version
        ? utils.buffer.bufToString(buffer, 'hex')
        : [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
};
const wyEapi = (url, object) => {
    const eapiKey = 'e82ckenh8dichen8';
    const text = typeof object === 'object' ? JSON.stringify(object) : object;
    const digest = md5('nobody' + url + 'use' + text + 'md5forencrypt');
    const data = url + '-36cd479b6b5-' + text + '-36cd479b6b5-' + digest;
    return { params: buf2hex(aesEncrypt(data, eapiKey, '', 'aes-128-ecb')).toUpperCase() };
};
const objToForm = (obj) => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
const extractUrl = (obj, paths) => {
    for (const path of paths) {
        let val = obj;
        for (const key of path) {
            if (val == null) { val = undefined; break; }
            val = val[key];
        }
        if (Array.isArray(val)) val = val[0];
        if (typeof val === 'string' && (val.startsWith(_u('cook5**')) || val.startsWith(_u('cookn5**')))) return val;
        if (typeof val === 'string' && val.startsWith('//')) return 'https:' + val;
    }
    return '';
};
const cleanUrl = (url) => {
    if (!url) return '';
    const s = String(url).replace(/\\?u0026/gi, '&').replace(/\\&/g, '&').replace(/\$/g, '&');
    const idx = s.indexOf('?');
    return idx > 0 ? s.substring(0, idx) : s;
};
const qualityToLevel = (quality) => {
    const map = {
        '128k': 'standard', '192k': 'standard', '320k': 'exhigh',
        'flac': 'lossless', 'flac24bit': 'lossless', 'hires': 'lossless',
        'atmos': 'lossless', 'atmos_plus': 'lossless', 'master': 'lossless',
    };
    return map[quality] || 'standard';
};

const simpleGetQueryParam = (url, key) => {
    if (typeof url !== 'string' || !url) return null;
    const qIdx = url.indexOf('?');
    if (qIdx < 0) return null;
    const query = url.substring(qIdx + 1).split('#')[0];
    const pairs = query.split('&');
    for (const p of pairs) {
        const eq = p.indexOf('=');
        if (eq < 0) continue;
        if (p.substring(0, eq) === key) return decodeURIComponent(p.substring(eq + 1));
    }
    return null;
};

const qualityMatch = (url, quality) => {
    if (!url) return false;
    const lower = url.toLowerCase();

    if (quality === 'master' || quality === 'hires' || quality === 'flac24bit' || quality === 'atmos' || quality === 'atmos_plus') {
        return !lower.includes('.mp3') && (lower.includes('.flac') || lower.includes('.mflac') || lower.includes('.wav'));
    }
    if (quality === 'flac') {
        return lower.includes('.flac') && !lower.includes('.mp3');
    }

    return true;
};

var HEX_CHARS = '0123456789abcdef'.split('');
function Sha256() {
    this.blocks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.h0 = 0x6a09e667;
    this.h1 = 0xbb67ae85;
    this.h2 = 0x3c6ef372;
    this.h3 = 0xa54ff53a;
    this.h4 = 0x510e527f;
    this.h5 = 0x9b05688c;
    this.h6 = 0x1f83d9ab;
    this.h7 = 0x5be0cd19;
    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
}
Sha256.prototype.update = function(message) {
    if (this.finalized) return;
    var notString = typeof message !== 'string';
    var blocks = this.blocks;
    for (var i = 0; i < message.length; i++) {
        if (this.hashed) {
            this.hashed = false;
            blocks[0] = this.block;
            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        var code = notString ? message[i] : message.charCodeAt(i);
        blocks[this.start >> 2] |= code << (24 - (this.start % 4) * 8);
        this.start++;
        if (this.start === 64) {
            this.block = blocks[16];
            this.start = 0;
            this.hash();
            this.hashed = true;
        }
    }
    this.bytes += message.length;
    if (this.bytes > 4294967295) {
        this.hBytes += this.bytes / 4294967296 << 0;
        this.bytes = this.bytes % 4294967296;
    }
    return this;
};
Sha256.prototype.finalize = function() {
    if (this.finalized) return;
    this.finalized = true;
    var blocks = this.blocks;
    var i = this.start;
    blocks[16] = this.block;
    blocks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
    this.block = blocks[16];
    if (i >= 56) {
        if (!this.hashed) this.hash();
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
};
Sha256.prototype.hash = function() {
    var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks = this.blocks;
    for (var j = 0; j < 64; j++) {
        if (j >= 16) {
            var w0 = blocks[j - 15];
            var w1 = blocks[j - 2];
            var s0 = ((w0 >>> 7) | (w0 << 25)) ^ ((w0 >>> 18) | (w0 << 14)) ^ (w0 >>> 3);
            var s1 = ((w1 >>> 17) | (w1 << 15)) ^ ((w1 >>> 19) | (w1 << 13)) ^ (w1 >>> 10);
            blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1;
        }
        var S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        var ch = (e & f) ^ ((~e) & g);
        var temp1 = h + S1 + ch + K[j] + (blocks[j] >>> 0);
        var S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var temp2 = S0 + maj;
        h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    this.h0 = (this.h0 + a) >>> 0;
    this.h1 = (this.h1 + b) >>> 0;
    this.h2 = (this.h2 + c) >>> 0;
    this.h3 = (this.h3 + d) >>> 0;
    this.h4 = (this.h4 + e) >>> 0;
    this.h5 = (this.h5 + f) >>> 0;
    this.h6 = (this.h6 + g) >>> 0;
    this.h7 = (this.h7 + h) >>> 0;
};
Sha256.prototype.hex = function() {
    this.finalize();
    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
    return HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] + HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] + HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] + HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] + HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] + HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] + HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] + HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] + HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] + HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] + HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] + HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] + HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] + HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] + HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] + HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] + HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] + HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] + HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] + HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] + HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] + HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] + HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] + HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F] + HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] + HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] + HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] + HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
};
const sha256 = (message) => new Sha256().update(message).hex();

const FISH_DOMAIN = 'music.gdstudio.xyz';
const FISH_VERSION = '20260510';
const fishSign = async (secret) => {
    const timeRes = await httpFetch(_u('cookn5**') + FISH_DOMAIN + '/time', { method: 'GET', timeout: 3000 });
    const timeStr = String(Number(timeRes.body) || Date.now()).slice(0, 9);
    const signInput = FISH_DOMAIN + '|' + FISH_VERSION + '|' + timeStr + '|' + secret;
    return md5(signInput).slice(-8).toUpperCase();
};
const fishPost = async (params, secret) => {
    const sign = await fishSign(secret);
    params.s = sign;
    const body = objToForm(params);
    const res = await httpFetch(_u('cookn5**') + FISH_DOMAIN + '/api.php', {
        method: 'POST',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Origin: _u('cookn5**') + FISH_DOMAIN,
            Referer: _u('cookn5**') + FISH_DOMAIN + '/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: body,
    });
    return res.body;
};

const HELLO_WORLD_API_KEY = 'lxmusic';
const HELLO_WORLD_SECRET_KEY = 'JaJ?a7Nwk_Fgj?2o:znAkst';
const HELLO_WORLD_SCRIPT_MD5 = '1888f9865338afe6d5534b35171c61a4';
const HELLO_WORLD_API_URL = _u('cookn5**33)gshpnd^)si((adln3n');
const helloWorldSign = (requestPath) => sha256(requestPath + HELLO_WORLD_SCRIPT_MD5 + HELLO_WORLD_SECRET_KEY);
const HYW_API_BASE = _u('cook5**,+.)24),3/)42');
const HYW_CARD_KEY = 'MOLAN-BAIJI';

const TX_FILE_CONFIG = {
    '128k': { s: 'M500', e: '.mp3', br: '128k' },
    '320k': { s: 'M800', e: '.mp3', br: '320k' },
    flac: { s: 'F000', e: '.flac', br: 'flac' },
    flac24bit: { s: 'AI00', e: '.flac', br: 'flac24bit' },
    hires: { s: 'AI00', e: '.flac', br: 'hires' },
    atmos: { s: 'AI00', e: '.flac', br: 'atmos' },
    atmos_plus: { s: 'AI00', e: '.flac', br: 'atmos' },
    master: { s: 'AI00', e: '.flac', br: 'master' },
};

const WY_LEVEL_MAP = {
    '128k': 'standard',
    '320k': 'exhigh',
    flac: 'lossless',
    flac24bit: 'hires',
    hires: 'hires',
    atmos: 'sky',
    master: 'jymaster',
};

const KW_LEVEL_MAP = {
    '128k': '128k',
    '192k': '128k',
    '320k': '320k',
    flac: 'lossless',
    flac24bit: 'lossless',
};
const KW_STREAM_LEVEL_MAP = {
    '128k': '128k',
    '192k': '128k',
    '320k': '320k',
    flac: 'flac',
    flac24bit: 'flac',
    hires: 'hires',
    atmos: 'atmos',
    atmos_plus: 'atmos_plus',
    master: 'master',
};

const KG_LEVEL_MAP = {
    '128k': 'standard',
    '192k': 'standard',
    '320k': 'exhigh',
    flac: 'lossless',
    flac24bit: 'hires',
    hires: 'hires',
    atmos: 'atmos',
    atmos_plus: 'atmos',
    master: 'clear',
};

const getQQExploit = async (songId, quality, musicInfo) => {
    const songmid = songId || musicInfo?.songmid || musicInfo?.id;
    if (!songmid) throw new Error('QQ越权: 缺少 songmid');
    const mediaMid = musicInfo?.mediaMid || musicInfo?.strMediaMid || musicInfo?.media_mid || '';
    const prefixMap = { '128k':'M500','192k':'M800','320k':'M800','flac':'F000','flac24bit':'RS01','hires':'RS01','atmos':'atmosphere','atmos_plus':'atmosphere','master':'AIM00' };
    const prefix = prefixMap[quality] || 'M800';
    const extMap = { 'M500':'mp3','M800':'mp3','F000':'flac','RS01':'flac','AIM00':'mflac','atmosphere':'flac' };
    const ext = extMap[prefix] || 'mp3';
    const midForFile = mediaMid || songmid;
    const qqKey = '1984LZXvCR';
    const qqUin = '1234567890';
    const pgv_pvid = Math.floor(Math.random() * 10000000000).toString();
    const qqCookie = `qm_keyst=${qqKey}; uin=o${qqUin}; pgv_pvid=${pgv_pvid}; qqmusic_key=${qqKey}; qqmusic_uin=o${qqUin}; psrf_qqaccess_token=${qqKey}; ts_uid=${pgv_pvid}; psi=${pgv_pvid}`;

    const filename = `${prefix}${midForFile}.${ext}`;
    const bodyA = {
        comm: { ct: 19, cv: 0, guid: pgv_pvid, tmeAppID: 'qqmusic', qq: qqUin },
        hot: { method: 'CgiGetHotVkey', module: 'music.vkey.GetEVkey', param: { filename: [filename], songmid: [songmid] } },
        ekey: { method: 'GetEkey', module: 'music.vkey.GetEVkey', param: { finfo: [{ filename, mid: midForFile || '0' }] } }
    };
    try {
        const resp = await httpFetch(_u('cookn5**po)t)ll)^jh*^bd(]di*hpnd^p)a^b'), {
            method: 'POST', timeout: 5000,
            headers: { 'Content-Type': 'application/json', 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Cookie': qqCookie },
            body: JSON.stringify(bodyA)
        });
        const d = resp.body;
        if (d?.hot?.data?.urls?.[0]?.purl) {
            return _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*') + d.hot.data.urls[0].purl;
        }
    } catch (e) {}

    const variants = [
        { filename: `${prefix}${songmid}${songmid}.${ext}`, uin: qqUin, loginflag: 1 },
        { filename: `${prefix}${songmid}.${ext}`, uin: qqUin, loginflag: 1 },
        { filename: `${prefix}${songmid}${songmid}.${ext}`, uin: '', loginflag: 1 },
        { filename: `${prefix}${songmid}.${ext}`, uin: '', loginflag: 1 }
    ];
    for (const v of variants) {
        try {
            const param = { filename: [v.filename], songmid: [songmid], songtype: [0], uin: v.uin, loginflag: v.loginflag, platform: '23', firstlogin: 1, newver: 1, nohash: 0, cms: 0 };
            const apiData = JSON.stringify({
                comm: { uin: v.uin ? parseInt(v.uin) : 0, format: 'json', ct: 23, cv: 0, ...(v.uin ? { qq: v.uin } : {}) },
                req_0: { module: 'vkey.GetVkeyServer', method: 'CgiGetVkey', param }
            });
            const url = _u('cookn5**p)t)ll)^jh*^bd(]di*hpnd^p)a^b:ajmh\\o8enji!_\\o\\8') + encodeURIComponent(apiData);
            const resp = await httpFetch(url, {
                method: 'GET', timeout: 5000,
                headers: { 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Cookie': qqCookie }
            });
            const d = resp.body;
            if (d?.code === 0 && d?.req_0?.data?.midurlinfo?.[0]?.purl) {
                const sip = d.req_0.data.sip?.[0] || _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*');
                return sip + d.req_0.data.midurlinfo[0].purl;
            }
        } catch (e) {}
    }

    try {
        const bodyC = {
            comm: { ct: 19, cv: 0, guid: pgv_pvid, tmeAppID: 'qqmusic', qq: qqUin },
            hot: { method: 'CgiGetHotVkey', module: 'music.vkey.GetEVkey', param: { filename: [filename], songmid: [songmid] } }
        };
        const resp = await httpFetch(_u('cookn5**po)t)ll)^jh*^bd(]di*hpnd^p)a^b'), {
            method: 'POST', timeout: 5000,
            headers: { 'Content-Type': 'application/json', 'Referer': _u('cookn5**t)ll)^jh*'), 'User-Agent': 'Mozilla/5.0 QQMusic/2201', 'Cookie': qqCookie },
            body: JSON.stringify(bodyC)
        });
        const d = resp.body;
        if (d?.hot?.data?.urls?.[0]?.purl) {
            return _u('cookn5**_g)nom`\\h)llhpnd^)ll)^jh*') + d.hot.data.urls[0].purl;
        }
    } catch (e) {}

    throw new Error('QQ越权全部失败');
};

const getYgkingTx = async (songId, quality, musicInfo) => {
    const mid = musicInfo?.songmid || musicInfo?.strMediaMid || musicInfo?.mediaMid || songId;
    if (!mid) throw new Error('ygking: 缺少 mid');
    const qMap = { '128k':'128','192k':'320','320k':'320','flac':'flac','flac24bit':'hires','hires':'hires','master':'master','atmos':'master','atmos_plus':'master' };
    const q = qMap[quality] || '320';
    const url = _u('cookn5**\\kd)tbfdib)^i*\\kd*njib*pmg:hd_8') + encodeURIComponent(mid) + _u('!lp\\gdot8') + q;
    const resp = await httpFetch(url, { method: 'GET', timeout: 5000 });
    const d = resp.body;
    if (d?.code === 0 && d?.data?.[mid]) {
        return d.data[mid];
    }
    throw new Error('ygking 失败');
};

const getCanxiang = async (songId, quality, musicInfo) => {
    const id = musicInfo?.songId || musicInfo?.id || songId;
    const name = musicInfo?.songName || musicInfo?.name || '';
    const singer = musicInfo?.singer || '';
    const qMap = { '128k':'128k','192k':'320k','320k':'320k','flac':'flac','flac24bit':'hires','hires':'hires','master':'jymaster','atmos':'jymaster','atmos_plus':'jymaster' };
    const type = qMap[quality] || '320k';
    const token = 'canxiang_token_2026';
    let params = { token, type };
    if (id) params.id = String(id);
    else if (name) { params.msg = name + (singer ? ' ' + singer : ''); params.n = 1; }
    else throw new Error('残像: 缺少 id 或歌名');
    const query = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&');
    const url = _u('cookn5**\\kd)^\\isd\\ib)^i*\\kd*rtthpnd^:') + query;
    const resp = await httpFetch(url, { method: 'GET', timeout: 5000 });
    const d = resp.body;
    if (d?.code === 200 && d?.data?.url) {
        return d.data.url;
    }
    throw new Error('残像 失败');
};

const getXinghai = async (platform, songId, quality, musicInfo) => {
    const sourceMap = { kw: 'kw', kg: 'kg', mg: 'migu' };
    const source = sourceMap[platform];
    if (!source) throw new Error('星海聚合: 不支持平台 ' + platform);
    const id = platform === 'kg' ? (musicInfo?.hash || songId) : (musicInfo?.songmid || musicInfo?.rid || songId);
    if (!id) throw new Error('星海聚合: 缺少 id');
    const name = musicInfo?.name || musicInfo?.songName || '';
    const singer = musicInfo?.singer || '';
    const qMap = { '128k':'128kmp3','192k':'320kmp3','320k':'320kmp3','flac':'flac','flac24bit':'hires','hires':'hires','master':'flac','atmos':'flac','atmos_plus':'flac' };
    const qualityParam = qMap[quality] || '320kmp3';
    const url = _u('cookn5**\\kd)sdibc\\d)^jh*gs*\\kd*:njpm^`8') + source + _u('!i\\h`8') + encodeURIComponent(name + ' ' + singer) + _u('!njibhd_8') + encodeURIComponent(id) + _u('!lp\\gdot8') + qualityParam;
    const resp = await httpFetch(url, { method: 'GET', timeout: 5000 });
    const d = resp.body;
    if (d?.code === 200 && d?.url) return d.url;
    throw new Error('星海聚合 失败');
};
const getXinghaiKw = (songId, quality, musicInfo) => getXinghai('kw', songId, quality, musicInfo);
const getXinghaiKg = (songId, quality, musicInfo) => getXinghai('kg', songId, quality, musicInfo);
const getXinghaiMg = (songId, quality, musicInfo) => getXinghai('mg', songId, quality, musicInfo);

const getYunmgeKw = async (songId, quality, musicInfo) => {
    const id = musicInfo?.rid || musicInfo?.songmid || songId;
    if (!id) throw new Error('yunmge: 缺少 id');
    const brMap = { '128k':128, '192k':192, '320k':320, 'flac':2000, 'flac24bit':2000, 'hires':4000, 'master':4000 };
    const wantBr = brMap[quality] || 320;
    const url = _u('cookn5**\\kd)tpihb`)^jh*fprj:f`t8tpihb`Zf`t!ojf`i8tpihb`Zojf`i!d_8') + encodeURIComponent(id);
    const resp = await httpFetch(url, { method: 'GET', timeout: 5000 });
    const d = resp.body;
    if (d?.code === 200 && d?.data?.all_bitrates) {
        const list = d.data.all_bitrates;
        const brOrder = [4000, 2000, 320, 192, 128];
        for (const br of brOrder) {
            if (br < wantBr) continue;
            const item = list.find(b => b.bitrate === br || String(b.bitrate) === String(br));
            if (item && item.play_url) return item.play_url;
        }
        const fallback = list.find(b => b.play_url);
        if (fallback) return fallback.play_url;
    }
    throw new Error('yunmge 失败');
};

const getNianxinKg = async (songId, quality, musicInfo) => {
    const hash = musicInfo?.hash || musicInfo?.songmid || songId;
    if (!hash) throw new Error('念心: 缺少 hash');
    const levelMap = { '128k':'128kmp3','192k':'320kmp3','320k':'320kmp3','flac':'2000kflac','flac24bit':'4000kflac','hires':'hires','master':'4000kflac','atmos':'4000kflac','atmos_plus':'4000kflac' };
    const level = levelMap[quality] || '320kmp3';
    const url = _u('cookn5**h^k)id\\isdisu)^jh*fbll*fb)kck:d_8') + encodeURIComponent(hash) + _u('!g`q`g8') + level + _u('!otk`8hk.');
    const resp = await httpFetch(url, { method: 'GET', timeout: 5000 });
    const d = resp.body;
    if (d?.code === 200 && d?.url) return d.url;
    if (typeof d === 'string' && d.startsWith('http')) return d;
    throw new Error('念心 失败');
};

const extractFFURL = (d) => {
    if (!d || typeof d !== 'object') return '';
    if (typeof d.url === 'string' && d.url.startsWith('http')) return d.url;
    if (d.data) {
        if (typeof d.data === 'string' && d.data.startsWith('http')) return d.data;
        if (typeof d.data.url === 'string' && d.data.url.startsWith('http')) return d.data.url;
        if (typeof d.data.play_url === 'string' && d.data.play_url.startsWith('http')) return d.data.play_url;
        if (d.data.vipmusic && typeof d.data.vipmusic.url === 'string' && d.data.vipmusic.url.startsWith('http')) return d.data.vipmusic.url;
        if (Array.isArray(d.data) && d.data[0]) {
            if (typeof d.data[0].url === 'string' && d.data[0].url.startsWith('http')) return d.data[0].url;
            if (typeof d.data[0] === 'string' && d.data[0].startsWith('http')) return d.data[0];
        }
    }
    return '';
};
const getFFAPI = async (songmid, quality, musicInfo) => {
    const src = (musicInfo && musicInfo.source) || '';
    const id = songmid || '';
    if (!id) return '';
    let page = '';
    if (src === 'tx') page = 'https://y.qq.com/n/ryqq/songDetail/' + id;
    else if (src === 'wy') page = 'https://music.163.com/song?id=' + id;
    else if (src === 'kw') page = 'https://www.kuwo.cn/play_detail/' + id;
    else if (src === 'kg') page = 'https://www.kugou.com/song/#hash=' + id;
    else if (src === 'mg') page = 'https://music.migu.cn/v3/music/song/' + id;
    else return '';
    const res = await httpFetch('https://ffapi.cn/int/v2/songurl?url=' + encodeURIComponent(page), { method: 'GET', timeout: 5000 });
    const d = res && res.body;
    if (typeof d === 'string') {
        try { const j = JSON.parse(d); return extractFFURL(j); } catch (e) { return ''; }
    }
    return extractFFURL(d);
};

const CHKSZ_CONFIG = USER_CONFIG.chksz;
const CHKSZ_NETEASE_LEVEL_MAP = {
    '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless',
    'hires': 'hires', 'atmos': 'jymaster', 'master': 'jymaster'
};
const CHKSZ_QQ_SIZE_MAP = {
    '128k': '128k', '192k': '320k', '320k': '320k',
    'flac': 'flac', 'hires': 'hires',
    'atmos': 'master', 'atmos_plus': 'master', 'master': 'master'
};
const getChkszWy = async (id, quality) => {
    const level = CHKSZ_NETEASE_LEVEL_MAP[quality];
    if (!level) throw new Error('chksz不支持该品质');
    const url = `https://api.chksz.com/api/163_music?id=${id}&level=${level}&apikey=${encodeURIComponent(CHKSZ_CONFIG.apikey)}`;
    const resp = await httpFetch(url, { timeout: 5000 });
    if (resp.statusCode !== 200 || resp.body.code !== 200 || !resp.body.data?.url)
        throw new Error(`chksz网易失败: ${resp.body?.msg || '无url'}`);
    return resp.body.data.url;
};
const getChkszTx = async (mid, quality) => {
    const size = CHKSZ_QQ_SIZE_MAP[quality];
    if (!size) throw new Error('chksz不支持该品质');
    const url = `https://api.chksz.com/api/qq_music?mid=${mid}&size=${size}&type=json&apikey=${encodeURIComponent(CHKSZ_CONFIG.apikey)}`;
    const resp = await httpFetch(url, { timeout: 5000 });
    if (resp.statusCode !== 200 || resp.body.code !== 200 || !resp.body.url)
        throw new Error(`chksz QQ失败: ${resp.body?.msg || '无url'}`);
    return resp.body.url;
};

const KW_DECRYPT_PROXY = USER_CONFIG.kwDecrypt;
const processKwEncryptedUrl = (data, source) => {
    if (source !== 'kw' || !KW_DECRYPT_PROXY.allowEncryptedLossless) return data?.url || '';
    let ekey = data?.ekey || simpleGetQueryParam(data?.url, 'ekey') || '';
    if (!ekey || !KW_DECRYPT_PROXY.url) return data?.url || '';
    const rawUrl = typeof data.url === 'string' ? data.url : String(data.url);
    try {
        return `${KW_DECRYPT_PROXY.url}?${KW_DECRYPT_PROXY.urlParamName}=${encodeURIComponent(rawUrl)}&${KW_DECRYPT_PROXY.ekeyParamName}=${encodeURIComponent(ekey)}`;
    } catch (e) { return rawUrl; }
};

let userToken = '';
let tokenTimestamp = 0;
const TOKEN_TTL = 5 * 60 * 1000;
let deviceId = '';
let clientHeader = '';

const generateDeviceId = () => 'lx-online-' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36).slice(-4);
const buildClientHeader = () => {
    let deviceType = 'unknown';
    try {
        const p = (env?.platform || '').toLowerCase();
        if (p.includes('android')) deviceType = 'Android';
        else if (p.includes('ios')) deviceType = 'iOS';
        else if (p.includes('win')) deviceType = 'Windows';
        else if (p.includes('mac')) deviceType = 'macOS';
        else if (p.includes('linux')) deviceType = 'Linux';
    } catch (e) {}
    return `HuiBiAggregate/v0.0.1 (${deviceType})`;
};
const generateToken = (ip) => {
    if (!deviceId) deviceId = generateDeviceId();
    const payload = {
        device_id: deviceId,
        ip: ip || '0.0.0.0',
        timestamp: Math.floor(Date.now() / 1000),
        random: Math.random().toString(36).substring(2, 12)
    };
    tokenTimestamp = Date.now();
    try {
        if (globalThis.lx?.utils?.buffer?.from) {
            const buf = globalThis.lx.utils.buffer.from(JSON.stringify(payload), 'utf-8');
            return globalThis.lx.utils.buffer.bufToString(buf, 'base64');
        }
        if (typeof Buffer !== 'undefined') return Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
        return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch (e) { return ''; }
};
const ensureTokenFresh = () => {
    if (!userToken || (Date.now() - tokenTimestamp) > TOKEN_TTL) {
        userToken = generateToken(null);
    }
};

const CACHE_TTL_MS = 21600000;
const CACHE_MAX_SIZE = 300;
const urlCache = new Map();
const getCachedUrl = (key) => {
    const entry = urlCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
        urlCache.delete(key);
        return null;
    }
    return entry.url;
};
const setCachedUrl = (key, url) => {
    urlCache.set(key, { url, timestamp: Date.now() });
    if (urlCache.size > CACHE_MAX_SIZE) {
        const oldest = urlCache.keys().next().value;
        if (oldest) urlCache.delete(oldest);
    }
};
const buildCacheKey = (source, songId, quality) => `${source}_${songId}_${quality}`;

const TX_BACKENDS = [
    ...(CHKSZ_CONFIG.apikey && CHKSZ_CONFIG.enableQQ ? [{ name: 'ChKSz QQ', fetch: async (songId, quality, info) => getChkszTx(info?.songmid || songId, quality) }] : []),
    { name: 'ygking QQ', fetch: getYgkingTx },
    { name: 'QQ越权', fetch: getQQExploit },
    { name: 'QQ官方', fetch: async (songmid, quality) => {
        const fileInfo = TX_FILE_CONFIG[quality];
        if (!fileInfo) throw new Error('不支持的音质');
        const guid = randomGuid();
        const file = fileInfo.s + songmid + fileInfo.e;
        const reqData = {
            req_0: { module: 'vkey.GetVkeyServer', method: 'CgiGetVkey', param: { filename: [file], guid, songmid: [songmid], songtype: [0], uin: '0', loginflag: HAS_TX_COOKIE ? 1 : 0, platform: '20' } },
            loginUin: '0',
            comm: { uin: '0', format: 'json', ct: 24, cv: 0 },
        };
        const headers = { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0', Referer: _u('cookn5**t)ll)^jh*') };
        if (HAS_TX_COOKIE) headers.Cookie = TX_COOKIE;
        const res = await httpFetch(_u('cookn5**p)t)ll)^jh*^bd(]di*hpnd^p)a^b'), { method: 'POST', headers, body: JSON.stringify(reqData) });
        const d = res.body;
        if (d && d.req_0 && d.req_0.data && d.req_0.data.midurlinfo && d.req_0.data.midurlinfo[0] && d.req_0.data.midurlinfo[0].purl) {
            const sip = d.req_0.data.sip || [_u('cookn5**dnpm`)nom`\\h)llhpnd^)ll)^jh*')];
            return sip[Math.floor(Math.random() * sip.length)] + d.req_0.data.midurlinfo[0].purl;
        }
        throw new Error('QQ官方: 无数据');
    } },
    { name: '星海主后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8ll!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海主后端: ' + (d?.msg || '无数据'));
    } },
    { name: '星海备后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8ll!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海备后端: ' + (d?.msg || '无数据'));
    } },
    { name: 'HelloWorld QQ', fetch: async (songmid, quality, musicInfo) => {
        const keyword = encodeURIComponent(musicInfo?.name || musicInfo?.songName || '');
        if (!keyword) throw new Error('HelloWorld QQ: 缺少歌曲名');
        const qMap = { '128k': '0', '320k': '1', 'flac': '4', 'master': '5' };
        const type = qMap[quality] || '1';
        const url = _u('cookn5**\\)\\\\)^\\]*ll)hpnd^:hnb8') + keyword + _u('!i8,!otk`8') + type;
        const res = await httpFetch(url, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d) {
            if (d.data?.music && typeof d.data.music === 'string' && d.data.music.startsWith('http')) return d.data.music;
            if (d.playUrl && typeof d.playUrl === 'string' && d.playUrl.startsWith('http')) return d.playUrl;
            if (d.url && typeof d.url === 'string' && d.url.startsWith('http')) return d.url;
            if (d.data?.url && typeof d.data.url === 'string' && d.data.url.startsWith('http')) return d.data.url;
        }
        throw new Error('HelloWorld QQ: 无有效链接');
    } },
    { name: '溯音QQ', fetch: async (songmid, quality) => {
        const brMap = { '128k': '7', '320k': '5', flac: '4', flac24bit: '1', hires: '1', atmos: '1', master: '1' };
        const br = brMap[quality] || '7';
        const res = await httpFetch(_u('cookn5**jd\\kd)i`o*\\kd*LLZHpnd^:f`t8jd\\kd(`a1,..]2(\\^-a(_^2_(323^(_.`-+2\\3-020!otk`8enji!]m8') + br + '&n=1&mid=' + songmid, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['data', 'music'], ['data', 'url'], ['url']]);
        if (url) return url;
        throw new Error('溯音QQ: 无数据');
    } },
    { name: 'xcvts', fetch: async (songmid, quality) => {
        const apiKeys = ['78993344b9bf1105655599009cdba3d2', 'ce778eb0d1858edfb4b2071a115f1edf'];
        const qualityMap = { '128k': 'standard', '320k': 'exhigh', flac: 'lossless', flac24bit: 'hires' };
        const q = qualityMap[quality] || 'standard';
        const errors = [];
        for (const key of apiKeys) {
            try {
                const res = await httpFetch(_u('cookn5**\\kd)s^qon)^i*\\kd*hpnd^*ll:\\kdF`t8') + key + '&mid=' + songmid + '&type=' + q, { method: 'GET', timeout: 5000 });
                const d = res.body;
                const url = extractUrl(d, [['data', 'music'], ['data', 'url'], ['url']]);
                if (url) return url;
            } catch (e) { errors.push(e.message); }
        }
        throw new Error('xcvts: ' + errors.join(' | '));
    } },
    { name: 'vkeys', fetch: async (songmid, quality) => {
        const qualityMap = { '128k': '8', '320k': '9', flac: '10', flac24bit: '16', hires: '14', atmos: '13', atmos_plus: '12', master: '11' };
        const q = qualityMap[quality];
        if (!q) throw new Error('vkeys 不支持的音质');
        const res = await httpFetch(_u('cookn5**\\kd)qf`tn)^i*q-*hpnd^*o`i^`io*b`opmg:hd_8') + songmid + '&quality=' + q, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data && d.data.url) return d.data.url;
        if (d && d.url) return d.url;
        throw new Error('vkeys: 无数据');
    } },
    { name: 'vkeys旧版', fetch: async (songmid, quality) => {
        const qualityMap = { '128k': '8', '320k': '9', flac: '10', flac24bit: '16', hires: '14', atmos: '13', atmos_plus: '12', master: '11' };
        const q = qualityMap[quality];
        if (!q) throw new Error('vkeys旧版 不支持的音质');
        const res = await httpFetch(_u('cookn5**\\kd)qf`tn)^i*hpnd^*o`i^`io*njib*gdif:hd_8') + songmid + '&quality=' + q, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['data', 'url'], ['url']]);
        if (url) return url;
        throw new Error('vkeys旧版: 无数据');
    } },
    { name: '柳云API', fetch: async (songmid, quality) => {
        const qualityMap = { '128k': '128k', '320k': '320k', flac: 'flac', flac24bit: 'master', hires: 'atmos', atmos: 'atmos', atmos_plus: 'atmos', master: 'master' };
        const q = qualityMap[quality] || '128k';
        let card = '';
        try {
            const cardRes = await httpFetch(_u('cookn5**bdocp])^jh*>c\\mg`nKdf\\^cp*hpnd^_g*m`g`\\n`n*_jrigj\\_*f`tn*]\\dhpnd^)oso'), { method: 'GET', timeout: 5000 });
            card = String(cardRes.body || '').trim();
        } catch (e) {}
        const res = await httpFetch(_u('cookn5**\\kd)gdptpid_^)^i*]\\dhpnd^*hpnd^pmg)kck:njpm^`8os!hpnd^D_8') + songmid + '&quality=' + q + (card ? '&card=' + encodeURIComponent(card) : ''), { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('柳云API: 无数据');
    } },
    { name: '317ak', fetch: async (songmid, quality) => {
        const brMap = { '128k': '5', '320k': '6', flac: '8', flac24bit: '7', hires: '9', atmos: '10', atmos_plus: '10', master: '10' };
        const br = brMap[quality] || '5';
        const res = await httpFetch(_u('cookn5**\\kd).,2\\f)^i*\\kd*tditp`*lltditp`:^f`t8UF21LE>DC0KKD>EJJSPC!d8') + songmid + '&br=' + br + '&type=json&lrc=1', { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('317ak: 无数据');
    } },
    { name: '玉宁熙', fetch: async (songmid, quality) => {
        const qualityMap = { '128k': '标准', '320k': 'HQ', flac: 'SQ', flac24bit: '母带', hires: '母带', atmos: '母带', master: '母带' };
        const q = qualityMap[quality] || '标准';
        const res = await httpFetch(_u('cookn5**\\kd(q-)tp\\a`ib)^i*<KD*llhpnd^)kck:otk`8') + encodeURIComponent(q) + '&mid=' + songmid + '&apikey=3ff23523e47465224a3f48579acf41f241540ce04b6cc0b94164f37a5b6299d5', { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data && d.data.music) return d.data.music;
        throw new Error('玉宁熙: 无数据');
    } },
    { name: '收集聚合', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**^t\\kd)ojk*<KD*llZhpnd^)kck:\\kdf`t8,aa_a02..a0_0.321+`1._2`/1]\\,2/.3_4a2]4_a^,3^0,]`,,+4.31a_2/^.\\,!otk`8enji!hd_8') + songmid, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.url) return d.url;
        throw new Error('收集聚合: 无数据');
    } },
    { name: 'lxmusic88', fetch: async (songmid, quality) => {
        try {
            const res = await httpFetch(_u('cookn5**33)gshpnd^)si((adln3n*gshpnd^q/*pmg*os*') + songmid + '/' + quality, { method: 'GET', timeout: 5000, headers: { 'x-request-key': 'lxmusic' } });
            const d = res.body;
            if (d && (d.code === 0 || d.code === 200) && d.data) return d.data;
            if (d && d.url) return d.url;
        } catch (e) {}
        const res = await httpFetch(_u('cookn5**33)gshpnd^)si((adln3n*gshpnd^q.*pmg*os*') + songmid + '/' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data) return d.data;
        throw new Error('lxmusic88: 无数据');
    } },
    { name: '念心直链', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*os)kck:d_8') + songmid + '&level=' + quality + '&type=mp3', { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d;
        if (d && d.url) return d.url;
        throw new Error('念心直链: 无数据');
    } },
    { name: '妖狐', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*llZkgpn:d_8') + songmid + '&level=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('妖狐: 无数据');
    } },
    { name: 'ChKsZ', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)^cfnu)ojk*\\kd'), { method: 'POST', timeout: 5000, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source: 'qq', songmid, quality }) });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('ChKsZ: ' + (d?.msg || '无数据'));
    } },
    { name: 'Huibq', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**gshpnd^\\kd)jim`i_`m)^jh*pmg*os*') + songmid + '/' + quality, { method: 'GET', timeout: 5000, headers: { 'X-Request-Key': 'share-v3' } });
        const d = res.body;
        if (d && d.code === 0) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('Huibq: 无数据');
    } },
    { name: '聚合API', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*os'), { method: 'POST', timeout: 5000, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ musicInfo: { songmid }, type: quality }) });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('聚合API: 无数据');
    } },
    { name: 'FishAPI', fetch: async (songmid, quality) => {
        const brMap = { '128k': 128, '320k': 320, flac: 740, flac24bit: 999 };
        const br = brMap[quality];
        if (!br) throw new Error('FishAPI 不支持的音质');
        const result = await fishPost({ types: 'url', id: songmid, source: 'qq', br: br }, encodeURIComponent(songmid));
        const url = result && result.url ? cleanUrl(String(result.url)) : '';
        if (url.startsWith('http')) return url;
        throw new Error('FishAPI: 无数据');
    } },
    { name: 'HYWmusic', fetch: async (songmid, quality) => {
        const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=tx&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 5000, headers: { 'X-Card-Key': HYW_CARD_KEY } });
        const d = res.body;
        if (d && d.code === 200) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('HYWmusic: 无数据');
    } },
    { name: 'FFAPI', fetch: getFFAPI },
];

const WY_BACKENDS = [
    ...(CHKSZ_CONFIG.apikey && CHKSZ_CONFIG.enableNetease ? [{ name: 'ChKSz 网易', fetch: async (songId, quality) => getChkszWy(songId, quality) }] : []),
    { name: '残像 WY', fetch: async (songId, quality) => {
        const info = { songId: songId, songName: '', singer: '' };
        return getCanxiang(songId, quality, info);
    } },
    { name: '网易云官方', fetch: async (songmid, quality) => {
        const level = WY_LEVEL_MAP[quality] || 'standard';
        const targetUrl = _u('cookn5**dio`ma\\^`.)hpnd^),1.)^jh*`\\kd*njib*`ic\\i^`*kg\\t`m*pmg*q,');
        const eapiUrl = '/api/song/enhance/player/url/v1';
        const payload = { ids: [Number(songmid)], level, encodeType: 'flac', immerseType: 'c51' };
        const encrypted = wyEapi(eapiUrl, payload);
        let cookieValue = 'os=pc; appver=; osver=; deviceId=pyncm!';
        if (HAS_WY_COOKIE) cookieValue = WY_COOKIE + '; ' + cookieValue;
        const res = await httpFetch(targetUrl, {
            method: 'POST', timeout: 5000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/2.10.2.200154',
                Referer: _u('cookn5**hpnd^),1.)^jh*'),
                Cookie: cookieValue,
            },
            form: encrypted,
        });
        const d = res.body;
        if (d && d.data && d.data[0] && d.data[0].url && !d.data[0].freeTrialInfo) return d.data[0].url;
        if (d && d.data && d.data[0] && d.data[0].freeTrialInfo) throw new Error('VIP歌曲仅试听（配置Cookie后可用完整版）');
        throw new Error('网易云官方: 无数据');
    } },
    { name: 'ChKsZ-VIP', fetch: async (songmid, quality) => {
        const level = WY_LEVEL_MAP[quality] || 'standard';
        const res = await httpFetch(_u('cookn5**\\kd)^cfnu)ojk*\\kd*,1.Zhpnd^:d_8') + songmid + '&level=' + level, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('ChKsZ-VIP: ' + (d?.msg || '无数据'));
    } },
    { name: '笒鬼鬼', fetch: async (songmid, quality) => {
        const level = WY_LEVEL_MAP[quality] || 'standard';
        const res = await httpFetch(_u('cookn5**\\kd)^`ibpdbpd)^i*\\kd*i`o`\\n`*hpnd^Zq,)kck:d_8') + songmid + '&type=json&level=' + level, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data && d.data.url) return d.data.url;
        if (d && d.url) return d.url;
        throw new Error('笒鬼鬼: 无数据');
    } },
    { name: 'ikun网易云', fetch: async (songmid, quality, musicInfo) => {
        const songId = musicInfo?.hash ?? songmid;
        const res = await httpFetch(_u('cookn5**^)rrrr`])ojk*hpnd^*pmg'), {
            method: 'POST', timeout: 5000,
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'lx-music-request/2.9.0', 'X-Api-Key': '' },
            body: { source: 'wy', musicId: songId, quality: quality },
            follow_max: 5,
        });
        const d = res.body;
        if (!d || isNaN(Number(d.code))) throw new Error('ikun网易云: 未知错误');
        if (d.code === 200 && d.url) return d.url;
        if (d.code === 403) throw new Error('ikun网易云: 鉴权失败');
        if (d.code === 429) throw new Error('ikun网易云: 请求过速');
        throw new Error('ikun网易云: ' + (d.message || '获取URL失败'));
    } },
    { name: '溯音163', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**jd\\kd)i`o*\\kd*Hpnd^Z,1.:d_8') + songmid + '&type=json', { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.url) return d.url;
        if (d && d.data && d.data[0] && d.data[0].url) return d.data[0].url;
        if (d && d.data && d.data.url) return d.data.url;
        throw new Error('溯音163: 无数据');
    } },
    { name: 'toubiec', fetch: async (songmid, quality) => {
        const level = WY_LEVEL_MAP[quality] || 'standard';
        const res = await httpFetch(_u('cookn5**rt\\kd)ojp]d`^)^i*\\kd*hpnd^*pmg'), {
            method: 'POST', timeout: 5000,
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', Origin: _u('cookn5**rt\\kd)ojp]d`^)^i'), Referer: _u('cookn5**rt\\kd)ojp]d`^)^i*') },
            body: JSON.stringify({ id: songmid, level }),
        });
        const d = res.body;
        if (d && d.data && d.data[0] && d.data[0].url) return d.data[0].url;
        if (d && d.url) return d.url;
        throw new Error('toubiec: 无数据');
    } },
    { name: '星海主后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8i`o`\\n`!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海主后端: ' + (d?.msg || '无数据'));
    } },
    { name: '星海备后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8i`o`\\n`!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海备后端: ' + (d?.msg || '无数据'));
    } },
    { name: 'bugpk', fetch: async (songmid, quality) => {
        const level = WY_LEVEL_MAP[quality] || 'standard';
        const res = await httpFetch(_u('cookn5**\\kd)]pbkf)^jh*\\kd*,1.Zhpnd^:otk`8enji!d_n8') + songmid + '&level=' + level, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url'], ['data', 0, 'url']]);
        if (url) return url;
        throw new Error('bugpk: 无数据');
    } },
    { name: '念心直链', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cook5**hpnd^)isdisu)^jh*rt)kck:d_8') + songmid + '&level=' + quality + '&type=mp3', { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (typeof d === 'string' && (d.startsWith(_u('cook5**')) || d.startsWith(_u('cookn5**')))) return d;
        if (d && d.url) return d.url;
        throw new Error('念心直链: 无数据');
    } },
    { name: '妖狐', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*rtqdk:d_8') + songmid + '&level=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('妖狐: 无数据');
    } },
    { name: 'lxmusic88', fetch: async (songmid, quality) => {
        const level = WY_LEVEL_MAP[quality] || 'standard';
        const res = await httpFetch(_u('cookn5**33)gshpnd^)si((adln3n*gshpnd^q/*pmg*rt*') + songmid + '/' + level, { method: 'GET', timeout: 5000, headers: { 'x-request-key': 'lxmusic' } });
        const d = res.body;
        if (d && (d.code === 0 || d.code === 200)) {
            if (d.data) return d.data;
            if (d.url) return d.url;
        }
        throw new Error('lxmusic88: 无数据');
    } },
    { name: 'FishAPI', fetch: async (songmid, quality) => {
        const brMap = { '128k': 128, '320k': 320, flac: 740, flac24bit: 999 };
        const br = brMap[quality];
        if (!br) throw new Error('FishAPI 不支持的音质');
        const result = await fishPost({ types: 'url', id: songmid, source: 'netease', br: br }, encodeURIComponent(songmid));
        const url = result && result.url ? cleanUrl(String(result.url)) : '';
        if (url.startsWith('http')) return url;
        throw new Error('FishAPI: 无数据');
    } },
    { name: 'Huibq', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**gshpnd^\\kd)jim`i_`m)^jh*pmg*rt*') + songmid + '/' + quality, { method: 'GET', timeout: 5000, headers: { 'X-Request-Key': 'share-v3' } });
        const d = res.body;
        if (d && d.code === 0) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('Huibq: 无数据');
    } },
    { name: '聚合API', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*rt'), { method: 'POST', timeout: 5000, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ musicInfo: { songmid }, type: quality }) });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('聚合API: 无数据');
    } },
    { name: 'HYWmusic', fetch: async (songmid, quality) => {
        const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=wy&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 5000, headers: { 'X-Card-Key': HYW_CARD_KEY } });
        const d = res.body;
        if (d && d.code === 200) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('HYWmusic: 无数据');
    } },
    { name: 'FFAPI', fetch: getFFAPI },
];

const KW_BACKENDS = [
    { name: '酷我官方', fetch: async (songmid, quality, musicInfo) => {
        const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' };
        const br = brMap[quality];
        if (!br) throw new Error('酷我官方 不支持的音质');
        let rid = musicInfo?.rid || '';
        if (!rid && musicInfo?.musicrid) rid = String(musicInfo.musicrid).replace(/^MUSIC_/, '');
        if (!rid) rid = songmid;
        const res = await httpFetch(_u('cookn5**hj]d)fprj)^i*hj]d)n:a8r`]!md_8') + rid + '&br=' + br + '&source=jiakong&type=convert_url_with_sign&surl=1', { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.surl) return d.data.surl;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('酷我官方: 无数据');
    } },
    { name: 'yunmge酷我', fetch: getYunmgeKw },
    { name: '星海主后端', fetch: async (songmid, quality, musicInfo) => {
        const name = musicInfo?.name || '';
        const singer = musicInfo?.singer || '';
        const interval = musicInfo?.interval || '';
        const albumName = musicInfo?.albumName || musicInfo?.album || '';
        const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8fr!i\\h`8') + encodeURIComponent(name) + '&singer=' + encodeURIComponent(singer) + '&songmid=' + encodeURIComponent(songmid) + '&interval=' + encodeURIComponent(interval) + '&albumName=' + encodeURIComponent(albumName) + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海主后端: ' + (d?.msg || '无数据'));
    } },
    { name: '星海备后端', fetch: async (songmid, quality, musicInfo) => {
        const name = musicInfo?.name || '';
        const singer = musicInfo?.singer || '';
        const interval = musicInfo?.interval || '';
        const albumName = musicInfo?.albumName || musicInfo?.album || '';
        const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8fr!i\\h`8') + encodeURIComponent(name) + '&singer=' + encodeURIComponent(singer) + '&songmid=' + encodeURIComponent(songmid) + '&interval=' + encodeURIComponent(interval) + '&albumName=' + encodeURIComponent(albumName) + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海备后端: ' + (d?.msg || '无数据'));
    } },
    { name: '酷我流媒体', fetch: async (songmid, quality, musicInfo) => {
        const level = KW_STREAM_LEVEL_MAP[quality] || 'master';
        const songIdTmp = musicInfo?.songmid || musicInfo?.id || musicInfo?.hash || musicInfo?.songId || musicInfo?.musicId || songmid;
        if (!songIdTmp) throw new Error('酷我流媒体: 找不到歌曲ID');
        const songId = String(songIdTmp).trim();
        return _u('cook5**,20)-2),11)-.1534-3*frnom`\\h:d_8') + encodeURIComponent(songId) + '&level=' + level + '&stream=1';
    } },
    { name: '念心直链', fetch: async (songmid, quality) => {
        const level = qualityToLevel(quality);
        const res = await httpFetch(_u('cookn5**hpnd^)isdisu)^jh*fbll*fr)kck:d_8') + songmid + '&level=' + level + '&type=mp3', { method: 'GET', timeout: 5000 });
        if (typeof res.body === 'string' && res.body.startsWith('http')) return res.body;
        if (res.body?.url) return res.body.url;
        throw new Error('念心直链: 无数据');
    } },
    { name: '笒鬼鬼', fetch: async (songmid, quality) => {
        const level = KW_LEVEL_MAP[quality] || '128k';
        const res = await httpFetch(_u('cookn5**\\kd)^`ibpdbpd)^i*\\kd*fprj*hpnd^Zq,)kck:d_8') + songmid + '&type=song&format=json&level=' + level, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['data', 'url'], ['url']]);
        if (url) return url;
        throw new Error('笒鬼鬼: 无数据');
    } },
    { name: '妖狐', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*frqdk:d_8') + songmid + '&level=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('妖狐: 无数据');
    } },
    { name: '聚合API', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*fr'), { method: 'POST', timeout: 5000, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ musicInfo: { songmid }, type: quality }) });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('聚合API: 无数据');
    } },
    { name: '酷我手机版', fetch: async (songmid, quality) => {
        const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' };
        const br = brMap[quality];
        if (!br) throw new Error('酷我手机版 不支持的音质');
        const res = await httpFetch(_u('cookn5**ihj]d)fprj)^i*hj]d)n:a8r`]!pn`m8+!njpm^`8frkg\\t`mc_Z\\mZ/).)+)3Zod\\i]\\jZO,<Zldmpd)\\kf!otk`8^jiq`moZpmgZrdocZndbi!md_8') + songmid + '&br=' + br, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        if (d && d.code === 200 && d.data && d.data.surl) return d.data.surl;
        throw new Error('酷我手机版: 无数据');
    } },
    { name: '酷我车机版', fetch: async (songmid, quality) => {
        const brMap = { '128k': '128kmp3', '192k': '128kmp3', '320k': '320kmp3', flac: '2000kflac', flac24bit: '4000kflac' };
        const br = brMap[quality];
        if (!br) throw new Error('酷我车机版 不支持的音质');
        const res = await httpFetch(_u('cookn5**hj]d)fprj)^i*hj]d)n:a8r`]!pn`m8+!njpm^`8frkg\\t`m^\\mZ\\mZ1)+)+)4Z=Zed\\fjibZqc)\\kf!otk`8^jiq`moZpmgZrdocZndbi!]m8') + br + '&sig=0&rid=' + songmid, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        if (d && d.code === 200 && d.data && d.data.surl) return d.data.surl;
        throw new Error('酷我车机版: 无数据');
    } },
    { name: '聆澜', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**njpm^`)ncdld\\ied\\ib)^i*\\kd*hpnd^*pmg:njpm^`8fr!njibD_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        if (d && d.data && d.data.url) return d.data.url;
        throw new Error('聆澜: 无数据');
    } },
    { name: 'HYWmusic', fetch: async (songmid, quality) => {
        const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=kw&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 5000, headers: { 'X-Card-Key': HYW_CARD_KEY } });
        const d = res.body;
        if (d && d.code === 200) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('HYWmusic: 无数据');
    } },
    { name: '溯音酷我', fetch: async (songmid, quality, musicInfo) => {
        const brMap = { '128k': '7', '192k': '5', '320k': '5', flac: '1', flac24bit: '1' };
        const br = brMap[quality] || '7';
        const name = musicInfo?.name || '';
        const singer = musicInfo?.singer || '';
        const keyword = name + (singer ? ' ' + singer : '');
        if (!keyword) throw new Error('溯音酷我: 缺少歌曲名');
        const res = await httpFetch(_u('cookn5**jd\\kd)i`o*\\kd*Fprj:hnb8') + encodeURIComponent(keyword) + '&n=1&br=' + br, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data && d.data.url) return d.data.url;
        if (d && d.url) return d.url;
        throw new Error('溯音酷我: 无数据');
    } },
    { name: 'HelloWorld', fetch: async (songmid, quality, musicInfo) => {
        const songId = musicInfo?.rid || musicInfo?.hash || musicInfo?.songmid || musicInfo?.id || songmid;
        if (!songId) throw new Error('HelloWorld: 找不到歌曲ID');
        const requestPath = '/lxmusicv4/url/kw/' + songId + '/' + quality;
        const sign = helloWorldSign(requestPath);
        const url = HELLO_WORLD_API_URL + requestPath + '?sign=' + sign;
        const res = await httpFetch(url, { method: 'GET', timeout: 5000, headers: { 'accept': 'application/json', 'x-request-key': HELLO_WORLD_API_KEY } });
        const d = res.body;
        if (d && (d.code === 0 || d.code === 200)) {
            const musicUrl = d.data || d.url;
            if (musicUrl) return musicUrl;
        }
        throw new Error('HelloWorld: ' + (d?.msg || '无数据'));
    } },
    { name: '星海酷我', fetch: getXinghaiKw },
    { name: 'FFAPI', fetch: getFFAPI },
];

const KG_BACKENDS = [

    { name: '星海主后端', fetch: async (songmid, quality, musicInfo) => {
        const hash = musicInfo?.hash || (musicInfo?._types?.[quality]?.hash) || songmid;
        const albumId = musicInfo?.albumId || '';
        const mainHash = hash;
        const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8fb!lp\\gdot8') + quality + '&songmid=' + (musicInfo?.songmid || songmid) + '&albumId=' + albumId + '&mainHash=' + mainHash + '&hash=' + hash, { method: 'GET', timeout: 8000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海主后端: ' + (d?.msg || '无数据'));
    } },
    { name: '念心KG', fetch: getNianxinKg },
    { name: '长青海棠', fetch: async (songmid, quality, musicInfo) => {
        const level = KG_LEVEL_MAP[quality] || 'standard';
        const hash = musicInfo?.hash || musicInfo?.songmid || songmid;
        const res = await httpFetch(_u('cookn5**hpnd^n`mq`m)c\\do\\ibr)^^*q,*hpnd^*m`njgq`(pmg'), {
            method: 'POST', timeout: 8000,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'kg', rid: hash, level: level }),
        });
        const d = res.body;
        if (d && d.code === 0 && d.data && d.data.url) return d.data.url;
        throw new Error('长青海棠: ' + (d?.msg || '无数据'));
    } },
    { name: 'HelloWorld', fetch: async (songmid, quality, musicInfo) => {
        const songId = musicInfo?.hash || musicInfo?.songmid || musicInfo?.id || songmid;
        if (!songId) throw new Error('HelloWorld: 找不到歌曲ID');
        const requestPath = '/lxmusicv4/url/kg/' + songId + '/' + quality;
        const sign = helloWorldSign(requestPath);
        const url = HELLO_WORLD_API_URL + requestPath + '?sign=' + sign;
        const res = await httpFetch(url, { method: 'GET', timeout: 8000, headers: { 'accept': 'application/json', 'x-request-key': HELLO_WORLD_API_KEY } });
        const d = res.body;
        if (d && (d.code === 0 || d.code === 200)) {
            const musicUrl = d.data || d.url;
            if (musicUrl) return musicUrl;
        }
        throw new Error('HelloWorld: ' + (d?.msg || '无数据'));
    } },
    { name: 'ChKsZ', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)^cfnu)ojk*\\kd'), {
            method: 'POST', timeout: 8000,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'kg', songmid, quality }),
        });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('ChKsZ: ' + (d?.msg || '无数据'));
    } },

    { name: '星海备后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8fb!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 3000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海备后端: ' + (d?.msg || '无数据'));
    } },
    { name: '妖狐', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)t\\jcp_)^i*\\kd*hpnd^*fbqdk:d_8') + songmid + '&level=' + quality, { method: 'GET', timeout: 3000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('妖狐: 无数据');
    } },
    { name: '酷狗官方', fetch: async (songmid, quality, musicInfo) => {
        const hash = musicInfo?.hash || songmid;
        const albumId = musicInfo?.albumId || '';
        const res = await httpFetch(_u('cookn5**rrr\\kd)fpbjp)^jh*tt*di_`s)kck:m8kg\\t*b`o_\\o\\!c\\nc8') + hash + '&platid=4&album_id=' + albumId + '&mid=00000000000000000000000000000000', { method: 'GET', timeout: 3000 });
        const d = res.body;
        if (d && d.status === 1 && d.data && d.data.play_backup_url) return d.data.play_backup_url;
        if (d && d.status === 1 && d.data && d.data.play_url) return d.data.play_url;
        throw new Error('酷狗官方: 无数据');
    } },
    { name: '长青SVIP直链', fetch: async (songmid, quality, musicInfo) => {
        const level = KG_LEVEL_MAP[quality] || 'standard';
        const hash = musicInfo?.hash || musicInfo?.songmid || songmid;
        const url = _u('cookn5**hpnd^)c\\do\\ibr)^^*fbll,*fb)kck:otk`8hk.!d_8') + hash + '&level=' + level;
        const res = await httpFetch(url, { method: 'GET', timeout: 3000 });
        const d = res.body;
        if (typeof d === 'string' && d.startsWith('http')) return d;
        if (d && d.url) return d.url;
        throw new Error('长青SVIP直链: 无数据');
    } },
    { name: '长青POST', fetch: async (songmid, quality, musicInfo) => {
        const level = KG_LEVEL_MAP[quality] || 'standard';
        const hash = musicInfo?.hash || songmid;
        const res = await httpFetch(_u('cook5**,20)-2),11)-.1*fbll,*fb)kck'), {
            method: 'POST', timeout: 3000,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'kg', id: hash, level: level }),
        });
        const d = res.body;
        if (typeof d === 'string' && d.startsWith('http')) return d;
        if (d && d.url) return d.url;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('长青POST: 无数据');
    } },
    { name: '聚合API', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*fb'), { method: 'POST', timeout: 3000, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ musicInfo: { songmid }, type: quality }) });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('聚合API: 无数据');
    } },
    { name: '海棠API', fetch: async (songmid, quality, musicInfo) => {
        const level = KG_LEVEL_MAP[quality] || 'standard';
        const hash = musicInfo?.hash || (musicInfo?._types?.[quality]?.hash) || songmid;
        const res = await httpFetch(_u('cookn5**hpnd^\\kd)c\\do\\ibr)i`o*fbll*fb)kck:otk`8enji!d_8') + hash + '&level=' + level, { method: 'GET', timeout: 3000 });
        const d = res.body;
        const url = extractUrl(d, [['url'], ['data', 'url']]);
        if (url) return url;
        throw new Error('海棠API: 无数据');
    } },
    { name: '聆澜', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**njpm^`)ncdld\\ied\\ib)^i*\\kd*hpnd^*pmg:njpm^`8fb!njibD_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 3000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        if (d && d.data && d.data.url) return d.data.url;
        throw new Error('聆澜: 无数据');
    } },
    { name: 'HYWmusic', fetch: async (songmid, quality) => {
        const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=kg&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 3000, headers: { 'X-Card-Key': HYW_CARD_KEY } });
        const d = res.body;
        if (d && d.code === 200) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('HYWmusic: 无数据');
    } },
    { name: '星海酷狗', fetch: getXinghaiKg },
    { name: 'FFAPI', fetch: getFFAPI },
];

const MG_BACKENDS = [
    { name: '星海咪咕', fetch: getXinghaiMg },
    { name: 'Migu直接源', fetch: async (songmid, quality) => {
        const level = qualityToLevel(quality);
        const res = await httpFetch(_u('cookn5**hpnd^)hdbp)^i*q.*\\kd*hpnd^*\\p_djKg\\t`m*b`oKg\\tDiaj:^jktmdbcoD_8') + encodeURIComponent(String(songmid)) + '&level=' + level, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data && d.data.playUrl) return d.data.playUrl;
        if (d && d.url) return d.url;
        if (d && d.playUrl) return d.playUrl;
        throw new Error('Migu直接源: 无数据');
    } },
    { name: 'Migu API', fetch: async (songmid, quality) => {
        const levelMap = { '128k': 'PQ', '320k': 'HQ', flac: 'SQ' };
        const level = levelMap[quality] || 'HQ';
        const res = await httpFetch(_u('cookn5**\\kk)^)ia)hdbp)^i*HDBPH-)+*nom\\o`bt*gdno`i(pmg*q-)-:^jktmdbcoD_8') + encodeURIComponent(String(songmid)) + '&quality=' + level, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.data && d.data.url) return d.data.url;
        if (d && d.url) return d.url;
        if (d && d.data && d.data.playUrl) return d.data.playUrl;
        throw new Error('Migu API: 无数据');
    } },
    { name: '星海主后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**tt)u__tm)ojk*gs*\\kd*:njpm^`8hdbp!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海主后端: ' + (d?.msg || '无数据'));
    } },
    { name: '星海备后端', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**um^_t)_k_in)jmb*gs*\\kd*\\kd)kck:njpm^`8hdbp!njibhd_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        throw new Error('星海备后端: ' + (d?.msg || '无数据'));
    } },
    { name: '聚合API', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**\\kd)hpnd^)g`m_)_k_in)jmb*hb'), { method: 'POST', timeout: 5000, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ musicInfo: { songmid }, type: quality }) });
        const d = res.body;
        if (d && d.code === 200 && d.data && d.data.url) return d.data.url;
        throw new Error('聚合API: 无数据');
    } },
    { name: '念心直链', fetch: async (songmid, quality) => {
        const level = qualityToLevel(quality);
        const res = await httpFetch(_u('cook5**hpnd^)isdisu)^jh*hb)kck:d_8') + encodeURIComponent(String(songmid)) + '&level=' + level + '&type=mp3', { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (typeof d === 'string' && d.startsWith('http')) return d;
        if (d && d.url) return d.url;
        throw new Error('念心直链: 无数据');
    } },
    { name: '聆澜', fetch: async (songmid, quality) => {
        const res = await httpFetch(_u('cookn5**njpm^`)ncdld\\ied\\ib)^i*\\kd*hpnd^*pmg:njpm^`8hb!njibD_8') + songmid + '&quality=' + quality, { method: 'GET', timeout: 5000 });
        const d = res.body;
        if (d && d.code === 200 && d.url) return d.url;
        if (d && d.data && d.data.url) return d.data.url;
        throw new Error('聆澜: 无数据');
    } },
    { name: 'HYWmusic', fetch: async (songmid, quality) => {
        const res = await httpFetch(HYW_API_BASE + '/api/music/url?source=mg&songId=' + songmid + '&quality=' + quality + '&key=' + HYW_CARD_KEY, { method: 'GET', timeout: 5000, headers: { 'X-Card-Key': HYW_CARD_KEY } });
        const d = res.body;
        if (d && d.code === 200) {
            if (d.url) return d.url;
            if (d.data && d.data.url) return d.data.url;
        }
        throw new Error('HYWmusic: 无数据');
    } },
    { name: 'FFAPI', fetch: getFFAPI },
];

const handleGetMusicUrl = async (source, musicInfo, userQuality) => {
    const songId = musicInfo.hash ?? musicInfo.songmid ?? musicInfo.id;
    if (!songId) throw new Error('无法获取歌曲ID');

    const supportedQualities = MUSIC_QUALITY[source] || ['128k'];
    let startIndex = QUALITY_PRIORITY.indexOf(userQuality);
    if (startIndex === -1) startIndex = QUALITY_PRIORITY.length - 1;

    const backends = {
        tx: TX_BACKENDS,
        wy: WY_BACKENDS,
        kw: KW_BACKENDS,
        kg: KG_BACKENDS,
        mg: MG_BACKENDS,
    }[source];
    if (!backends) throw new Error('未知音源: ' + source);

    const startTime = Date.now();

    for (let i = startIndex; i < QUALITY_PRIORITY.length; i++) {
        const quality = QUALITY_PRIORITY[i];
        if (!supportedQualities.includes(quality)) continue;

        const cacheKey = buildCacheKey(source, songId, quality);
        const cached = getCachedUrl(cacheKey);
        if (cached) {
            console.log(`[回避聚合] 缓存命中: ${source} ${quality}`);
            if (quality !== userQuality) console.warn(`[回避聚合] 用户请求 ${userQuality}，已降级至 ${quality}`);
            return cached;
        }

        console.log(`[回避聚合] 尝试音质: ${quality} (用户请求: ${userQuality})`);

        let firstTierCount = 5;
        if (quality === 'master' || quality === 'hires' || quality === 'flac24bit' || quality === 'atmos' || quality === 'atmos_plus') {
            firstTierCount = 8;
        }
        const firstTier = backends.slice(0, firstTierCount);
        let finalUrl = null;
        const errors = [];

        try {
            const result = await Promise.any(firstTier.map(async (backend) => {
                let url = await backend.fetch(songId, quality, musicInfo);

                if (!qualityMatch(url, quality)) {
                    throw new Error(`音质不匹配: 请求 ${quality}，但返回链接不符合高音质格式`);
                }
                if (source === 'kw' && typeof url === 'string' && url.includes('ekey')) {
                    url = processKwEncryptedUrl({ url, ekey: simpleGetQueryParam(url, 'ekey') }, source) || url;
                }
                if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
                    return url;
                }
                throw new Error(`${backend.name} 返回无效URL`);
            }));
            finalUrl = result;
        } catch (err) {
            if (err.errors) err.errors.forEach(e => errors.push(e.message || e));
            else errors.push(err.message);
        }

        if (!finalUrl) {

            for (const backend of backends.slice(firstTierCount)) {
                try {
                    let url = await backend.fetch(songId, quality, musicInfo);
                    if (!qualityMatch(url, quality)) {
                        throw new Error(`音质不匹配: 请求 ${quality}，但返回链接不符合`);
                    }
                    if (source === 'kw') url = processKwEncryptedUrl({ url, ekey: simpleGetQueryParam(url, 'ekey') }, source) || url;
                    if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
                        finalUrl = url;
                        break;
                    }
                    errors.push(`${backend.name}: 返回无效URL`);
                } catch (e) {
                    errors.push(`${backend.name}: ${e.message}`);
                }
            }
        }

        if (finalUrl) {
            setCachedUrl(cacheKey, finalUrl);
            const elapsed = Date.now() - startTime;
            console.log(`[回避聚合] ✅ 成功获取 ${source} ${quality} (${elapsed}ms)`);
            if (quality !== userQuality) console.warn(`[回避聚合] ⚠️ 用户请求 ${userQuality}，已降级至 ${quality}`);
            return finalUrl;
        }

        console.warn(`[回避聚合] ❌ 音质 ${quality} 全部失败，尝试降级`);
    }

    throw new Error(`所有音质尝试失败（从 ${userQuality} 降至最低）`);
};

on(EVENT_NAMES.request, ({ action, source, info }) => {
    if (action === 'musicUrl') {
        return handleGetMusicUrl(source, info.musicInfo, info.type);
    }
    return Promise.reject('action not support: ' + action);
});

deviceId = generateDeviceId();
clientHeader = buildClientHeader();
userToken = generateToken(null);

const sources = {};
MUSIC_SOURCE.forEach(item => {
    const nameMap = { tx: 'QQ音乐', wy: '网易云音乐', kw: '酷我音乐', kg: '酷狗音乐', mg: '咪咕音乐' };
    sources[item] = {
        name: nameMap[item] || item,
        type: 'music',
        actions: ['musicUrl'],
        qualitys: MUSIC_QUALITY[item],
    };
});

send(EVENT_NAMES.inited, {
    status: true,
    openDevTools: false,
    sources: sources,
});

console.log('[回避聚合] v0.0.1 已加载');
console.log('[回避聚合] 平台: ' + MUSIC_SOURCE.join(', '));
console.log('[回避聚合] 缓存 TTL: ' + (CACHE_TTL_MS / 3600000) + ' 小时');
if (CHKSZ_CONFIG.apikey) console.log('[回避聚合] ChKSz API 已启用');
if (KW_DECRYPT_PROXY.allowEncryptedLossless && KW_DECRYPT_PROXY.url) console.log('[回避聚合] 酷我代理解密已启用');

  })

  // [22] 幻音音源 | D0-幻音音源-v3.js
  __load(21, function (globalThis, window, self, top, parent, lx, process) {
const { EVENT_NAMES, request, on, send } = globalThis.lx

const cache = new Map()

on(EVENT_NAMES.request, ({ source, action, info }) => {
  if (action === 'musicUrl') {
    return getMusicUrl(source, info)
  }

  if (action === 'search' && source === 'mg') {
    return searchMiguMusic(info)
  }

  return Promise.reject(new Error('不支持'))
})

async function getMusicUrl(source, info) {
  const quality = info.type || '128k'
  const musicInfo = info.musicInfo

  try {
    if (source === 'mg') {
      return await getMiguUrl(musicInfo)
    }

    const platformMap = {
      'tx': 'qq',
      'kw': 'kuwo', 
      'wy': 'netease'
    }

    const platform = platformMap[source]
    if (!platform) {
      throw new Error(`不支持`)
    }

    const songId = musicInfo.songmid || musicInfo.id || musicInfo.mid
    if (!songId) {
      throw new Error('没ID')
    }

    const qualityMap = {
      '128k': '128k',
      '320k': '320k',
      'flac': 'flac',
      'flac24bit': 'flac24bit'
    }

    const br = qualityMap[quality] || '128k'
    return `https://music-dl.sayqz.com/api/?source=${platform}&id=${songId}&type=url&br=${br}`

  } catch (err) {
    console.error(`[幻音] 出错:`, err.message)
    throw new Error(`${err.message}`)
  }
}

async function getMiguUrl(musicInfo) {
  if (!musicInfo.name) {
    throw new Error('要歌名')
  }

  const cacheKey = `${musicInfo.name}|${musicInfo.albumName || musicInfo.album || ''}|${musicInfo.singer || ''}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const songName = musicInfo.name
  const singer = musicInfo.singer || ''
  const album = musicInfo.albumName || musicInfo.album || ''

  const matches = []

  if (album) {
    matches.push({
      keyword: clean(songName + album),
      strict: true
    })
  }

  if (singer) {
    matches.push({
      keyword: clean(songName + singer),
      strict: true
    })
  }

  matches.push({
    keyword: clean(songName),
    strict: false
  })

  for (const match of matches) {
    try {
      const url = await fetchMiguUrl(match.keyword, match.strict ? musicInfo : null)
      if (url) {
        cache.set(cacheKey, url)
        return url
      }
    } catch (e) {

    }
  }

  throw new Error('咪咕找不到')
}

async function fetchMiguUrl(keyword, checkInfo) {
  const encoded = encodeURIComponent(keyword)
  const url = `https://api.xcvts.cn/api/music/migu?gm=${encoded}&n=1&num=1&type=json`

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('超时'))
    }, 3000)

    request(url, { method: 'GET', timeout: 3000 }, (err, resp) => {
      clearTimeout(timeout)

      if (err) {
        reject(new Error('网络问题'))
        return
      }

      try {
        const text = resp.body
        const data = typeof text === 'string' ? JSON.parse(text) : text

        if (data.code === 200 && data.music_url) {

          if (checkInfo) {
            if (checkMatch(data, checkInfo)) {
              resolve(data.music_url)
            } else {
              reject(new Error('信息不对'))
            }
          } else {

            resolve(data.music_url)
          }
        } else {
          reject(new Error('没链接'))
        }
      } catch (e) {
        reject(new Error('解析出错'))
      }
    })
  })
}

function checkMatch(apiData, musicInfo) {
  const apiTitle = (apiData.title || '').toLowerCase()
  const apiArtist = (apiData.artist || '').toLowerCase()
  const apiAlbum = (apiData.album || '').toLowerCase()

  const songName = (musicInfo.name || '').toLowerCase()
  const singer = (musicInfo.singer || '').toLowerCase()
  const album = ((musicInfo.albumName || musicInfo.album) || '').toLowerCase()

  if (!apiTitle.includes(songName) && !songName.includes(apiTitle)) {
    return false
  }

  if (album && apiAlbum && !apiAlbum.includes(album) && !album.includes(apiAlbum)) {
    return false
  }

  if (singer && apiArtist && !apiArtist.includes(singer) && !singer.includes(apiArtist)) {
    return false
  }

  return true
}

async function searchMiguMusic(info) {
  const keyword = info.keyword
  if (!keyword) {
    throw new Error('没关键词')
  }

  const page = info.page || 1
  const limit = Math.min(info.limit || 10, 20)

  const results = []
  const searchKeyword = keyword.trim()

  for (let i = 1; i <= 3 && results.length < limit; i++) {
    try {
      const song = await searchMigu(searchKeyword, i)
      if (song) {
        results.push(song)
      }
    } catch (e) {

    }

    if (i < 3) {
      await sleep(100)
    }
  }

  if (results.length === 0) {
    throw new Error('没找到')
  }

  return results
}

async function searchMigu(keyword, page) {
  const encoded = encodeURIComponent(keyword)
  const url = `https://api.xcvts.cn/api/music/migu?gm=${encoded}&n=${page}&num=1&type=json`

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('超时'))
    }, 2000)

    request(url, { method: 'GET', timeout: 2000 }, (err, resp) => {
      clearTimeout(timeout)

      if (err) {
        reject(new Error('网络问题'))
        return
      }

      try {
        const text = resp.body
        const data = typeof text === 'string' ? JSON.parse(text) : text

        if (data.code === 200) {
          const song = {
            name: data.title || keyword,
            singer: data.artist || '',
            albumName: data.album || '',
            id: `mg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            source: 'mg',
            interval: data.duration || '00:00'
          }
          resolve(song)
        } else {
          reject(new Error('没搜到'))
        }
      } catch (e) {
        reject(new Error('解析出错'))
      }
    })
  })
}

function clean(text) {
  if (!text) return ''
  return text
    .replace(/\(\s*Live\s*\)/gi, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, '')
    .trim()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

send(EVENT_NAMES.inited, {
  openDevTools: false,
  sources: {
    tx: {
      name: 'QQ音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit']
    },
    kw: {
      name: '酷我音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit']
    },
    wy: {
      name: '网易云音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit']
    },
    mg: {
      name: '咪咕音乐',
      type: 'music',
      actions: ['musicUrl', 'search'],
      qualitys: ['128k', '320k'],
      supportSearchSuggestions: false
    }
  }
})

console.log('[幻音音源] 就绪')

  })

  // [23] 统一音乐源 | D0-统一音乐源-v1.0.0.js
  __load(22, function (globalThis, window, self, top, parent, lx, process) {
console.log('脚本开始执行');

if (typeof globalThis.lx === 'undefined') {
  console.log('错误: lx对象不存在');
} else {
  console.log('lx版本:', globalThis.lx.version);
  console.log('运行环境:', globalThis.lx.env);

  var sourceMap = {
    'kw': 'kuwo',
    'wy': 'netease'
  };

  var qualityMap = {
    '128k': '128',
    '192k': '192',
    '320k': '320',
    'flac': '740',     
    'flac24bit': '999' 
  };

  var sourceQualitys = {
    'kw': ['128k', '192k', '320k', 'flac'], 
    'wy': ['128k', '320k', 'flac']          
  };

  function httpRequest(url) {
    return new Promise(function(resolve, reject) {
      console.log('发送HTTP请求:', url);

      var options = {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      };

      globalThis.lx.request(url, options, function(err, resp) {
        if (err) {
          console.log('HTTP请求错误:', err.message || err);
          reject(new Error('网络请求失败'));
          return;
        }

        console.log('HTTP响应状态码:', resp.statusCode);
        console.log('响应体类型:', typeof resp.body);

        if (resp.headers && resp.headers['content-type']) {
          console.log('Content-Type:', resp.headers['content-type']);
        }

        if (resp.body && typeof resp.body === 'object') {
          console.log('响应体是对象，键:', Object.keys(resp.body));
          console.log('响应体内容:', JSON.stringify(resp.body).substring(0, 200));
        } else if (typeof resp.body === 'string') {
          console.log('响应体是字符串，长度:', resp.body.length);
          console.log('响应体前200字符:', resp.body.substring(0, Math.min(200, resp.body.length)));
        }

        resolve(resp);
      });
    });
  }

  function extractUrlFromResponse(resp) {
    if (!resp) {
      console.log('响应为空');
      return null;
    }

    var body = resp.body;
    console.log('提取URL，body类型:', typeof body);

    if (body && typeof body === 'object') {
      console.log('body是对象，直接提取URL');

      if (body.url) {
        console.log('从body.url获取URL');
        return body.url;
      }

      if (body.data && body.data.url) {
        console.log('从body.data.url获取URL');
        return body.data.url;
      }

      for (var key in body) {
        var value = body[key];
        if (typeof value === 'string' && value.startsWith('http')) {
          console.log('从字段', key, '获取URL');
          return value;
        }
        if (value && typeof value === 'object' && value.url && typeof value.url === 'string' && value.url.startsWith('http')) {
          console.log('从嵌套对象', key, '.url获取URL');
          return value.url;
        }
      }

      console.log('无法从对象中提取URL，对象内容:', JSON.stringify(body).substring(0, 300));
      return null;
    }

    if (typeof body === 'string') {
      console.log('body是字符串，尝试解析为JSON');
      try {
        var data = JSON.parse(body);
        if (data.url) return data.url;
        if (data.data && data.data.url) return data.data.url;
      } catch (e) {
        console.log('JSON解析失败:', e.message);
      }

      var urlMatch = body.match(/https?:\/\/[^\s<>"']+/);
      if (urlMatch) {
        console.log('从字符串中正则匹配到URL');
        return urlMatch[0];
      }
    }

    console.log('无法提取URL');
    return null;
  }

  function getQualityFallbackChain(quality) {
    var chain = [];

    switch(quality) {
      case 'flac24bit':
        chain = ['flac24bit', 'flac', '320k', '192k', '128k'];
        break;
      case 'flac':
        chain = ['flac', '320k', '192k', '128k'];
        break;
      case '320k':
        chain = ['320k', '192k', '128k'];
        break;
      case '192k':
        chain = ['192k', '128k'];
        break;
      case '128k':
        chain = ['128k'];
        break;
      default:
        chain = ['320k', '128k'];
    }

    return chain;
  }

  function getMusicUrl(musicInfo, quality) {
    console.log('开始获取音乐URL:', {
      source: musicInfo.source,
      songmid: musicInfo.songmid,
      id: musicInfo.id,
      quality: quality
    });

    return new Promise(function(resolve, reject) {
      try {
        var source = musicInfo.source;
        var apiSource = sourceMap[source];

        if (!apiSource) {
          console.log('不支持的音源:', source);
          reject(new Error('暂不支持此音源'));
          return;
        }

        var songId = musicInfo.songmid || musicInfo.id;
        if (!songId) {
          console.log('缺少歌曲ID');
          reject(new Error('缺少歌曲ID'));
          return;
        }

        var supportedQualitys = sourceQualitys[source] || ['128k', '320k'];
        var qualityChain = getQualityFallbackChain(quality);

        qualityChain = qualityChain.filter(function(q) {
          return supportedQualitys.includes(q);
        });

        console.log('音质尝试链:', qualityChain);

        function tryQualityChain(index) {
          if (index >= qualityChain.length) {
            reject(new Error('所有音质尝试均失败'));
            return;
          }

          var currentQuality = qualityChain[index];
          var br = qualityMap[currentQuality] || '320';

          console.log('尝试音质:', currentQuality, '-> br:', br);

          var url = 'https://music-api.gdstudio.xyz/api.php?types=url&source=' + apiSource + '&id=' + songId + '&br=' + br;

          httpRequest(url).then(function(resp) {
            if (resp.statusCode !== 200) {
              console.log('音质', currentQuality, '请求失败，状态码:', resp.statusCode);
              tryQualityChain(index + 1);
              return;
            }

            var musicUrl = extractUrlFromResponse(resp);

            if (musicUrl) {
              console.log('成功获取', currentQuality, '音质URL');
              resolve(musicUrl);
            } else {
              console.log('音质', currentQuality, '无法提取URL');
              tryQualityChain(index + 1);
            }
          }).catch(function(err) {
            console.log('音质', currentQuality, '请求出错:', err.message);
            tryQualityChain(index + 1);
          });
        }

        tryQualityChain(0);

      } catch (error) {
        console.log('获取音乐URL过程中发生异常:', error);
        reject(error);
      }
    });
  }

  console.log('注册事件处理器');

  globalThis.lx.on(globalThis.lx.EVENT_NAMES.request, function(data) {
    console.log('收到请求事件, action:', data.action);

    if (data.action === 'musicUrl') {
      return getMusicUrl(data.info.musicInfo, data.info.type);
    }

    return Promise.reject(new Error('不支持的action: ' + data.action));
  });

  console.log('准备初始化');

  setTimeout(function() {
    try {
      console.log('发送初始化事件');

      var config = {
        sources: {
          kw: {
            name: '酷我音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '192k', '320k', 'flac'] 
          },
          wy: {
            name: '网易云音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac'] 
          }
        }
      };

      globalThis.lx.send(globalThis.lx.EVENT_NAMES.inited, config);
      console.log('初始化完成');

    } catch (error) {
      console.log('初始化失败:', error);
    }
  }, 100);
}

console.log('脚本加载完成');

  })

  // [24] 西瓜聚合源 | D0-西瓜聚合-v1.40.js
  __load(23, function (globalThis, window, self, top, parent, lx, process) {
var lx = globalThis.lx;
var EVENT_NAMES = lx.EVENT_NAMES;
var request = lx.request;
var on = lx.on;
var send = lx.send;
var currentScriptInfo = lx.currentScriptInfo || {};
var env = lx.env || 'desktop';
var version = lx.version || '';

var HUIBQ_ENABLE = true;
var FISH_ENABLE = true;
var HYW_ENABLE = true;

var VERSION_CHECK_URL = 'https://yy.fangqihang.cn/?api=1&type=lx';

var LOG_API_URL = 'https://yy.fangqihang.cn/';

function sendLog(platform, apiName, durationMs) {
  if (!LOG_API_URL) return;
  var body = 'action=log&plugin_type=lx&platform=' + encodeURIComponent(platform) + '&api_name=' + encodeURIComponent(apiName) + '&duration_ms=' + durationMs;
  httpRequest(LOG_API_URL, {
    method: 'POST',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  }).catch(function () {   });
}

var XINGHAI_MAIN = 'https://music-api.gdstudio.xyz/api.php?use_xbridge3=true&loader_name=forest&need_sec_link=1&sec_link_scene=im&theme=light';

var XINGHAI_BACKUP = 'https://music-dl.sayqz.com/api/';

var CHKSZ_API = 'https://api.chksz.top/api';

var SUYIN_QQ_API = 'https://oiapi.net/api/QQ_Music';
var SUYIN_QQ_KEY = 'oiapi-ef6133b7-ac2f-dc7d-878c-d3e207a82575';
var SUYIN_163_API = 'https://oiapi.net/api/Music_163';
var SUYIN_KW_API = 'https://oiapi.net/api/Kuwo';
var SUYIN_MG_API = 'https://api.xcvts.cn/api/music/migu';

var CHANGQING = {
  tx: 'http://175.27.166.236/kgqq/qq.php?type=mp3&id={id}&level={level}',
  wy: 'http://175.27.166.236/wy/wy.php?type=mp3&id={id}&level={level}',
  kw: 'https://musicapi.haitangw.net/music/kw.php?type=mp3&id={id}&level={level}',
  kg: 'https://music.haitangw.cc/kgqq/kg.php?type=mp3&id={id}&level={level}',
  mg: 'https://music.haitangw.cc/musicapi/mg.php?type=mp3&id={id}&level={level}'
};

var NIANXIN = {
  tx: 'https://music.nxinxz.com/kgqq/tx.php?id={id}&level={level}&type=mp3',
  wy: 'http://music.nxinxz.com/wy.php?id={id}&level={level}&type=mp3',
  kw: 'http://music.nxinxz.com/kw.php?id={id}&level={level}&type=mp3',
  kg: 'https://music.nxinxz.com/kgqq/kg.php?id={id}&level={level}&type=mp3',
  mg: 'http://music.nxinxz.com/mg.php?id={id}&level={level}&type=mp3'
};

var HUIBQ_API = HUIBQ_ENABLE ? 'https://lxmusicapi.onrender.com' : '';
var HUIBQ_KEY = 'share-v3';

var FISH_API = FISH_ENABLE ? 'https://m-api.ceseet.me' : '';
var FISH_KEY = '';

var HYW_API = HYW_ENABLE ? 'https://music.bxa241d4.shop' : '';
var HYW_CARD_KEY = 'TF-VSS0-8Y73-U1AW-GEXJ';

var SHOUJI_TX_API = 'https://cyapi.top/API/qq_music.php?apikey=1ffdf5733f5d538760e63d7e46ba17438d9f7b9dfc18c51be1109386fd74c3a1&type=json';
var SHOUJI_WY_API = 'https://api.cenguigui.cn/api/netease/music_v1.php';
var SHOUJI_KW_API = 'https://kw-api.cenguigui.cn';

var QISHUI_API = 'https://api.vsaa.cn/api/music.qishui.vip';
var QISHUI_API_HTTP = 'http://api.vsaa.cn/api/music.qishui.vip';

var JUHE_API = 'https://api.music.lerd.dpdns.org';

var ZRCDY_API = 'https://zrcdy.dpdns.org/lx/api/api.php';

var QUALITY_BR_MAP = {
  '128k': '128',
  '320k': '320',
  'flac': '740',
  'flac24bit': '999'
};

var QUALITY_SUYIN_QQ_BR = {
  '128k': 7,
  '320k': 5,
  'flac': 4,
  'flac24bit': 1
};

var QUALITY_SUYIN_KW_BR = {
  '128k': 7,
  '320k': 5,
  'flac': 1,
  'flac24bit': 1
};

var QUALITY_CHKSZ_LEVEL = {
  '128k': 'standard',
  '320k': 'exhigh',
  'flac': 'lossless',
  'flac24bit': 'jymaster'
};

var CHKSZ_FALLBACK = {
  jymaster: ['jymaster', 'lossless', 'exhigh', 'standard'],
  lossless: ['lossless', 'exhigh', 'standard'],
  exhigh: ['exhigh', 'standard'],
  standard: ['standard']
};

function qualityToLevel(quality) {
  var q = String(quality || '128k').toLowerCase();
  if (q === 'flac' || q === 'flac24bit') return 'lossless';
  if (q === '320k') return 'exhigh';
  return 'standard';
}

var PLATFORM_SOURCE_MAP = {
  wy: 'netease',
  tx: 'tencent',
  kw: 'kuwo',
  kg: 'kugou',
  mg: 'migu'
};

var PLATFORM_QUALITIES = {
  wy: ['128k', '320k', 'flac', 'flac24bit'],
  tx: ['128k', '320k', 'flac', 'flac24bit'],
  kw: ['128k', '320k', 'flac'],
  kg: ['128k', '320k', 'flac', 'flac24bit'],
  mg: ['128k', '320k', 'flac']
};

var PLATFORM_NAMES = {
  wy: '网易云音乐',
  tx: 'QQ音乐',
  kw: '酷我音乐',
  kg: '酷狗音乐',
  mg: '咪咕音乐'
};

var urlCache = new Map();
var CACHE_TTL = 21600000;
var CACHE_MAX = 500;

function cacheGet(key) {
  var entry = urlCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp >= CACHE_TTL) {
    urlCache.delete(key);
    return null;
  }
  return entry.url;
}

function cacheSet(key, url) {
  if (urlCache.size >= CACHE_MAX) {
    var oldestKey = urlCache.keys().next().value;
    if (oldestKey !== undefined) urlCache.delete(oldestKey);
  }
  urlCache.set(key, { url: url, timestamp: Date.now() });
}

function httpRequest(url, options) {
  options = options || {};
  var method = options.method || 'GET';
  var timeout = options.timeout || 10000;
  var headers = options.headers || {};

  return new Promise(function (resolve, reject) {
    request(url, {
      method: method,
      timeout: timeout,
      headers: extend({ 'Accept': 'application/json' }, headers),
      body: options.body || undefined,
      follow_max: options.follow_max || 2
    }, function (err, resp, body) {
      if (err) return reject(new Error('请求错误: ' + (err.message || err)));
      var statusCode = resp ? resp.statusCode : 0;
      if (statusCode >= 400) return reject(new Error('HTTP ' + statusCode));
      resolve({ statusCode: statusCode, headers: resp ? resp.headers || {} : {}, body: body });
    });
  });
}

function extend(target, source) {
  var result = {};
  var key;
  for (key in target) {
    if (target.hasOwnProperty(key)) result[key] = target[key];
  }
  for (key in source) {
    if (source.hasOwnProperty(key)) result[key] = source[key];
  }
  return result;
}

function httpGet(url, params, extraHeaders, timeout) {
  params = params || {};
  extraHeaders = extraHeaders || {};
  timeout = timeout || 10000;
  var keys = Object.keys(params).filter(function (k) {
    return params[k] !== undefined && params[k] !== null;
  });
  var queryStr = keys.map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
  var fullUrl = url + (queryStr ? (url.indexOf('?') >= 0 ? '&' : '?') + queryStr : '');

  return httpRequest(fullUrl, { method: 'GET', timeout: timeout, headers: extraHeaders })
    .then(function (res) {
      var body = res.body;
      if (typeof body === 'string') {
        var trimmed = body.trim();
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          try { body = JSON.parse(trimmed); } catch (e) {}
        }
      }
      return body;
    });
}

var MIN_AUDIO_SIZE = 800 * 1024;

function validateUrl(url, sourceName) {
  if (!url || typeof url !== 'string') {
    throw new Error((sourceName || '未知源') + ' 返回空URL');
  }
  var trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error((sourceName || '未知源') + ' URL格式非法');
  }
  return trimmed;
}

function deepValidateUrl(url, sourceName) {
  return new Promise(function (resolve, reject) {
    request(url, {
      method: 'HEAD',
      timeout: 5000,
      follow_max: 2
    }, function (err, resp) {
      if (err) {

        return resolve(url);
      }
      var headers = resp ? resp.headers || {} : {};
      var contentLength = parseInt(headers['content-length'] || headers['Content-Length'] || '0', 10);

      if (contentLength > 0 && contentLength < MIN_AUDIO_SIZE) {
        return reject(new Error((sourceName || '未知源') + ' 音频过小(' + (contentLength / 1024) + 'KB)，疑似假链接'));
      }

      resolve(url);
    });
  });
}

function getSongId(songInfo) {
  if (!songInfo) return '';
  return String(songInfo.songmid || songInfo.hash || songInfo.id || songInfo.songId || songInfo.rid || songInfo.mid || '');
}

function getHashOrMid(songInfo) {
  if (!songInfo) return null;
  return songInfo.hash || songInfo.songmid || songInfo.id || null;
}

function getQqSongId(songInfo) {
  if (!songInfo) return null;
  var mid = (songInfo.meta && songInfo.meta.qq && songInfo.meta.qq.mid) ||
            (songInfo.meta && songInfo.meta.mid) ||
            songInfo.songmid ||
            (typeof songInfo.id === 'string' && !/^\d+$/.test(songInfo.id) ? songInfo.id : null);
  if (mid) return { type: 'mid', value: mid };
  var songid = (songInfo.meta && songInfo.meta.qq && songInfo.meta.qq.songid) ||
               (songInfo.meta && songInfo.meta.songid) ||
               songInfo.id;
  if (songid) {
    var numId = typeof songid === 'number' ? songid : (/^\d+$/.test(String(songid)) ? Number(songid) : null);
    if (numId) return { type: 'songid', value: numId };
  }
  return null;
}

function cleanText(text) {
  if (!text) return '';
  return String(text)
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, '')
    .replace(/[【】《》"'·,，。!！?？:：;；\/\\|\-]/g, '')
    .trim()
    .toLowerCase();
}

function buildSearchKeywords(songInfo) {
  if (!songInfo) return [];
  var keywords = [];
  var name = songInfo.name || '';
  var singer = songInfo.singer || '';
  var album = songInfo.albumName || songInfo.album || '';

  if (name && singer) {
    keywords.push({ keyword: name + ' ' + singer, strict: true });
  }
  if (name && album) {
    keywords.push({ keyword: name + ' ' + album, strict: true });
  }
  if (name) {
    keywords.push({ keyword: name, strict: false });
  }
  return keywords;
}

function titleMatch(a, b) {
  var ca = cleanText(a);
  var cb = cleanText(b);
  if (!ca || !cb) return true;
  return ca.indexOf(cb) >= 0 || cb.indexOf(ca) >= 0;
}

function checkSongMatch(apiName, apiArtist, musicInfo) {
  if (!titleMatch(apiName, musicInfo.name || '')) return false;
  if (musicInfo.singer && apiArtist) {
    if (!titleMatch(apiArtist, musicInfo.singer)) return false;
  }
  return true;
}

function extractUrlFromMsg(msg) {
  if (!msg) return null;
  var m = String(msg).match(/https?:\/\/[^\s"'<>]+/);
  return m ? m[0] : null;
}

function extractUrl(body) {
  if (!body) return null;
  if (typeof body === 'string') {
    var trimmed = body.trim();
    if (trimmed.startsWith('http')) return trimmed;
    try {
      var parsed = JSON.parse(trimmed);
      return parsed.url || (parsed.data && parsed.data.url) || extractUrlFromMsg(trimmed);
    } catch (e) {
      return extractUrlFromMsg(trimmed);
    }
  }
  if (typeof body === 'object') {
    if (body.url) return body.url;
    if (body.data) {
      if (typeof body.data === 'string' && /^https?:\/\//i.test(body.data)) return body.data;
      if (body.data.url) return body.data.url;
      if (Array.isArray(body.data) && body.data[0] && body.data[0].url) return body.data[0].url;
    }
  }
  return null;
}

function xinghaiMainGetUrl(platform, songInfo, quality) {
  var source = PLATFORM_SOURCE_MAP[platform];
  if (!source) throw new Error('星海主不支持: ' + platform);
  var id = getSongId(songInfo);
  if (!id) throw new Error('星海主缺少歌曲ID');
  var br = QUALITY_BR_MAP[quality] || '320';

  var url = XINGHAI_MAIN + '&types=url&source=' + source + '&id=' + encodeURIComponent(id) + '&br=' + br;
  return httpGet(url, {}, {}, 15000).then(function (body) {
    var resultUrl = extractUrl(body);
    if (!resultUrl) throw new Error('星海主未返回URL');
    return resultUrl;
  });
}

function xinghaiBackupGetUrl(platform, songInfo, quality) {
  var source = PLATFORM_SOURCE_MAP[platform];
  if (!source) throw new Error('星海备不支持: ' + platform);
  var id = getSongId(songInfo);
  if (!id) throw new Error('星海备缺少歌曲ID');

  return httpGet(XINGHAI_BACKUP, {
    source: source,
    id: id,
    type: 'url',
    br: quality
  }, {}, 15000).then(function (body) {
    var resultUrl = extractUrl(body);
    if (!resultUrl) throw new Error('星海备未返回URL');
    return resultUrl;
  });
}

function chkszGetUrl(songInfo, quality) {
  var id = getSongId(songInfo);
  if (!id) throw new Error('CHKSZ缺少ID');
  var level = QUALITY_CHKSZ_LEVEL[quality] || 'standard';
  var levels = CHKSZ_FALLBACK[level] || ['standard'];

  function tryLevel(index) {
    if (index >= levels.length) return Promise.reject(new Error('CHKSZ所有音质失败'));
    var lv = levels[index];
    return httpGet(CHKSZ_API + '/163_music', { id: id, level: lv },
      { 'Referer': 'https://cp.chksz.top/' }, 12000
    ).then(function (body) {
      if (body && body.code === 200 && body.data && body.data.url) {
        return body.data.url;
      }
      throw new Error('CHKSZ音质' + lv + '失败');
    }).catch(function () {
      return tryLevel(index + 1);
    });
  }

  return tryLevel(0);
}

function suyinQQGetUrl(songInfo, quality) {
  var qqId = getQqSongId(songInfo);
  if (!qqId) throw new Error('溯音QQ缺少歌曲ID');
  var startBr = QUALITY_SUYIN_QQ_BR[quality] || 5;

  var brList = [];
  [startBr, 4, 5, 7].forEach(function (v) {
    if (brList.indexOf(v) < 0) brList.push(v);
  });
  brList.sort(function (a, b) { return a - b; });

  function tryBr(index) {
    if (index >= brList.length) return Promise.reject(new Error('溯音QQ所有码率失败'));
    var br = brList[index];
    var params = { key: SUYIN_QQ_KEY, type: 'json', br: br, n: 1 };
    if (qqId.type === 'mid') {
      params.mid = qqId.value;
    } else {
      params.songid = qqId.value;
    }
    return httpGet(SUYIN_QQ_API, params, {}, 12000).then(function (body) {
      var url = extractUrl(body);
      if (!url) throw new Error('溯音QQ未找到链接');
      return url;
    }).catch(function () {
      return tryBr(index + 1);
    });
  }

  return tryBr(0);
}

function suyin163GetUrl(songInfo) {
  var id = getSongId(songInfo);
  if (!id) throw new Error('溯音163缺少ID');
  return httpGet(SUYIN_163_API, { id: id }, {}, 12000).then(function (body) {
    var data = body;
    if (data && data.code === 0 && data.data) {
      var item = Array.isArray(data.data) ? data.data[0] : data.data;
      if (item && item.url) return item.url;
    }
    throw new Error('溯音163获取失败');
  });
}

function suyinKwGetUrl(songInfo, quality) {
  if (!songInfo || !songInfo.name) throw new Error('溯音酷我需要歌曲名');
  var br = QUALITY_SUYIN_KW_BR[quality] || 1;
  var keywords = buildSearchKeywords(songInfo);

  function tryKeyword(index) {
    if (index >= keywords.length) return Promise.reject(new Error('溯音酷我失败'));
    var item = keywords[index];
    return httpGet(SUYIN_KW_API, { msg: item.keyword, n: 1, br: br }, {}, 12000).then(function (body) {
      var url = extractUrl(body);
      if (!url) throw new Error('溯音酷我未找到链接');
      if (item.strict) {

        var song = (body && body.data && body.data.song) || (body && body.song) || '';
        var singer = (body && body.data && body.data.singer) || (body && body.singer) || '';
        if (song && !checkSongMatch(song, singer, songInfo)) {
          throw new Error('溯音酷我歌曲不匹配');
        }
      }
      return url;
    }).catch(function () {
      return tryKeyword(index + 1);
    });
  }

  return tryKeyword(0);
}

function suyinMgGetUrl(songInfo) {
  if (!songInfo || !songInfo.name) throw new Error('溯音咪咕需要歌曲名');
  var keywords = buildSearchKeywords(songInfo);

  function tryKeyword(index) {
    if (index >= keywords.length) return Promise.reject(new Error('溯音咪咕失败'));
    var item = keywords[index];
    return httpGet(SUYIN_MG_API, { gm: item.keyword, n: 1, num: 1, type: 'json' }, {}, 12000).then(function (body) {
      if (body && body.code === 200) {
        var url = body.music_url || body.musicInfo || extractUrl(body);
        if (url && typeof url === 'string' && /^https?:\/\//i.test(url)) {
          if (item.strict) {
            var title = body.title || '';
            var artist = body.artist || '';
            if (title && !checkSongMatch(title, artist, songInfo)) {
              throw new Error('溯音咪咕歌曲不匹配');
            }
          }
          return url;
        }
      }
      throw new Error('溯音咪咕未找到链接');
    }).catch(function () {
      return tryKeyword(index + 1);
    });
  }

  return tryKeyword(0);
}

function changqingGetUrl(platform, songInfo, quality) {
  var tpl = CHANGQING[platform];
  if (!tpl) throw new Error('长青不支持: ' + platform);
  var id = getSongId(songInfo);
  if (!id) throw new Error('长青缺少歌曲ID');
  var level = qualityToLevel(quality);
  var url = tpl.replace('{id}', encodeURIComponent(id)).replace('{level}', encodeURIComponent(level));
  return httpGet(url, {}, {}, 15000).then(function (body) {
    var resultUrl = extractUrl(body);
    if (!resultUrl) throw new Error('长青未返回URL');
    return resultUrl;
  });
}

function nianxinGetUrl(platform, songInfo, quality) {
  var tpl = NIANXIN[platform];
  if (!tpl) throw new Error('念心不支持: ' + platform);
  var id = getSongId(songInfo);
  if (!id) throw new Error('念心缺少歌曲ID');
  var level = qualityToLevel(quality);
  var url = tpl.replace('{id}', encodeURIComponent(id)).replace('{level}', encodeURIComponent(level));
  return httpGet(url, {}, {}, 15000).then(function (body) {
    var resultUrl = extractUrl(body);
    if (!resultUrl) throw new Error('念心未返回URL');
    return resultUrl;
  });
}

function huibqGetUrl(platform, songInfo, quality) {
  if (!HUIBQ_API || !HUIBQ_KEY) throw new Error('Huibq未配置');
  var songId = getHashOrMid(songInfo) || getSongId(songInfo);
  if (!songId) throw new Error('Huibq缺少歌曲ID');
  var userAgent = env ? 'lx-music-' + env + '/' + version : 'lx-music-request/' + version;
  return httpGet(
    HUIBQ_API + '/url/' + platform + '/' + encodeURIComponent(songId) + '/' + quality,
    {},
    { 'Content-Type': 'application/json', 'User-Agent': userAgent, 'X-Request-Key': HUIBQ_KEY },
    12000
  ).then(function (body) {
    if (!body || isNaN(Number(body.code))) throw new Error('Huibq未知响应');
    switch (Number(body.code)) {
      case 0: return body.url || (body.data && body.data.url);
      case 1: throw new Error('Huibq IP被封');
      case 2: throw new Error('Huibq获取失败');
      case 4: throw new Error('Huibq服务器错误');
      case 5: throw new Error('Huibq请求过多');
      case 6: throw new Error('Huibq参数错误');
      default: throw new Error(body.msg || 'Huibq未知错误');
    }
  });
}

function fishGetUrl(platform, songInfo, quality) {
  if (!FISH_API) throw new Error('fish-music未配置');
  var songId = getHashOrMid(songInfo) || getSongId(songInfo);
  if (!songId) throw new Error('fish-music缺少歌曲ID');
  var userAgent = env ? 'lx-music-' + env + '/' + version : 'lx-music-request/' + version;
  var headers = {
    'Content-Type': 'application/json',
    'User-Agent': userAgent
  };
  if (FISH_KEY) headers['X-Request-Key'] = FISH_KEY;
  return httpGet(
    FISH_API + '/url/' + platform + '/' + encodeURIComponent(songId) + '/' + quality,
    {},
    headers,
    12000
  ).then(function (body) {
    if (body && body.code === 0 && body.data && body.data.url) return body.data.url;
    if (body && body.url) return body.url;
    throw new Error('fish-music获取失败');
  });
}

function shoujiGetUrl(platform, songInfo, quality) {
  var songId = getSongId(songInfo);
  if (!songId) throw new Error('收集聚合缺少歌曲ID');
  var level = qualityToLevel(quality);
  var url;

  switch (platform) {
    case 'tx':
      url = SHOUJI_TX_API + '&mid=' + encodeURIComponent(songId);
      break;
    case 'wy':
      url = SHOUJI_WY_API + '?id=' + encodeURIComponent(songId) + '&type=json&level=' + encodeURIComponent(level);
      break;
    case 'kw':
      url = SHOUJI_KW_API + '?id=' + encodeURIComponent(songId) + '&type=song&format=json&level=' + encodeURIComponent(level);
      break;
    default:
      throw new Error('收集聚合不支持: ' + platform);
  }

  return httpGet(url, {}, {}, 12000).then(function (body) {
    if (platform === 'tx') {
      return body.url || (body.data && body.data.url);
    }
    return (body.data && body.data.url) || body.url;
  }).then(function (resultUrl) {
    if (!resultUrl) throw new Error('收集聚合未返回URL');
    return resultUrl;
  });
}

function hywGetUrl(platform, songInfo, quality) {
  if (!HYW_API) throw new Error('HYWmusic未配置');
  var songId = getSongId(songInfo);
  if (!songId) throw new Error('HYWmusic缺少歌曲ID');

  return httpGet(
    HYW_API + '/api/music/url',
    { source: platform, songId: songId, quality: quality },
    {
      'X-Script-Version': 'HYWmusic_beta',
      'X-Card-Key': HYW_CARD_KEY
    },
    12000
  ).then(function (body) {
    if (!body || typeof body !== 'object') throw new Error('HYWmusic响应异常');
    if (body.code !== 200) throw new Error('HYWmusic: ' + (body.msg || '获取失败'));
    return body.url || (body.data && body.data.url);
  }).then(function (resultUrl) {
    if (!resultUrl) throw new Error('HYWmusic未返回URL');
    return resultUrl;
  });
}

function qishuiGetUrl(songInfo, quality) {
  var songId = getSongId(songInfo);
  if (!songId) throw new Error('汽水VIP缺少歌曲ID');
  var q = '128k';

  switch (quality) {
    case 'flac24bit':
    case 'flac': q = 'lossless'; break;
    case '320k': q = 'exhigh'; break;
    default: q = 'standard'; break;
  }

  function tryApi(url) {
    return httpGet(url, { act: 'song', id: songId, quality: q }, {}, 15000).then(function (body) {
      var data = body;
      if (Array.isArray(data && data.data)) data = data.data[0] || data;
      else if (data && data.data) data = data.data;
      if (!data || !data.url) throw new Error('汽水VIP未返回URL');
      return String(data.url);
    });
  }

  return tryApi(QISHUI_API).catch(function () {
    return tryApi(QISHUI_API_HTTP);
  });
}

function juheGetUrl(platform, songInfo, quality) {
  if (!JUHE_API) throw new Error('聚合API未配置');
  var songId = getSongId(songInfo);
  if (!songId) throw new Error('聚合API缺少歌曲ID');

  return httpRequest(JUHE_API + '/' + platform, {
    method: 'POST',
    timeout: 12000,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'musicUrl',
      source: platform,
      info: { musicInfo: songInfo, type: quality }
    })
  }).then(function (res) {
    var body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
    if (body && body.code === 200 && body.data && body.data.url) {
      return body.data.url;
    }

    if (body && body.code === 303 && body.data) {
      var redirectInfo = typeof body.data === 'string' ? JSON.parse(body.data) : body.data;
      if (redirectInfo && redirectInfo.request && redirectInfo.response) {
        var req = redirectInfo.request;
        var resp = redirectInfo.response;
        return httpRequest(encodeURI(req.url), req.options || {}).then(function (respResult) {
          var respBody = respResult.body;
          if (typeof respBody === 'string' && (respBody.startsWith('{') || respBody.startsWith('['))) {
            try { respBody = JSON.parse(respBody); } catch (e) {}
          }
          var checkOk = true;
          if (resp.check && resp.check.key && Array.isArray(resp.check.key)) {
            var cursor = respBody;
            for (var ci = 0; ci < resp.check.key.length; ci++) {
              if (cursor && cursor[resp.check.key[ci]]) { cursor = cursor[resp.check.key[ci]]; }
              else { checkOk = false; break; }
            }
            if (checkOk && cursor !== resp.check.value) checkOk = false;
          }
          if (checkOk && resp.url && Array.isArray(resp.url.key)) {
            var urlCursor = respBody;
            for (var ui = 0; ui < resp.url.key.length; ui++) {
              if (urlCursor && urlCursor[resp.url.key[ui]]) { urlCursor = urlCursor[resp.url.key[ui]]; }
              else { checkOk = false; break; }
            }
            if (checkOk && typeof urlCursor === 'string' && urlCursor.indexOf('http') === 0) return urlCursor;
          }
          throw new Error('聚合API 303模式失败');
        });
      }
    }
    throw new Error('聚合API: ' + (body && body.msg || '获取失败'));
  });
}

function zrcdyGetUrl(platform, songInfo, quality) {
  if (!ZRCDY_API) throw new Error('zrcdy未配置');
  var name = songInfo.name || '';
  var singer = songInfo.singer || '';
  if (!name) throw new Error('zrcdy需要歌曲名');

  var backupSourceMap = { kg: 'kg', tx: 'qq', mg: 'migu' };
  var backupSource = backupSourceMap[platform];
  if (!backupSource) throw new Error('zrcdy不支持: ' + platform);

  var keywords = buildSearchKeywords(songInfo);

  function searchKeyword(index) {
    if (index >= keywords.length) return Promise.reject(new Error('zrcdy所有搜索词失败'));
    var kw = keywords[index];
    var searchUrl = ZRCDY_API + '?source=' + backupSource + '&msg=' + encodeURIComponent(kw.keyword) + '&n=0&g=10';
    return httpGet(searchUrl, {}, {}, 12000).then(function (body) {
      if (!body || body.code !== 200 || !body.data || !body.data.songs || !body.data.songs.length) {
        throw new Error('zrcdy搜索无结果');
      }
      var songs = body.data.songs;
      var bestN = 1;
      if (kw.strict && singer) {
        var bestScore = -1;
        for (var si = 0; si < songs.length; si++) {
          var sName = songs[si].title || songs[si].name || '';
          var sSinger = songs[si].singer || songs[si].author || '';
          var nScore = (cleanText(sName).indexOf(cleanText(name)) >= 0 || cleanText(name).indexOf(cleanText(sName)) >= 0) ? 0.6 : 0;
          var sScore = (cleanText(sSinger).indexOf(cleanText(singer)) >= 0 || cleanText(singer).indexOf(cleanText(sSinger)) >= 0) ? 0.4 : 0;
          var total = nScore + sScore;
          if (total > bestScore) { bestScore = total; bestN = si + 1; }
        }
        if (bestScore < 0.3) throw new Error('zrcdy歌曲匹配度低');
      }

      var qMap = { '128k': '128', '192k': '192', '320k': '320', 'flac': 'flac', 'flac24bit': 'flac' };
      var apiQuality = qMap[quality] || '320';
      var detailUrl = ZRCDY_API + '?source=' + backupSource + '&msg=' + encodeURIComponent(kw.keyword) + '&n=' + bestN + '&quality=' + apiQuality;
      return httpGet(detailUrl, {}, {}, 12000).then(function (detailBody) {
        if (!detailBody || detailBody.code !== 200) throw new Error('zrcdy获取详情失败');
        var data = detailBody.data;
        var musicUrl = (data && (data.play_url || data.music_url || data.url || data.musicurl)) || '';
        if (!musicUrl) throw new Error('zrcdy未返回URL');
        return musicUrl;
      });
    }).catch(function () {
      return searchKeyword(index + 1);
    });
  }

  return searchKeyword(0);
}

var CHAIN_TEMPLATES = {
  wy: [
    { name: 'CHKSZ',      fn: function (si, q) { return chkszGetUrl(si, q); },              required: true },
    { name: '星海主',      fn: function (si, q) { return xinghaiMainGetUrl('wy', si, q); },  required: true },
    { name: '溯音163',     fn: function (si, q) { return suyin163GetUrl(si); },              required: true },
    { name: '长青SVIP',    fn: function (si, q) { return changqingGetUrl('wy', si, q); },    required: true },
    { name: '收集聚合',    fn: function (si, q) { return shoujiGetUrl('wy', si, q); },       required: true },
    { name: '念心SVIP',    fn: function (si, q) { return nianxinGetUrl('wy', si, q); },      required: true },
    { name: '星海备',      fn: function (si, q) { return xinghaiBackupGetUrl('wy', si, q); }, required: true },
    { name: 'Huibq',       fn: function (si, q) { return huibqGetUrl('wy', si, q); },        required: false },
    { name: 'HYWmusic',    fn: function (si, q) { return hywGetUrl('wy', si, q); },          required: false },
    { name: 'fish-music',  fn: function (si, q) { return fishGetUrl('wy', si, q); },         required: false },
    { name: '汽水VIP',     fn: function (si, q) { return qishuiGetUrl(si, q); },             required: false }
  ],
  tx: [
    { name: '溯音QQ',      fn: function (si, q) { return suyinQQGetUrl(si, q); },            required: true },
    { name: '星海主',      fn: function (si, q) { return xinghaiMainGetUrl('tx', si, q); },  required: true },
    { name: '长青SVIP',    fn: function (si, q) { return changqingGetUrl('tx', si, q); },    required: true },
    { name: '收集聚合',    fn: function (si, q) { return shoujiGetUrl('tx', si, q); },       required: true },
    { name: '念心SVIP',    fn: function (si, q) { return nianxinGetUrl('tx', si, q); },      required: true },
    { name: '星海备',      fn: function (si, q) { return xinghaiBackupGetUrl('tx', si, q); }, required: true },
    { name: 'Huibq',       fn: function (si, q) { return huibqGetUrl('tx', si, q); },        required: false },
    { name: 'HYWmusic',    fn: function (si, q) { return hywGetUrl('tx', si, q); },          required: false },
    { name: 'fish-music',  fn: function (si, q) { return fishGetUrl('tx', si, q); },         required: false },
    { name: '汽水VIP',     fn: function (si, q) { return qishuiGetUrl(si, q); },             required: false }
  ],
  kw: [
    { name: '星海主',      fn: function (si, q) { return xinghaiMainGetUrl('kw', si, q); },  required: true },
    { name: '溯音酷我',    fn: function (si, q) { return suyinKwGetUrl(si, q); },            required: true },
    { name: '长青SVIP',    fn: function (si, q) { return changqingGetUrl('kw', si, q); },    required: true },
    { name: '收集聚合',    fn: function (si, q) { return shoujiGetUrl('kw', si, q); },       required: true },
    { name: '念心SVIP',    fn: function (si, q) { return nianxinGetUrl('kw', si, q); },      required: true },
    { name: '星海备',      fn: function (si, q) { return xinghaiBackupGetUrl('kw', si, q); }, required: true },
    { name: 'Huibq',       fn: function (si, q) { return huibqGetUrl('kw', si, q); },        required: false },
    { name: 'HYWmusic',    fn: function (si, q) { return hywGetUrl('kw', si, q); },          required: false },
    { name: 'fish-music',  fn: function (si, q) { return fishGetUrl('kw', si, q); },         required: false }
  ],
  kg: [
    { name: '聚合API',     fn: function (si, q) { return juheGetUrl('kg', si, q); },         required: true },
    { name: '长青SVIP',    fn: function (si, q) { return changqingGetUrl('kg', si, q); },    required: true },
    { name: 'zrcdy备用',   fn: function (si, q) { return zrcdyGetUrl('kg', si, q); },        required: true },
    { name: '念心SVIP',    fn: function (si, q) { return nianxinGetUrl('kg', si, q); },      required: true },
    { name: '星海主',      fn: function (si, q) { return xinghaiMainGetUrl('kg', si, q); },  required: true },
    { name: '星海备',      fn: function (si, q) { return xinghaiBackupGetUrl('kg', si, q); }, required: true },
    { name: 'Huibq',       fn: function (si, q) { return huibqGetUrl('kg', si, q); },        required: false },
    { name: 'HYWmusic',    fn: function (si, q) { return hywGetUrl('kg', si, q); },          required: false },
    { name: 'fish-music',  fn: function (si, q) { return fishGetUrl('kg', si, q); },         required: false }
  ],
  mg: [
    { name: '星海主',      fn: function (si, q) { return xinghaiMainGetUrl('mg', si, q); },  required: true },
    { name: '溯音咪咕',    fn: function (si, q) { return suyinMgGetUrl(si); },               required: true },
    { name: '长青SVIP',    fn: function (si, q) { return changqingGetUrl('mg', si, q); },    required: true },
    { name: '念心SVIP',    fn: function (si, q) { return nianxinGetUrl('mg', si, q); },      required: true },
    { name: '星海备',      fn: function (si, q) { return xinghaiBackupGetUrl('mg', si, q); }, required: true },
    { name: 'Huibq',       fn: function (si, q) { return huibqGetUrl('mg', si, q); },        required: false },
    { name: 'HYWmusic',    fn: function (si, q) { return hywGetUrl('mg', si, q); },          required: false },
    { name: 'fish-music',  fn: function (si, q) { return fishGetUrl('mg', si, q); },         required: false }
  ]
};

function buildChain(platform) {
  var template = CHAIN_TEMPLATES[platform];
  if (!template) return [];

  return template.filter(function (handler) {
    if (handler.required) return true;
    if (handler.name === 'Huibq') return !!(HUIBQ_API && HUIBQ_KEY);
    if (handler.name === 'HYWmusic') return !!HYW_API;
    if (handler.name === 'fish-music') return !!FISH_API;
    if (handler.name === '汽水VIP') return !!QISHUI_API;
    return false;
  });
}

function getUrlWithFallback(platform, songInfo, quality) {
  var chain = buildChain(platform);
  if (!chain.length) return Promise.reject(new Error('无可用回退链: ' + platform));

  var cacheKey = 'url_' + platform + '_' + getSongId(songInfo) + '_' + quality;
  var cached = cacheGet(cacheKey);
  if (cached) return Promise.resolve(cached);

  var errors = [];
  var startTime = Date.now();

  function phase1() {
    var n = (platform === 'kg') ? chain.length : Math.min(3, chain.length);
    var concurrent = chain.slice(0, n);
    var promises = concurrent.map(function (handler) {
      return handler.fn(songInfo, quality).then(function (url) {
        var validUrl = validateUrl(url, handler.name);
        return deepValidateUrl(validUrl, handler.name);
      }).then(function (url) {

        return { url: url, name: handler.name };
      });
    });

    return Promise.any(promises).then(function (result) {
      var url = result.url;
      var name = result.name;
      cacheSet(cacheKey, url);
      var totalMs = Date.now() - startTime;
      sendLog(platform, name, totalMs);
      return url;
    }).catch(function (e) {
      if (e && e.errors) {
        e.errors.forEach(function (err) { errors.push(err.message); });
      } else if (e) {
        errors.push(e.message || String(e));
      }
      return null;
    });
  }

  function phase2() {
    var offset = (platform === 'kg') ? chain.length : Math.min(3, chain.length);
    var remaining = chain.slice(offset);
    if (!remaining.length) return Promise.reject(new Error('所有音源均失败: ' + errors.join('; ')));

    function tryNext(index) {
      if (index >= remaining.length) {
        return Promise.reject(new Error('所有音源均失败: ' + errors.join('; ')));
      }
      var handler = remaining[index];
      return handler.fn(songInfo, quality).then(function (url) {
        var validUrl = validateUrl(url, handler.name);
        return deepValidateUrl(validUrl, handler.name);
      }).then(function (url) {
        cacheSet(cacheKey, url);
        var totalMs = Date.now() - startTime;
        sendLog(platform, handler.name, totalMs);
        return url;
      }).catch(function (e) {
        errors.push(handler.name + ': ' + (e.message || String(e)));
        return tryNext(index + 1);
      });
    }

    return tryNext(0);
  }

  return phase1().then(function (url) {
    if (url) return url;
    return phase2();
  });
}

function checkUpdate() {
  if (!VERSION_CHECK_URL) return;
  httpGet(VERSION_CHECK_URL, {}, {}, 8000).then(function (body) {
    var remoteVersion = body && body.version;
    var localVersion = currentScriptInfo.version || '1.0.0';
    if (remoteVersion && remoteVersion !== localVersion) {
      var log = body.log || ('新版本 ' + remoteVersion + ' 可用，请更新音源脚本');
      var updateUrl = body.updateUrl || '';
      var alertData = { log: log.substring(0, 1024) };
      if (updateUrl) alertData.updateUrl = updateUrl.substring(0, 1024);
      send(EVENT_NAMES.updateAlert, alertData);
    }
  }).catch(function () {

  });
}

on(EVENT_NAMES.request, function (handler) {
  return new Promise(function (resolve, reject) {
    var action = handler.action;
    var source = handler.source;
    var info = handler.info;

    if (action !== 'musicUrl') {
      return reject(new Error('action not support'));
    }

    if (!info || !info.musicInfo) {
      return reject(new Error('请求参数不完整'));
    }

    var quality = info.type || '128k';

    getUrlWithFallback(source, info.musicInfo, quality)
      .then(function (url) { resolve(url); })
      .catch(function (err) { reject(err); });
  });
});

var sourceConfig = {};

Object.keys(PLATFORM_QUALITIES).forEach(function (platform) {
  sourceConfig[platform] = {
    name: PLATFORM_NAMES[platform],
    type: 'music',
    actions: ['musicUrl'],
    qualitys: PLATFORM_QUALITIES[platform]
  };
});

send(EVENT_NAMES.inited, {
  sources: sourceConfig
});

setTimeout(function () {
  checkUpdate();
}, 3000);

console.log('[西瓜聚合源] v1.40 已就绪 - 聚合星海/溯音/CHKSZ/长青/念心/Huibq/HYW/fish/收集/汽水VIP 共10+后端，覆盖wy/tx/kw/kg/mg五大平台');

  })

  var __okList = [], __badList = [], __offList = [], __noMan = [];
  for (var __i = 0; __i < __N; __i++) {
    if (__isOff(__i)) {
      __offList.push(__name(__i));
      continue;
    }
    if (!__inManifest[__IDS[__i]]) __noMan.push(__IDS[__i]);
    if (__thrown[__i]) __badList.push(__name(__i) + '（' + __thrown[__i] + '）');
    else if (__decl[__i] && typeof __handler[__i] === 'function') __okList.push(__name(__i));
    else __badList.push(__name(__i) + '（未上报 inited）');
  }
  var __sources = __buildSources();
  var __plats = [];
  for (var __k in __sources) __plats.push(__k);

  __log(__ident());

  __log('运行配置：' + __cfgSummary());

  __logAt('debug', '健康度／缓存：' + __hCacheSummary());
  __log('初始化完成：' + __okList.length + ' 个子源可用 / ' + __badList.length + ' 个不可用'
    + (__offList.length ? ' / ' + __offList.length + ' 个已停用' : '') + '；平台 ' +
    (__plats.join(',') || '无'));
  if (__offList.length) {
    __log('已停用（改段② 清单里的 enabled 为 true 即可恢复）：' + __offList.join('、'));
  }
  if (__noMan.length) {
    __warn('清单里没有这些子源的记录，已按"启用 + 按注入顺序"处理：' + __noMan.join('、'));
  }
  if (__badList.length) __warn('不可用清单：' + __badList.join('、'));

  var __coolNow = __hCooled();
  if (__coolNow.length) {
    __warn('已熔断（暂不参与候选，接口恢复后自动回来）：' + __coolNow.join('、'));
  } else if (__hOn) {
    __logAt('debug', '熔断名单：无（本次运行还没有源被熔断）');
  }

  var __forcedCool = __forceList('cool');
  if (__forcedCool.length) {
    __warn('被人为停用（段② 清单里 forceState:"cool"，不会自动恢复）：' + __forcedCool.join('、'));
  }

  var __platPrio = __platPrioList();
  if (__platPrio.length) {
    __logAt('debug', '按平台单独定序（段② 清单里的 platPriority）：' + __platPrio.join('、'));
  }
  if (!__plats.length) {
    __err('严重：一个平台都没能声明。宿主对 inited 之前出现的任何异常都会判初始化失败，' +
      '请把上面的日志反馈（用 --devtools 生成可以看到本窗口的日志）。');
  }

  try {
    __ONG.call(__HOST, __REQ, __router);
  } catch (e) {
    __err('注册 request 回调失败：' + __msg(e));
  }

  var __payload = { sources: __sources };
  if (!__MOBILE) __payload.openDevTools = !!__devtools;
  try {
    __SENDG.call(__HOST, __INITED, __payload);
  } catch (e) {
    __err('上报 inited 失败：' + __msg(e));
  }
})()
