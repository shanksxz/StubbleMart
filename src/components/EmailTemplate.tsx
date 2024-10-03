import * as React from 'react';

interface EmailTemplateProps {
    agencyName: string,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    agencyName,
}) => (
    <div>
        Subject: Thank You for Collaborating with Stubble Mart!

        Dear {agencyName},

        Thank you for reaching out and showing interest in collaborating with Stubble Mart. We have received your details, and our team will review your profile promptly.

        We will get back to you as soon as possible with further steps and how we can work together to achieve our shared goals.

        If you have any questions or need additional information, please feel free to contact us.

        Best regards,
        The Stubble Mart Team
        8694016666
    </div>
);
