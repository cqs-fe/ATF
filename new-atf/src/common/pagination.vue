<template>
<div class="pagination-wrap" >
    <div class="num">
        <select class="form-control" v-model="pageSize">
            <option v-for="item of pageSizeArray" :value="item.value" :key="item.value">{{item.label}}</option>
        </select> 
    </div>
    <ul class="pagination">
        <li :class="currentPage == 1 ? 'disabled':''"><a class="page-item" @click="go(1)">首页</a></li>
        <li :class="currentPage == 1 ? 'disabled':''"><a @click="go(currentPage - 1)" class="page-item">上一页</a></li>
        <li v-for="page of pageArray" :key="page" :class="+page === +currentPage ? 'active' : ''">
            <a class="page-item" @click="go(page)" v-text="page"></a>
        </li>
        <li :class="currentPage === totalPage ? 'disabled' : ''"><a class="page-item" @click="go(currentPage + 1)">下一页</a></li>
        <li :class="currentPage === totalPage ? 'disabled' : ''"><a class="page-item" @click="go(totalPage)">尾页</a></li>
    </ul>
    <div class="go">
        <div class="input-group" :class="('' + targetPage).trim() !== '' && (targetPage > totalPage || targetPage < 1) ? ' error':''">
            <input class="form-control" type="number" v-model="targetPage" min="1" :max="totalPage">
            <a class="page-item input-group-addon" @click="go(targetPage)">Go</a>
        </div>
    </div>
    <small class="small nowrap"> 当前第 <span class="text-primary" v-text="currentPage"></span> / <span class="text-primary" v-text="totalCount"></span>页，共有 <span class="text-primary" v-text="totalCount"></span> 条</small>
</div>
</template>
<script>
export default {
    name: 'pagination',
    props: {
        maxSize: {
            type: Number,
            default: 6
        },
        totalCount: {
            type: Number,
            default: 0
        },
        totalPage: {
            type: Number,
            default: 29
        },
        defaultCurrentPage: {
            type: Number,
            default: 1
        },
        defaultPageSize: {
            type: Number,
            default: 5
        },
        pageSizeArray: {
            type: Array,
            default() {
                return [{
                    value: 5,
                    label: '5条/页'
                }, {
                    value: 10,
                    label: '10条/页'
                }, {
                    value: 20,
                    label: '20条/页'
                }, {
                    value: 50,
                    label: '50条/页'
                }];
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            pageArray: [],
            isPageNumberError: false,
            targetPage: 1,
            size: 5
        };
    },
    created() {
        this.currentPage = this.defaultCurrentPage;
        this.pageSize = this.defaultPageSize;
        this.pageArray = this.createArray(1, Math.min(this.totalPage, this.maxSize));
    },
    watch: {
        currentPage(newVal, oldVal) {
            let left = this.pageArray[0], right = this.pageArray[this.pageArray.length - 1];
            if (left <= newVal && newVal <= right) {
                return;
            }
            const maxSize = this.maxSize - 1;
            if (newVal < left) {
                if (newVal <= this.maxSize) {
                    left = newVal;
                    right = Math.min(newVal + this.maxSize - 1, this.totalPage);
                } else {
                    left = newVal - maxSize;
                    right = newVal;
                }
            } else if (newVal > right) {
                if (this.totalPage - maxSize <= newVal) {
                    left = newVal - maxSize;
                    right = newVal;
                } else {
                    left = newVal;
                    right = newVal + maxSize;
                }
            }
            this.pageArray = this.createArray(left, right);
        },
        pageSize(newVal) {
            this.$emit('page-size-change', +newVal);
        }
    },
    computed: {
        
    },
    methods: {
        go(page) {
            if (+page < 1 || +page > this.totalPage) {
                return;
            }
            this.currentPage = +page;
            this.$emit('change', page);
        },
        createArray(min, max) {
            const arr = [];
            for (let i = +min; i <= +max; i++) {
                arr.push(i);
            }
            return arr;
        }
    }
};
</script>
<style lang="scss">
.pagination-wrap{
	margin: 0 auto;
    text-align: center;
    user-select: none;
}
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    .page-item {
        cursor: pointer;
    }
}
.small {
    margin: 0 10px;
    position: relative;
    top: -32px;
}
.nowrap {
    white-space: nowrap;
}
.input-group {
    position: relative;
    display: table;
    border-collapse: separate;
}
.input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0;
}

.input-group-addon, .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
}
.input-group-addon, .input-group-btn, .input-group .form-control {
	box-sizing: border-box;
    display: table-cell;
}
.input-group .form-control:first-child, .input-group-addon:first-child, .input-group-btn:first-child>.btn, .input-group-btn:first-child>.btn-group>.btn, .input-group-btn:first-child>.dropdown-toggle, .input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle), .input-group-btn:last-child>.btn-group:not(:last-child)>.btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.input-group-addon, .input-group-btn, .input-group .form-control {
    display: table-cell;
}
.go .error .form-control{
    border: 1px solid #d95656;
}
.form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.text-primary {
    color: #428bca;
}
.pagination>li:first-child>a, .pagination>li:first-child>span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.go {
    display: inline-block;
    max-width: 140px;
    top: -21px;
    position: relative;
}
.page-info{
    position: relative;
    top: -33px;
    display: inline-block;
}
.input-group-addon:last-child {
	display: table-cell;
	text-decoration: none;
    border-left: 0;
}
.pagination>.disabled>span, .pagination>.disabled>span:hover, .pagination>.disabled>span:focus, .pagination>.disabled>a, .pagination>.disabled>a:hover, .pagination>.disabled>a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
}
.pagination>li:last-child>a, .pagination>li:last-child>span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #428bca;
    border-color: #428bca;
}
.pagination>li>a, .pagination>li>span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #428bca;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
}
.pagination>li {
    display: inline;
}

.num {
    display: inline-block;
    position: relative;
    top: -29px;
}
</style>
