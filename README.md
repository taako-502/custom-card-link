# Custom Card Link
![banner-1554×500](https://user-images.githubusercontent.com/36348377/176486911-0cd95ade-2fdc-4993-be23-15329d8f18ae.jpg)

## 概要
デザインを簡単にカスタマイズできることを目標としたカード型リンクです。<br>
内部リンクにも外部リンクにも使用できます。

マウスホバー時の動作も編集することができます。

## リンク
公式プラグインに登録しています。<br>
[Custom Card Link](https://wordpress.org/plugins/custom-card-link/)

## リポジトリ
### GitHub
https://github.com/taako-502/custom-card-link

コミットする前に以下を実施すること

以下のコマンドを実行する
```bash
$ yarn build
$ composer install
$ composer check:php
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
