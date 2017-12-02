This installation is optimized for Linux operator system only !

# Software

## Requirements

You need to have :
- Libapache2-mod-php & PHP 7
- Apache2
- MySQL
- PHPMyAdmin

(you can notice the acronym LAMP like Wamp (Windows) or Mamp (MacOS))

## Follow the steps !

### 1. Apache
/!\ You need to free Port 80 of your localhost /!\

Installation of apache :

`sudo apt install apache2`


Now, test [apache http://127.0.0.1/](http://127.0.0.1/)

Delete default file :

`sudo rm /var/www/html/index.html`

### 2. PHP

Installation of a standard use of PHP :

`sudo apt install php libapache2-mod-php`

If you want to test PHP :

`nano ~/test.php`

Put in file :
```
<?php
   phpinfo();
?>
```

CTRL+X, type y (or o if your french) and press ENTER.

Then, move `test.php` here :

`sudo mv ~/test.php /var/www/html`

And test [here http://127.0.0.1/test](http://127.0.0.1//test).

It works ? Ok delete it :

`sudo rm /var/www/html/test.php`

### 3. MySQL

/!\ To avoid MySQL password problem, install it by unix command (just continue to follow instructions) /!\

`sudo apt install mysql-server`

After a few moment, it will ask you to type a password, just write _root_ and it's done.

Test MySQL :

`mysql -u root -p`

(It ask password, this one _root_)

MySQL prompt show up, then exit it :

`exit ;`

### 4. PHPMyAdmin

Install PHPMyAdmin :

`sudo apt install phpmyadmin`

It will ask you configuration web server, select apache2 (TAB) and press ENTER.

Then another window inform 'phpmyadmin configuration', and after press ENTER, select YES and for password type _root_ (if you set _root_ in previous steps).

Reboot your computer and test [PHPMyAdmin http://127.0.0.1/phpmyadmin/](http://127.0.0.1/phpmyadmin/)

/!\ If you have dependancies problems /!\

`sudo apt install php-mbstring php-gettext`

Then reboot computer and test [PHPMyAdmin http://127.0.0.1/phpmyadmin/](http://127.0.0.1/phpmyadmin/)


Now let's proceed [configuration](https://github.com/MaitreManuel/inkrest/blob/master/docs/CONFIGURATION.md) !
