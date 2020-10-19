import defaultSettings from '@/settings'

// const title = defaultSettings.title || 'Vue Admin Template'
const title = 'Industry Mind 机器学习算法平台'
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
