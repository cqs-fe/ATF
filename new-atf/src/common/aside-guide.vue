<template>
<div id="sidebar" class="nav-collapse">
    <ul class="sidebar-menu">
        <li class="sub-menu" v-for="menu in menus" :key="menu.key" :class="openMenus[menu.key] ? 'open' : ''">
            <a class="menu-btn" @click="changeCollapse(menu.key)">
                <span>{{menu.name}}</span>
                <span class="arrow"></span>
            </a>
            <collapse v-model="openMenus[menu.key]" v-if="menu.submenus.length">
                <ul class="sub">
                    <li class="sub-menu" v-for="submenu in menu.submenus" :key="submenu.key">
                        <a class="menu-btn" :href="submenu.url" :class="submenu.key === activeItem ? 'active' : ''">
                            <span>{{submenu.name}}</span>
                        </a>
                    </li>
                </ul>
            </collapse>
        </li>
    </ul>
</div>
</template>
<script>
import menus from './menu-config';
export default {
    name: 'aside-guide',
    props: {
        'activeItem': {
            type: String,
            default: 'user-management'
        },
        openMenu: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            menus: menus,
            openMenus: {}
        };
    },
    watch: {
        openMenu() {
            
        }
    },
    created() {
        const openMenus = {};
        menus.forEach(menu => {
            openMenus[menu.key] = false;
        });
        if (Object.keys(openMenus).includes(this.openMenu)) {
            openMenus[this.openMenu] = true;
        }
        this.openMenus = openMenus;
    },
    methods: {
        changeCollapse(key) {
            this.openMenus[key] = !this.openMenus[key];
        }
    }
};
</script>
<style scoped>
    .nav-collapse {
        overflow: auto;
        user-select: none;
    }
    .sub .sub-menu li a {
        color: #a3acb6;
    }
    ul.sub li .active {
        color: #ff6c60;
    }
    .arrow {
        transition: transform 0.3s;
    }
    .open .arrow {
        transform: rotate(90deg);
    }
    .menu-btn {
        cursor: pointer;
    }
</style>