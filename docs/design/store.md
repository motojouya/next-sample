
# 店舗管理

## 対象機能
- ログアウト
- プラン変更
- 店舗作成
- 店舗検索

## メモ

## front
- ログアウト
  - path `/logout`
  - actions
    - `engage.logout`
- プラン変更
  - path `/setting/plan`
  - actions
    - `engage.changePlan`
- 設定
  - path `/setting`
  - links
    - `/manage/stores`
- 管理店舗一覧
  - path `/manage/stores`
  - links
    - `/manage/stores/new`
    - `/manage/stores/<store-url>`
- 店舗作成  
  - path `/manage/stores/new`
  - actions
    - `store.createStore`
      - url
      - name
    - `store.checkStoreUrl`
- 店舗管理トップ  
  - path `/manage/stores/<store-url>`
- 店舗編集  
  - path `/manage/stores/<store-url>/edit`
  - actions
    - `store.editStore`
      - name
    - `store.deleteStore`
- 店舗検索
  - path `/?search=<store_name>`
  - links
    - `/stores/<store-url>`
- 店舗トップ
  - path `/stores/<store-url>`
  - contents
    - name

## server module
- engage
  - ログアウト
  - plan変更
- store
  - 作成
  - 編集
  - 削除
  - 検索
  - 表示

## 作業順序
- rdb schema
- graphql schema
- resolver 定義
- resolver 実装
- 画面実装
- uiコンポーネント分割

