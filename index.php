<?php
    error_reporting(-1);
    header('Content-type: text/html; charset=utf-8');
    session_start();

    //SITE CONFIG
    include_once './functions.php';
    include_once  './config.php';
    include_once './variables.php';
    
    //ROUTER
    //$DB = mysqli_connect(Config::$DB_LOCAL, Config::$DB_LOGIN, Config::$DB_PASS, Config::$DB_NAME);
    //mysqli_set_charset($DB,'utf8');
    include Config::$CONT.'/allpages.php';
    include Config::$CONT.'/'.$_GET['module'].'/'.$_GET['page'].'.php';
    include 'skin/'.Config::$SKIN.'/index.tpl';