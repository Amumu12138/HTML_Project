<template>
    <div class="containers">
        <div class="canvas" ref="canvas" style="height: 50vh"></div>
    </div>
</template>

<script>
// 引入自定义 Viewer
import { CustomViewer } from '@/utils/custom-bpmn'
import bpmnXml from '@/assets/test.bpmn?raw'

export default {
    name: "bpmnViewer",
    mounted() {
        this.init();
    },
    data() {
        return {
            bpmnViewer: null,
            container: null,
            canvas: null
        };
    },
    methods: {
        init() {
            console.log('BpmnViewer init');

            const canvas = this.$refs.canvas
            this.bpmnViewer = new CustomViewer({
                container: canvas
            })
            this.createNewDiagram()
        },
        async createNewDiagram() {
            console.log('createNewDiagram called');

            try {
                // 本地 .bpmn 文件地址
                // const bpmnXml = require('@/assets/test.bpmn')
                // console.log(bpmnXml, 'bpmnXml');

                const result = await this.bpmnViewer.importXML(bpmnXml)
                const { warnings } = result;
                console.log(warnings);
                this.addMarker()
            } catch (err) {
                console.log(err.message, err.warnings);
            }
        }
    }
};
</script>

<style scoped>
/*流程高亮*/
.highlight .djs-visual> :nth-child(1) {
    stroke: green !important;
    fill: rgba(0, 80, 0, 0.4) !important;
}

.highlightFlow .djs-visual> :nth-child(1) {
    stroke: green !important;
}

.highlightIDO .djs-visual> :nth-child(1) {
    stroke: rgb(255, 196, 0) !important;
    fill: rgba(255, 196, 0, 0.4) !important;
}

.highlightTODO .djs-visual> :nth-child(1) {
    stroke: rgb(30, 144, 255) !important;
    fill: rgba(255, 255, 255, 0.4) !important;
}
</style>