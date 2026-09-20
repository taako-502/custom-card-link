# Custom Card Link
![banner-1554×500](https://user-images.githubusercontent.com/36348377/176486911-0cd95ade-2fdc-4993-be23-15329d8f18ae.jpg)

## 概要
デザインを簡単にカスタマイズできることを目標としたカード型リンクです。<br>
内部リンクにも外部リンクにも使用できます。

マウスホバー時の動作も編集することができます。

## 埋め込みブロックからの変換

1. URLを入力済みの標準「埋め込み」ブロックを選択する。
2. ブロックツールバーのブロックアイコンをクリックして、変換メニューを開く。
3. 「Custom Card Link」を選択する。

URLを引き継いでカード型リンクに変換する。YouTubeなどの標準埋め込みバリエーションも対象。
キャプションがある場合は、カード直後の段落として書式付きで残す。
URLが未入力の埋め込みブロックには変換候補を表示しない。

## リンク
公式プラグインに登録しています。<br>
[Custom Card Link](https://wordpress.org/plugins/custom-card-link/)

## リポジトリ
### GitHub
https://github.com/taako-502/custom-card-link

## ローカルでの動作確認

`.wp-env.json`では、WordPress 7.1とPHP 8.0を使用する。

初回、または`.wp-env.json`のWordPressバージョンを変更した後は、環境を作り直して起動する。

```bash
yarn install --immutable
yarn wp-env:clean
yarn wp-env:start
```

WordPressのバージョンとプラグインの有効化状態を確認する。

```bash
yarn wp-env run cli wp core version
yarn wp-env run cli wp plugin is-active custom-card-link
```

WordPressのバージョンとして`7.1`が表示され、プラグイン確認コマンドが終了コード`0`で完了すること。

コミットする前に以下を実施すること。

```bash
yarn build
yarn lint
yarn test:js --runInBand
composer install
yarn wp-env run cli --env-cwd=wp-content/plugins/custom-card-link composer check:php
```

`ccl-plugin.pot`を更新する。

`composer check:php`では、PHPの構文チェックとWordPress向けPHPStanによる静的解析を実行する。

## Deploy（SVNへのコミット）
1. GitHub Actionsの「Deploy WordPress Plugin」で`main`を選択し、「Run workflow」を開く。
2. リリースするバージョンを先頭`v`なしの`X.Y.Z`形式で入力して実行する。

ワークフローは`package.json`と`custom-card-link.php`のバージョン更新、lint・テスト・build、リリースコミットの`main`へのpush、WordPress.orgへのデプロイを順に行う。デプロイ成功後に`vX.Y.Z`タグとGitHub Releaseを作成する。
再実行時は同じコミットを指す既存タグと既存GitHub Releaseを再利用する。タグが別のコミットを指す場合は、タグを変更せずエラー終了する。

## Third-party resources
### Get_OGP_InWP
License: Apache v2
Source : https://github.com/ddryo/Get_OGP_InWP
