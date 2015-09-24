# simple-tpl
A simple template tool for rendering templates by json data
#Examples
```javascript
  var tpl = require('simple-tpl');
  var data = {
    name: "jack",
    site: "http://github.com/lukywong"
  }
  var template = "Hello {{name}}, my site is {{site}}"; 
  var rendered = tpl.render(template, data); 
  // Hello jack, my site is http://github.com/lukywong
  
```
