# Languages
POファイルを元にJSONファイルを作成する
```
$ yarn po2json languages/ccl-plugin-{locale}.po languages/ccl-plugin-{locale}-custom-card-link.
# 例）
$ yarn po2json languages/ccl-plugin-ja.po languages/ccl-plugin-ja-custom-card-link.json
```
https://capitalp.jp/2018/12/06/javascript-i18n/

または、以下
```
$ cd languages
$ wp i18n make-json ccl-plugin-{locale}.po --no-purge
# 例）
$ wp i18n make-json ccl-plugin-ja.po --no-purge
```
https://developer.wordpress.org/block-editor/how-to-guides/internationalization/