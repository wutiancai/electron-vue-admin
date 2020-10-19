<template>
    <div >
<!--        <html-panel :url.asyc="url1"></html-panel>--><!--onload="this.height=testframe.document.body.scrollHeight"-->
        <iframe id="testframe" name="testframe" onload="this.height=document.body.scrollHeight-60" src="static/via.html" width="100%"  frameborder="0" scrolling="auto"></iframe>
    </div>
</template>

<script>
    import html_panel from "@/components/html_panel";
import { MessageBox, Message,Loading } from 'element-ui'
    export default {
        components: {
            "html-panel": html_panel
        },
        inject: ['reload'],
        data () {
            return {
                url1: 'static/via.html'
            }
        },
        mounted () {
            console.log('windows_url ' + window.location.href)
            window.onresize = () => {
                this.iframefun();
            };
            window["goReload"] = () => {
                // const loading = this.$loading({
                //     lock: true,
                //     text: 'Loading',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(0, 0, 0, 0.7)'
                // });
                // setTimeout(() => {
                //     loading.close();
                // }, 2000);
                // window.location.reload()
                this.reload()
            };
        },
        methods: {
            iframefun () {
                var iframe = document.getElementById("testframe");
                console.log(iframe.height);
                iframe.height = document.body.scrollHeight - 60
                // try {
                //     var bHeight = iframe.document.body.scrollHeight;
                //     var dHeight = iframe.document.documentElement.scrollHeight;
                //     var height = Math.min(bHeight, dHeight);
                //     iframe.height = document.body.scrollHeight - 50;
                //     console.log(iframe.height);
                // } catch (ex) {
                // }
            }
        }
    }
</script>

<style scoped>

</style>