function displayAllMenu(){
    $.getJSON("data/menu.json", function(result){
        var menu = result.menu;
        $.each(menu,function(i, data){
            $('#menu-list').append('<div class="col-md-4 mb-4"><div class="card"><img src="img/'+data.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+data.name+'</h5><p class="card-text">'+data.description+'</p><h5 class="card-title">Rp. '+data.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>');
        });
    });
}

function SortMenu(command="asc"){
    return function MenuSort(a,b){
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        var compare = 0;
        if (nameA > nameB){
            compare = 1;
        } else if (nameA < nameB){
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}

function SortPrice(command="asc"){
    return function PriceSort(a,b){
        var priceA = a.price;
        var priceB = b.price;
        var compare = 0;
        if (priceA > priceB){
            compare = 1;
        }else if(priceA < priceB){
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}
var menus = [];

$.getJSON('data/menu.json',function(results){
    var menu = results.menu;
    $.each(menu,function(i,data){
        menus.push(data);
    });
});

displayAllMenu();

$('.nav-item').on('click',function(){
    $('.nav-item').removeClass('active');
    $(this).addClass("active");
    $('button').text("Select to sort the content ");
    $('.dropdown-item').removeClass('active');
    var category = $.trim($(this).text());
    $('h1').html(category);
    if (category == "All Menu"){
        displayAllMenu();
    }
    $.getJSON("data/menu.json",function(result){
        var menu = result.menu;
        var content = "";
        $.each(menu, function(i, data){
            if (data.category == category){
                content += '<div class="col-md-4 mb-4"><div class="card"><img src="img/'+data.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+data.name+'</h5><p class="card-text">'+data.description+'</p><h5 class="card-title">Rp. '+data.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>';
            }else if (category == "All Menu"){
                $.getJSON("data/menu.json", function(result){
                    var menu = result.menu;
                    $.each(menu,function(i, data){
                        $('#menu-list').append('<div class="col-md-4 mb-4"><div class="card"><img src="img/'+data.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+data.name+'</h5><p class="card-text">'+data.description+'</p><h5 class="card-title">Rp. '+data.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>');
                    });
                });
                return false;
            }
        });
        $('#menu-list').html(content);
    });
});

$('.dropdown-menu a').on('click',function(){
    var tempmenu = [];
    var content = "";
    $('button').text($(this).text());
    $('.dropdown-item').removeClass('active');
    $(this).addClass('active');
    var category = $("h1").text();
    for (var i = 0; i < menus.length; i ++){
        if (menus[i].category == category){
            tempmenu.push(menus[i]);
        }else if (category == "All Menu"){
            tempmenu.push(menus[i]);
        }
    }
    var sort = $(this).text().toLowerCase();
    if (sort == "nama a-z"){
        tempmenu = tempmenu.sort(SortMenu("asc"));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-4 mb-4"><div class="card"><img src="img/'+tempmenus.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+tempmenus.name+'</h5><p class="card-text">'+tempmenus.description+'</p><h5 class="card-title">Rp. '+tempmenus.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>';
        })
    }else if (sort == "nama z-a"){
        tempmenu = tempmenu.sort(SortMenu("desc"));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-4 mb-4"><div class="card"><img src="img/'+tempmenus.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+tempmenus.name+'</h5><p class="card-text">'+tempmenus.description+'</p><h5 class="card-title">Rp. '+tempmenus.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>';
        })
    }else if (sort == "harga termurah"){
        tempmenu = tempmenu.sort(SortPrice('asc'));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-4 mb-4"><div class="card"><img src="img/'+tempmenus.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+tempmenus.name+'</h5><p class="card-text">'+tempmenus.description+'</p><h5 class="card-title">Rp. '+tempmenus.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>';
        })
    }else if (sort == "harga termahal"){
        tempmenu = tempmenu.sort(SortPrice("desc"));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-4 mb-4"><div class="card"><img src="img/'+tempmenus.picture+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+tempmenus.name+'</h5><p class="card-text">'+tempmenus.description+'</p><h5 class="card-title">Rp. '+tempmenus.price+'</h5><a href="#" class="btn btn-primary">Order Now !</a></div></div></div>';
        })
    }
    $('#menu-list').html(content);
});