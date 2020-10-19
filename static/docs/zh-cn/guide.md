
# Headline

> An awesome project.

# fff
质能方程$$E = mc^2$$

```html
<ul>
  <li v-for="i in 10">{{ i }}</li>
</ul>
```

<ul>
  <li v-for="i in 11">{{ i }}</li>
</ul>
<script>
  console.log(27333)
  function loadJS( url, callback ){
  
      var script = document.createElement('script'),
  
          fn = callback || function(){};
  
      script.type = 'text/javascript';
  
      
  
      //IE
  
      if(script.readyState){
  
          script.onreadystatechange = function(){
  
              if( script.readyState == 'loaded' || script.readyState == 'complete' ){
  
                  script.onreadystatechange = null;
  
                  fn();
  
              }
  
          };
  
      }else{
  
          //其他浏览器
  
          script.onload = function(){
  
              fn();
  
          };
  
      }
  
      script.src = url;
  
      document.getElementsByTagName('head')[0].appendChild(script);
  
  }
  
   
  
  //用法
  
  setTimeout(function(){
      loadJS('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default',function(){
          console.log(1);
      });
  },2000)
</script>