export const pagination = {
    data(){
        return{
            input:''
        }
    },
    methods:{
        handleCurrentChange(val) {
            this.queryParams.pageNum = val;
            this.init();
        },
        handleSizeChange(val) {
            this.queryParams.pageSize = val;
            this.init();
        },
        pervious() {
            this.$refs.pageGroup.prev()
        },
        next() {
            this.$refs.pageGroup.next()
        },
        firstPage(){
            this.handleCurrentChange(1)
        },
        lastPage(){
            let last = Math.ceil(this.total/10)
            this.handleCurrentChange(last)
        },
        jumper(){
            let jump =parseInt(this.input)
            this.handleCurrentChange(jump)
        }
    }

}