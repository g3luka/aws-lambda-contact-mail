const qs = require('querystring')

module.exports = {
	"body": qs.stringify({
    "name": "Seu nome",
    "email": "seu_email@exemplo.com",
    "subject": "assunto",
    "message": "Mensagem de teste de formulário de contato",
    "g-recaptcha-response": "token_recaptcha"
  })
}
