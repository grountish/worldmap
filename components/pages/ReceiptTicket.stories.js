import ReceiptTicket from './ReceiptTicket'

export default {
  title: 'ReceiptTicket',
  component: ReceiptTicket,
}

export const Default = () => '<ReceiptTicket name="Alice" country="Wonderland" :nurses="4" />'
