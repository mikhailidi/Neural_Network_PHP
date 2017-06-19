<?php
    include '../functions.php';
    include '../config.php';


    $cities = array(
        'wrocław' => array(
            'kraków' => '270',
            'warszawa' => '347',
            'gdańsk' => '549',
            'szczecin' => '320'
        ),
        'kraków' => array(
            'wrocław' => '270',
            'warszawa' => '294',
            'gdańsk' => '581',
            'szczecin' => '642'
        ),
        'warszawa' => array(
            'wrocław' => '347',
            'kraków' => '294',
            'gdańsk' => '416',
            'szczecin' => '572'
        ),
        'gdańsk' => array(
            'wrocław' => '549',
            'kraków' => '581',
            'warszawa' => '416',
            'szczecin' => '346'
        ),
        'szczecin' => array(
            'wrocław' => '320',
            'kraków' => '642',
            'warszawa' => '572',
            'gdańsk' => '346'
        )
    );

    if (mp_isset($_GET['start']) && mp_isset($_GET['start_point']) && mp_isset($_GET['finish_points'])){
        //pr($cities);
        $finish_points = explode(',', $_GET['finish_points'][0]);
        //pr($finish_points);
        $answers = array();

        $points = array();

        for ($i = 0; $i < sizeof($finish_points); $i++){
            $distance = $cities[$_GET['start_point']][$finish_points[$i]];
            $points[] = array(
                'distance' => $distance,
                'city' => $finish_points[$i]
            );
        }
        sort($points);
        $answers[] = array(
            'distance' => $points[0]['distance'],
            'city' => $points[0]['city']
        );
        unset($points[0]);
        $new_points = array();
        //pr($new_points);
        //pr($points);
        sort($points);
        //pr($points);
        for ($i = 0; $i<=sizeof($points)+1; $i++){
            $new_points = array();
            for($a = 0;$a<sizeof($points);$a++){
                //echo $a;
                $distance = $cities[end($answers)['city']][$points[$a]['city']];
                //echo 'From '.end($answers)['city'].' to '.$points[$a]['city'].' distance = '.$distance.'<br>';
                $new_points[] = array(
                    'distance' => $distance,
                    'city' => $points[$a]['city']
                );
                //echo '<p></p>';
            }
            //echo 'points';
            //pr($points);
            sort($new_points);
            //pr($new_points);
            //echo '<p>ANSWER IS '.$new_points[0]['city'].' </p>';
            $an = (!empty($new_points[0]['distance'])) ? $new_points[0] : $new_points[1];
            $answers[] = $an;
            $elem = end($answers)['city'];
            foreach ($points as $k=>$v){
                if ($v['city'] == $elem){
                    //pr($points);
                    //echo 'City: '.$v['city'].' number numer = '.$k.'<br>';
                    unset($points[$k]);
                    //pr($points);
                }
            }
            sort($points);
            //$points = array_values(array_filter($points, function($e) { return $e != end($ansrews); }));
        }


        
        $a = NULL;
        $a .= '[';
        for ($i=0;$i<sizeof($answers);$i++){
            $a .= '{"distance" :"'.$answers[$i]['distance'].'", "city" :"'.$answers[$i]['city'].'"},';
        }
        $a = rtrim($a, ',');
        $a .= ']';
        echo $a;
        //echo json_encode($answers);








    }