# Livestream Master: Trận Chiến Chốt Đơn

Premium Vite + React + TypeScript website for the `Livestream Master` e-commerce game project. The site includes a runtime SEO blog system powered by Google Sheets, Make.com AI automation, Gemini, and a Google Apps Script JSONP API.

The important architecture decision: GitHub hosts only the website source code. Blog posts are stored in Google Sheets and fetched at runtime, so Netlify does not need to rebuild every time Make.com creates a new post.

## 1. Run Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Type-check:

```bash
npm run lint
```

## 2. Deploy On Netlify

Push this source code to GitHub, then create a Netlify site from that repository.

Use these Netlify build settings:

```text
Build command: npm run build
Publish directory: dist
```

Netlify should rebuild only when website source code changes. Blog post updates do not require a Netlify rebuild because the website fetches posts from Google Apps Script at runtime.

## 3. Configure `VITE_BLOG_API_URL`

Create `.env` locally:

```bash
cp .env.example .env
```

Set:

```text
VITE_BLOG_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

On Netlify, add the same value in:

```text
Site configuration -> Environment variables
```

If `VITE_BLOG_API_URL` is missing or the API fails, the website uses fallback demo posts from `src/data/fallbackPosts.ts`.

## 4. Deploy Google Apps Script

1. Open the Google Sheet that contains the `Blog_Storage` tab.
2. Go to `Extensions -> Apps Script`.
3. Paste the contents of `google-apps-script.gs`.
4. If the script is bound to the spreadsheet, leave:

```js
SPREADSHEET_ID: ''
```

If it is a standalone script, set the spreadsheet ID:

```js
SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID'
```

5. Deploy:

```text
Deploy -> New deployment -> Web app
Execute as: Me
Who has access: Anyone
```

6. Copy the `/exec` URL into `VITE_BLOG_API_URL`.

Test list endpoint:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=getBlogPosts
```

Test one post:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=getBlogPost&slug=your-slug
```

The frontend uses JSONP:

```text
{API_URL}?action=getBlogPosts&callback=callbackName
{API_URL}?action=getBlogPost&slug=abc&callback=callbackName
```

## 5. Make.com Automation Flow

Recommended scenario:

```text
Google Sheets - Watch Rows on Blog_Idea
-> Filter status is blank, READY, or ERROR_RETRY
-> Google Sheets - Update Row: PROCESSING
-> Gemini - Generate strict SEO blog JSON
-> JSON - Parse JSON
-> Optional Gemini Image - Generate 16:9 cover
-> Upload cover to Google Drive public folder or use fallback URL
-> Google Sheets - Add Row to Blog_Storage
-> Google Sheets - Update Blog_Idea row: DONE
-> Error handler updates Blog_Idea row: ERROR
```

Make does not need GitHub modules and does not need to update files in this repo for every blog post.

### Gemini Text Prompt Output

Gemini should return strict JSON only, no Markdown fences:

```json
{
  "title": "Tên bài SEO",
  "slug": "ten-bai-seo",
  "summary": "Mô tả ngắn",
  "tags": ["livestream", "ecommerce", "game"],
  "seo_title": "SEO title",
  "seo_description": "SEO description",
  "content_json": {
    "intro": "Mở bài",
    "sections": [
      {
        "heading": "Tiêu đề mục",
        "body": "Nội dung đoạn",
        "bullets": ["Ý 1", "Ý 2"]
      }
    ],
    "conclusion": "Kết luận",
    "cta": {
      "label": "Xem thêm",
      "href": "/leaderboard"
    }
  },
  "content_plain": "Bản text dự phòng",
  "image_prompt": "English image generation prompt"
}
```

## 6. Google Sheet Column Requirements

### `Blog_Idea`

```text
idea_id
status
topic
main_keyword
secondary_keywords
category
target_audience
tone
game_phase
content_angle
cta
internal_link
reference_notes
language
word_count
publish_date
created_at
processed_at
error_message
```

### `Blog_Storage`

```text
post_id
source_idea_id
status
title
slug
summary
category
tags
cover
author
language
seo_title
seo_description
content_json
content_plain
published_at
published_url
github_path
netlify_deploy_status
created_at
updated_at
error_message
image_prompt
```

Valid public statuses:

```text
PUBLISHED
READY
DONE
```

Notes:

- `tags` can be comma-separated text or a JSON array string.
- `content_json` can be empty, invalid, or a JSON string. The frontend safely falls back to `content_plain`.
- `cover` should be a public image URL. If empty, the website uses `/content/blog/covers/default-cover.svg`.
- `published_url` should be `/blog/{slug}`.
- `netlify_deploy_status` can be `NOT_REQUIRED_DYNAMIC_API`.

## Routes

```text
/             Landing page
/blog         Blog list
/blog/:slug   Blog detail
/leaderboard  Leaderboard module
/warehouse    Warehouse QR module
/orders       Orders module
/shipping     Shipping module
/rewards      Rewards module
```
