var vm = new Vue({
    el: '#app',
    data: {
        bgdh: [],
        bm: '',
        bgs: '',
        dh: '',
        cz: '',
        index: 0,
        isMaskShow: false,
        isAddPhoneShow: false,
        isEditPhoneShow: false
    },
    mounted: function(){
        this.bgdhView('../data/data.json');
    },
    methods: {
        bgdhView: function(url){
            var $this = this;
            // this.$http.get(url).then(function(res){
            //     $this.bgdh = res.body.bgdh;
            // });
            $this.bgdh = projectData.bgdh;
        },
        //办公室号拼接
        bgsNum: function(obj){
            var arr = [];
            for(var i=0; i<obj.bgs.length; i++){
                arr[i] = obj.bgs[i] + "室";
            }
            return arr.join("、");
        },
        //传真号拼接
        czNum: function(obj){
            return "（传真" + obj.num.join("、") + ")";
        },
        //删除电话
        delPhone: function(eq){
//             var $this = this;
//             layer.confirm('您确定要删除此办公电话么？',{
//                 btn: ['确定','取消'],
//                 title: '提示'
//             },function(index){
//                 $this.bgdh.splice(eq,1);
//                 layer.close(index);
//             })
            console.log(1)
        },
        //打开添加电话弹框
        openAddPhoneLayer: function(){
            var $this = this;
            this.isMaskShow = true;
            this.isAddPhoneShow = true;

            $this.bm = '';
            $this.bgs = '';
            $this.dh = '';
            $this.cz = '';
        },
        //关闭弹框
        closeLayer: function(){
            this.isMaskShow = false;
            this.isAddPhoneShow = false;
            this.isEditPhoneShow = false;
        },
        //添加电话
        addPhone: function(){
            var $this = this;

            var obj = {
                bm: '',
                bgs: [],
                dh: [
                    {
                        type: 0,
                        num: []
                    },
                    {
                        type: 1,
                        num: []
                    }
                ]
            };
            if($this.bm === '' || $this.bgs === '' || $this.dh === '' || $this.cz === ''){
                alert("信息不能为空！");
            }
            else{
                obj.bm = $this.bm;
                obj.bgs = $this.bgs.split('、');
                obj.dh[0].num = $this.dh.split('、');
                obj.dh[1].num = $this.cz.split('、');
                $this.bgdh.push(obj);

                $this.bm = '';
                $this.bgs = '';
                $this.dh = '';
                $this.cz = '';

                //关闭弹框
                $this.closeLayer();
            }
        },
        //打开修改电话弹框
        openEditPhoneLayer: function(index){
            var $this = this;
            $this.index = index;
            this.isMaskShow = true;
            this.isEditPhoneShow = true;

            $this.bm = $this.bgdh[index].bm;
            $this.bgs = $this.bgdh[index].bgs.join('、');
            $this.dh = $this.bgdh[index].dh[0].num.join('、');
            $this.cz = $this.bgdh[index].dh[1].num.join('、');
        },
        //修改电话
        editPhone: function(){
            this.bgdh[this.index].bm = this.bm;
            this.bgdh[this.index].bgs = this.bgs.split('、');
            this.bgdh[this.index].dh[0].num = this.dh.split('、');
            this.bgdh[this.index].dh[1].num = this.cz.split('、');

            //关闭弹框
            this.closeLayer();
            // alert(this.index)
        }
    },
    computed: {
    }
});
