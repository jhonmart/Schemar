import { createApp, h, isVNode } from 'vue'
import Modal from './Modal.vue'

interface ModalOptions {
  template: any
  props?: Record<string, any>
  onClose?: () => void
}

let modalApp: ReturnType<typeof createApp> | null = null
let container: HTMLElement | null = null

export const modal = {
  open(options: ModalOptions) {
    if (modalApp) return

    container = document.createElement('div')
    document.body.appendChild(container)

    const { template, props = {}, onClose } = options

    modalApp = createApp({
      render() {
        return h(Modal, {
          ...props,
          onClose: () => {
            onClose?.()
            modal.close()
          }
        }, {
          default: () => {
            if (isVNode(template)) return template
            if (typeof template === 'object') return h(template as any, props)
            return template
          }
        })
      }
    })

    modalApp.mount(container)
  },

  close() {
    if (modalApp && container) {
      modalApp.unmount()
      container.remove()
      modalApp = null
      container = null
    }
  }
}
