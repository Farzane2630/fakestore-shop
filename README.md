# Shop App

A single-page e-commerce front end built with vanilla JavaScript, using data from the Fake Store API.

**Live demo:** https://Farzane2630.github.io/shop-app/

## Features

- Product list fetched from the API, with loading and error states
- Search by title, filter by category, sort by price
- Product detail modal (native `<dialog>`)
- Cart with item count and total

## Run locally

No build step. Open `index.html` in a browser, or use VS Code's Live Server.

## Project structure

- `index.html`: semantic layout and markup
- `styles.css`: layout (CSS Grid, Flexbox) and styles
- `script.js`: data fetching, rendering, filtering, modal, and cart
- `config.js`: API URL

## Technical decisions

- **No framework:** the brief asks for vanilla JS, and the app is small enough that a framework would add overhead.
- **Single source of truth:** `allProducts` and `cart` hold state. The DOM is rebuilt from them.
- **`textContent` only:** API data is never inserted as HTML, which avoids XSS.
- **Native `<dialog>`:** provides focus handling and Escape-to-close without custom code.

## If I had more time

- Persist the cart with `localStorage`, storing only ids and quantities
- Add tests for `applyFilters` (pure function, easy to unit test)
- Pagination or a server-side search for larger catalogs

# اپلیکیشن فروشگاه (Shop App)

یک اپلیکیشن فروشگاهی تک‌صفحه‌ای با **Vanilla JavaScript** و داده از **Fake Store API**.

**نسخه‌ی زنده:** https://YOUR_USERNAME.github.io/shop-app/

## امکانات
- دریافت لیست محصولات از API همراه با نمایش وضعیت Loading و پیام خطای قابل‌فهم
- جستجو بر اساس نام، فیلتر بر اساس دسته‌بندی، و مرتب‌سازی بر اساس قیمت
- نمایش جزئیات محصول در مودال (با `<dialog>` بومی مرورگر)
- Skeleton برای تصاویر کارت‌ها و مودال، تا کاربر در زمان بارگذاری جای خالی نبیند
- سبد خرید با شمارش آیتم‌ها و محاسبه‌ی جمع کل
- طراحی واکنش‌گرا با CSS Grid و Flexbox، و استایل Liquid Glass

## اجرا در محیط محلی
به build نیاز ندارد. فایل `index.html` را در مرورگر باز کنید، یا از افزونه‌ی Live Server در VS Code استفاده کنید.

## ساختار پروژه
- `index.html`: ساختار و علامت‌گذاری معنایی
- `styles.css`: چیدمان (CSS Grid و Flexbox) و استایل‌ها
- `script.js`: دریافت داده، رندر، فیلتر، مودال و سبد خرید
- `config.js`: آدرس API

## تصمیم‌های فنی
- **بدون فریم‌ورک:** بریف فقط Vanilla JS خواسته بود، و پروژه آن‌قدر کوچک است که فریم‌ورک فقط پیچیدگی اضافه می‌کرد.
- **یک منبع حقیقت:** وضعیت برنامه در `allProducts` و `cart` نگهداری می‌شود، و DOM از روی همین داده‌ها ساخته می‌شود.
- **فقط `textContent`:** داده‌های API هرگز به‌صورت HTML درج نمی‌شوند، که از XSS جلوگیری می‌کند.
- **`<dialog>` بومی:** مدیریت فوکوس و بستن با کلید Escape را بدون کد اضافه فراهم می‌کند.
- **Event delegation:** یک listener روی لیست محصولات، کلیک همه‌ی کارت‌ها را مدیریت می‌کند.

## اگر وقت بیشتری داشتم
- ذخیره‌ی سبد خرید با `localStorage`، و فقط ذخیره‌ی شناسه و تعداد
- نوشتن تست برای `applyFilters` (تابعی خالص و ساده برای تست واحد)
- صفحه‌بندی یا جستجوی سمت سرور برای کاتالوگ‌های بزرگ‌تر
