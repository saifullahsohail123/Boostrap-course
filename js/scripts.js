$(document).ready(function()
{
  $('[data-toggle="tooltip"]').tooltip();

});

$(document).ready(function()
{
$('[data-toggle="popover"]').popover();

});

$(document).ready(function()
{
$('#mycarousel').carousel({interval: 1000});
$('#carouselButton').click(function()
{
    if($('#carouselButton').children('span').hasClass('fa-play'))
    {
        $('#mycarousel').carousel('cycle'); 
        $('#carouselButton').children('span').removeClass('fa-play');
        $('#carouselButton').children('span').addClass('fa-pause');
    }



    else if($('#carouselButton').children('span').hasClass('fa-pause'))
    {
        $('#mycarousel').carousel('pause'); 
        $('#carouselButton').children('span').removeClass('fa-pause');
        $('#carouselButton').children('span').addClass('fa-play');
    }

    



    });
    


});



   $(document).ready(function(){

    $('#loginbutton').click(function()
    {
        $('#loginModal').modal('show');

    });


   });
   


    $(document).ready(function(){
 
     $('#reserveButton').click(function()
     {
         $('#reserveModal').modal('show');
 
     });
 
 
    });
    


    $(document).ready(function()
    {

    $('.modal-header').children('button').click(function()
    {
     $('#loginModal').modal('hide');
     $('#reserveModal').modal('hide');
    });    

    });