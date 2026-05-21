interface MailProvider {
    sendMail(options: MailOptions): Promise<void>;
    showConfiguration?(): void;
}
interface MailOptions {
    to: string;
    from : string;
    subject: string;
    body : string
}

export = MailProvider ;