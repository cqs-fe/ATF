$(document).ready(function(){
	var baseurl = "http://10.108.226.152:8080/ATFCloud/";
    $("#form").validate({
        rules: {
            username:{
                required: true,
                minlength: 4,
				maxlength: 16,
				remote:{
  				url: baseurl+"userController/checkUser",
  				type:"post"
  				}
            },
            password:{
                required: true,
                minlength: 6,
                maxlength: 16
            },
            repassword:{
                required: true,
                equalTo: "#password"
            },
            reallyname: {
                required: true,
			    minlength: 2,
				maxlength: 6,
            },
			department:{
				required:false
			},
			phonenumber:{
				required:false,
				digits:true,
				minlength: 11,
				maxlength: 11
			},
			number:{
				required:false,
				digits:true,
				minlength: 7,
				maxlength: 7
			},
			email:{
				required:false,
				email:true
			}
        },
        messages:{
            username:{
                required: "用户名不能为空",
                minlength: "用户名的最小长度为4",
				maxlength: "用户名的最大长度为16",
				remote:"该用户名已存在"
			},
			reallyname: {
                required: "姓名不能为空",
				minlength: "姓名最少为2个字",
				maxlength: "姓名最多为6个字"
            },
            password:{
                required: "密码不能为空",
                minlength: "密码长度不能少于6个字符",
                maxlength: "密码长度不能超过16个字符"
            },
            repassword:{
                required: "确认密码不能为空",
                equalTo: "确认密码和密码不一致"
            },

			phonenumber:{
				digits:"请输入合法的手机号码",
				minlength: "请输入合法的手机号码",
				maxlength: "请输入合法的手机号码"
			},
			number:{
				digits:"请输入合法的手机号码",
				minlength: "请输入合法的电话号码",
				maxlength: "请输入合法的电话号码"
			},
			email:{
				email:"请输入合法的电子邮箱"
			}
        },
		success: function(label) {
    // set &nbsp; as text for IE
    	label.html(" ").addClass("valid");
    //label.addClass("valid").text("Ok!")
	}
    });
});
