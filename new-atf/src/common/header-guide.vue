<template>
<header class="header white-bg">
    <div class="sidebar-toggle-box">
        <div title="点击折叠" class="icon-reorder tooltips" @click="collapseAside"></div>
    </div>
    <a href="#" class="logo"><span>ATF</span></a>

    <div class="top-nav ">
        <ul class="nav pull-right top-menu">
            <li class="dropdown">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                    <!-- <img alt="" src="../static/images/avatar1_small.jpg"> -->
                    <span class="username">chai</span>
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu extended logout">
                    <div class="log-arrow-up"></div>
                    <li><a href="#"><i class="icon-suitcase"></i>个人中心</a></li>
                    <li><a href="#"><i class="icon-cog"></i>设置</a></li>
                    <li><a href="#"><i class="icon-bell-alt"></i> 通知</a></li>
                    <li><a id="logout"><i class="icon-key"></i> 注销</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- <script type="text/javascript">
        document.querySelector('#logout').onclick = function() {
            if(sessionStorage.getItem('userId')) {
                sessionStorage.setItem('userId', '')
                document.location.href = 'Login.html'
            }
        }
    </script> -->
</header>
</template>
<script>
export default {
    name: 'header-guide',
    data() {
        return {
            
        };
    },
    created() {
        
    },
    methods: {
        collapseAside() {
            $('body').toggleClass('hide-aside-body');
        }
    }
};
</script>
<style lang="scss">
.nav-collapse, #main-content {
    transition: margin-left 0.3s;
}
.hide-aside-body {
    #sidebar {
        margin-left: -180px;
    }
    #main-content {
        margin-left: 0;
    }
}
</style>
