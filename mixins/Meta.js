export const meta = {
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'An online Museum dedicated to the 34 million nurse salaries lost to tax abuse every year.',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'MoMN (Museum Of Missing Nurses)',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/ogimage.jpg',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      ],
    }
  },
}
