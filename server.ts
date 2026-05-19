import Express = require("express");
import cors = require("cors")
import SqlLite3 = require("./DatabaseProvider")
import dns = require("googleapis/build/src/apis/dns");
import utils = require("next/dist/shared/lib/utils");

const db = new SqlLite3();
const app = Express();
app.use(Express.json());
app.use(cors())
const ENDPOINT = "/participantes";

function abreviarNome(nomeCompleto : string) {
  const palavras = nomeCompleto.trim().split(" ");
  
  if (palavras.length <= 2) {
    return nomeCompleto; // Retorna original se tiver apenas 1 ou 2 nomes
  }

  const primeiroNome = palavras[0];
  const ultimoNome = palavras[palavras.length - 1];

  // Pega apenas as iniciais dos nomes do meio
  const nomesDoMeioAbreviados = palavras.slice(1, -1).map(nome => {
    return `${nome.charAt(0)}.`;
  });

  return [primeiroNome, ...nomesDoMeioAbreviados, ultimoNome].join(" ");
}
const middleware = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const key = req.headers["key"];
    if (key !== process.env.KEY) {
        res.status(401).send("Unauthorized");
        return;
    }
    console.log(`Requisição recebida: ${req.method} ${req.url}`);
    next();
}
app.get(ENDPOINT + "/nomesAbreviados", async (_, res) => {
    console.log("Requisição recebida para obter nomes abreviados.");
    let queryResult = await db.getField(["nome"]);
    queryResult = queryResult.map((item : { nome: string }) => {
        return {
            nome: abreviarNome(item.nome)
        }
    })
    res.send(queryResult);
})
app.post(ENDPOINT, async (_, res) => {
    console.log(_.body);
    res.send(await db.insertTuple(_.body));
})
app.delete(ENDPOINT,middleware,async (_, res) => {
    await db.delete();
    res.send("Participante removido com sucesso.");
})

app.listen(3000,async () => {  
    await db.connect();
    console.log("Servidor rodando na porta 3000");
})


