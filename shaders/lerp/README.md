From [this tutorial](https://thebookofshaders.com/05/)

fun with sin
```
//y = abs(sin(x * 1.0 + u_time));
//y = fract(sin(x * 1.0 + u_time));
y = ceil(sin(x + u_time)) + floor(sin(x));
```
