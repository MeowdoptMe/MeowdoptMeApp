import smtplib
import ssl
from email.message import EmailMessage


def send_email(serializer, data):
    port = 587
    smtp_server = "smtp.gmail.com"
    sender_email = "malgdras@gmail.com"
    receiver_email = serializer.validated_data["email"]
    password = "huoadkvgojwwovtn"
    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(sender_email, password)
        msg = EmailMessage()
        msg["Subject"] = data["subject"]
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg.set_content(data["body"])
        server.send_message(msg)
