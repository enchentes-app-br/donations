# donations

API de Geolocalização para Doações durante Enchentes no RS

## Descrição

Esta API foi definida da forma mais simples possível, onde os próprios usuários
podem informar como podem ajudar com doações e onde podem conseguir ajuda. As
informações são vivas e sem restrições.

## Autenticação

Crie um _token_ na [API de Tokens](https://tokens.enchentes.app.br/docs).

## Fluxo Quero Ajudar

Após criar o Token de Autenticação, você pode criar uma doação através desta
API, informando as coordenadas de latitude e longitude, tipos disponíveis de
doação e número de contato do WhatsApp. Também é possível votar se uma doação é
confiável.

## Fluxo Preciso de Ajuda

Você pode consultar as doações mais perto de você informando as suas coordenadas
de latitude e longitude, além do tipo de doação. Além disso, você pode verificar
se determinada doação é confiável conforme votos informados.

## Exemplo

### Fluxo Quero Ajudar

```
JWT_TOKEN=`
curl "https://tokens.enchentes.app.br/v1/tokens" \
    --request POST \
    --silent
`

curl "https://donations.enchentes.app.br/v1/donations" \
    --request POST \
    --oauth2-bearer "$JWT_TOKEN" \
    --header 'Content-Type: application/json' \
    --data '{ "lat": 0, "long": 0, "types": [ "FOOD" ], "contact": { "whatsapp": "+5551999999999" } }' \
    --silent
```

### Fluxo Preciso de Ajuda

```
curl "https://donations.enchentes.app.br/v1/donations?lat=0&long=0&type=FOOD" \
    --request GET
```
