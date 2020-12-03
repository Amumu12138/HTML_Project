import { VertexBuffer } from "./VertexBuffer";
export class CompositeMesh {
    constructor() {
        this.elements = [];
        this.activeIndex = -1;
    }
    onPopulateMesh(vb) {
        let cnt = this.elements.length;
        if (cnt == 1)
            this.elements[0].onPopulateMesh(vb);
        else {
            let vb2 = VertexBuffer.begin(vb);
            for (let i = 0; i < cnt; i++) {
                if (this.activeIndex == -1 || i == this.activeIndex) {
                    vb2.clear();
                    this.elements[i].onPopulateMesh(vb2);
                    vb.append(vb2);
                }
            }
            vb2.end();
        }
    }
    hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y))
            return false;
        let flag = false;
        let cnt = this.elements.length;
        for (let i = 0; i < cnt; i++) {
            if (this.activeIndex == -1 || i == this.activeIndex) {
                let ht = this.elements[i];
                if ('hitTest' in ht) {
                    if (ht.hitTest(contentRect, x, y))
                        return true;
                }
                else
                    flag = true;
            }
        }
        return flag;
    }
}
