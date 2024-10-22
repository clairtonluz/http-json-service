const express = require('express');
const app = express();
const PORT = 3000;

// Mensagem e status padrão
const defaultMessage = {
  message: "Atualize o app para a versão mais recente"
};
const defaultStatus = 426; // Status HTTP padrão

// Carregar mensagem a partir da variável de ambiente, ou usar a padrão
let customMessage;
try {
  customMessage = process.env.RESPONSE_MESSAGE ? JSON.parse(process.env.RESPONSE_MESSAGE) : defaultMessage;
} catch (error) {
  console.error('Erro ao parsear RESPONSE_MESSAGE. Usando mensagem padrão.');
  customMessage = defaultMessage;
}

// Carregar o status HTTP a partir da variável de ambiente, ou usar o padrão
const customStatus = process.env.RESPONSE_STATUS ? parseInt(process.env.RESPONSE_STATUS) : defaultStatus;

app.use(express.json());

app.all('*', (req, res) => {
  res.status(customStatus).json(customMessage);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
