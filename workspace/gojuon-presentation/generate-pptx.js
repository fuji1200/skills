const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Claude';
    pptx.title = '五十音分析';
    pptx.subject = 'Japanese Gojuon Analysis';

    // Color palette
    const colors = {
        darkNavy: '1C2833',
        vermillion: 'E74C3C',
        cream: 'FAF9F6',
        charcoal: '2C3E50',
        lightGray: 'BDC3C7',
        mediumGray: '7F8C8D',
        white: 'FFFFFF',
        lightBg: 'ECF0F1',
        blue: '3498DB'
    };

    // Slide 1: Title
    let slide1 = pptx.addSlide();
    slide1.background = { color: colors.darkNavy };
    slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: colors.vermillion } });
    slide1.addText('五十音分析', { x: 0.5, y: 2, w: 9, h: 1.2, fontSize: 72, bold: true, color: colors.white, align: 'center' });
    slide1.addText('Japanese Gojuon Analysis', { x: 0.5, y: 3.3, w: 9, h: 0.5, fontSize: 24, color: colors.lightGray, align: 'center' });
    slide1.addText('日本語の音韻体系を理解する', { x: 0.5, y: 4.8, w: 9, h: 0.3, fontSize: 14, color: colors.mediumGray, align: 'center' });

    // Slide 2: What is Gojuon
    let slide2 = pptx.addSlide();
    slide2.background = { color: colors.cream };
    slide2.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.0, fill: { color: colors.darkNavy } });
    slide2.addText('五十音とは', { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 32, bold: true, color: colors.white });

    slide2.addText('概要', { x: 0.5, y: 1.3, w: 4, h: 0.4, fontSize: 22, bold: true, color: colors.vermillion });
    slide2.addText('五十音（ごじゅうおん）は、日本語の仮名文字を母音と子音の組み合わせで整理した音節表です。',
        { x: 0.5, y: 1.8, w: 4.5, h: 0.8, fontSize: 14, color: colors.charcoal, valign: 'top' });

    slide2.addText('特徴', { x: 0.5, y: 2.8, w: 4, h: 0.4, fontSize: 22, bold: true, color: colors.vermillion });
    slide2.addText('5つの母音と10の子音行から構成され、合計46の基本音節があります。\n\n平仮名と片仮名の両方に適用される体系的な配列です。',
        { x: 0.5, y: 3.3, w: 4.5, h: 1.2, fontSize: 14, color: colors.charcoal, valign: 'top' });

    slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 1.8, w: 4, h: 1.5, fill: { color: colors.darkNavy }, rectRadius: 0.15 });
    slide2.addText('あいうえお', { x: 5.5, y: 2.2, w: 4, h: 0.8, fontSize: 36, color: colors.white, align: 'center' });

    // Slide 3: Structure
    let slide3 = pptx.addSlide();
    slide3.background = { color: colors.cream };
    slide3.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.0, fill: { color: colors.darkNavy } });
    slide3.addText('五十音表の構造', { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 32, bold: true, color: colors.white });

    const tableHeader = [
        [
            { text: '', options: { fill: { color: colors.vermillion }, color: colors.white, bold: true, align: 'center' } },
            { text: 'あ段 (a)', options: { fill: { color: colors.darkNavy }, color: colors.white, bold: true, align: 'center' } },
            { text: 'い段 (i)', options: { fill: { color: colors.darkNavy }, color: colors.white, bold: true, align: 'center' } },
            { text: 'う段 (u)', options: { fill: { color: colors.darkNavy }, color: colors.white, bold: true, align: 'center' } },
            { text: 'え段 (e)', options: { fill: { color: colors.darkNavy }, color: colors.white, bold: true, align: 'center' } },
            { text: 'お段 (o)', options: { fill: { color: colors.darkNavy }, color: colors.white, bold: true, align: 'center' } }
        ]
    ];

    const gojuonRows = [
        ['あ行', 'あ', 'い', 'う', 'え', 'お'],
        ['か行', 'か', 'き', 'く', 'け', 'こ'],
        ['さ行', 'さ', 'し', 'す', 'せ', 'そ'],
        ['た行', 'た', 'ち', 'つ', 'て', 'と'],
        ['な行', 'な', 'に', 'ぬ', 'ね', 'の'],
        ['は行', 'は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['ま行', 'ま', 'み', 'む', 'め', 'も'],
        ['や行', 'や', '', 'ゆ', '', 'よ'],
        ['ら行', 'ら', 'り', 'る', 'れ', 'ろ'],
        ['わ行', 'わ', '', '', '', 'を']
    ];

    const tableData = tableHeader.concat(gojuonRows.map(row => [
        { text: row[0], options: { fill: { color: colors.lightBg }, bold: true, align: 'center', fontSize: 11 } },
        { text: row[1], options: { align: 'center', fontSize: 16 } },
        { text: row[2], options: { align: 'center', fontSize: 16 } },
        { text: row[3], options: { align: 'center', fontSize: 16 } },
        { text: row[4], options: { align: 'center', fontSize: 16 } },
        { text: row[5], options: { align: 'center', fontSize: 16 } }
    ]));

    slide3.addTable(tableData, {
        x: 1.5, y: 1.2, w: 7, h: 3.8,
        colW: [0.8, 1.1, 1.1, 1.1, 1.1, 1.1],
        border: { pt: 0.5, color: colors.lightGray },
        fontFace: 'Arial',
        color: colors.charcoal
    });

    // Slide 4: Vowels
    let slide4 = pptx.addSlide();
    slide4.background = { color: colors.cream };
    slide4.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.0, fill: { color: colors.darkNavy } });
    slide4.addText('母音（ぼいん）の分析', { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 32, bold: true, color: colors.white });
    slide4.addText('日本語の5つの母音は、全ての音節の基礎となります。', { x: 0.5, y: 1.15, w: 9, h: 0.3, fontSize: 14, color: colors.charcoal });

    const vowels = [
        { kana: 'あ', romaji: 'a', desc: '口を大きく開く' },
        { kana: 'い', romaji: 'i', desc: '口を横に引く' },
        { kana: 'う', romaji: 'u', desc: '唇を丸める' },
        { kana: 'え', romaji: 'e', desc: '口を半開き' },
        { kana: 'お', romaji: 'o', desc: '唇を丸く突出' }
    ];

    vowels.forEach((v, i) => {
        const x = 0.4 + i * 1.9;
        slide4.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.5, w: 1.7, h: 1.5, fill: { color: colors.white },
            shadow: { type: 'outer', blur: 3, offset: 2, angle: 45, opacity: 0.2 } });
        slide4.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.5, w: 1.7, h: 0.05, fill: { color: colors.vermillion } });
        slide4.addText(v.kana, { x: x, y: 1.6, w: 1.7, h: 0.6, fontSize: 32, bold: true, color: colors.darkNavy, align: 'center' });
        slide4.addText(v.romaji, { x: x, y: 2.15, w: 1.7, h: 0.3, fontSize: 16, bold: true, color: colors.vermillion, align: 'center' });
        slide4.addText(v.desc, { x: x, y: 2.45, w: 1.7, h: 0.4, fontSize: 10, color: colors.mediumGray, align: 'center' });
    });

    const vowelTypes = [
        { title: '前舌母音', desc: 'い・え：舌の前部が高くなる' },
        { title: '後舌母音', desc: 'う・お：舌の後部が高くなる' },
        { title: '中舌母音', desc: 'あ：舌が中央で低い位置' }
    ];

    vowelTypes.forEach((vt, i) => {
        const x = 0.4 + i * 3.2;
        slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x, y: 3.3, w: 3, h: 1.1, fill: { color: colors.darkNavy }, rectRadius: 0.1 });
        slide4.addText(vt.title, { x: x + 0.1, y: 3.4, w: 2.8, h: 0.4, fontSize: 13, bold: true, color: colors.vermillion });
        slide4.addText(vt.desc, { x: x + 0.1, y: 3.8, w: 2.8, h: 0.5, fontSize: 11, color: colors.white });
    });

    // Slide 5: Consonants
    let slide5 = pptx.addSlide();
    slide5.background = { color: colors.cream };
    slide5.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.0, fill: { color: colors.darkNavy } });
    slide5.addText('子音行の分析', { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 32, bold: true, color: colors.white });

    const leftConsonants = [
        { section: '破裂音・破擦音', items: [
            { label: 'か行', desc: 'k音：無声軟口蓋破裂音' },
            { label: 'た行', desc: 't音：無声歯茎破裂音' },
            { label: 'は行', desc: 'h音：無声声門摩擦音' }
        ]},
        { section: '摩擦音', items: [
            { label: 'さ行', desc: 's音：無声歯茎摩擦音' }
        ]}
    ];

    const rightConsonants = [
        { section: '鼻音', items: [
            { label: 'な行', desc: 'n音：有声歯茎鼻音' },
            { label: 'ま行', desc: 'm音：有声両唇鼻音' }
        ]},
        { section: 'その他', items: [
            { label: 'や行', desc: 'y音：有声硬口蓋接近音' },
            { label: 'ら行', desc: 'r音：有声歯茎弾き音' },
            { label: 'わ行', desc: 'w音：有声両唇軟口蓋接近音' }
        ]}
    ];

    let yOffset = 1.2;
    leftConsonants.forEach(section => {
        slide5.addText(section.section, { x: 0.4, y: yOffset, w: 4.5, h: 0.35, fontSize: 16, bold: true, color: colors.vermillion });
        slide5.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: yOffset + 0.35, w: 4.5, h: 0.02, fill: { color: colors.vermillion } });
        yOffset += 0.45;
        section.items.forEach(item => {
            slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: yOffset, w: 0.8, h: 0.4, fill: { color: colors.darkNavy }, rectRadius: 0.05 });
            slide5.addText(item.label, { x: 0.4, y: yOffset, w: 0.8, h: 0.4, fontSize: 12, color: colors.white, align: 'center', valign: 'middle' });
            slide5.addText(item.desc, { x: 1.3, y: yOffset, w: 3.5, h: 0.4, fontSize: 11, color: colors.charcoal, valign: 'middle' });
            yOffset += 0.5;
        });
        yOffset += 0.15;
    });

    yOffset = 1.2;
    rightConsonants.forEach(section => {
        slide5.addText(section.section, { x: 5.2, y: yOffset, w: 4.5, h: 0.35, fontSize: 16, bold: true, color: colors.vermillion });
        slide5.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: yOffset + 0.35, w: 4.5, h: 0.02, fill: { color: colors.vermillion } });
        yOffset += 0.45;
        section.items.forEach(item => {
            slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: yOffset, w: 0.8, h: 0.4, fill: { color: colors.darkNavy }, rectRadius: 0.05 });
            slide5.addText(item.label, { x: 5.2, y: yOffset, w: 0.8, h: 0.4, fontSize: 12, color: colors.white, align: 'center', valign: 'middle' });
            slide5.addText(item.desc, { x: 6.1, y: yOffset, w: 3.5, h: 0.4, fontSize: 11, color: colors.charcoal, valign: 'middle' });
            yOffset += 0.5;
        });
        yOffset += 0.15;
    });

    // Slide 6: Voiced sounds
    let slide6 = pptx.addSlide();
    slide6.background = { color: colors.cream };
    slide6.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.0, fill: { color: colors.darkNavy } });
    slide6.addText('濁音・半濁音', { x: 0.5, y: 0.25, w: 9, h: 0.5, fontSize: 32, bold: true, color: colors.white });

    // Dakuon section
    slide6.addText('゛', { x: 0.3, y: 1.15, w: 0.5, h: 0.5, fontSize: 32, color: colors.vermillion });
    slide6.addText('濁音（だくおん）', { x: 0.8, y: 1.15, w: 3, h: 0.35, fontSize: 20, bold: true, color: colors.charcoal });
    slide6.addText('清音に濁点を加えた有声音', { x: 0.8, y: 1.5, w: 3, h: 0.25, fontSize: 11, color: colors.mediumGray });

    const dakuon = [
        ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
        ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
        ['だ', 'da'], ['ぢ', 'di'], ['づ', 'du'], ['で', 'de'], ['ど', 'do'],
        ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']
    ];

    dakuon.forEach((d, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const x = 0.3 + col * 0.95;
        const y = 1.85 + row * 0.6;
        slide6.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.85, h: 0.5, fill: { color: colors.white },
            line: { color: colors.vermillion, pt: 0.5, dashType: 'solid' } });
        slide6.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.04, h: 0.5, fill: { color: colors.vermillion } });
        slide6.addText(d[0], { x: x, y: y, w: 0.85, h: 0.32, fontSize: 18, color: colors.darkNavy, align: 'center' });
        slide6.addText(d[1], { x: x, y: y + 0.3, w: 0.85, h: 0.2, fontSize: 8, color: colors.mediumGray, align: 'center' });
    });

    // Handakuon section
    slide6.addText('゜', { x: 5.3, y: 1.15, w: 0.5, h: 0.5, fontSize: 32, color: colors.blue });
    slide6.addText('半濁音（はんだくおん）', { x: 5.8, y: 1.15, w: 3.5, h: 0.35, fontSize: 20, bold: true, color: colors.charcoal });
    slide6.addText('は行に半濁点を加えた音', { x: 5.8, y: 1.5, w: 3.5, h: 0.25, fontSize: 11, color: colors.mediumGray });

    const handakuon = [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']];

    handakuon.forEach((h, i) => {
        const x = 5.3 + i * 0.85;
        const y = 1.85;
        slide6.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.75, h: 0.5, fill: { color: colors.white },
            line: { color: colors.blue, pt: 0.5, dashType: 'solid' } });
        slide6.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.04, h: 0.5, fill: { color: colors.blue } });
        slide6.addText(h[0], { x: x, y: y, w: 0.75, h: 0.32, fontSize: 18, color: colors.darkNavy, align: 'center' });
        slide6.addText(h[1], { x: x, y: y + 0.3, w: 0.75, h: 0.2, fontSize: 8, color: colors.mediumGray, align: 'center' });
    });

    slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 2.5, w: 4.3, h: 0.7, fill: { color: colors.darkNavy }, rectRadius: 0.1 });
    slide6.addText('半濁音は無声両唇破裂音[p]で、は行の[h]とは調音位置が異なります。',
        { x: 5.4, y: 2.6, w: 4.1, h: 0.5, fontSize: 11, color: colors.white });

    // Slide 7: Summary
    let slide7 = pptx.addSlide();
    slide7.background = { color: colors.darkNavy };
    slide7.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: colors.vermillion } });
    slide7.addText('まとめ', { x: 0.5, y: 0.4, w: 9, h: 0.6, fontSize: 36, bold: true, color: colors.white, align: 'center' });

    const summaryItems = [
        { num: '1', title: '基本構造', desc: '5母音 × 10子音行 = 46基本音節（欠落音あり）' },
        { num: '2', title: '拡張音', desc: '濁音20音 + 半濁音5音で音の多様性を実現' },
        { num: '3', title: '体系的配列', desc: '音韻論的に整理された表で学習効率が高い' },
        { num: '4', title: '実用性', desc: '辞書順・入力方式の基盤として広く活用' }
    ];

    summaryItems.forEach((item, i) => {
        const x = 0.4 + i * 2.4;
        slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x, y: 1.2, w: 2.2, h: 2.8, fill: { color: colors.white }, rectRadius: 0.1 });
        slide7.addShape(pptx.shapes.OVAL, { x: x + 0.1, y: 1.3, w: 0.5, h: 0.5, fill: { color: colors.vermillion } });
        slide7.addText(item.num, { x: x + 0.1, y: 1.35, w: 0.5, h: 0.4, fontSize: 20, bold: true, color: colors.white, align: 'center' });
        slide7.addText(item.title, { x: x + 0.1, y: 1.95, w: 2, h: 0.4, fontSize: 16, bold: true, color: colors.darkNavy });
        slide7.addText(item.desc, { x: x + 0.1, y: 2.4, w: 2, h: 1.4, fontSize: 12, color: colors.charcoal, valign: 'top' });
    });

    slide7.addText('五十音は日本語学習の基礎であり、言語の体系を理解する鍵です',
        { x: 0.5, y: 4.5, w: 9, h: 0.3, fontSize: 13, color: colors.mediumGray, align: 'center' });

    // Save presentation
    const outputPath = '/home/user/skills/workspace/gojuon-presentation/gojuon-analysis.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation created: ${outputPath}`);
}

createPresentation().catch(console.error);
