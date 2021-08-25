song="";

function preload(){
    song=loadSound("Music.mp3");
}
rightwristX=0;
rightwristY=0;
leftWristX=0;
leftWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('posenet is initialized yay i got the spelling no one told me hehehe!!!!!!!!!!!!!!!!!!');
}
function gotPoses(results){
  if (results.length>0) {
      console.log(results);
      scorerightwrist=results[0].pose.keypoints[10].score;
      scoreleftwrist=results[0].pose.keypoints[9].score;
      console.log("scorerightwrist= "+scorerightwrist+" scoreleftwrist= "+scoreleftwrist);

      rightwristX=results[0].pose.rightWrist.x;
      leftwristY=results[0].pose.leftWrist.y;
      rightwristY=results[0].pose.rightWrist.y;
      leftwristX=results[0].pose.leftWrist.x;
      console.log("rightwristX= "+rightwristX+"rightwristY= "+rightwristY);
      console.log(" leftwristX= "+ leftwristX+"leftwristY= "+leftwristY);
  }  
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#00ffff");
    if (scorerightwrist>0.2) {
        circle(rightWristX,rightwristY,40);
        if (rightwristY>0&&rightwristY<=100) {
            document.getElementById("speed").innerHTML="Speed=0.5x";
            song.rate(0.5);
        }
     else if(rightwristY>100&&rightwristY<=200) {
        document.getElementById("speed").innerHTML="Speed=1x";
        song.rate(1);
    }
    else if(rightwristY>200&&rightwristY<=300) {
        document.getElementById("speed").innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
    else if(rightwristY>300&&rightwristY<=400) {
        document.getElementById("speed").innerHTML="Speed=2x";
        song.rate(2);
    }
    else if(rightwristY>400) {
        document.getElementById("speed").innerHTML="Speed=2.5x";
        song.rate(2.5);
    }
}
 
    if (scoreleftwrist>0.2) {
        circle(leftwristX,leftwristY,40);
        InnumberleftwristY=Number(leftWristY);
        remove_decimal=floor(InnumberleftwristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume= "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
