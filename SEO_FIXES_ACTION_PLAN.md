# SEO Indexing Issues - Action Plan

Based on your Google Search Console report, here's what needs to be fixed:

## ✅ **COMPLETED FIXES**

### 1. **Added Canonical URLs** (Fixes: "Duplicate without user-selected canonical - 47 pages")
- ✅ Added canonical URL to root layout (`src/app/layout.tsx`)
- This will help Google identify the preferred version of pages

## 🔧 **IMMEDIATE ACTIONS NEEDED**

### 2. **Fix 404 Errors (22 pages)**
**Action Required:** In Google Search Console:
1. Click on "Not found (404)" issue
2. Review the list of URLs
3. For each important page:
   - **Option A:** If page should exist → Restore it or create it
   - **Option B:** If page is permanently moved → Add redirect to `next.config.ts`
   - **Option C:** If page should be removed → No action needed (Google will eventually stop trying)

**Example:** If you see old URLs like `/Contact/SendInquiry.aspx`, these should already redirect via `next.config.ts`. If not, add them.

### 3. **Verify Redirects (63 pages)**
**Action Required:** These are likely your intentional redirects from `next.config.ts`.
1. Click on "Page with redirect" in Search Console
2. Verify each URL is redirecting correctly:
   - Should be **301 (permanent)** redirects ✅
   - Should point to valid, indexable pages
3. If any redirect leads to a 404 or wrong page → Fix the redirect in `next.config.ts`

**Current Redirects in `next.config.ts`:**
- `/Maintenance` → `/services/handyman` ✅
- `/Plumbing` → `/services/plumbing` ✅
- `/Contact/SendInquiry.aspx` → `/contact` ✅

### 4. **Investigate Server Error (1 page)**
**Action Required:** This is critical!
1. Click on "Server error (5xx)" in Search Console
2. Note the exact URL that's failing
3. Check your server logs or Vercel logs for errors
4. Test the URL manually in a browser
5. Common causes:
   - API route error
   - Database connection issue
   - Missing environment variable
   - Timeout issue
6. Fix the underlying issue and redeploy

### 5. **Improve "Crawled - currently not indexed" (14 pages)**
**Action Required:** These pages were crawled but Google chose not to index them.
1. Click on the issue in Search Console to see the URLs
2. For each page:
   - **Check content quality:** Is it thin, duplicate, or low-value?
   - **Improve content:** Add more unique, valuable content
   - **Remove duplicate content:** Ensure each page is unique
   - **Check for noindex tags:** Make sure there's no `noindex` meta tag
   - **Improve internal linking:** Add more relevant internal links
   - **Ensure page is in sitemap:** Check `public/sitemap.xml`

### 6. **Monitor "Discovered - currently not indexed" (1 page)**
**Action Required:** Less critical, but worth checking.
1. View the URL in Search Console
2. If it's an important page:
   - Ensure it's in your sitemap
   - Add internal links to it
   - Request indexing (if available)
3. If it's not important, no action needed

## 📋 **ADDITIONAL RECOMMENDATIONS**

### Add Individual Canonical URLs
For better duplicate handling, consider adding page-specific canonical URLs. However, since most pages are client components, this requires either:
- Converting to server components where possible, OR
- Using a head component that injects canonical tags

### Monitor Progress
1. After making fixes, use Google Search Console's "Validate fix" feature
2. Request re-indexing for important pages (in URL Inspection tool)
3. Monitor the report weekly to see improvements

### Best Practices Going Forward
1. **Always use 301 redirects** for permanent moves (already doing ✅)
2. **Add canonical URLs** to all pages (root layout done ✅)
3. **Monitor 404s** regularly and fix them promptly
4. **Test new pages** before deploying to ensure no errors
5. **Keep sitemap updated** (already automated with `next-sitemap` ✅)

## 🎯 **PRIORITY ORDER**

1. **HIGH PRIORITY:** Fix server error (5xx) - 1 page
2. **HIGH PRIORITY:** Fix 404 errors - 22 pages  
3. **MEDIUM PRIORITY:** Verify redirects are correct - 63 pages
4. **MEDIUM PRIORITY:** Improve crawled but not indexed pages - 14 pages
5. **LOW PRIORITY:** Monitor discovered but not indexed - 1 page
6. **ONGOING:** Canonical URLs already added ✅

## 📝 **NEXT STEPS**

1. **Immediate:** Check Google Search Console for the specific URLs causing issues
2. **This Week:** Fix the server error and critical 404s
3. **This Month:** Improve content quality on "crawled but not indexed" pages
4. **Ongoing:** Monitor Google Search Console weekly

---

**Note:** The canonical URL fix has been applied to your root layout. This should help resolve the 47 duplicate pages issue over time as Google re-crawls your site.

