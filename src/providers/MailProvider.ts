import MailJetClient = require("node-mailjet");
import MailProvider from "./gateway/MailSenderStrategy";
import MailOptions from "./gateway/MailOptionsStrategy";



class MailMockUp {
    async sendMail(options: MailOptions): Promise<void> {
        console.log("Enviando email para:", options.to);
        console.log("Assunto:", options.subject);
        console.log("Corpo do email:", options.body);
    }
}


export = MailMockUp ;