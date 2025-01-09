import mailjet from 'node-mailjet';



export const sendEmail = async (to, subject, text) => {

    const mailjetClient = mailjet.apiConnect(
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_API_SECRET,
       /*  {
          host: 'in-v3.mailjet.com',
          version: 'v3.1',
          output: 'json',
        } */
      );

    const request = mailjetClient
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [{
                From: { Email: 'certificadosap@mocos.dev', Name: 'Stefano' },
                To: [{ Email: to }],
                Subject: subject,
                TextPart: text
            }]
        });

    request.then(result => {
          console.log(result.body)
        })
        .catch(err => {
          console.log(err.statusCode)
        })
};  

