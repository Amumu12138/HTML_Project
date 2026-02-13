export const mixin = {
    data() {
        return {
            x: 111,
            y: 222
        }
    },
    methods: {
        showName() {
            alert(this.name);
        },
        showData() {
            console.log('showData', this.x, this.y);
        }
    },
    mounted() {
        console.log('mounted called');
    },
}