//������ɫ������
var VSHADER_SOURCE =
    'attribute vec4 a_Position;'+
    'attribute vec2 a_TexCoord;'+
    'varying vec2 v_TexCoord;'+
    'void main(){'+
    'gl_Position = a_Position;'+
    'v_TexCoord = a_TexCoord;'+
    '}';

//ƬԪ��ɫ������
var FSHADER_SOURCE=
    'precision mediump float;\n' +
    'uniform sampler2D u_Sampler;'+
    'varying vec2 v_TexCoord;'+
    'void main(){'+
    'gl_FragColor = texture2D(u_Sampler, v_TexCoord);'+
    '}';

function main() {
    //��ȡcanvasԪ��
    var canvas = document.getElementById("webgl");
    if(!canvas){
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    //��ȡWebGL��ͼ������
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    //��ʼ����ɫ��
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log("Failed to initialize shaders.");
        return;
    }

    //���ö���λ��
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    //ָ�����<canvas>��ɫ
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //��������
    if (!initTextures(gl, n)) {
        console.log('Failed to intialize the texture.');
        return;
    }
}

function initVertexBuffers(gl) {
   var verticesTexCoords = new Float32Array([
        //�������꣬��������
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0
    ]);
    var n=4; //��ĸ���

    //��������������
    var vertexTexCoordBuffer = gl.createBuffer();
    if(!vertexTexCoordBuffer){
        console.log("Failed to create thie buffer object");
        return -1;
    }

    //�����������󱣴浽Ŀ����
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);

    //�򻺴����д������
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }

    //����������������a_Postion����
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);

    //����a_Postion�������������Ļ���������
    gl.enableVertexAttribArray(a_Position);

    //�������������� a_TexCoord ��������
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    if(a_TexCoord < 0){
        console.log("Failed to get the storage location of a_TexCoord");
        return -1;
    }

    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);

    gl.enableVertexAttribArray(a_TexCoord);

    return n;
}

function initTextures(gl, n) {
    var texture = gl.createTexture();  //������������
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    //��ȡ u_Sampler�Ĵ洢λ��
    var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
    if (!u_Sampler) {
        console.log('Failed to get the storage location of u_Sampler');
        return false;
    }

    var image = new Image();  //����һ��image ����
    if (!image) {
        console.log('Failed to create the image object');
        return false;
    }
    //ע��ͼ������¼�����Ӧ����
    image.onload = function () {
        loadTexture(gl, n, texture, u_Sampler, image);
    }
    //�������ʼ����ͼ��
    image.src = 't.jpg';

    return true;
}

function loadTexture(gl, n, texture, u_Sampler, image){
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  //������ͼ�����Y�ᷴת
    //����0��������Ԫ
    gl.activeTexture(gl.TEXTURE0);
    //�� target ����������
    gl.bindTexture(gl.TEXTURE_2D, texture);

    //������������
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //��������ͼ��
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    //��0���������ݸ���ɫ��
    gl.uniform1i(u_Sampler, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle

}