song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_rightWrist = 0;
score_leftWrist = 0;

function preload(){
    song = loadSound("katy_perry_roar.mp4");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet Is Intialized!");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#3446eb");
    stroke("#3446eb");

    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 25);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed_tag").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <=200){
            document.getElementById("speed_tag").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if(rightWristY > 200 && rightWristY <=300){
            document.getElementById("speed_tag").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWristY > 300 && rightWristY <=400){
            document.getElementById("speed_tag").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed_tag").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftWrist > 0.1){
        circle(leftWristX, leftWristY, 25);
        noLeftWristY = Number(leftWristY);
        remove_decimals = floor(noLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume_tag").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of left wrist = " + score_leftWrist);
        console.log("Score of right wrist = " + score_rightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }
}

function stop(){
    song.stop();
}