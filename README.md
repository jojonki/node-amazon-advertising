Amazon Advertising API Web Service with Node.js
---

This is a web application which uses Amazon's [Product Advertising API](https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html) with Node.js.


How to use?
------
First of all, you need to register Product Advertising API service at Amazon. After that, please create a serucity.js file in the root directory of this project like below.

* security.js
```
 module.exports = {
   awsId     : 'xxxx',
   awsSecret : 'yyy',
   assocId   : 'zzz-22'
 }
```

This repositry does not contain node_modules. So you have to install modules before starting this app.

```
$ npm install
$ node app.js
```

node modules
------
Please see package.json. I use express, ejs and [apac](https://www.npmjs.org/package/apac) npm modules, and also use grunt modules for developping.


LICENSE
------
The MIT License (MIT)

Copyright (c) 2014 jojonki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
