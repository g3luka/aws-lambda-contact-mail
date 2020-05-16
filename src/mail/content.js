const { format } = require('date-fns')

const date = format(new Date(), 'dd/MM/yyyy HH:mm')
const subject = {
  'redacao': 'Fale com a redação',
  'comunique_erros': 'Comunique erros',
  'pauta': 'Sugestão de pauta'
}

module.exports = (data) => {
  return {
    subject: `Fale Conosco - ${subject[data.subject]}`,
    body: `
<h3 style="color: #880404;">Contato recebido do Fale Conosco (${subject[data.subject]})</h3>
<p><b style="color: #880404;">Data:</b> ${date}</p>
<p>
<b style="color: #880404;">Nome:</b> ${data.name}<br>
<b style="color: #880404;">E-mail:</b> ${data.email}<br>
<b style="color: #880404;">Telefone:</b> ${data.phone}
</p>
<p>${data.message.replace(/\n/g, '</p><p>')}<p>
<br/>
<br/>
<i>E-mail recebido diretamente pelo formulário de contato no site </i>
`
  }
}
