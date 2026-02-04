# WhatsApp Contact Form Integration

## Overview
Your portfolio contact form now sends messages directly to WhatsApp! When visitors fill out the form and click "Send via WhatsApp", it will open WhatsApp (web or app) with a pre-formatted message.

## How to Configure Your WhatsApp Number

### Step 1: Open the JavaScript File
Navigate to: `c:\IT\Projects\port_folio\js\script.js`

### Step 2: Find the Configuration Section
Look for this line (around line 153):
```javascript
const WHATSAPP_NUMBER = '1234567890'; // UPDATE THIS WITH YOUR NUMBER
```

### Step 3: Update with Your WhatsApp Number
Replace `'1234567890'` with your WhatsApp number in this format:
- **Include country code** (without + sign)
- **No spaces or dashes**
- **Just digits**

**Examples:**
- India: `'919876543210'` (91 is country code)
- USA: `'11234567890'` (1 is country code)
- UK: `'447123456789'` (44 is country code)
- UAE: `'971501234567'` (971 is country code)

### Step 4: Save and Test
1. Save the file
2. Open your portfolio in a browser
3. Fill out the contact form
4. Click "Send via WhatsApp"
5. WhatsApp should open with the pre-filled message

## Message Format
When someone submits the form, the WhatsApp message will look like this:

```
*New Portfolio Contact Message*

*Name:* John Doe
*Email:* john@example.com

*Message:*
Hi, I'd like to discuss a project with you...

---
Sent from Portfolio Contact Form
```

## Features
✅ Works on both mobile and desktop
✅ Automatically opens WhatsApp Web or mobile app
✅ Pre-fills message with form data
✅ Shows success notification
✅ Clears form after submission
✅ WhatsApp icon on button
✅ Form validation included

## Troubleshooting

**Q: WhatsApp doesn't open**
- Make sure WhatsApp is installed on your device
- Check that the phone number format is correct
- Ensure you have internet connection

**Q: I want to test without WhatsApp**
- Use a browser's developer console to check the formatted URL
- The URL starts with `https://wa.me/...`

**Q: Can I customize the message format?**
- Yes! Edit the `whatsappMessage` variable in `script.js` (around line 171)

## Example Configuration

```javascript
// For an Indian number: +91 98765 43210
const WHATSAPP_NUMBER = '919876543210';

// For a US number: +1 (234) 567-8900
const WHATSAPP_NUMBER = '12345678900';

// For a UK number: +44 7123 456789
const WHATSAPP_NUMBER = '447123456789';
```

That's it! Your contact form is now connected to WhatsApp! 🎉
