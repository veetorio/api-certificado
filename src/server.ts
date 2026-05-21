import Express from "express";
import cors from "cors"
import sql from "./providers/DatabaseProvider";
import MailJetSender  from "./providers/MailJetProvider";
import ResendProvider from "./providers/ResendProvider";
const db = new sql.SqlLite3();
const app = Express();
app.use(Express.json());
app.use(cors())
const ENDPOINT = "/participantes";

interface Participante {
    nome: string;
    email: string;
}

const mailSender = new ResendProvider();

function abreviarNome(nomeCompleto: string) {
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
app.get(ENDPOINT + "/nomesAbreviados", async (_, res) => {
    console.log("Requisição recebida para obter nomes abreviados.");
    let queryResult: Participante[] = await db.getField(["nome"]);
    const nomes  = queryResult.map((item: { nome: string }) => {
        return {
            nome: abreviarNome(item.nome)
        }
    })
    res.send(nomes);
})
app.get(ENDPOINT, async (_, res) => {
    console.log("Requisição recebida para obter nomes abreviados.");
    let queryResult = await db.getField(["id", "nome"]);
    res.send(queryResult);
})
app.post(ENDPOINT + "/send", async (_, res) => {
    console.log("Requisição recebida para obter nomes abreviados.");
    let queryResult = await db.getField(["id", "email"]);
    for (const participante of queryResult) {
        const mailOptions = {
            to: participante.email,
            from: "onboarding@resend.dev",
            subject: "Certificado de Participação",
            body: `Olá ${participante.nome},\n\nParabéns por participar do evento! Em breve, você receberá seu certificado de participação.\n\nAtenciosamente,\nEquipe do Evento`
        };
        await mailSender.sendMail(mailOptions);
    }
    res.send(queryResult);
})
app.post(ENDPOINT, async (_, res) => {
    console.log(_.body);
    res.send(await db.insertTuple(_.body));
})
app.delete(ENDPOINT, async (_, res) => {
    await db.delete();
    res.send("Participante removido com sucesso.");
})

app.listen(3000, async () => {
    await db.connect();
    console.log("Servidor rodando na porta 3000");
})


