<?php
    if (isset($_GET['route'])){
        $temp = explode('/', $_GET['route']);

        foreach ($temp as $k=>$v){
            if ($k == 0){
                if (!empty($v)){
                    $_GET['module'] = $v;
                }
            }elseif ($k == 1){
                if (!empty($v)){
                    $_GET['page'] = $v;
                }
            }elseif ($k == 2){
                if (!empty($v)){
                    $_GET['key1'] = $v;
                }
            }elseif ($k == 3){
                if (!empty($v)){
                    $_GET['key2'] = $v;
                }
            }
            unset($_GET['route']);
        }
        //pr($_GET);
    }

    $allowed = array('home','errors');
    if (!isset($_GET['module'])){
        $_GET['module'] = 'home';
    }elseif(!in_array($_GET['module'], $allowed)) {
        header("Location: ".homeURL()."errors/404");
        exit();
    }


    if (!isset($_GET['module'])){
        $_GET['module'] = 'home';
    }
    if (!isset($_GET['page'])) {
        $_GET['page']='main';
    }




?>