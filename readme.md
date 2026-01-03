# Haegeum Website

Professional website for Haegeum - A quality-focused engineering studio built for speed, accountability, and maintainability.

## Project Structure

```
website/
├── index.html          # Homepage
├── services.html       # Services page
├── about.html          # About page
├── contact.html        # Contact page with form
├── styles.css          # Main stylesheet (dark theme with gold accents)
├── script.js           # JavaScript for navigation, forms, and interactions
├── HaegeumLogo.webp    # Company logo
└── readme.md           # This file
```

## Features

- **Dark Theme**: Modern dark theme with gold accent colors matching the brand
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Accessibility**: WCAG-compliant with skip links, ARIA labels, and keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Form Validation**: Client-side validation with honeypot spam protection
- **Interactive Elements**: Tab navigation, smooth scrolling, and micro-interactions

## Local Development

1. Open any HTML file in a web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

## Deployment

The website is automatically deployed to Cloudflare Pages when code is pushed to the main branch.

### Deployment Process

1. **Stage changes:**
   ```bash
   git add -A
   ```

2. **Commit changes:**
   ```bash
   git commit -m "Your descriptive commit message"
   ```

3. **Push to repository:**
   ```bash
   git push -u origin main
   ```

4. **Automatic Build**: Cloudflare Pages will automatically build and deploy the site

5. **Preview**: Once deployed, the site will be available at:
   - **Production**: https://www.haegeum.in/

## Design System

### Color Palette
- **Background**: `#07080A` (dark)
- **Surface**: `#0D0F14`, `#121621` (elevated surfaces)
- **Text**: `#F4F6FA` (primary), `#A8AFBA` (muted)
- **Accent**: `#FCD34D` (gold - matches logo)
- **Accent Hover**: `#FBBF24`

### Typography
- Clean, modern sans-serif fonts
- Consistent heading hierarchy
- Optimized line heights for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All pages use consistent navigation and footer
- Contact form includes privacy checkbox and honeypot field
- All CTAs use consistent "Book a free 20-minute call" messaging
- Logo is optimized WebP format for performance
