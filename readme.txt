=== Custom Card Link – OGP Blog Card Block ===
Contributors:      takao502
Tags:              blogcard, linkcard, link preview, gutenberg, ogp
Tested up to:      7.0
Stable tag:        1.1.4
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 6.9
Requires PHP:      8.0

Create customizable OGP blog cards for internal and external URLs with a Gutenberg block, layouts, spacing, shadows, and hover effects.

== Description ==

Custom Card Link is a Gutenberg block for creating customizable blog cards and link previews from internal or external URLs.

For internal links, the plugin uses the WordPress post title, excerpt, and featured image. For external links, it retrieves metadata such as the title, description, and image from OGP (Open Graph Protocol) tags.

= Features =

* Create blog cards for internal and external links
* Retrieve OGP titles, descriptions, and images for external URLs
* Use WordPress post data for internal URLs
* Choose between card and list layouts
* Adjust margins and spacing around the link
* Add shadows to cards and lists
* Configure movement and animation on hover
* Cache external OGP metadata and refresh it asynchronously
* Display responsive card images

Customizable link cards can make related content and external resources easier to identify and navigate.

== Installation ==

1. Install Custom Card Link through the WordPress plugin screen, or upload the plugin files to the `/wp-content/plugins/custom-card-link` directory.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Add the 'Custom Card Link' block in the block editor and enter an internal or external URL.
4. Configure the layout and design from the block settings and the Custom Card Link settings screen.

== Frequently Asked Questions ==

= Is this plugin free? =

Yes. Custom Card Link is free, open-source software licensed under the GPL.

= Does it support both internal and external links? =

Yes. Internal links use data from the corresponding WordPress post. External links use metadata retrieved from the linked page, including OGP metadata when available.

= Is external OGP metadata cached? =

Yes. Retrieved metadata is cached and refreshed asynchronously to avoid fetching the external page during normal front-end rendering.

= How can I report a bug? =

Please send a message through this [form](https://hepere.com/inquiry/).

== Screenshots ==

1. The settings screen for adjusting the design of link cards.

== Changelog ==

= 1.1.3 =

* Improved OGP fetching with asynchronous cache refresh.
* Improved responsive card image output.
* Reduced unused dependencies in the administration screen.
* Improved reliability when external metadata retrieval fails.

= 1.0.0 =

* Initial release.
