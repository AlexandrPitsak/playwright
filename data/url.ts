export const isProd = () => process.env.ENV === 'prod'

export const urls = {
    googleAccounts: 'https://accounts.google.com/',
    lookerStudio: 'https://lookerstudio.google.com',
    hub: isProd() ? 'https://hub.supermetrics.com': 'https://hub.ismtip.com',
}