jQuery(document).ready(function() {

    $('#loginInput').onclick(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
		var authCode=$(this).find('.authCode').val();
        if(username == '') {
            $(this).find('.error1').fadeOut('fast', function(){
                $(this).css('top', '24%');
            });
            $(this).find('.error1').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
		
        if(password == '') {
            $(this).find('.error2').fadeOut('fast', function(){
                $(this).css('top', '40%');
            });
            $(this).find('.error2').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
		
		if( authCode == '') {
            $(this).find('.error3').fadeOut('fast', function(){
                $(this).css('top', '58%').css('right', '4%')
            });
            $(this).find('.error3').fadeIn('fast', function(){
                $(this).parent().find('.authCode').focus();
            });
            return false;
        }
    });
	   
    $('#form .username,#form  .password,#form  .authCode').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});
