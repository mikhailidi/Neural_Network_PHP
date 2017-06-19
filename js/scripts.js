$(document).ready(function () {
    function showSubMenu(menu) {
        menu.show();
    }

    function compareNumbers(a, b) {
      return a - b;
    }

    function setStartPoint(dataCityName){
        var ul = $('#start_points ul');
        $('#finish_points ul li[data-city-name="'+dataCityName+'"]').remove();
        ul.find('li').remove();
        ul.append('<li data-city-name="'+dataCityName+'">'+dataCityName+'</li>');
    }

    function setFinishPoint(dataCityName) {
        var ul = $('#finish_points ul');
        ul.find('li[data-city-name="null"]').remove();

        if (ul.find('li[data-city-name="'+dataCityName+'"]').length != 1){
            ul.append('<li data-city-name="'+dataCityName+'">'+dataCityName+' <i class="fa fa-times" aria-hidden="true"></i></li>')
        } else {
            ul.find('li[data-city-name="'+dataCityName+'"]').remove();
        }

        if ($('#start_points ul').find('li[data-city-name="'+dataCityName+'"]').length == 1){
            $('#start_points ul').find('li[data-city-name="'+dataCityName+'"]').remove();
        }


    }

    var cities = {
      "wrocław": {
          "warszawa": 347,
          "kraków": 270,
          "gdańsk": 549,
          "szczecin": 320
      },
        "kraków": {
            "wrocław": 270,
            "warszawa":294,
            "gdańsk": 581,
            "szczecin": 642
        },
        "warszawa": {
            "wrocław":347,
            "kraków": 294,
            "gdańsk": 416,
            "szczecin": 572
        },
        "gdańsk": {
            "wrocław": 549,
            "kraków": 581,
            "warszawa": 416,
            "szczecin": 346
        },
        "szczecin": {
            "wrocław": 320,
            "kraków": 642,
            "warszawa": 572,
            "gdańsk": 346
        }
    };


    $('.city').on('click', function () {
        var menu = $(this).find('ul.options');
        menu.toggle();
        $(this).toggleClass('opened');
    });

    $('[data-target="set_start_point"]').on('click', function () {
        var div = $(this).parent().parent();
        var city_name = div.data('city-name');

        if (div.hasClass('finish_point')){
            div.removeClass('finish_point');
        }

        $('.city').each(function () {
           if ($(this).hasClass('start_point')){
               $(this).removeClass('start_point');
           }
        });

        setStartPoint(city_name);
        div.toggleClass('start_point');
    });

    $('[data-target="set_finish_point"]').on('click', function () {
        var div = $(this).parent().parent();

        if (div.hasClass('start_point')){
            div.removeClass('start_point');
        }


        setFinishPoint(div.data('city-name'));
        div.toggleClass('finish_point');
    });

    $(document).on('click','.mp_table i', function () {
        var li = $(this).parent();
        var ul = li.parent();


        $('div[data-city-name="'+li.data('city-name')+'"]').removeClass('finish_point');
        li.remove();

        if (!ul.find('li').length){
            ul.append('<li data-city-name="null">Punkt docelowy jeszcze nie został wybrany </li>');
        }
    });



    $('.count').on('click', function () {
        var ul_start = $('#start_points ul');
        var ul_finish = $('#finish_points ul');
        var start_point = ul_start.find('li').data('city-name');
        var finis_points = [];

        ul_finish.find('li').each(function () {
            finis_points.push($(this).data('city-name'));
        });
        console.log('getData/algorithm.php?start=1&start_point='+start_point+'&finish_points[]='+finis_points);

        
        $.get('getData/algorithm.php?start=1&start_point='+start_point+'&finish_points[]='+finis_points, function () {
        }, "json").done(function (data) {
            var table = $('.results');
            table.find('tr').remove();
            console.log(data);
            for (i=0; i<data.length; i++){
                if (i==0){
                    table.append(
                        '<tr>' +
                            '<th>'+start_point+'</th>' +
                        '</tr>'+
                        '<tr class="arrow">' +
                            '<td>' +
                                '<i class="fa fa-long-arrow-down" aria-hidden="true"></i>' +
                                ''+data[i].distance+'' +
                            '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>'+data[i].city+'</th>' +
                        '</tr>'
                    );
                } else {
                    table.append(
                        '<tr class="arrow">' +
                            '<td>' +
                            '<i class="fa fa-long-arrow-down" aria-hidden="true"></i>' +
                            ''+data[i].distance+'' +
                            '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>'+data[i].city+'</th>' +
                        '</tr>'
                    );
                }
            }
        
        }).fail(function (d, textStatus, error) {
            console.error("getJSON failed, status: " + textStatus + ", error: "+error);
        });

        // var destinations = [];
        // for (i=0;i<finis_points.length;i++){
        //     var point = finis_points[i];
        //     destinations.push(cities[start_point][point]);
        // }
        //console.log(destinations.sort(compareNumbers));
    });
});