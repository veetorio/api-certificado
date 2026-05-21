import { Resend } from "resend";
import env from "./env";
import MailProvider from "./gateway/MailSenderStrategy";


const key = env.get("RESEND_API_KEY");
const mailResender = new Resend(key);
class ResendProvider implements MailProvider {
        async sendMail(options: any): Promise<void> {
                await mailResender.emails.send({
                        from: options.from,
                        to: options.to,
                        subject: options.subject,
                        text: options.body,
                }); 
        }
}

export = ResendProvider;