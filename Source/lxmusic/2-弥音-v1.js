/*!
 * @name 弥音
 * @description 仅Q音，仅128k
 * @version v1
 * @author 玥然OvO
 */

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