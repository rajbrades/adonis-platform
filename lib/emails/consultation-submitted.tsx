export const ConsultationSubmittedEmail = ({
  patientName,
  consultationId,
  goals,
  submittedDate
}: {
  patientName: string
  consultationId: string
  goals: string[]
  submittedDate: string
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom: 40px;">
                <h1 style="margin: 0; font-size: 36px; font-weight: 900; color: #FDB912; letter-spacing: 3px;">ADONIS</h1>
              </td>
            </tr>
            
            <!-- Main Card -->
            <tr>
              <td style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; padding: 40px;">
                
                <!-- Checkmark -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <div style="width: 64px; height: 64px; background-color: rgba(34, 197, 94, 0.15); border: 2px solid #22C55E; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 32px; color: #22C55E; line-height: 1;">✓</span>
                      </div>
                    </td>
                  </tr>
                </table>
                
                <!-- Title -->
                <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: #FDB912; text-align: center;">
                  Consultation Submitted Successfully
                </h2>
                
                <!-- Body Text -->
                <p style="margin: 0 0 16px 0; color: rgba(255, 255, 255, 0.85); font-size: 16px; line-height: 1.6;">
                  Hi ${patientName},
                </p>
                
                <p style="margin: 0 0 24px 0; color: rgba(255, 255, 255, 0.85); font-size: 16px; line-height: 1.6;">
                  Thank you for submitting your health optimization consultation. Our medical team has received your information and will review it shortly.
                </p>
                
                <!-- Goals Section -->
                <div style="margin: 24px 0;">
                  <p style="margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; font-weight: 600;">
                    Your Optimization Goals:
                  </p>
                  ${goals.map(goal => `
                    <div style="background-color: rgba(253, 185, 18, 0.12); border: 1px solid rgba(253, 185, 18, 0.3); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px;">
                      <span style="color: #FDB912; font-weight: 600; font-size: 15px;">• ${goal}</span>
                    </div>
                  `).join('')}
                </div>
                
                <!-- What's Next -->
                <div style="background-color: rgba(253, 185, 18, 0.08); border-left: 3px solid #FDB912; border-radius: 4px; padding: 16px; margin: 24px 0;">
                  <p style="margin: 0 0 12px 0; color: #FDB912; font-size: 16px; font-weight: 700;">
                    What happens next?
                  </p>
                  <p style="margin: 0 0 8px 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">
                    <strong>1.</strong> A licensed provider will review your consultation within 24-48 hours
                  </p>
                  <p style="margin: 0 0 8px 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">
                    <strong>2.</strong> You'll receive an email with their recommendations and lab test suggestions
                  </p>
                  <p style="margin: 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">
                    <strong>3.</strong> You can then order any recommended labs directly from that email
                  </p>
                </div>
                
                <!-- Consultation Info -->
                <div style="background-color: rgba(255, 255, 255, 0.03); border-radius: 8px; padding: 16px; margin-top: 24px;">
                  <p style="margin: 0 0 4px 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">
                    <strong style="color: rgba(255, 255, 255, 0.8);">Consultation ID:</strong> ${consultationId}
                  </p>
                  <p style="margin: 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">
                    <strong style="color: rgba(255, 255, 255, 0.8);">Submitted:</strong> ${submittedDate}
                  </p>
                </div>
                
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="margin: 0 0 8px 0; color: rgba(255, 255, 255, 0.5); font-size: 14px;">
                  Questions? Reply to this email or contact us at 
                  <a href="mailto:support@adonis.com" style="color: #FDB912; text-decoration: none;">support@adonis.com</a>
                </p>
                <p style="margin: 0; color: rgba(255, 255, 255, 0.4); font-size: 13px;">
                  © 2025 Adonis Health. All rights reserved.
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
