const CONFIG = {
  SPREADSHEET_ID: '',
  BLOG_STORAGE_SHEET: 'Blog_Storage',
};

const PUBLIC_STATUSES = ['PUBLISHED', 'READY', 'DONE'];

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const callback = params.callback;
  const action = String(params.action || 'getBlogPosts');

  try {
    let data;

    if (action === 'getBlogPosts') {
      data = { ok: true, posts: getBlogPosts_() };
    } else if (action === 'getBlogPost') {
      data = { ok: true, post: getBlogPost_(params.slug) };
    } else {
      data = { ok: false, error: 'Unknown action: ' + action };
    }

    return output_(data, callback);
  } catch (error) {
    return output_({ ok: false, error: error && error.message ? error.message : String(error) }, callback);
  }
}

function getBlogPosts_() {
  const rows = readObjects_();

  return rows
    .map(normalizePost_)
    .filter(function (post) {
      return PUBLIC_STATUSES.indexOf(String(post.status || '').toUpperCase()) !== -1 && post.slug && post.title;
    })
    .sort(function (a, b) {
      return dateValue_(b.published_at || b.created_at) - dateValue_(a.published_at || a.created_at);
    });
}

function getBlogPost_(slug) {
  const normalizedSlug = String(slug || '').trim();

  if (!normalizedSlug) {
    return null;
  }

  const posts = getBlogPosts_();

  for (let i = 0; i < posts.length; i += 1) {
    if (posts[i].slug === normalizedSlug) {
      return posts[i];
    }
  }

  return null;
}

function readObjects_() {
  const spreadsheet = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(CONFIG.BLOG_STORAGE_SHEET);

  if (!sheet) {
    throw new Error('Sheet not found: ' + CONFIG.BLOG_STORAGE_SHEET);
  }

  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return [];
  }

  const headers = values[0].map(function (header) {
    return String(header || '').trim();
  });
  const rows = [];

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const object = {};

    for (let columnIndex = 0; columnIndex < headers.length; columnIndex += 1) {
      const header = headers[columnIndex];
      if (!header) {
        continue;
      }

      const value = row[columnIndex];

      if (object[header] === undefined) {
        object[header] = value;
      } else if (header.toLowerCase() === 'cover' && !object[header] && value) {
        object[header] = value;
      }
    }

    rows.push(object);
  }

  return rows;
}

function normalizePost_(row) {
  const cover = firstNonEmpty_(row.cover, row.Cover);
  const slug = text_(row.slug || row.Slug);

  return {
    post_id: text_(row.post_id || row.id || slug),
    source_idea_id: text_(row.source_idea_id),
    status: text_(row.status || 'PUBLISHED').toUpperCase(),
    title: text_(row.title),
    slug: slug,
    summary: text_(row.summary),
    category: text_(row.category || 'Blog'),
    tags: text_(row.tags),
    cover: cover || '/content/blog/covers/default-cover.svg',
    author: text_(row.author || 'Livestream Master Team'),
    language: text_(row.language || 'vi'),
    seo_title: text_(row.seo_title),
    seo_description: text_(row.seo_description),
    content_json: text_(row.content_json),
    content_plain: text_(row.content_plain),
    published_at: isoDate_(row.published_at),
    published_url: text_(row.published_url || (slug ? '/blog/' + slug : '')),
    github_path: text_(row.github_path),
    netlify_deploy_status: text_(row.netlify_deploy_status),
    created_at: isoDate_(row.created_at),
    updated_at: isoDate_(row.updated_at),
    error_message: text_(row.error_message),
    image_prompt: text_(row.image_prompt),
  };
}

function output_(data, callback) {
  if (callback) {
    return ContentService
      .createTextOutput(String(callback) + '(' + JSON.stringify(data) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function text_(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return isoDate_(value);
  }

  return String(value).trim();
}

function firstNonEmpty_() {
  for (let i = 0; i < arguments.length; i += 1) {
    const value = text_(arguments[i]);
    if (value) {
      return value;
    }
  }

  return '';
}

function isoDate_(value) {
  if (!value) {
    return '';
  }

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }

  return String(value).trim();
}

function dateValue_(value) {
  const date = new Date(value);
  const time = date.getTime();
  return isNaN(time) ? 0 : time;
}
