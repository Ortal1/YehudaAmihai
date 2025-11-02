# הוצאה ל-Netlify

## שלבי ההוצאה:

### 1. הכנה
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. דחיפה ל-GitHub (אם לא עשית כבר)
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 3. חיבור ל-Netlify

דרך 1 - דרך האתר:
1. היכנס ל-https://app.netlify.com
2. לחץ על "Add new site" → "Import an existing project"
3. בחר "GitHub" וחבר את האקאונט שלך
4. בחר את ה-repository הזה
5. בשלבי ההגדרה:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. לחץ "Deploy site"

דרך 2 - דרך CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 4. הגדרת משתנים סביבה

ב-Netlify Dashboard:
1. Site settings → Build & deploy → Environment
2. הוסף משתנים חדשים:
   - `VITE_SUPABASE_URL`: [ערך מ-.env]
   - `VITE_SUPABASE_ANON_KEY`: [ערך מ-.env]

## מידע חשוב

- אין צורך בהגדרה נוספת כי netlify.toml כבר מוכן
- ה-site בנוי עם Vite - בנייה מהירה מאוד
- ה-domain שלך יהיה משהו כמו: `[project-name].netlify.app`

## בעיות נפוצות

**בעיה**: "Cannot find module '@supabase/supabase-js'"
- **פתרון**: וודא שה-env vars הוגדרו נכון ב-Netlify

**בעיה**: שערך היום לא מתעדכן כל יום
- זה תכון - השיר משתנה כל יום ברשת באופן אוטומטי

**בעיה**: הכפתורים לא עובדים
- וודא שה-JavaScript מופעל בדפדפן
