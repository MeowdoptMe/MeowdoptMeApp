import smtplib, ssl


class Util:
    @staticmethod
    def send_email(serializer, data):
        port = 587
        smtp_server = "smtp.gmail.com"
        sender_email = "malgdras@gmail.com"
        receiver_email = serializer.validated_data["email"]
        password = "huoadkvgojwwovtn"
        message = "This message is sent from MeowdoptMeApp for reseting password"
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_server, port) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, data["email_body"])
