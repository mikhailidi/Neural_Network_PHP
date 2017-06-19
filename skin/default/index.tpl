<!DOCTYPE html>
<html lang="pl">
<head>
    <title><?php echo Config::$META['title']; ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<!--    <link rel="icon" href="--><?php //homeURL(); ?><!--favicon.ico" type="image/x-icon">-->
    <script src="<?php homeURL(); ?>/vendor/public/jquery/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="<?php homeURL(); ?>/vendor/public/bootstrap/dist/css/bootstrap.min.css">
    <!-- FONTS -->
    <link href="<?php homeURL(); ?>/style/font-awesome.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

    <!-- MY STYLE -->
    <link rel="stylesheet" href="<?php homeURL(); ?>/style/style.css">
</head>
<body>





    <?php include 'skin/'.Config::$SKIN.'/'.$_GET['module'].'/'.$_GET['page'].'.tpl'; ?>





    <!-- SCRIPTS -->
    <script src="<?php homeURL(); ?>/vendor/public/bootstrap/dist/js/bootstrap.min.js"></script>
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<?php homeURL(); ?>/js/scripts.js"></script>

</body>
</html>