# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using adventuringghost@gmail.com)
4. Connect your Gmail account
5. Note down the **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your AdventuringGhost portfolio contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxxxx`)

## Step 5: Update Configuration
1. Open `apps/portfolio/src/services/emailService.ts`
2. Replace the placeholder values:
   - `EMAILJS_SERVICE_ID` with your Service ID
   - `EMAILJS_TEMPLATE_ID` with your Template ID  
   - `EMAILJS_PUBLIC_KEY` with your Public Key

## Step 6: Test
1. Build and deploy the updated portfolio
2. Test the contact form on your live site
3. Check your Gmail inbox for the test message

## Free Tier Limits
- 200 emails per month
- Perfect for a portfolio contact form
- No credit card required


