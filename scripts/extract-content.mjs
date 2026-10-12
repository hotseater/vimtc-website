#!/usr/bin/env node
/**
 * One-off content extraction from the WordPress database dump.
 *
 *   node scripts/extract-content.mjs <path-to-w13160.sql>
 *
 * Writes:
 *   content/pages.json        – page metadata (slug, title, intro, banner image, parent, modified)
 *   content/pages/<slug>.html – cleaned page body HTML
 *   content/widgets.json      – the home-page / footer custom-HTML widgets
 *   content/menus.json        – main + footer menus
 *
 * The dump is parsed with a small tokenizer for `INSERT INTO ... VALUES (...)` statements;
 * nothing in it is executed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dumpPath = process.argv[2];
if (!dumpPath) {
  console.error("usage: node scripts/extract-content.mjs <w13160.sql>");
  process.exit(1);
}
const sql = readFileSync(dumpPath, "utf8");
const P = "victoryinternationalon_";

// ---------- SQL parsing ----------
function parseValues(s, i) {
  const rows = [];
  const n = s.length;
  const ws = (c) => c === " " || c === "\n" || c === "\r" || c === "\t";
  while (i < n) {
    while (i < n && ws(s[i])) i++;
    if (i >= n || s[i] !== "(") break;
    i++;
    const row = [];
    for (;;) {
      while (ws(s[i])) i++;
      if (s[i] === "'") {
        i++;
        let buf = "";
        for (;;) {
          const c = s[i];
          if (c === "\\") {
            const nx = s[i + 1];
            buf += { n: "\n", r: "\r", t: "\t", "0": "\0", "\\": "\\", "'": "'", '"': '"', Z: "\x1a" }[nx] ?? nx;
            i += 2;
          } else if (c === "'") {
            if (s[i + 1] === "'") { buf += "'"; i += 2; } else { i++; break; }
          } else { buf += c; i++; }
        }
        row.push(buf);
      } else {
        let j = i;
        while (s[j] !== "," && s[j] !== ")") j++;
        const tok = s.slice(i, j).trim();
        i = j;
        row.push(tok === "NULL" ? null : tok);
      }
      while (ws(s[i])) i++;
      if (s[i] === ",") { i++; continue; }
      if (s[i] === ")") { i++; break; }
    }
    rows.push(row);
    while (i < n && ws(s[i])) i++;
    if (i < n && s[i] === ",") { i++; continue; }
    if (i < n && s[i] === ";") { i++; break; }
  }
  return rows;
}
const tables = {};
const re = /^INSERT INTO `([^`]+)` \(([^)]*)\) VALUES/gm;
let m;
while ((m = re.exec(sql))) {
  const cols = m[2].split(",").map((c) => c.trim().replace(/`/g, ""));
  const rows = parseValues(sql, m.index + m[0].length);
  const t = (tables[m[1]] ??= []);
  for (const r of rows) t.push(Object.fromEntries(cols.map((c, k) => [c, r[k]])));
}

const posts = Object.fromEntries(tables[`${P}posts`].map((p) => [p.ID, p]));
const meta = {};
for (const r of tables[`${P}postmeta`]) (meta[r.post_id] ??= {})[r.meta_key] = r.meta_value;
const options = Object.fromEntries(tables[`${P}options`].map((o) => [o.option_name, o.option_value]));

// ---------- helpers ----------
const SITE = "https://www.vimtc.org";
const THEME = `${SITE}/wp-content/themes/victoryinternationalon794`;

function attachmentUrl(id) {
  const f = meta[id]?._wp_attached_file;
  return f ? `/images/uploads/${f}` : null;
}

/** Rewrite WordPress-era URLs/shortcodes to the new site's paths. */
function rewriteUrls(html) {
  return html
    .replace(/\[contenturl type=['"]?templateurl['"]?\]\/images/g, "/images/theme")
    .replace(new RegExp(`${THEME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/images`, "g"), "/images/theme")
    .replace(new RegExp(`${THEME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/forms/custom/applyNowForm`, "g"), "/apply")
    .replace(new RegExp(`${SITE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/wp-content/uploads/`, "g"), "/images/uploads/")
    .replace(new RegExp(`${SITE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`, "g"), "/")
    .replace(/\/images\/theme\/Rev\. Dr\. Charles Carboo \(Chairman VIM GLOBAL\)\.png/g, "/images/theme/rev-dr-charles-carboo.png")
    // Proweaver left many links relative ("href=\"ministry-training-college-contact-us\"") – make them absolute paths
    .replace(/href="(?!https?:|\/|#|mailto:|tel:)([^"]+)"/g, 'href="/$1"')
    // the old "View More / Certificate / Diploma" widgets link to bare child slugs
    .replace(/href="\/certificate-in-discipleship"/g, 'href="/ministry-training-college-programs/certificate-in-discipleship"')
    .replace(/href="\/diploma-in-biblical-studies"/g, 'href="/ministry-training-college-programs/diploma-in-biblical-studies"')
    // WP-generated thumbnail → original
    .replace(/(\/images\/uploads\/[^"']+?)-\d+x\d+(\.(?:jpe?g|png|webp|gif))/g, "$1$2");
}

/** Strip Gutenberg comments, editor cruft and empty paragraphs; expand galleries. */
function cleanHtml(html) {
  let out = html
    .replace(/<!--\s*\/?wp:[^>]*-->/g, "")
    .replace(/<p>(?:&nbsp;|\s)*<\/p>/g, "")
    .replace(/<a href="\/wp-admin[^"]*"[^>]*>[\s\S]*?<\/a>/g, "")
    .replace(/\[modula id="(\d+)"\]/g, (_, id) => {
      const images = meta[id]?.["modula-images"] ?? "";
      // serialized PHP: s:2:"id";s:3:"250";  s:3:"alt";s:14:"VIMTC Brochure";
      const ids = [...images.matchAll(/s:2:"id";s:\d+:"(\d+)"/g)].map((x) => x[1]);
      const alts = [...images.matchAll(/s:3:"alt";s:\d+:"([^"]*)"/g)].map((x) => x[1]);
      const titles = [...images.matchAll(/s:5:"title";s:\d+:"([^"]*)"/g)].map((x) => x[1]);
      return ids
        .map((aid, k) => {
          const src = attachmentUrl(aid);
          const alt = alts[k] || titles[k] || "";
          return src ? `<figure class="gallery-image"><img src="${src}" alt="${alt}" loading="lazy"></figure>` : "";
        })
        .join("\n");
    })
    // Proweaver's bottom-form shortcodes become placeholders the page components swap for React forms
    .replace(/\[form src="applicationForm" type="template"\]/g, "<!--FORM:contact-->")
    .replace(/\[form src="appointmentForm" type="template"\]/g, "<!--FORM:appointment-->")
    .replace(/\[pof src="donate"\]/g, "<!--FORM:donate-->")
    .replace(/\[soon[^\]]*\]/g, "");
  out = rewriteUrls(out);
  // drop editor comments (but keep our FORM placeholders)
  out = out.replace(/<!--(?!FORM:)[\s\S]*?-->/g, "");
  out = autop(out);
  return out.trim() + "\n";
}


/** A close port of WordPress' wpautop(): wrap loose text in <p>, turn single newlines into <br>. */
const BLOCKS = "(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)";
function autop(html) {
  let s = html.replace(/\r\n|\r/g, "\n");
  s = s.replace(new RegExp(`(<${BLOCKS}\\b[^>]*>)`, "gi"), "\n\n$1");
  s = s.replace(new RegExp(`(</${BLOCKS}\\s*>)`, "gi"), "$1\n\n");
  s = s.replace(/(<!--FORM:[a-z]+-->)/g, "\n\n$1\n\n");
  s = s.replace(/\n\n+/g, "\n\n");
  const chunks = s.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean);
  const isBlock = new RegExp(`^<(?:/?${BLOCKS}\\b|!--)`, "i");
  s = chunks.map((c) => (isBlock.test(c) || /^<\//.test(c) ? c : `<p>${c}</p>`)).join("\n");
  // wpautop keeps <p> only around inline content; unwrap paragraphs that wrap block tags
  s = s.replace(new RegExp(`<p>\\s*(</?${BLOCKS}\\b[^>]*>)`, "gi"), "$1");
  s = s.replace(new RegExp(`(</?${BLOCKS}\\b[^>]*>)\\s*</p>`, "gi"), "$1");
  // single newlines inside paragraphs → <br>
  s = s.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => `<p>${inner.trim().replace(/\s*\n\s*/g, "<br>\n")}</p>`);
  s = s.replace(/<p>\s*<\/p>/g, "");
  // WordPress leaves a <p> unclosed when loose text is followed directly by a closing block tag; close it.
  s = s.replace(/(<p>(?:(?!<\/p>|<p>)[\s\S])*?)(\n<\/(?:section|div|ul|ol|li|figure|aside)>)/g, "$1</p>$2");
  return s;
}

/** plugins.js wrapped the college name and phone numbers in <mark> on the client; do it at build time instead. */
function highlight(html) {
  return html
    .replace(/(?![^<]*>)Victory International Ministry Training College/g, '<mark class="comp">$&</mark>')
    .replace(/(?![^<]*>)(\+?1[\s.-])?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/g, '<mark class="main_phone">$&</mark>');
}

// ---------- pages ----------
const pages = Object.values(posts)
  .filter((p) => p.post_type === "page" && p.post_status === "publish")
  .map((p) => {
    const parent = p.post_parent !== "0" ? posts[p.post_parent]?.post_name ?? null : null;
    const path = parent ? `/${parent}/${p.post_name}` : p.post_name === "home" ? "/" : `/${p.post_name}`;
    const html = highlight(cleanHtml(p.post_content));
    const slug = p.post_name;
    writeFileSync(resolve(root, "content/pages", `${slug}.html`), html);
    return {
      id: Number(p.ID),
      slug,
      path,
      parent,
      title: p.post_title.replace(/\u2013/g, "–"),
      intro: meta[p.ID]?.["Page Intro"] ?? null,
      banner: meta[p.ID]?._thumbnail_id ? attachmentUrl(meta[p.ID]._thumbnail_id) : null,
      bannerAlt: meta[p.ID]?._thumbnail_id ? meta[meta[p.ID]._thumbnail_id]?._wp_attachment_image_alt ?? "" : "",
      order: Number(p.menu_order),
      modified: p.post_modified_gmt,
      wordpressTemplate: meta[p.ID]?._wp_page_template ?? "default",
      contentFile: `content/pages/${slug}.html`,
    };
  })
  .sort((a, b) => a.id - b.id);
writeFileSync(resolve(root, "content/pages.json"), JSON.stringify(pages, null, 2) + "\n");

// ---------- widgets (custom HTML) ----------
const widgetsRaw = options.widget_custom_html;
const widgets = {};
for (const w of widgetsRaw.matchAll(/i:(\d+);a:2:\{s:5:"title";s:\d+:"[^"]*";s:7:"content";s:(\d+):"/g)) {
  const start = w.index + w[0].length;
  const content = widgetsRaw.slice(start, start + Number(w[2]));
  widgets[w[1]] = highlight(rewriteUrls(content));
}
// sidebars_widgets maps areas → custom_html-N
const areas = {};
for (const a of options.sidebars_widgets.matchAll(/s:\d+:"([a-z0-9_]+)";a:1:\{i:0;s:\d+:"custom_html-(\d+)";\}/g)) areas[a[1]] = widgets[a[2]];
writeFileSync(resolve(root, "content/widgets.json"), JSON.stringify(areas, null, 2) + "\n");

// ---------- menus ----------
const termRel = {};
for (const r of tables[`${P}term_relationships`]) (termRel[r.term_taxonomy_id] ??= []).push(r.object_id);
function menu(ttid) {
  return (termRel[ttid] ?? [])
    .map((id) => posts[id])
    .filter((p) => p && p.post_status === "publish")
    .sort((a, b) => Number(a.menu_order) - Number(b.menu_order))
    .map((p) => {
      const mm = meta[p.ID] ?? {};
      const target = posts[mm._menu_item_object_id];
      const label = (t) => ({ label: t.replace(/<\/?q>/g, "").replace(/\s+/g, " ").trim(), labelHtml: t.trim() });
      if (mm._menu_item_type === "custom") return { ...label(p.post_title), href: mm._menu_item_url, external: true };
      if (!target || target.post_status !== "publish") return null; // WordPress hides items whose page is trashed
      const pg = pages.find((x) => x.id === Number(target.ID));
      return { ...label(p.post_title || target.post_title), href: pg?.path ?? `/${target.post_name}`, external: false };
    })
    .filter(Boolean);
}
writeFileSync(resolve(root, "content/menus.json"), JSON.stringify({ main: menu("2"), footer: menu("3") }, null, 2) + "\n");

console.log(`pages: ${pages.length}, widgets: ${Object.keys(areas).length}, main menu: ${menu("2").length}, footer menu: ${menu("3").length}`);
