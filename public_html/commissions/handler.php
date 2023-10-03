<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../assets/vendor/autoload.php";

use FormGuide\Handlx\FormHandler;

$pp = new FormHandler(); 

$validator = $pp->getValidator();
$validator->field('EMAIL')->isRequired()->isEmail();
$validator->field('REFS')->isRequired();
$validator->field('INFO')->maxLength(500);
$validator->field('TOS')->isRequired();

$pp->sendEmailTo('evulbad@gmail.com'); // ← Your email here

echo $pp->process($_POST);
?>