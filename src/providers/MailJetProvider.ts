import MailJetClient from "node-mailjet";
import MailProvider from "./gateway/MailSenderStrategy";
import MailOptions from "./gateway/MailOptionsStrategy";
import env from "./env";

const ak = env.get("MJ_APIKEY_PUBLIC");
const sk = env.get("MJ_APIKEY_PRIVATE");
console.log("API Key:", ak ? "Configurada" : "Não configurada");
console.log("Secret Key:", sk ? "Configurada" : "Não configurada");

const mailjetClient = MailJetClient.Client.apiConnect(
    ak,
    sk
);

class MailJetSender implements MailProvider {
    async sendMail(options: MailOptions): Promise<void> {
        mailjetClient.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: options.from,
                    },  
                    To: [
                        {
                            Email: options.to,  
                        }
                    ],
                    Subject: options.subject,
                    TextPart: options.body,
                }
            ]
        }).then((result: any) => {
            console.log("Email enviado com sucesso:", result.body);
        }).catch((err: any) => {
            console.error("Erro ao enviar email:", err.statusCode, err.message);
        });
        // Implementação real usando MailJet API
    }

    showConfiguration() {
        console.log("Configurações do MailJet:");
        console.log("- API Key:", env.get("MJ_APIKEY_PUBLIC") ? "Configurada" : "Não configurada");
        console.log("- Secret Key:", env.get("MJ_APIKEY_PRIVATE") ? "Configurada" : "Não configurada");
    }
}

export =  MailJetSender ;