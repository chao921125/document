import { noop, fail, getContentFromDescTag, getHrefFromIconTag, getTitleFromTitleTag } from './utils'

export default {
  link: location.href,
  title: getTitleFromTitleTag(),
  desc: getContentFromDescTag(),
  icon: getHrefFromIconTag(),
  from: '',
  success: noop,
  fail,
  trigger: noop,
}
