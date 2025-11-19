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
    <title>ADONIS Health - Consultation Received</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #1a1a1a; border: 1px solid #2a2a2a;">
            
            <!-- Header with Logo -->
            <tr>
              <td style="background-color: #000000; padding: 32px 40px; text-align: center; border-bottom: 2px solid #FDB912;">
                <h1 style="margin: 0; font-size: 42px; font-weight: 900; color: #FDB912; letter-spacing: 4px; text-shadow: 0 2px 10px rgba(253, 185, 18, 0.3);">ADONIS</h1>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #888888; letter-spacing: 2px; text-transform: uppercase;">Health Optimization</p>
              </td>
            </tr>
            
            <!-- Success Icon -->
            <tr>
              <td align="center" style="padding: 40px 40px 24px 40px;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width: 80px; height: 80px; background-color: #1e4620; border: 3px solid #22c55e; border-radius: 50%; text-align: center; vertical-align: middle;">
                      <span style="font-size: 48px; line-height: 80px; color: #22c55e;">✓</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Main Content -->
            <tr>
              <td style="padding: 0 40px 40px 40px;">
                
                <!-- Title -->
                <h2 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 700; color: #FDB912; text-align: center; line-height: 1.3;">
                  Consultation Received
                </h2>
                
                <!-- Greeting -->
                <p style="margin: 0 0 16px 0; color: #e5e5e5; font-size: 17px; line-height: 1.6;">
                  Hi <strong style="color: #FDB912;">${patientName}</strong>,
                </p>
                
                <p style="margin: 0 0 24px 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                  Thank you for choosing ADONIS Health. Our medical team has received your consultation and will begin reviewing your information.
                </p>
                
                <!-- Goals Section -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 32px 0;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 16px 0; color: #FDB912; font-size: 18px; font-weight: 700;">
                        Your Optimization Goals
                      </p>
                    </td>
                  </tr>
                  ${goals.map(goal => `
                    <tr>
                      <td style="padding-bottom: 12px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="background-color: #2a2416; border-left: 4px solid #FDB912; padding: 14px 20px;">
                              <p style="margin: 0; color: #FDB912; font-size: 15px; font-weight: 600;">
                                • ${goal}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  `).join('')}
                </table>
                
                <!-- Next Steps -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 32px 0; background-color: #1e1e1e; border: 1px solid #2a2a2a;">
                  <tr>
                    <td style="padding: 24px;">
                      <p style="margin: 0 0 16px 0; color: #FDB912; font-size: 18px; font-weight: 700;">
                        What Happens Next
                      </p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="width: 32px; height: 32px; background-color: #FDB912; color: #000000; text-align: center; vertical-align: middle; font-weight: 700; font-size: 16px;">1</td>
                                <td style="padding-left: 12px; color: #cccccc; font-size: 15px; line-height: 1.5;">
                                  A licensed provider reviews your consultation <strong style="color: #FDB912;">(24-48 hours)</strong>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="width: 32px; height: 32px; background-color: #FDB912; color: #000000; text-align: center; vertical-align: middle; font-weight: 700; font-size: 16px;">2</td>
                                <td style="padding-left: 12px; color: #cccccc; font-size: 15px; line-height: 1.5;">
                                  Receive personalized lab recommendations via email
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="width: 32px; height: 32px; background-color: #FDB912; color: #000000; text-align: center; vertical-align: middle; font-weight: 700; font-size: 16px;">3</td>
                                <td style="padding-left: 12px; color: #cccccc; font-size: 15px; line-height: 1.5;">
                                  Order recommended labs with one click
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Reference Info -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #0f0f0f; border: 1px solid #2a2a2a;">
                  <tr>
                    <td style="padding: 20px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <span style="color: #888888; font-size: 13px;">Consultation ID:</span>
                            <span style="color: #FDB912; font-size: 13px; font-weight: 600; margin-left: 8px;">${consultationId}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style="color: #888888; font-size: 13px;">Submitted:</span>
                            <span style="color: #cccccc; font-size: 13px; margin-left: 8px;">${submittedDate}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #000000; padding: 32px 40px; text-align: center; border-top: 1px solid #2a2a2a;">
                <p style="margin: 0 0 12px 0; color: #888888; font-size: 14px;">
                  Questions? Contact us at 
                  <a href="mailto:support@getadonishealth.com" style="color: #FDB912; text-decoration: none;">support@getadonishealth.com</a>
                </p>
                <p style="margin: 0; color: #555555; font-size: 12px;">
                  © 2025 ADONIS Health. All rights reserved.
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
