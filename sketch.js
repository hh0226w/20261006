// ============================================================
// 國高中國文測驗網站
// p5.js - sketch.js
// ============================================================


// ============================================================
// 1. 題目資料
// ============================================================

// 每一題都有：
// question  = 題目
// options   = 四個選項
// answer    = 正確答案的編號
// explanation = 答案解析

const quiz = [

  {
    question: "「學而時習之，不亦說乎？」出自哪一本經典？",

    options: [
      "《論語》",
      "《孟子》",
      "《莊子》",
      "《史記》"
    ],

    answer: 0,

    explanation:
      "這句話出自《論語．學而》，意思是學習之後經常複習，是一件令人愉快的事情。"
  },


  {
    question: "下列哪一個成語最適合形容做事情非常仔細？",

    options: [
      "馬馬虎虎",
      "一絲不苟",
      "粗枝大葉",
      "得過且過"
    ],

    answer: 1,

    explanation:
      "「一絲不苟」形容做事非常認真仔細，一點也不馬虎。"
  },


  {
    question: "「海內存知己，天涯若比鄰」的作者是誰？",

    options: [
      "李白",
      "杜甫",
      "王勃",
      "白居易"
    ],

    answer: 2,

    explanation:
      "這句詩出自唐代詩人王勃的〈送杜少府之任蜀州〉。"
  },


  {
    question: "「朱門酒肉臭，路有凍死骨」中的「朱門」借代什麼？",

    options: [
      "皇宮",
      "富貴人家",
      "普通百姓",
      "軍隊"
    ],

    answer: 1,

    explanation:
      "「朱門」原本是紅色的大門，在這句詩中借代富貴人家。"
  },


  {
    question: "「先天下之憂而憂，後天下之樂而樂」表現出什麼思想？",

    options: [
      "追求個人享樂",
      "以天下為己任",
      "逃避社會責任",
      "追求個人財富"
    ],

    answer: 1,

    explanation:
      "范仲淹透過這句話表達以天下百姓為重，願意承擔社會責任的思想。"
  },


  {
    question: "下列「行」字的讀音與其他三個不同的是哪一個？",

    options: [
      "行走",
      "行動",
      "銀行",
      "旅行"
    ],

    answer: 2,

    explanation:
      "「銀行」的「行」讀作ㄏㄤˊ，其他三個「行」都讀作ㄒㄧㄥˊ。"
  },


  {
    question: "「桃李不言，下自成蹊」最接近下列哪一個意思？",

    options: [
      "花朵非常美麗",
      "品德高尚的人自然受到尊敬",
      "道路非常難走",
      "桃樹和李樹很容易生長"
    ],

    answer: 1,

    explanation:
      "這句話比喻品德高尚的人，即使不宣傳自己，也自然會受到別人的敬重。"
  },


  {
    question: "「雪中送炭」最接近下列哪一個意思？",

    options: [
      "錦上添花",
      "落井下石",
      "助人為樂",
      "袖手旁觀"
    ],

    answer: 2,

    explanation:
      "「雪中送炭」比喻在別人最需要幫助的時候給予援助。"
  },


  {
    question: "「不以物喜，不以己悲」出自哪一篇文章？",

    options: [
      "〈岳陽樓記〉",
      "〈醉翁亭記〉",
      "〈出師表〉",
      "〈赤壁賦〉"
    ],

    answer: 0,

    explanation:
      "這句話出自范仲淹的〈岳陽樓記〉，表現不因外在環境或個人遭遇而過度悲喜的態度。"
  },


  {
    question: "下列哪一句使用了「譬喻」修辭？",

    options: [
      "小明今天去上學。",
      "天空下起了大雨。",
      "人生如夢。",
      "弟弟正在吃早餐。"
    ],

    answer: 2,

    explanation:
      "「人生如夢」把「人生」比喻成「夢」，因此使用了譬喻修辭。"
  }

];


// ============================================================
// 2. 測驗狀態
// ============================================================

// 現在正在第幾題
let currentQuestion = 0;

// 目前分數
let score = 0;

// 是否已經回答
let answered = false;

// 使用者選擇的答案
let selectedAnswer = -1;

// 是否已經完成全部測驗
let finished = false;


// ============================================================
// 3. 建立畫布
// ============================================================

function setup() {

  // 建立符合瀏覽器大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 文字水平置中
  textAlign(CENTER, CENTER);

  // 矩形從左上角開始
  rectMode(CORNER);

}


// ============================================================
// 4. 瀏覽器大小改變
// ============================================================

function windowResized() {

  // 當使用者調整瀏覽器大小時
  // 重新設定畫布大小
  resizeCanvas(windowWidth, windowHeight);

}


// ============================================================
// 5. 每一幀執行
// ============================================================

function draw() {

  // 背景
  background(245, 247, 250);


  // 如果測驗完成
  if (finished) {

    drawResult();

  }

  // 如果還沒完成
  else {

    drawQuiz();

  }

}


// ============================================================
// 6. 計算響應式內容寬度
// ============================================================

function getContentWidth() {

  // 左右至少保留 20px
  let widthLimit = width - 40;

  // 最大寬度設定為 760px
  // 避免大螢幕上內容過寬
  return min(widthLimit, 760);

}


// ============================================================
// 7. 顯示測驗畫面
// ============================================================

function drawQuiz() {

  // 取得目前題目
  let q = quiz[currentQuestion];

  // 計算內容寬度
  let contentWidth = getContentWidth();

  // 計算內容左邊的位置
  let contentX = (width - contentWidth) / 2;


  // ========================================================
  // 標題
  // ========================================================

  fill(35);

  // 電腦 30px
  // 手機 25px
  let titleSize = width < 500 ? 25 : 30;

  textSize(titleSize);

  text(
    "國高中國文測驗",
    width / 2,
    40
  );


  // ========================================================
  // 題數
  // ========================================================

  fill(100);

  textSize(16);

  text(
    "第 " +
    (currentQuestion + 1) +
    " / " +
    quiz.length +
    " 題",

    width / 2,
    72
  );


  // ========================================================
  // 題目
  // ========================================================

  fill(30);

  // 手機稍微縮小
  let questionSize = width < 500 ? 18 : 21;

  textSize(questionSize);


  // 題目區域
  let questionY = 105;

  let questionHeight = 65;


  // 題目文字
  text(
    q.question,

    contentX + 10,

    questionY,

    contentWidth - 20,

    questionHeight
  );


  // ========================================================
  // 選項設定
  // ========================================================

  let optionHeight;

  let optionGap;

  let firstOptionY;


  // 手機
  if (width < 500) {

    optionHeight = 48;

    optionGap = 10;

    firstOptionY = 180;

  }

  // 平板與電腦
  else {

    optionHeight = 50;

    optionGap = 12;

    firstOptionY = 180;

  }


  // ========================================================
  // 顯示四個選項
  // ========================================================

  for (let i = 0; i < 4; i++) {

    // 計算選項位置
    let optionY =
      firstOptionY +
      i * (optionHeight + optionGap);


    // ------------------------------------------------------
    // 選項背景顏色
    // ------------------------------------------------------

    if (answered) {

      // 正確答案
      if (i === q.answer) {

        fill(190, 235, 195);

      }

      // 使用者答錯的選項
      else if (i === selectedAnswer) {

        fill(245, 190, 190);

      }

      // 其他選項
      else {

        fill(230);

      }

    }

    // 尚未回答
    else {

      fill(255);

    }


    // ------------------------------------------------------
    // 選項外框
    // ------------------------------------------------------

    stroke(200);

    strokeWeight(1);

    rect(
      contentX,
      optionY,
      contentWidth,
      optionHeight,
      8
    );


    // ------------------------------------------------------
    // 選項文字
    // ------------------------------------------------------

    fill(35);

    noStroke();

    // 固定字體大小
    textSize(width < 500 ? 16 : 18);


    text(
      String.fromCharCode(65 + i) +
      ". " +
      q.options[i],

      contentX + contentWidth / 2,

      optionY + optionHeight / 2
    );

  }


  // ========================================================
  // 如果已經回答，顯示解析
  // ========================================================

  if (answered) {

    // 四個選項的底部位置
    let optionBottom =
      firstOptionY +
      4 * optionHeight +
      3 * optionGap;


    // ------------------------------------------------------
    // 答對 / 答錯
    // ------------------------------------------------------

    let resultY = optionBottom + 25;


    if (selectedAnswer === q.answer) {

      fill(40, 150, 70);

      textSize(20);

      text(
        "✓ 答對了！",
        width / 2,
        resultY
      );

    }

    else {

      fill(190, 50, 50);

      textSize(20);

      text(
        "✗ 答錯了！",
        width / 2,
        resultY
      );

    }


    // ------------------------------------------------------
    // 正確答案
    // ------------------------------------------------------

    fill(50);

    textSize(16);

    text(
      "正確答案：" + q.options[q.answer],

      width / 2,

      resultY + 30
    );


    // ------------------------------------------------------
    // 答案解析標題
    // ------------------------------------------------------

    fill(30);

    textSize(17);

    text(
      "【答案解析】",

      width / 2,

      resultY + 60
    );


    // ------------------------------------------------------
    // 答案解析內容
    // ------------------------------------------------------

    fill(80);

    textSize(width < 500 ? 14 : 16);


    // 解析文字寬度
    let explanationWidth =
      contentWidth - 20;


    text(
      q.explanation,

      contentX + 10,

      resultY + 100,

      explanationWidth,

      65
    );


    // ------------------------------------------------------
    // 下一題按鈕
    // ------------------------------------------------------

    let buttonWidth =
      width < 500 ? 130 : 150;

    let buttonHeight = 44;

    let buttonX =
      width - buttonWidth - 25;


    // 計算按鈕位置
    let buttonY =
      resultY + 155;


    // 如果按鈕超過畫面
    // 就把它固定在畫面下方
    if (buttonY + buttonHeight > height - 15) {

      buttonY =
        height - buttonHeight - 15;

    }


    // 按鈕
    fill(65, 130, 200);

    noStroke();

    rect(
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      8
    );


    // 按鈕文字
    fill(255);

    textSize(16);


    if (currentQuestion === quiz.length - 1) {

      text(
        "查看成績",

        buttonX + buttonWidth / 2,

        buttonY + buttonHeight / 2
      );

    }

    else {

      text(
        "下一題 →",

        buttonX + buttonWidth / 2,

        buttonY + buttonHeight / 2
      );

    }

  }

}


// ============================================================
// 8. 滑鼠點擊
// ============================================================

function mousePressed() {

  // ========================================================
  // 如果在成績頁
  // ========================================================

  if (finished) {

    let buttonWidth =
      min(220, width - 80);

    let buttonHeight = 50;

    let buttonX =
      width / 2 - buttonWidth / 2;

    let buttonY =
      height * 0.65;


    // 判斷是否按下重新測驗
    if (

      mouseX >= buttonX &&

      mouseX <= buttonX + buttonWidth &&

      mouseY >= buttonY &&

      mouseY <= buttonY + buttonHeight

    ) {

      // 全部重設
      currentQuestion = 0;

      score = 0;

      answered = false;

      selectedAnswer = -1;

      finished = false;

    }


    return;

  }


  // ========================================================
  // 如果已經回答
  // ========================================================

  if (answered) {

    // 取得版面
    let contentWidth =
      getContentWidth();

    let contentX =
      (width - contentWidth) / 2;


    // 選項高度
    let optionHeight =
      width < 500 ? 48 : 50;


    // 選項間距
    let optionGap =
      width < 500 ? 10 : 12;


    // 第一個選項
    let firstOptionY = 180;


    // 四個選項底部
    let optionBottom =
      firstOptionY +
      4 * optionHeight +
      3 * optionGap;


    // 答案結果位置
    let resultY =
      optionBottom + 25;


    // 按鈕
    let buttonWidth =
      width < 500 ? 130 : 150;

    let buttonHeight = 44;

    let buttonX =
      width - buttonWidth - 25;

    let buttonY =
      resultY + 155;


    // 如果超過畫面
    if (buttonY + buttonHeight > height - 15) {

      buttonY =
        height - buttonHeight - 15;

    }


    // 判斷是否按下下一題
    if (

      mouseX >= buttonX &&

      mouseX <= buttonX + buttonWidth &&

      mouseY >= buttonY &&

      mouseY <= buttonY + buttonHeight

    ) {


      // 如果還有下一題
      if (currentQuestion < quiz.length - 1) {

        currentQuestion++;

        answered = false;

        selectedAnswer = -1;

      }

      // 如果是最後一題
      else {

        finished = true;

      }

    }


    return;

  }


  // ========================================================
  // 尚未回答 → 檢查四個選項
  // ========================================================

  let contentWidth =
    getContentWidth();

  let contentX =
    (width - contentWidth) / 2;


  let optionHeight =
    width < 500 ? 48 : 50;


  let optionGap =
    width < 500 ? 10 : 12;


  let firstOptionY = 180;


  // 檢查每一個選項
  for (let i = 0; i < 4; i++) {

    let optionY =
      firstOptionY +
      i * (optionHeight + optionGap);


    // 判斷滑鼠是否點到
    if (

      mouseX >= contentX &&

      mouseX <= contentX + contentWidth &&

      mouseY >= optionY &&

      mouseY <= optionY + optionHeight

    ) {

      // 記錄答案
      selectedAnswer = i;

      // 設定為已回答
      answered = true;


      // 如果答對
      if (

        selectedAnswer ===
        quiz[currentQuestion].answer

      ) {

        score += 10;

      }


      break;

    }

  }

}


// ============================================================
// 9. 顯示最後成績
// ============================================================

function drawResult() {

  // ========================================================
  // 標題
  // ========================================================

  fill(35);

  textSize(width < 500 ? 28 : 34);

  text(
    "測驗完成！",

    width / 2,

    height * 0.22
  );


  // ========================================================
  // 分數
  // ========================================================

  fill(50, 110, 190);

  textSize(width < 500 ? 42 : 50);

  text(
    score + " / 100 分",

    width / 2,

    height * 0.35
  );


  // ========================================================
  // 答對題數
  // ========================================================

  fill(50);

  textSize(20);

  text(
    "答對 " +
    score / 10 +
    " / " +
    quiz.length +
    " 題",

    width / 2,

    height * 0.43
  );


  // ========================================================
  // 評語
  // ========================================================

  textSize(19);


  if (score === 100) {

    fill(40, 150, 70);

    text(
      "太厲害了！全部答對！",

      width / 2,

      height * 0.52
    );

  }

  else if (score >= 80) {

    fill(40, 130, 80);

    text(
      "表現很好！繼續保持！",

      width / 2,

      height * 0.52
    );

  }

  else if (score >= 60) {

    fill(180, 130, 30);

    text(
      "不錯喔！再多複習一下！",

      width / 2,

      height * 0.52
    );

  }

  else {

    fill(190, 60, 60);

    text(
      "再接再厲！多複習國文內容！",

      width / 2,

      height * 0.52
    );

  }


  // ========================================================
  // 重新測驗按鈕
  // ========================================================

  let buttonWidth =
    min(220, width - 80);

  let buttonHeight = 50;

  let buttonX =
    width / 2 - buttonWidth / 2;

  let buttonY =
    height * 0.65;


  // 按鈕背景
  fill(65, 130, 200);

  rect(
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight,
    8
  );


  // 按鈕文字
  fill(255);

  textSize(18);

  text(
    "重新測驗",

    width / 2,

    buttonY + buttonHeight / 2
  );

}