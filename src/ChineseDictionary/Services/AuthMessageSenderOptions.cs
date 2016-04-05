using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChineseDictionary.Services
{
    public class AuthMessageSenderOptions
    {
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string MailSenderAddress { get; set; }
        public string MailSenderDisplayName { get; set; }
        public string SmtpUserName { get; set; }
        public string SmtpPassword { get; set; }
        public string TwilioSID { get; set; }
        public string TwilioAuthToken { get; set; }
        public string TwilioSendNumber { get; set; }
    }
}
