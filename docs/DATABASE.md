# Database

## Requirements

You need to have install PHPMyAdmin and MySQL.
Refer to this [doc](https://github.com/MaitreManuel/inkrest/blob/master/docs/SOFTWARE.md).

## Installation

You need to set-up a database in phpMyAdmin, so follow this instructions :

* In this folder `apps/ApiBundle/db/`, you'll find this file `inkrest.sql`
* Go to your [phpMyAdmin](http://localhost/phpmyadmin/)
* Click on "New databases" on left-top
* Call it `inkrest` and choose in interclassement utf8 -> utf8_bin
* Click on "Create"
* Then click on your blog database in left panel and go to "SQL" tab
* Copy all content of `inkrest.sql` and paste it in "SQL" field
* Click on "Execute"
* Done
