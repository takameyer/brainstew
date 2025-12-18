# Brain Stew Website

Website for Brain Stew, a Green Day tribute band based in Germany. The site is built with Jekyll and supports German and English localization.

## Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _data/                   # Site data files
│   └── navigation.yml       # Navigation menu structure
├── _i18n/                   # Internationalization files
│   ├── de.yml              # German translations
│   └── en.yml              # English translations
├── _layouts/               # HTML templates
│   └── default.html        # Default page layout
├── _site/                  # Generated site (built by Jekyll)
├── assets/                 # Static assets
│   ├── css/               # Stylesheets
│   └── images/            # Image files
├── css/                   # Additional stylesheets
│   └── styles.css         # Main stylesheet
├── img/                   # Favicons and logos
├── js/                    # JavaScript files
│   └── main.js           # Main JavaScript
├── index.html            # Homepage content
├── imprint.html          # Imprint/legal page
└── CNAME                 # Custom domain configuration
```

## Technology Stack

- **Jekyll 4.3.0** - Static site generator
- **jekyll-multiple-languages-plugin** - Multi-language support (German/English)
- **Browser-sync** - Development server with live reload
- **GitHub Actions** - Automated deployment to GitHub Pages

## Prerequisites

- Ruby 3.4.4
- Bundler 2.6.9
- Node.js and npm (for browser-sync)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install Ruby dependencies:
```bash
bundle install
```

3. Install Node.js dependencies:
```bash
npm install
```

## Development

### Quick Start

Use the provided setup script to install dependencies and start the development server:

```bash
./setup.sh
```

This will:
- Install Ruby dependencies via Bundler
- Start Jekyll with live reload on [http://localhost:4000](http://localhost:4000)

### Alternative Development Options

#### Option 1: Jekyll with Live Reload
```bash
bundle exec jekyll serve --livereload
```

#### Option 2: Browser-sync
```bash
npm start
```

This starts a browser-sync server that watches for changes in HTML, CSS, JavaScript, and images.

## Building for Production

Build the static site:

```bash
bundle exec jekyll build
```

The compiled site will be in the `_site` directory.

## Updating Content

### Adding/Editing Translations

1. Edit translation files in `_i18n/`:
   - `de.yml` for German content
   - `en.yml` for English content

2. Use translation keys in templates:
```liquid
{% translate section.key %}
```

### Adding Gigs

Edit [index.html](index.html) in the Gigs section and add new gig items:

```html
<div class="gig-item">
    <div class="gig-info">
        {% assign date = "2025-04-26 19:00:00" | date: site.translations[site.lang].gigs.date_format %}
        <div class="gig-date">{{ date }}</div>
        <div class="gig-venue">Venue Name</div>
        <div class="gig-address">Address</div>
    </div>
</div>
```

### Adding Videos

Add new video items in the Gallery section of [index.html](index.html):

```html
<div class="video-item">
    <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe src="YOUR_VIMEO_URL"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                style="position:absolute;top:0;left:0;width:100%;height:100%;"
                title="performance">
        </iframe>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <div class="video-caption">
        {% translate gallery.video_caption %}
    </div>
</div>
```

### Modifying Styles

Edit [css/styles.css](css/styles.css) to update the site's appearance.

### Updating Navigation

Edit [_data/navigation.yml](_data/navigation.yml) to modify the navigation menu structure.

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

### Manual Deployment

If you need to deploy manually:

1. Build the site:
```bash
bundle exec jekyll build
```

2. The `_site` directory contains the complete static site ready for deployment.

### GitHub Actions Workflow

The deployment workflow ([.github/workflows/jekyll.yml](.github/workflows/jekyll.yml)) runs on every push to `main` and:
1. Sets up Ruby 3.4.4 with Bundler 2.6.9
2. Installs dependencies
3. Builds the Jekyll site
4. Deploys to GitHub Pages

## Configuration

### Jekyll Configuration

Main settings are in [_config.yml](_config.yml):

- `languages: ["de", "en"]` - Supported languages
- `default_lang: "de"` - Default language (German)
- `url: "https://brainstew.de"` - Production URL

### Custom Domain

The site uses a custom domain configured in [CNAME](CNAME).

## Contact Form

The contact form uses [FormSubmit.co](https://formsubmit.co) to handle form submissions. The form sends to the email configured in [index.html:94](index.html#L94).

## Troubleshooting

### Ruby Version Issues

If you encounter Ruby version issues, ensure you're using Ruby 3.4.4. You can use a version manager like rbenv or asdf:

```bash
# With asdf (if .tool-versions is configured)
asdf install
```

### Bundle Install Fails

Try updating Bundler:

```bash
gem install bundler -v 2.6.9
bundle install
```

### Jekyll Won't Start

Clear the cache and try again:

```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

## License

Contact the band for licensing information.

## Support

For booking inquiries or questions, use the contact form on the website or reach out via the configured contact email.
