import type { Candidate, PreparationSheet, InterviewRecord } from './types';

// インメモリデータストア
const candidates: Map<string, Candidate> = new Map();
const preparationSheets: Map<string, PreparationSheet> = new Map();
const interviewRecords: Map<string, InterviewRecord> = new Map();

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// デモデータの初期化
function initializeDemoData() {
  // データを完全にクリア
  candidates.clear();
  preparationSheets.clear();
  interviewRecords.clear();

  // 候補者データを作成（IDを保持）
  const candidate1: Candidate = {
    id: 'demo-candidate-1',
    name: '山田太郎',
    email: 'taro.yamada@example.com',
    resume_file_url: null,
    resume_text: `【氏名】山田太郎
【メールアドレス】taro.yamada@example.com

【職務経歴】
現職：株式会社テックイノベーション（2020年4月〜現在）
職種：フルスタックエンジニア

【主な業務内容】
- ECサイトのフロントエンド・バックエンド開発
- React、TypeScript、Node.js、Expressを使用したWebアプリケーション開発
- レガシーシステム（jQuery）からReactへのマイグレーションプロジェクトをリード
- チーム5名のテクニカルリーダーとして、コードレビューと技術選定を担当

【保有スキル】
- フロントエンド：React、TypeScript、Next.js、Tailwind CSS
- バックエンド：Node.js、Express、PostgreSQL、Prisma
- その他：Git、Docker、AWS（EC2、S3）、CI/CD

【学歴】
2020年3月 東京工業大学 情報工学部 卒業

【自己PR】
フロントエンドとバックエンドの両方を理解し、最適なアーキテクチャを提案できます。
新しい技術への学習意欲が高く、チームの技術力向上にも貢献してきました。`,
    created_at: new Date('2025-01-15T10:30:00').toISOString(),
    updated_at: new Date('2025-01-15T10:30:00').toISOString(),
  };
  candidates.set(candidate1.id, candidate1);

  const candidate2: Candidate = {
    id: 'demo-candidate-2',
    name: '佐藤花子',
    email: 'hanako.sato@example.com',
    resume_file_url: null,
    resume_text: `【氏名】佐藤花子
【メールアドレス】hanako.sato@example.com

【職務経歴】
現職：株式会社デザインラボ（2022年6月〜現在）
職種：UI/UXデザイナー

【主な業務内容】
- Webアプリケーションのデザイン全般
- Figmaを使ったデザインシステムの構築・運用
- ユーザーインタビュー、ワイヤーフレーム作成、プロトタイピング
- フロントエンド実装（HTML、CSS、基礎的なJavaScript）

【実績】
- 社内向け業務アプリのリデザインにより、作業時間30%削減に貢献
- デザインシステムの導入により、デザイン作業の効率化を実現
- ユーザビリティテストを通じた継続的な改善

【保有スキル】
- デザインツール：Figma、Adobe XD、Photoshop、Illustrator
- フロントエンド：HTML、CSS、基礎的なJavaScript
- その他：ユーザーリサーチ、プロトタイピング

【学歴】
2022年3月 多摩美術大学 デザイン学部 卒業

【自己PR】
ユーザー視点でのデザイン提案が得意です。デザインだけでなく、フロントエンド実装スキルも磨いており、
デザイナーとエンジニアの橋渡し役として貢献できます。`,
    created_at: new Date('2025-01-16T14:20:00').toISOString(),
    updated_at: new Date('2025-01-16T14:20:00').toISOString(),
  };
  candidates.set(candidate2.id, candidate2);

  const candidate3: Candidate = {
    id: 'demo-candidate-3',
    name: '鈴木一郎',
    email: 'ichiro.suzuki@example.com',
    resume_file_url: null,
    resume_text: `【氏名】鈴木一郎
【メールアドレス】ichiro.suzuki@example.com

【職務経歴】
現職：株式会社クラウドソリューションズ（2018年4月〜現在）
職種：バックエンドエンジニア / テックリード

【主な業務内容】
- マイクロサービスアーキテクチャの設計・実装
- Go言語、Pythonを使った高性能APIの開発
- Kubernetes、Dockerを使ったコンテナ環境の構築・運用
- データベース設計とパフォーマンスチューニング
- チーム10名の技術的なリーダーシップ

【技術スタック】
- 言語：Go、Python、SQL
- フレームワーク：Gin、FastAPI
- インフラ：Kubernetes、Docker、Terraform
- クラウド：AWS（ECS、RDS、Lambda）、GCP（GKE、Cloud Run）
- データベース：PostgreSQL、Redis、MongoDB
- その他：gRPC、GraphQL、Apache Kafka

【学歴】
2018年3月 京都大学大学院 情報学研究科 修了

【自己PR】
大規模システムのアーキテクチャ設計とパフォーマンス最適化が得意です。
マイクロサービス化により、システムの可用性と開発速度の向上に貢献してきました。`,
    created_at: new Date('2025-01-17T09:15:00').toISOString(),
    updated_at: new Date('2025-01-17T09:15:00').toISOString(),
  };
  candidates.set(candidate3.id, candidate3);

  const candidate4: Candidate = {
    id: 'demo-candidate-4',
    name: '田中美咲',
    email: 'misaki.tanaka@example.com',
    resume_file_url: null,
    resume_text: `【氏名】田中美咲
【メールアドレス】misaki.tanaka@example.com

【職務経歴】
現職：株式会社モバイルアプリケーションズ（2021年4月〜現在）
職種：モバイルアプリエンジニア

【主な業務内容】
- React Nativeを使ったiOS/Androidアプリの開発
- クロスプラットフォーム開発による効率的なアプリ提供
- アプリのパフォーマンス最適化とUI/UXの改善
- App Store、Google Playへのリリース対応

【実績】
- 累計100万ダウンロード超のアプリ開発を担当
- アプリのパフォーマンス改善により、起動時間を50%短縮
- レビュー評価を3.5から4.3に向上

【保有スキル】
- モバイル開発：React Native、Expo
- 言語：TypeScript、JavaScript
- 状態管理：Redux、Recoil
- その他：Firebase、REST API、GraphQL

【学歴】
2021年3月 早稲田大学 理工学部 卒業

【自己PR】
クロスプラットフォーム開発を軸に、ユーザー体験の向上に注力してきました。
バックエンドの知識も深めて、より広い視野でサービス開発に貢献したいと考えています。`,
    created_at: new Date('2025-01-18T11:45:00').toISOString(),
    updated_at: new Date('2025-01-18T11:45:00').toISOString(),
  };
  candidates.set(candidate4.id, candidate4);

  const candidate5: Candidate = {
    id: 'demo-candidate-5',
    name: '高橋健太',
    email: 'kenta.takahashi@example.com',
    resume_file_url: null,
    resume_text: `【氏名】高橋健太
【メールアドレス】kenta.takahashi@example.com

【職務経歴】
現職：株式会社インフラテクノロジーズ（2019年4月〜現在）
職種：インフラエンジニア / DevOpsエンジニア

【主な業務内容】
- Kubernetes環境の設計・構築・運用
- CI/CDパイプラインの設計・実装
- Infrastructure as Code（Terraform、Ansible）の推進
- 監視・アラート基盤の構築（Prometheus、Grafana）
- クラウドインフラの最適化とコスト削減

【保有資格】
- AWS Certified Solutions Architect – Professional
- Google Cloud Professional Cloud Architect
- Certified Kubernetes Administrator (CKA)

【技術スタック】
- コンテナ：Kubernetes、Docker、Helm
- CI/CD：GitHub Actions、GitLab CI、ArgoCD
- IaC：Terraform、Ansible、CloudFormation
- クラウド：AWS、GCP
- 監視：Prometheus、Grafana、Datadog
- スクリプト：Bash、Python

【学歴】
2019年3月 東京大学 工学部 卒業

【自己PR】
インフラの自動化とDevOps文化の推進に力を入れてきました。
開発チームと密に連携し、開発者体験の向上に貢献できます。`,
    created_at: new Date('2025-01-19T13:30:00').toISOString(),
    updated_at: new Date('2025-01-19T13:30:00').toISOString(),
  };
  candidates.set(candidate5.id, candidate5);

  const candidate6: Candidate = {
    id: 'demo-candidate-6',
    name: '伊藤さくら',
    email: 'sakura.ito@example.com',
    resume_file_url: null,
    resume_text: `【氏名】伊藤さくら
【メールアドレス】sakura.ito@example.com

【職務経歴】
現職：株式会社クオリティアシュアランス（2020年4月〜現在）
職種：QAエンジニア / テスト自動化エンジニア

【主な業務内容】
- テスト自動化の設計・実装・運用
- E2Eテスト、統合テスト、単体テストの作成
- CI/CDパイプラインへのテスト組み込み
- 品質管理プロセスの改善提案と実行
- テストコードのレビューとベストプラクティスの共有

【実績】
- テスト自動化率を30%から85%に向上
- リリースサイクルを月1回から週2回に短縮
- バグ検出率を40%向上

【保有スキル】
- テストツール：Selenium、Cypress、Playwright、Jest
- 言語：TypeScript、JavaScript、Python
- CI/CD：GitHub Actions、Jenkins
- その他：TestRail、Postman、JMeter

【学歴】
2020年3月 慶應義塾大学 理工学部 卒業

【自己PR】
テスト自動化により、開発速度と品質の両立に貢献してきました。
開発チームと密に連携し、テスタビリティを考慮した設計を提案できます。`,
    created_at: new Date('2025-01-20T15:00:00').toISOString(),
    updated_at: new Date('2025-01-20T15:00:00').toISOString(),
  };
  candidates.set(candidate6.id, candidate6);

  const candidate7: Candidate = {
    id: 'demo-candidate-7',
    name: '渡辺大輔',
    email: 'daisuke.watanabe@example.com',
    resume_file_url: null,
    resume_text: `【氏名】渡辺大輔
【メールアドレス】daisuke.watanabe@example.com

【職務経歴】
現職：株式会社データアナリティクス（2017年4月〜現在）
職種：データエンジニア / テックリード

【主な業務内容】
- 大規模データパイプラインの設計・構築
- ETL処理の最適化とデータ品質管理
- データウェアハウスの構築・運用
- 機械学習基盤の整備
- データカタログの導入と運用

【技術スタック】
- 言語：Python、Scala、SQL
- データ処理：Apache Spark、Apache Airflow
- データベース：PostgreSQL、BigQuery、Snowflake
- クラウド：AWS（S3、EMR、Glue）、GCP（BigQuery、Dataflow）
- その他：dbt、Kafka、Elasticsearch

【実績】
- 日次100TBのデータ処理基盤を構築
- データ処理時間を70%削減
- データカタログ導入により、データ検索性を大幅改善

【学歴】
2017年3月 東京大学大学院 情報理工学系研究科 修了

【自己PR】
大規模なデータ処理とデータ品質管理が得意です。
ビジネス価値につながるデータ基盤の構築に貢献できます。`,
    created_at: new Date('2025-01-21T10:20:00').toISOString(),
    updated_at: new Date('2025-01-21T10:20:00').toISOString(),
  };
  candidates.set(candidate7.id, candidate7);

  const candidate8: Candidate = {
    id: 'demo-candidate-8',
    name: '中村あかり',
    email: 'akari.nakamura@example.com',
    resume_file_url: null,
    resume_text: null,
    created_at: new Date('2025-01-22T14:10:00').toISOString(),
    updated_at: new Date('2025-01-22T14:10:00').toISOString(),
  };
  candidates.set(candidate8.id, candidate8);

  const candidate9: Candidate = {
    id: 'demo-candidate-9',
    name: '小林翔太',
    email: 'shota.kobayashi@example.com',
    resume_file_url: null,
    resume_text: null,
    created_at: new Date('2025-01-23T09:50:00').toISOString(),
    updated_at: new Date('2025-01-23T09:50:00').toISOString(),
  };
  candidates.set(candidate9.id, candidate9);

  const candidate10: Candidate = {
    id: 'demo-candidate-10',
    name: '加藤みゆき',
    email: 'miyuki.kato@example.com',
    resume_file_url: null,
    resume_text: null,
    created_at: new Date('2025-01-24T16:30:00').toISOString(),
    updated_at: new Date('2025-01-24T16:30:00').toISOString(),
  };
  candidates.set(candidate10.id, candidate10);

  // 山田太郎の準備シート
  const sheet1: PreparationSheet = {
    id: 'demo-sheet-1',
    candidate_id: candidate1.id,
    summary: 'フルスタックエンジニアとして5年の経験。React、Node.jsに精通し、最近ではTypeScriptを使った大規模プロジェクトをリード。',
    strengths: '- モダンなフロントエンド技術に強い\n- バックエンド開発も可能\n- チームリーダーの経験あり\n- コミュニケーション能力が高い',
    concerns: '- 大規模システムの運用経験が少ない\n- クラウドインフラ（AWS）の経験が浅い',
    questions_json: [
      'これまでで最も難しかったプロジェクトについて教えてください',
      'チーム内で意見が対立した場合、どのように解決しますか？',
      'なぜ弊社に応募されたのですか？',
    ],
    created_at: new Date('2025-01-15T11:00:00').toISOString(),
  };
  preparationSheets.set(sheet1.id, sheet1);

  // 佐藤花子の準備シート
  const sheet2: PreparationSheet = {
    id: 'demo-sheet-2',
    candidate_id: candidate2.id,
    summary: 'UI/UXデザイナーとして3年の経験。Figmaを使ったデザインシステム構築が得意。最近ではフロントエンド実装にも挑戦中。',
    strengths: '- デザインセンスが優れている\n- ユーザー視点での提案ができる\n- HTML/CSSのコーディングスキルあり\n- プロトタイピングが得意',
    concerns: '- JavaScriptの経験がまだ浅い\n- バックエンドの知識が不足している',
    questions_json: [
      'これまでに手がけたデザインで最も印象に残っているものは？',
      'デザインと開発の連携で工夫していることはありますか？',
      'キャリアプランについてお聞かせください',
    ],
    created_at: new Date('2025-01-16T15:00:00').toISOString(),
  };
  preparationSheets.set(sheet2.id, sheet2);

  // 鈴木一郎の準備シート
  const sheet3: PreparationSheet = {
    id: 'demo-sheet-3',
    candidate_id: candidate3.id,
    summary: 'バックエンドエンジニアとして7年の経験。Go言語とPythonを得意とし、マイクロサービスアーキテクチャの設計経験が豊富。',
    strengths: '- マイクロサービスの設計・実装経験が豊富\n- パフォーマンスチューニングが得意\n- AWSとGCPの実務経験あり\n- 技術選定の判断力が高い',
    concerns: '- フロントエンド技術への理解が浅い\n- 英語でのコミュニケーション経験が少ない',
    questions_json: [
      'マイクロサービス化で苦労した点と解決方法を教えてください',
      'システムの可用性を高めるためにどのような工夫をしていますか？',
      '今後学びたい技術領域はありますか？',
    ],
    created_at: new Date('2025-01-17T10:00:00').toISOString(),
  };
  preparationSheets.set(sheet3.id, sheet3);

  // 田中美咲の準備シート
  const sheet4: PreparationSheet = {
    id: 'demo-sheet-4',
    candidate_id: candidate4.id,
    summary: 'モバイルアプリエンジニアとして4年の経験。React NativeとFlutterを使ったクロスプラットフォーム開発が得意。',
    strengths: '- iOS/Androidの両方に精通\n- React Nativeの実務経験が豊富\n- アプリのパフォーマンス最適化が得意\n- UIアニメーションの実装スキルが高い',
    concerns: '- バックエンドの経験が限定的\n- チームリーダーの経験が少ない',
    questions_json: [
      'クロスプラットフォーム開発のメリット・デメリットは？',
      'アプリのパフォーマンス改善で工夫したことは？',
      'ネイティブ開発への興味はありますか？',
    ],
    created_at: new Date('2025-01-18T12:00:00').toISOString(),
  };
  preparationSheets.set(sheet4.id, sheet4);

  // 高橋健太の準備シート
  const sheet5: PreparationSheet = {
    id: 'demo-sheet-5',
    candidate_id: candidate5.id,
    summary: 'インフラエンジニアとして6年の経験。Kubernetes、Docker、CI/CDパイプラインの構築が得意。DevOps文化の推進に積極的。',
    strengths: '- Kubernetesの運用経験が豊富\n- CI/CDパイプラインの設計・構築スキル\n- AWSとGCPの認定資格保有\n- 自動化への強いこだわり',
    concerns: '- アプリケーション開発の経験が浅い\n- フロントエンド技術の理解が不足',
    questions_json: [
      'これまでで最も困難だったインフラの課題は？',
      'DevOps文化を組織に浸透させるための工夫は？',
      'IaCツールの選定基準を教えてください',
    ],
    created_at: new Date('2025-01-19T14:00:00').toISOString(),
  };
  preparationSheets.set(sheet5.id, sheet5);

  // 伊藤さくらの準備シート
  const sheet6: PreparationSheet = {
    id: 'demo-sheet-6',
    candidate_id: candidate6.id,
    summary: 'QAエンジニアとして5年の経験。自動テストの設計・実装、品質管理プロセスの改善に従事。テスト自動化率の向上に貢献。',
    strengths: '- テスト自動化の豊富な経験\n- Selenium、Cypress、Playwrightに精通\n- 品質管理プロセスの改善提案力\n- 開発チームとの連携が円滑',
    concerns: '- プログラミングスキルが中級レベル\n- インフラ知識が不足している',
    questions_json: [
      'テスト自動化を導入する際の課題と解決策は？',
      '品質を保ちながら開発スピードを上げる方法は？',
      'これまでで最も効果的だったQA改善施策は？',
    ],
    created_at: new Date('2025-01-20T15:30:00').toISOString(),
  };
  preparationSheets.set(sheet6.id, sheet6);

  // 渡辺大輔の準備シート
  const sheet7: PreparationSheet = {
    id: 'demo-sheet-7',
    candidate_id: candidate7.id,
    summary: 'データエンジニアとして8年の経験。大規模データパイプラインの設計・構築、機械学習基盤の整備に従事。',
    strengths: '- データパイプラインの設計スキル\n- Python、Scala、SQLに精通\n- Apache Spark、Airflowの実務経験\n- データモデリングの知見が深い',
    concerns: '- フロントエンド技術への理解が限定的\n- プロダクト開発の経験が少ない',
    questions_json: [
      'データパイプラインの品質をどう担保していますか？',
      'リアルタイム処理とバッチ処理の使い分けは？',
      'データガバナンスについての考えを聞かせてください',
    ],
    created_at: new Date('2025-01-21T10:45:00').toISOString(),
  };
  preparationSheets.set(sheet7.id, sheet7);

  // 山田太郎の面接記録
  const record1: InterviewRecord = {
    id: 'demo-record-1',
    candidate_id: candidate1.id,
    transcript: `面接官：本日はお時間をいただきありがとうございます。まず自己紹介をお願いします。

山田：はい、山田太郎と申します。現在はフルスタックエンジニアとして、ECサイトの開発に携わっております。フロントエンドはReactとTypeScript、バックエンドはNode.jsとExpressを使用しています。

面接官：これまでで最も難しかったプロジェクトについて教えていただけますか？

山田：昨年携わったレガシーシステムのリニューアルプロジェクトです。古いjQueryベースのコードをReactに移行する必要があり、段階的な移行戦略を立てることが重要でした。また、既存機能を維持しながら新機能を追加する必要があったため、慎重なテスト設計が求められました。

面接官：チーム内で意見が対立した場合、どのように解決していますか？

山田：まずは相手の意見を丁寧に聞くことを心がけています。その上で、データや事実に基づいて議論し、最終的にはチーム全体にとって最適な選択肢を選ぶようにしています。必要に応じて、プロトタイプを作成して実際に検証することもあります。

面接官：なぜ弊社に応募されたのですか？

山田：御社の技術スタックが私のスキルセットとマッチしていること、そしてプロダクト開発において技術的な挑戦を続けている姿勢に共感したためです。特にマイクロサービス化への取り組みに興味があり、そこに貢献したいと考えています。`,
    handover_notes: `【総合評価】
技術力：高い。フロントエンド・バックエンド両方の実務経験が豊富。
コミュニケーション：良好。質問に対して論理的かつ明確に回答できている。
学習意欲：高い。新しい技術への興味が強い。

【次回確認事項】
- マイクロサービス化プロジェクトの具体的な経験について深掘り
- チームマネジメントの経験について詳しく確認
- 給与・待遇面の擦り合わせ

【懸念点】
特になし。順調に選考を進めて良いと判断。`,
    created_at: new Date('2025-01-16T13:00:00').toISOString(),
  };
  interviewRecords.set(record1.id, record1);

  // 佐藤花子の面接記録
  const record2: InterviewRecord = {
    id: 'demo-record-2',
    candidate_id: candidate2.id,
    transcript: `面接官：本日はよろしくお願いします。まずこれまでのご経歴を簡単に教えてください。

佐藤：はい、佐藤花子と申します。UI/UXデザイナーとして3年ほど活動しています。主にWebアプリケーションのデザインを担当し、最近ではデザインシステムの構築にも携わっています。

面接官：これまでに手がけたデザインで最も印象に残っているものを教えてください。

佐藤：昨年担当した社内向け業務アプリケーションのリデザインです。ユーザーインタビューを重ね、業務フローを深く理解した上で、使いやすさを重視したインターフェースを設計しました。結果として、作業時間が30%短縮されたというフィードバックをいただきました。

面接官：デザインと開発の連携で工夫していることはありますか？

佐藤：Figmaでコンポーネントを作成する際に、実装を意識した命名規則を使用しています。また、デザインの意図を開発チームに伝えるため、詳細な仕様書を作成し、定期的にコミュニケーションを取るようにしています。

面接官：今後のキャリアプランについてお聞かせください。

佐藤：デザインだけでなく、フロントエンド実装のスキルも身につけたいと考えています。デザインと実装の両方を理解することで、より実現可能性の高い提案ができると考えています。`,
    handover_notes: `【総合評価】
デザインスキル：高い。ユーザー視点での提案ができる。
コミュニケーション：良好。明確に自分の考えを伝えられる。
成長意欲：高い。フロントエンド実装にも意欲的。

【次回確認事項】
- ポートフォリオの詳細レビュー
- フロントエンド実装の具体的なスキルレベル確認
- デザインチームとの協業経験

【懸念点】
JavaScriptのスキルがまだ浅いため、技術面でのフォロー体制が必要。`,
    created_at: new Date('2025-01-17T14:30:00').toISOString(),
  };
  interviewRecords.set(record2.id, record2);

  // 鈴木一郎の面接記録
  const record3: InterviewRecord = {
    id: 'demo-record-3',
    candidate_id: candidate3.id,
    transcript: `面接官：本日はお忙しい中ありがとうございます。まずは簡単に自己紹介をお願いします。

鈴木：鈴木一郎です。バックエンドエンジニアとして7年間、主にGo言語を使った開発に携わってきました。現在はマイクロサービスアーキテクチャの設計と実装を担当しています。

面接官：マイクロサービス化で苦労した点について教えてください。

鈴木：最も苦労したのはサービス間の通信の信頼性確保です。ネットワークの不安定性を考慮し、リトライ処理やサーキットブレーカーパターンを実装しました。また、分散トレーシングの導入により、問題の特定が容易になりました。

面接官：パフォーマンスチューニングで特に重視していることは？

鈴木：まずボトルネックの特定です。推測ではなく、プロファイリングツールを使って実際の数値を見ることを重視しています。その上で、データベースクエリの最適化やキャッシング戦略の見直しを行います。

面接官：今後学びたい技術はありますか？

鈴木：Rustに興味があります。システムプログラミングの知識を深めることで、より高性能なサービスを構築できると考えています。また、Kubernetesのより深い運用知識も身につけたいです。`,
    handover_notes: `【総合評価】
技術力：非常に高い。マイクロサービス設計の実践的な知見が豊富。
問題解決能力：優れている。論理的なアプローチができる。
学習意欲：高い。新技術への探求心が強い。

【次回確認事項】
- チームマネジメント経験の有無
- フロントエンドとの協業経験
- 希望年収のレンジ確認

【懸念点】
フロントエンドの理解が浅いため、フルスタック要員としては厳しいかもしれない。`,
    created_at: new Date('2025-01-18T11:00:00').toISOString(),
  };
  interviewRecords.set(record3.id, record3);

  // 田中美咲の面接記録
  const record4: InterviewRecord = {
    id: 'demo-record-4',
    candidate_id: candidate4.id,
    transcript: `面接官：本日はよろしくお願いします。モバイル開発のご経験について教えてください。

田中：よろしくお願いします。私はReact Nativeを使ったクロスプラットフォーム開発を4年間経験してきました。iOS、Android両方のアプリをリリースし、累計100万ダウンロードを超えるアプリも担当しました。

面接官：クロスプラットフォーム開発のメリットとデメリットをどう考えていますか？

田中：メリットは開発効率とコードの共通化です。一度の実装で両プラットフォームに対応でき、保守コストも削減できます。デメリットは、ネイティブ固有の機能を使う際に工夫が必要な点や、パフォーマンスが求められる場面ではネイティブに劣る可能性があることです。

面接官：パフォーマンス改善で工夫したことは？

田中：大きな画像の遅延読み込み、リストの仮想化、不要な再レンダリングの削減などを実施しました。特にReact NativeのFlatListを使った最適化で、スクロールパフォーマンスが大幅に向上しました。

面接官：今後のキャリアについてはどうお考えですか？

田中：クロスプラットフォーム開発を軸にしながら、必要に応じてネイティブ開発のスキルも磨きたいと考えています。また、バックエンドの知識も深めて、より広い視野で開発に取り組みたいです。`,
    handover_notes: `【総合評価】
技術力：高い。React Nativeの実務経験が豊富。
実績：優秀。大規模アプリの開発経験がある。
向上心：高い。技術領域を広げる意欲がある。

【次回確認事項】
- ネイティブ開発（Swift/Kotlin）の具体的な経験
- バックエンドとの協業経験
- チームでの役割とリーダーシップ

【懸念点】
バックエンドの経験が限定的。フルスタックを期待する場合は育成が必要。`,
    created_at: new Date('2025-01-19T10:30:00').toISOString(),
  };
  interviewRecords.set(record4.id, record4);

  // 伊藤さくらの面接記録
  const record5: InterviewRecord = {
    id: 'demo-record-5',
    candidate_id: candidate6.id,
    transcript: `面接官：本日はありがとうございます。QAエンジニアとしてのご経験を教えてください。

伊藤：伊藤さくらです。QAエンジニアとして5年間、主にテスト自動化と品質管理プロセスの改善に取り組んできました。現在の職場では、テスト自動化率を30%から85%まで向上させることに成功しました。

面接官：テスト自動化を導入する際の課題と解決策について教えてください。

伊藤：最大の課題は、開発チームの理解と協力を得ることでした。最初は小さな成功事例を作り、自動化のメリットを実感してもらうことから始めました。また、メンテナンスしやすいテストコードを書くことも重要で、Page Objectパターンなどの設計パターンを活用しています。

面接官：品質を保ちながら開発スピードを上げるにはどうすればよいでしょうか？

伊藤：自動テストの充実が最も重要だと考えています。ただし、全てを自動化するのではなく、リスクが高い部分や頻繁に変更される部分を優先的に自動化します。また、開発初期段階からQAが参加し、テスタビリティを考慮した設計にすることも効果的です。

面接官：これまでで最も効果的だった改善施策は？

伊藤：CI/CDパイプラインへのテスト自動化の組み込みです。プルリクエスト時に自動テストが実行されることで、バグの早期発見が可能になり、リリースまでの時間が大幅に短縮されました。`,
    handover_notes: `【総合評価】
QAスキル：非常に高い。テスト自動化の実績が豊富。
改善提案力：優れている。プロセス改善の経験が豊富。
チームワーク：良好。開発チームとの連携がスムーズ。

【次回確認事項】
- プログラミングスキルの具体的なレベル確認
- セキュリティテストの経験
- マネジメント経験の有無

【懸念点】
プログラミングスキルが中級レベル。開発寄りの業務を期待する場合は育成が必要。`,
    created_at: new Date('2025-01-21T09:00:00').toISOString(),
  };
  interviewRecords.set(record5.id, record5);

  // 渡辺大輔の面接記録
  const record6: InterviewRecord = {
    id: 'demo-record-6',
    candidate_id: candidate7.id,
    transcript: `面接官：本日はよろしくお願いします。データエンジニアとしてのキャリアについて教えてください。

渡辺：渡辺大輔です。データエンジニアとして8年間、大規模なデータパイプラインの設計と構築に携わってきました。特にApache SparkとAirflowを使った分散処理システムの構築が得意です。

面接官：データパイプラインの品質をどのように担保していますか？

渡辺：データ品質のテストを自動化しています。具体的には、データの完全性チェック、スキーマ検証、異常値検出などを実装し、パイプラインの各ステージで検証を行います。また、データリネージを可視化することで、問題発生時の原因特定を迅速化しています。

面接官：リアルタイム処理とバッチ処理をどう使い分けていますか？

渡辺：用途とコストのバランスで判断します。即時性が求められるアラートや監視にはKafkaとSparkストリーミングを使用し、大量データの集計やレポート生成にはバッチ処理を使います。最近ではLambdaアーキテクチャではなく、Kappaアーキテクチャの採用も検討しています。

面接官：データガバナンスについての考えを聞かせてください。

渡辺：データガバナンスは技術だけでなく、組織文化の問題だと考えています。データカタログの整備、アクセス制御の明確化、データリテラシーの向上などを総合的に進める必要があります。私は前職でデータカタログツールの導入を主導しました。`,
    handover_notes: `【総合評価】
技術力：非常に高い。大規模データ処理の経験が豊富。
設計力：優れている。アーキテクチャの知見が深い。
視野の広さ：良好。技術以外の観点も考慮できる。

【次回確認事項】
- 機械学習エンジニアとの協業経験
- プロダクト開発への関心度
- チームビルディングの経験

【懸念点】
プロダクト開発の経験が少ない。ビジネス要件の理解に時間がかかる可能性あり。`,
    created_at: new Date('2025-01-22T13:30:00').toISOString(),
  };
  interviewRecords.set(record6.id, record6);
}

// 初期化を実行
initializeDemoData();

export const localDb = {
  // 候補者
  candidates: {
    async findAll(): Promise<Candidate[]> {
      return Array.from(candidates.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    async findById(id: string): Promise<Candidate | null> {
      return candidates.get(id) || null;
    },
    async create(data: { name: string; email?: string | null }): Promise<Candidate> {
      const now = new Date().toISOString();
      const candidate: Candidate = {
        id: generateId(),
        name: data.name,
        email: data.email || null,
        resume_file_url: null,
        created_at: now,
        updated_at: now,
      };
      candidates.set(candidate.id, candidate);
      return candidate;
    },
    async update(id: string, data: Partial<Candidate>): Promise<Candidate | null> {
      const candidate = candidates.get(id);
      if (!candidate) return null;
      const updated = { ...candidate, ...data, updated_at: new Date().toISOString() };
      candidates.set(id, updated);
      return updated;
    },
    async delete(id: string): Promise<boolean> {
      return candidates.delete(id);
    },
  },

  // 準備シート
  preparationSheets: {
    async findByCandidateId(candidateId: string): Promise<PreparationSheet[]> {
      return Array.from(preparationSheets.values())
        .filter((sheet) => sheet.candidate_id === candidateId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    async create(data: {
      candidate_id: string;
      summary?: string | null;
      strengths?: string | null;
      concerns?: string | null;
      questions_json?: any;
    }): Promise<PreparationSheet> {
      const sheet: PreparationSheet = {
        id: generateId(),
        candidate_id: data.candidate_id,
        summary: data.summary || null,
        strengths: data.strengths || null,
        concerns: data.concerns || null,
        questions_json: data.questions_json || null,
        created_at: new Date().toISOString(),
      };
      preparationSheets.set(sheet.id, sheet);
      return sheet;
    },
  },

  // 面接記録
  interviewRecords: {
    async findByCandidateId(candidateId: string): Promise<InterviewRecord[]> {
      return Array.from(interviewRecords.values())
        .filter((record) => record.candidate_id === candidateId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    async create(data: {
      candidate_id: string;
      transcript: string;
      handover_notes?: string | null;
    }): Promise<InterviewRecord> {
      const record: InterviewRecord = {
        id: generateId(),
        candidate_id: data.candidate_id,
        transcript: data.transcript,
        handover_notes: data.handover_notes || null,
        created_at: new Date().toISOString(),
      };
      interviewRecords.set(record.id, record);
      return record;
    },
  },
};

