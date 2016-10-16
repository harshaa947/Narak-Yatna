/**
 * Created by Harsh on 17-05-2016.
 */

function handlefile(files){
        updateSize(files);
        previewfiles(files);
}
var tortures = [{'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Rauravam',img:'img/Rauravam.jpg' ,x:170,y:410,width:150,height:120},
    {'name':'Mahararuravam',img:'img/Mahararuravam.jpg' ,x:316,y:150,width:110,height:80},
    {'name':'Kumbhipakam',img:'img/Kumbhipakam.jpg' ,x:95,y:5,width:90,height:120},
    {'name':'Kalasutram',img:'img/Kalasutram.jpg' ,x:233,y:370,width:70,height:80},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107},
    {'name':'Tamisara',img:'img/Tamisara.jpg' ,x:470,y:258,width:90,height:107}
]

function previewfiles(files){
     var preview = document.getElementById("preview");
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue;
        }

        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        img.setAttribute("onclick","updatecanvas(this)");
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
    resizeImages(preview);

}

function resizeImages(preview){
    var allimage = preview.getElementsByTagName('img');
    var n = allimage.length;
    if (n>=3) {
        width = 350 /3 ;
        var m;
        if (n % 3 ==0){
            m= n/3;
        }
        else {
            m = n/3 +1;
        }
        height = (290) / m;
    }
    else {
        height = 280;
        width = 350 / n;
    }
    for(var  x in allimage){
        console.log(x);
        allimage[x].width = width;
        allimage[x].height = height;
    }
    console.log(height +" " + width);
}
function updateSize(oFiles) {
    var nBytes = 0,

        nFiles = oFiles.length;
    for (var nFileId = 0; nFileId < nFiles; nFileId++) {
        nBytes += oFiles[nFileId].size;
    }
    var sOutput = nBytes + " bytes";
    // optional code for multiples approximation
    for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
    }
    // end of optional code

    document.getElementById("image_size").innerHTML = sOutput;
}

function initialize(){
    var dropbox;

    dropbox = document.getElementById("preview");
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        handlefile(files);
    }
    var canvas = document.getElementById("image_toshow");
    canvas.addEventListener('mousemove', function(e) {

        var pos = getMousePos(canvas, e), /// provide this canvas and event
            x = pos.x,
            y = pos.y;

        /// check x and y against the grid
            var span = document.getElementById("pos");
            span.innerText=(x*700/500)+" "+ (y*500/300);
    }, false);

    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {x: e.clientX - rect.left, y: e.clientY - rect.top};
        //return {x: e.clientX , y: e.clientY};
    }
}

function plot(){
    var canvas = document.getElementById("image_toshow");
    var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
        "cascade" : cascade,
        "interval" : 5,
        "min_neighbors" : 1 });
    console.log(comp);
    var i= 0;
    var ctx=canvas.getContext("2d");
    var imageData = ctx.getImageData(comp[i].x-15, comp[i].y-15, comp[i].width+30 ,comp[i].height+30);
    var target_canvas = document.getElementById("format_image");
    target_ctx=target_canvas.getContext("2d");
    target_ctx.putImageData(imageData,50,50)

    ctx.rect(comp[i].x,comp[i].y,comp[i].width,comp[i].height);
    ctx.stroke();
}

function punish(j){
    var canvas = document.getElementById("image_toshow");



    var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
        "cascade" : cascade,
        "interval" : 5,
        "min_neighbors" : 1 });
    console.log(comp);
    var ctx=canvas.getContext("2d");
    i=0;
    var imageData = ctx.getImageData(comp[i].x-15, comp[i].y-15, comp[i].width+30 ,comp[i].height+30);
    var target_canvas = document.getElementById("format_image");

    target_ctx=target_canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {


        target_ctx.drawImage(img, 0, 0,700,500);
        var scaleX = (tortures[j].width +0.0)/(comp[i].width +30 )
        var scaleY = (tortures[j].height +0.0)/(comp[i].height +30 )
        console.log(scaleX +" "+scaleY);
        //var toscaleimg = getimg(imageData)

        var canvastemp=document.createElement('canvas');
        canvastemp.width =Math.round((comp[i].width + 30)*7/5)
        canvastemp.height =Math.round((comp[i].height + 30)*5/3)
        var ctxtmp=canvastemp.getContext("2d");
        console.log(canvastemp.width +"  vaah "+canvastemp.height)
        ctxtmp.putImageData(imageData,0,0);
        var imageObject=new Image();
        imageObject.onload=function(){
            doplot ( imageObject);
        }
            imageObject.src=canvastemp.toDataURL();
        function doplot(image){
            console.log(image);

           // target_ctx.scale(scaleX,scaleY);
            target_ctx.drawImage(image,tortures[j].x,tortures[j].y,tortures[j].width,tortures[j].height)
        }

    }
    img.src = tortures[j].img;


}
function updatecanvas(img){
    console.log(img);
    var mycanvas = document.getElementById("image_toshow");
    var context = mycanvas.getContext('2d');
    context.drawImage(img, 0, 0,700,500);


   /* // Update img in format_image canvas
    var mycanvas = document.getElementById("format_image");
    var context = mycanvas.getContext('2d');
    context.drawImage(img, 0, 0,700,500);*/
}

window.onload = initialize();