# 短網址產生器

使用 Node.js, Express 和 MongoDB 製作的短網址產生器。

## Features

- 使用者輸入原始網址後，可產生一組 5 碼英數組合的短網址。
- 使用者可快速複製短網址。
- 使用者可透過短網址，連到原始網址的網頁。
- 使用者若輸入相同的原始網址，會產生相同的短網址。

## Installation and Execution

1. 在終端機輸入指令將此專案 clone 到本機電腦

```
git clone https://github.com/Lydia-09/Shortener.git
```

2. 安裝相關套件

```
cd Shortener
```

```
npm install
```

3. 匯入種子資料

```
npm run seed
```

4. 執行程式

```
npm run dev
```

終端機顯示 `Express is listening on localhost:3000` 表示啟動完成，請至 http://localhost:3000 使用此專案程式。

## Prerequisites

- Visual Studio Code - Development Environment
- Node.js & npm - JavaScript Runtime Environment
- Express.js - Web Application Framework
- Express-Handlebars - Template Engine
- MongoDB - Document-oriented Database
- Mongoose - MongoDB Object Modeling(ODM)
- body-parser, method-override, connect-flash & express-session - Middleware
