# HTTP JSON Service Docker Image

Esta imagem Docker fornece um serviço HTTP simples que retorna uma resposta JSON para todas as requisições. A mensagem de resposta e o código de status HTTP podem ser configurados dinamicamente através de variáveis de ambiente, tornando-o flexível para diferentes casos de uso.

## Funcionalidades

- Responde a todas as requisições HTTP com um corpo JSON.
- A mensagem de resposta e o código de status HTTP podem ser alterados via variáveis de ambiente.
- Utiliza valores padrão caso as variáveis de ambiente não sejam fornecidas.

## Mensagem e Status Padrão

- **Mensagem padrão (JSON)**:

```json
{
    "message": "Atualize o app para a versão mais recente"
}
```

- **Status HTTP padrão**: 426 Upgrade Required

## Como Usar

### Construir a Imagem

Se você deseja construir a imagem Docker a partir do código fonte, navegue até o diretório onde está o `Dockerfile` e execute o seguinte comando:

```shell
docker build -t http-json-service .
```

### Executar a Imagem

Para executar a imagem Docker com os valores padrão de mensagem e status HTTP, use o seguinte comando:

```shell
docker run -p 3000:3000 http-json-service
```

Isso iniciará o serviço HTTP na porta 3000 do seu host. Quando acessado, ele retornará o seguinte JSON com o código de status 426 Upgrade Required:

```json
{
    "message": "Atualize o app para a versão mais recente"
}
```

### Personalizar a Resposta

Você pode personalizar tanto a mensagem de resposta quanto o código de status HTTP utilizando variáveis de ambiente.

#### Variáveis de Ambiente

- **RESPONSE_MESSAGE**: Define o JSON que será retornado na resposta. O valor deve ser um JSON válido em formato de string.
- **RESPONSE_STATUS**: Define o código de status HTTP da resposta. Se não for fornecido, o código de status padrão 426 Upgrade Required será utilizado.

#### Exemplos

##### 1. Usando a mensagem e o status padrão

Caso não sejam definidas variáveis de ambiente, o serviço retornará a mensagem e o status HTTP padrão:

```shell
docker run -p 3000:3000 http-json-service
```

##### 2. Definindo uma mensagem personalizada

Para personalizar a mensagem retornada, você pode definir a variável de ambiente RESPONSE_MESSAGE com o conteúdo JSON desejado:

```shell
docker run -p 3000:3000 -e RESPONSE_MESSAGE='{"message": "Por favor, atualize seu aplicativo para continuar.", "info": "Atualização disponível na loja de apps"}' http-json-service
```

Nesse exemplo, o serviço retornará o seguinte JSON:

```shell
{
    "message": "Por favor, atualize seu aplicativo para continuar.",
    "info": "Atualização disponível na loja de apps"
}
```

##### 3. Definindo uma mensagem e um código de status personalizados

Você também pode definir o código de status HTTP utilizando a variável de ambiente RESPONSE_STATUS:

```shell
    docker run -p 3000:3000 -e RESPONSE_MESSAGE='{"message": "Acesso negado. Atualize para continuar."}' -e RESPONSE_STATUS=403 http-json-service
```

Neste exemplo, o serviço responderá com o código de status 403 Forbidden e a seguinte mensagem:

```json
{
    "message": "Acesso negado. Atualize para continuar."
}
```

### Exposição de Porta

O serviço HTTP roda na porta 3000. Para expor essa porta para o host, utilize o parâmetro `-p` ao executar o container:

```shell
docker run -p 3000:3000 http-json-service
```

Agora o serviço estará acessível em `http://localhost:3000`.

### Testando a Resposta

Você pode testar o comportamento da aplicação usando ferramentas como o `curl` ou diretamente pelo navegador. Por exemplo, para testar via `curl`:

```shell
curl http://localhost:3000
```

Se as variáveis de ambiente não forem definidas, a resposta será algo assim:

```json
{
    "message": "Atualize o app para a versão mais recente"
}
```shell

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
