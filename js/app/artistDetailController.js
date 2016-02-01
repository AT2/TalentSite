﻿(function() {
  app.controller("artistDetailController", [
    "$scope", "artistService", function($scope, artistService) {
      var audioPlayer, playAudioInternal, playVideoInternal, resumeAudioPlayer, resumeVideoPlayer, videoPlayer;
      $scope.profile = {};
      $scope.videoIndex = 0;
      $scope.audioIndex = 0;
      $scope.videoSrc = "";
      videoPlayer = null;
      audioPlayer = null;
      resumeVideoPlayer = null;
      resumeAudioPlayer = null;
      $scope.init = function() {
        artistService.queryDetail(window.memberId).then(function(data) {
          $scope.profile = data.Result;
        });
      };
      $scope.playVideo = function(index) {
        if ($scope.videoIndex === index) {
          if (videoPlayer.paused()) {
            videoPlayer.play();
          } else {
            videoPlayer.pause();
          }
        } else {
          playVideoInternal(index);
        }
      };
      $scope.playAudio = function(index) {
        if ($scope.audioIndex === index) {
          if (audioPlayer.paused()) {
            audioPlayer.play();
          } else {
            audioPlayer.pause();
          }
        } else {
          playAudioInternal(index);
        }
      };
      $scope.showVideos = function() {
        $("#modalVideoShowreel ").modal();
        playVideoInternal(0);
        $("#modalVideoShowreel").on("hide.bs.modal", function() {
          videoPlayer.pause();
        });
      };
      $scope.showAudios = function() {
        $("#modalAudioShowreel ").modal();
        playAudioInternal(0);
        $("#modalAudioShowreel").on("hide.bs.modal", function() {
          audioPlayer.pause();
        });
      };
      $scope.showCreditResumeMedia = function(mediaType, mediaUrl) {
        debugger;
        if (mediaType === "V") {
          if (resumeVideoPlayer === null) {
            resumeVideoPlayer = videojs("creditVideo", {
              "controls": true,
              "preload": "auto"
            });
          }
          resumeVideoPlayer.src({
            "type": "video/mp4",
            "src": mediaUrl
          });
          resumeVideoPlayer.play();
          $("#modalResumeVideo").modal();
          $("#modalResumeVideo").on("hide.bs.modal", function() {
            resumeVideoPlayer.pause();
          });
        } else if (mediaType === "A") {
          if (resumeAudioPlayer === null) {
            resumeAudioPlayer = videojs("creditAudio", {
              "controls": true,
              "preload": "auto"
            });
          }
          resumeAudioPlayer.src({
            "type": "audio/mp3",
            "src": mediaUrl
          });
          resumeAudioPlayer.play();
          $("#modalResumeAudio").modal();
          $("#modalResumeAudio").on("hide.bs.modal", function() {
            resumeAudioPlayer.pause();
          });
        } else {
          blueimp.Gallery([mediaUrl]);
        }
      };
      playVideoInternal = function(index) {
        $scope.videoIndex = index;
        if (videoPlayer === null) {
          videoPlayer = videojs("videoShowreel", {
            "controls": true,
            "preload": "auto"
          });
          videoPlayer.on("ended", function() {
            if ($scope.videoIndex + 1 < $scope.profile.VideoList.length) {
              playVideoInternal($scope.videoIndex + 1);
            }
            $scope.$apply();
          });
        }
        videoPlayer.src({
          "type": "video/mp4",
          "src": $scope.profile.VideoList[index].VideoPath
        });
        videoPlayer.play();
      };
      playAudioInternal = function(index) {
        $scope.audioIndex = index;
        if (audioPlayer === null) {
          audioPlayer = videojs("audioShowreel", {
            "controls": true,
            "preload": "auto"
          });
          audioPlayer.on("ended", function() {
            if ($scope.audioIndex + 1 < $scope.profile.AudioList.length) {
              playAudioInternal($scope.audioIndex + 1);
            }
            $scope.$apply();
          });
        }
        audioPlayer.src({
          "type": "audio/mp3",
          "src": $scope.profile.AudioList[index].AudioPath
        });
        audioPlayer.play();
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=artistDetailController.js.map
