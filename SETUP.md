# 新卒面接サポートWebアプリ - セットアップガイド

このガイドでは、アプリケーションのセットアップ手順を詳しく説明します。

## 必要なアカウント

1. **Supabase アカウント** - https://supabase.com
2. **OpenAI アカウント** または **Anthropic (Claude) アカウント**
   - OpenAI: https://platform.openai.com
   - Anthropic: https://console.anthropic.com

## Supabase のセットアップ

### 1. プロジェクト作成

1. Supabase にログイン
2. 「New Project」をクリック
3. プロジェクト名を入力（例: interview-support）
4. データベースパスワードを設定
5. リージョンを選択（Tokyo がおすすめ）
6. 「Create new project」をクリック

### 2. データベーステーブル作成

1. プロジェクトダッシュボードで「SQL Editor」を開く
2. 「New query」をクリック
3. `supabase/migrations/001_initial_schema.sql` の内容をコピー＆ペースト
4. 「Run」をクリック

### 3. Storage バケット作成

1. サイドバーから「Storage」を選択
2. 「Create a new bucket」をクリック
3. バケット名: `resumes`
4. Public bucket: **ON** にする
5. 「Create bucket」をクリック
6. 作成したバケットを選択
7. 「Policies」タブで以下のポリシーを追加:

**INSERT ポリシー:**
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');
```

**SELECT ポリシー:**
```sql
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');
```

### 4. API キーの取得

1. プロジェクトダッシュボードで「Settings」→「API」を開く
2. 以下の値をコピー:
   - Project URL
   - anon public key

## API キーの取得

### OpenAI の場合

1. https://platform.openai.com にログイン
2. 右上のアカウントメニューから「API keys」を選択
3. 「Create new secret key」をクリック
4. キー名を入力（例: interview-support）
5. 生成されたキーをコピー（一度しか表示されません）

### Claude (Anthropic) の場合

1. https://console.anthropic.com にログイン
2. 「API Keys」を選択
3. 「Create Key」をクリック
4. キー名を入力
5. 生成されたキーをコピー

## 環境変数の設定

`.env.local` ファイルを作成し、以下の値を設定:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI Provider (openai or claude)
AI_PROVIDER=openai

# OpenAI
OPENAI_API_KEY=sk-...

# Claude (Anthropic) - Claudeを使う場合のみ
ANTHROPIC_API_KEY=sk-ant-...
```

## ローカル開発

```bash
# パッケージインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 を開く

## Vercel へのデプロイ

### 1. Vercel アカウント作成

https://vercel.com でアカウントを作成

### 2. プロジェクトのインポート

1. Vercel ダッシュボードで「Add New」→「Project」
2. Git リポジトリを選択（GitHub, GitLab, Bitbucket）
3. 「Import」をクリック

### 3. 環境変数の設定

「Environment Variables」セクションで以下を追加:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `AI_PROVIDER`
- `OPENAI_API_KEY` または `ANTHROPIC_API_KEY`

### 4. デプロイ

「Deploy」をクリック

## 動作確認

1. デプロイされた URL にアクセス
2. 「候補者一覧へ」をクリック
3. 候補者を登録
4. レジュメをアップロードして準備シートが生成されるか確認
5. 面接記録を追加して申し送りが生成されるか確認

## トラブルシューティング

### Supabase 接続エラー

- 環境変数が正しく設定されているか確認
- Supabase プロジェクトが起動しているか確認
- URL の末尾にスラッシュがないか確認

### PDF アップロードエラー

- Storage バケット `resumes` が作成されているか確認
- Public bucket として設定されているか確認
- ポリシーが正しく設定されているか確認

### AI 生成エラー

- API キーが正しく設定されているか確認
- API の利用枠が残っているか確認
- レート制限に達していないか確認

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Supabase ドキュメント](https://supabase.com/docs)
- [OpenAI API ドキュメント](https://platform.openai.com/docs)
- [Anthropic API ドキュメント](https://docs.anthropic.com)

