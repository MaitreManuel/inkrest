## Permission problem

In `www/` folder, do this (choose option relative to your problem)

- if your system can do `chmod +a`, then write in your terminal :

```
HTTPDUSER=`ps aux | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`

sudo chmod +a "$HTTPDUSER allow delete,write,append,file_inherit,directory_inherit" var
sudo chmod +a "`whoami` allow delete,write,append,file_inherit,directory_inherit" var
```

- if your system can't do `chmod +a` everywhere and get an error, then write this :

```
HTTPDUSER=`ps aux | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`

sudo setfacl -R -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX var
sudo setfacl -dR -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX var
```

- or if you really have a shitty system, do this :

```
chmod 777 -R var
```

And go check if all good [here](http://localhost/inkrest/apps/www/web/app_dev.php).
