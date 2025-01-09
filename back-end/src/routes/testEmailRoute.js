import { sendEmail } from '../util/sendEmail';

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail('stefanozuca@gmail.com', 'Test Email', 'This is a test email');
            res.sendStatus(200);
        } catch (error) {
            console.error('Error sending email:', error);
            res.sendStatus(500);
        }
    }
};
