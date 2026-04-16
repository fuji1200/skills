---
name: diagram-create
description: マニュアル図解集と同じスタイルでSVG図解を生成する。ユーザーが「図解を作りたい」「ダイアグラムを作って」「概念図がほしい」と依頼したときに使用する。
allowed-tools:
  - Read
  - Write
---

# SVG図解生成スキル

ユーザーから「何の図解を作りたいか」を受け取り、統一されたスタイル規約に従ってSVG図解を生成する。

## 処理フロー

1. ユーザーの要望をヒアリングし、図解の目的・内容を把握する
2. 下記の6カテゴリ（12パターン）から最適なレイアウトを選択する
3. スタイル規約に厳密に従い、SVGコードを生成する
4. `.svg` ファイルとして書き出す

---

## スタイル規約（必須遵守）

### カラーパレット

| 用途 | HEX | 背景（15%透過相当） | 意味 |
|------|------|------|------|
| 基本・主要 | `#2563eb` | `rgba(37,99,235,0.15)` → `#dbeafe` | 情報、基本要素 |
| 成功・完了 | `#10b981` | `rgba(16,185,129,0.15)` → `#d1fae5` | 正常、許可、完了 |
| 警告・注意 | `#f59e0b` | `rgba(245,158,11,0.15)` → `#fef3c7` | 注意、保留、中間 |
| 危険・禁止 | `#dc2626` | `rgba(220,38,38,0.15)` → `#fee2e2` | エラー、禁止、重要 |
| 特殊・高度 | `#8b5cf6` | `rgba(139,92,246,0.15)` → `#ede9fe` | 拡張、特殊、高度 |
| 中立・補助 | `#6b7280` | `rgba(107,114,128,0.15)` → `#f3f4f6` | 補足、副次、無効 |

### テキスト色

- 見出し・ラベル: `#1e293b`
- 本文: `#334155`
- 補足・注釈: `#64748b`

### フォント

```xml
font-family="'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
```

- タイトル: `font-size="20"` `font-weight="bold"`
- セクション見出し: `font-size="16"` `font-weight="bold"`
- 本文・ラベル: `font-size="14"` `font-weight="normal"`
- 注釈・補足: `font-size="12"` `font-weight="normal"` color=`#64748b`

### 形状・罫線

- 角丸: `rx="8"`
- 罫線: `stroke-width="1.5"`
- 囲み背景の不透明度: 15%（上記テーブルの背景色を使用）
- 枠線色: 各アクセント色をそのまま使用

### 余白・間隔

- SVG外側パディング: `40px`
- セクション間: `30px`
- 要素間: `16px`
- テキスト内側パディング: `16px`

### 全体背景

- 白: `#ffffff`

---

## レイアウトパターン一覧（6カテゴリ12種）

### 1. ハブ型（中央＋周辺）

**1-A: 放射ハブ型**
中央に核となる概念を置き、周囲に関連要素を放射状に配置。要素間を線で接続。
- 用途: アーキテクチャ全体像、エコシステム図、依存関係
- 構成: 中央に大きな円or角丸矩形、周囲に5〜8個の要素、接続線付き

```xml
<!-- 放射ハブ型テンプレート -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#ffffff"/>
  <!-- 中央ノード -->
  <circle cx="400" cy="300" r="60" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
  <text x="400" y="305" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">中央概念</text>
  <!-- 周辺ノード（例: 上） -->
  <rect x="350" y="80" width="100" height="50" rx="8" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
  <text x="400" y="110" text-anchor="middle" font-size="14"
        fill="#334155" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">要素A</text>
  <!-- 接続線 -->
  <line x1="400" y1="240" x2="400" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4"/>
</svg>
```

**1-B: 衛星ハブ型**
中央ノードから伸びるグループが、さらにサブ要素を持つ。2階層の放射構造。
- 用途: 組織構造、カテゴリ分類、機能マップ

---

### 2. ピラミッド型（階層優先度）

**2-A: 正三角ピラミッド型**
上から下へ段階的に広がる三角形構造。上位ほど重要・抽象的。
- 用途: 優先度、抽象度の階層、セキュリティレイヤー
- 構成: 3〜5段、各段は台形or角丸矩形、上段ほど幅が狭い

```xml
<!-- ピラミッド型テンプレート -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#ffffff"/>
  <!-- 第1段（最上位） -->
  <rect x="300" y="40" width="200" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="400" y="75" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">最重要</text>
  <!-- 第2段 -->
  <rect x="200" y="120" width="400" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="400" y="155" text-anchor="middle" font-size="14"
        fill="#334155" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">重要</text>
  <!-- 第3段（最下位） -->
  <rect x="100" y="200" width="600" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
  <text x="400" y="235" text-anchor="middle" font-size="14"
        fill="#334155" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">基盤</text>
</svg>
```

**2-B: 逆ピラミッド型**
下から上へ広がる。ファネル・絞り込みを表現。
- 用途: コンバージョンファネル、フィルタリング工程

---

### 3. 並列カラム型（比較・差分）

**3-A: 2カラム対比型**
左右2列で対照的な概念を比較。中央に区切り線。
- 用途: Before/After、正しい方法/誤った方法、2つの選択肢比較
- 構成: 左カラム＝色A、右カラム＝色B、中央に縦線

```xml
<!-- 2カラム対比型テンプレート -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#ffffff"/>
  <!-- ヘッダー -->
  <text x="400" y="40" text-anchor="middle" font-size="20" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">比較タイトル</text>
  <!-- 左カラム -->
  <rect x="40" y="60" width="350" height="400" rx="8" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
  <text x="215" y="90" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">パターンA</text>
  <!-- 右カラム -->
  <rect x="410" y="60" width="350" height="400" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="585" y="90" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">パターンB</text>
</svg>
```

**3-B: 多カラム並列型**
3列以上で複数の選択肢や段階を横並びに表示。
- 用途: プラン比較、複数ツール比較、段階一覧

---

### 4. フロー型（上下・左右連鎖）

**4-A: 縦フロー型**
上から下へ矢印で繋がるステップ群。順序・手順の表現。
- 用途: ワークフロー、手順書、パイプライン
- 構成: 角丸矩形＋矢印（▼）で連結

```xml
<!-- 縦フロー型テンプレート -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#ffffff"/>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
    </marker>
  </defs>
  <!-- Step 1 -->
  <rect x="150" y="40" width="300" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
  <text x="300" y="75" text-anchor="middle" font-size="14" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">ステップ1</text>
  <!-- 矢印 -->
  <line x1="300" y1="100" x2="300" y2="140" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)"/>
  <!-- Step 2 -->
  <rect x="150" y="150" width="300" height="60" rx="8" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
  <text x="300" y="185" text-anchor="middle" font-size="14" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">ステップ2</text>
</svg>
```

**4-B: 横フロー型**
左から右への連鎖。タイムライン的表現。
- 用途: タイムライン、状態遷移、処理パイプライン

---

### 5. ベン図型（重なり・掛け算関係）

**5-A: 2円ベン図型**
2つの概念が重なる領域を示す。共通点・差異の可視化。
- 用途: スキル掛け合わせ、共通部分の強調、AND条件

```xml
<!-- 2円ベン図型テンプレート -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 400">
  <rect width="700" height="400" fill="#ffffff"/>
  <text x="350" y="40" text-anchor="middle" font-size="20" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">ベン図タイトル</text>
  <!-- 左円 -->
  <circle cx="270" cy="220" r="130" fill="rgba(37,99,235,0.15)" stroke="#2563eb" stroke-width="1.5"/>
  <text x="210" y="220" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#2563eb" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">概念A</text>
  <!-- 右円 -->
  <circle cx="430" cy="220" r="130" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5"/>
  <text x="490" y="220" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#10b981" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">概念B</text>
  <!-- 交差ラベル -->
  <text x="350" y="220" text-anchor="middle" font-size="14" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">共通</text>
</svg>
```

**5-B: 3円ベン図型**
3つの概念の重なりを示す。複合的な関係性。
- 用途: 三位一体モデル、三要素の交差

---

### 6. 分離境界型（親子＋境界線）

**6-A: ゾーン分割型**
大きなコンテナ内を破線・実線で分割し、領域ごとの責務を表現。
- 用途: システム境界、責務分離、レイヤーアーキテクチャ
- 構成: 外枠＋内側に2〜4の区画、境界を破線で区切り

```xml
<!-- ゾーン分割型テンプレート -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#ffffff"/>
  <!-- 外枠 -->
  <rect x="40" y="60" width="720" height="400" rx="8" fill="none" stroke="#6b7280" stroke-width="1.5"/>
  <text x="400" y="40" text-anchor="middle" font-size="20" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">システム全体</text>
  <!-- 境界線 -->
  <line x1="400" y1="60" x2="400" y2="460" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="6"/>
  <!-- ゾーンA -->
  <rect x="60" y="80" width="320" height="360" rx="8" fill="#dbeafe" stroke="none"/>
  <text x="220" y="110" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#2563eb" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">ゾーンA</text>
  <!-- ゾーンB -->
  <rect x="420" y="80" width="320" height="360" rx="8" fill="#d1fae5" stroke="none"/>
  <text x="580" y="110" text-anchor="middle" font-size="16" font-weight="bold"
        fill="#10b981" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">ゾーンB</text>
</svg>
```

**6-B: 入れ子コンテナ型**
外側のコンテナの中に内側コンテナがネスト。包含関係の表現。
- 用途: スコープ、名前空間、環境構成（本番⊃ステージング⊃開発）

---

## SVG生成ルール

### 必須構造

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">
  <!-- 背景 -->
  <rect width="{width}" height="{height}" fill="#ffffff"/>
  
  <!-- defs: マーカー、グラデーション等 -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
    </marker>
  </defs>
  
  <!-- タイトル -->
  <text x="{width/2}" y="30" text-anchor="middle" font-size="20" font-weight="bold"
        fill="#1e293b" font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif">{タイトル}</text>
  
  <!-- コンテンツ -->
  <!-- ... -->
</svg>
```

### viewBox サイズ目安

| パターン | 推奨 viewBox |
|---------|-------------|
| ハブ型 | `0 0 800 600` |
| ピラミッド型 | `0 0 800 500` |
| 並列カラム型 | `0 0 800 500` |
| フロー型（縦） | `0 0 600 700` |
| フロー型（横） | `0 0 900 400` |
| ベン図型 | `0 0 700 400` |
| 分離境界型 | `0 0 800 500` |

### チェックリスト

SVG生成後、以下を必ず確認すること:

- [ ] `xmlns="http://www.w3.org/2000/svg"` が設定されている
- [ ] 背景が `#ffffff` の `<rect>` で始まっている
- [ ] すべてのテキストに `font-family="'Hiragino Sans','Yu Gothic','Meiryo',sans-serif"` が指定されている
- [ ] 色はカラーパレットの6色のみ使用している
- [ ] 角丸は `rx="8"` で統一されている
- [ ] 罫線は `stroke-width="1.5"` で統一されている
- [ ] 囲み背景は各アクセント色の15%透過相当の淡色を使用している
- [ ] テキストが矩形や円からはみ出していない
- [ ] 要素が viewBox の端に重なっていない（40px 以上の余白）
- [ ] 接続線には必要に応じて矢印マーカーが付いている
- [ ] 日本語テキストが正しくエンコードされている

---

## 使用例

ユーザー: 「CI/CDパイプラインの図解を作って」

→ **フロー型（縦 4-A）** を選択し、以下のステップで構成:
1. コードプッシュ（青）
2. ビルド（青）
3. テスト（緑: 成功 / 赤: 失敗の分岐）
4. デプロイ（緑）

ユーザー: 「マイクロサービスの全体構成図がほしい」

→ **ハブ型（1-A 放射ハブ）** を選択し、中央にAPI Gatewayを配置、周辺に各サービスを展開

ユーザー: 「REST vs GraphQL の比較図を作って」

→ **並列カラム型（3-A 2カラム対比）** を選択し、左にREST、右にGraphQLの特徴を並列表示
