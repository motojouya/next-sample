
# design doc

## システム目的
toBシステムにおいて、消費者がなんらかの注文をし、それを受け付けることができるシステム。  
どんな注文かは想定しないので、その部分は適当だが、利用者を想定した画面や、権限管理などは比較的しっかり目に作る  

## 利用者
- 出店者
- 店舗管理者
- 消費者

## フォームイメージ
以下の順番で遷移するが、URLは変わらない感じ。  
中には、メールの送達確認みたいなのを挟むかも  

1. フォーム
2. 確認
3. 完了

## 画面
### 共通
- ログイン  
  - 機能  
  ?login=true  
- ユーザ登録
  - フォーム  
  - フォームだが、メール認証がある  
  /registor  
- 設定トップ  
  /setting  
- 個人情報編集  
  - フォーム  
  /setting/information  
- プラン変更  
  - フォーム  
  /setting/plan  
- パスワード変更  
  - フォーム  
  /setting/password  
- メールアドレス変更  
  - フォーム  
  /setting/email  

### 消費者
- 検索  
  窓と結果は同じ画面  
  /?search=<word>  
- 店舗  
  - 商品選択フォーム  
  /stores/<store-name>  
- 購入履歴一覧  
  /order_histories  
- 購入履歴詳細  
  /order_histories/<order-id>  

### 店舗管理者
- 店舗一覧  
  /manage/stores  
- 店舗管理トップ  
  /manage/stores/<store-name>  
- メニュー一覧  
  /manage/stores/<store-name>/menus  
- メニュー編集  
  /manage/stores/<store-name>/menus/<menu-name>  
- メンバー一覧  
  /manage/stores/<store-name>/members  
- 注文履歴一覧  
  /manage/stores/<store-name>/order_histories  
- 注文履歴詳細  
  /manage/stores/<store-name>/order_histories/<order-id>  
- メンバー承諾画面  
  /manage/stores/<store-name>/members/verify  

### 出店者（店舗管理者の権限を含む）
- 店舗作成  
  /manage/stores/new  
  - 作成  
- 店舗編集  
  /manage/stores/<store-name>/edit  
  - 編集  
  - 削除  
- メンバー編集  
  /manage/stores/<store-name>/members/<user-identifier>  
  - 追加  
  - 削除  
  - 権限変更  

### サイドメニュー
- 検索画面  
- 設定トップ  
- 店舗一覧  

## module
- domain
  この下はgraphqlの型とDBのschema最小公倍数で切っていく  
  domain的なモジュールを表現するので、特定の機能、つまりquery、mutation、usecaseは入らない  
  この下のモジュール名は、名詞
  - user
  - user_email
  - store
  - ...
- usecase
  この下はdomainを利用して機能として切り出すもの
  graphql的にはquery、mutationなどはここに入る
  この下のモジュール名は動詞、あるいは行動を示す名詞
  - 利用
    - ログイン
    - 登録
    - 情報編集
  - 店舗参照
    - 店舗検索
    - メニュー参照
  - 注文
    - 注文
    - 注文履歴
  - 店舗管理
    - 店舗作成
    - 店舗編集
  - 店舗メンバ管理
    - メンバ管理
  - 店舗メニュー管理
    - メニュー管理
    - 注文履歴参照(別モジュールにしてもいいが、検討)


## schema

- user
  - user_id
  - identifier(emailと同じ)
  - name
  - register_session_id
  - email(user_email forign key)
  - active
  - created_date
  - updated_date
- user_email
  - user_id
  - email
  - email_pin
  - created_date
  - verified_date
  - assign_expired_date
- user_password
  - user_id
  - password
  - created_date
  - updated_date
- user_plan
  - user_id
  - plan
  - updated_date
- store
  - store_id
  - store_url
  - name
  - created_date
  - updated_date
- store_user
  - store_id
  - user_id
  - role_id
  - created_date
  - updated_date
- role
  - role_id
  - name(owner,staff,none)
- store_user_invitation
  - store_id
  - user_id
  - invitation_pin
  - invited_date
  - expired_date
  - accepted_date
- menu
  - store_id
  - menu_id
  - name
  - price
  - created_date
  - updated_date
  - updated_user_id
- order
  - order_id
  - order_name(order_idと同じだが見えていいもの)
  - store_id
  - order_user_id
  - created_date
- order_detail
  - order_id
  - store_id
  - menu_id
  - quantity

## plans
1. ログイン
  - ログイン
  - ユーザ登録
  - ユーザ設定
2. 店舗
  - プラン変更
  - 店舗作成
  - 店舗検索
3. メニュー
  - メニュー編集
  - 注文
  - 注文履歴
4. メンバー
  - メンバー編集
  - メンバー一覧

上記の順番で作っていく  
それぞれ、graphql定義->フロント->RDBスキーマ定義->サーバという順番  

## 構成
- top level  
  gitignoreとか、docker-compose.ymlとか、readmeとか  
- docs  
  ドキュメント  
- proxy  
  リクエストのハンドリング  
  /app path以下はserverに流し、それ以外はfrontに流したい  
  nginx  
- memory  
  認証情報  
  redis  
- front  
  フロントのビルド用  
  静的なファイルを配信する  
- api  
  graphql schemaの定義  
  ここを参照してfrontとappのスキーマを定義する  
  ディレクトリは用意するが、コンテナイメージはつくらない  
- server  
  本体  
  node.js  
- rdb  
  postgresql  
- server_test  
- front_test  
- entrance  
  メンテのための入口用  
  ここから、rdbやredisにログインする

## 技術要素
- graphql
- prisma
- nest.js
- react
- next.js

