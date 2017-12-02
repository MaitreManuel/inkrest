This installation is optimized for Linux operator system only !

# Configuration

## Requirements

You need to follow the steps of softwares installation [here](https://github.com/MaitreManuel/inkrest/blob/master/docs/SOFTWARE.md) before starting configuration.

You have to download the git repository too !

`cd /var/www/html`

Go to this folder :

And download GitHub repository :

`git clone https://github.com/MaitreManuel/inkrest.git`

## Follow the steps !

### 1. Apache configuration

We will update apache configuration to allow `.htaccess` files.

Go to your apache folder here :

`cd /etc/apache2`

Edit this file :

`sudo nano apache2.conf`

Replace `Directory /var/www` configuration by this lines :

```
<Directory /var/www/>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

### 2. Virtual Hosts configuration

In this step we will create virtual URL to serve all routes in this project.

Go to this folder :

`cd /etc/apache2/sites-available`

And create 3 files :

`sudo touch inkrest.conf api.inkrest.conf admin.inkrest.conf`

Then follow this file edit :

`sudo nano inkrest.conf`, write :
```
<VirtualHost *:80>
    ServerName inkrest.fr
	DocumentRoot /var/www/html/inkrest/apps/SiteBundle/web
	<Directory "/var/www/html/inkrest/apps/SiteBundle/web">
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```

`sudo nano api.inkrest.conf`, write :
```
<VirtualHost *:80>
    ServerName api.inkrest.fr
	DocumentRoot /var/www/html/inkrest/apps/ApiBundle/web
	<Directory "/var/www/html/inkrest/apps/ApiBundle/web">
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```

`sudo nano admin.inkrest.conf`, write :
```
<VirtualHost *:80>
    ServerName admin.inkrest.fr
	DocumentRoot /var/www/html/inkrest/apps/AdminBundle/web
	<Directory "/var/www/html/inkrest/apps/AdminBundle/web">
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```

Then, you need to activate new hosts :
```
sudo a2ensite inkrest.conf
sudo a2ensite api.inkrest.conf
sudo a2ensite admin.inkrest.conf
```

And reload apache :

`sudo service apache2 reload`

And finally :

`sudo nano /etc/hosts`

In your `hosts` file, add :
```
127.0.0.1   api.inkrest.fr
127.0.0.1   admin.inkrest.fr
127.0.0.1   inkrest.fr
```
