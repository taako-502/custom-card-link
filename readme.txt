=== Custom Card Link – OGP Blog Card Block ===
Contributors:      takao502
Tags:              blog card, link card, link preview, ogp, gutenberg
Tested up to:      7.1
Stable tag:        1.1.7
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 6.9
Requires PHP:      8.0

Create customizable blog cards and link previews for internal and external URLs using OGP metadata in the Gutenberg block editor.

== Description ==

Custom Card Link is a Gutenberg block for creating customizable blog cards, link cards, and URL previews in WordPress.

Paste an internal or external URL into the block and display it as a card with a title, description, and image. Internal links use WordPress post data, while external links retrieve metadata such as the title, description, and image from OGP (Open Graph Protocol) tags.

The plugin is designed for site owners who want a blog card or link preview without manually entering metadata for every link.

= Features =

* Create blog cards and link cards for internal and external URLs
* Generate link previews from OGP (Open Graph) metadata for external URLs
* Use WordPress post titles, excerpts, and featured images for internal links
* Choose between card and list layouts
* Adjust margins and spacing around the link card
* Add shadows to cards and lists
* Configure movement and animation on hover
* Cache external OGP metadata and refresh it asynchronously
* Display responsive card images
* Avoid external HTTP requests during normal front-end rendering

= Internal links =

For links to posts on the same WordPress site, Custom Card Link uses the post title, excerpt, and featured image directly from WordPress. This avoids unnecessary OGP requests for internal content.

= External links and OGP =

For external URLs, Custom Card Link retrieves metadata from the linked page and uses OGP data when available. The retrieved metadata is cached and refreshed asynchronously so normal front-end rendering does not need to wait for an external HTTP request.

= Blog card customization =

Use the block and plugin settings to change the card layout, spacing, shadows, hover behavior, and responsive image presentation. You can use the same block for article references, related content, documentation links, and other URL previews.

== Installation ==

1. In the WordPress dashboard, go to Plugins > Add New.
2. Search for "Custom Card Link" and install the plugin, or upload the plugin files to the `/wp-content/plugins/custom-card-link` directory.
3. Activate Custom Card Link.
4. Open the block editor and add the "Custom Card Link" block.
5. Enter an internal or external URL and configure the layout and design from the block settings.

== Frequently Asked Questions ==

= What is a blog card? =

A blog card is a visual link preview that can display information such as the linked page title, description, and image. Custom Card Link provides this as a Gutenberg block.

= Does Custom Card Link support OGP / Open Graph metadata? =

Yes. For external URLs, the plugin can use OGP (Open Graph Protocol) metadata such as the page title, description, and image to build the link preview.

= Does it support both internal and external links? =

Yes. Internal links use data from the corresponding WordPress post. External links use metadata retrieved from the linked page, including OGP metadata when available.

= Does it work with the Gutenberg block editor? =

Yes. Custom Card Link is provided as a Gutenberg block and can be inserted directly from the WordPress block editor.

= Is external OGP metadata cached? =

Yes. Retrieved metadata is cached and refreshed asynchronously to avoid fetching the external page during normal front-end rendering.

= Does the plugin fetch external pages on every front-end request? =

No. External metadata is cached, and refreshes are handled asynchronously. Normal front-end rendering uses cached data instead of making an external HTTP request for every page view.

= Is this plugin free? =

Yes. Custom Card Link is free, open-source software licensed under the GPL.

= How can I report a bug? =

Please send a message through this [form](https://ap-ep.com/inquiry/).

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
