var vm = new Vue({
    el: '#app',
    data: {
        zzjg: [],
        act: 0,
        isAddBmShow: false,
        isMaskShow: false,
        isYzLayer: false,
        isOthersLayer: false,
        bmName: '',
        yzjg: {
            cy: '',
            zw: [],
            bgsdh: [],
            zz: ""
        },
        othersjg: {
            kszz: "",
            dh: [
                {
                    "type": 0,
                    "num": []
                },
                {       
                    "type": 1,
                    "num": []
                }
            ],
            ksry: [
                {
                    "name": "",
                    "zw": '',
                    "zz": ""
                },
                {
                    "name": "",
                    "zw": '',
                    "zz": ""
                }
            ]
        }
    },
    mounted: function(){
        // this.zzjgView('../data/data.json');
        this.zzjgView();
    },
    methods: {
        zzjgView: function(url){
            var $this = this;
            // this.$http.get(url).then(function(res){
            //     $this.zzjg = res.body.zzjg;
            // });

            $this.zzjg = projectData.zzjg;
        },
        isEmptyObject: function(obj){
            for(var key in obj){
                return false
            };
            return true
        },
        //改变当前部门索引号
        changeAct: function(index){
            this.act = index;
        },
        //打开添加部门弹框
        openAddBmLayer: function(){
            this.isAddBmShow = true;
            this.isMaskShow = true;
        },
        //关闭所有弹框
        closeAllLayer: function(){
            this.isAddBmShow = false;
            this.isMaskShow = false;
            this.isYzLayer = false;
            this.isOthersLayer = false;
        },
        //添加部门
        addBm: function(){
            var $this = this;
            var obj = {
                name: '',
                con: {}
            };
            if(this.bmName === ''){
                alert("部门名称不能为空！");
                return;
            }
            else{
                obj.name = this.bmName;
                if(obj.name === "院长"){
                    this.zzjg.splice(0,0,obj);
                    this.act = 0;
                }
                else{
                    this.zzjg.push(obj);
                    this.act = this.zzjg.length-1;
                }

                this.bmName = '';
                this.closeAllLayer();
            }
        },
        //删除部门
        delBm: function(){
            var $this = this;
            layer.open({
                type: 2,
                title: '提示',
                area: ['500px','300px'],
                btnAlign: 'c',
                btn: ['确定','取消'],
                yes: function(index){
                    $this.zzjg.splice($this.act,1);
                    $this.act = $this.act-1>=0 ? ($this.act-1) : 0
                    layer.close(index);
                },
                content: '../blue1-demo/layer-html/del-office-bm.html'
            })
        },
        //打开完善部门信息弹框
        openFinishInfoLayer: function(){
            var $this = this;
            $this.isMaskShow = true;
            if($this.act === 0 && $this.zzjg[$this.act].name === '院长'){
                $this.isYzLayer = true;
            }
            else{
                $this.isOthersLayer = true;
            }
        },
        //添加院长部门信息
        addYz: function(){
            var $this = this;
            var con = {
                cy: '',
                zw: [],
                bgsdh: [],
                zz: ""
            }
            if($this.yzjg.cy === '' || $this.yzjg.zw === '' || $this.yzjg.bgsdh === '' || $this.yzjg.zz === ''){
                alert('信息不能为空！');
            }
            else{
                con.cy = $this.yzjg.cy;
                con.zw = $this.yzjg.zw.split('、');
                con.bgsdh = $this.yzjg.bgsdh.split('、');
                con.zz = $this.yzjg.zz;

                $this.zzjg[$this.act].con = con;

                $this.yzjg.cy = '';
                $this.yzjg.zw = [];
                $this.yzjg.bgsdh = [];
                $this.yzjg.zz = '';

                $this.closeAllLayer();
            }
        },
        //编辑部门资料
        editInfo: function(){
            var $this = this;
            if($this.act === 0 && $this.zzjg[$this.act].name === '院长'){
                $this.isMaskShow = true;
                $this.isYzLayer = true;

                
                $this.yzjg.cy = $this.zzjg[$this.act].con.cy;
                $this.yzjg.zw = $this.zzjg[$this.act].con.zw.join('、');
                $this.yzjg.bgsdh = $this.zzjg[$this.act].con.bgsdh.join('、');
                $this.yzjg.zz = $this.zzjg[$this.act].con.zz;
            }
            else{
                $this.isMaskShow = true;
                $this.isOthersLayer = true;

                $this.othersjg.ksry = [];

                for(var i=0; i<$this.zzjg[$this.act].con.ksry.length; i++){
                    $this.othersjg.ksry.push({
                        "name": "",
                        "zw": [],
                        "zz": ""
                    });
                }


                $this.othersjg.kszz = $this.zzjg[$this.act].con.kszz;
                $this.othersjg.dh[0].num = $this.zzjg[$this.act].con.dh[0].num.join('、');
                $this.othersjg.dh[1].num = $this.zzjg[$this.act].con.dh[1].num.join('、');

                for(var i=0; i<$this.zzjg[$this.act].con.ksry.length; i++){
                    $this.othersjg.ksry[i].zw = $this.zzjg[$this.act].con.ksry[i].zw.join('、');
                    $this.othersjg.ksry[i].name = $this.zzjg[$this.act].con.ksry[i].name;
                    $this.othersjg.ksry[i].zz = $this.zzjg[$this.act].con.ksry[i].zz;
                }
            }
        },
        //添加人员职责模块
        addRy: function(){
            var obj = {
                "name": "",
                "zw": "",
                "zz": ""
            };
            this.othersjg.ksry.push(obj);
            console.log(this.othersjg.ksry.length)
        },
        //删除人员职责模块
        delRy: function(index){
            var $this = this;
            this.othersjg.ksry.splice(index,1);
        },
        //添加其他部门信息
        addOthersInfo: function(){
            var $this = this;
            var info = {
                kszz: "",
                dh: [
                    {
                        "type": 0,
                        "num": []
                    },
                    {       
                        "type": 1,
                        "num": []
                    }
                ],
                ksry: [
                    
                ]
            };

            var ks = {
                    "name": "",
                    "zw": "",
                    "zz": ""
                };


            for(var i=0; i<$this.othersjg.ksry.length; i++){
                if($this.othersjg.ksry[i].name === '' || $this.othersjg.ksry[i].zw === '' || $this.othersjg.ksry[i].zz === ''){
                    alert('信息不能为空！');
                    return;
                }
            }
            if($this.othersjg.kszz === '' || $this.othersjg.dh[0].num === '' || $this.othersjg.dh[1].num === ''){
                alert('信息不能为空！');
            }
            else{
                info.kszz = $this.othersjg.kszz;
                info.dh[0].num = $this.othersjg.dh[0].num.split('、');
                info.dh[1].num = $this.othersjg.dh[1].num.split('、');

                
                for(var i=0; i<$this.othersjg.ksry.length; i++){
                    info.ksry.push($this.othersjg.ksry[i]);
                    info.ksry[i].zw = $this.othersjg.ksry[i].zw.split('、');
                }

                $this.zzjg[$this.act].con = info;

                $this.othersjg = {
                    kszz: "",
                    dh: [
                        {
                            "type": 0,
                            "num": []
                        },
                        {       
                            "type": 1,
                            "num": []
                        }
                    ],
                    ksry: [
                        {
                            "name": "",
                            "zw": '',
                            "zz": ""
                        },
                        {
                            "name": "",
                            "zw": '',
                            "zz": ""
                        }
                    ]
                };

                $this.closeAllLayer();
            }

        }
    },
    computed: {
    }
});