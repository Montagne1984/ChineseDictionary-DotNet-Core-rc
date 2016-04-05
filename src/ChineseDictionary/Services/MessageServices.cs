using Microsoft.Extensions.OptionsModel;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ChineseDictionary.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link http://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        public AuthMessageSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public AuthMessageSenderOptions Options { get; }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            // Command line argument must the the SMTP host.
            var client = new SmtpClient(Options.SmtpHost, Options.SmtpPort);
            client.EnableSsl = true;
            var NetworkCred = new NetworkCredential(Options.SmtpUserName, Options.SmtpPassword);
            client.UseDefaultCredentials = false;
            client.Credentials = NetworkCred;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            // Specify the e-mail sender.
            // Create a mailing address that includes a UTF8 character
            // in the display name.
            var from = new MailAddress(Options.MailSenderAddress, Options.MailSenderDisplayName, System.Text.Encoding.UTF8);
            // Set destinations for the e-mail message.
            var to = new MailAddress(email);
            // Specify the message content.
            var mailMessage = new MailMessage(from, to);
            mailMessage.Body = message;
            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.Subject = subject;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;
            mailMessage.IsBodyHtml = true;
            return client.SendMailAsync(mailMessage);
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            var twilio = new Twilio.TwilioRestClient(
                Options.TwilioSID,           // Account Sid from dashboard
                Options.TwilioAuthToken);    // Auth Token

            var result = twilio.SendMessage(Options.TwilioSendNumber, number, message);
            // Use the debug output for testing without receiving a SMS message.
            // Remove the Debug.WriteLine(message) line after debugging.
            System.Diagnostics.Debug.WriteLine(message);
            return Task.FromResult(0);
        }
    }
}
