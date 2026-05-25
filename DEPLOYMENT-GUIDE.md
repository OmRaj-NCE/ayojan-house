# 🏠 AYOJAN HOUSE — Complete Setup & Deployment Guide

> **Read this fully before doing anything.** This guide is written for someone with  
> zero coding experience. Follow every step exactly as written.

---

## 📁 STEP 1 — Your Final Folder Structure

Make sure your `ayojan-house` folder looks exactly like this:

```
ayojan-house/
│
├── index.html          ← Home page
├── services.html       ← Services page
├── gallery.html        ← Gallery page
├── contact.html        ← Contact page
├── 404.html            ← Error page
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← SEO robots file
│
├── styles/
│   ├── global.css
│   ├── animations.css
│   ├── home.css
│   ├── services.css
│   ├── gallery.css
│   └── contact.css
│
├── scripts/
│   ├── main.js
│   ├── gallery.js
│   └── contact.js
│
├── images/             ← PUT YOUR PHOTOS HERE
│   ├── hero-main.jpg
│   ├── about-1.jpg
│   ├── service-wedding.jpg
│   └── ... (all your images)
│
└── videos/             ← PUT YOUR VIDEOS HERE
    ├── wedding-highlights.mp4
    └── ... (all your videos)
```

---

## 🖼️ STEP 2 — Adding Your Photos

### Where to put photos:
Drop all your `.jpg` or `.webp` photos into the `images/` folder.

### Recommended image names:
| File Name              | Where It's Used          |
|------------------------|--------------------------|
| `hero-main.jpg`        | Home page hero section   |
| `about-1.jpg`          | About section (tall)     |
| `about-2.jpg`          | About section (top right)|
| `about-3.jpg`          | About section (bottom)   |
| `service-wedding.jpg`  | Services: wedding        |
| `service-birthday.jpg` | Services: birthday       |
| `service-corporate.jpg`| Services: corporate      |
| `service-prewedding.jpg`| Services: pre-wedding   |
| `service-theme.jpg`    | Services: theme party    |
| `service-catering.jpg` | Services: catering       |
| `wedding-stage.jpg`    | Gallery photo 1          |
| `birthday-50th.jpg`    | Gallery photo 2          |
| `corporate-award.jpg`  | Gallery photo 3          |
| `mehendi-decor.jpg`    | Gallery photo 4          |
| `mughal-theme.jpg`     | Gallery photo 5          |
| `floral-mandap.jpg`    | Gallery photo 6          |
| `superhero-birthday.jpg`| Gallery photo 7         |
| `sangeet-stage.jpg`    | Gallery photo 8          |
| `reception-hall.jpg`   | Gallery photo 9          |
| `product-launch.jpg`   | Gallery photo 10         |
| `og-cover.jpg`         | Social media preview     |

### How to activate a photo in the HTML:

**Example — Hero image in `index.html`:**

Find this comment block:
```html
<!-- <img src="images/hero-main.jpg" alt="..." class="hero__img-main" /> -->
<div class="hero__img-placeholder"> ... </div>
```

Change it to:
```html
<img src="images/hero-main.jpg" alt="Grand wedding event by Ayojan House" class="hero__img-main" />
<!-- DELETE the hero__img-placeholder div below -->
```

**Example — Gallery photo in `gallery.html`:**

Find `data-src=""` on any masonry item and add your image path:
```html
data-src="images/wedding-stage.jpg"
```

Then replace the `.masonry-item__ph` placeholder div with:
```html
<img src="images/wedding-stage.jpg"
     class="masonry-item__img"
     alt="Grand wedding stage by Ayojan House, Patna" />
```

### Photo tips:
- Resize photos to max 1200px wide before uploading (saves load time)
- Use free tools: https://squoosh.app or https://tinypng.com
- File size should be under 300KB per photo ideally

---

## 🎬 STEP 3 — Adding Your Videos

1. Put your `.mp4` video files in the `videos/` folder
2. In `gallery.html`, find each video card (`<div class="vcard">`) and update:

```html
data-src="videos/wedding-highlights.mp4"
```

3. Replace the thumbnail placeholder with an actual thumbnail image:

```html
<!-- Delete the .vcard__thumb-ph div, add this instead: -->
<img src="images/video-thumb-wedding.jpg"
     class="vcard__media"
     alt="Wedding highlights video thumbnail" />
```

### Video tips:
- Keep video files under 50MB each for fast loading
- Use HandBrake (free) to compress: https://handbrake.fr
- MP4 format, H.264 codec works on all browsers

---

## 📧 STEP 4 — Setting Up Email (Formspree — FREE)

This makes the contact form actually send you emails.

**Step 4.1:** Go to https://formspree.io and click **"Get Started Free"**

**Step 4.2:** Sign up with your email (e.g. hello@ayojanhouse.in or Gmail)

**Step 4.3:** Click **"+ New Form"**

**Step 4.4:** Name it `Ayojan House Contact` → click **Create**

**Step 4.5:** You will see a form endpoint like:
```
https://formspree.io/f/xabcdefg
```
Copy just the ID part: `xabcdefg`

**Step 4.6:** Open `scripts/contact.js` in Notepad

Find this line:
```javascript
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';
```

Replace with your actual ID:
```javascript
const FORMSPREE_ID = 'xabcdefg';
```

**Step 4.7:** Save the file. That's it — forms will now arrive in your email!

---

## 🌐 STEP 5 — GitHub Account Setup

GitHub stores your website files online for free.

**Step 5.1:** Go to https://github.com → click **"Sign up"**

**Step 5.2:** Enter:
- Username: `ayojanhouse` (or similar)
- Email: your email
- Password: strong password

**Step 5.3:** Verify your email address by clicking the link GitHub sends you.

**Step 5.4:** Click **"Create a new repository"** (the green button or the + icon at top right)

**Step 5.5:** Fill in:
- Repository name: `ayojan-house`
- Description: `Ayojan House event planner website`
- Select **Public**
- Do NOT tick "Add README"

**Step 5.6:** Click **"Create repository"**

---

## 📤 STEP 6 — Upload Your Files to GitHub

You will upload files directly from your browser — no technical tools needed.

**Step 6.1:** On your new repository page, click **"uploading an existing file"** (blue link in the middle of the page)

**Step 6.2:** Open your `ayojan-house` folder on your computer

**Step 6.3:** Select ALL files and folders inside `ayojan-house`:
- Hold `Ctrl` (Windows) or `Cmd` (Mac) and click everything
- Or press `Ctrl+A` to select all

**Step 6.4:** Drag them all into the GitHub upload box in your browser

**Step 6.5:** Wait for all files to upload (may take 1-2 minutes)

**Step 6.6:** Scroll down to the **"Commit changes"** section:
- First box: type `Initial website upload`
- Click the green **"Commit changes"** button

✅ Your files are now on GitHub!

---

## 🚀 STEP 7 — Deploy on Vercel (Free Hosting)

Vercel turns your GitHub files into a live website — free, fast, automatic.

**Step 7.1:** Go to https://vercel.com → click **"Sign Up"**

**Step 7.2:** Click **"Continue with GitHub"** → authorize Vercel to access GitHub

**Step 7.3:** Click **"Add New Project"** (top right)

**Step 7.4:** You will see your `ayojan-house` repository listed → click **"Import"**

**Step 7.5:** On the settings screen:
- Framework Preset: leave as **"Other"**
- Root Directory: leave as `./`
- Build Command: leave **empty**
- Output Directory: leave **empty**

**Step 7.6:** Click the big blue **"Deploy"** button

**Step 7.7:** Wait about 60 seconds while it deploys...

**Step 7.8:** 🎉 Your website is LIVE! Vercel will show you a URL like:
```
https://ayojan-house.vercel.app
```

Click it — your full website is now live on the internet!

---

## 🔄 STEP 8 — How to Update the Website Later

Every time you change a file and want to update the live website:

**Step 8.1:** Go to your GitHub repository: `github.com/YOUR-USERNAME/ayojan-house`

**Step 8.2:** Click on the file you want to update (e.g. `index.html`)

**Step 8.3:** Click the **pencil icon** ✏️ (Edit this file)

**Step 8.4:** Make your changes directly in the browser editor

**Step 8.5:** Scroll down → click **"Commit changes"** → **"Commit changes"** again

**Step 8.6:** Vercel automatically detects the change and re-deploys in ~30 seconds!

### To upload new photos:
1. Go to your GitHub repository
2. Click the `images` folder
3. Click **"Add file"** → **"Upload files"**
4. Drag your new photos in → **"Commit changes"**

---

## 🌍 STEP 9 — Connecting Your `.in` Domain (When You Buy It)

When you buy `ayojanhouse.in` from a registrar like GoDaddy, Hostinger, or BigRock:

**Step 9.1:** In Vercel dashboard → click your project → **"Settings"** → **"Domains"**

**Step 9.2:** Type `ayojanhouse.in` → click **"Add"**

**Step 9.3:** Vercel will show you two DNS records to add. Copy them.

**Step 9.4:** Go to your domain registrar (GoDaddy/Hostinger) → **DNS Settings**

**Step 9.5:** Add the two records Vercel gave you:
- Type: `A` — Name: `@` — Value: `76.76.21.21`
- Type: `CNAME` — Name: `www` — Value: `cname.vercel-dns.com`

**Step 9.6:** Wait 10–30 minutes → your domain is live!

**Step 9.7:** Update these in all 4 HTML files (find-replace `ayojanhouse.in`):
```html
<link rel="canonical" href="https://ayojanhouse.in/" />
```

**Step 9.8:** Update `sitemap.xml` — it already has `https://ayojanhouse.in/` ✅

---

## 📊 STEP 10 — Google Search Console (Get Found on Google)

**Step 10.1:** Go to https://search.google.com/search-console

**Step 10.2:** Click **"Add property"** → enter `https://ayojanhouse.in`

**Step 10.3:** Choose **"HTML tag"** verification method

**Step 10.4:** Copy the meta tag it gives you (looks like):
```html
<meta name="google-site-verification" content="XXXXXXXXXXXXXXX" />
```

**Step 10.5:** Open `index.html` in GitHub editor → paste it inside `<head>` → commit

**Step 10.6:** Back in Search Console → click **"Verify"**

**Step 10.7:** After verification → click **"Sitemaps"** in left menu

**Step 10.8:** Type `sitemap.xml` → click **"Submit"**

Google will now index your website within 1–2 weeks!

---

## ✅ Final Checklist Before Going Live

- [ ] All photos added to `images/` folder
- [ ] All videos added to `videos/` folder  
- [ ] Hero image placeholder replaced with real photo
- [ ] About section placeholders replaced
- [ ] Service section placeholders replaced
- [ ] Gallery photo `data-src` attributes filled
- [ ] Gallery video `data-src` attributes filled
- [ ] Formspree ID added in `contact.js`
- [ ] Social media links in footer updated (Facebook, Instagram URLs)
- [ ] Email address updated if different from hello@ayojanhouse.in
- [ ] `og-cover.jpg` added to `images/` (1200×630px, your best event photo)
- [ ] Website tested on phone browser
- [ ] Website tested on Chrome desktop

---

## 🆘 If Something Goes Wrong

**Page looks broken / CSS not loading:**
- Make sure all file paths are correct (lowercase, no spaces)
- Check that `styles/global.css` exists in your repository

**Form not sending emails:**
- Double-check your Formspree ID in `contact.js`
- Make sure you verified your email on Formspree

**Images not showing:**
- Check image filename matches exactly what's in the HTML
- Filenames are case-sensitive: `Wedding.jpg` ≠ `wedding.jpg`

**Website not updating after changes:**
- Wait 60 seconds after committing to GitHub
- Hard refresh the page: `Ctrl+Shift+R`

**Need more help:**
- Call: +91 82108 56330
- Or open a GitHub Issue on your repository

---

## 📱 Testing Checklist

Test your website on these before sharing:

| Device | Browser | How to Test |
|--------|---------|-------------|
| Phone (Android) | Chrome | Open on your phone |
| Phone (iPhone) | Safari | Open on iPhone if possible |
| Laptop | Chrome | Regular browser |
| Laptop | Firefox | Download Firefox free |
| Tablet | Any | Or use Chrome DevTools: press F12 → click phone icon |

---

*Guide prepared for Ayojan House, Danapur, Patna, Bihar 800012*  
*Website: https://ayojanhouse.in · Phone: +91 82108 56330*
