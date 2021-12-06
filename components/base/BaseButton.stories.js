// import IconifyIcon from '@iconify/vue'
// import dropboxIcon from '@iconify/icons-fa-brands/dropbox'

import BaseButton from './BaseButton'

// IconifyIcon.addIcon('dropbox', dropboxIcon)

export default { title: 'BaseButton' }

export const NoIcon = () => ({
  components: { BaseButton },
  template: '<BaseButton>Button Label</BaseButton>',
})
NoIcon.storyName = 'Default'

// export const LeftIcon = () => ({
//   components: { BaseButton, IconifyIcon },
//   template: '<BaseButton variant="primary"><template #iconLeft><IconifyIcon icon="dropbox" /></template>Button Label</BaseButton>',
// })
// LeftIcon.storyName = 'w/ Left Icon'

// export const RightIcon = () => ({
//   components: { BaseButton, IconifyIcon },
//   template: '<BaseButton variant="secondary">Button Label<template #iconRight><IconifyIcon icon="dropbox" /></template></BaseButton>',
// })
// RightIcon.storyName = 'w/ Right Icon'

// export const BothIcons = () => ({
//   components: { BaseButton, IconifyIcon },
//   template: `
//     <BaseButton variant="primary" :isDisabled="true" :isLoading="true">
//       <template #iconLeft><IconifyIcon icon="dropbox" /></template>
//       Button Label
//       <template #iconRight><IconifyIcon icon="dropbox" /></template>
//     </BaseButton>
//   `,
// })
// BothIcons.storyName = 'w/ Both Icons'
